import { useDispatch, useSelector } from "react-redux"; 
import { hotToastError } from "../helper/hotToast"; 
import { killSocket, setOnlineUsers, setSocket } from "../features/socketSlice";
import io from "socket.io-client";


const useSocket = () => { 
  const dispatch = useDispatch(); 
  const { user } = useSelector(state=>state.auth);

  const socketApi = async (recieverId) => {
    try {
      if (user) {
        const socket = io("https://chat-app-socket-fs.onrender.com/", {
          query: {
            userId: user._id, 
          }
        });

        if (socket) {
          dispatch(setSocket(socket))
          socket.on('getOnlineUsers',(users)=>{
            console.log('users', users)
             dispatch(setOnlineUsers(users))
          })

        //  return ()=>{
        //     socket.close()
        //  }
        } else {  
          if (socket) {
            socket.close();
            dispatch(killSocket())
          }
        }
      }
    } catch (error) {
      // toastErrorNotify("Error! Couldn't Get Firms");
      hotToastError(
        "Socket Error!" +
          " - " +
          error?.response?.data?.message
      );
 
      console.log(error);
    //   if (error?.response?.status === 403) {
    //     console.log("403 hata alındı, yönlendiriliyor...");
    //     dispatch(logoutSuccess());
    //     navigate("/");
    //   }
    }
  };




  return {
    socketApi
  };
};

export default useSocket;
