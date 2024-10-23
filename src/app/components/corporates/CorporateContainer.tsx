"use client"

import { useEffect, useState } from "react"

import { Chat, Corporate, Message } from "./data"

import api from "@/external/api"
import ChatHistoryContainer from "../chat/ChatHistoryContainer"
import ChatContainer from "../chat/ChatContainer"

interface IProps {
   corporate: string
}

const CorporateContainer: React.FC<IProps> = ({ corporate }) => {
   // ** States and variables
   const [currentCorp, setCurrentCorp] = useState<Corporate>()
   const [chatHistory, setChatHistory] = useState<Chat[]>([])
   const [selectedChat, setSelectedChat] = useState<Chat>()
   const [messages, setMessages] = useState<Message[]>()
   const [changed, setChanged] = useState(false)

   // ** Functions
   const toggleChange = () => setChanged((prev) => !prev)
   const selectChat = (chat: Chat) => {
      setSelectedChat(chat)
   }

   const getCurrentCorp = async () => {
      const { data } = await api.get(`/corporates/${corporate}`)
      setCurrentCorp(data.corporate)
   }

   const getChatHistory = async () => {
      const resp = await api.get(`/corporates/${corporate}/chats`)
      const data: Chat[] = resp.data.chats
      setChatHistory(data)
   }

   const getChatMessages = async (schat?: Chat) => {
      if (schat) {
         const { data } = await api.get(`/chats/${schat.slug}/messages`)
         setMessages(data.messages)
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
               <ChatHistoryContainer
                  history={chatHistory}
                  selectChat={selectChat}
                  corporate={corporate}
                  toggleChange={toggleChange}
                  currentCorp={currentCorp}
               />
            </div>
            <div className="relative h-[100vh] w-full py-10">
               <ChatContainer messages={messages} selectedChat={selectedChat} />
            </div>
         </div>
      </div>
   )
}

export default CorporateContainer
