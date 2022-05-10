import * as React from "react";
import * as R from "ramda";

import "./App.css";
import LoadingState from "./components/Loader/LoadingState";
import AppBody from "./components/AppBody/AppBody";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import LoginPage from "./components/Login/Login";
import MainBody from "./components/MainBody/MainBody";
import { Button } from "@mui/material";

function App() {
  return (
    <React.Suspense fallback={<LoadingState />}>
      <Provider store={store}>
        <div className="App">
          <MainBody />
        </div>
      </Provider>
    </React.Suspense>
  );
}

export default App;
