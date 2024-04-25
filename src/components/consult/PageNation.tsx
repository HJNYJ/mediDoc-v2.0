import React from "react";

interface PageNationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNation = ({
  currentPage,
  totalPages,
  onPageChange
}: PageNationProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <select
        value={currentPage}
        onChange={(e) => handlePageChange(parseInt(e.target.value))}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageNation;
