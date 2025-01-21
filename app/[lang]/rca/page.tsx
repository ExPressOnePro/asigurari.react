"use client";

import { Locale } from "@/i18n.config";
import React, { useEffect, useState } from "react";
import { getDictionary } from "@/lib/dictionary";
import axiosInstance from "@/lib/axiosInstance";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm";
import InfoRCA from "@/app/[lang]/rca/InfoRCA";
import FAQAccordion from "@/app/[lang]/rca/FAQAccordion";
import InsurerList from "@/app/[lang]/rca/InsurerList";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm";

export default function Page({ params }: { params: { lang: Locale } }) {
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
    } | null>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [selectedInsurer, setSelectedInsurer] = useState<any | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConsentGiven) {
            setError("Вы должны дать согласие на обработку персональных данных.");
            return;
        }

        const requestData = { IDNX, VehicleRegistrationCertificateNumber, OperatingModes, PersonIsJuridical };
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
            });

            setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);
            setSuccess(true);
            setFormSubmitted(true);
            setError(null);
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setError("Произошла ошибка при расчетах");
            setSuccess(false);
        }
    };

    const handleInsurerSelect = (insurer: any) => {
        setSelectedInsurer(insurer);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
                            Страхование автомобиля (RCA)
                        </h1>
                        <p className="text-gray-600 text-center text-sm sm:text-base mb-8">
                            Страхование автогражданской ответственности (RCA) обеспечивает защиту третьих лиц в случае ДТП. Заполните форму ниже, чтобы рассчитать стоимость полиса и выбрать подходящего страховщика.
                        </p>

                        {/* Render InsuranceRequestForm only if form is not submitted */}
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

                        {/* Display Calculated Data */}
                        {success && calculatedData && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Результаты расчета:</h2>
                                <div className="bg-gray-50 p-6 rounded-md shadow-md">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Имя клиента:</strong> {calculatedData.personFirstName} {calculatedData.personLastName}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Автомобиль:</strong> {calculatedData.vehicleMark} {calculatedData.vehicleModel} ({calculatedData.vehicleRegistrationNumber})
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <strong>Класс бонус-малус:</strong> {calculatedData.bonusMalusClass}
                                    </p>
                                </div>

                                {/* Display Insurer List if available and no insurer is selected */}
                                {insurers.length > 0 && !selectedInsurer && (
                                    <InsurerList
                                        insurers={insurers}
                                        handleInsurerSelect={handleInsurerSelect}
                                    />
                                )}

                                {/* Display AdditionalDataForm if an insurer is selected */}
                                {selectedInsurer && (
                                    <AdditionalDataForm insurer={selectedInsurer} />
                                )}
                            </div>
                        )}

                        {/* Display Error if any */}
                        {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
                    </div>
                </div>
            </div>
            {/* Optional: Include FAQ or other components */}
            {success && <FAQAccordion />}
        </div>
    );
}
