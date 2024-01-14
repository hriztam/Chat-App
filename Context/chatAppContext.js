import React from "react";
import {navigation} from 'next/navigation'

// Internal Imports
import { 
    CheckWalletConnected, 
    connectingWithContract, 
    ConnectWallet 
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {

    const title = "Hey Welcome to my App"

    return(
        <ChatAppProvider value={{title}} >
            {children}
        </ChatAppProvider>
    )
}