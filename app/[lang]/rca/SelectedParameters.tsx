import React from "react";

const SelectedParameters = ({ calculatedData, selectedInsurer, selectedAdditional }: any) => (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
            <div className="bg-white border shadow-lg rounded-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Выбранные параметры:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="text-sm text-gray-700">Автомобиль:</div>
                    <div className="text-sm font-extrabold text-gray-800">
                        {calculatedData?.vehicleMark} {calculatedData?.vehicleModel} ({calculatedData?.vehicleRegistrationNumber})
                    </div>

                    <div className="text-sm text-gray-700">Класс бонус-малус:</div>
                    <div className="text-sm font-extrabold text-gray-800">
                        {calculatedData?.bonusMalusClass}
                    </div>

                    <div className="text-sm text-gray-700">Клиент:</div>
                    <div className="text-sm font-extrabold text-gray-800">
                        {calculatedData?.personFirstName} {calculatedData?.personLastName}
                    </div>

                    {selectedInsurer && (
                        <>
                            <div className="text-sm text-gray-700">Страховщик:</div>
                            <div className="text-sm font-extrabold text-gray-800">
                                {selectedInsurer.Name}
                            </div>

                            <div className="text-sm text-gray-700">Стоимость полиса:</div>
                            <div className="text-sm font-extrabold text-gray-800">
                                {selectedInsurer.PrimeSumMDL} MDL
                            </div>
                        </>
                    )}

                    {selectedAdditional?.possessionBase ? (
                        <>
                            <div className="text-sm text-gray-700">Тип владения:</div>
                            <div className="text-sm font-extrabold text-gray-800">
                                {selectedAdditional.possessionBase.label}
                            </div>

                            <div className="text-sm text-gray-700">Дата начала страховки:</div>
                            <div className="text-sm font-extrabold text-gray-800">
                                {selectedAdditional.insuranceStartDate}
                            </div>
                        </>
                    ) : (
                        <div className="col-span-2 text-sm text-gray-700"></div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default SelectedParameters;
