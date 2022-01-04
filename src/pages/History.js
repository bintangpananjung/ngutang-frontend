import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Style from "../styles/Style";
import profpic from "../assets/profile.png";
import styled from "styled-components";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { auth } from "../auth/auth";
import { lastupdated, messageutang } from "../helper/transaction_helper";
import CardStyle from "../styles/CardStyle";
import Pagination from "../components/Pagination";

const History = () => {
  const header = auth();
  const [params, setparams] = useSearchParams();
  const [transactionData, settransactionData] = useState();
  const navigate = useNavigate();
  useEffect(async () => {
    axios.get("/history/pages/2", header).then(res => {
      if (res.status === 201) {
        settransactionData(res.data);
      } else {
        navigate("/login");
      }
    });
  }, []);
  const getHistory = () => {
    if (transactionData) {
      return transactionData.data.map((val, index) => {
        return (
          <div
            className={
              (val.diff_amount > 0 ? "bg-palette-2" : "bg-palette-4") +
              " card my-3"
            }
            style={{ width: "100%" }}
            key={index}
          >
            <div className="d-flex align-items-center card-content">
              <div className="ms-4">
                <img
                  src={profpic}
                  className="card-img"
                  alt="..."
                  style={{ width: "6rem" }}
                />
              </div>
              <div className="ms-3 me-auto">
                <div className="card-body">
                  <h5 className="card-title">{val.username2}</h5>
                  <p className="card-text">{messageutang(val)}</p>
                  <p className="card-text">
                    <small className="text-muted">{lastupdated(val)}</small>
                  </p>
                </div>
              </div>
              <div className="me-4">
                <button className="btn btn-palette-3">Edit</button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return "data gaada ";
    }
  };
  return (
    <>
      <Style>
        <CardStyle>
          <Header />
          <div className="d-flex flex-column container-fluid font-default bg-palette-4 margin-header body align-items-center">
            <div className="d-flex flex-column container mx-3 my-4 card-container shadow bg-palette-1 align-items-center px-3">
              {getHistory()}
            </div>
            {transactionData ? (
              <Pagination
                transactionData={transactionData}
                page={params.get("page")}
              />
            ) : (
              ""
            )}
          </div>
        </CardStyle>
      </Style>
    </>
  );
};

export default History;
