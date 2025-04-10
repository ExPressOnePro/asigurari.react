import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axiosInstance";

export interface Person {
    idnp: string;
    fullName: string;
    birthday: string;
}

export interface MedicalInsuranceData {
    data: string;
    startDate: string;
    endDate: string;
    ProductUIN: string;
    RegiuniUIN: string;
    ScopulCalatorieiUIN: string;
    TaraUIN: string;
    TipSportUIN: string;
    SARS_COV19: boolean;
    SumaDeAsig: number;
    persons: Person[];
}

export interface MedicalInsuranceCompany {
    IDNO: string;
    Name: string;
    is_active: boolean;
    logo: string;
    PrimaTotalaVAL: number;
    PrimaTotalaLEI: number;
}

interface ApiResponse {
    DogMEDPH: {
        UIN_Dokumenta: string;
        persons: Person[];
    }[];
}

export interface MedicalInsuranceState {
    step: number;
    formData: MedicalInsuranceData;
    constants: {
        medicina_producti: any[];
        medicina_tseli_poezdki: any[];
        medicina_regioni: any[];
        spravociniki_strani: any[];
        medicina_sport: any[];
        medicina_straniUF: any[];
    };
    calculationResult: MedicalInsuranceCompany | null;
    qrCodeData: {
        uuid: string | null;
        qr_as_image: string | null;
        url: string | null;
        status: string | null;
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: MedicalInsuranceState = {
    step: 1,
    formData: {
        data: new Date().toISOString().split('T')[0],
        startDate: "",
        endDate: "",
        ProductUIN: "",
        RegiuniUIN: "",
        ScopulCalatorieiUIN: "",
        TaraUIN: "",
        TipSportUIN: "",
        SARS_COV19: true,
        SumaDeAsig: 30000,
        persons: []
    },
    constants: {
        medicina_producti: [],
        medicina_tseli_poezdki: [],
        medicina_regioni: [],
        spravociniki_strani: [],
        medicina_sport: [],
        medicina_straniUF: []
    },
    calculationResult: null,
    qrCodeData: {
        uuid: null,
        qr_as_image: null,
        url: null,
        status: null
    },
    isLoading: false,
    error: null
};

// Create async thunk for fetching medical insurance constants
export const fetchMedicalInsuranceConstants = createAsyncThunk(
    'medicalInsurance/fetchConstants',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/medical-insurance/medical-insurance-constants/');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch constants');
        }
    }
);

const medicalInsuranceSlice = createSlice({
    name: "medicalInsurance",
    initialState,
    reducers: {
        setStep: (state: MedicalInsuranceState, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setFormData: (state: MedicalInsuranceState, action: PayloadAction<Partial<MedicalInsuranceData>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        setConstants: (state: MedicalInsuranceState, action: PayloadAction<typeof initialState.constants>) => {
            state.constants = action.payload;
        },
        setCalculationResult: (state: MedicalInsuranceState, action: PayloadAction<MedicalInsuranceCompany>) => {
            state.calculationResult = action.payload;
        },
        setQrCodeData: (state: MedicalInsuranceState, action: PayloadAction<typeof initialState.qrCodeData>) => {
            state.qrCodeData = action.payload;
        },
        setLoading: (state: MedicalInsuranceState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state: MedicalInsuranceState, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addPerson: (state: MedicalInsuranceState, action: PayloadAction<Person>) => {
            state.formData.persons.push(action.payload);
        },
        removePerson: (state: MedicalInsuranceState, action: PayloadAction<string>) => {
            state.formData.persons = state.formData.persons.filter(
                (person: Person) => person.idnp !== action.payload
            );
        },
        clearForm: (state: MedicalInsuranceState) => {
            state.formData = initialState.formData;
            state.calculationResult = null;
            state.qrCodeData = initialState.qrCodeData;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicalInsuranceConstants.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMedicalInsuranceConstants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.constants = action.payload;
            })
            .addCase(fetchMedicalInsuranceConstants.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    setStep,
    setFormData,
    setConstants,
    setCalculationResult,
    setQrCodeData,
    setLoading,
    setError,
    addPerson,
    removePerson,
    clearForm
} = medicalInsuranceSlice.actions;

export default medicalInsuranceSlice.reducer;
