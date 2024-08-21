 
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered input-accent rounded-full focus:outline-none"
      />
      <button type="submit" className="btn btn-circle bg-green-700 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none"/>
      </button>
    </form>
  );
};

export default SearchInput;
