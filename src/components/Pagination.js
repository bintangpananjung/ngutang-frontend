import React from "react";
import { Link } from "react-router-dom";

const Pagination = props => {
  const pager = (maxPage, page) => {
    var item = [];
    const pagecount = maxPage > 5 ? 5 : maxPage;
    for (let i = page - 1; i < pagecount; i++) {
      item.push(
        <li className="page-item" key={i}>
          <Link
            className={
              (page == i + 1 ? "active" : "") + " page-link pagination-item"
            }
            to={`page=${i + 1}`}
          >
            {i + 1}
          </Link>
        </li>
      );
    }
    return item;
  };
  return (
    <>
      {console.log(props)}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link pagination-item disabled" href="#">
              Previous
            </a>
          </li>
          {pager(props.transactionData.maxPage, props.page)}
          <li className="page-item">
            <a className="page-link pagination-item" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
