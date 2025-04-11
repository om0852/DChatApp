import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";

import {
  CheckIfWalletIsConnected,
  ConnectWallet,
  connectingWithContract,
  convertTime,
  getTime,
} from "../utils/apiFeature";

export const ChatAppContext = createContext();
export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //chat user data

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserrAddress, setCurrentUserrAddress] = useState("");

  const router = useRouter();

  //fetch data time of page reload

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      const connectAccount = await ConnectWallet();
      setAccount(connectAccount);

      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);

      const friendList = await contract.getMyFriendList(connectAccount);
      setFriendLists(friendList);

      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      setError("Please Install and connect your wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const friendMsg = await contract.readMessage(friendAddress);
      setFriendMsg(friendMsg);
    } catch (error) {
      setError("Currenly You Have no Message");
    }
  };

  //create account

  const createAccount = async (name, accountAddress) => {
    try {
      if (!name || !accountAddress) setError("Please fill all the fields");
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      setError("");
      window.location.reload();
    } catch (error) {
      setError("Error while creating your account please try again");
    }
  };

  //add your friend

  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress) setError("Please fill all the fields");
      const contract = await connectingWithContract();
      const getAddedFriend = await contract.addFriend(name, accountAddress);
      setLoading(true);
      await getAddedFriend.wait();
      setLoading(false);
      setError("");
      router.push("/");
    } catch (error) {}
  };

  //send message

  const sendMessage =async({msg,address})=>{
    try {
        if(msg || address) return setError("Please Type Your Message");
        const contract = await connectingWithContract();
        const getSendMessage = await contract.sendMessage(address,msg);
        setLoading(true);
        await getSendMessage.wait();
        setLoading(false);
        setError("");
        window.location.reload();
    } catch (error) {
        setError("Error while sending message please try again");
    }
  }

  //read the user info

  const readUser = async(userAddress)=>{
    const contract = await connectingWithContract();
    const getUserInfo = await contract.getUserName(userAddress);
    setCurrentUserName(getUserInfo);
    setCurrentUserrAddress(userAddress);

  }
  return (
    <ChatAppContext.Provider value={{ readMessage, createAccount, addFriends, sendMessage, readUser ,account,userName,friendLists,friendMsg,loading,userLists,error,currentUserName,currentUserrAddress}}>
      {children}
    </ChatAppContext.Provider>
  );
};
