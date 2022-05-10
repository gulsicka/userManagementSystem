import * as R from "ramda";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import Paper from "@mui/material/Paper";
import { TableBody } from "@mui/material";
import { useSelector } from "react-redux";

import DeleteIcon from "../../assets/svgs/DeleteIcon";
import { Button } from "@mui/material";
import firebaseApp from "../../firebase";
import EditIcon from "../../assets/svgs/EditIcon";

const UserTable = ({ users, setAddUser, setIsEdit, setUserID }) => {
  const deleteUserRecord = (userID) => {
    const db = firebaseApp.database();
    db.ref(`/users/${userID}`).remove();
  };

  const { currentUser } = useSelector((state) => state.app);
  const isAdmin = R.equals(currentUser, "admin");
  const editUserRecord = (userID) => {
    console.log("edit");
  };

  const usersWithoutAdmin = R.reject(R.propEq("name", "admin"), users);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="header">
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!usersWithoutAdmin &&
            usersWithoutAdmin.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                {isAdmin && (
                  <TableCell
                    align="right"
                    style={{ borderTop: "1px solid #E0E0E0" }}
                  >
                    {
                      <>
                        <Button
                          variant="link"
                          onClick={() => deleteUserRecord(user.id)}
                        >
                          <DeleteIcon key={user.id} />
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => {
                            setIsEdit(true);
                            setUserID(user.id);
                            setAddUser(true);
                          }}
                        >
                          <EditIcon key={user.id} />
                        </Button>
                      </>
                    }
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
