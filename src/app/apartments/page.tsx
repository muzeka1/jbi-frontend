"use client"
import ApartmentsSearch from '../../components/apartments-search/apartments-search';
import {apartments} from "@/src/api/apartmemts";
import { useState } from "react";
import { Apartment } from '../../types/apartments';
import ApartmentList from '../../components/apartments-list/apartments-list';

export default function HomePage() {
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>(apartments);
  
  return (
    <main>
      <ApartmentsSearch 
      apartments={apartments}
      onFilterChange={setFilteredApartments}
      />
      <ApartmentList apartments={filteredApartments} />
    </main>
  );
}