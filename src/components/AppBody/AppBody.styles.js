import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

export const useAppBodyStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    columnGap: "25px",
    rowGap: "25px",
    margin: "30px auto"
  },
}));