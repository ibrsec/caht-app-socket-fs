// import axios from "axios"; 
// import { useDispatch, useSelector } from 'react-redux'; 

// const useAxios = () => {
//   const token = useSelector((state) => state.auth.token);
//   const baseUrl = "http://127.0.0.1:8000/api";
//   // const baseUrl = '/api/v1';
//   const axiosToken = axios.create({
//     baseURL: baseUrl,
//     headers: { 
//         Authorization: `Bearer ${token}`
//      },
//   });
//   const axiosPublic = axios.create({
//     baseURL: baseUrl,
//   });

// //----------------------------------------------------------------

// //----------------------------------------------------------------


  
//   return { axiosToken, axiosPublic };
// };





import axios from "axios"; 
import { useDispatch, useSelector } from 'react-redux'; 
import { refreshTokenSuccess, logoutSuccess } from '../features/authSlice';

const useAxios = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const refreshToken = useSelector((state) => state.auth.refresh);
  const baseUrl = "/api";

  const axiosToken = axios.create({
    baseURL: baseUrl,
    headers: { 
        Authorization: `Bearer ${token}`
     },
  });

  const axiosPublic = axios.create({
    baseURL: baseUrl,
  });

  axiosToken.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshResponse = await axiosPublic.post('/auth/refresh', {
            bearer:{refreshToken}
          });
          console.log('refreshResponse', refreshResponse)
          const newAccessToken = refreshResponse.data.bearer.accessToken;
          console.log('newAccessToken', newAccessToken)
          dispatch(refreshTokenSuccess(newAccessToken));

          axiosToken.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
          return axiosToken(originalRequest);
        } catch (refreshError) {
          dispatch(logoutSuccess());
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  return { axiosToken, axiosPublic };
};
 

export default useAxios