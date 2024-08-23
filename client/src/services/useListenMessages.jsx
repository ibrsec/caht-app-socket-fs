import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { listenMessages } from "../features/messageSlice";
import notification from "../assets/notification.mp3";
import { hotToastSuccess } from "../helper/hotToast";
import { newMessageAdded } from "../features/conversationSlice";


const useListenMessages = (recieverId) => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const coversations = useSelector((state) => state.conv.conversations);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => { 
      console.log('ife girmedi')
      console.log('newMessage', newMessage)
      console.log('recieverId', recieverId)
      const sound = new Audio(notification);
      sound.play();
      if (recieverId == newMessage?.senderId) { 
        newMessage.shouldShake = true;
        dispatch(listenMessages(newMessage));
      }else{
        console.log('newMessage?.recieverId', newMessage?.recieverId)
        console.log('newMessage?.senderId', newMessage?.senderId)
        console.log('recieverId', recieverId)
        dispatch(newMessageAdded(newMessage?.senderId))
        hotToastSuccess('You a have a new message!')
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, messages]);
};

export default useListenMessages;
