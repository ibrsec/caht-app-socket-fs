import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import CancelSearchButton from "./CancelSearchButton";
import { useSelector } from "react-redux";

const SideBar = () => {

  const {searchActive} = useSelector(state=> state.conv)
  return (
    <div className=" border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="flex gap-1 items-center justify-between mt-2">
        <LogoutButton />
        {searchActive && <CancelSearchButton />}
      </div>
    </div>
  );
};

export default SideBar;
