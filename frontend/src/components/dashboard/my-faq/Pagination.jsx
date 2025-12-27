// const Pagination = () => {
//   return (
//     <ul className="page_navigation">
//       <li className="page-item disabled">
//         <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
//           {" "}
//           <span className="flaticon-left-arrow"></span>
//         </a>
//       </li>
//       <li className="page-item">
//         <a className="page-link" href="#">
//           1
//         </a>
//       </li>
//       <li className="page-item active" aria-current="page">
//         <a className="page-link" href="#">
//           2 <span className="sr-only">(current)</span>
//         </a>
//       </li>
//       <li className="page-item">
//         <a className="page-link" href="#">
//           3
//         </a>
//       </li>
//       <li className="page-item">
//         <a className="page-link" href="#">
//           ...
//         </a>
//       </li>
//       <li className="page-item">
//         <a className="page-link" href="#">
//           29
//         </a>
//       </li>
//       <li className="page-item">
//         <a className="page-link" href="#">
//           <span className="flaticon-right-arrow"></span>
//         </a>
//       </li>
//     </ul>
//   );
// };

// export default Pagination;

// export default Pagination;
const Pagination = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a className="page-link" href="#" onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}>
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>

      {pageNumbers.map((num) => (
        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => {
            e.preventDefault();
            onPageChange(num);
          }}>
            {num}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a className="page-link" href="#" onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}>
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};
export default Pagination;