import { RootState } from '../../../app/store';

// export const selectCart = (state: RootState) => state.cart;
// cartSelector.ts
import { createSelector } from 'reselect';

const selectCartState = (state: RootState) => state.cart;

export const selectCart = createSelector([selectCartState], (cart) => ({
  items: cart.items, // Добавлено
  lengthItem: cart.items.reduce((sum, item) => sum + item.count, 0), // Исправлено (было .length)
  totalPrice: cart.items.reduce((sum, item) => sum + item.price * item.count, 0),
}));
