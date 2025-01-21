"use client";

import React, {useState} from "react";
import GreenCardRequestForm from "@/app/[lang]/greencard/GreenCardRequestForm.tsx";
import InsurerList from "@/app/[lang]/greencard/InsurerList";
import AdditionalDataForm from "@/app/[lang]/greencard/AdditionalDataForm";
import FAQAccordion from "@/app/[lang]/greencard/FAQAccordion";
import {GreenCardCalculationResponse, Insurer} from "./types";

export default function Page() {
    const [calculatedData, setCalculatedData] = useState<GreenCardCalculationResponse | null>(null);
    const [selectedInsurer, setSelectedInsurer] = useState<Insurer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculationSuccess = (data: GreenCardCalculationResponse) => {
        setCalculatedData(data);
        setError(null);
    };

    const handleInsurerSelect = (insurer: Insurer) => {
        setSelectedInsurer(insurer);
    };

    return (
        <div className="min-h-screen">
            <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
                        Оформление "Зеленой карты"
                    </h1>
                </div>
            </div>
            <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">

                    {!calculatedData && (
                        <GreenCardRequestForm onCalculationSuccess={handleCalculationSuccess}/>
                    )}

                    {calculatedData && (
                        <div className="mt-8">
                            <div className="bg-gray-50 p-6 rounded-md shadow-md">
                                <p className="text-gray-700 mb-2">
                                    <strong>Имя клиента:</strong> {calculatedData.PersonFirstName}{" "}
                                    {calculatedData.PersonLastName}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Автомобиль:</strong> {calculatedData.VehicleMark}{" "}
                                    {calculatedData.VehicleModel} ({calculatedData.VehicleRegistrationNumber})
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <strong>Категория автомобиля:</strong> {calculatedData.VehicleCategory}
                                </p>
                            </div>

                            {!selectedInsurer && calculatedData.InsurersPrime.InsurerPrimeRCAE.length > 0 && (
                                <InsurerList
                                    insurers={calculatedData.InsurersPrime.InsurerPrimeRCAE}
                                    handleInsurerSelect={handleInsurerSelect}
                                />
                            )}

                            {selectedInsurer && <AdditionalDataForm/>}
                        </div>
                    )}

                    {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
                </div>
            </div>

            {calculatedData && <FAQAccordion/>}
        </div>
    );
}
