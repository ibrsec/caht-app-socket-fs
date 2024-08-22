 
import { IoSearchSharp } from "react-icons/io5";
import { hotToastError } from "../../helper/hotToast";
import useConversationRequests from "../../services/useConversationRequests";
import { useState } from "react";

const SearchInput = () => {
const {getConversationsApi} = useConversationRequests();
  const [searchInput, setSearchInput] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchInput.trim()){
      getConversationsApi();
    }else if(searchInput.length < 3){
      hotToastError('Search cant be less than 3 characters!')
      return;
    }

    getConversationsApi(searchInput)

    setSearchInput("")

  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered input-accent rounded-full focus:outline-none"
        value={searchInput}
        onChange={(e)=>setSearchInput(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-green-700 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none"/>
      </button>
    </form>
  );
};

export default SearchInput;
