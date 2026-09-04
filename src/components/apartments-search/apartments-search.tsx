"use client";

import { useEffect, useMemo, useState } from "react";
import { Apartment } from "@/src/types/apartments";

import styles from "./apartments-search.module.css";

type Range = {
  min: number;
  max: number;
};

type ApartmentFiltersProps = {
  apartments: Apartment[];
  onFilterChange: (filteredApartments: Apartment[]) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getMin = (apartments: Apartment[], key: keyof Apartment) => {
  if (!apartments.length) return 0;

  return Math.min(
    ...apartments.map((apartment) => apartment[key] as number)
  );
};

const getMax = (apartments: Apartment[], key: keyof Apartment) => {
  if (!apartments.length) return 0;

  return Math.max(
    ...apartments.map((apartment) => apartment[key] as number)
  );
};

export default function ApartmentFilters({
  apartments,
  onFilterChange,
}: ApartmentFiltersProps) {
  const priceLimits = useMemo(
    () => ({
      min: getMin(apartments, "price"),
      max: getMax(apartments, "price"),
    }),
    [apartments]
  );

  const areaLimits = useMemo(
    () => ({
      min: getMin(apartments, "area"),
      max: getMax(apartments, "area"),
    }),
    [apartments]
  );

  const floorLimits = useMemo(
    () => ({
      min: getMin(apartments, "floor"),
      max: getMax(apartments, "floor"),
    }),
    [apartments]
  );

  const [price, setPrice] = useState<Range>(priceLimits);
  const [area, setArea] = useState<Range>(areaLimits);
  const [floor, setFloor] = useState<Range>(floorLimits);

  const [rooms, setRooms] = useState<number[]>([]);

  useEffect(() => {
    setPrice(priceLimits);
    setArea(areaLimits);
    setFloor(floorLimits);
  }, [priceLimits, areaLimits, floorLimits]);

  const filteredApartments = useMemo(() => {
    return apartments.filter((apartment) => {
      const matchesPrice =
        apartment.price >= price.min &&
        apartment.price <= price.max;

      const matchesArea =
        apartment.area >= area.min &&
        apartment.area <= area.max;

      const matchesFloor =
        apartment.floor >= floor.min &&
        apartment.floor <= floor.max;

      const matchesRooms =
        rooms.length === 0 ||
        rooms.some((room) =>
          room === 4
            ? apartment.rooms >= 4
            : apartment.rooms === room
        );

      return (
        matchesPrice &&
        matchesArea &&
        matchesFloor &&
        matchesRooms
      );
    });
  }, [apartments, price, area, floor, rooms]);

  useEffect(() => {
    onFilterChange(filteredApartments);
  }, [filteredApartments, onFilterChange]);

  return (
    <div className={styles.apartmentFilters}>
      <RangeFilter
        title="Цена"
        value={price}
        limits={priceLimits}
        step={0.1}
        suffix=" млн"
        onChange={setPrice}
      />

      <RangeFilter
        title="Площадь"
        value={area}
        limits={areaLimits}
        step={0.1}
        suffix=" м²"
        onChange={setArea}
      />

      <RangeFilter
        title="Этаж"
        value={floor}
        limits={floorLimits}
        step={1}
        onChange={setFloor}
      />

      <div className={styles.roomsFilter}>
        <div className={styles.filterTitle}>
          Количество комнат
        </div>

        <div className={styles.roomsButtons}>
          {/* Все */}
          <button
            type="button"
            className={`${styles.roomButton} ${rooms.length === 0
              ? styles.roomButtonActive
              : ""
              }`}
            onClick={() => setRooms([])}
          >
            Все
          </button>

          {/* Количество комнат */}
          {[1, 2, 3, 4].map((room) => {
            const active = rooms.includes(room);

            return (
              <button
                key={room}
                type="button"
                className={`${styles.roomButton} ${active ? styles.roomButtonActive : ""
                  }`}
                onClick={() => {
                  setRooms((current) => {
                    if (current.includes(room)) {
                      return current.filter(
                        (item) => item !== room
                      );
                    }

                    return [...current, room];
                  });
                }}
              >
                {room === 4 ? "4+" : room}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.filterResult}>
        Найдено квартир:{" "}
        <strong>{filteredApartments.length}</strong>
      </div>
    </div>
  );
}

// =====================================================
// Double Range Slider
// =====================================================

type RangeFilterProps = {
  title: string;
  value: Range;
  limits: Range;
  step: number;
  suffix?: string;
  onChange: (value: Range) => void;
};

function RangeFilter({
  title,
  value,
  limits,
  step,
  suffix = "",
  onChange,
}: RangeFilterProps) {
  const range = limits.max - limits.min;

  const minPercent =
    range === 0
      ? 0
      : ((value.min - limits.min) / range) * 100;

  const maxPercent =
    range === 0
      ? 100
      : ((value.max - limits.min) / range) * 100;

  const handleMinChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextValue = Number(event.target.value);

    onChange({
      min: Math.min(nextValue, value.max),
      max: value.max,
    });
  };

  const handleMaxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextValue = Number(event.target.value);

    onChange({
      min: value.min,
      max: Math.max(nextValue, value.min),
    });
  };

  return (
    <div className={styles.rangeFilter}>
      <div className={styles.filterHeader}>
        <span className={styles.filterTitle}>
          {title}
        </span>

        <div className={styles.rangeValues}>
          <span>
            {value.min}
            {suffix}
          </span>

          <span>—</span>

          <span>
            {value.max}
            {suffix}
          </span>
        </div>
      </div>

      <div className={styles.rangeSlider}>
        <div className={styles.sliderTrack} />

        <div
          className={styles.sliderRange}
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        <input
          className={`${styles.rangeInput} ${styles.rangeInputMin}`}
          type="range"
          min={limits.min}
          max={limits.max}
          step={step}
          value={clamp(
            value.min,
            limits.min,
            limits.max
          )}
          onChange={handleMinChange}
          aria-label={`${title}: минимальное значение`}
        />

        <input
          className={`${styles.rangeInput} ${styles.rangeInputMax}`}
          type="range"
          min={limits.min}
          max={limits.max}
          step={step}
          value={clamp(
            value.max,
            limits.min,
            limits.max
          )}
          onChange={handleMaxChange}
          aria-label={`${title}: максимальное значение`}
        />
      </div>

      <div className={styles.rangeLimits}>
        <span>
          {limits.min}
          {suffix}
        </span>

        <span>
          {limits.max}
          {suffix}
        </span>
      </div>
    </div>
  );
}