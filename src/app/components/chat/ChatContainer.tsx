"use client"

import { Avatar, Button, Spinner, Textarea } from "@nextui-org/react"
import { Chat, Corporate, Message } from "../corporates/data"
import { MdSend } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import api from "@/external/api"
import { BiMicrophone } from "react-icons/bi"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import VoiceRecordModal from "./VoiceRecordModal"
import ReactMarkdown from "react-markdown"

interface IProps {
   messages?: Message[]
   selectedChat?: Chat
   isLoading: boolean
   currentCorp?: Corporate
}

const ChatContainer: React.FC<IProps> = ({
   messages,
   selectedChat,
   isLoading,
   currentCorp,
}) => {
   // ** States and variables
   const [text, setText] = useState("")
   const [waiting, setWaiting] = useState(false)
   const endOfMessageRef = useRef<HTMLDivElement | null>(null)
   const [record, setRecord] = useState(false)
   const [voiceFile, setVoiceFile] = useState<Blob | null>(null)

   // ** Functions
   const sendText = async () => {
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

   const sendVoice = async () => {
      setWaiting(true)

      messages?.push({
         text: "waiting",
         role: "user",
      })
      messages?.push({
         text: "waiting",
         role: "bot",
      })

      scrollToBottom()

      try {
         const fd = new FormData()
         if (voiceFile) {
            fd.append("voice", voiceFile, "voice-message.webm")
         }

         const { data } = await api.post(
            `/chats/${selectedChat?.slug}/messages`,
            fd
         )

         const userIndex = messages?.findLastIndex(
            (message) => message.role == "user"
         )

         if (userIndex && messages) {
            messages[userIndex].text = data.user.text
         }

         const botIndex = messages?.findLastIndex(
            (message) => message.role == "bot"
         )

         if (botIndex && messages) {
            messages[botIndex].text = data.bot.text
         }

         setWaiting(false)
         setText("")

         scrollToBottom()
      } catch (error) {
         setWaiting(false)

         // pop 2 last items from messages array
         messages?.pop()
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

   const toggleRecord = () => setRecord((prev) => !prev)
   const fillVoice = (voice: Blob) => {
      setVoiceFile(voice)
   }

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   return (
      <>
         <div
            className={`flex flex-col relative min-h-screen ${
               currentCorp?.chat_bg ? "" : "bg-primary-300"
            } pt-5 pb-20 overflow-auto`}
         >
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
                        ) : message.role === "bot" ? (
                           <ReactMarkdown>{message.text}</ReactMarkdown>
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
                  autoFocus
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
                              onClick={sendText}
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
                              onPress={toggleRecord}
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
                        sendText()
                     }
                  }}
               />
            </div>
            <VoiceRecordModal
               open={record}
               toggleOpen={toggleRecord}
               fillVoice={fillVoice}
               sendVoice={sendVoice}
               waiting={waiting}
            />
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
