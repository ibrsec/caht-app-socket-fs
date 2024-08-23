import React, { useEffect } from "react";
import Conversation from "./Conversation";
import { useSelector } from "react-redux";
import useConversationRequests from "../../services/useConversationRequests";
import { getRandomemoji } from "../../helper/emoji";

const Conversations = () => {
  const { getConversationsApi,getAllConversationsApi } = useConversationRequests();
  const { conversations } = useSelector((state) => state.conv);
  console.log("conversations=", conversations);

  useEffect(() => {
    getConversationsApi();
    getAllConversationsApi();
  }, []);

  const sortedConversations = [...conversations].sort((a, b) => {
    return b?.isNewMessageAdded - a?.isNewMessageAdded;
  });
  return (
    <div className="py-2 flex flex-col overflow-auto items-start">
      {
        sortedConversations?.length < 1 ?
          <>
            <p className="text-center text-sm me-3">There no user found!</p>
          </>
        :
      
        sortedConversations?.map((item,idx) => (
        <Conversation key={item?._id} item={item} 
        lastIndex={idx === sortedConversations.length - 1} emoji={getRandomemoji(idx)}/>
      ))}
    </div>
  );
};

export default Conversations;
