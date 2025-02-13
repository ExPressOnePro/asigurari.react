import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserData {
    IDNX: string;
    VehicleRegistrationCertificateNumber: string;
    OperatingModes: string;
    PersonIsJuridical: boolean;
}

interface InsurerPrime {
    Name: string;
    IDNO: string;
    PrimeSum: string;
    PrimeSumMDL: string;
    is_active: boolean;
    logo: string;
}

interface ApiData {
    InsurerPrimeRCAI: InsurerPrime[];
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

interface Insurer {
    Name: string;
    IDNO: string;
    PrimeSum: string;
    PrimeSumMDL: string | number;
    is_active: boolean;
    logo?: string;
}


interface PossessionBase {
    value: string;
    label: string;
}

interface AdditionalData {
    IsFromTransnistria: boolean;
    PersonIsExternal: boolean;
    StartDate: string;
    BirthDate: string;
    PossessionBase: PossessionBase | null;
    DocumentPossessionBaseDate: string;
}

interface AdditionalCarInfo{
    ProductionYear: number;
    CilinderVolume: number;
    TotalWeight: number;
    EnginePower: number;
    Seats: number;
}

interface QrCodeData {
    uuid: string | null;
    qr_as_image: string | null;
    url: string | null;
    status: string | null;
}



interface InsuranceFormState {
    step: number,
    userData: UserData;
    apiData: ApiData;
    formSubmitted: boolean;
    success: boolean;
    error: string | null;
    selectedInsurer: Insurer | null;
    additionalData: AdditionalData;
    additionalCarInfo: AdditionalCarInfo;
    qrCodeData: QrCodeData | null;
    isApiRequested: boolean; // новое поле
}

const initialState: InsuranceFormState = {
    step: 1,
    isApiRequested: false,

    userData: {
        IDNX: "",
        VehicleRegistrationCertificateNumber: "",
        OperatingModes: "",
        PersonIsJuridical: false,
    },

    apiData: {
        InsurerPrimeRCAI: [],
        BonusMalusClass: 0,
        IsSuccess: false,
        ErrorMessage: "",
        Territory: "",
        PersonFirstName: "",
        PersonLastName: "",
        VehicleMark: "",
        VehicleModel: "",
        VehicleRegistrationNumber: "",
    },

    selectedInsurer: {
        Name: "",
        IDNO: "",
        PrimeSum: "",
        PrimeSumMDL: "",
        is_active: true,
        logo: ""
    },

    additionalData: {
        IsFromTransnistria: false,
        PersonIsExternal: false,
        StartDate: "",
        BirthDate: "",
        PossessionBase: null,
        DocumentPossessionBaseDate: "",
    },

    additionalCarInfo: {
        ProductionYear: 0,
        CilinderVolume: 0,
        TotalWeight: 0,
        EnginePower: 0,
        Seats: 0,
    },

    qrCodeData: {
        uuid: null,
        qr_as_image: null,
        url: null,
        status: null,
    },


    formSubmitted: false,
    success: false,
    error: null,
};

const insuranceFormSlice = createSlice({
    name: "insuranceForm",
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
        setSelectedInsurer: (state, action: PayloadAction<Insurer | null>) => {
            state.selectedInsurer = action.payload;
        },
        setAdditionalData: (state, action: PayloadAction<AdditionalData>) => {
            state.additionalData = action.payload;
        },
        setAdditionalCarInfo: (state, action: PayloadAction<AdditionalCarInfo>) => {
            state.additionalCarInfo = action.payload;
        },
        setQrCodeData: (state, action: PayloadAction<QrCodeData>) => {
            state.qrCodeData = action.payload;
        },
        setApiRequested: (state, action: PayloadAction<boolean>) => {
            state.isApiRequested = action.payload;
        },
        clearData: (state) => {
            state.isApiRequested = false;

            state.userData = {
                IDNX: "",
                VehicleRegistrationCertificateNumber: "",
                OperatingModes: "",
                PersonIsJuridical: false,
            };

            state.apiData = {
                InsurerPrimeRCAI: [],
                BonusMalusClass: 0,
                IsSuccess: false,
                ErrorMessage: "",
                Territory: "",
                PersonFirstName: "",
                PersonLastName: "",
                VehicleMark: "",
                VehicleModel: "",
                VehicleRegistrationNumber: "",
            };

            state.selectedInsurer = {
                Name: "",
                IDNO: "",
                PrimeSum: "",
                PrimeSumMDL: "",
                is_active: true,
                logo: "",
            };

            state.additionalData = {
                IsFromTransnistria: false,
                PersonIsExternal: false,
                StartDate: "",
                BirthDate: "",
                PossessionBase: null,
                DocumentPossessionBaseDate: "",
            };

            state.additionalCarInfo = {
                ProductionYear: 0,
                CilinderVolume: 0,
                TotalWeight: 0,
                EnginePower: 0,
                Seats: 0,
            };

            state.qrCodeData = {
                uuid: null,
                qr_as_image: null,
                url: null,
                status: null,
            };

            state.formSubmitted = false;
            state.success = false;
            state.error = null;
        }
    },
});

export const {
    setStep,
    setUserData,
    setApiData,
    setFormSubmitted,
    setSuccess,
    setError,
    setSelectedInsurer,
    setAdditionalData,
    setAdditionalCarInfo,
    setQrCodeData,
    setApiRequested,
    clearData,
} = insuranceFormSlice.actions;

export default insuranceFormSlice.reducer;
