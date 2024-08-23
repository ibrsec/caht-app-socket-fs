import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
  conversations: [],
  selectedConversation: {},
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
    getAllConversationsSuccess: (state, { payload }) => {
      state.loading = false; 
      state.conversations = state.conversations.map((conversation) => {
        let changeId = "";

        payload?.filter((item) => {
            console.log('filter participants=', item.participants)
            console.log('filter conversation?._id', conversation?._id)
            return item.participants?.includes(conversation?._id);
          })
          .forEach((item) => {
            console.log('forach item', item)
            console.log('foreach conversation?._id', conversation?._id)
            if (item.newMessage == true) {
              changeId = conversation?._id;
              return;
            }
          });

        if (conversation._id == changeId) {
          conversation.isNewMessageAdded = true;
          return conversation;
        }
        return conversation;
      });
    },
    selectedConvSuccess: (state, { payload }) => {
      // state.loading = false;
      state.selectedConversation = payload;
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id === payload?._id) {
          conversation.isNewMessageAdded = false;
          return conversation;
        }
        return conversation;
      });
    },
    searchActiveToggle: (state, { payload }) => {
      // state.loading = false;
      state.searchActive = payload;
    },
    selectedConvRemove: (state, { payload }) => {
      // state.loading = false;
      state.selectedConversation = null;
    },
    newMessageAdded: (state, { payload }) => {
      // state.loading = false;
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id === payload) {
          conversation.isNewMessageAdded = true;
          return conversation;
        }
        return conversation;
      });

      console.log("from convSlice", state.conversations);
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
      state.searchActive = false;
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
  newMessageAdded,
  getAllConversationsSuccess,
} = conversationSlice.actions;
export default conversationSlice.reducer;
