"use client"

import { Avatar, Button, Spinner } from "@nextui-org/react"

import { Chat, Corporate } from "../corporates/data"

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"

import { useState } from "react"
import { GoSidebarCollapse } from "react-icons/go"
import { MdAdd, MdClose } from "react-icons/md"
import api from "@/external/api"
import { RiChatThreadLine } from "react-icons/ri"

interface IProps {
   history: Chat[]
   selectChat: (chat: Chat) => void
   corporate: string
   toggleChange: () => void
   currentCorp?: Corporate
   isEmpty: boolean
   isLoading: boolean
   selectedChat?: Chat
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
}) => {
   // ** States and variables
   const [collapsed, setCollapsed] = useState(false)
   const [loading, setLoading] = useState(false)

   // ** Functions
   const toggleCollapse = () => setCollapsed((prev) => !prev)

   const createNewChat = async () => {
      setLoading(true)
      const { data } = await api.post(`/corporates/${corporate}/chat`)
      selectChat(data.chat)
      toggleChange()
      setLoading(false)
   }

   return (
      <Sidebar className="py-5 space-y-10 min-h-screen" collapsed={collapsed}>
         <div className="bg-primary-100 flex items-center justify-center">
            <Avatar
               src={`https://irapardaz-chatbots.storage.iran.liara.space/${currentCorp?.logo}`}
               name={currentCorp?.name}
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
         <Menu className="bg-primary-100">
            <div className="flex items-center justify-center mb-10">
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
               <>
                  {isEmpty ? (
                     <div className="text-center">تاریخچه ای ثبت نشده است</div>
                  ) : (
                     <div className="flex items-center justify-center">
                        <Spinner color="primary" />
                     </div>
                  )}
               </>
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
                     <div className="flex justify-around w-full">
                        {!collapsed && <RiChatThreadLine size={22} />}
                        {chat.slug}
                     </div>
                  </div>
               ))
            )}
         </Menu>
      </Sidebar>
   )
}

export default ChatHistoryContainer
