import React from 'react'
import Style from "./UserCard.module.css"
import images from "../../assets/index"
import Image from 'next/image'
const UserCard = ({el,i,addFriends}) => {
  return (
     <div className={Style.UserCard}>
<div className={Style.UserCard_box}>
  <Image src={images[`image${i+1}`]} alt='user' width={100} height={100}/>
  <div className={Style.UserCard_box_info}>
    <h3>{el.name}</h3>
    <p>{el.accountAddress.slice(0,25)}...</p>
    <button onClick={()=>addFriends(el.name,el.accountAddress)}>Add Friend</button>
  </div>
    <small className={Style.number}>{i+1}</small>
</div>
     </div>
  )
}

export default UserCard;
