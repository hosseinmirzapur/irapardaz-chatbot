"use client"

import { useEffect, useState } from "react"

import { Chat, chats, Message } from "./data"

import api from "@/external/api"
import ChatHistoryContainer from "../chat/ChatHistoryContainer"
import ChatContainer from "../chat/ChatContainer"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { MdArrowBackIosNew, MdHome } from "react-icons/md"

interface IProps {
   corporate: string
}

const CorporateContainer: React.FC<IProps> = ({ corporate }) => {
   // ** States and variables
   const [chatHistory, setChatHistory] = useState<Chat[]>()
   const [selectedChat, setSelectedChat] = useState<Chat>()
   const [messages, setMessages] = useState<Message[]>()
   const [changed, setChanged] = useState(false)

   // ** Functions
   const toggleChange = () => setChanged((prev) => !prev)
   const selectChat = (chat: Chat) => {
      setSelectedChat(chat)
   }

   const getChatHistory = async () => {
      // const resp = await api.get(`/corporates/${corporate}/chats`)
      // const data: Chat[] = resp.data.chats
      const data = chats
      setChatHistory(data)
   }

   const getChatMessages = async () => {}

   useEffect(() => {
      getChatHistory()
   }, [changed])

   return (
      <div className="h-[100vh] flex">
         <div
            className="
               flex
               items-center
               justify-between
               container
            "
         >
            <div className="h-full bg-primary-100">
               <ChatHistoryContainer history={chats} selectChat={selectChat} />
            </div>
            <div className="relative h-[100vh] w-full">
               <Breadcrumbs
                  size="lg"
                  className="absolute top-10 right-10"
                  separator={<MdArrowBackIosNew size={18} />}
               >
                  <BreadcrumbItem href="/" startContent={<MdHome size={22} />}>
                     خانه
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/corporates">
                     لیست شرکت ها
                  </BreadcrumbItem>
                  <BreadcrumbItem>صفحه چت</BreadcrumbItem>
               </Breadcrumbs>
               <ChatContainer messages={messages} />
            </div>
         </div>
      </div>
   )
}

export default CorporateContainer
