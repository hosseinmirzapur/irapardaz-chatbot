"use client"

import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   Spinner,
} from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { BiMicrophone, BiRepeat, BiStop } from "react-icons/bi"
import { VscSend } from "react-icons/vsc"

interface IProps {
   open: boolean
   toggleOpen: () => void
   fillVoice: (voice: Blob) => void
   sendVoice: () => Promise<void>
   waiting: boolean
}

const VoiceRecordModal: React.FC<IProps> = ({
   open,
   toggleOpen,
   fillVoice,
   sendVoice,
   waiting,
}) => {
   // ** States and variables
   const [recording, setRecording] = useState(false)
   const [recordedUrl, setRecordedUrl] = useState<string>("")
   const mediaStream = useRef<MediaStream | null>(null)
   const mediaRecorder = useRef<MediaRecorder | null>(null)
   const chunks = useRef<Blob[]>([])

   // ** Functions
   const startRecording = async () => {
      setRecording(true)
      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
         })
         mediaStream.current = stream
         mediaRecorder.current = new MediaRecorder(stream, {
            mimeType: "audio/webm",
         })

         mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
            if (e.data.size > 0) {
               chunks.current.push(e.data)
            }
         }

         mediaRecorder.current.onstop = () => {
            const recordedBlob = new Blob(chunks.current, {
               type: "audio/webm",
            })
            fillVoice(recordedBlob)
            const url = URL.createObjectURL(recordedBlob)
            setRecordedUrl(url)
            chunks.current = []
         }

         mediaRecorder.current.start()
      } catch (e) {
         console.log(e)
         toast.error("شما دسترسی میکروفون را برای مرورگر محدود کرده اید")
         setRecording(false)
      }
   }

   const stopRecording = () => {
      if (
         mediaRecorder.current &&
         mediaRecorder.current.state === "recording"
      ) {
         mediaRecorder.current.stop()
      }

      if (mediaStream.current) {
         mediaStream.current.getTracks().forEach((track) => track.stop())
      }
      setRecording(false)
   }

   const repeatRecord = async () => {
      setRecordedUrl("")
      await startRecording()
   }

   useEffect(() => {
      setRecordedUrl("")
      setRecording(false)
   }, [open])

   return (
      <Modal isOpen={open} onOpenChange={toggleOpen}>
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader>ضبط پیام صوتی</ModalHeader>
                  <ModalBody className="flex flex-col gap-5">
                     <div className="flex items-center justify-center gap-5">
                        <Button
                           isIconOnly
                           color="primary"
                           onPress={() =>
                              recording ? stopRecording() : startRecording()
                           }
                           isDisabled={recordedUrl != ""}
                        >
                           {recording ? (
                              <BiStop size={22} />
                           ) : (
                              <BiMicrophone size={22} />
                           )}
                        </Button>
                        {recordedUrl != "" && (
                           <audio
                              controls
                              src={recordedUrl}
                              className="rounded-2xl bg-primary-500"
                           />
                        )}
                     </div>
                     {recording ? (
                        <div className="flex items-center justify-center animate-pulse">
                           در حال ضبط...
                        </div>
                     ) : (
                        recordedUrl != "" && (
                           <div className="flex items-center justify-center">
                              <Button
                                 onPress={repeatRecord}
                                 startContent={<BiRepeat size={20} />}
                                 color="primary"
                                 variant="ghost"
                              >
                                 تکرار ضبط
                              </Button>
                           </div>
                        )
                     )}
                  </ModalBody>
                  <ModalFooter className="flex justify-between">
                     <Button
                        color="primary"
                        variant="shadow"
                        isDisabled={recordedUrl == "" || waiting}
                        startContent={!waiting && <VscSend size={20} />}
                        onPress={async () => {
                           await sendVoice()
                           onClose()
                        }}
                     >
                        {waiting ? <Spinner color="primary" /> : "ارسال به چت"}
                     </Button>
                     <Button color="danger" variant="shadow" onPress={onClose}>
                        لغو
                     </Button>
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   )
}

export default VoiceRecordModal
