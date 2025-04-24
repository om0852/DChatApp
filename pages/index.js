import React,{useEffect,useState,useContext} from 'react'
import { ChatAppContext } from '@/Context/ChatAppContext'
import { Filter,Friend } from '../components/index'

const ChatApp = () => {
  const {title} =useContext(ChatAppContext)
  return (
    <div>
      <Filter/>
      <Friend/>
    </div>
  )
}

export default ChatApp
