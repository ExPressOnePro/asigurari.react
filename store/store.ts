import {configureStore} from '@reduxjs/toolkit';
import insuranceFormReducer from './insuranceFormSlice';
import greenCardFormReducer from './greenCardFormSlice';
import rcaReducer from "./rcaSlice";
import medicalInsuranceReducer from './medicalInsuranceSlice';

export const store = configureStore({
    reducer: {
        insuranceForm: insuranceFormReducer,
        greenCardForm: greenCardFormReducer,
        rca: rcaReducer,
        medicalInsurance: medicalInsuranceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;