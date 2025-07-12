// import { RootState } from '../../../app/store';

// export const selectFilters = (state: RootState) => state.filters;
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

const selectFilterState = (state: RootState) => state.filters;

export const selectFilters = createSelector([selectFilterState], (filters) => filters);

// Отдельные селекторы для каждого значения
export const selectCategoriesIndex = createSelector([selectFilterState], (filters) => filters.categoriesIndex);

export const selectSortIndex = createSelector([selectFilterState], (filters) => filters.sortIndex);

export const selectSearchValue = createSelector([selectFilterState], (filters) => filters.searchValue);

export const selectCurrentPage = createSelector([selectFilterState], (filters) => filters.currentPage);
export const selectSortDirection = createSelector([selectFilterState], (filters) => filters.sortDirection);

export const selectFilterParams = createSelector(
  [selectCategoriesIndex, selectSortIndex, selectCurrentPage, selectSearchValue],
  (categoriesIndex, sortIndex, currentPage, searchValue) => ({
    categoriesIndex,
    sortIndex,
    currentPage,
    searchValue,
  }),
);
