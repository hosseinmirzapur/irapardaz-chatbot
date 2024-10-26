import { Metadata } from "next"

import HomeContainer from "./components/home/HomeContainer"

export const metadata: Metadata = {
   title: "چت بات های ایراپرداز",
}

export default function Home() {
   return <HomeContainer />
}
