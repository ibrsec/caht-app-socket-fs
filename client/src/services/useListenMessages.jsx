import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { listenMessages } from "../features/messageSlice";
import notification from "../assets/notification.mp3"
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notification)
        sound.play();
      dispatch(listenMessages(newMessage));
    });

    return () => socket?.off("newMessage");
  }, [socket,messages]);
};

export default useListenMessages;
