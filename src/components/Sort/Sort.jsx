import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Sort.module.scss';
//constants
import { selects } from '../../constants/constants';
//selectors-slice
import { selectSortIndex, selectSortDirection } from '../../features/slices/filterSlice/filterSelector';
//actions-slice
import { setSort, setDirection } from '../../features/slices/filterSlice/filterSlice';
//api-slice

export const Sort = React.memo(() => {
  const dispatch = useAppDispatch();
  const sortIndex = useAppSelector(selectSortIndex);
  const direction = useAppSelector(selectSortDirection);
  const [popup, setPopup] = React.useState(false);
  const sortRef = React.useRef(null);

  const onClickSelect = React.useCallback(
    (index) => {
      dispatch(setSort(index));
      setPopup(false);
    },
    [dispatch],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() => {
            dispatch(setDirection());
          }}
          className={`${styles.arrowIcon} ${direction ? '' : styles.rotated}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#fe5f1e"
          />
        </svg>

        <b>Сортировка по:</b>
        <span onClick={() => setPopup((prev) => !prev)}>{selects[sortIndex].label}</span>
      </div>
      <div className={`sort__popup ${popup ? 'open' : ''}`}>
        <ul>
          {selects.map((select, index) => (
            <li onClick={() => onClickSelect(index)} key={index} className={`${index === sortIndex ? 'active' : ''}`}>
              {select.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
