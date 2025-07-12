import React from 'react';
import styles from './Pagination.module.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
///selectors-slice
import { selectData } from '../../imports/selectorsSlice';
import { selectCurrentPage } from '../../features/slices/filterSlice/filterSelector';
//actions-slice
import { setCurrentPage } from '../../features/slices/filterSlice/filterSlice';

export const Pagination = React.memo(() => {
  const { meta, error, data } = useAppSelector(selectData);
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();
  return (
    error == null &&
    data &&
    meta && (
      <ul className={styles.list}>
        <li
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          className={`${meta.current_page <= 1 ? styles.hidden : ''}`}
        >{`<`}</li>

        {[...Array(meta.total_pages)].map((_, index) => (
          <li
            onClick={() => dispatch(setCurrentPage(index + 1))}
            className={`${meta.current_page === index + 1 ? styles.select : ''}`}
            key={index}
          >
            {index + 1}
          </li>
        ))}
        <li
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          className={`${meta.current_page === meta.total_pages || meta.total_pages === 0 ? styles.hidden : ''}`}
        >{`>`}</li>
      </ul>
    )
  );
});
