import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
//constants
import { categories } from '../../constants/constants';
//selectors-slice
import { selectCategoriesIndex } from '../../features/slices/filterSlice/filterSelector';
//action-slice
import { setCategories, setCurrentPage } from '../../features/slices/filterSlice/filterSlice';

export const Categories = React.memo(() => {
  const categoriesIndex = useAppSelector(selectCategoriesIndex);

  const dispatch = useAppDispatch();

  const changeCategories = (index: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategories(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li key={index} onClick={() => changeCategories(index)} className={categoriesIndex === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
