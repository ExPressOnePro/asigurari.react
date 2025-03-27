import React, { useState, useEffect, JSX } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store.ts";
import { useLocalization } from "@/lib/LocalizationProvider.tsx";

const SelectedParameters = React.memo(({ calculatedData, selectedAdditional, step }: any) => {
    const [initialized, setInitialized] = useState(false);
    const { dictionary } = useLocalization();

    useEffect(() => {
        if (selectedAdditional) {
            setInitialized(true);
        }
    }, [selectedAdditional]);

    const renderParameter = (label: string, value: string | JSX.Element | null) => (
        value ? (
            <div className="mb-2">
                <div className="text-sm text-gray-700">{label}</div>
                <div className="text-sm font-semibold text-gray-900">{value}</div>
            </div>
        ) : null
    );

    const userData = useSelector((state: RootState) => state.greenCardForm.userData);
    const apiData = useSelector((state: RootState) => state.greenCardForm.apiData);
    const selectedInsurer = useSelector((state: RootState) => state.greenCardForm.selectedInsurer);
    const additionalData = useSelector((state: RootState) => state.greenCardForm.additionalData);

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {dictionary?.RCA?.SP?.SelectedParameters}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderParameter(dictionary?.RCA?.SP?.Car,
                        `${apiData?.VehicleMark} ${apiData?.VehicleModel} (${apiData?.VehicleRegistrationNumber})`)}

                    {/*{renderParameter(dictionary?.RCA?.SP?.BonusMalusClass,*/}
                    {/*    `${apiData?.}`)}*/}

                    {renderParameter(dictionary?.RCA?.SP?.Client,
                        `${apiData?.PersonFirstName} ${apiData?.PersonLastName}`)}

                    {step > 2 && (
                        <>
                            {renderParameter(dictionary?.RCA?.SP?.Insurer,
                                `${selectedInsurer?.Name}`)}
                            {renderParameter(dictionary?.RCA?.SP?.PolicyCost,
                                `${selectedInsurer?.PrimeSumMDL} MDL`)}
                        </>
                    )}

                    {step > 3 && (
                        <>
                            {renderParameter(dictionary?.RCA?.SP?.OwnershipType,
                                `${additionalData?.PossessionBase?.label}`)}
                            {renderParameter(dictionary?.RCA?.SP?.InsuranceStartDate,
                                `${additionalData?.StartDate}`)}
                        </>
                    )}
                    {/*{step > 4 && (*/}
                    {/*    <>*/}
                    {/*        {renderParameter(dictionary?.RCA?.SP?.Email,*/}
                    {/*            `${contact?.email}`)}*/}
                    {/*    </>*/}
                    {/*)}*/}

                </div>
            </div>
        </div>
    );
});

export default SelectedParameters;
