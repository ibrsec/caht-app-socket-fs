import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
  loading: false,
  error: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchMessageStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    messagesSuccess: (state, { payload }) => {
      state.loading = false;
      state.messages = payload;
    },
    successWitoutPayload: (state) => {
      state.loading = false;
    },
    fetchMessageFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteMessageLogout: (state) => {
      state.messages = [];
    },
  },
});

export const {
  fetchMessageStart,
  fetchMessageFail,
  messagesSuccess,
  successWitoutPayload,
  deleteMessageLogout,
} = messageSlice.actions;
export default messageSlice.reducer;
