import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchConvStart,
  fetchConvFail,
  convSuccess,
  searchActiveToggle,
  getAllConversationsSuccess, 
} from "../features/conversationSlice"; 
import { useNavigate } from "react-router-dom";
import { hotToastError } from "../helper/hotToast";

const useConversationRequests = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getConversationsApi = async (searchInput="") => {
    try {


      const searchQuery = searchInput ? "?search[fullName]="+searchInput : "";

      dispatch(fetchConvStart());
      const { data } = await axiosToken("/users"+searchQuery);
      console.log(`getConversationsApi = `, data);
      dispatch(convSuccess(data?.data));
      searchQuery ? dispatch(searchActiveToggle(true)) : dispatch(searchActiveToggle(false));
    } catch (error) {
      // toastErrorNotify("Error! Couldn't Get Firms");
      hotToastError(
        "Error! Datas couldn't be loaded!" +
          " - " +
          error?.response?.data?.message
      );

      dispatch(fetchConvFail());
      console.log(error);
    //   if (error?.response?.status === 403) {
    //     console.log("403 hata alındı, yönlendiriliyor...");
    //     dispatch(logoutSuccess());
    //     navigate("/");
    //   }
    }
  };



  const getAllConversationsApi = async () => {
    try {

 
      dispatch(fetchConvStart());
      const { data } = await axiosToken("/conversations");
      console.log(`getAllConversationsApi = `, data);
      dispatch(getAllConversationsSuccess(data?.conversations)); 
    } catch (error) {
      // toastErrorNotify("Error! Couldn't Get Firms");
      hotToastError(
        "Error! Datas couldn't be loaded!" +
          " - " +
          error?.response?.data?.message
      );

      dispatch(fetchConvFail());
      console.log(error); 
    }
  };








  return {
    getConversationsApi,getAllConversationsApi
  };
};

export default useConversationRequests;
