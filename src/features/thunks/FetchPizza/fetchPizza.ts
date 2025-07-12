import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { selects } from '../../../constants/constants';

interface FetchProps {
  currentPage: number;
  sortBy: number;
  categoriesIndex?: number;
  searchQuery: string;
  direction: boolean;
}

interface PizzaItem {
  id: number;
  name: string;
  price: number;
  types: number[];
  sizes: number[];
}

interface PizzaResponse {
  items: PizzaItem[];
  meta: any;
}

interface PizzaState {
  data: PizzaItem[];
  meta: any;
  isLoading: boolean;
  error: string | null;
}

export const fetchPizza = createAsyncThunk<PizzaResponse, FetchProps>(
  'data/fetchPizza',
  async ({ currentPage, sortBy, categoriesIndex, searchQuery, direction }: FetchProps) => {
    const params = new URLSearchParams();
    const sortByLabels = !direction ? `${'-' + selects[sortBy].value}` : selects[sortBy].value;

    params.set('page', currentPage.toString());
    params.set('limit', '4');
    params.set('sortBy', sortByLabels);

    if (typeof categoriesIndex === 'number' && categoriesIndex !== 0) {
      params.set('category', categoriesIndex.toString());
    }

    if (searchQuery) {
      params.set('name', `*${searchQuery}*`);
    }

    const response = await fetch(`https://edb2bd0f9919038d.mokky.dev/pizza/?${params.toString()}`);

    return (await response.json()) as PizzaResponse;
  },
);

const resetDataState = (state: PizzaState) => {
  state.data = [];
  state.meta = {};
};

const initialState: PizzaState = {
  data: [],
  meta: {},
  isLoading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        resetDataState(state);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<PizzaResponse>) => {
        state.isLoading = false;
        state.data = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.isLoading = false;
        resetDataState(state);
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default pizzaSlice.reducer;
