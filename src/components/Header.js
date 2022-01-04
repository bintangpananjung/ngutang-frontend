import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import profpic from "../assets/profile.png";
import HeaderStyle from "../styles/HeaderStyle";

const Header = () => {
  const [userData, setuserData] = useState("");
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [temp, settemp] = useState();
  // const isMounted = useRef(false);
  // console.log(isLoggedIn);
  const location = useLocation();
  // const navigate = useNavigate();
  useEffect(async () => {
    await axios
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        if (res.status === 201) {
          setuserData(res.data);
          // setisLoggedIn(true);
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.clear();
        }

        console.log(error);
      });
    return () => {
      // isMounted.current = true;
    };
  }, []);
  const profile = () => {
    if (userData) {
      return (
        <>
          <li>
            <Link to={"/profile"} className="dropdown-item prof-item">
              {userData.username}
            </Link>
          </li>
          <li>
            <Link
              to={"/login"}
              className="dropdown-item prof-item"
              onClick={e => {
                localStorage.clear();
              }}
            >
              keluar
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to={"/login"} className="dropdown-item prof-item">
              Masuk
            </Link>
          </li>
          <li>
            <Link to={"/register"} className="dropdown-item prof-item">
              Daftar
            </Link>
          </li>
        </>
      );
    }
  };
  // console.log(isMounted.current, isLoggedIn, temp);
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <HeaderStyle>
      <div className="font-default fixed-top" style={{ zIndex: 1 }}>
        <nav className="navbar navbar-expand-lg header bg-palette-2">
          <div className="container align-items-center">
            <a className="navbar-brand title ">Ngutang</a>
            <button
              className="navbar-toggler nav-butt"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 me-auto mb-lg-0 mt-1">
                <li className="nav-item mx-1">
                  <Link
                    className={
                      location.pathname === "/" ||
                      location.pathname === "/transaction"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    aria-current="page"
                    to={localStorage.getItem("token") ? "/transaction" : "/"}
                  >
                    {localStorage.getItem("token") ? "Daftar Utang" : "Beranda"}
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link
                    className={
                      location.pathname === "/about"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={"/about"}
                  >
                    Tentang
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link
                    className={
                      location.pathname === "/history"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={"/history"}
                  >
                    Riwayat Utang
                  </Link>
                </li>
              </ul>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-profile rounded-circle bg-palette-1 ms-4 me-2 p-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={profpic} alt="" className="prof-pic" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end mt-3 me-2">
                  {profile()}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </HeaderStyle>
  );
};

export default Header;
