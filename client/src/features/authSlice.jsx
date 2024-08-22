import { createSlice } from "@reduxjs/toolkit"


const initialState = {    
    user: null,
    token:"",
    refresh:"",
    loading:false,
    error:false
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        fetchLoginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess : (state,{payload}) => {
            state.loading = false;
            state.user = payload?.user;
            state.token = payload?.bearer?.accessToken;
            state.refresh = payload?.bearer?.refreshToken;
        },
        registerSuccess : (state,{payload}) => {
            state.loading = false;
            state.user = payload?.user;
            state.token = payload?.bearer?.accessToken;
            state.refresh = payload?.bearer?.refreshToken;
        },
        refreshTokenSuccess : (state,{payload}) => {
            state.loading = false; 
            state.token = payload; 
        },
        logoutSuccess : (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.refresh = null;
        },
        fetchLoginFail : (state)=>{
            state.loading = false;
            state.error = true;
        }

    }
})

export const  {fetchLoginStart,loginSuccess,fetchLoginFail,registerSuccess,logoutSuccess,refreshTokenSuccess} = authSlice.actions;
export default authSlice.reducer;
