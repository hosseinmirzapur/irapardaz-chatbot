"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@nextui-org/react"

import { FaList } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"

const HomeContainer = () => {
   // ** States and variables
   const router = useRouter()

   // ** Functions
   const handleCorporateList = () => {
      router.push("/corporates")
   }

   const handleAddCorporate = () => {
      // todo: Open modal and add a new corporate
   }

   return (
      <div
         className="
            flex
            flex-col
            justify-center
            items-center
            h-[100vh]
            space-y-20
            w-10/12
            mx-auto
        "
      >
         <Image
            src="/irapardaz-logo.svg"
            alt="irapardaz-logo"
            width={200}
            height={200}
         />
         <h1
            className="
                flex
                flex-wrap
                text-center
                text-xl
                md:text-2xl
                lg:text-3xl
                font-bold
            "
         >
            سامانه مدیریت چت بات های هوشمند ایراپرداز
         </h1>
         <div className="flex flex-col md:flex-row gap-5">
            <Button
               radius="lg"
               color="primary"
               variant="shadow"
               endContent={<FaList size={22} />}
               size="lg"
               onClick={handleCorporateList}
            >
               لیست شرکت ها
            </Button>
            <Button
               radius="lg"
               color="primary"
               variant="shadow"
               endContent={<IoMdAdd size={22} />}
               size="lg"
               onClick={handleAddCorporate}
            >
               افزودن شرکت جدید
            </Button>
         </div>
      </div>
   )
}

export default HomeContainer
