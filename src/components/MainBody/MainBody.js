import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import AddUserModal from "../AddUserModal/AddUserModal";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseApp from "../../firebase";
import {
  setAllUsers,
  setCurrentUser,
  setSnackbar,
  setUsers,
} from "../../store/app";
import LoginPage from "../Login/Login";
import AppBody from "../AppBody/AppBody";

const MainBody = () => {
  const { currentUser, users } = useSelector((state) => state.app);
  const db = firebase.database();
  const dispatch = useDispatch();

  console.log("users: ", users);

  // runs only once to populate local state with users data from database
  useEffect(() => {
    db.ref(`/users`).on("value", (snapshot) => {
      if (snapshot.exists()) {
        const dbUsers = R.values(snapshot.val());
        dispatch(setAllUsers(dbUsers));
      }
    });
  }, []);

  return (
    <>
      <header className="App-header">
        <h1>User Management System</h1>
        {currentUser && (
          <Button
            variant="contained"
            className="button-style"
            onClick={() => dispatch(setCurrentUser(""))}
          >
            Logout
          </Button>
        )}
      </header>
      {!currentUser ? <LoginPage users={users} /> : <AppBody users={users} />}
    </>
  );
};

export default MainBody;
