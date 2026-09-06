import ApartmentsSearch from "./apartments-search/apartments-search";
import ApartmentsList from "./apartments-list/apartments-list";
import { apartments } from "@/src/api/apartmemts";
import { useState } from "react";
import { Apartment } from "../../types/apartments";
import styles from "./apartments-section.module.css"

export default function ApartmentsSection() {
    const [filteredApartments, setFilteredApartments] = useState<Apartment[]>(apartments);
    return (
        <section className={styles.section}>
            <ApartmentsSearch
                apartments={apartments}
                onFilterChange={setFilteredApartments}
            />
            <ApartmentsList apartments={filteredApartments} />
        </section>
    )
}