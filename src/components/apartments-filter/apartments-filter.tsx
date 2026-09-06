'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './apartments-filter.module.css'

interface ApartmentFiltersProps {
  priceMin?: number
  priceMax?: number
  areaMin?: number
  areaMax?: number
  floorMin?: number
  floorMax?: number
}

const ROOM_OPTIONS = [1, 2, 3, 4]

export default function ApartmentFilters({
  priceMin = 0,
  priceMax = 15,
  areaMin = 20,
  areaMax = 80,
  floorMin = 1,
  floorMax = 18,
}: ApartmentFiltersProps) {
  const router = useRouter()

  const [rooms, setRooms] = useState<number[]>([])

  const [price, setPrice] = useState({
    min: priceMin,
    max: priceMax,
  })

  const [area, setArea] = useState({
    min: areaMin,
    max: areaMax,
  })

  const [floor, setFloor] = useState({
    min: floorMin,
    max: floorMax,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params = new URLSearchParams()

    if (rooms.length > 0) {
      params.set('rooms', rooms.join(','))
    }

    if (price.min !== priceMin) {
      params.set('priceMin', String(price.min))
    }

    if (price.max !== priceMax) {
      params.set('priceMax', String(price.max))
    }

    if (area.min !== areaMin) {
      params.set('areaMin', String(area.min))
    }

    if (area.max !== areaMax) {
      params.set('areaMax', String(area.max))
    }

    if (floor.min !== floorMin) {
      params.set('floorMin', String(floor.min))
    }

    if (floor.max !== floorMax) {
      params.set('floorMax', String(floor.max))
    }

    const query = params.toString()

    router.push(`/apartments${query ? `?${query}` : ''}`)
  }

  const toggleRoom = (room: number) => {
    setRooms((current) =>
      current.includes(room)
        ? current.filter((item) => item !== room)
        : [...current, room].sort((a, b) => a - b),
    )
  }

  return (
    <section className={styles.filtersSection}>
      
      <form className={styles.filters} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Найти квартиру</h2>
        <div className={styles.formInner}>
          <div className={styles.filter}>
            <h3 className={styles.filterTitle}>Количество комнат</h3>

            <div className={styles.rooms}>
              {ROOM_OPTIONS.map((room) => {
                const active = rooms.includes(room)

                return (
                  <button
                    key={room}
                    type="button"
                    className={`${styles.roomButton} ${active ? styles.roomButtonActive : ''
                      }`}
                    onClick={() => toggleRoom(room)}
                  >
                    {room}
                  </button>
                )
              })}

              <button
                type="button"
                className={`${styles.roomButton} ${rooms.length == ROOM_OPTIONS.length ? styles.roomButtonActive : ''
                  }`}
                onClick={() => setRooms(
                  (prev) => {
                    if (prev.length < ROOM_OPTIONS.length) return ROOM_OPTIONS
                    return []
                  })}
              >
                Все
              </button>
            </div>
          </div>

          {/* Цена */}
          <RangeFilter
            title="Цена, млн ₽"
            min={priceMin}
            max={priceMax}
            value={price}
            step={0.1}
            onChange={setPrice}
          />

          {/* Площадь */}
          <RangeFilter
            title="Площадь, м²"
            min={areaMin}
            max={areaMax}
            value={area}
            step={0.01}
            onChange={setArea}
          />

          {/* Этаж */}
          <RangeFilter
            title="Этаж"
            min={floorMin}
            max={floorMax}
            value={floor}
            step={1}
            onChange={setFloor}
          />
        </div>
        <button className={styles.submit} type="submit">
          Показать квартиры
        </button>
        {/* Комнаты */}
      </form >

    </section>
  )
}

interface RangeValue {
  min: number
  max: number
}

interface RangeFilterProps {
  title: string
  min: number
  max: number
  value: RangeValue
  step: number
  onChange: (value: RangeValue) => void
}

import {
  useRef,
  type PointerEvent,
} from 'react'






function RangeFilter({
  title,
  min,
  max,
  value,
  step,
  onChange,
}: RangeFilterProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const [dragging, setDragging] = useState<
    'min' | 'max' | null
  >(null)

  const range = max - min

  const minPercent =
    range === 0
      ? 0
      : ((value.min - min) / range) * 100

  const maxPercent =
    range === 0
      ? 100
      : ((value.max - min) / range) * 100

  const roundToStep = (value: number) => {
    const decimals = Math.max(
      0,
      String(step).split('.')[1]?.length ?? 0,
    )

    const rounded =
      Math.round((value - min) / step) * step + min

    return Number(rounded.toFixed(decimals))
  }

  const getValueFromPointer = (
    clientX: number,
  ) => {
    if (!sliderRef.current) {
      return min
    }

    const rect = sliderRef.current.getBoundingClientRect()

    let percent =
      (clientX - rect.left) / rect.width

    percent = Math.max(0, Math.min(1, percent))

    const rawValue =
      min + percent * (max - min)

    return roundToStep(rawValue)
  }

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!dragging) {
      return
    }

    const nextValue = getValueFromPointer(
      event.clientX,
    )

    if (dragging === 'min') {
      onChange({
        min: Math.min(nextValue, value.max),
        max: value.max,
      })
    }

    if (dragging === 'max') {
      onChange({
        min: value.min,
        max: Math.max(nextValue, value.min),
      })
    }
  }

  const handlePointerDown = (
    type: 'min' | 'max',
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()

    event.currentTarget.setPointerCapture(
      event.pointerId,
    )

    setDragging(type)
  }

  const handlePointerUp = () => {
    setDragging(null)
  }

  const handleTrackPointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.target !== event.currentTarget
    ) {
      return
    }

    const nextValue = getValueFromPointer(
      event.clientX,
    )

    const distanceToMin = Math.abs(
      nextValue - value.min,
    )

    const distanceToMax = Math.abs(
      nextValue - value.max,
    )

    if (distanceToMin <= distanceToMax) {
      onChange({
        min: Math.min(nextValue, value.max),
        max: value.max,
      })
    } else {
      onChange({
        min: value.min,
        max: Math.max(nextValue, value.min),
      })
    }
  }

  const handleMinInput = (
    rawValue: string,
  ) => {
    if (rawValue === '') {
      return
    }

    const nextValue = Number(rawValue)

    if (Number.isNaN(nextValue)) {
      return
    }

    const clamped = Math.max(
      min,
      Math.min(nextValue, value.max),
    )

    onChange({
      min: clamped,
      max: value.max,
    })
  }

  const handleMaxInput = (
    rawValue: string,
  ) => {
    if (rawValue === '') {
      return
    }

    const nextValue = Number(rawValue)

    if (Number.isNaN(nextValue)) {
      return
    }

    const clamped = Math.min(
      max,
      Math.max(nextValue, value.min),
    )

    onChange({
      min: value.min,
      max: clamped,
    })
  }

  return (
    <div className={styles.filter}>
      <h3 className={styles.filterTitle}>
        {title}
      </h3>

      {/* Значения */}
      <div className={styles.inputs}>
        <label className={styles.inputWrapper}>
          <input
            type="number"
            value={value.min}
            min={min}
            max={value.max}
            step={step}
            onChange={(event) =>
              handleMinInput(
                event.target.value,
              )
            }
            className={styles.numberInput}
          />
        </label>

        <label className={styles.inputWrapper}>
          <input
            type="number"
            value={value.max}
            min={value.min}
            max={max}
            step={step}
            onChange={(event) =>
              handleMaxInput(
                event.target.value,
              )
            }
            className={`${styles.numberInput} ${styles.numberInputEnd}`}
          />
        </label>
      </div>

      {/* Custom dual range */}
      <div
        ref={sliderRef}
        className={styles.slider}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerDown={handleTrackPointerDown}
      >
        {/* Фоновый трек */}
        <div className={styles.track} />

        {/* Выбранный диапазон */}
        <div
          className={styles.selectedTrack}
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* MIN thumb */}
        <button
          type="button"
          className={`${styles.customThumb} ${dragging === 'min'
            ? styles.customThumbDragging
            : ''
            }`}
          style={{
            left: `${minPercent}%`,
          }}
          onPointerDown={(event) =>
            handlePointerDown(
              'min',
              event,
            )
          }
          aria-label={`${title}: от ${value.min}`}
        >
          {/* <span /> */}
        </button>

        {/* MAX thumb */}
        <button
          type="button"
          className={`${styles.customThumb} ${styles.customThumbMax
            } ${dragging === 'max'
              ? styles.customThumbDragging
              : ''
            }`}
          style={{
            left: `${maxPercent}%`,
          }}
          onPointerDown={(event) =>
            handlePointerDown(
              'max',
              event,
            )
          }
          aria-label={`${title}: до ${value.max}`}
        >
          {/* <span /> */}
        </button>
      </div>
    </div>
  )
}


