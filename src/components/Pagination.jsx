// 外部 node_modules 資源
import PropTypes from 'prop-types';

function Pagination({pagination, getProducts}){
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getProducts(page)
  }

  return (
    // Pagination
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${pagination.has_pre ? "" : "disabled"}`}>
            <a className="page-link" href="#" onClick={(e) => handlePageChange(e, pagination.current_page - 1)}>Previous</a>
          </li>
          {
            Array.from({ length: pagination.total_pages}).map((_, index) => (
              <li key={index} className={`page-item ${pagination.current_page === index + 1 ? "active" : ""}`}>
                <a className="page-link" href="#" onClick={(e) => handlePageChange(e, index + 1)}>{index+1}</a>
              </li>
            ))
          } 
          <li className={`page-item ${pagination.has_next ? "" : "disabled"}`}>
            <a className="page-link" href="#" onClick={(e) => handlePageChange(e, pagination.current_page + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
Pagination.propTypes = {
  pagination: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    has_pre: PropTypes.bool,
    has_next: PropTypes.bool,
  }).isRequired,
  getProducts: PropTypes.func,
}
export default Pagination