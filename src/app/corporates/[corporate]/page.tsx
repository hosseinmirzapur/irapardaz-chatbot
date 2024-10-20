import CorporateContainer from "@/app/components/corporates/CorporateContainer"

interface PageProps {
   corporate: string
}

export default function CorporateHomePage({ params }: { params: PageProps }) {
   return <CorporateContainer corporate={params.corporate} />
}
