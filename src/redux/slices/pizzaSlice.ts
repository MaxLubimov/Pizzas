import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currnetPage, category, search, sort, sortOrder } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://6782b104c51d092c3dd078d9.mockapi.io/items?page=${currnetPage}&limit=4&category=${category}&sortBy=${sort}&order=${sortOrder}&search=${search}`,
    );
    return data;
  },
);

export enum Status {
  LOADING = 'loading',
  SECCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SECCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
