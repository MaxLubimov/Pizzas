import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

export const initialState: CartSliceState = {
  items: getCartFromLS(),
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, obj) => {
        return obj.count + count;
      }, 0);
    },

    decItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        } else {
          findItem.count--;
        }
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, obj) => {
        return obj.count + count;
      }, 0);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.items.reduce((count, obj) => {
        return obj.count + count;
      }, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.persistedCartReducer;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.persistedCartReducer.items.find((obj) => obj.id === id);

export const { addItem, decItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
