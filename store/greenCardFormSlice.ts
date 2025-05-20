import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GreenCardZones, TermInsurance} from "@/app/[lang]/greencard/Enums.tsx";

interface GreenCardUserData {
    IDNX: string;
    VehicleRegistrationCertificateNumber: string;
    GreenCardZone: GreenCardZones;
    GreenCardZoneLabel: any;
    TermInsurance: TermInsurance;
    TermInsuranceLabel: any;
}

interface InsurerPrime {
    Name: string;
    IDNO: string;
    PrimeSum: string;
    PrimeSumMDL: any;
    is_active: boolean;
    logo: string;
}

interface ApiData {
    InsurerPrimeRCAE: InsurerPrime[];
    IsSuccess: boolean;
    ErrorMessage: string | null;
    PersonFirstName: string;
    PersonLastName: string;
    VehicleMark: string;
    VehicleModel: string;
    VehicleRegistrationNumber: string;
    VehicleCategory: string;
    insuranceNumber: string;
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

interface GreenCardState {
    step: number,
    userData : GreenCardUserData;
    apiData: ApiData;
    formSubmitted: boolean;
    success: boolean;
    error: string | null;
    selectedInsurer: Insurer | null;
    additionalData: AdditionalData;
    additionalCarInfo: AdditionalCarInfo;
    qrCodeData: QrCodeData | null;
}

const initialState: GreenCardState = {
    step: 1,
    userData: {
        IDNX: "",
        VehicleRegistrationCertificateNumber: "",
        GreenCardZone: GreenCardZones.Z3,  // Значение по умолчанию из перечисления
        TermInsurance: TermInsurance.D15,
        GreenCardZoneLabel:"",
        TermInsuranceLabel:""
    },


    apiData: {
        InsurerPrimeRCAE: [],
        IsSuccess: false,
        ErrorMessage: "",
        PersonFirstName: "",
        PersonLastName: "",
        VehicleMark: "",
        VehicleModel: "",
        VehicleRegistrationNumber: "",
        VehicleCategory: "",
        insuranceNumber: "",
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

const greenCardFormSlice = createSlice({
    name: "greenCardForm",
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
        setUserData: (state, action: PayloadAction<GreenCardUserData>) => {
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
        setQrCodeData: (state, action: PayloadAction<QrCodeData | null>) => {
            state.qrCodeData = action.payload;
        },
    },
});

export const {
    setStep,
    setUserData,
    setApiData,
    setFormSubmitted,
    // setSuccess,
    // setError,
    setSelectedInsurer,
    setAdditionalData,
    setAdditionalCarInfo,
    setQrCodeData,
} = greenCardFormSlice.actions;

export default greenCardFormSlice.reducer;
