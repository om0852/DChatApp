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
  const title = "Hey welcome to blockchain Chat App";
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
  return (
    <ChatAppContext.Provider value={{ title }}>
      {children}
    </ChatAppContext.Provider>
  );
};
