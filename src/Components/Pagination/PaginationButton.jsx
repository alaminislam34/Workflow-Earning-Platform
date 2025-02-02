/* eslint-disable react/prop-types */
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const PaginationButton = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      {/* Pagination */}
      <div className="flex justify-center mt-4 p4">
        <ul className="flex items-center space-x-2">
          {/* Previous Button */}
          <li>
            <button
              className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
              <MdChevronLeft />
            </button>
          </li>

          {/* Page Numbers */}
          {[...Array(totalPages)]?.map((_, index) => (
            <li key={index}>
              <button
                className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                  currentPage === index + 1
                    ? "bg-primaryColor text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              className={`rounded-lg shadow-xl btn btn-sm hover:bg-primaryColor ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <MdChevronRight />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaginationButton;
