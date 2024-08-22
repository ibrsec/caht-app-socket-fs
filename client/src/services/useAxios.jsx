import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const token = useSelector((state) => state.auth.token);
  const baseUrl = "http://127.0.0.1:8000/api";
  // const baseUrl = '/api/v1';
  const axiosToken = axios.create({
    baseURL: baseUrl,
    headers: { 
        Authorization: `Bearer ${token}`
     },
  });
  const axiosPublic = axios.create({
    baseURL: baseUrl,
  });
  return { axiosToken, axiosPublic };
};

export default useAxios;
