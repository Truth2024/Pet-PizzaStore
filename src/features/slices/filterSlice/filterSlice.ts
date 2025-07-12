import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PizzaState {
  categoriesIndex: number;
  sortIndex: number;
  currentPage: number;
  searchValue: string;
  sortDirection: boolean;
}
interface ChangeInitialPayload {
  page: number;
  categories: number;
  sortBy: number;
  searchValue: string;
  direction: boolean;
}

const initialState: PizzaState = {
  categoriesIndex: 0,
  sortIndex: 0,
  currentPage: 1,
  searchValue: '',
  sortDirection: true,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<number>) => {
      state.categoriesIndex = action.payload;
    },
    setSort: (state, action: PayloadAction<number>) => {
      state.sortIndex = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setDirection: (state) => {
      state.sortDirection = !state.sortDirection;
    },
    changeInitial: (state, action: PayloadAction<ChangeInitialPayload>) => {
      state.currentPage = action.payload.page;
      state.categoriesIndex = action.payload.categories;
      state.sortIndex = action.payload.sortBy;
      state.searchValue = action.payload.searchValue;
      state.sortDirection = action.payload.direction;
    },
    reset: () => initialState,
  },
});

export const { setCategories, setSort, setCurrentPage, setSearchValue, setDirection, changeInitial, reset } =
  filterSlice.actions;

export default filterSlice.reducer;
