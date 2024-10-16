"use client"

interface IProps {
   corporate: string
}

const CorporateContainer: React.FC<IProps> = () => {
   return (
      <div className="h-[100vh]">
         <h1 className="text-center text-4xl font-bold">Irapardaz</h1>
      </div>
   )
}

export default CorporateContainer
