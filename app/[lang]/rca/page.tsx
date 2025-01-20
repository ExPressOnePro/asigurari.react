"use client";

import {Locale} from "@/i18n.config";
import React, {useEffect, useState} from "react";
import {getDictionary} from "@/lib/dictionary";
import axiosInstance from "@/lib/axiosInstance";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm";
import InfoRCA from "@/app/[lang]/rca/InfoRCA";
import FAQAccordion from "@/app/[lang]/rca/FAQAccordion";
import InsurerList from "@/app/[lang]/rca/InsurerList";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm";

export default function Page({params}: { params: { lang: Locale } }) {
    const [dictionary, setDictionary] = useState<any>(null);

    useEffect(() => {
        const loadDictionary = async () => {
            const dict = await getDictionary(params.lang);
            setDictionary(dict);
        };
        loadDictionary();
    }, [params.lang]);

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

    const handleAdditionalSubmit = (data: { possessionBase: { value: string; label: string } | null; insuranceStartDate: string }) => {
        setSelectedAdditional(data);
        setIsAdditionalDataSubmitted(true); // Форма была отправлена
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
            setError("Произошла ошибка при расчетах");
        }
    };

    const handleApiRequest = async (selectedAdditional: any) => {
        if (selectedAdditional) {
            const requestData = {
                extension: {
                    amount: {
                        sum: selectedInsurer.PrimeSumMDL,
                        currency: "MDL"
                    }
                }
            };

            try {
                const response = await axiosInstance.post('/qr/', requestData);
                console.log('Ответ от API:', response.data);
                setQrCodeUrl(response.data.qrAsImage);
            } catch (error) {
                console.error('Ошибка при запросе API:', error);
            }
        }
    };

    useEffect(() => {
        if (selectedAdditional) {
            handleApiRequest(selectedAdditional);
        }
    }, [selectedAdditional]);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    // @ts-ignore
    return (
        <div className="min-h-screen">
            <InfoRCA/>
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
                <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-3xl">
                        <div className="bg-white shadow-lg rounded-lg p-8">
                            <h2 className="text-xl font-bold text-gray-800">Выбранные параметры:</h2>
                            <p className="mt-2 text-sm text-gray-700">
                                Автомобиль: <strong> {calculatedData?.vehicleMark} {calculatedData?.vehicleModel} ({calculatedData?.vehicleRegistrationNumber})</strong>
                            </p>
                            <p className="mt-2 text-sm text-gray-700">Класс
                                бонус-малус:<strong> {calculatedData?.bonusMalusClass}</strong>
                            </p>
                            <p className="mt-2 text-sm text-gray-700">Клиент:
                                <strong>{calculatedData?.personFirstName} {calculatedData?.personLastName}</strong>
                            </p>
                            {selectedInsurer && (
                                <div>
                                    <p className="mt-2 text-sm text-gray-700">Страховщик
                                        <strong> {selectedInsurer.Name}</strong>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700">Стоимость
                                        полиса: <strong>{selectedInsurer.PrimeSumMDL} MDL</strong>
                                    </p>
                                </div>
                            )}
                            {selectedAdditional?.possessionBase ? (
                                <div>
                                <p className="mt-2 text-sm text-gray-700">Тип владения:
                                    <strong>{selectedAdditional.possessionBase.label}</strong>
                                </p>
                                <p className="mt-2 text-sm text-gray-700">Дата начала страховки:
                                    <strong>{selectedAdditional.insuranceStartDate}</strong>
                                </p>
                                </div>
                            ) : (
                                <p className="mt-2 text-sm text-gray-700"></p>
                            )}
                        </div>
                    </div>
                </div>
            )}


            {selectedInsurer ? (
                isAdditionalDataSubmitted ? (
                    qrCodeUrl && (
                        <div
                            className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="w-full max-w-3xl">
                                <div className="rounded-lg p-8 flex justify-center">
                                    <img
                                        src={`data:image/png;base64,${qrCodeUrl}`}
                                        alt="QR код"
                                        className="w-96 h-96 border border-gray-300" // Увеличенные размеры для QR
                                    />
                                </div>
                            </div>
                        </div>

                    )
                ) : (
                    <AdditionalDataForm onSubmit={handleAdditionalSubmit}/>
                )
            ) : (
                <InsurerList insurers={insurers} handleInsurerSelect={setSelectedInsurer}/>
            )}


            <FAQAccordion/>
        </div>
    );
}

