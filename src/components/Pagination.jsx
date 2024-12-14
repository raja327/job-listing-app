import React from "react";

const Pagination = ({ totalJobs, jobsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <div className="pagination flex justify-center mt-6">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
