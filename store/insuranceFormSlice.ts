// insuranceFormSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
    IDNX: string;
    VehicleRegistrationCertificateNumber: string;
}

interface ApiData {
    BonusMalusClass: number;
    IsSuccess: boolean;
    ErrorMessage: string;
    Territory: string;
    PersonFirstName: string;
    PersonLastName: string;
    VehicleMark: string;
    VehicleModel: string;
    VehicleRegistrationNumber: string;
}

interface InsuranceFormState {
    userData: UserData;
    apiData: ApiData;
    formSubmitted: boolean;
    success: boolean;
    error: string | null;
}

const initialState: InsuranceFormState = {
    userData: {
        IDNX: '',
        VehicleRegistrationCertificateNumber: '',
    },
    apiData: {
        BonusMalusClass: 0,
        IsSuccess: false,
        ErrorMessage: '',
        Territory: '',
        PersonFirstName: '',
        PersonLastName: '',
        VehicleMark: '',
        VehicleModel: '',
        VehicleRegistrationNumber: '',
    },
    formSubmitted: false,
    success: false,
    error: null,
};

const insuranceFormSlice = createSlice({
    name: 'insuranceForm',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
        },
        setApiData: (state, action: PayloadAction<ApiData>) => {
            state.apiData = action.payload;
        },
        setFormSubmitted: (state, action: PayloadAction<boolean>) => {
            state.formSubmitted = action.payload;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setUserData, setApiData, setFormSubmitted, setSuccess, setError } = insuranceFormSlice.actions;
export default insuranceFormSlice.reducer;
