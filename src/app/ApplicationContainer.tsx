"use client"

import { NextUIProvider } from "@nextui-org/react"

interface IProps {
   children: React.ReactNode
}

const ApplicationContainer: React.FC<IProps> = ({ children }) => {
   return (
      <NextUIProvider
         className="
            bg-gradient-to-b
            from-blue-200
            to-blue-50
         "
      >
         {children}
      </NextUIProvider>
   )
}

export default ApplicationContainer
