"use client"

import { Avatar, Button } from "@nextui-org/react"

import { Chat, Corporate } from "../corporates/data"

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"

import { useState } from "react"
import { GoSidebarCollapse } from "react-icons/go"
import { MdAdd } from "react-icons/md"
import api from "@/external/api"

interface IProps {
   history: Chat[]
   selectChat: (chat: Chat) => void
   corporate: string
   toggleChange: () => void
   currentCorp?: Corporate
}

const ChatHistoryContainer: React.FC<IProps> = ({
   history,
   selectChat,
   corporate,
   toggleChange,
   currentCorp,
}) => {
   // ** States and variables
   const [collapsed, setCollapsed] = useState(false)
   const [loading, setLoading] = useState(false)

   // ** Functions
   const toggleCollapse = () => setCollapsed((prev) => !prev)

   const createNewChat = async () => {
      setLoading(true)
      const { data } = await api.post(`/corporates/${corporate}/chat`)
      toggleChange()
      setLoading(false)
   }

   return (
      <Sidebar className="py-5 space-y-10" collapsed={collapsed}>
         <div className="bg-primary-100 flex items-center justify-center">
            <Avatar
               src={`https://irapardaz-chatbots.storage.iran.liara.space/${currentCorp?.logo}`}
               name={currentCorp?.name}
            />
         </div>
         <div
            className={`bg-primary-100 flex ${
               collapsed ? "justify-center" : "justify-start"
            } p-4`}
         >
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
         <Menu
            className="bg-primary-100"
            menuItemStyles={{
               button: {
                  // the active class will be added automatically by react router
                  // so we can use it to style the active menu item
                  [`&.active`]: {
                     backgroundColor: "#13395e",
                     color: "#b6c8d9",
                  },
               },
            }}
         >
            <div className="flex items-center justify-center mb-10">
               <Button
                  color="primary"
                  variant="ghost"
                  startContent={<MdAdd size={22} />}
                  onClick={createNewChat}
                  isLoading={loading}
               >
                  افزودن چت جدید
               </Button>
            </div>
            {history.map((chat, index) => (
               <MenuItem key={index} onClick={() => selectChat(chat)}>
                  {chat.slug}
               </MenuItem>
            ))}
         </Menu>
      </Sidebar>
   )
}

export default ChatHistoryContainer
