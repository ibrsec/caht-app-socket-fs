import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, { payload }) => {
      state.socket = payload;
    },
    successWitoutPayload: (state) => {
      // state.loading = false;
    },
    killSocket: (state) => {
      state.socket = null;
    },
    setOnlineUsers: (state, { payload }) => {
      state.onlineUsers = payload;
    },
  },
});

export const { setSocket, killSocket, successWitoutPayload, setOnlineUsers } =
  socketSlice.actions;
export default socketSlice.reducer;
