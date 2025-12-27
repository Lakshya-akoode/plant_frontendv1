"use client";

const Pagination = ({ 
  totalCount = 0, 
  currentPage = 1, 
  pageSize = 10, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  // Don't show pagination if there's only one page or no data
  if (totalPages <= 1 || totalCount === 0) {
    return null;
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mbp_pagination">
      <ul className="page_navigation">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            tabIndex={currentPage === 1 ? -1 : 0}
            aria-disabled={currentPage === 1}
          >
            <span className="flaticon-left-arrow"></span>
          </a>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            );
          }
          
          return (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
                {page === currentPage && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            </li>
          );
        })}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            tabIndex={currentPage === totalPages ? -1 : 0}
            aria-disabled={currentPage === totalPages}
          >
            <span className="flaticon-right-arrow"></span>
          </a>
        </li>
      </ul>
      
      {/* Page Info */}
      {/* <div className="page-info" style={{ 
        textAlign: 'center', 
        marginTop: '12px',
        color: '#6b7280',
        fontSize: '14px',
        fontFamily: 'Poppins'
      }}>
        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} users
      </div> */}
    </div>
  );
};

export default Pagination;
