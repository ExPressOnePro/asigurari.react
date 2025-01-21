export interface Insurer {
    Name: string;
    IDNO: string;
    PrimeSum: string;
    PrimeSumMDL: string;
    is_active: boolean;
    logo: string;
}

export interface InsurersPrime {
    InsurerPrimeRCAE: Insurer[];
}

export interface GreenCardCalculationResponse {
    InsurersPrime: InsurersPrime;
    IsSuccess: boolean;
    ErrorMessage: string | null;
    PersonFirstName: string;
    PersonLastName: string;
    VehicleMark: string;
    VehicleModel: string;
    VehicleRegistrationNumber: string;
    VehicleCategory: string;
}
