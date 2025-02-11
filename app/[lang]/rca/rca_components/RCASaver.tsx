import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
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
    const [documentUrl, setDocumentUrl] = useState<number | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const saveRCAData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const requestData = {
                Company: {
                    IDNO: selectedInsurer?.IDNO || "",
                },
                InsuredPhysicalPerson: {
                    IdentificationCode: userData?.IDNX || "",
                    BirthDate: additionalData?.BirthDate || "",
                    IsFromTransnistria: additionalData?.IsFromTransnistria || false,
                    PersonIsExternal: additionalData?.PersonIsExternal || false,
                },
                InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal === true) ? {
                    ProductionYear: additionalCarInfo?.ProductionYear || "",
                    RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber || "",
                    CilinderVolume: additionalCarInfo?.CilinderVolume || "",
                    TotalWeight: additionalCarInfo?.TotalWeight || "",
                    EnginePower: additionalCarInfo?.EnginePower || "",
                    Seats: additionalCarInfo?.Seats || "",
                } : {
                    RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber || "",
                },
                StartDate: additionalData.StartDate,
                PossessionBase: additionalData.PossessionBase?.value,
                DocumentPossessionBaseDate: additionalData.DocumentPossessionBaseDate,
                OperatingModes: userData.OperatingModes,
                qrCode: qrCodeData?.uuid,
            };

            console.log("requestData:", JSON.stringify(requestData, null, 2));

            // Убедитесь, что API URL правильный
            const response = await axiosInstance.post("/rca/save-rca/", requestData);
            const result = response.data;
            if (result?.DocumentId) {
                setDocumentId(result.DocumentId);
                setDocumentUrl(result.url);
                fetchFile(result.DocumentId);
            }
            console.log("Ответ от API:", response.data);
        } catch (error: any) {
            setError(error?.response?.data?.message || "Ошибка при сохранении данных.");
            console.error("Ошибка при сохранении данных:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFile = async (documentId: number) => {
        try {
            const response = await axiosInstance.get(`/rca/${documentId}/get-rca-file/`, {
                params: {
                    DocumentType: "Contract",
                    ContractType: "RCAI"
                },
                responseType: "blob"
            });

            const file = response.data;
            const fileURL = URL.createObjectURL(file);
            setFileUrl(fileURL);
        } catch (error: any) {
            setError(error?.response?.data?.message || "Ошибка при загрузке файла.");
            console.error("Ошибка при загрузке файла:", error);
        }
    };

    return (
        <div
            className="flex flex-col items-center mt-6 p-6 bg-white shadow-lg rounded-2xl w-full max-w-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Создание RCA</h2>

            <button
                onClick={saveRCAData}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300 shadow-md w-full"
            >
                Сохранить RCA
            </button>

            {isLoading && <SpinnerBlue/>}

            {documentId && (
                <p className="text-green-600 font-medium mt-4 bg-green-100 px-4 py-2 rounded-lg w-full text-center">
                    Документ создан, ID: {documentId}
                </p>
            )}

            {documentUrl && (
                <a
                    href={documentUrl ? String(documentUrl) : "#"}
                    download="rca_document.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline mt-4 font-medium transition duration-200"
                >
                    Скачать документ
                </a>
            )}

            {error && (
                <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg w-full text-center mt-4">
                    {error}
                </p>
            )}
        </div>

    );
};

export default RCASaver;
