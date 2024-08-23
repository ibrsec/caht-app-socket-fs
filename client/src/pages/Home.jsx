import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import MessageContainer from "../components/messageContainer/MessageContainer";
import useSocket from "../services/useSocket";
import { useSelector } from "react-redux";
import Drawer from "../components/sidebar/Drawer";
const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);
  console.log("openMenu", openMenu);

  return (
    <div className=" w-[1000px]">
      <div className="flex items-center justify-between sm:justify-center bg-green-600 text-white font-semibold rounded-ss-lg rounded-se-lg py-0 sm:py-2 px-3 fixed sm:static z-10 w-full top-0 ">
        <span>CHATAPP</span>
        <div className=" inline sm:hidden p-2 z-20">
          <Drawer />
        </div>
      </div>

      <div className="flex h-screen sm:h-[450px] md:h-[550px]  rounded-es-lg rounded-ee-lg overflow-hidden bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-green-600 mt-[20px] sm:mt-0 ">
        <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
