import { Box, Modal, Typography } from "@mui/material";
import * as CryptoJS from "crypto-js";

import { useForm } from "react-hook-form";
import { NewUserFormValidator } from "../../validations/validations";
import NewUserForm from "./NewUserForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setUsers, setSnackbar } from "../../store/app/appSlice";
import "firebase/compat/database";
import firebase from "firebase/compat/app";
import * as R from "ramda";
import { useEffect } from "react";
import { userExists } from "../../utils/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  border: "2px solid #1976d2",
  boxShadow: 24,
  p: 4,
  color: "#1976d2",

  "& .margin-bot": {
    marginBottom: "30px",
  },
};

const AddNewUser = ({
  isOpen,
  setAddUser,
  setIsEdit,
  users,
  isEdit,
  userID,
}) => {
  const dispatch = useDispatch();
  const DEFAULT_FORM_VALUES = isEdit
    ? R.find(R.propEq("id", userID), users)
    : {
        id: "",
        email: "",
        name: "",
        age: "",
      };

  const { control, handleSubmit, formState, reset, register, formData } =
    useForm({
      mode: "all",
      defaultValues: DEFAULT_FORM_VALUES,
      shouldFocusError: true,
      resolver: yupResolver(NewUserFormValidator),
    });

  const db = firebase.database();

  const onSubmit = (formData) => {
    dispatch(setUsers(formData));

    const newUserID = R.propOr(0, "id", formData);
    debugger;
    if (isEdit) {
      console.log("formData: ", formData);
      db.ref(`/users/${newUserID}`).update(formData);
      dispatch(
        setSnackbar({
          open: true,
          msg: "User Updated",
        })
      );
      setIsEdit(false);
      // dispatch(setUsers(formData));
    } else {
      if (!userExists(newUserID, users)) {
        const encryptedPass = CryptoJS.AES.encrypt(
          R.propOr("", "password", formData),
          "superkey"
        );
        db.ref(`/users/${newUserID}`).set({
          ...formData,
          password: encryptedPass.toString(),
        });
        dispatch(
          setSnackbar({
            open: true,
            msg: "New User added",
          })
        );
        // dispatch(setUsers(formData));
      } else
        dispatch(
          setSnackbar({
            open: true,
            msg: "User with given ID already exists!",
          })
        );
    }
    setAddUser(false);
    reset();
  };

  const handleFormClose = () => {
    setAddUser(false);
    setIsEdit(false);
    reset();
  };

  const updateUser = () => {
    // if (!userExists(userID)) db.ref(`/users/${userID}`).update(formData);
    console.log("formData: ", formData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleFormClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="margin-bot"
        >
          {`${isEdit ? "Update" : "Add New"} User`}
        </Typography>
        <NewUserForm
          control={control}
          handleSubmit={handleSubmit}
          formState={formState}
          onSubmit={onSubmit}
          setAddUser={setAddUser}
          handleFormClose={handleFormClose}
          register={register}
          isEdit={isEdit}
          updateUser={updateUser}
        />
      </Box>
    </Modal>
  );
};

export default AddNewUser;
