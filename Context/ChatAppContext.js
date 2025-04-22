import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";

import {
  CheckIfWalletIsConnected,
  ConnectWallet,
  connectingWithContract,
  convertTime,
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
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    console.log("Fetching data started");
    try {
      // First check if wallet is connected
      const connectAccount = await ConnectWallet();
      console.log("Connected account:", connectAccount);
      
      if (!connectAccount) {
        setError("Please connect your wallet");
        return;
      }
      setAccount(connectAccount);

      // Then try to connect to contract
      console.log("Connecting to contract...");
      const { contract, account: contractAccount } = await connectingWithContract();
      console.log("Contract connection result:", contract ? "Success" : "Failed");
      
      if (!contract) {
        setError("Error connecting to contract");
        return;
      }

      try {
        console.log("Calling getUsername...");
        console.log("Contract methods:", Object.keys(contract.methods));
        console.log("Using account:", connectAccount);
        
        // First check if user exists
        console.log("Checking if user exists...");
        const userExists = await contract.methods.checkUserExist(connectAccount).call();
        console.log("User exists:", userExists);

        if (!userExists) {
          console.log("User does not exist in contract");
          setUserName("");
          return;
        }

        const userName = await contract.methods.getUsername(connectAccount).call({
          from: connectAccount
        });
        console.log("Username received:", userName);
        setUserName(userName);

        console.log("Getting friend list...");
        const friendList = await contract.methods.getMyFriendList().call({
          from: connectAccount
        });
        console.log("Friend list received:", friendList);
        setFriendLists(friendList);

        console.log("Getting all users...");
        const userList = await contract.methods.getAllAppUser().call({
          from: connectAccount
        });
        console.log("User list received:", userList);
        setUserLists(userList);
      } catch (contractError) {
        console.error("Contract interaction error:", contractError);
        setError("Error interacting with contract");
      }
    } catch (error) {
      console.error("Connection error:", error);
      setError("Please install and connect your wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const { contract } = await connectingWithContract();
      const messages = await contract.methods.readMessage(friendAddress).call();
      setFriendMsg(messages);
    } catch (error) {
      setError("Currently You Have no Message");
    }
  };

  const createAccount = async (name, accountAddress) => {
    try {
      if (!name || !accountAddress) {
        setError("Please fill all the fields");
        return;
      }
      const { contract } = await connectingWithContract();
      setLoading(true);
      const tx = await contract.methods.createAccount(name).send({ from: accountAddress });
      await tx;
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating your account please try again");
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress) {
        setError("Please fill all the fields");
        return;
      }
      const { contract, account: currentAccount } = await connectingWithContract();
      const tx = await contract.methods.addFriend(accountAddress, name).send({ from: currentAccount });
      await tx;
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError("Error while adding friend");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (!msg || !address) {
        setError("Please Type Your Message");
        return;
      }
      const { contract, account: currentAccount } = await connectingWithContract();
      const tx = await contract.methods.sendMessage(address, msg).send({ from: currentAccount });
      await tx;
      window.location.reload();
    } catch (error) {
      setError("Error while sending message please try again");
    }
  };

  const readUser = async (userAddress) => {
    try {
      const { contract } = await connectingWithContract();
      const userName = await contract.methods.getUsername(userAddress).call();
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      setError("Error while reading user info");
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectingWithContract,
        ConnectWallet,
        CheckIfWalletIsConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
