import { Metadata } from "next"
import CorporateListContainer from "../components/corporates/CorporateListContainer"

export const metadata: Metadata = {
   title: "لیست شرکت ها",
}

export default function () {
   return <CorporateListContainer />
}
