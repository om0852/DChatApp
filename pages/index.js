import React,{useEffect,useState,useContext} from 'react'
import { ChatAppContext } from '@/Context/ChatAppContext'

const ChatApp = () => {
  const {title} =useContext(ChatAppContext)
  return (
    <div>
      ChatApp
    </div>
  )
}

export default ChatApp
