import profpic from "../assets/profile.png";

export const lastupdated = val => {
  if (val) {
    const insecond = Math.floor(
      (Date.now() - new Date(val["updated_at"].replace(" ", "T")).getTime()) /
        1000
    );

    const inminute = Math.floor(insecond / 60);
    if (inminute === 0) {
      return "last updated " + insecond + " seconds ago";
    }
    const inhour = Math.floor(inminute / 60);
    if (inhour === 0) {
      return "last updated " + inminute + " minutes ago";
    }
    const inday = Math.floor(inhour / 24);
    if (inday === 0) {
      return "last updated " + inhour + " hours ago";
    }
    const inmonth = Math.floor(inday / 30);
    if (inmonth === 0) {
      return "last updated " + inday + " days ago";
    }
    const inyear = Math.floor(inmonth / 12);
    if (inyear === 0) {
      return "last updated " + inmonth + " months ago";
    }
    return "last updated " + inyear + " years ago";
  } else {
    return;
  }
};
export const messageutang = val => {
  if (val.diff_amount > 0) {
    return (
      val.username2 + " memiliki utang kepada anda sebesar Rp" + val.diff_amount
    );
  } else {
    return (
      "Anda memiliki utang kepada " +
      val.username2 +
      " sebesar Rp" +
      val.diff_amount * -1
    );
  }
};

export const getHistory = transactionData => {
  if (transactionData) {
    if (transactionData.length > 0) {
      return transactionData.map((val, index) => {
        return (
          <div
            className={
              (val.diff_amount > 0 ? "bg-palette-2" : "bg-palette-4") +
              " card mb-3"
            }
            style={{ width: "100%" }}
            key={index}
          >
            <div className="d-flex align-items-center card-content">
              <div className="ms-3 me-auto">
                <div className={"card-body"}>
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
      return <p className="palette-4">Tidak ada riwayat utang</p>;
    }
  } else {
    return <p className="palette-4">loading...</p>;
  }
};

export const profileMessageStatus = data => {
  if (data) {
    return data.diff_amount > 0
      ? `Berhutang kepada anda sebesar Rp${data.diff_amount}`
      : `Anda memiliki utang sebesar Rp${data.diff_amount * -1}`;
  } else {
    return;
  }
};
