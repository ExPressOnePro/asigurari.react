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
    } | null>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [selectedInsurer, setSelectedInsurer] = useState<any | null>(null);

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
            });

            setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);
            setSuccess(true);
            setFormSubmitted(true);
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setError("Произошла ошибка при расчетах");
        }
    };

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
                <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="w-full max-w-3xl">
                        <div className="bg-white shadow-lg rounded-lg p-8">
                            <h2 className="text-xl font-bold text-gray-800">Выбранные параметры:</h2>
                            <p className="mt-2 text-sm text-gray-700">
                                <strong>Автомобиль: </strong> {calculatedData?.vehicleMark} {calculatedData?.vehicleModel} ({calculatedData?.vehicleRegistrationNumber})
                            </p>
                            <p className="mt-2 text-sm text-gray-700"><strong>Класс
                                бонус-малус:</strong> {calculatedData?.bonusMalusClass}</p>
                            <p className="mt-2 text-sm text-gray-700">
                                <strong>Клиент:</strong> {calculatedData?.personFirstName} {calculatedData?.personLastName}
                            </p>
                            {selectedInsurer && (
                                <div>
                                    <p className="mt-2 text-sm text-gray-700">
                                        <strong>Страховщик:</strong> {selectedInsurer.Name}</p>
                                    <p className="mt-2 text-sm text-gray-700"><strong>Стоимость
                                        полиса:</strong> {selectedInsurer.PrimeSumMDL} MDL </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {selectedInsurer ? (
                <AdditionalDataForm/>
            ) : (
                <InsurerList insurers={insurers} handleInsurerSelect={setSelectedInsurer}/>
            )}
            <FAQAccordion/>
        </div>
    );
}
