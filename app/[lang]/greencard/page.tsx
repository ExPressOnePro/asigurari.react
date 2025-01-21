"use client";

import React, {useState} from "react";
import GreenCardForm from "@/app/[lang]/greencard/GreenCardForm";
import InsurerList from "@/app/[lang]/greencard/InsurerList";
import AdditionalDataForm from "@/app/[lang]/greencard/AdditionalDataForm";
import FAQAccordion from "@/app/[lang]/greencard/FAQAccordion";
import {GreenCardCalculationResponse, Insurer} from "./types"

const Page: React.FC = () => {
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
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
                            Зеленая карта
                        </h1>
                        <p className="text-gray-600 text-center text-sm sm:text-base mb-8">
                            «Зелёная карта» — ваша надежная защита за границей! Этот полис покрывает ущерб третьим лицам
                            в случае ДТП за пределами Молдовы, гарантируя компенсацию в соответствии с местным
                            законодательством. Путешествуйте спокойно, зная, что ваш полис активен на протяжении всей
                            поездки — это избавит вас от штрафов и лишних хлопот.
                        </p>
                        {/* Render GreenCardForm only if data is not submitted */}
                        {!calculatedData && <GreenCardForm onCalculationSuccess={handleCalculationSuccess}/>}

                        {/* Display Calculated Data */}
                        {calculatedData && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Результаты расчета:</h2>
                                <div className="bg-gray-50 p-6 rounded-md shadow-md">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Имя
                                            клиента:</strong> {calculatedData.PersonFirstName} {calculatedData.PersonLastName}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Автомобиль:</strong> {calculatedData.VehicleMark} {calculatedData.VehicleModel} ({calculatedData.VehicleRegistrationNumber})
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <strong>Категория автомобиля:</strong> {calculatedData.VehicleCategory}
                                    </p>
                                </div>

                                {/* Display Insurer List if available */}
                                {calculatedData.InsurersPrime.InsurerPrimeRCAE.length > 0 && !selectedInsurer && (
                                    <InsurerList
                                        insurers={calculatedData.InsurersPrime.InsurerPrimeRCAE}
                                        handleInsurerSelect={handleInsurerSelect}
                                    />
                                )}

                                {/* Display AdditionalDataForm if an insurer is selected */}
                                {selectedInsurer && <AdditionalDataForm insurer={selectedInsurer}/>}
                            </div>
                        )}

                        {/* Display Error if any */}
                        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            </div>
            {/* Optional: Include FAQ or other components */}
            {calculatedData && <FAQAccordion/>}
        </div>
    );
};

export default Page;
