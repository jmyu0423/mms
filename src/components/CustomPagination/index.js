import React, { useState } from "react";
import './Pagination.css';
import Pagination from "react-js-pagination";

const CustomPagination = ({totalItemsCount, pageCnt, page, setPage}) => {

  const handlePageChange = (pg) => {
    setPage(pg);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={pageCnt}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      prevPageText={"Prev"}
      nextPageText={"Next"}
      onChange={handlePageChange}
    />
  );
};

export default CustomPagination;