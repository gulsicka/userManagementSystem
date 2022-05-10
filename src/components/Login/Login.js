import * as R from "ramda";
import * as CryptoJS from "crypto-js";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import Paper from "@mui/material/Paper";
import { TableBody } from "@mui/material";
import DeleteIcon from "../../assets/svgs/DeleteIcon";
import { Button } from "@mui/material";
import firebaseApp from "../../firebase";
import EditIcon from "../../assets/svgs/EditIcon";
import { useLoginStyle } from "./Login.styles";
import { Input } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setSnackbar } from "../../store/app/appSlice";
import { userExists } from "../../utils/helpers";
import { Snackbar } from "@mui/material";

const LoginPage = ({ users }) => {
  const classes = useLoginStyle();
  const dispatch = useDispatch();
  const { snackBar } = useSelector((state) => state.app);

  const { control, handleSubmit, formState, reset, register, formData } =
    useForm({
      mode: "all",
      defaultValues: {},
      shouldFocusError: true,
      //resolver: yupResolver(NewUserFormValidator),
    });
  const onSubmit = (formData) => {
    const userID = R.propOr("", "id", formData);
    if (userExists(userID, users)) {
      const currentUserPass = R.pipe(
        R.filter(R.propEq("id", userID)),
        R.head,
        R.propOr("", "password")
      )(users);
      var bytes = CryptoJS.AES.decrypt(currentUserPass, "superkey");
      var savedPass = bytes.toString(CryptoJS.enc.Utf8);
      if (R.equals(savedPass, R.propOr("", "password", formData))) {
        dispatch(setCurrentUser(userID));
        dispatch(
          setSnackbar({
            open: true,
            msg: "Successfully logged in!",
          })
        );
      } else
        dispatch(
          setSnackbar({
            open: true,
            msg: "Invalid password entered!",
          })
        );
    } else
      dispatch(
        setSnackbar({
          open: true,
          msg: "Invalid ID entered!",
        })
      );
  };

  const handleSnackbarClose = () => {
    dispatch(setSnackbar({ open: false, msg: "" }));
  };
  return (
    <>
      <div className={classes.root}>
        <h2 className={classes.header}>Login</h2>
        <Controller
          render={({ field }) => (
            <Input
              ref={register("id")}
              name="id"
              placeholder="Enter ID..."
              {...field}
            />
          )}
          name="id"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Input
              type="password"
              ref={register("password")}
              name="password"
              placeholder="Enter user password..."
              {...field}
            />
          )}
          name="password"
          control={control}
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Login
        </Button>
      </div>
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
    </>
  );
};

export default LoginPage;
