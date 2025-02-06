import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
    IDNX: string;
    VehicleRegistrationCertificateNumber: string;
    OperatingModes: string;
    PersonIsJuridical: boolean;
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

interface InsuranceFormState {
    userData: UserData;
    apiData: ApiData;
    formSubmitted: boolean;
    success: boolean;
    error: string | null;
    selectedInsurer: Insurer | null;
    additionalData: AdditionalData;
    additionalCarInfo: AdditionalCarInfo;
    qrCodeData: QrCodeData | null;
}

interface QrCodeData {
    uuid: string;
    qr_as_image: string;
    url: string;
    order_id: string; // Тип для order_id
    type: string; // Тип для type (например, "Dynamic")
    amount_type: string; // Тип для amount_type (например, "Fixed")
    pmt_context: string; // Тип для pmt_context (например, "m")
    status: string; // Тип для status (например, "Active")
    is_used: boolean; // Тип для is_used
    created_at: string; // Тип для created_at (ISO 8601)
    updated_at: string; // Тип для updated_at (ISO 8601)
    file: number; // Тип для file
}

const initialState: InsuranceFormState = {
    userData: {
        IDNX: "",
        VehicleRegistrationCertificateNumber: "",
        OperatingModes: "",
        PersonIsJuridical: false,
    },

    apiData: {
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

    qrCodeData: null as QrCodeData | null,


    formSubmitted: false,
    success: false,
    error: null,
};

const insuranceFormSlice = createSlice({
    name: "insuranceForm",
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
    setUserData,
    setApiData,
    setFormSubmitted,
    setSuccess,
    setError,
    setSelectedInsurer,
    setAdditionalData,
    setAdditionalCarInfo,
    setQrCodeData,
} = insuranceFormSlice.actions;

export default insuranceFormSlice.reducer;
