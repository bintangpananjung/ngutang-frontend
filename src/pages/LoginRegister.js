import React from "react";
import Style from "../styles/Style";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import give from "../assets/give.png";
import back from "../assets/back.png";

const LoginRegisterStyle = styled.div`
  .card-login {
    height: 500px;
    width: 900px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #00000024;
  }
  .left-content {
    height: 350px;
    width: 350px;
  }
  .right-content {
    width: 350px;
    height: 350px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .redirect-login {
    font-weight: 700;
    text-decoration: none;
  }
  .redirect-login:hover {
    color: #28584e;
  }
`;
export const Login = () => {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    axios
      .post("login", { username: user, password: pass })
      .then(async res => {
        if (res.status === 201) {
          await localStorage.setItem("token", res.data.token);
          navigate("/transaction");
        } else {
          console.log("login gagal");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Style>
      <LoginRegisterStyle>
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-palette-4">
          <div className="card card-login d-flex flex-row align-items-center justify-content-around position-relative">
            <Link to={"/"}>
              <img
                src={back}
                alt="back"
                className="position-absolute top-0 left-0 mt-4 btn-back"
              />
            </Link>
            <div className="d-flex flex-column left-content justify-content-center">
              <img
                src={give}
                alt=""
                style={{ height: "300px", width: "300px" }}
                className="ms-2"
              />
            </div>
            <form
              className="me-5 right-content d-block bg-palette-3 pt-5 px-3"
              onSubmit={e => {
                submit(e);
              }}
            >
              <h2 className="text-center font-head mb-3">Masuk</h2>
              <div className="form-group d-flex flex-column mt-5">
                {/* <label for="email">Alamat Email</label> */}
                <input
                  type="text"
                  className="form-1"
                  id="email"
                  placeholder="Username"
                  onChange={e => {
                    setuser(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input
                  type="password"
                  className="form-1"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={e => {
                    setpass(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-mid mt-2">
                Submit
              </button>
              <small className="mt-2 text-center d-block">
                Belum punya akun?{" "}
                <Link to={"/register"} className="palette-1 redirect-login">
                  Registrasi
                </Link>{" "}
                di sini!
              </small>
            </form>
          </div>
        </div>
      </LoginRegisterStyle>
    </Style>
  );
};

export const Register = () => {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    axios
      .post("register", { username: user, password: pass, email: email })
      .then(async res => {
        if (res.status === 204) {
          navigate("/login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Style>
      <LoginRegisterStyle>
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-palette-4">
          <div className="card card-login d-flex flex-row align-items-center justify-content-around position-relative">
            <Link to={"/"}>
              <img
                src={back}
                alt="back"
                className="position-absolute top-0 left-0 mt-4 btn-back"
              />
            </Link>
            <div className="d-flex flex-column left-content justify-content-center">
              <img
                src={give}
                alt=""
                style={{ height: "300px", width: "300px" }}
                className="ms-2"
              />
            </div>
            <form
              className="me-5 right-content d-block bg-palette-3 pt-5 px-3"
              onSubmit={e => {
                submit(e);
              }}
            >
              <h2 className="text-center font-head mb-3">Daftar</h2>
              <div className="form-group d-flex flex-column mt-2">
                {/* <label for="email">Alamat Email</label> */}
                <input
                  type="text"
                  className="form-1"
                  id="username"
                  placeholder="Username"
                  onChange={e => {
                    setuser(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>
              <div className="form-group d-flex flex-column">
                {/* <label for="email">Alamat Email</label> */}
                <input
                  type="email"
                  className="form-1"
                  id="email"
                  placeholder="Alamat email"
                  onChange={e => {
                    setemail(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input
                  type="password"
                  className="form-1"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={e => {
                    setpass(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-mid mt-2">
                Submit
              </button>
              <small className="mt-2 text-center d-block">
                Sudah punya akun?{" "}
                <Link to={"/login"} className="palette-1 redirect-login">
                  Masuk
                </Link>{" "}
                di sini!
              </small>
            </form>
          </div>
        </div>
      </LoginRegisterStyle>
    </Style>
  );
};
