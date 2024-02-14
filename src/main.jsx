import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import { Routes, Route, BrowserRouter, RouterProvider } from "react-router-dom";
import UnderConstruction from "./Pages/UnderConstruction.jsx";
import LoginPage from "./Pages/LoginPage.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
