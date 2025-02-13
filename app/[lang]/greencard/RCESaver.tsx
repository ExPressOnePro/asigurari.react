import React, {use, useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axiosInstance from "@/lib/axiosInstance";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue";
import {getStaticUrl} from "@/app/[lang]/components/Footer.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

const RCASaver: React.FC = () => {
    const { dictionary } = useLocalization();
    const userData = useSelector((state: RootState) => state.greenCardForm.userData);
    const additionalData = useSelector((state: RootState) => state.greenCardForm.additionalData);
    const selectedInsurer = useSelector((state: RootState) => state.greenCardForm.selectedInsurer);
    const qrCodeData = useSelector((state: RootState) => state.greenCardForm.qrCodeData);
    const apiData = useSelector((state: RootState) => state.greenCardForm.apiData);
    const additionalCarInfo = useSelector((state: RootState) => state.greenCardForm.additionalCarInfo);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [documentId, setDocumentId] = useState<number | null>(null);
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const isMounted = useRef(false); // Флаг для отслеживания монтирования компонента

    useEffect(() => {
        const saveRCAData = async () => {
            if (!isMounted.current || qrCodeData?.status !== "Paid") return;

            console.log("Отправка запроса с суммой:", selectedInsurer?.PrimeSumMDL);

            try {
                setIsLoading(true);
                const requestData = {
                    Company: { IDNO: selectedInsurer?.IDNO || "" },
                    InsuredPhysicalPerson: {
                        IdentificationCode: userData?.IDNX || "",
                        BirthDate: additionalData?.BirthDate || "",
                        IsFromTransnistria: additionalData?.IsFromTransnistria || false,
                        PersonIsExternal: additionalData?.PersonIsExternal || false,
                    },
                    InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal) ? {
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
                    TermInsurance: userData.TermInsurance,
                    GreenCardZone: userData.GreenCardZone,
                    PossessionBase: additionalData.PossessionBase?.value,
                    DocumentPossessionBaseDate: additionalData.DocumentPossessionBaseDate,
                    qrCode: qrCodeData?.uuid,
                    PolicyNumber: apiData.insuranceNumber,
                };

                console.log("requestData:", JSON.stringify(requestData, null, 2));

                const response = await axiosInstance.post("/rca/save-green-card/", requestData);
                const result = response.data;

                if (result?.DocumentId) {
                    setDocumentId(result.DocumentId);
                    setDocumentUrl(result.url);
                }

                console.log("Ответ от API:", response.data);
            } catch (error: any) {
                setError(error?.response?.data?.message || "Ошибка при сохранении данных.");
                console.error("Ошибка при сохранении данных:", error);
            } finally {
                setIsLoading(false);
            }
        };

        saveRCAData();

        return () => {
            console.log("Компонент размонтирован");
            isMounted.current = true; // Устанавливаем флаг в true, чтобы запрос не отправился снова
        };
    }, [qrCodeData?.status, selectedInsurer?.PrimeSumMDL]);

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
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {isLoading && <SpinnerBlue/>}

                {documentUrl && (
                    <div
                        className="flex flex-col items-center mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Документ готов!</h3>
                        <p className="text-gray-600 text-sm text-center mt-1">
                            Вы можете открыть документ для просмотра или скачать его в формате PDF.
                        </p>

                        <img
                            src={dictionary.SaveRCA.doc}
                            alt="Превью документа"
                            className="mt-4 w-40 h-auto"
                        />

                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                            >
                                Открыть документ
                            </a>
                            <a
                                href={documentUrl}
                                download="rca_document.pdf"
                                className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
                            >
                                ⬇️ Скачать PDF
                            </a>
                        </div>
                    </div>
                )}

                {error && (
                    <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg w-full text-center mt-4">
                        {error}
                    </p>
                )}
            </div>
        </div>


    );
};

export default RCASaver;
