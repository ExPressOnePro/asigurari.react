// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import insuranceFormReducer from './insuranceFormSlice';
import greenCardFormReducer from './greenCardFormSlice.ts'
import rcaReducer from "./rcaSlice";
import medicalFormReducer from './MedicalFormSlice';

export const store = configureStore({
    reducer: {
        insuranceForm: insuranceFormReducer,
        greenCardForm: greenCardFormReducer,
        rca: rcaReducer,
        medicalForm: medicalFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
