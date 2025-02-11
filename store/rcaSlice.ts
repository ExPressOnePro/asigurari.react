// src/store/rcaSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RCAState {
    step: number;
}

const initialState: RCAState = {
    step: 1,  // Начальный шаг
};

const rcaSlice = createSlice({
    name: "rca",
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        incrementStep: (state) => {
            state.step += 1;
        },
        decrementStep: (state) => {
            state.step -= 1;
        },
    },
});

export const { setStep, incrementStep, decrementStep } = rcaSlice.actions;

export default rcaSlice.reducer;
