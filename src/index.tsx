import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MuiThemeProvider from "./theme/MuiThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>
);
