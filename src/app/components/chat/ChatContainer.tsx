"use client"

import { Avatar, Button, Spinner, Textarea } from "@nextui-org/react"
import { Chat, Message } from "../corporates/data"
import { MdSend } from "react-icons/md"
import { useState } from "react"
import api from "@/external/api"
import { BiMicrophone } from "react-icons/bi"

interface IProps {
   messages?: Message[]
   selectedChat?: Chat
   isLoading: boolean
}

const ChatContainer: React.FC<IProps> = ({
   messages,
   selectedChat,
   isLoading,
}) => {
   // ** States and variables
   const [text, setText] = useState("")
   const [waiting, setWaiting] = useState(false)

   // ** Functions
   const sendToChat = async () => {
      setWaiting(true)
      const { data } = await api.post(`/chats/${selectedChat?.slug}/messages`, {
         text,
      })

      messages?.push({
         id: data.user.id,
         text: data.user.text,
         role: "user",
      })

      messages?.push({
         id: data.bot.id,
         text: data.bot.text,
         role: "bot",
      })

      setWaiting(false)

      setText("")
   }
   return (
      <div className="flex flex-col relative h-screen w-11/12 mx-auto py-20">
         <div className="flex flex-col items-center justify-center gap-10 max-h-screen overflow-auto">
            {isLoading && (
               <div className="flex justify-center items-center">
                  <Spinner color="primary" />
               </div>
            )}
            {messages?.map((message, index) => (
               <div
                  key={index}
                  className={`
                     flex
                     w-full
                     items-center
                     gap-2
                     justify-start
                     ${message.role == "user" ? "" : " flex-row-reverse"}`}
               >
                  <Avatar name={message.role == "bot" ? "ربات" : "من"} />
                  <div className="w-[45%] min-h-[100px] p-5 rounded-3xl bg-danger-100">
                     {message.text}
                  </div>
               </div>
            ))}
         </div>
         <Textarea
            className="absolute bottom-0"
            minRows={1}
            classNames={{
               innerWrapper: "items-center p-1",
            }}
            startContent={
               <div className="flex transition-all">
                  {text != "" ? (
                     <Button
                        isIconOnly
                        variant="shadow"
                        color="primary"
                        onClick={sendToChat}
                        radius="full"
                        className="transition-all"
                        isLoading={waiting}
                     >
                        <MdSend size={22} />
                     </Button>
                  ) : (
                     <Button
                        isIconOnly
                        variant="shadow"
                        color="primary"
                        onClick={sendToChat}
                        disabled={text === ""}
                        radius="full"
                        isLoading={waiting}
                     >
                        <BiMicrophone size={22} />
                     </Button>
                  )}
               </div>
            }
            placeholder="سوال خود را اینجا بنویسید..."
            onValueChange={setText}
            value={text}
            onKeyDown={(e) => {
               if ((e.ctrlKey || e.metaKey) && e.key == "Enter") {
                  e.preventDefault()
                  sendToChat()
               }
            }}
         />
      </div>
   )
}

export default ChatContainer
