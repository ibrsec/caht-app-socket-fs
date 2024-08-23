import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";

import { useDispatch, useSelector } from "react-redux";
import { selectedConvRemove } from "../../features/conversationSlice";
import { MdClose } from "react-icons/md";

const MessageContainer = () => { 
  const selectedConversation = useSelector(state => state.conv.selectedConversation);
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=> dispatch(selectedConvRemove())
  },[])

  console.log('selectedConversation', selectedConversation)
  return (
    <div className=" flex flex-col flex-grow ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-3 mb-2 relative">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">{selectedConversation?.username}</span>
            <button className="absolute inset-y-0 end-0 flex items-center pe-3" onClick={()=>dispatch(selectedConvRemove())}>
            <MdClose />
        </button>
          </div>
          <Messages recieverId={selectedConversation?._id} />
          <MessageInput recieverId={selectedConversation?._id}/>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
