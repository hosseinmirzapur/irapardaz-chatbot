"use client"

import { NextUIProvider } from "@nextui-org/react"
import { Toaster } from "react-hot-toast"

interface IProps {
   children: React.ReactNode
}

const ApplicationContainer: React.FC<IProps> = ({ children }) => {
   return (
      <NextUIProvider
         className="
            bg-gradient-to-b
            from-blue-100
            to-blue-50
         "
      >
         <Toaster
            position="top-center"
            toastOptions={{
               duration: 3000,
            }}
         />
         {children}
      </NextUIProvider>
   )
}

export default ApplicationContainer
