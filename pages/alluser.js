import React, { useContext } from 'react'
import { UserCard } from '@/components/index'
import Style from "../styles/alluser.module.css"
import { ChatAppContext } from '@/Context/ChatAppContext'
const alluser = () => {
    const {userLists,addFriends}=useContext(ChatAppContext);
    console.log(userLists)
  return (
    <div className='w- mt-10 h-screen' >
      <div className={Style.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists.map((el,i)=>(
            <UserCard key={i+1} el={el} i={i} addFriends={addFriends}/>
        ))}

      </div>
    </div>
  )
}

export default alluser
