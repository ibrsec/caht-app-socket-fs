 
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import {
  fetchLoginFail,
  fetchLoginStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { deleteConvLogout, deleteStockLogout } from "../features/conversationSlice";
import { hotToastError, hotToastSuccess } from "../helper/hotToast";
import { deleteMessageLogout } from "../features/messageSlice";

const useApiRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {axiosToken,axiosPublic} = useAxios();

  const loginApi = async (userData) => {     
     
    dispatch(fetchLoginStart());
    try {
      // const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
      const {data} = await axiosPublic.post(`/auth/login`, userData);
      // aA*12345 

      console.log("loginapiden = ",data);
      dispatch(loginSuccess(data));
      hotToastSuccess(data?.message);
      navigate("/");

    } catch (error) {
      hotToastError("Login is failed!! - "+error?.response?.data?.message);
      dispatch(fetchLoginFail());
      console.log(error);
    }
  };

  const registerApi = async (userData) => {
    // username: "",
    // email: "",
    // fullName: "",
    // password: "",
    // confirmedPassword: "",
    // gender: "",
    //image

    dispatch(fetchLoginStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users`,
      //   userData
      // );
      const { data } = await axiosPublic.post(
        `/auth/signup`,
        userData
      );
      console.log("registerApiden = ",data);
      hotToastSuccess(
        "Congratulations, your account has been successfully created - "+data?.message
      );
      dispatch(registerSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(fetchLoginFail());
      hotToastError("Something went wrong. Registration failed!!");
      console.log(error);
      hotToastError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const logoutApi = async (token) => {
    dispatch(fetchLoginStart());
    try {
      // const options = {
      //   headers: {
      //     Authorization: "Token " + token,
      //   },
      // };
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BASE_URL}/auth/logout`,
      //   {
      //     headers: {
      //       Authorization: "Token " + token,
      //     },
      //   }
      // );
      const response = await axiosToken(`/auth/logout`);
      console.log("loginoutApiden = ",response);
      dispatch(logoutSuccess());
      dispatch(deleteConvLogout());
      dispatch(deleteMessageLogout());
      // dispatch(deleteStockLogout());
      hotToastSuccess("You have been logged out!");
      // navigate("/");
    } catch (error) {
      hotToastError("Log out failed!!");
      dispatch(fetchLoginFail());
      console.log(error);
    }
  };

 

  return { loginApi, registerApi, logoutApi };
};

export default useApiRequests;

//aassdSDFdf123?
