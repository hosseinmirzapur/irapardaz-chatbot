import type { Metadata } from "next"
import "./fonts/Yekan.css"
import "./globals.css"
import ApplicationContainer from "./ApplicationContainer"

export const metadata: Metadata = {
   title: "چت بات ایراپرداز",
   description: "سامانه مدیریت چت بات های هوشمند ایراپرداز",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body>
            <ApplicationContainer>{children}</ApplicationContainer>
         </body>
      </html>
   )
}
