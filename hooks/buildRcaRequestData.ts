export function buildRcaRequestData(
    selectedInsurer: any,
    userData: any,
    additionalData: any,
    additionalCarInfo: any
) {
    const isExternal = additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal;

    return {
        extension: {
            amount: {
                sum: selectedInsurer?.PrimeSumMDL || selectedInsurer?.PrimaTotalaLEI,
                currency: selectedInsurer?.PrimeSumMDL ? "MDL" : "LEI"
            }
        },
        data: {
            IDNO: selectedInsurer?.IDNO,

            IdentificationCode: userData?.IDNX,
            BirthDate: additionalData?.BirthDate,
            IsFromTransnistria: additionalData?.IsFromTransnistria,
            PersonIsExternal: additionalData?.PersonIsExternal,

            RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
            ...(isExternal && {
                ProductionYear: additionalCarInfo?.ProductionYear,
                CilinderVolume: additionalCarInfo?.CilinderVolume,
                TotalWeight: additionalCarInfo?.TotalWeight,
                EnginePower: additionalCarInfo?.EnginePower,
                Seats: additionalCarInfo?.Seats,
            }),

            StartDate: additionalData?.StartDate,
            PossessionBase: additionalData?.PossessionBase,
            DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
            OperatingMode: userData?.OperatingModes,
        }
    };
}
