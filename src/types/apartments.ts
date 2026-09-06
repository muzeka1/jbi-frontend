export type ApartmentStage = 'available' | 'sold' | 'reserved'

export interface Advantage {
    text: string
    color: string
}

export interface Apartment {
    id: number
    price: number
    area: number
    rooms: number
    projectName: string
    buildingNum: number
    checkIn: Date
    entrance: number
    floor: number
    advantages: Advantage[]
    image: string
    stage: ApartmentStage
}