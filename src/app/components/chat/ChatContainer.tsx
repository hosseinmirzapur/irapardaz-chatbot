"use client"

import { Button, Input } from "@nextui-org/react"
import { Chat, Message } from "../corporates/data"
import { MdSend } from "react-icons/md"
import { useState } from "react"
import api from "@/external/api"

interface IProps {
   messages?: Message[]
   selectedChat?: Chat
}

const ChatContainer: React.FC<IProps> = ({ messages, selectedChat }) => {
   // ** States and variables
   const [text, setText] = useState("")

   // ** Functions
   const sendToChat = async () => {
      const { data } = await api.post(`/chats/${selectedChat?.slug}/messages`, {
         text,
      })

      messages?.push({
         id: data.user.id,
         role: "user",
         text: data.user.text,
      })

      messages?.push({
         id: data.bot.id,
         role: "bot",
         text: data.bot.text,
      })

      setText("")
   }
   return (
      <div className="w-11/12 bg-primary-200 h-full mx-auto py-20 rounded-2xl">
         <div className="flex flex-col justify-between space-y-10 w-11/12 h-full mx-auto relative">
            {messages?.map((message, index) => (
               <div
                  key={index}
                  className={`flex ${
                     message.role == "user" ? "justify-start" : "justify-end"
                  }`}
               >
                  <div className="w-[200px] h-[100px] p-5 rounded-3xl bg-danger-100">
                     {message.text}
                  </div>
               </div>
            ))}
            <div className="absolute bottom-0 w-full">
               <Input
                  type="text"
                  startContent={
                     <Button
                        isIconOnly
                        variant="shadow"
                        color="primary"
                        onClick={sendToChat}
                        disabled={text === ""}
                        size="sm"
                     >
                        <MdSend size={22} />
                     </Button>
                  }
                  placeholder="سوال خود را اینجا بنویسید..."
                  onValueChange={setText}
               />
            </div>
         </div>
      </div>
   )
}

export default ChatContainer
