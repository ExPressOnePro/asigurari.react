import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axiosInstance from "@/lib/axiosInstance";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue";

const RCASaver: React.FC = () => {
    const userData = useSelector((state: RootState) => state.insuranceForm.userData);
    const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);
    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const qrCodeData = useSelector((state: RootState) => state.insuranceForm.qrCodeData);
    const additionalCarInfo = useSelector((state: RootState) => state.insuranceForm.additionalCarInfo);


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [documentId, setDocumentId] = useState<number | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const saveRCAData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const requestData = {
                Company: { IDNO: selectedInsurer?.IDNO },
                InsuredPhysicalPerson: {
                    IdentificationCode: userData?.IDNX,
                    BirthDate: additionalData?.BirthDate,
                    IsFromTransnistria: additionalData?.IsFromTransnistria,
                    PersonIsExternal: additionalData?.PersonIsExternal,
                },
                InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal === true) ? {
                    ProductionYear: additionalCarInfo?.ProductionYear,
                    RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                    CilinderVolume: additionalCarInfo?.CilinderVolume,
                    TotalWeight: additionalCarInfo?.TotalWeight,
                    EnginePower: additionalCarInfo?.EnginePower,
                    Seats: additionalCarInfo?.Seats,
                } : {
                    RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                },
                StartDate: additionalData?.StartDate,
                PossessionBase: additionalData?.PossessionBase,
                DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
                OperatingMode: userData?.OperatingModes,
                qrCode: qrCodeData?.uuid,

                data: {
                    Company: { IDNO: selectedInsurer?.IDNO },
                    InsuredPhysicalPerson: {
                        IdentificationCode: userData?.IDNX,
                        BirthDate: additionalData?.BirthDate,
                        IsFromTransnistria: additionalData?.IsFromTransnistria,
                        PersonIsExternal: additionalData?.PersonIsExternal,
                    },
                    InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal === true) ? {
                        ProductionYear: additionalCarInfo?.ProductionYear,
                        RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                        CilinderVolume: additionalCarInfo?.CilinderVolume,
                        TotalWeight: additionalCarInfo?.TotalWeight,
                        EnginePower: additionalCarInfo?.EnginePower,
                        Seats: additionalCarInfo?.Seats,
                    } : {
                        RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                    },
                    StartDate: additionalData?.StartDate,
                    PossessionBase: additionalData?.PossessionBase,
                    DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
                    OperatingMode: userData?.OperatingModes,
                    qrCode: qrCodeData?.uuid,
                }
            };

            console.log("requestData:", JSON.stringify(requestData, null, 2));
            const response = await axiosInstance.post("/rca/save-rca/", requestData);
            const result = response.data;
            if (result?.DocumentId) {
                setDocumentId(result.DocumentId);
                fetchFile(result.DocumentId);
            }
            console.log("Ответ от API:", response.data);
        } catch (error) {
            setError("Ошибка при сохранении данных.");
            console.error("Ошибка при сохранении данных:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFile = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/api/rca/${id}/get-rca-file/`, {
                responseType: "blob",
            });
            const file = response.data;
            const fileURL = URL.createObjectURL(file);
            setFileUrl(fileURL);
        } catch (error) {
            setError("Ошибка при загрузке файла.");
            console.error("Ошибка при загрузке файла:", error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <button onClick={saveRCAData} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Сохранить RCA</button>
            {isLoading && <SpinnerBlue />}
            {error && <p className="text-red-500">{error}</p>}
            {documentId && <p className="text-green-500">Документ создан, ID: {documentId}</p>}
            {fileUrl && (
                <a href={fileUrl} download="rca_document.pdf" className="text-blue-500 underline mt-2">
                    Скачать документ
                </a>
            )}
        </div>
    );
};

export default RCASaver;
