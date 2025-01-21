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
    {value: GreenCardZones.Z1, label: "Украина"},
    {value: GreenCardZones.Z3, label: "Все страны зеленой карты"},
];

export const TermInsuranceOptions = [
    {value: TermInsurance.D15, label: "15 дней"},
    {value: TermInsurance.M1, label: "1 месяц"},
    {value: TermInsurance.M2, label: "2 месяца"},
    {value: TermInsurance.M3, label: "3 месяца"},
    {value: TermInsurance.M4, label: "4 месяца"},
    {value: TermInsurance.M5, label: "5 месяцев"},
    {value: TermInsurance.M6, label: "6 месяцев"},
    {value: TermInsurance.M7, label: "7 месяцев"},
    {value: TermInsurance.M8, label: "8 месяцев"},
    {value: TermInsurance.M9, label: "9 месяцев"},
    {value: TermInsurance.M10, label: "10 месяцев"},
    {value: TermInsurance.M11, label: "11 месяцев"},
    {value: TermInsurance.M12, label: "12 месяцев"},
];


export enum Possession {
    Property = "Property",
    Lease = "Lease",
    Leasing = "Leasing",
    PowerOfAttorney = "PowerOfAttorney",
}


export const PossessionOptions = [
    {value: Possession.Property, label: "Собственность"},
    {value: Possession.Lease, label: "Аренда"},
    {value: Possession.Leasing, label: "Лизинг"},
    {value: Possession.PowerOfAttorney, label: "Доверенность"},
];

