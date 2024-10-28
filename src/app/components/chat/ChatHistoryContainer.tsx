"use client"

import { useEffect, useState } from "react"
import {
   Avatar,
   Button,
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   NavbarMenu,
   NavbarMenuToggle,
   Spinner,
   Tooltip,
} from "@nextui-org/react"

import { Chat, Corporate, Message } from "../corporates/data"

import { Menu, Sidebar } from "react-pro-sidebar"

import { GoMoveToTop, GoSidebarCollapse } from "react-icons/go"
import { MdAdd } from "react-icons/md"
import { RiChatThreadLine } from "react-icons/ri"

import api from "@/external/api"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

interface IProps {
   history: Chat[]
   selectChat: (chat: Chat) => void
   corporate: string
   toggleChange: () => void
   currentCorp?: Corporate
   isEmpty: boolean
   isLoading: boolean
   selectedChat?: Chat
   fillMessages: (message: Message) => void
}

const useScrollY = () => {
   const [scrollY, setScrollY] = useState(0)

   useEffect(() => {
      // Function to update scroll position
      const handleScroll = () => setScrollY(window.scrollY)

      // Add event listener on mount
      window.addEventListener("scroll", handleScroll)

      // Clean up event listener on unmount
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   return scrollY
}

const ChatHistoryContainer: React.FC<IProps> = ({
   history,
   selectChat,
   corporate,
   toggleChange,
   currentCorp,
   isEmpty,
   isLoading,
   selectedChat,
   fillMessages,
}) => {
   // ** States and variables
   const [collapsed, setCollapsed] = useState(false)
   const [loading, setLoading] = useState(false)
   const [navOpen, setNavOpen] = useState(false)
   const scrollY = useScrollY()

   // ** Functions
   const toggleCollapse = () => setCollapsed((prev) => !prev)
   const toggleNav = () => setNavOpen((prev) => !prev)

   const createNewChat = async () => {
      setLoading(true)
      try {
         const { data } = await api.post(`/corporates/${corporate}/chat/tci`)
         selectChat(data.chat)
         fillMessages({
            role: "bot",
            text: data.starter,
         })
         toggleChange()
         setLoading(false)
      } catch (error) {
         toggleChange()
         setLoading(false)
         if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
         } else {
            toast.error("خطایی ناشناس رخ داده است")
         }
      }
   }

   const scrollToTop = () => {
      window.scrollTo({
         behavior: "smooth",
         top: 0,
      })
   }

   return (
      <>
         <Navbar
            className="md:hidden top-0"
            onMenuOpenChange={setNavOpen}
            isMenuOpen={navOpen}
         >
            <NavbarContent>
               <NavbarMenuToggle />
               {currentCorp?.logo && (
                  <NavbarBrand>
                     <Avatar
                        src={
                           currentCorp?.logo
                              ? `https://irapardaz-chatbots.storage.iran.liara.space/${currentCorp?.logo}`
                              : undefined
                        }
                        name={currentCorp?.name}
                        color="primary"
                     />
                  </NavbarBrand>
               )}
               <NavbarMenu className="space-y-1 py-5">
                  <div className="flex items-center justify-center overflow-hidden">
                     <Button
                        color="primary"
                        variant="ghost"
                        startContent={<MdAdd size={22} />}
                        onClick={createNewChat}
                        isLoading={loading}
                        radius={"md"}
                     >
                        <span>افزودن چت جدید</span>
                     </Button>
                  </div>
                  {isLoading ? (
                     <div className="flex items-center justify-center">
                        <Spinner color="primary" />
                     </div>
                  ) : (
                     history.map((chat, index) => (
                        <NavbarItem
                           className={`
                              hover:bg-primary-200
                              ${
                                 selectedChat?.id == chat.id
                                    ? "bg-primary-300"
                                    : ""
                              }
                              cursor-pointer
                              transition-all
                              duration-300
                              ease-in-out
                              h-10
                              flex
                              items-center
                              justify-center
                              rounded-xl
                              w-full
                           `}
                           key={index}
                           onClick={() => {
                              selectChat(chat)
                              toggleNav()
                           }}
                        >
                           <div className="flex w-full justify-evenly">
                              <RiChatThreadLine size={22} />
                              {chat.slug}
                           </div>
                        </NavbarItem>
                     ))
                  )}
                  {isEmpty && (
                     <div className="flex items-center justify-center">
                        تاریخچه ای ثبت نشده است
                     </div>
                  )}
               </NavbarMenu>
            </NavbarContent>
         </Navbar>
         <Sidebar
            className="py-5 space-y-10 min-h-screen h-full hidden md:block relative"
            collapsed={collapsed}
         >
            <div
               className={`
                     flex
                     items-center
                     justify-center
                     w-full
                     absolute
                     bottom-0
                     ${scrollY > 10 ? "block" : "hidden"}
                  `}
            >
               <Tooltip content={"رفتن به بالای صفحه"} color="primary">
                  <Button
                     isIconOnly
                     radius="full"
                     color="primary"
                     variant="shadow"
                     onClick={scrollToTop}
                  >
                     <GoMoveToTop size={22} />
                  </Button>
               </Tooltip>
            </div>
            <div className="bg-primary-100 flex items-center justify-center">
               <Avatar
                  src={
                     currentCorp?.logo
                        ? `https://irapardaz-chatbots.storage.iran.liara.space/${currentCorp?.logo}`
                        : undefined
                  }
                  name={currentCorp?.name}
                  color="primary"
               />
            </div>
            <div className={`bg-primary-100 flex justify-center p-4`}>
               <Button
                  isIconOnly
                  variant="flat"
                  radius="full"
                  color="primary"
                  onClick={toggleCollapse}
               >
                  <GoSidebarCollapse
                     size={22}
                     className={collapsed ? "rotate-180" : ""}
                  />
               </Button>
            </div>
            <Menu className="bg-primary-100 h-full w-full">
               <div className="flex items-center justify-center mb-10 overflow-hidden">
                  <Button
                     color="primary"
                     variant="ghost"
                     startContent={collapsed ? <></> : <MdAdd size={22} />}
                     onClick={createNewChat}
                     isLoading={loading}
                     isIconOnly={collapsed}
                     radius={collapsed ? "full" : "md"}
                  >
                     {collapsed ? (
                        <MdAdd size={22} />
                     ) : (
                        <span>افزودن چت جدید</span>
                     )}
                  </Button>
               </div>

               {isLoading ? (
                  <div className="flex items-center justify-center">
                     <Spinner color="primary" />
                  </div>
               ) : (
                  history.map((chat, index) => (
                     <div
                        className={`
                        hover:bg-primary-200
                        ${selectedChat?.id == chat.id ? "bg-primary-300" : ""}
                        cursor-pointer
                        transition-all
                        duration-300
                        ease-in-out
                        h-10
                        flex
                        items-center
                        justify-center
                     `}
                        key={index}
                        onClick={() => selectChat(chat)}
                     >
                        {collapsed ? (
                           <RiChatThreadLine size={22} />
                        ) : (
                           <div className="flex w-full justify-around">
                              <RiChatThreadLine size={22} />
                              {chat.slug}
                           </div>
                        )}
                     </div>
                  ))
               )}
               {isEmpty && (
                  <div className="flex items-center justify-center">
                     تاریخچه ای ثبت نشده است
                  </div>
               )}
            </Menu>
         </Sidebar>
         <Toaster
            position="top-center"
            toastOptions={{
               duration: 3000,
            }}
         />
      </>
   )
}

export default ChatHistoryContainer
