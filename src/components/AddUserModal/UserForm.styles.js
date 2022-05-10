import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

export const useUserFormStyle = makeStyles(() => ({
    outerDiv: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px'
    }
}));