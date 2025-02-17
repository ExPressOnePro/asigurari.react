export enum GreenCardZones {
    Z1 = "Z1", // Zona 1 - Ucraina și Belarus
    Z3 = "Z3", // Zona 3 - Toate țările sistemului carte verde (EUROPA)
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

// GreenCard zones options for select
export const GreenCardZoneOptions = (dictionary: any) => [
    { value: GreenCardZones.Z1, label: dictionary?.GreenCard?.zones?.z1 ?? "Украина" },
    { value: GreenCardZones.Z3, label: dictionary?.GreenCard?.zones?.z3 ?? "Все страны зеленой карты" },
];


 // GreenCard period options for select
export const TermInsuranceOptions = (dictionary: any) => [
    { value: TermInsurance.D15, label: dictionary?.GreenCard?.TermInsurance?.D15 ?? "15 дней" },
    { value: TermInsurance.M1, label: dictionary?.GreenCard?.TermInsurance?.M1 ?? "1 месяц" },
    { value: TermInsurance.M2, label: dictionary?.GreenCard?.TermInsurance?.M2 ?? "2 месяца" },
    { value: TermInsurance.M3, label: dictionary?.GreenCard?.TermInsurance?.M3 ?? "3 месяца" },
    { value: TermInsurance.M4, label: dictionary?.GreenCard?.TermInsurance?.M4 ?? "4 месяца" },
    { value: TermInsurance.M5, label: dictionary?.GreenCard?.TermInsurance?.M5 ?? "5 месяцев" },
    { value: TermInsurance.M6, label: dictionary?.GreenCard?.TermInsurance?.M6 ?? "6 месяцев" },
    { value: TermInsurance.M7, label: dictionary?.GreenCard?.TermInsurance?.M7 ?? "7 месяцев" },
    { value: TermInsurance.M8, label: dictionary?.GreenCard?.TermInsurance?.M8 ?? "8 месяцев" },
    { value: TermInsurance.M9, label: dictionary?.GreenCard?.TermInsurance?.M9 ?? "9 месяцев" },
    { value: TermInsurance.M10, label: dictionary?.GreenCard?.TermInsurance?.M10 ?? "10 месяцев" },
    { value: TermInsurance.M11, label: dictionary?.GreenCard?.TermInsurance?.M11 ?? "11 месяцев" },
    { value: TermInsurance.M12, label: dictionary?.GreenCard?.TermInsurance?.M12 ?? "12 месяцев" },
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

