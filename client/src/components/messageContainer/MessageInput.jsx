import { BsSend } from "react-icons/bs";
import useMessageRequests from "../../services/useMessageRequests";
import { useState } from "react"; 
import { useSelector } from "react-redux";

const MessageInput = ({ recieverId }) => {
  const { sendMessageApi } = useMessageRequests();
  const [messageInput, setMessageInput] = useState("");
  const loading = useSelector(state=> state.message.loading)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) {
      return;
    }
    sendMessageApi(recieverId, messageInput.trim());
    setMessageInput("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          type="submit"
        >
          {loading ? <span className="loading loading-spinner"></span> :<BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
