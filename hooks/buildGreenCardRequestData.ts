export function buildGreenCardRequestData(
    selectedInsurer: any,
    userData: any,
    additionalData: any,
    additionalCarInfo: any
) {
    const isExternal = additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal;

    return {
        extension: {
            amount: {
                sum: selectedInsurer?.PrimeSumMDL || selectedInsurer?.PrimeSumEUR || selectedInsurer?.PrimeSumUSD,
                currency: selectedInsurer?.PrimeSumMDL ? "MDL" :
                    selectedInsurer?.PrimeSumEUR ? "EUR" :
                        selectedInsurer?.PrimeSumUSD ? "USD" : "UNKNOWN"
            }
        },
        data: {
            Insurer: {
                IDNO: selectedInsurer?.IDNO,
                Name: selectedInsurer?.Name,
                Address: selectedInsurer?.Address,
            },

            InsuredPerson: {
                IdentificationCode: userData?.IDNX,
                BirthDate: additionalData?.BirthDate,
                IsFromTransnistria: additionalData?.IsFromTransnistria,
                PersonIsExternal: additionalData?.PersonIsExternal,
                PassportNumber: additionalData?.PassportNumber,
            },

            Vehicle: {
                RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                ...(isExternal && {
                    ProductionYear: additionalCarInfo?.ProductionYear,
                    CilinderVolume: additionalCarInfo?.CilinderVolume,
                    TotalWeight: additionalCarInfo?.TotalWeight,
                    EnginePower: additionalCarInfo?.EnginePower,
                    Seats: additionalCarInfo?.Seats,
                }),
            },

            CoverageCountries: additionalData?.CoverageCountries, // массив стран покрытия
            StartDate: additionalData?.StartDate,
            EndDate: additionalData?.EndDate,
            PossessionBase: additionalData?.PossessionBase,
            DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
            OperatingMode: userData?.OperatingModes,
        }
    };
}
