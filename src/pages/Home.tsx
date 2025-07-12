import React from 'react';
import { useDebounce } from 'use-debounce';
//components
import { Categories, Sort, PizzaCard, PizzaSekeleton, Pagination } from '../imports/components';
//constants
import { categories as categoriesList } from '../constants/constants';
//selectors-slice
import { selectData } from '../imports/selectorsSlice';
import {
  selectCategoriesIndex,
  selectCurrentPage,
  selectSearchValue,
  selectSortIndex,
  selectSortDirection,
} from '../features/slices/filterSlice/filterSelector';
// api-slice
import { fetchPizza } from '../features/thunks/FetchPizza/fetchPizza';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FilterSync from '../features/slices/filterSlice/FilterSyns';

const Home = React.memo(() => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useAppSelector(selectData);

  const categoriesIndex = useAppSelector(selectCategoriesIndex);
  const sortIndex = useAppSelector(selectSortIndex);
  const currentPage = useAppSelector(selectCurrentPage);
  const searchValue = useAppSelector(selectSearchValue);
  const direction = useAppSelector(selectSortDirection);

  const [debouncedSearch] = useDebounce(searchValue, 300);
  const searchQuery = React.useMemo(() => debouncedSearch.trim(), [debouncedSearch]);

  React.useEffect(() => {
    dispatch(
      fetchPizza({
        currentPage,
        sortBy: sortIndex,
        categoriesIndex: categoriesIndex !== 0 ? categoriesIndex : 0,
        searchQuery,
        direction,
      }),
    );
  }, [dispatch, currentPage, sortIndex, categoriesIndex, searchQuery, direction]);

  const pizzaList = React.useMemo(() => {
    if (isLoading) {
      return [...Array(8)].map((_, index) => <PizzaSekeleton key={index} />);
    }

    if (data.length > 0) {
      return data.map((item) => <PizzaCard imageUrl={''} key={item.id} {...item} />);
    }

    if (error === null && data) {
      return (
        <p style={{ padding: '20px', fontSize: '25px', textAlign: 'center' }}>В этой категории пока нет пицц 🤷‍♂️</p>
      );
    }

    return (
      <p style={{ padding: '20px', fontSize: '25px', textAlign: 'center' }}>
        Ошибка загрузки данных <br />
        {error}
      </p>
    );
  }, [data, isLoading, error]);

  return (
    <>
      <FilterSync />
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categoriesList[categoriesIndex]} пиццы</h2>
      <div className={`${data.length > 0 ? 'content__items' : ''}`}>{pizzaList}</div>
      <Pagination />
    </>
  );
});
export default Home;
