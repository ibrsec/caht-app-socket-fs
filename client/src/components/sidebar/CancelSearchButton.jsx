import React from "react";
import useConversationRequests from "../../services/useConversationRequests";
import { FcCancel } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { searchActiveToggle } from "../../features/conversationSlice";
const CancelSearchButton = () => {
  const { getConversationsApi } = useConversationRequests();
const dispatch = useDispatch()
  return (
    <div>
      <button className="btn btn-sm btn-danger"onClick={() => {
            getConversationsApi();
            dispatch(searchActiveToggle(false))
          }}>
        <FcCancel
          className="w-6 h-6 text-white cursor-pointer hover:text-green-500 active:text-green-600 transition-all"
          
        />
        Cancel Search
      </button>
    </div>
  );
};

export default CancelSearchButton;
