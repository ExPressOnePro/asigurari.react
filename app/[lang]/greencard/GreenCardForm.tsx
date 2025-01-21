"use client";

import React, {useState} from "react";
import axiosInstance from "@/lib/axiosInstance";
import {GreenCardZoneOptions, GreenCardZones, TermInsurance, TermInsuranceOptions,} from "./Enums";
import {GreenCardCalculationResponse} from "./types";

interface GreenCardFormProps {
    onCalculationSuccess: (data: GreenCardCalculationResponse) => void;
}

const GreenCardForm: React.FC<GreenCardFormProps> = ({onCalculationSuccess}) => {
    const [greenCardZone, setGreenCardZone] = useState<GreenCardZones>(GreenCardZones.Z3);
    const [termInsurance, setTermInsurance] = useState<TermInsurance>(TermInsurance.D15);
    const [IDNX, setIDNX] = useState<string>("");
    const [vehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConsentGiven) {
            setError("Вы должны дать согласие на обработку персональных данных.");
            return;
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

    return (
        <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
                Рассчитайте стоимость Зеленой Карты
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Green Card Zone Selection */}
                <div>
                    <label htmlFor="greenCardZone" className="block text-sm font-bold text-gray-700">
                        Зона Зеленой Карты
                    </label>
                    <select
                        id="greenCardZone"
                        value={greenCardZone}
                        onChange={(e) => setGreenCardZone(e.target.value as GreenCardZones)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        {GreenCardZoneOptions.map((zone) => (
                            <option key={zone.value} value={zone.value}>
                                {zone.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Term Insurance Selection */}
                <div>
                    <label htmlFor="termInsurance" className="block text-sm font-bold text-gray-700">
                        Срок страхования
                    </label>
                    <select
                        id="termInsurance"
                        value={termInsurance}
                        onChange={(e) => setTermInsurance(e.target.value as TermInsurance)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        {TermInsuranceOptions.map((term) => (
                            <option key={term.value} value={term.value}>
                                {term.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* IDNX Input */}
                <div>
                    <label htmlFor="idnx" className="block text-sm font-bold text-gray-700">
                        IDNP/IDNO
                    </label>
                    <input
                        type="text"
                        id="idnx"
                        value={IDNX}
                        onChange={(e) => setIDNX(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите IDNP/IDNO"
                        maxLength={13}
                        minLength={13}
                        required
                    />
                </div>

                {/* Vehicle Registration Certificate Number Input */}
                <div>
                    <label htmlFor="vehicleRegCertificateNumber" className="block text-sm font-bold text-gray-700">
                        Номер техпаспорта
                    </label>
                    <input
                        type="text"
                        id="vehicleRegCertificateNumber"
                        value={vehicleRegistrationCertificateNumber}
                        onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите номер техпаспорта"
                        maxLength={9}
                        minLength={9}
                        required
                    />
                </div>

                {/* Consent Toggle */}
                <div className="flex items-center">
                    <div
                        className={`${
                            isConsentGiven ? "bg-green-500" : "bg-gray-400"
                        } relative inline-block w-16 h-8 rounded-full cursor-pointer transition-colors duration-300`}
                        onClick={() => setIsConsentGiven(!isConsentGiven)}
                    >
                        <span
                            className={`${
                                isConsentGiven ? "translate-x-8" : "translate-x-0"
                            } inline-block w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300`}
                        />
                    </div>
                    <label htmlFor="consent" className="ml-4 text-sm text-gray-700">
                        Согласие на обработку данных
                    </label>
                    <input
                        type="checkbox"
                        id="consent"
                        checked={isConsentGiven}
                        onChange={() => setIsConsentGiven(!isConsentGiven)}
                        className="sr-only"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={!isConsentGiven || isLoading}
                        className={`w-full ${
                            isConsentGiven && !isLoading
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-blue-300 cursor-not-allowed"
                        } text-white font-semibold py-2 px-4 rounded-lg shadow-md`}
                    >
                        {isLoading ? "Рассчитывается..." : "Рассчитать"}
                    </button>
                </div>
            </form>

            {/* Success and Error Messages */}
            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default GreenCardForm;
