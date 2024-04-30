import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ pageNum, setPageNum, onPageChange }) => {
  const handleNextPage = () => {
    setPageNum(pageNum + 1);
    onPageChange(pageNum + 1);
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      onPageChange(pageNum - 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={pageNum === 1}>
        Previous
      </button>
      <span style={{ fontWeight: "bold", marginTop: "16px" }}>{pageNum}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
