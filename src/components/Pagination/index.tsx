import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currnetPage: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currnetPage, setPage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => setPage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currnetPage - 1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
