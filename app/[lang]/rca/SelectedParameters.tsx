import React, {useState, useEffect, JSX} from "react";
import { useSelector } from 'react-redux';
import {RootState} from "@/store/store.ts";

const SelectedParameters = ({ calculatedData, selectedAdditional, dictionary, currentStep }: any) => {
    const [initialized, setInitialized] = useState(false);

    // Используем useEffect, чтобы установить флаг после первого рендера
    useEffect(() => {
        if (selectedAdditional) {
            setInitialized(true);  // Устанавливаем флаг, когда данные доступны
        }
    }, [selectedAdditional]);


    const renderParameter = (label: string, value: string | JSX.Element | null) => (
        value ? (
            <>
                <div className="text-sm text-gray-700">{label}:</div>
                <div className="text-sm font-extrabold text-gray-800">{value}</div>
            </>
        ) : null
    );

    const userData = useSelector((state: RootState) => state.insuranceForm.userData);
    const apiData = useSelector((state: RootState) => state.insuranceForm.apiData);
    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);


    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white border shadow-lg rounded-lg p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {dictionary?.osago?.SelectedParameters?.SelectedParameters}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">


                        {renderParameter(dictionary?.osago?.SelectedParameters?.Car,
                            `${apiData?.VehicleMark} ${apiData?.VehicleModel} (${apiData?.VehicleRegistrationNumber})`)}

                        {renderParameter(dictionary?.osago?.SelectedParameters?.BonusMalusClass,
                            `${apiData?.BonusMalusClass}`)}

                        {renderParameter(dictionary?.osago?.SelectedParameters?.Client,
                            `${apiData?.PersonFirstName} ${apiData?.PersonLastName}`)}

                        {currentStep > 2 && (
                            <>
                                {renderParameter(dictionary?.osago?.SelectedParameters?.Insurer,
                                    `${selectedInsurer?.Name}`)}
                                {renderParameter(dictionary?.osago?.SelectedParameters?.PolicyCost,
                                    `${selectedInsurer?.PrimeSumMDL} MDL`)}
                            </>
                        )}

                        {currentStep > 3 && (
                            <>
                                {renderParameter(dictionary?.osago?.SelectedParameters?.OwnershipType,
                                    `${additionalData?.PossessionBase?.label}`)}
                                {renderParameter(dictionary?.osago?.SelectedParameters?.InsuranceStartDate,
                                    `${additionalData?.StartDate}`)}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedParameters;
