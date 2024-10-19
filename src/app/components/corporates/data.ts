export interface Corporate {
   id: number | string
   name: string
   chatBg?: string
   logo?: string
   status: "PENDING" | "ACCEPTED" | "REJECTED"
}

export const corporates: Corporate[] = [
   {
      id: 1,
      name: "Tech Innovations Inc.",
      status: "PENDING",
   },
   {
      id: 2,
      name: "Green Solutions LLC",
      status: "ACCEPTED",
   },
   {
      id: 3,
      name: "Global Finance Corp.",
      status: "REJECTED",
   },
   {
      id: 4,
      name: "Creative Designs Studio",
      status: "PENDING",
   },
   {
      id: 5,
      name: "HealthTech Innovations",
      status: "ACCEPTED",
   },
   {
      id: 6,
      name: "Eco-Friendly Products Ltd.",
      status: "REJECTED",
   },
   {
      id: 7,
      name: "Smart Home Solutions",
      status: "PENDING",
   },
   {
      id: 8,
      name: "NextGen Robotics",
      status: "ACCEPTED",
   },
   {
      id: 9,
      name: "Digital Marketing Agency",
      status: "REJECTED",
   },
   {
      id: 10,
      name: "Innovative Learning Solutions",
      status: "PENDING",
   },
]
