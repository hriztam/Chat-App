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
    const [error, setError] = useState("");

    // Chat User Data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

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
            setError("Please Install and Connect Your Wallet");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Read Message
    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("Currently you have no messages");
        }
    };

    // Create Account
    const createAccount = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress)
                return setError("Name and Account cannot be empty");

            const contract = await connectingWithContract();
            const getNewUser = await contract.createAccount(name);
            setLoading(true);
            await getNewUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account, please reload the browser");
        }
    };

    // Add your Friends
    const addFriends = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return setError("Please provide data");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Something went wrong, try again");
        }
    };

    // Send Message
    const sendMessage = async ({ msg, accountAddress }) => {
        try {
            if (msg || accountAddress) return setError("Please type your msg");

            const contract = await connectingWithContract();
            const send = await contract.sendMessage(accountAddress, msg);
            setLoading(true);
            await send.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Please reload and try again")
        }
    }

    // Read Info
    const readUserInfo = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUserName();
        setCurrentUserAddress(userName);
        setCurrentUserAddress(userAddress);
    }
    return (
        <ChatAppContext.Provider
            value={{
                readMessage,
                createAccount,
                addFriends,
                sendMessage,
                readUserInfo,
                ConnectWallet,
                CheckWalletConnected,
                account,
                userName,
                friendLists,
                friendMsg,
                loading,
                userLists,
                error,
                currentUserName,
                currentUserAddress
            }}
        >
            {children}
        </ChatAppContext.Provider>
    );
};

export default ChatAppProvider;
