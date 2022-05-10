import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import AddUserModal from "../AddUserModal/AddUserModal";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseApp from "../../firebase";
import { setAllUsers, setSnackbar, setUsers } from "../../store/app";
import UserTable from "../UsersTable/UserTable";
import { useAppBodyStyle } from "./AppBody.styles";

const AppBody = ({ users }) => {
  const [addUser, setAddUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userID, setUserID] = useState("");
  console.log("users: ", users);
  const { snackBar } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    dispatch(setSnackbar({ open: false, msg: "" }));
  };

  const classes = useAppBodyStyle();

  return (
    <div className={classes.root}>
      {users.length < 1 ? (
        <h1>No users yet</h1>
      ) : (
        <UserTable
          setAddUser={setAddUser}
          users={users}
          setIsEdit={setIsEdit}
          setUserID={setUserID}
        />
      )}
      <Button variant="contained" onClick={() => setAddUser(true)}>
        Add User
      </Button>
      {addUser && (
        <AddUserModal
          isEdit={isEdit}
          userID={userID}
          isOpen={addUser}
          setAddUser={setAddUser}
          setIsEdit={setIsEdit}
          users={users}
        />
      )}
      <Snackbar
        open={R.propOr(false, "open", snackBar)}
        autoHideDuration={5000}
        severity="error"
        message={R.propOr("", "msg", snackBar)}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            x
          </Button>
        }
      />
    </div>
  );
};

export default AppBody;
