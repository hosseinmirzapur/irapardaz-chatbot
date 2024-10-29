"use client"

import { useEffect, useState } from "react"

import { Chat, Corporate, Message } from "./data"

import api from "@/external/api"
import ChatHistoryContainer from "../chat/ChatHistoryContainer"
import ChatContainer from "../chat/ChatContainer"
import Image from "next/image"

interface IProps {
   corporate: string
}

const CorporateContainer: React.FC<IProps> = ({ corporate }) => {
   // ** States and variables
   const [currentCorp, setCurrentCorp] = useState<Corporate>()
   const [chatHistory, setChatHistory] = useState<Chat[]>([])
   const [empty, setEmpty] = useState(true)
   const [selectedChat, setSelectedChat] = useState<Chat>()
   const [messages, setMessages] = useState<Message[]>([])
   const [changed, setChanged] = useState(false)
   const [loading, setLoading] = useState(false)

   // ** Functions
   const toggleChange = () => setChanged((prev) => !prev)
   const toggleLoading = () => setLoading((prev) => !prev)
   const selectChat = (chat: Chat) => {
      setSelectedChat(chat)
   }
   const fillMessages = (message: Message) => {
      setMessages([...messages, message])
   }

   const getCurrentCorp = async () => {
      toggleLoading()
      const { data } = await api.get(`/corporates/${corporate}`)
      setCurrentCorp(data.corporate)
      toggleLoading()
   }

   const getChatHistory = async () => {
      toggleLoading()
      const resp = await api.get(`/corporates/${corporate}/chats`)
      const data: Chat[] = resp.data.chats
      if (data.length != 0) {
         setEmpty(false)

         if (data[data.length - 1]) selectChat(data[data.length - 1])
      }
      setChatHistory(data)
      toggleLoading()
   }

   const getChatMessages = async (chat?: Chat) => {
      if (chat) {
         toggleLoading()
         const { data } = await api.get(`/chats/${chat.slug}/messages`)
         setMessages(data.messages)
         toggleLoading()
      }
   }

   useEffect(() => {
      getCurrentCorp()
      getChatHistory()
   }, [changed])

   useEffect(() => {
      getChatMessages(selectedChat)
   }, [selectedChat])

   return (
      <div className="flex flex-col md:flex-row min-h-screen relative">
         <div className="bg-primary-100 md:min-h-screen relative">
            <ChatHistoryContainer
               history={chatHistory}
               selectChat={selectChat}
               corporate={corporate}
               toggleChange={toggleChange}
               currentCorp={currentCorp}
               isEmpty={empty}
               isLoading={loading}
               selectedChat={selectedChat}
               fillMessages={fillMessages}
            />
         </div>
         <div className="relative min-h-screen w-full">
            {currentCorp?.chat_bg && (
               <Image
                  src={`https://irapardaz-chatbots.storage.iran.liara.space/${currentCorp?.chat_bg}`}
                  alt="background-image"
                  fill
                  style={{
                     filter: "brightness(50%)",
                  }}
                  className="fixed top-0 right-0 left-0 bottom-0"
               />
            )}
            <ChatContainer
               messages={messages}
               selectedChat={selectedChat}
               isLoading={loading}
               currentCorp={currentCorp}
            />
         </div>
      </div>
   )
}

export default CorporateContainer
