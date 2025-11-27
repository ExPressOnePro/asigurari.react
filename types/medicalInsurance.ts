export type InsuranceProduct = {
    Name: string;
    logo?: string;
    is_active: boolean;
    PrimaTotalaLEI: number;
    SumaDeAsig: number;
    SARS_COV19: boolean;
};

export interface Option {
    codUIN: string;
    cod: string;
    naimenovanie: string;
}

export interface Constants {
    medicina_producti: Option[];
    ScopulCalatorieiMedPH: Option[];
    Regiuni: Option[];
    Tara: Option[];
    TipSport: Option[];
}