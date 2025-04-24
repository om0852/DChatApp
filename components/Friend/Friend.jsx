import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import images from "../../assets/index";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Style from "./Friend.module.css";
const Friend = () => {
  const arr = [1, 3, 34, 5, 6];
  const {
    sendMessage,
    account,
    friendLists,
    userName,
    loading,
    readUser,
    readMessage,
    friendMsg,
    currentUserAddress,
    currentUserName,
  } = useContext(ChatAppContext);
  console.log(friendLists);
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => {
            return (
              <>
                <Card key={i + 1} i={i} el={el} readMessage={readMessage} readUser={readUser} />
              </>
            );
          })}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat functionName={sendMessage} readMessage={readMessage} friendMsg={friendMsg} account={account} userName={userName} currentUserName={currentUserName} loading={loading} currentUserAddress={currentUserAddress} />
        </div>
      </div>
    </div>
  );
};

export default Friend;
