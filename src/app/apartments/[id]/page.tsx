import { notFound } from "next/navigation";
import Image from "next/image";

import { apartments } from "@/src/api/apartmemts";

type ApartmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApartmentPage({
  params,
}: ApartmentPageProps) {
  const { id } = await params;

  const apartment = apartments.find(
    (apartment) => apartment.id === Number(id)
  );

  if (!apartment) {
    notFound();
  }

  return (
    <main>
      <h1>
        Квартира в проекте {apartment.projectName}
      </h1>

      <Image
        src={apartment.image}
        width={1316}
        height={1861}
        alt="Фото квартиры"
      />

      <div>
        <p>{apartment.rooms} комн.</p>
        <p>{apartment.area} м²</p>
        <p>{apartment.floor} этаж</p>
        <p>{apartment.price} млн ₽</p>
        <p>Корпус {apartment.buildingNum}</p>
        <p>Подъезд {apartment.entrance}</p>
      </div>
    </main>
  );
}