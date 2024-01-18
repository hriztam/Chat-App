import "../styles/globals.css";
import ChatAppProvider from "../Context/ChatAppContext";
import { NavBar } from "../Components/index"

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ChatAppProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChatAppProvider>
    </div>
  );
}
