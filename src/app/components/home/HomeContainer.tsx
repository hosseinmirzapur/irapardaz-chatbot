"use client"

import Image from "next/image"

import { Button } from "@nextui-org/react"

import { FaList } from "react-icons/fa"

const HomeContainer = () => {
   // ** Functions
   const handleCorporateList = () => {
      const anchor = document.createElement("a")
      anchor.target = "_blank"
      anchor.href = "https://chatbots-api.irapardaz.ir/admin/corporates"
      anchor.click()
      anchor.remove()
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
         </div>
      </div>
   )
}

export default HomeContainer
