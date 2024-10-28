"use client"

import { Avatar, Button, Spinner, Textarea } from "@nextui-org/react"
import { Chat, Message } from "../corporates/data"
import { MdSend } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import api from "@/external/api"
import { BiMicrophone } from "react-icons/bi"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

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
   const endOfMessageRef = useRef<HTMLDivElement | null>(null)

   // ** Functions
   const sendToChat = async () => {
      setWaiting(true)
      messages?.push({
         text,
         role: "user",
      })

      messages?.push({
         role: "bot",
         text: "waiting",
      })

      scrollToBottom()

      try {
         const { data } = await api.post(
            `/chats/${selectedChat?.slug}/messages`,
            {
               text,
            }
         )

         const waitingIndex = messages?.findLastIndex(
            (message) => message.role == "bot"
         )

         if (waitingIndex && messages) {
            messages[waitingIndex].text = data.bot.text
         }

         setWaiting(false)

         setText("")

         scrollToBottom()
      } catch (error) {
         setText("")
         setWaiting(false)
         messages?.pop()

         if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
         } else {
            toast.error("خطای نامشخصی رخ داده است")
         }
      }
   }

   const scrollToBottom = () => {
      endOfMessageRef.current?.scrollIntoView({
         behavior: "smooth",
      })
   }

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   return (
      <>
         <div className="flex flex-col relative min-h-screen bg-primary-300 pt-5 pb-20 overflow-auto">
            {isLoading && (
               <div className="flex justify-center items-center">
                  <Spinner color="primary" />
               </div>
            )}
            <div className="flex flex-col gap-10 w-full px-4 md:px-7 lg:px-10">
               {messages?.map((message, index) => (
                  <div
                     key={index}
                     className={`
                     transition-all
                     flex
                     w-full
                     items-center
                     gap-2
                     justify-start
                     ${message.role == "user" ? "" : " flex-row-reverse"}
                  `}
                  >
                     <Avatar
                        name={message.role == "bot" ? "ربات" : "من"}
                        src={
                           message.role == "bot" ? "/support.png" : "/qmark.png"
                        }
                        className="shadow-3xl"
                     />
                     <div
                        className={`
                           max-w-[80%]
                           md:max-w-[45%]
                           min-h-[60px]
                           p-5
                           rounded-2xl
                           shadow-xl
                           ${
                              message.role == "user"
                                 ? "bg-danger-100"
                                 : "bg-secondary-100"
                           }
                           transition-all
                        `}
                     >
                        {message.text === "waiting" ? (
                           <div className="flex items-center justify-center">
                              <Spinner color="primary" />
                           </div>
                        ) : (
                           message.text
                        )}
                     </div>
                  </div>
               ))}
            </div>
            <div ref={endOfMessageRef} />

            <div className="fixed bottom-0 flex justify-center items-center w-full bg-transparent">
               <Textarea
                  radius="none"
                  minRows={1}
                  classNames={{
                     innerWrapper: "items-center p-1",
                  }}
                  startContent={
                     <>
                        {text != "" ? (
                           <Button
                              isIconOnly
                              variant="shadow"
                              color="primary"
                              onClick={sendToChat}
                              radius="full"
                              className="cursor-pointer"
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
                              className="cursor-pointer"
                           >
                              <BiMicrophone size={22} />
                           </Button>
                        )}
                     </>
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
         </div>
         <Toaster
            position="top-center"
            toastOptions={{
               duration: 3000,
            }}
         />
      </>
   )
}

export default ChatContainer
