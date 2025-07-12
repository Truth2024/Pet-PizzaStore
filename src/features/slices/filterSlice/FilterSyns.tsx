import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCategoriesIndex,
  selectCurrentPage,
  selectSearchValue,
  selectSortIndex,
  selectSortDirection,
} from './filterSelector';
import { changeInitial, reset } from '../filterSlice/filterSlice';

const FilterSync = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = useAppSelector(selectCurrentPage);
  const categoriesIndex = useAppSelector(selectCategoriesIndex);
  const sortIndex = useAppSelector(selectSortIndex);
  const searchValue = useAppSelector(selectSearchValue);
  const sortDirection = useAppSelector(selectSortDirection);

  // Если URL пуст — сбрасываем фильтры
  useEffect(() => {
    if (location.pathname === '/' && location.search === '') {
      dispatch(reset());
    } else {
      const params = new URLSearchParams(location.search);

      const page = Number(params.get('page')) || 1;
      const categories = Number(params.get('categories')) || 0;
      const sortBy = Number(params.get('sortBy')) || 0;
      const search = params.get('searchValue') || '';
      const direction = params.get('direction') === 'desc' ? false : true;

      dispatch(changeInitial({ page, categories, sortBy, searchValue: search, direction }));
    }
  }, [dispatch, location]);

  // Обновляем URL при изменении фильтров
  useEffect(() => {
    const queryString = new URLSearchParams({
      page: currentPage.toString(),
      categories: categoriesIndex.toString(),
      sortBy: sortIndex.toString(),
      searchValue,
      direction: sortDirection ? 'asc' : 'desc',
    }).toString();

    navigate(`?${queryString}`, { replace: true });
  }, [currentPage, categoriesIndex, sortIndex, searchValue, sortDirection, navigate]);

  return null;
};

export default FilterSync;
