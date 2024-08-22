import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedConvSuccess } from "../../features/conversationSlice";

const Conversation = ({ item, lastIndex, emoji }) => {
  const { fullName, profilePic } = item;
  const selectedConversation = useSelector(
    (state) => state.conv.selectedConversation
  );
  const dispatch = useDispatch();
  const isSelected = selectedConversation?._id === item?._id; 
  return (
    <div>
      <div
        className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer transition-all active:bg-green-600 ${
          isSelected ? "bg-green-600" : ""
        }`}
        onClick={() => dispatch(selectedConvSuccess(item))}
      >
        <div className="avatar online ">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 ">{fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </div>
  );
};

export default Conversation;
