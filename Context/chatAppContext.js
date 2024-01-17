import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Internal Imports
import {
    CheckWalletConnected,
    connectingWithContract,
    ConnectWallet,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

const ChatAppProvider = ({ children }) => {
    // Use State
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("")

    // Chat User Data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("")

    const router = useRouter();

    // Fetch data time at Page Load
    const fetchData = async () => {
        try {
            // Get contract
            const contract = await connectingWithContract();

            // Get account
            const connectAccount = await ConnectWallet();
            setAccount(connectAccount);

            // Get Username
            const userName = await contract.getUserName(connectAccount);
            setUserName(userName);

            // Get Friend List
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);

            // Get all app Users
            const userList = await contract.getAllAppUsers();
            setUserLists(userList);

        } catch (error) {
            setError("Please Install and Connect Your Wallet")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <ChatAppContext.Provider value={{}}>{children}</ChatAppContext.Provider>
    );
};

export default ChatAppProvider;
