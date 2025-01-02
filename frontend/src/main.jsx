import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContext.jsx";
import SocketPRovider from "./context/SocketContex.jsx";
import CaptainContextProvider from "./context/CaptainContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <CaptainContextProvider>
        <BrowserRouter>
          <SocketPRovider>
            <App />
          </SocketPRovider>
        </BrowserRouter>
    </CaptainContextProvider>
  </UserContextProvider>
);
