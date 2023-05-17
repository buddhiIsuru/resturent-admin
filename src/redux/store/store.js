import { configureStore } from '@reduxjs/toolkit';
import { categoryState } from './../state/categoryState';
import { outletState } from './../state/outletState';

export const store = configureStore({
  reducer: {
    category:categoryState,
    outlet:outletState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
