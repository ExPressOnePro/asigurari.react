import React, { useState, useEffect } from "react";

const SelectedParameters = ({ calculatedData, selectedInsurer, selectedAdditional, dictionary }: any) => {
    const [initialized, setInitialized] = useState(false);

    // Используем useEffect, чтобы установить флаг после первого рендера
    useEffect(() => {
        if (selectedAdditional) {
            setInitialized(true);  // Устанавливаем флаг, когда данные доступны
        }
    }, [selectedAdditional]);

    // Функция для рендера пары "метка: значение"
    const renderParameter = (label: string, value: string | JSX.Element | null) => (
        value ? (
            <>
                <div className="text-sm text-gray-700">{label}:</div>
                <div className="text-sm font-extrabold text-gray-800">{value}</div>
            </>
        ) : null
    );

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white border shadow-lg rounded-lg p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {dictionary?.osago?.SelectedParameters?.SelectedParameters}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {renderParameter(dictionary?.osago?.SelectedParameters?.Car,
                            `${calculatedData?.vehicleMark} ${calculatedData?.vehicleModel} (${calculatedData?.vehicleRegistrationNumber})`)}

                        {renderParameter(dictionary?.osago?.SelectedParameters?.BonusMalusClass, calculatedData?.bonusMalusClass)}

                        {renderParameter(dictionary?.osago?.SelectedParameters?.Client,
                            `${calculatedData?.personFirstName} ${calculatedData?.personLastName}`)}

                        {selectedInsurer && (
                            <>
                                {renderParameter(dictionary?.osago?.SelectedParameters?.Insurer, selectedInsurer.Name)}
                                {renderParameter(dictionary?.osago?.SelectedParameters?.PolicyCost, `${selectedInsurer.PrimeSumMDL} MDL`)}
                            </>
                        )}

                        {initialized && selectedAdditional?.possessionBase && (
                            <>
                                {renderParameter(dictionary?.osago?.SelectedParameters?.OwnershipType, selectedAdditional.possessionBase.label)}
                                {renderParameter(dictionary?.osago?.SelectedParameters?.InsuranceStartDate, selectedAdditional.insuranceStartDate)}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedParameters;
