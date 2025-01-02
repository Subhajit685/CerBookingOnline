import { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { captainContext } from "./CaptainContext";
import { userContext } from "./UserContext";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { captain } = useContext(captainContext);
  const { user } = useContext(userContext);
  const socket = io("http://localhost:4000");

  useEffect(() => {
    if (user || captain) {
      socket.on("connect", () => {
        
      });
      socket.on("disconnect", () => {
        
      });
    }

  }, []);

  const locationUpdate = (data) => {
    socket.emit("captainLocation", data);
  };

  const updateSocketID = (type, id) => {
    socket.emit("updateSocketID", { type, id });
  };


  return (
    <SocketContext.Provider value={{ socket, locationUpdate, updateSocketID }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
