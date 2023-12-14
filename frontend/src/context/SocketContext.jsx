/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import userAtom from "../atoms/userAtoms";

export const SocketContext = createContext();

// using the function and useContext to use it directly using the function
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const user = useRecoilValue(userAtom);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: {
        userId: user?._id,
      },
    });

    setSocket(socket);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => socket && socket.close();
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
