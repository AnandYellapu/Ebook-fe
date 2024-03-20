
import React, { useState, useEffect } from 'react';

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage, pageRangeDisplayed = 5, className }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pageNumbers = [];
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  // Calculate the range of page numbers to display around the current page
  let startPage = currentPage - Math.floor(pageRangeDisplayed / 2);
  let endPage = currentPage + Math.floor(pageRangeDisplayed / 2);

  // Adjust startPage and endPage if they go beyond the range of available pages
  if (startPage < 1) {
    endPage -= startPage - 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
  }

  // Populate the array of page numbers
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Calculate the maximum number of page numbers to display based on screen width
  const maxPageNumbers = windowWidth >= 768 ? 7 : 5;

  return (
    <nav>
      <ul className={`pagination ${className}`}>
        {/* Button for going to the first page */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(1)} className="page-link">
            First
          </button>
        </li>
        {/* Button for going to the previous page */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage - 1)} className="page-link">
            Previous
          </button>
        </li>
        {/* Page numbers */}
        {startPage > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {pageNumbers.slice(0, maxPageNumbers).map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {/* Button for going to the next page */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage + 1)} className="page-link">
            Next
          </button>
        </li>
        {/* Button for going to the last page */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => paginate(totalPages)} className="page-link">
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
