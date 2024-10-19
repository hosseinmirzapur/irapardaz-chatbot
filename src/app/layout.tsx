import "./fonts/Yekan.css"
import "./globals.css"
import ApplicationContainer from "./ApplicationContainer"

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body dir="rtl">
            <ApplicationContainer>{children}</ApplicationContainer>
         </body>
      </html>
   )
}
