"use client"

import Image from "next/image"

import { Button } from "@nextui-org/react"

import { BsChatText } from "react-icons/bs"
import { useRouter } from "next/navigation"

const HomeContainer = () => {
   // ** States and variables
   const router = useRouter()

   // ** Functions
   const handleChatPage = () => {
      const corporate = process.env.NEXT_PUBLIC_CORPORATE as string
      console.log(corporate)
      if (!corporate || corporate === "") {
         alert("لطفا ابتدا نام سازمان درخواست کننده را تنظیم کنید")
         return
      }

      router.push(`/${corporate}`)
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
         <div>
            <Button
               radius="lg"
               color="primary"
               variant="shadow"
               endContent={<BsChatText size={22} />}
               size="lg"
               onClick={handleChatPage}
            >
               رفتن به صفحه چت
            </Button>
         </div>
      </div>
   )
}

export default HomeContainer
