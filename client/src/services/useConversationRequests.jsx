import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchConvStart,
  fetchConvFail,
  convSuccess,
  searchActiveToggle, 
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







  // const deleteSelectedDataApi = async (path, id) => {
  //   const idLoading = toastLoading(`Deleting...`);
  //   try {
  //     dispatch(fetchStockStart());
  //     const { data } = await axiosToken.delete(`${path}/${id}`);
  //     console.log(
  //       `useStocktan delete Data(${path})= [response empty - success]`,
  //       data
  //     );
  //     dispatch(successWitoutPayload());
  //     // toastSuccessNotify(`Deleted Successfully!`);
  //     taostStopLoading(idLoading, "success", "Deleted Successfully!");
  //     getDataApi(path);
  //   } catch (error) {
  //     // toastErrorNotify("Error! The Firm couldn't be deleted !");
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! Data couldn't be deleted! - " + error?.response?.data?.message
  //     );

  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");

  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };
  // const postNewDataApi = async (path, firmData) => {
  //   const idLoading = toastLoading("Creating...!");
  //   try {
  //     dispatch(fetchStockStart());
  //     const { data } = await axiosToken.post(path, firmData);
  //     console.log(`useStocktan postnewData(${path})= `, data);
  //     dispatch(successWitoutPayload());
  //     // toastSuccessNotify(`New Firm is added Successfully!`);
  //     getDataApi(path);
  //     taostStopLoading(idLoading, "success", data?.message);
  //   } catch (error) {
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! The New data couldn't be added ! - " +
  //         error?.response?.data?.message
  //     );
  //     // toastErrorNotify("Error! The New Firm couldn't be added !");
  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");
  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };
  // const putEditApi = async (path, id, firmData) => {
  //   const idLoading = toastLoading(`Editting...`);
  //   try {
  //     dispatch(fetchStockStart());
  //     const { data } = await axiosToken.put(`${path}/${id}`, firmData);
  //     console.log(`useStocktan putEditData(${path})= `, data);
  //     dispatch(successWitoutPayload());
  //     // toastSuccessNotify(`The Firm is editted Successfully!`);
  //     taostStopLoading(idLoading, "success", data?.message);

  //     getDataApi(path);
  //   } catch (error) {
  //     // toastErrorNotify("Error! The New Firm couldn't be editted !");
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! Data couldn't be editted! - " + error?.response?.data?.message
  //     );

  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");
  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };

  // const getAllDataGenericApi = async (paths) => {
  //   const idLoading = toastLoading(`Getting the ${paths?.join(", ")}...`);
  //   try {
  //     dispatch(fetchStockStart());
  //     const res = await Promise.all(paths?.map((item) => axiosToken(item)));

  //     const datas = res.map((item) => item?.data?.data);
  //     console.log(`useStocktan promise all (${paths?.join(", ")})= `, res);
  //     console.log(paths);
  //     console.log(datas);
  //     dispatch(stockPromiseAllSuccess({ datas, paths }));
  //     taostStopLoading(
  //       idLoading,
  //       "success",
  //       `${paths} are loaded successfully!`
  //     );
  //   } catch (error) {
  //     // toastErrorNotify("Error! Couldn't Get Firms");
  //     taostStopLoading(
  //       idLoading,
  //       "error",
  //       "Error! Datas couldn't be loaded!" + " - " + paths.join(", ")
  //     );

  //     dispatch(fetchStockFail());
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       console.log("403 hata alındı, yönlendiriliyor...");
  //       dispatch(logoutSuccess());
  //       navigate("/");
  //     }
  //   }
  // };

  return {
    getConversationsApi
  };
};

export default useConversationRequests;
