'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from './apartments-search.module.css'

interface ApartmentsSearchProps {
  projectNames?: string[]
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
}

export default function ApartmentsSearch({
  projectNames = [],
  minPrice = 0,
  maxPrice = 1000000,
  minArea = 0,
  maxArea = 200,
}: ApartmentsSearchProps) {
  const router = useRouter()

  const [projectName, setProjectName] = useState('')

  const [priceMin, setPriceMin] = useState(minPrice)
  const [priceMax, setPriceMax] = useState(maxPrice)

  const [areaMin, setAreaMin] = useState(minArea)
  const [areaMax, setAreaMax] = useState(maxArea)

  const [floorFrom, setFloorFrom] = useState('')
  const [floorTo, setFloorTo] = useState('')
  const [buildingNum, setBuildingNum] = useState('')
  const [entrance, setEntrance] = useState('')
  const [stage, setStage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params = new URLSearchParams()

    if (projectName) {
      params.set('projectName', projectName)
    }

    if (priceMin > minPrice) {
      params.set('priceFrom', String(priceMin))
    }

    if (priceMax < maxPrice) {
      params.set('priceTo', String(priceMax))
    }

    if (areaMin > minArea) {
      params.set('areaFrom', String(areaMin))
    }

    if (areaMax < maxArea) {
      params.set('areaTo', String(areaMax))
    }

    if (floorFrom) {
      params.set('floorFrom', floorFrom)
    }

    if (floorTo) {
      params.set('floorTo', floorTo)
    }

    if (buildingNum) {
      params.set('buildingNum', buildingNum)
    }

    if (entrance) {
      params.set('entrance', entrance)
    }

    if (stage) {
      params.set('stage', stage)
    }

    const query = params.toString()

    router.push(query ? `/apartments?${query}` : '/apartments')
  }

  const handleReset = () => {
    setProjectName('')

    setPriceMin(minPrice)
    setPriceMax(maxPrice)

    setAreaMin(minArea)
    setAreaMax(maxArea)

    setFloorFrom('')
    setFloorTo('')
    setBuildingNum('')
    setEntrance('')
    setStage('')

    router.push('/apartments')
  }

  const priceMinPercent =
    ((priceMin - minPrice) / (maxPrice - minPrice)) * 100

  const priceMaxPercent =
    ((priceMax - minPrice) / (maxPrice - minPrice)) * 100

  const areaMinPercent =
    ((areaMin - minArea) / (maxArea - minArea)) * 100

  const areaMaxPercent =
    ((areaMax - minArea) / (maxArea - minArea)) * 100

  return (
    <section className={styles.search}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="projectName">Проект</label>

          <select
            id="projectName"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          >
            <option value="">Все проекты</option>

            {projectNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Цена */}
        <div className={styles.rangeField}>
          <div className={styles.rangeHeader}>
            <span>Цена</span>

            <span className={styles.rangeValue}>
              {priceMin.toLocaleString('ru-RU')} ₽ —{' '}
              {priceMax.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className={styles.slider}>
            <div className={styles.sliderTrack} />

            <div
              className={styles.sliderProgress}
              style={{
                left: `${priceMinPercent}%`,
                right: `${100 - priceMaxPercent}%`,
              }}
            />

            <input
              className={styles.rangeInput}
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMin}
              onChange={(event) => {
                const value = Number(event.target.value)

                if (value <= priceMax) {
                  setPriceMin(value)
                }
              }}
              aria-label="Минимальная цена"
            />

            <input
              className={styles.rangeInput}
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMax}
              onChange={(event) => {
                const value = Number(event.target.value)

                if (value >= priceMin) {
                  setPriceMax(value)
                }
              }}
              aria-label="Максимальная цена"
            />
          </div>

          <div className={styles.rangeLimits}>
            <span>{minPrice.toLocaleString('ru-RU')} ₽</span>
            <span>{maxPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        {/* Площадь */}
        <div className={styles.rangeField}>
          <div className={styles.rangeHeader}>
            <span>Площадь</span>

            <span className={styles.rangeValue}>
              {areaMin} м² — {areaMax} м²
            </span>
          </div>

          <div className={styles.slider}>
            <div className={styles.sliderTrack} />

            <div
              className={styles.sliderProgress}
              style={{
                left: `${areaMinPercent}%`,
                right: `${100 - areaMaxPercent}%`,
              }}
            />

            <input
              className={styles.rangeInput}
              type="range"
              min={minArea}
              max={maxArea}
              step="0.5"
              value={areaMin}
              onChange={(event) => {
                const value = Number(event.target.value)

                if (value <= areaMax) {
                  setAreaMin(value)
                }
              }}
              aria-label="Минимальная площадь"
            />

            <input
              className={styles.rangeInput}
              type="range"
              min={minArea}
              max={maxArea}
              step="0.5"
              value={areaMax}
              onChange={(event) => {
                const value = Number(event.target.value)

                if (value >= areaMin) {
                  setAreaMax(value)
                }
              }}
              aria-label="Максимальная площадь"
            />
          </div>

          <div className={styles.rangeLimits}>
            <span>{minArea} м²</span>
            <span>{maxArea} м²</span>
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.field}>
            <label htmlFor="floorFrom">Этаж от</label>

            <input
              id="floorFrom"
              type="number"
              min="1"
              placeholder="Любой"
              value={floorFrom}
              onChange={(event) => setFloorFrom(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="floorTo">Этаж до</label>

            <input
              id="floorTo"
              type="number"
              min="1"
              placeholder="Любой"
              value={floorTo}
              onChange={(event) => setFloorTo(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.field}>
            <label htmlFor="buildingNum">Корпус</label>

            <input
              id="buildingNum"
              type="number"
              min="1"
              placeholder="Все"
              value={buildingNum}
              onChange={(event) => setBuildingNum(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="entrance">Подъезд</label>

            <input
              id="entrance"
              type="number"
              min="1"
              placeholder="Все"
              value={entrance}
              onChange={(event) => setEntrance(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="stage">Стадия</label>

          <select
            id="stage"
            value={stage}
            onChange={(event) => setStage(event.target.value)}
          >
            <option value="">Все стадии</option>
            <option value="available">Доступна</option>
            <option value="reserved">Забронирована</option>
            <option value="sold">Продана</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={handleReset}
          >
            Сбросить
          </button>

          <button type="submit" className={styles.submitButton}>
            Найти квартиры
          </button>
        </div>
      </form>
    </section>
  )
}