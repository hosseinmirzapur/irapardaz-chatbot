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
         <body>
            <ApplicationContainer>{children}</ApplicationContainer>
         </body>
      </html>
   )
}
