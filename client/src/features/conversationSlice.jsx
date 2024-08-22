import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: null,
  selectedConversation: null,
  searchActive: false,
  loading: false,
  error: false,
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    fetchConvStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    convSuccess: (state, { payload }) => {
      state.loading = false;
      state.conversations = payload;
    },
    selectedConvSuccess: (state, { payload }) => {
      // state.loading = false;
      state.selectedConversation = payload;
    },
    searchActiveToggle: (state, { payload }) => {
      // state.loading = false;
      state.searchActive = payload;
    },
    selectedConvRemove: (state, { payload }) => {
      // state.loading = false;
      state.selectedConversation = null;
    },
    successWitoutPayload: (state) => {
      state.loading = false;
    },
    // deleteSuccess:(state,{payload})=> {
    //     state.loading = false;
    //     // state.firms = state.firms.filter(item => item._id !== payload);
    // },
    // postNewDataSuccess:(state)=>{
    //     state.loading = false;
    // },
    fetchConvFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteConvLogout: (state) => {
      state.conversations = [];
      state.selectedConversation = [];
    },
    // stockPromiseAllSuccess: (state, { payload: { paths, datas } }) => {
    // state.loading = false;
    // paths?.forEach((path, i) => {
    //   state[path] = datas[i];
    //   });
    // },
  },
});

export const {
  fetchConvStart,
  fetchConvFail,
  convSuccess,
  selectedConvSuccess,
  successWitoutPayload,
  deleteConvLogout,
  selectedConvRemove,
  searchActiveToggle,
} = conversationSlice.actions;
export default conversationSlice.reducer;
