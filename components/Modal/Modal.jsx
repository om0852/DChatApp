import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Modal.module.css";
import images from "../../assets/index";
import { Loader } from "../../components/index";
import { ChatAppContext } from "@/Context/ChatAppContext";

const Modal = ({
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
  account,
  modelBox,
}) => {
  // const [openModal, modelBox] = useState(false);
  const { error, loading } = useContext(ChatAppContext);
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_boc_left}>
          <Image src={image} alt="image" width={700} height={700} />
        </div>
        <div className={Style.Model_boc_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <p>{smallInfo}</p>
          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_right_name}>
              <div className={Style.Modal_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="username"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Modal_box_right_name_info}>
                <Image
                  src={images.account}
                  alt="account"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder={account || "Your Account Address..."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => functionName(name, accountAddress)}>
                  <Image
                    src={images.send}
                    alt="loader"
                    width={30}
                    height={30}
                  />
                  Submit
                </button>
                <button onClick={() => modelBox(false)}>
                  <Image
                    src={images.close}
                    alt="close"
                    width={30}
                    height={30}
                  />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      modal
    </div>
  );
};

export default Modal;
