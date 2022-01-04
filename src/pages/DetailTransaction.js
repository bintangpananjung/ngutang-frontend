import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useNavigate,
  NavigationType,
  Navigate,
} from "react-router-dom";
import Header from "../components/Header";
import CardStyle from "../styles/CardStyle";
import Style from "../styles/Style";
import profpic from "../assets/profile.png";
import back from "../assets/back.png";
import { auth } from "../auth/auth";
import axios from "axios";
import {
  getHistory,
  lastupdated,
  profileMessageStatus,
} from "../helper/transaction_helper";

const DetailTransaction = () => {
  const username2 = useParams()["user"];
  const header = auth();
  const [userData, setuserData] = useState();
  const [transactionData, settransactionData] = useState();
  // const [redirect, setredirect] = useState(false);
  const navigate = useNavigate();
  useEffect(async () => {
    await axios
      .get(`/transaction/${username2}`, header)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          setuserData(res.data);
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          navigate("/");
        }
      });
  }, []);

  useEffect(async () => {
    await axios
      .get(`/history/${username2}`, header)
      .then(res => {
        if (res.status === 201) {
          settransactionData(res.data);
        }
      })
      .catch(error => {
        console.log(error.response.status);
      });
  }, []);
  // if (redirect) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <>
      <Style>
        <Header />
        <CardStyle>
          <div className="d-flex flex-column container-fluid font-default bg-palette-4 margin-header body">
            <div className="container my-auto">
              <div
                className="d-flex shadow bg-palette-2 align-self-center card-container"
                style={{ height: "35rem", minWidth: "40rem" }}
              >
                <div
                  className="d-flex flex-column align-items-center py-3 px-1 position-relative"
                  style={{ width: "30rem" }}
                >
                  <Link to={"/"} className="align-self-start ms-4">
                    <img
                      src={back}
                      alt="back"
                      className="position-absolute top-0 left-0 mt-4 btn-back"
                    />
                  </Link>
                  <img
                    src={profpic}
                    className="card-img mt-5"
                    alt="..."
                    style={{ width: "10rem", height: "10rem" }}
                  />
                  <div
                    className="font-head mt-3"
                    style={{ fontSize: "1.8rem" }}
                  >
                    {username2}
                  </div>
                  <p className="mb-0 text-center">
                    {profileMessageStatus(userData)}
                  </p>
                  <div
                    className="text-muted mb-3 "
                    style={{ fontStyle: "italic", fontSize: "0.9rem" }}
                  >
                    {lastupdated(userData)}
                  </div>
                  <button
                    className="btn card-btn btn-palette-6 mt-4"
                    style={{ borderRadius: "0.8rem" }}
                  >
                    Tagih
                  </button>
                </div>
                <div
                  className="d-flex flex-column bg-palette-1 card-container py-3 px-4"
                  style={{ width: "100%", height: "100%" }}
                >
                  <p
                    className="mb-0 palette-4 font-head"
                    style={{ fontSize: "1.3rem" }}
                  >
                    Riwayat Utang
                  </p>
                  <div className="scroll-container my-3 pe-1">
                    {getHistory(transactionData)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardStyle>
      </Style>
    </>
  );
};

export default DetailTransaction;
