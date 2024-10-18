import { Metadata } from "next"

import HomeContainer from "./components/home/HomeContainer"

export const metadata: Metadata = {
   title: "صفحه اصلی",
}

export default function Home() {
   return <HomeContainer />
}
