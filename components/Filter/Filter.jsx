import React, { useState, useContext } from "react";
import Image from "next/image";
import images from "../../assets/index";
import Style from "./Filter.module.css";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Modal } from "../index";
const Filter = () => {
  const [addFriend, setAddFriend] = useState(false);
  const {
    account,
    addFriends,
    friendLists,
    userLists,
    setUserLists,
    setFriendLists,
    setUserName,
    userName,
  } = useContext(ChatAppContext);
  return (
    <div className={Style.Filter} style={{marginTop:"10vh"}}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={30} height={30} />
            <input type="text" placeholder="Search.." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="add" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>
      {addFriend && (
        <div className={Style.flter_model}>
          <Modal
            modelBox={setAddFriend}
            set
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias suscipit, repellat commodi magni debitis, enim animi sunt dolorem quod quis aspernatur culpa nesciunt! Error voluptatum id sed deserunt minus natus accusantium corrupti alias quod?

"
            smallInfo="Kindley Select Your Friend Name and Address..."
            image={images.hero}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
