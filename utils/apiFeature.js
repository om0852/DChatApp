import {ethers} from "ethers";
import Web3Modal from "web3modal";

import {ChatAppAddress, ChatAppABI} from "../Context/constants";

export const CheckIfWalletIsConnected =async()=>{

try {
    if(!window.ethereum) throw new Error("Please install metamask");
    const accounts =await window.ethereum.request({
        method:"eth_accounts",
    });
    if(accounts.length === 0) throw new Error("No account found");
    const account =accounts[0];
    return account;

} catch (error) {
    console.log("Install metamask");
}

}


export const ConnectWallet =async()=>{
    try {
        if(!window.ethereum) alert("Please install metamask");
        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts",
        })
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
}

const fetchContract = (signerOrProvider)=>new ethers.Contract(ChatAppABI,ChatAppAddress,signerOrProvider);

export const connectingWithContract =async()=>{
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const convertTime = (time)=>{
    const newTime = newDate(time.toNumber());
    const realTime = newTime.getHours()+"/"+newTime.getMinutes()+"/"+newTime.getSeconds()+"Date:"+newTime.getDate()+"/"+(newTime.getMonth()+1)+"/"+newTime.getFullYear();
    return realTime;
}


