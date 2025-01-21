"use client";

import React, {useState} from "react";
import axiosInstance from "@/lib/axiosInstance";
import {GreenCardZoneOptions, GreenCardZones, TermInsurance, TermInsuranceOptions,} from "./Enums";
import {GreenCardCalculationResponse} from "./types";
import {getStaticUrl} from "@/app/[lang]/components/Footer.tsx";
import TextInputWithTooltip from "@/app/[lang]/components/TextInputWithTooltip.tsx";
import SelectInputWithTooltip from "@/app/[lang]/components/SelectInputWithTooltip.tsx";
import ConsentToggle from "@/app/[lang]/components/ConsentToggle.tsx";
import SubmitButton from "@/app/[lang]/components/SubmitButton.tsx";

interface GreenCardFormProps {
    onCalculationSuccess: (data: GreenCardCalculationResponse) => void;
}

const GreenCardRequestForm: React.FC<GreenCardFormProps> = ({onCalculationSuccess}) => {
    const [greenCardZone, setGreenCardZone] = useState<GreenCardZones>(GreenCardZones.Z3);
    const [termInsurance, setTermInsurance] = useState<TermInsurance>(TermInsurance.D15);
    const [IDNX, setIDNX] = useState<string>("2005021106830");
    const [vehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("218000136");
    const [error, setError] = useState<string | null>(null);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConsentGiven) {
            setError("Необходимо согласие на обработку данных.");
            return false;
        }

        const requestData = {
            GreenCardZone: greenCardZone,
            TermInsurance: termInsurance,
            IDNX: IDNX || null,
            VehicleRegistrationCertificateNumber: vehicleRegistrationCertificateNumber || null,
        };

        setIsLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post<GreenCardCalculationResponse>(
                "rca/calculate-green-card/",
                requestData
            );
            const result = response.data;

            if (result.IsSuccess) {
                onCalculationSuccess(result);
            } else {
                setError(result.ErrorMessage || "Произошла ошибка при расчетах.");
            }
        } catch (error: any) {
            console.error("Ошибка при запросе к API:", error);

            if (error.response?.status === 500) {
                setError("Ошибка сервера. Пожалуйста, попробуйте позже.");
            } else if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else if (error.response?.data) {
                const errorMessages = Object.values(error.response.data)
                    .flat()
                    .join(", ");
                setError(errorMessages || "Произошла ошибка при расчетах.");
            } else {
                setError("Произошла ошибка при расчетах.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                        Рассчитайте стоимость "Зеленой карты"
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center space-x-4">
                            {/* Green Card Zone Selection */}
                            <div className="flex-1">
                                <SelectInputWithTooltip
                                    id="greenCardZone"
                                    label="Зона Зеленой Карты"
                                    value={greenCardZone}
                                    onChange={(e) => setGreenCardZone(e.target.value as GreenCardZones)}
                                    options={GreenCardZoneOptions}
                                    tooltipImage={undefined}
                                    required={true}
                                />
                            </div>

                            {/* Term Insurance Selection */}
                            <div className="flex-1">
                                <SelectInputWithTooltip
                                    id="termInsurance"
                                    label="Срок страхования"
                                    value={termInsurance}
                                    onChange={(e) => setTermInsurance(e.target.value as TermInsurance)}
                                    options={TermInsuranceOptions}
                                    tooltipImage={undefined}
                                    required={true}
                                />
                            </div>
                        </div>


                        {/* IDNX Input */}
                        <TextInputWithTooltip
                            id="idnx"
                            label="IDNP"
                            value={IDNX}
                            onChange={(e) => setIDNX(e.target.value)}
                            placeholder="Введите IDNP"
                            tooltipImage={getStaticUrl("public/idnp.webp")}
                            maxLength={13}
                            minLength={13}
                            required
                        />

                        {/* Vehicle Registration Certificate Number Input */}
                        <TextInputWithTooltip
                            id="vehicleRegCertificateNumber"
                            label="Номер техпаспорта"
                            value={vehicleRegistrationCertificateNumber}
                            onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                            placeholder="Введите номер техпаспорта"
                            tooltipImage={getStaticUrl("public/exemplu-certificat-inmatriculare.webp")}
                            maxLength={9}
                            minLength={9}
                            required={true}
                        />


                        {/* Consent Toggle */}
                        <ConsentToggle
                            isConsentGiven={isConsentGiven}
                            setIsConsentGiven={setIsConsentGiven}
                        />

                        {/* Submit Button */}
                        <SubmitButton isConsentGiven={isConsentGiven} isLoading={isLoading}/>
                    </form>

                    {/* Индикатор загрузки */}
                    {isLoading && (
                        <div className="flex justify-center mt-4">
                            <div
                                className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GreenCardRequestForm;
