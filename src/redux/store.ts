import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

const persistCartConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistCartConfig, cart);

export const store = configureStore({
  reducer: { filter, persistedCartReducer, pizza },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Типизация глобального стейта
export type RootState = ReturnType<typeof store.getState>;

// Типизация экшенов
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
