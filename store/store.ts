// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import insuranceFormReducer from './insuranceFormSlice';

export const store = configureStore({
    reducer: {
        insuranceForm: insuranceFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
