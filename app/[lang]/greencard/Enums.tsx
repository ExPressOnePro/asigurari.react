// src/constants/GreenCardOptions.ts

export enum GreenCardZones {
    Z1 = "Z1", // Zona 1 - Ucraina și Belarus
    Z3 = "Z3", // Zona 3 - Toate țările sistemului carte verde
}

export enum TermInsurance {
    D15 = "d15", // 15 zile
    M1 = "m1",   // 1 lună
    M2 = "m2",   // 2 luni
    M3 = "m3",   // 3 luni
    M4 = "m4",   // 4 luni
    M5 = "m5",   // 5 luni
    M6 = "m6",   // 6 luni
    M7 = "m7",   // 7 luni
    M8 = "m8",   // 8 luni
    M9 = "m9",   // 9 luni
    M10 = "m10", // 10 luni
    M11 = "m11", // 11 luni
    M12 = "m12", // 12 luni
}

export const GreenCardZoneOptions = [
    {value: GreenCardZones.Z1, label: "Ucraina și Belarus"},
    {value: GreenCardZones.Z3, label: "Toate țările sistemului carte verde"},
];

export const TermInsuranceOptions = [
    {value: TermInsurance.D15, label: "15 zile"},
    {value: TermInsurance.M1, label: "1 lună"},
    {value: TermInsurance.M2, label: "2 luni"},
    {value: TermInsurance.M3, label: "3 luni"},
    {value: TermInsurance.M4, label: "4 luni"},
    {value: TermInsurance.M5, label: "5 luni"},
    {value: TermInsurance.M6, label: "6 luni"},
    {value: TermInsurance.M7, label: "7 luni"},
    {value: TermInsurance.M8, label: "8 luni"},
    {value: TermInsurance.M9, label: "9 luni"},
    {value: TermInsurance.M10, label: "10 luni"},
    {value: TermInsurance.M11, label: "11 luni"},
    {value: TermInsurance.M12, label: "12 luni"},
];
