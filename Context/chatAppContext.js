import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";

// Internal Imports
import { 
    CheckWalletConnected, 
    connectingWithContract, 
    ConnectWallet 
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

const ChatAppProvider = ({ children }) => {

    const title = "Hey Welcome to blockchain"
    return(
        <ChatAppContext.Provider value={{ title }} >
            {children}
        </ChatAppContext.Provider>
    )
}

export default ChatAppProvider