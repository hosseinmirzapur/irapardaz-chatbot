export interface Corporate {
   id: number | string
   name: string
   chat_bg?: string
   logo?: string
   status: "PENDING" | "ACCEPTED" | "REJECTED"
}

export interface Chat {
   id: number | string
   slug: string
}

export interface Message {
   role: "user" | "bot"
   text: string
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

export const chats: Chat[] = [
   {
      id: 1,
      slug: "welcome-to-the-chat",
   },
   {
      id: 2,
      slug: "tech-talks",
   },
   {
      id: 3,
      slug: "health-and-wellness",
   },
   {
      id: 4,
      slug: "travel-adventures",
   },
   {
      id: 5,
      slug: "foodie-favorites",
   },
   {
      id: 6,
      slug: "book-club",
   },
   {
      id: 7,
      slug: "gaming-community",
   },
   {
      id: 8,
      slug: "music-lovers",
   },
   {
      id: 9,
      slug: "film-critics",
   },
   {
      id: 10,
      slug: "fitness-friends",
   },
]
