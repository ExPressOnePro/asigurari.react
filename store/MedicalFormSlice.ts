import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
    idnp: string;
    fullName: string;
    birthday: string;
}

interface DogMEDPH {
    valiuta_: string;
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

interface MedicalFormState {
    DogMEDPH: DogMEDPH[];
    IDNO: string;
    Name: string;
    PrimaTotalaLEI: number;
    PrimaTotalaVAL: number;
    ProductUIN: string;
    RegiuniUIN: string;
    SARS_COV19: boolean;
    ScopulCalatorieiUIN: string;
    SumaDeAsig: number;
    TaraUIN: string;
    TipSportUIN: string;
    data: string;
    endDate: string;
    startDate: string;
    valiuta_: string;
    is_active: boolean;
    logo: string;
    persons: Person[];
}

const initialState: MedicalFormState = {
    DogMEDPH: [],
    IDNO: '',
    Name: '',
    PrimaTotalaLEI: 0,
    PrimaTotalaVAL: 0,
    ProductUIN: '',
    RegiuniUIN: '',
    SARS_COV19: false,
    ScopulCalatorieiUIN: '',
    SumaDeAsig: 0,
    TaraUIN: '',
    TipSportUIN: '',
    data: '',
    endDate: '',
    startDate: '',
    valiuta_: '',
    is_active: false,
    logo: '',
    persons: [],
};

const medicalFormSlice = createSlice({
    name: 'medicalForm',
    initialState,
    reducers: {
        setMedicalForm(state, action: PayloadAction<{ DogMEDPH: DogMEDPH[] }>) {
            state.DogMEDPH = action.payload.DogMEDPH;
        },
        setInsurerInfo(state, action: PayloadAction<Partial<Omit<MedicalFormState, 'DogMEDPH'>>>) {
            Object.assign(state, action.payload);
        },
        resetMedicalForm(state) {
            state.DogMEDPH = [];
            state.IDNO = '';
            state.Name = '';
            state.PrimaTotalaLEI = 0;
            state.PrimaTotalaVAL = 0;
            state.ProductUIN = '';
            state.RegiuniUIN = '';
            state.SARS_COV19 = false;
            state.ScopulCalatorieiUIN = '';
            state.SumaDeAsig = 0;
            state.TaraUIN = '';
            state.TipSportUIN = '';
            state.data = '';
            state.endDate = '';
            state.startDate = '';
            state.valiuta_ = '';
            state.is_active = false;
            state.logo = '';
            state.persons = [];
        },
    },
});

export const { setMedicalForm, setInsurerInfo, resetMedicalForm } = medicalFormSlice.actions;
export default medicalFormSlice.reducer;
