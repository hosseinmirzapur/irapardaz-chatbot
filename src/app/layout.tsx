import "./fonts/Yekan.css"
import "./globals.css"
import ApplicationContainer from "./ApplicationContainer"
import { Toaster } from "react-hot-toast"

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body dir="rtl">
            <Toaster
               position="top-center"
               toastOptions={{
                  duration: 3000,
               }}
            />
            <ApplicationContainer>{children}</ApplicationContainer>
         </body>
      </html>
   )
}
