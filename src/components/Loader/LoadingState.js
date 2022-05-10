import React from "react";
import Loader from "../../assets/svgs/Loader";
import { styled } from "@mui/system";

export const Container = styled("div")((props) => ({
  position: "absolute",
  background: "white",
  zIndex: "10000000",
  height: "100%",
  width: "100%",
  opacity: "0.5",
  top: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const RotatingContainer = styled("div")((props) => ({
  animationName: "spin",
  animationDuration: "2000ms",
  animationIterationCount: "infinite",
  animationTimingFunction: "linear",

  "@keyframes spin ": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

const LoadingState = () => {
  return (
    <Container>
      <RotatingContainer>
        <Loader />
      </RotatingContainer>
    </Container>
  );
};

export default LoadingState;
