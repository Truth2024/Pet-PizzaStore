import { configureStore } from '@reduxjs/toolkit';
//reducers
import filterReducer from '../features/slices/filterSlice/filterSlice';
// import dataReducer from '../features/thunks/FetchPizza/fetchPizza';
import pizzaReducer from '../features/thunks/FetchPizza/fetchPizza';
import cartReducer from '../features/slices/cartSlice/cartSlice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
