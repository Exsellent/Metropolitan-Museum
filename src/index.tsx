import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppWrapper from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
