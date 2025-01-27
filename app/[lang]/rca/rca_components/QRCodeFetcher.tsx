import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from "@/lib/axiosInstance.ts";
import QRCodeImage from "@/app/[lang]/rca/rca_components/QRCodeImage.tsx";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue.tsx";

interface QRCodeFetcherProps {
    VehicleRegistrationCertificateNumber: string,
    selectedInsurer: any;
    calculatedData: any;
    selectedAdditional: any;
    onSuccess: (data: any) => void;
    onError?: (error: any) => void;
}

const QRCodeFetcher: React.FC<QRCodeFetcherProps> = ({
                                                         selectedInsurer,
                                                         calculatedData,
                                                         VehicleRegistrationCertificateNumber,
                                                         selectedAdditional,
                                                         onSuccess,
                                                         onError,
                                                     }) => {
    const [isQrCodeLoading, setIsQrCodeLoading] = useState<boolean>(false);
    const [qrCodeError, setQrCodeError] = useState<string | null>(null);
    const [qrCodeData, setQrCodeData] = useState<any>(null);
    const hasFetchedQrCodeRef = useRef(false);

    const [statusCheckData, setStatusCheckData] = useState<string | null>(null);
    const [isStatusChecking, setIsStatusChecking] = useState<boolean>(true);
    const [statusCheckError, setStatusCheckError] = useState<string | null>(null);


    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [documentId, setDocumentId] = useState<number | null>(null);
    const fetchFile = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/api/rca/${id}/get-rca-file/`, {
                responseType: "blob", // Получаем файл
            });

            const file = response.data;
            const fileURL = URL.createObjectURL(file); // Создаем ссылку для скачивания
            setFileUrl(fileURL); // Сохраняем URL файла для скачивания
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
        }
    };
    const saveRCAData = async () => {
        try {
            const requestData = {
                Company: {
                    IDNO: selectedInsurer.IDNO,
                },
                InsuredPhysicalPerson: {
                    IdentificationCode: "2005021106830",
                    BirthDate: "2000-01-01",
                    IsFromTransnistria: false,
                    PersonIsExternal: false,
                },
                InsuredVehicle: {
                    ProductionYear: 2025,
                    RegistrationCertificateNumber: VehicleRegistrationCertificateNumber,
                    CilinderVolume: 2000,
                    TotalWeight: 2000,
                    EnginePower: 200,
                    Seats: 5,
                },
                StartDate: "2025-01-24",
                PossessionBase: "Property",
                DocumentPossessionBaseDate: "2000-01-01",
                OperatingMode: "Usual",
                qrCode: qrCodeData?.uuid,
            };
            console.log("requestData:", JSON.stringify(requestData, null, 2));
            const response = await axiosInstance.post('/rca/save-rca/', requestData);
            const result = response.data;
            if (result?.DocumentId) {
                setDocumentId(result.DocumentId); // Сохраняем DocumentId
                fetchFile(result.DocumentId); // Запрос на получение файла
            }
            console.log('Ответ от API:', response.data);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
        }
    };

    useEffect(() => {
        if (selectedInsurer && !hasFetchedQrCodeRef.current) {
            hasFetchedQrCodeRef.current = true;

            const fetchQrCode = async () => {
                setIsQrCodeLoading(true);
                try {
                    const response = await axiosInstance.post('/qr/', {
                        extension: {
                            amount: {
                                sum: selectedInsurer.PrimeSumMDL,
                                currency: "MDL",
                            },
                        },
                    });

                    if (response.data?.qr_as_image && response.data?.url) {
                        setQrCodeData(response.data);
                        onSuccess(response.data);
                    } else {
                        throw new Error('Некорректный ответ API');
                    }
                } catch (err) {
                    setQrCodeError('Не удалось загрузить QR-код.');
                    if (onError) onError(err);
                } finally {
                    setIsQrCodeLoading(false);
                }
            };

            fetchQrCode();
        }
    }, [selectedInsurer, onSuccess, onError]);

    useEffect(() => {
        const checkQrCodeStatus = async () => {
            try {
                if (!qrCodeData?.uuid) return;

                const response = await axiosInstance.get(`/qr/${qrCodeData.uuid}/status/`);
                const data = response.data;

                if (data?.status) {
                    setStatusCheckData(data.status);
                }

                if (data.status === 'Paid') {
                    setIsStatusChecking(false);
                    saveRCAData();
                }
                saveRCAData();

            } catch (error) {
                setStatusCheckError('Ошибка при проверке статуса. Попробуйте позже.');
                setIsStatusChecking(false);
            }
        };

        if (isStatusChecking && qrCodeData?.uuid) {
            const intervalId = setInterval(checkQrCodeStatus, 5000);
            return () => clearInterval(intervalId);
        }
    }, [qrCodeData, isStatusChecking]);


    return (
        <div className="flex flex-col items-center mt-4">
            {isQrCodeLoading ? (
                <SpinnerBlue />
            ) : qrCodeError ? (
                <p className="text-red-500">{qrCodeError}</p>
            ) : qrCodeData ? (
                <QRCodeImage qrImageData={qrCodeData.qr_as_image} url={qrCodeData.url} />
            ) : null}

            <div className="mt-4 w-full text-center">
                {isStatusChecking && <SpinnerBlue/>}
                <p>{statusCheckData}</p>
                {statusCheckData && (
                    <p
                        className={`mt-2 text-sm ${
                            statusCheckData === 'Active'
                                ? 'text-green-500'
                                : statusCheckData === 'failed'
                                    ? 'text-red-500'
                                    : 'text-gray-500'
                        }`}
                    >
                        {statusCheckData === 'Active'
                            ? 'Оплачено'
                            : statusCheckData === 'failed'
                                ? 'Ошибка'
                                : `Статус: ${statusCheckData}`}
                    </p>
                )}
                {statusCheckError && <p className="text-red-500">{statusCheckError}</p>}

                <div>
                    <h2>Финальный этап: Скачивание файла</h2>
                    <p>Ваш файл готов для скачивания.</p>
                    {fileUrl && (
                        <a href={fileUrl} download={`rca_file_${documentId}.pdf`}
                           className="bg-green-600 text-white px-4 py-2 rounded">
                            Скачать файл
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeFetcher;
