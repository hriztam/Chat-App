import React from "react";

// Internal Imports
import { 
    CheckWalletConnected, 
    connectingWithContract, 
    ConnectWallet 
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

const ChatAppProvider = ({ children }) => {

    return(
        <ChatAppProvider value={{  }} >
            {children}
        </ChatAppProvider>
    )
}

export default ChatAppProvider