import Web3 from 'web3';
import Web3Modal from "web3modal";

import {ChatAppAddress, ChatAppABI} from "../Context/constants";

export const CheckIfWalletIsConnected = async () => {
    try {
        if(!window.ethereum) throw new Error("Please install metamask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        if(accounts.length === 0) throw new Error("No account found");
        const account = accounts[0];
        return account;
    } catch (error) {
        console.log("Install metamask");
    }
}

export const ConnectWallet = async () => {
    try {
        if(!window.ethereum) alert("Please install metamask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
}

const fetchContract = (web3) => {
    try {
        // Ensure ABI is properly formatted
        if (!ChatAppABI || !Array.isArray(ChatAppABI)) {
            throw new Error('Invalid ABI format');
        }
        
        return new web3.eth.Contract(
            ChatAppABI,
            ChatAppAddress
        );
    } catch (error) {
        console.error("Error in fetchContract:", error);
        throw error;
    }
}

export const connectingWithContract = async () => {
    try {
        if (!window.ethereum) throw new Error("Please install MetaMask");

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        
        // Create Web3 instance
        const web3 = new Web3(connection);
        
        // Get the contract instance
        const contract = await fetchContract(web3);
        
        // Get the connected account
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        
        return {
            contract: contract,
            account: account,
            web3: web3
        };
    } catch (error) {
        console.error("Error connecting to contract:", error);
        return {
            contract: null,
            account: null,
            web3: null
        };
    }
}

export const convertTime = (time) => {
    const newTime = new Date(parseInt(time) * 1000);
    const realTime = 
        newTime.getHours() + ":" + 
        newTime.getMinutes() + ":" + 
        newTime.getSeconds() + 
        " Date: " + 
        newTime.getDate() + "/" + 
        (newTime.getMonth() + 1) + "/" + 
        newTime.getFullYear();
    return realTime;
}


