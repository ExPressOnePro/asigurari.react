"use client";

import {Locale} from "@/i18n.config";
import React, {useEffect, useState} from "react";
import axiosInstance from "@/lib/axiosInstance";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm";
import InfoRCA from "@/app/[lang]/rca/InfoRCA";
import FAQAccordion from "@/app/[lang]/rca/FAQAccordion";
import InsurerList from "@/app/[lang]/rca/InsurerList";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm";
import SelectedParameters from "@/app/[lang]/rca/SelectedParameters.tsx";


export default function Page({params}: { params: { lang: Locale } }) {
    // const [dictionary, setDictionary] = useState<any>(null);
    //
    // // Использование React.use() для работы с params
    // const lang = React.use(params.lang);
    //
    // useEffect(() => {
    //     const loadDictionary = async () => {
    //         if (lang) {
    //             const dict = await getDictionary(lang);
    //             setDictionary(dict);
    //         }
    //     };
    //     loadDictionary();
    // }, [lang]);


    const [IDNX, setIDNX] = useState<string>("2005021106830");
    const [VehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("218000136");
    const [OperatingModes, setOperatingModes] = useState<string>("1");
    const [PersonIsJuridical, setPersonIsJuridical] = useState<boolean>(false);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [insurers, setInsurers] = useState<any[]>([]);
    const [calculatedData, setCalculatedData] = useState<{
        vehicleMark: string;
        vehicleModel: string;
        vehicleRegistrationNumber: string;
        bonusMalusClass: number;
        personFirstName: string;
        personLastName: string;
        possessionBase?: string;
        insuranceStartDate?: string;
    } | null>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [selectedInsurer, setSelectedInsurer] = useState<any | null>(null);
    const [selectedAdditional, setSelectedAdditional] = useState<{
        possessionBase: { value: string; label: string } | null;
        insuranceStartDate: string;
    } | null>(null);
    const [isAdditionalDataSubmitted, setIsAdditionalDataSubmitted] = useState<boolean>(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    ;
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);
    const [selectedInsurerIDNO, setSelectedInsurerIDNO] = useState<string | null>(null);

    const handleInsurerSelect = (insurer: any) => {
        setSelectedInsurerIDNO(insurer.IDNO); // Сохраняем IDNO выбранного страховщика
    };
    const handleAdditionalSubmit = (data: {
        possessionBase: { value: string; label: string } | null;
        insuranceStartDate: string
    }) => {
        setSelectedAdditional(data);
        setIsAdditionalDataSubmitted(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConsentGiven) {
            setError("Вы должны дать согласие на обработку персональных данных.");
            return;
        }

        const requestData = {IDNX, VehicleRegistrationCertificateNumber, OperatingModes, PersonIsJuridical};
        try {
            const response = await axiosInstance.post("/rca/calculate-rca/", requestData);
            const result = response.data;

            setCalculatedData({
                vehicleMark: result.VehicleMark,
                vehicleModel: result.VehicleModel,
                vehicleRegistrationNumber: result.VehicleRegistrationNumber,
                bonusMalusClass: result.BonusMalusClass,
                personFirstName: result.PersonFirstName,
                personLastName: result.PersonLastName,
                possessionBase: "",
                insuranceStartDate: "",
            });

            setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);
            setSuccess(true);
            setFormSubmitted(true);
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setError("Произошла ошибка при расчетах.");
        }
    };

    const [qrHeaderUUID, setQrHeaderUUID] = useState<string | null>(null);
    const [QrAsImage, setQrAsImage] = useState<string | null>(null);

    const handleApiRequest = async () => {
        if (selectedAdditional && selectedInsurer) {
            const requestData = {
                extension: {
                    amount: {
                        sum: selectedInsurer.PrimeSumMDL,
                        currency: "MDL",
                    },
                },
            };

            try {
                const response = await axiosInstance.post('/qr/', requestData);
                const {url, uuid, qr_as_image} = response.data;
                setQrCodeUrl(url);
                setQrHeaderUUID(uuid);
                setQrAsImage(qr_as_image);
            } catch (error) {
                console.error('Ошибка при запросе API:', error);
            }
        }
    };

    const saveRcaData = async () => {
        const requestData = {
            Company: {
                IDNO: selectedInsurerIDNO, // Используем значение IDNX для идентификации компании страховщика
            },
            InsuredPhysicalPerson: {
                IdentificationCode: IDNX, // Используем значение IDNX для физического лица
                BirthDate: "2000-01-01",  // Пример даты рождения
                IsFromTransnistria: false,
                PersonIsExternal: false,
            },

            InsuredJuridicalPerson: {
                IdentificationCode: IDNX, // Используем значение IDNX для юридического лица
            },
            InsuredVehicle: {
                ProductionYear: 2025,
                CilinderVolume: 2000,
                TotalWeight: 2000,
                EnginePower: 200,
                Seats: 5,
                RegistrationCertificateNumber: VehicleRegistrationCertificateNumber,

            },
            StartDate: "2025-01-21", // Пример даты начала
            PossessionBase: "Property", // Тип владения
            DocumentPossessionBaseDate: "2000-01-01", // Дата документа
            OperatingMode: "Usual", // Обычный режим эксплуатации
            qrCode: qrHeaderUUID, // QR код
        };

        try {
            const response = await axiosInstance.post("/rca/save-rca/", requestData);
            console.log("Данные успешно отправлены:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const updatePaymentStatus = async () => {
        if (!qrHeaderUUID) return;

        try {
            const response = await axiosInstance.get(`/qr/${qrHeaderUUID}/status/`);
            const {status} = response.data; // Получаем статус из ответа

            if (status === "Paid") {
                setPaymentStatus("Успешно оплачено");
            } else if (status === "Active") {
                setPaymentStatus("Оплата активна");
            } else {
                setPaymentStatus("Оплата ожидается");
            }

            // После проверки статуса отправляем новый запрос
            await saveRcaData(); // Отправляем данные на сервер
        } catch (error) {
            console.error("Ошибка при проверке статуса оплаты:", error);
            setPaymentStatus("Ошибка при проверке статуса оплаты");
        }
    };


    useEffect(() => {
        if (qrHeaderUUID && !isCheckingStatus) {
            setIsCheckingStatus(true);
            const intervalId = setInterval(async () => {
                await updatePaymentStatus();
            }, 5000);

            // Очистка интервала и остановка проверки статуса
            return () => {
                clearInterval(intervalId);
                setIsCheckingStatus(false);
            };
        }
    }, [qrHeaderUUID]);

    useEffect(() => {
        if (selectedAdditional) {
            handleApiRequest();
        }
    }, [selectedAdditional]);

    return (
        <div className="min-h-screen">
            <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
                        Оформление страховки ОСАГО
                    </h1>
                </div>
            </div>

            {!formSubmitted && (
                <InsuranceRequestForm
                    IDNX={IDNX}
                    setIDNX={setIDNX}
                    VehicleRegistrationCertificateNumber={VehicleRegistrationCertificateNumber}
                    setVehicleRegistrationCertificateNumber={setVehicleRegistrationCertificateNumber}
                    isConsentGiven={isConsentGiven}
                    setIsConsentGiven={setIsConsentGiven}
                    handleSubmit={handleSubmit}
                    error={error}
                />
            )}

            {success && (
                <SelectedParameters
                    calculatedData={calculatedData}
                    selectedInsurer={selectedInsurer}
                    selectedAdditional={selectedAdditional}
                />
            )}

            {selectedInsurer ? (
                isAdditionalDataSubmitted ? (
                    qrCodeUrl && (
                        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                                {qrCodeUrl && (
                                    <div className="mt-4 text-center">
                                        <p className="text-lg text-gray-700 mb-4">Ссылка на QR-код:</p>
                                        <a
                                            href={qrCodeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-500 underline text-sm sm:text-base lg:text-lg hover:text-blue-600 transition duration-300"
                                        >
                                            <img
                                                src={`data:image/png;base64,${{QrAsImage}}`}
                                                alt="QR код"
                                                className="w-96 h-96 border border-gray-300" // Увеличенные размеры для QR
                                            />
                                            Перейти к QR-коду
                                        </a>
                                        {paymentStatus ? (
                                            <p className="text-lg font-semibold">{paymentStatus}</p>
                                        ) : (
                                            <p className="text-sm text-gray-500"></p>
                                        )}

                                    </div>

                                )}
                            </div>
                        </div>


                    )
                ) : (
                    <AdditionalDataForm onSubmit={handleAdditionalSubmit}/>
                )
            ) : (
                <InsurerList insurers={insurers} handleInsurerSelect={setSelectedInsurer}/>
            )}

            <InfoRCA/>
            <FAQAccordion/>
        </div>
    );
}
