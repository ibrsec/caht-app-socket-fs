import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Message = ({message,isLastIdx}) => {

  const user = useSelector(state=> state.auth.user)
  const dispatch = useDispatch();
  const selectedConversation = useSelector(state=> state.conv.selectedConversation);
  const fromMe = user?._id === message?.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const userProfilePic = fromMe ? user?.profilePic : selectedConversation?.profilePic;
  const bubbleColor = fromMe ? "bg-green-600" : "";
  const shakeClass = message?.shouldShake && isLastIdx ? "shake" : "";
   

  return (
    <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={userProfilePic} alt="avatar" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleColor} ${shakeClass}`}>{message?.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{new Date(message.createdAt).toLocaleString('tr-TR')}</div>
            {/* {new Date(message.createdAt).getHours+":"+new Date(message.createdAt).getMinutes} */}
        </div>
  )
}

export default Message