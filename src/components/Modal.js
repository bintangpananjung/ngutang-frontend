const ConfModal = (dataconf, datasubmitted, submitted) => {
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
              }}
              className="btn btn-thumb me-4"
              style={{ width: "5rem" }}
            >
              Ya
            </button>
            <button
              onClick={e => {
                e.preventDefault();
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
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100%", width: "100%" }}
    >
      <p className="mb-4">{datasubmitted}</p>
      <button
        className="btn btn-thumb"
        style={{ width: "5rem" }}
        onClick={e => {}}
      >
        OK
      </button>
    </div>;
  }
};
