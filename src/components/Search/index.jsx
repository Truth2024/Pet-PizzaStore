import React from 'react';
import styles from './search.module.scss';
import { ReactComponent as Icon } from '../../assets/img/search.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
//selectors-slice
import { selectSearchValue } from '../../features/slices/filterSlice/filterSelector';
//action-slice
import { setSearchValue } from '../../features/slices/filterSlice/filterSlice';

export const Search = () => {
  const dispatch = useAppDispatch();

  const { searchValue } = useAppSelector(selectSearchValue);

  return (
    <div className={`${styles.formGroup}`}>
      <Icon />
      <input
        value={searchValue}
        onChange={(e) => {
          dispatch(setSearchValue(e.target.value));
        }}
        className={styles.input}
        type="text"
        placeholder="Поиск..."
      />
    </div>
  );
};
