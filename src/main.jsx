import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PiggyProvider } from "./context/PiggyContext";
import "../styles/style.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PiggyProvider>
      <App />
    </PiggyProvider>
  </React.StrictMode>
);