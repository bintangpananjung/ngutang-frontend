import React from "react";
import { Link } from "react-router-dom";

const Pagination = props => {
  const pager = (maxPage, page) => {
    maxPage = parseInt(maxPage);
    page = parseInt(page);
    var item = [];
    var pagecount = maxPage;
    var init = 0;
    if (maxPage >= 5) {
      if (maxPage - page >= 4) {
        pagecount = page + 4;
        init = page - 1;
      } else {
        if (page > maxPage - 5) {
          pagecount = maxPage;
          init = maxPage - 5;
        }
      }
    }
    for (let i = init; i < pagecount; i++) {
      item.push(
        <li className="page-item" key={i}>
          <Link
            className={
              (page == i + 1 ? "active" : "") + " page-link pagination-item"
            }
            to={`?page=${i + 1}`}
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
      {/* {console.log(props)} */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={"page-item" + (props.page == 1 ? " disabled" : "")}>
            <Link
              className={
                "page-link pagination-item" +
                (props.page == 1 ? " disabled" : "")
              }
              to={`?page=${parseInt(props.page) - 1}`}
            >
              Previous
            </Link>
          </li>
          {pager(props.transactionData.maxPage, props.page)}
          <li
            className={
              "page-item" +
              (props.page == props.transactionData.maxPage ? " disabled" : "")
            }
          >
            <Link
              className={
                "page-link pagination-item" +
                (props.page == props.transactionData.maxPage ? " disabled" : "")
              }
              to={`?page=${parseInt(props.page) + 1}`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
