import { Apartment } from "../types/apartments"

export const apartments:Apartment[] = [
    {
        price: 5.1,
        area: 30,
        rooms: 1,
        projectName: "JBI",
        buildingNum: 1,
        checkIn: new Date('2026-09-04T12:00:00Z'),
        entrance: 1,
        floor: 5,
        advantages: [
            {
                text: "красивая",
                color: "red"
            }
        ],
        image: "test",
        stage: "available"
    },
    {
        price: 9.6,
        area: 60.2,
        rooms: 3,
        projectName: "JBI",
        buildingNum: 2,
        checkIn: new Date('2026-09-04T12:00:00Z'),
        entrance: 1,
        floor: 10,
        advantages: [
            {
                text: "красивая",
                color: "red"
            }
        ],
        image: "test",
        stage: "available"
    },
    {
        price: 4.7,
        area: 25,
        rooms: 2,
        projectName: "JBI",
        buildingNum: 3,
        checkIn: new Date('2026-09-04T12:00:00Z'),
        entrance: 2,
        floor: 6,
        advantages: [
            {
                text: "красивая",
                color: "red"
            }
        ],
        image: "test",
        stage: "available"
    },
]