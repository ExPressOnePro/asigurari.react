import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import QRCodeSender from "@/app/[lang]/PaymentMethod/qr/QRCodeSender.tsx";

const QRStep = ({ onStepChange }: { onStepChange: (step: number) => void }) => {
    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const userData = useSelector((state: RootState) => state.insuranceForm.userData);
    const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);
    const additionalCarInfo = useSelector((state: RootState) => state.insuranceForm.additionalCarInfo);

    const buildPayload = () => ({
        extension: { amount: { sum: selectedInsurer?.PrimeSumMDL, currency: "MDL" } },
        data: {
            Company: { IDNO: selectedInsurer?.IDNO },
            InsuredPhysicalPerson: {
                IdentificationCode: userData?.IDNX,
                BirthDate: additionalData?.BirthDate,
                IsFromTransnistria: additionalData?.IsFromTransnistria,
                PersonIsExternal: additionalData?.PersonIsExternal,
            },
            InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal)
                ? {
                    ProductionYear: additionalCarInfo?.ProductionYear,
                    RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                    CilinderVolume: additionalCarInfo?.CilinderVolume,
                    TotalWeight: additionalCarInfo?.TotalWeight,
                    EnginePower: additionalCarInfo?.EnginePower,
                    Seats: additionalCarInfo?.Seats,
                }
                : {
                    RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                },
            StartDate: additionalData?.StartDate,
            PossessionBase: additionalData?.PossessionBase,
            DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
            OperatingMode: userData?.OperatingModes,
        }
    });

    return (
        <QRCodeSender
            onStepChange={onStepChange}
            stepToGo={5}
            payloadBuilder={buildPayload}
            dependencies={[selectedInsurer?.PrimeSumMDL]}
        />
    );
};
