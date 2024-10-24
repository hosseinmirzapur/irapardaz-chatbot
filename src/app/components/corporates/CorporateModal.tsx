"use client"

import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   Select,
   SelectItem,
} from "@nextui-org/react"
import { Corporate } from "./data"
import { useState } from "react"
import api from "@/external/api"
import toast from "react-hot-toast"

interface IProps {
   corporate?: Corporate
   mode: "edit" | "create" | "delete"
   isOpen: boolean
   toggleOpen: () => void
   toggleChange: () => void
}

const CorporateModal: React.FC<IProps> = ({
   corporate,
   mode,
   isOpen,
   toggleOpen,
   toggleChange,
}) => {
   // ** States and variables
   const [name, setName] = useState("")
   const [chatBg, setChatBg] = useState<Blob | null>()
   const [logo, setLogo] = useState<Blob | null>()
   const [status, setStatus] = useState("")

   // ** Functions
   const handleSubmit = async () => {
      const fd = new FormData()
      fd.append("name", name)
      if (chatBg) {
         fd.append("chat_bg", chatBg)
      }
      if (logo) {
         fd.append("logo", logo)
      }
      fd.append("status", status)

      if (mode == "create") {
         await api.post("/corporate/create", fd)
         toggleChange()
         toggleOpen()
         toast.success("شرکت جدید با موفقیت ثبت شد")
      }

      if (mode == "delete") {
         await api.delete(`/corporate/${corporate?.id}/delete`)
         toggleChange()
         toggleOpen()
         toast.success("شرکت مد نظر با موفقیت حذف شد")
      }

      if (mode == "edit") {
         await api.post(`/corporate/${corporate?.id}/edit`)
         toggleChange()
         toggleOpen()
         toast.success("شرکت مورد نظر با موفقیت ویرایش شد")
      }

      setName("")
      setChatBg(null)
      setLogo(null)
      setStatus("")
   }

   // ** Complementary components
   const modalHeader = () => {
      if (mode == "delete") {
         return "حذف شرکت"
      }

      if (mode == "edit") {
         return "ویرایش شرکت"
      }
      return "ایجاد شرکت"
   }

   const CreateBody = () => (
      <div className="flex flex-col gap-5">
         <Input
            type="text"
            label="نام شرکت"
            isRequired
            onValueChange={setName}
         />
         <Input
            type="file"
            accept="image/*"
            label="پس زمینه چت"
            onChange={(e) => {
               if (e.target.files) {
                  setChatBg(e.target.files[0])
               }
            }}
            isClearable
            onClear={() => setChatBg(null)}
         />
         <Input
            type="file"
            accept="image/*"
            label="لوگو"
            onChange={(e) => {
               if (e.target.files) {
                  setLogo(e.target.files[0])
               }
            }}
            isClearable
            onClear={() => setLogo(null)}
         />
         <Select
            label="وضعیت"
            onChange={(e) => setStatus(e.target.value)}
            placeholder={
               corporate?.status == "ACCEPTED" || status == "ACCEPTED"
                  ? "تایید شده"
                  : corporate?.status == "PENDING" || status == "PENDING"
                  ? "در حال بررسی"
                  : "رد شده"
            }
            isRequired
         >
            <SelectItem key="PENDING">در حال بررسی</SelectItem>
            <SelectItem key="ACCEPTED" color="success">
               تایید شده
            </SelectItem>
            <SelectItem key="REJECTED" color="danger">
               رد شده
            </SelectItem>
         </Select>
      </div>
   )
   const EditBody = () => (
      <div className="flex flex-col gap-5">
         <Input
            type="text"
            label="نام شرکت"
            required
            onValueChange={setName}
            defaultValue={corporate?.name}
         />
         <Input
            type="file"
            accept="image/*"
            label="پس زمینه چت"
            onChange={(e) => {
               if (e.target.files) {
                  setChatBg(e.target.files[0])
               }
            }}
            isClearable
            onClear={() => setChatBg(null)}
         />
         <Input
            type="file"
            accept="image/*"
            label="لوگو"
            onChange={(e) => {
               if (e.target.files) {
                  setLogo(e.target.files[0])
               }
            }}
            isClearable
            onClear={() => setLogo(null)}
         />
         <Select
            label="وضعیت"
            onChange={(e) => setStatus(e.target.value)}
            placeholder={
               corporate?.status == "ACCEPTED" || status == "ACCEPTED"
                  ? "تایید شده"
                  : corporate?.status == "PENDING" || status == "PENDING"
                  ? "در حال بررسی"
                  : "رد شده"
            }
         >
            <SelectItem key="PENDING">در حال بررسی</SelectItem>
            <SelectItem key="ACCEPTED" color="success">
               تایید شده
            </SelectItem>
            <SelectItem key="REJECTED" color="danger">
               رد شده
            </SelectItem>
         </Select>
      </div>
   )
   const DeleteBody = () => <div>آیا از حذف این آیتم مطمئن هستید؟</div>

   return (
      <Modal
         isOpen={isOpen}
         onOpenChange={toggleOpen}
         isDismissable={false}
         placement="center"
      >
         <ModalContent>
            {() => (
               <>
                  <ModalHeader>{modalHeader()}</ModalHeader>
                  <ModalBody>
                     {mode == "create" ? (
                        <CreateBody />
                     ) : mode == "delete" ? (
                        <DeleteBody />
                     ) : (
                        <EditBody />
                     )}
                  </ModalBody>
                  <ModalFooter>
                     <Button color="primary" onPress={handleSubmit}>
                        تایید
                     </Button>
                     <Button onPress={toggleOpen} color="danger">
                        بستن
                     </Button>
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   )
}

export default CorporateModal
