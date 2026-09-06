"use client"
import ApartmentsSearch from '../../components/apartments-section/apartments-search/apartments-search';
import {apartments} from "@/src/api/apartmemts";
import { useState } from "react";
import { Apartment } from '../../types/apartments';
import ApartmentList from '../../components/apartments-section/apartments-list/apartments-list';
import ApartmentsSection from '../../components/apartments-section/apartments-section';

export default function HomePage() {
  
  return (
    <main>
      <ApartmentsSection/>
    </main>
  );
}