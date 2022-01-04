import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Style from "../styles/Style";
import profpic from "../assets/profile.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../auth/auth";
import Autocomplete from "../components/Autocomplete";
import { lastupdated, messageutang } from "../helper/transaction_helper";
import closeicon from "../assets/close.png";
import ConfModalStyle from "../styles/ConfModalStyle";
import CardStyle from "../styles/CardStyle";
import Pagination from "../components/Pagination";

const Transaction = () => {
  // header authorization
  const header = auth();

  //refs
  const isModal = useRef(false);

  // states
  const [transactionData, settransactionData] = useState();
  const [addstate, setaddstate] = useState(false);
  const [updated, setupdated] = useState();
  const [puredata, setpuredata] = useState(transactionData);
  const [userAdd, setuserAdd] = useState();
  const [jmlutang, setjmlutang] = useState(0);
  const [date, setdate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setnotes] = useState("");
  const [member, setmember] = useState([]);
  const [search, setsearch] = useState("");
  const [conf, setconf] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [lunas, setlunas] = useState(false);
  const [tagih, settagih] = useState(false);
  const [params, setparams] = useSearchParams();

  //navigating
  const navigate = useNavigate();

  //hook fetch
  useEffect(async () => {
    await axios
      .get(
        `/transaction/pages/${params.get("page") ? params.get("page") : 1}`,
        header
      )
      .then(res => {
        // console.log(res.data);
        if (res.status === 201) {
          settransactionData(res.data);
          setpuredata(res.data);
        } else {
          navigate("/login");
        }
      });
  }, [updated, params]);

  useEffect(() => {
    axios.get("/member", header).then(res => {
      if (res.status === 201) {
        setmember(res.data);
        // console.log(res.data);
      } else {
        console.log("error");
      }
    });
  }, [addstate]);

  //hook re-render
  useEffect(() => {
    if (puredata) {
      settransactionData({
        maxPage: puredata.maxPage,
        data: puredata.data.filter(user => {
          const regex = new RegExp(`${search}`);
          return user.username2.match(regex);
        }),
      });
    }
  }, [search]);

  //support fetch function
  const validateTransactionForm = (member, userAdd, jmlutang) => {
    if (!member.includes(userAdd)) {
      console.log("user tidak valid");
      return false;
    }
    if (jmlutang === 0) {
      console.log("masa utang 0 rupiah ngapain coba");
      return false;
    }
    return true;
  };
  const submit = async () => {
    await axios
      .post(
        "/transaction/add",
        {
          username2: userAdd,
          diff_amount: jmlutang,
          created_at: new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          notes: notes,
        },
        header
      )
      .then(res => {
        if (res.status === 201) {
          setupdated(true);
          setsubmitted(true);
          console.log("data berhasil diupdate");
        } else {
          console.log("data gagal diupdate");
        }
      });
  };

  const paidoff = async val => {
    await axios
      .post(
        "/notify-paid-off",
        {
          username2: val.username2,
        },
        header
      )
      .then(res => {
        if (res.status === 201) {
          setsubmitted(true);
          console.log("kirim notifikasi pelunasan berhasil");
        } else {
          console.log("kirim notifikasi gagal");
        }
      });
  };
  const bill = async val => {
    await axios
      .post(
        "/notify-bill",
        {
          username2: val.username2,
        },
        header
      )
      .then(res => {
        if (res.status === 201) {
          setsubmitted(true);
          console.log("kirim notifikasi tagihan berhasil");
        } else {
          console.log("kirim notifikasi gagal");
        }
      });
  };

  //support re-render function
  const getTransaction = () => {
    if (transactionData) {
      if (transactionData.data.length > 0) {
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
                <div
                  className="ms-4 rounded-circle overflow-hidden"
                  style={{ width: "6rem" }}
                >
                  <img
                    src={profpic}
                    className="card-img"
                    alt="..."
                    style={{ width: "100%" }}
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
                <div className="card-btn me-4">
                  <button
                    className={
                      val.diff_amount > 0
                        ? "btn btn-palette-6"
                        : "btn btn-thumb"
                    }
                    onClick={e => {
                      e.preventDefault();
                      val.diff_amount > 0 ? settagih(true) : setlunas(true);
                      setconf(true);
                    }}
                  >
                    {val.diff_amount > 0 ? "Tagih" : "Lunasi"}
                  </button>
                  <Link
                    to={`${val.username2}`}
                    className="btn btn-palette-3 ms-3 "
                  >
                    Detail
                  </Link>
                </div>
              </div>
              <ConfModalStyle>
                <div
                  className={
                    "conf-backdrop" +
                    (conf && (lunas || tagih) ? " show" : "") +
                    " bg-palette-4 centered"
                  }
                  style={{ zIndex: "2", height: "100vh", width: "100vw" }}
                ></div>
                <div
                  className={
                    "conf-trans" +
                    (conf && (lunas || tagih) ? " show" : "") +
                    " card centered shadow-lg bg-white font-default"
                  }
                  style={{
                    width: "30rem",
                    height: "12rem",
                    zIndex: "3",
                  }}
                >
                  {lunas || tagih
                    ? ConfModal(dataconf(val), datasubmitted(val), val)
                    : ""}
                  {/* {console.log(lunas)} */}
                </div>
              </ConfModalStyle>
            </div>
          );
        });
      }
    }
    return <p className="card-text p-1">data user atau transaksi tidak ada </p>;
  };

  const isSubmitted = submitted => {
    if (!submitted) {
      // console.log("a");
      return (
        <>
          <div
            className="d-flex flex-column p-2 justify-content-center align-items-center"
            style={{ width: "100%", height: "100%" }}
          >
            <p className="card-text" style={{ fontSize: "1.1rem" }}>
              Apakah anda yakin ingin menambahkan transaksi ini?
            </p>
            <div
              className="d-flex px-5 justify-content-center mt-4"
              style={{ width: "100%" }}
            >
              <button
                onClick={e => {
                  e.preventDefault();
                  submit();
                }}
                className="btn btn-thumb me-4"
                style={{ width: "5rem" }}
              >
                Ya
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  setconf(false);
                }}
                className="btn btn-palette-6 ms-4"
                style={{ width: "5rem" }}
              >
                Tidak
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100%", width: "100%" }}
        >
          <p className="mb-4">Transaksi berhasil ditambahkan!</p>
          <button
            className="btn btn-thumb"
            style={{ width: "5rem" }}
            onClick={e => {
              setaddstate(false);
              setconf(false);
              setsubmitted(false);
            }}
          >
            OK
          </button>
        </div>
      );
    }
  };

  const dataconf = val => {
    if (tagih) {
      return `Kirimkan notifikasi tagihan ke ${val.username2}?`;
    }
    if (lunas) {
      return `Kirimkan konfirmasi pelunasan ke ${val.username2}?`;
    }
    return "";
  };

  const datasubmitted = val => {
    if (tagih) {
      return `Notifikasi tagihan berhasil dikirim ke ${val.username2}!`;
    }
    if (lunas) {
      return `Konfirmasi pelunasan berhasil dikirim ke ${val.username2}!`;
    }
    return "";
  };

  const ConfModal = (dataconf, datasubmitted, val) => {
    if (dataconf && datasubmitted) {
      if (!submitted) {
        return (
          <>
            <div
              className="d-flex flex-column p-2 justify-content-center align-items-center"
              style={{ width: "100%", height: "100%" }}
            >
              <p className="card-text" style={{ fontSize: "1.1rem" }}>
                {dataconf}
              </p>
              <div
                className="d-flex px-5 justify-content-center mt-4"
                style={{ width: "100%" }}
              >
                <button
                  onClick={e => {
                    e.preventDefault();
                    lunas ? paidoff(val) : console.log("bukan lunas");
                    tagih ? bill(val) : console.log("bukan tagih");
                  }}
                  className="btn btn-thumb me-4"
                  style={{ width: "5rem" }}
                >
                  Ya
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setconf(false);
                    settagih(false);
                    setlunas(false);
                  }}
                  className="btn btn-palette-6 ms-4"
                  style={{ width: "5rem" }}
                >
                  Tidak
                </button>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%", width: "100%" }}
          >
            <p className="mb-4">{datasubmitted}</p>
            <button
              className="btn btn-thumb"
              style={{ width: "5rem" }}
              onClick={e => {
                setsubmitted(false);
                setconf(false);
                setlunas(false);
                settagih(false);
              }}
            >
              OK
            </button>
          </div>
        );
      }
    } else {
      return "";
    }
  };

  const addModal = () => {
    if (addstate) {
      return (
        <>
          <div className="d-flex flex-column p-4 card-content">
            <div className="d-flex ms-3 align-items-center">
              <h2 className="font-head me-auto">Tambah Transaksi</h2>
              <button
                className="d-flex close-but btn p-0 mb-2 me-4 border-0 align-items-center justify-content-center"
                onClick={e => {
                  e.preventDefault();
                  setaddstate(false);
                }}
              >
                <img
                  src={closeicon}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </button>
            </div>
            <form
              className="me-5 d-flex pt-5 px-3"
              onSubmit={e => {
                e.preventDefault();
                validateTransactionForm(member, userAdd, jmlutang)
                  ? setconf(true)
                  : console.log("data gabener");
                // submit();
              }}
            >
              <div className="d-flex" style={{ width: "100%" }}>
                <div className="col">
                  <div className="form-group d-flex flex-column">
                    <div className="d-flex">
                      <div
                        className="left-content rounded-circle bg-palette-2 mb-4 me-3"
                        style={{
                          height: "30px",
                          width: "30px",
                          minWidth: "30px",
                        }}
                      ></div>
                      <Autocomplete suggestions={member} props={setuserAdd} />
                    </div>
                    <div className="d-flex">
                      <div
                        className="left-content rounded-circle bg-palette-2 mb-4 me-3"
                        style={{
                          height: "30px",
                          width: "30px",
                          minWidth: "30px",
                        }}
                      ></div>
                      <input
                        type="number"
                        className="form-1"
                        placeholder="Jumlah Utang"
                        onChange={e => {
                          setjmlutang(e.target.value);
                        }}
                      />
                    </div>
                    <div className="d-flex">
                      <div
                        className="left-content rounded-circle bg-palette-2 mb-4 me-3"
                        style={{
                          height: "30px",
                          width: "30px",
                          minWidth: "30px",
                        }}
                      ></div>
                      <input
                        type="date"
                        className="form-1"
                        placeholder="Tanggal Transaksi"
                        value={date}
                        onChange={e => {
                          setdate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="d-flex">
                      <div
                        className="left-content rounded-circle bg-palette-2 mb-4 me-3"
                        style={{
                          height: "30px",
                          width: "30px",
                          minWidth: "30px",
                        }}
                      ></div>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-1"
                        placeholder="Catatan"
                        onChange={e => {
                          setnotes(e.target.value);
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-start mt-5 align-self-center"
                      style={{ width: "50%", fontSize: "1.2rem" }}
                    >
                      Tambah Transaksi
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ConfModalStyle>
            <div
              className={
                "conf-backdrop" +
                (conf && addstate ? " show" : "") +
                " bg-palette-4 centered"
              }
              style={{ zIndex: "1", height: "100vh", width: "100vw" }}
            ></div>
            <div
              className={
                "conf-trans" +
                (conf && addstate ? " show" : "") +
                " card centered shadow-lg bg-white font-default"
              }
              style={{
                width: "30rem",
                height: "12rem",
                zIndex: "1",
              }}
            >
              {conf ? isSubmitted(submitted) : ""}
            </div>
          </ConfModalStyle>
        </>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <Style>
        <CardStyle>
          <Header />
          <div className="d-flex flex-column container-fluid font-default bg-palette-4 margin-header body">
            <div className="d-flex container">
              <button
                onClick={e => {
                  setaddstate(true);
                  // isModal.current = true;
                }}
                className="btn btn-thumb mt-3 palette-5 me-auto"
                style={{ height: "2.5rem", width: "fit-content" }}
              >
                Tambah Transaksi
              </button>
              <form
                className="d-flex mt-3 align-items-end"
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <input
                  className="form-1 me-2 mb-0"
                  type="search"
                  placeholder="Cari user"
                  aria-label="Search"
                  onChange={e => {
                    setsearch(e.target.value);
                  }}
                />
                <button className="btn btn-thumb py-1 px-2 " type="submit">
                  Cari
                </button>
              </form>
            </div>
            <div className="container">
              <div className="d-flex flex-column container my-4 card-container shadow bg-palette-1 align-items-center align-self-center px-3">
                {getTransaction()}
              </div>
            </div>
            {transactionData ? (
              transactionData.maxPage > 1 ? (
                <Pagination
                  transactionData={transactionData}
                  page={params.get("page") ? params.get("page") : 1}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <>
            <div
              onClick={e => {
                setaddstate(false);
                // isModal.current = false;
              }}
              className={
                "modal-backdrop" +
                (addstate ? " show" : "") +
                " bg-palette-4 centered"
              }
              style={{ zIndex: "1", height: "100%", width: "100%" }}
            ></div>
            <div
              className={
                "modal-trans" +
                (addstate ? " show" : "") +
                " card centered shadow-lg bg-white"
              }
              style={{
                width: "50rem",
                height: "30rem",
                zIndex: "2",
              }}
            >
              {addModal()}
            </div>
          </>
        </CardStyle>
      </Style>
    </>
  );
};

export default Transaction;
