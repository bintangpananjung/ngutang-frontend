import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages module
import App from "./App";
import About from "./pages/About";
import { Login, Register } from "./pages/LoginRegister";
import axios from "axios";
import Transaction from "./pages/Transaction";
import History from "./pages/History";
import DetailTransaction from "./pages/DetailTransaction";

axios.defaults.baseURL = "http://localhost:8080/";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"about"} element={<About />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/transaction"} element={<Transaction />} />
        <Route path={"/About"} element={<About />} />
        <Route path={"/history"} element={<History />} />
        <Route path={"/transaction/:user"} element={<DetailTransaction />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
