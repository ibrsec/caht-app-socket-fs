import React, { useEffect } from "react";
import Conversation from "./Conversation";
import { useSelector } from "react-redux";
import useConversationRequests from "../../services/useConversationRequests";
import { getRandomemoji } from "../../helper/emoji";

const Conversations = () => {
  const { getConversationsApi } = useConversationRequests();
  const { conversations } = useSelector((state) => state.conv);
  console.log("conversations=", conversations);

  useEffect(() => {
    getConversationsApi();
  }, []);
 
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        conversations?.length < 1 ?
          <>
            <p className="text-center text-sm me-3">There no user found!</p>
          </>
        :
      
      conversations?.map((item,idx) => (
        <Conversation key={item?._id} item={item} 
        lastIndex={idx === conversations.length - 1} emoji={getRandomemoji(idx)}/>
      ))}
    </div>
  );
};

export default Conversations;
