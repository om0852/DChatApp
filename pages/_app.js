import { Navbar } from "@/components";
import { ChatAppProvider } from "@/Context/ChatAppContext";
import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <ChatAppProvider>
        <Navbar/>
        <Component {...pageProps} />
        
      </ChatAppProvider>
    </div>
  );
};
export default App;
