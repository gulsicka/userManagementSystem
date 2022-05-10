import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: "",
  snackBar: {
    open: false,
    msg: "0",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUsers(state, { payload }) {
      state.users = [...state.users, payload];
    },
    setCurrentUser(state, { payload }) {
      state.currentUser = payload;
    },
    setAllUsers(state, { payload }) {
      state.users = payload;
    },
    setSnackbar(state, { payload }) {
      state.snackBar = payload;
    },
  },
});

export const { setUsers, setSnackbar, setAllUsers, setCurrentUser } =
  appSlice.actions;

export default appSlice.reducer;
