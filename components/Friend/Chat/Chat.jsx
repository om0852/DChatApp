import React, { useState, useEffect, useContext } from "react";
import Style from "./Chat.module.css";
import { convertTime } from "@/utils/apiFeature";
import { Loader } from "@/components/index";
import images from "../../../assets/index";
import { useRouter } from "next/router";
import Image from "next/image";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  currentUserName,
  loading,
  currentUserAddress,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
    console.log(router.query);
    console.log(friendMsg);
  }, [router.isReady, router.query]);

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image
            src={images.accountName}
            alt="accountName"
            width={70}
            height={70}
          />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress.slice(21)}...</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => {
              return (
                <div>
                  {el.sender == chatData.address ? (
                    <div className={Style.Chatbox_left_title}>
                    <Image
                      src={images.accountName}
                      alt="images"
                      width={50}
                      height={50}
                    />
                    <span>{chatData.name}</span>
                    <small>Time:{convertTime(el.timestamp)}</small>
                  </div>
                ) : (
                  <div className={Style.Chatbox_left_title}>
                    <Image
                      src={images.accountName}
                      alt="images"
                      width={50}
                      height={50}
                    />
                    <span>{el.msg}</span>
                    <small>Time:{convertTime(el.timestamp)}</small>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msg}
                  {""}
                </p>
                </div>
              );
            })}
          </div>
        </div>
        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="send"
                  onClick={() =>
                    functionName({ msg: message, address: chatData.address })
                  }
                  width={50}
                  height={50}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
