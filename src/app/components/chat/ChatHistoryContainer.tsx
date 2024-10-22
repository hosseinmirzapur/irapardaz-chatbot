"use client"

import { Button } from "@nextui-org/react"

import { Chat } from "../corporates/data"

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"

import { RxHamburgerMenu } from "react-icons/rx"
import { useState } from "react"
import { GoSidebarCollapse } from "react-icons/go"

interface IProps {
   history: Chat[]
   selectChat: (chat: Chat) => void
}

const ChatHistoryContainer: React.FC<IProps> = ({ history, selectChat }) => {
   // ** States and variables
   const [collapsed, setCollapsed] = useState(false)

   // ** Functions
   const toggleCollapse = () => setCollapsed((prev) => !prev)

   return (
      <Sidebar className="py-5 space-y-10" collapsed={collapsed}>
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
