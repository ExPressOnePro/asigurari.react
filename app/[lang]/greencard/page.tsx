"use client";

import React, {useState} from "react";
import GreenCardRequestForm from "@/app/[lang]/greencard/GreenCardRequestForm.tsx";
import InsurerList from "@/app/[lang]/greencard/InsurerList";
import AdditionalDataForm from "@/app/[lang]/greencard/AdditionalDataForm";
import {GreenCardCalculationResponse, Insurer} from "./types";
import FAQAccordion from "@/app/[lang]/greencard/FAQAccordion.tsx";

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

            {!calculatedData && (
                <GreenCardRequestForm onCalculationSuccess={handleCalculationSuccess}/>
            )}

            {calculatedData && (
                <div>
                    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-3xl">
                            <div className="bg-white border shadow-lg rounded-lg p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Выбранные параметры:</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                    <div className="text-sm text-gray-700">Автомобиль:</div>
                                    <div className="text-sm font-extrabold text-gray-800">
                                        {calculatedData?.VehicleMark} {calculatedData?.VehicleModel} ({calculatedData?.VehicleRegistrationNumber})
                                    </div>

                                    <div className="text-sm text-gray-700">Категория автомобиля:</div>
                                    <div className="text-sm font-extrabold text-gray-800">
                                        {calculatedData?.VehicleCategory}
                                    </div>

                                    <div className="text-sm text-gray-700">Клиент:</div>
                                    <div className="text-sm font-extrabold text-gray-800">
                                        {calculatedData?.PersonFirstName} {calculatedData?.PersonLastName}
                                    </div>
                                    {selectedInsurer && (
                                        <>
                                            <div className="text-sm text-gray-700">Страховщик:</div>
                                            <div className="text-sm font-extrabold text-gray-800">
                                                {selectedInsurer.Name}
                                            </div>

                                            <div className="text-sm text-gray-700">Стоимость "Зелёной карты":
                                            </div>
                                            <div className="text-sm font-extrabold text-gray-800">
                                                {selectedInsurer.PrimeSumMDL} MDL
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
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


            {calculatedData && <FAQAccordion/>}
        </div>
    );
}
