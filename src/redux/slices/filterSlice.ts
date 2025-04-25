import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortItem = { name: string; sortProperty: 'rating' | 'price' | 'title' };

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currnetPage: number;
  sortType: SortItem;
  sortOrder: string;
}

export const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currnetPage: 1,
  sortType: { name: 'популярности', sortProperty: 'rating' },
  sortOrder: 'desc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sortType = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.sortOrder = action.payload;
    },
    setCurrnetPage(state, action: PayloadAction<number>) {
      state.currnetPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currnetPage = Number(action.payload.currnetPage);
      state.sortType = action.payload.sortType;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setOrder, setCurrnetPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
