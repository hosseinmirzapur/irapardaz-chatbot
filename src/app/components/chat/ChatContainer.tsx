"use client"

import { Message } from "../corporates/data"

interface IProps {
   messages?: Message[]
}

const ChatContainer: React.FC<IProps> = ({ messages }) => {
   return <div className="flex items-center justify-center">ChatContainer</div>
}

export default ChatContainer
