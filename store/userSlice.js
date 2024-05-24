import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    id: "",
    email: "",
    token: "",
    userMessage: "",
    newPassword: "",
    password: "", // TODO: secure user password
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearAll: (state) => {
      state.username = "";
      state.id = "";
      state.email = "";
      state.token = "";
      state.userMessage = "";
    }
  }
})

export const {
  setUsername,
  setEmail,
  setId,
  setPassword,
  setToken,
  setUserMessage,
  setUser,
  clearAll,
  setNewPassword,
} = userSlice.actions;
export default userSlice.reducer;