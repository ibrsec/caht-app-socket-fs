import { CiMenuBurger } from "react-icons/ci";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import CancelSearchButton from "./CancelSearchButton";
import { useSelector } from "react-redux";
const Drawer = () => {

  const { searchActive } = useSelector((state) => state.conv);
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-black drawer-button">
          <CiMenuBurger />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <SearchInput />
          </li>
          <li>
            <Conversations />
          </li>
          <li>
            <div className="flex gap-1 items-center justify-between mt-2">
              <LogoutButton />
              {searchActive && <CancelSearchButton />}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;

{
  /* <div className=" border-r border-slate-500 p-4   flex-col hidden sm:flex  ">

<div className="divider px-3"></div>


</div>  */
}
