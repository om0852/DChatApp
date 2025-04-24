import Web3 from 'web3';
import Web3Modal from "web3modal";

import {ChatAppAddress, ChatAppABI} from "../Context/constants";

export const CheckIfWalletIsConnected = async () => {
    try {
        if (!window.ethereum) throw new Error("Please install MetaMask");
        
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length === 0) {
            throw new Error("No authorized accounts found. Please connect your wallet.");
        }

        return accounts[0];
    } catch (error) {
        console.error("Wallet connection check failed:", error);
        throw error;
    }
}

export const ConnectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask");
        }

        // Request account access
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
            throw new Error("No accounts found. Please connect your wallet.");
        }

        return accounts[0];
    } catch (error) {
        console.error("Connect wallet error:", error);
        if (error.code === 4001) {
            throw new Error("Please accept the connection request in MetaMask");
        }
        throw error;
    }
}

const fetchContract = (web3, account) => {
    try {
        if (!ChatAppABI || !Array.isArray(ChatAppABI)) {
            throw new Error('Invalid ABI format');
        }
        
        const contract = new web3.eth.Contract(
            ChatAppABI,
            ChatAppAddress,
            {
                from: account,
                gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
            }
        );

        return contract;
    } catch (error) {
        console.error("Error in fetchContract:", error);
        throw error;
    }
}

export const connectingWithContract = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask");
        }

        // First get the account
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        if (accounts.length === 0) {
            throw new Error("No accounts found. Please connect your wallet.");
        }

        const account = accounts[0];

        // Then setup Web3
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions: {}
        });

        const connection = await web3Modal.connect();
        const web3 = new Web3(connection);

        // Get the contract instance with the connected account
        const contract = await fetchContract(web3, account);
        
        if (!contract) {
            throw new Error("Failed to initialize contract");
        }

        return {
            contract,
            account,
            web3
        };
    } catch (error) {
        console.error("Error connecting to contract:", error);
        throw error;
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


