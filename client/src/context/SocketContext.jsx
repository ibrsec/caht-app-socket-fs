import { createContext, useContext, useEffect, useState } from "react";
import authSlice from "../features/authSlice";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });
       
      if (socket) {
        setSocket(socket);
        socket.on("getOnlineUsers", (users) => {
          console.log("users", users);
          setOnlineUsers(users);
        });
        return () => {
          socket.close();
        };
      } else {
        if (socket) {
          socket.close();
          setSocket(null);
          setOnlineUsers([])
        }
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
