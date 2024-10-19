"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import {
   Avatar,
   BreadcrumbItem,
   Breadcrumbs,
   Button,
   Chip,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
} from "@nextui-org/react"

import { Corporate, corporates } from "./data"

import api from "@/external/api"

import { BsPlus, BsThreeDotsVertical } from "react-icons/bs"
import {
   MdArrowBackIosNew,
   MdHome,
   MdOutlineCorporateFare,
   MdOutlineModeEdit,
} from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"

import CorporateModal from "./CorporateModal"

const CorporateListContainer = () => {
   // ** States and variables
   const [corps, setCorps] = useState<Corporate[]>([])
   const [changed, setChanged] = useState(false)
   const [mode, setMode] = useState<"edit" | "delete" | "create">("edit")
   const [selectedCorp, setSelectedCorp] = useState<Corporate>()
   const [corpModal, setCorpModal] = useState(false)

   // ** Functions
   const getCorps = async () => {
      const res = await api.get("/corporates")

      if (res.status < 300) {
         // todo: set after backend was done
         // setCorps(res.data)
      }
   }

   const toggleChange = () => setChanged((prev) => !prev)
   const toggleModal = () => setCorpModal((prev) => !prev)

   useEffect(() => {
      // getCorps()
      setCorps(corporates)
      // setCorps([])
   }, [changed])

   // ** Complementary Components
   const StatusComponent: React.FC<{
      state: "PENDING" | "ACCEPTED" | "REJECTED"
   }> = ({ state }) => {
      if (state == "ACCEPTED")
         return (
            <Chip color="success" variant="shadow">
               تایید شده
            </Chip>
         )
      else if (state == "REJECTED")
         return (
            <Chip color="danger" variant="shadow">
               رد شده
            </Chip>
         )
      return (
         <Chip color="default" variant="flat">
            در حال بررسی
         </Chip>
      )
   }

   return (
      <div
         className="
            flex
            flex-col
            gap-5
            items-center
            justify-center
            min-h-screen
            w-11/12
            md:w-10/12
            mx-auto
            relative
            py-32
            md:py-10
         "
      >
         <Breadcrumbs
            size="lg"
            separator={<MdArrowBackIosNew size={18} />}
            className="absolute top-10 right-0"
         >
            <BreadcrumbItem startContent={<MdHome size={22} />} href="/">
               خانه
            </BreadcrumbItem>
            <BreadcrumbItem>لیست شرکت ها</BreadcrumbItem>
         </Breadcrumbs>
         <div className="w-full justify-start">
            <Button
               startContent={<BsPlus size={22} />}
               color="primary"
               variant="shadow"
               onClick={() => {
                  setMode("create")
                  toggleModal()
               }}
            >
               افزودن شرکت جدید
            </Button>
         </div>
         <Table color="primary" isStriped selectionMode="single">
            <TableHeader>
               <TableColumn className="text-lg">#</TableColumn>
               <TableColumn className="text-lg">نام شرکت</TableColumn>
               <TableColumn className="text-lg">پس زمینه چت</TableColumn>
               <TableColumn className="text-lg">لوگوی شرکت</TableColumn>
               <TableColumn className="text-lg">وضعیت</TableColumn>
               <TableColumn className="text-lg">عملیات</TableColumn>
            </TableHeader>
            <TableBody
               emptyContent={
                  <div className="flex flex-col gap-5 items-center justify-center">
                     <MdOutlineCorporateFare size={32} />
                     <span className="text-xl">هنوز شرکتی ثبت نشده است</span>
                  </div>
               }
            >
               {corps.map((corp, index) => (
                  <TableRow key={index}>
                     <TableCell>{index + 1}</TableCell>
                     <TableCell>{corp.name}</TableCell>
                     <TableCell>
                        {corp.chatBg ? (
                           <Image
                              src={corp.chatBg}
                              alt={corp.name}
                              width={100}
                              height={100}
                           />
                        ) : (
                           "---"
                        )}
                     </TableCell>
                     <TableCell>
                        {
                           <Avatar
                              src={corp.logo}
                              name={corp.name}
                              color="warning"
                           />
                        }
                     </TableCell>
                     <TableCell>
                        <StatusComponent state={corp.status} />
                     </TableCell>
                     <TableCell>
                        <Dropdown>
                           <DropdownTrigger>
                              <Button isIconOnly variant="light">
                                 <BsThreeDotsVertical size={22} />
                              </Button>
                           </DropdownTrigger>
                           <DropdownMenu variant="faded" color="primary">
                              <DropdownItem
                                 key={"edit"}
                                 startContent={<MdOutlineModeEdit size={22} />}
                                 onClick={() => {
                                    setSelectedCorp(corp)
                                    setMode("edit")
                                    toggleModal()
                                 }}
                              >
                                 ویرایش
                              </DropdownItem>
                              <DropdownItem
                                 key={"delete"}
                                 startContent={<AiOutlineDelete size={22} />}
                                 onClick={() => {
                                    setSelectedCorp(corp)
                                    setMode("delete")
                                    toggleModal()
                                 }}
                              >
                                 حذف
                              </DropdownItem>
                           </DropdownMenu>
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <CorporateModal
            corporate={selectedCorp}
            mode={mode}
            isOpen={corpModal}
            toggleOpen={toggleModal}
            toggleChange={toggleChange}
         />
      </div>
   )
}

export default CorporateListContainer
