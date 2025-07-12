import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  type: number;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
  category: number;
  name: string;
}

interface State {
  items: CartItem[];
  totalPrice: number;
  lengthItem: number;
}
//  Чтение из localStorage
const loadFromLocalStorage = (): State => {
  try {
    const data = localStorage.getItem('cart');
    if (data) {
      const parsed = JSON.parse(data);
      return {
        items: parsed.items || [],
        totalPrice: parsed.totalPrice || 0,
        lengthItem: parsed.lengthItem || 0,
      };
    }
  } catch (e) {
    console.error('Ошибка чтения корзины из localStorage:', e);
  }

  return {
    items: [],
    totalPrice: 0,
    lengthItem: 0,
  };
};

const initialState: State = loadFromLocalStorage();

const recalculateTotals = (state: State) => {
  state.lengthItem = state.items.reduce((sum, item) => sum + item.count, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'count'>>) => {
      const { id, type, size } = action.payload;
      const hasItem = state.items.find((item) => item.id === id && item.type === type && item.size === size);

      if (hasItem) {
        hasItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      recalculateTotals(state);
    },

    destroyItem: (state, action: PayloadAction<{ id: number; type: number; size: number }>) => {
      const { id, type, size } = action.payload;
      state.items = state.items.filter((item) => !(item.id === id && item.type === type && item.size === size));

      recalculateTotals(state);
    },

    removeItem: (state, action: PayloadAction<{ id: number; type: number; size: number; count: number }>) => {
      const { id, type, size } = action.payload;
      const hasItem = state.items.find((item) => item.id === id && item.type === type && item.size === size);

      if (hasItem) {
        if (hasItem.count === 1) {
          state.items = state.items.filter((item) => !(item.id === id && item.type === type && item.size === size));
        } else {
          hasItem.count -= 1;
        }
      }

      recalculateTotals(state);
    },

    resetCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { addItem, removeItem, resetCart, destroyItem } = cartSlice.actions;

export default cartSlice.reducer;
