import CorporateContainer from "@/app/components/corporates/CorporateContainer"
import { Metadata } from "next"

interface PageProps {
   corporate: string
}

export const metadata: Metadata = {
   title: "صفحه چت",
}

export default function CorporateHomePage({ params }: { params: PageProps }) {
   return <CorporateContainer corporate={params.corporate} />
}
