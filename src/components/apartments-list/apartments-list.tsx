import { Apartment } from "@/src/types/apartments";

import styles from "./apartments-list.module.css";

type ApartmentListProps = {
  apartments: Apartment[];
};

export default function ApartmentList({
  apartments,
}: ApartmentListProps) {
  if (!apartments.length) {
    return (
      <div className={styles.empty}>
        По выбранным параметрам квартир не найдено
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {apartments.map((apartment, index) => (
        <div
          className={styles.card}
          key={`${apartment.projectName}-${apartment.buildingNum}-${apartment.floor}-${index}`}
        >
          <div className={styles.image}>
            {apartment.image}
          </div>

          <div className={styles.content}>
            <div className={styles.project}>
              {apartment.projectName}
            </div>

            <div className={styles.info}>
              <span>{apartment.rooms} комн.</span>
              <span>{apartment.area} м²</span>
              <span>{apartment.floor} этаж</span>
            </div>

            <div className={styles.price}>
              {apartment.price} млн ₽
            </div>

            <div className={styles.details}>
              <span>
                Корпус {apartment.buildingNum}
              </span>

              <span>
                Подъезд {apartment.entrance}
              </span>
            </div>

            {apartment.advantages?.length > 0 && (
              <div className={styles.advantages}>
                {apartment.advantages.map(
                  (advantage, advantageIndex) => (
                    <span
                      key={`${advantage.text}-${advantageIndex}`}
                      className={styles.advantage}
                      style={{
                        color: advantage.color,
                      }}
                    >
                      {advantage.text}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}