import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const LandingPage = () => {
  const ContentStyle = styled.div`
    .container-size {
      min-height: 100%; /* Fallback for browsers do NOT support vh unit */
      min-height: 100vh; /* These two lines are counted as one :-)       */

      min-height: calc(100% - 62px); /*  */
      min-height: calc(100vh - 62px); /* */
    }
  `;

  if (localStorage.getItem("token")) {
    return <Navigate to={"/transaction"} />;
  }

  return (
    <>
      <ContentStyle>
        <div className="d-flex flex-column container-fluid vh-100 font-default justify-content-center align-items-center bg-palette-4">
          <div className="" style={{ fontWeight: 700, fontSize: "4rem" }}>
            NGUTANG
          </div>
          <div className="lead text-center" style={{ fontWeight: 300 }}>
            bingung ngurus utang dari/ke temen? lupa jumlah utangnya berapa?
            gamau bayar gara-gara gaada bukti utang?
          </div>
          <div className="lead" style={{ fontWeight: 300 }}>
            gaskeun pakai <strong>Ngutang</strong>!!
          </div>
          <Link to={"/login"} className="btn btn-start my-4">
            GASKEUN
          </Link>
        </div>
      </ContentStyle>
    </>
  );
};

export default LandingPage;
