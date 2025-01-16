import React, { useState, useEffect } from "react";

const AdditionalDataForm = () => {
    const [isFromTransnistria, setIsFromTransnistria] = useState<boolean>(false);
    const [personIsExternal, setPersonIsExternal] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<string>("");
    const [insuranceStartDate, setInsuranceStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [insuranceEndDate, setInsuranceEndDate] = useState<string>("");
    const [possessionBase, setPossessionBase] = useState<string>('');

    // Handle switching logic, ensuring only one can be active at a time
    const handleIsFromTransnistriaChange = () => {
        if (isFromTransnistria) {
            setIsFromTransnistria(false); // Reset if already active
        } else {
            setIsFromTransnistria(true); // Activate
            setPersonIsExternal(false); // Deactivate the other
        }
    };

    const handlePersonIsExternalChange = () => {
        if (personIsExternal) {
            setPersonIsExternal(false); // Reset if already active
        } else {
            setPersonIsExternal(true); // Activate
            setIsFromTransnistria(false); // Deactivate the other
        }
    };

    // Calculate insurance end date based on start date if no checkbox is selected
    useEffect(() => {
        if (insuranceStartDate) {
            const startDate = new Date(insuranceStartDate);
            const endDate = new Date(startDate);
            endDate.setFullYear(startDate.getFullYear() + 1); // Date one year from start
            endDate.setDate(endDate.getDate() - 1); // End date is one day earlier
            setInsuranceEndDate(endDate.toISOString().split("T")[0]);
        } else {
            setInsuranceEndDate(""); // Reset end date if no start date is selected
        }
    }, [insuranceStartDate]);

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Дополнительные данные</h2>

                    {!isFromTransnistria && !personIsExternal && (
                        <div className="text-sm text-gray-500 mb-6">
                            Выберите если вы не являетесь резидентом Республики Молдова
                        </div>
                    )}

                    {/* Toggle Switches for exclusive selection */}
                    <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="IsFromTransnistria" className="text-sm font-medium text-gray-700">
                                Из Приднестровья
                            </label>
                            <div
                                className="relative inline-flex items-center cursor-pointer"
                                onClick={handleIsFromTransnistriaChange}
                            >
                                <input
                                    type="checkbox"
                                    id="IsFromTransnistria"
                                    checked={isFromTransnistria}
                                    onChange={handleIsFromTransnistriaChange}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                                        isFromTransnistria ? "bg-orange-500" : "bg-gray-200"
                                    }`}
                                >
                                    <div
                                        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                                            isFromTransnistria ? "translate-x-6" : "translate-x-0"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="PersonIsExternal" className="text-sm font-medium text-gray-700">
                                Иностранное лицо
                            </label>
                            <div
                                className="relative inline-flex items-center cursor-pointer"
                                onClick={handlePersonIsExternalChange}
                            >
                                <input
                                    type="checkbox"
                                    id="PersonIsExternal"
                                    checked={personIsExternal}
                                    onChange={handlePersonIsExternalChange}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                                        personIsExternal ? "bg-orange-500" : "bg-gray-200"
                                    }`}
                                >
                                    <div
                                        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                                            personIsExternal ? "translate-x-6" : "translate-x-0"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Possession Base Dropdown */}
                    <div className="mb-6">
                        <label htmlFor="possessionBase" className="block text-sm font-medium text-gray-700">
                            Тип владения
                        </label>
                        <select
                            id="possessionBase"
                            value={possessionBase}
                            onChange={(e) => setPossessionBase(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Выберите тип владения</option>
                            <option value="property">Имущество</option>
                            <option value="lease">Аренда</option>
                            <option value="leasing">Лизинг</option>
                            <option value="power_of_attorney">Доверенность</option>
                        </select>

                    </div>

                    {/* Date of birth field */}
                    {(isFromTransnistria || personIsExternal) && (
                        <div className="mb-6">
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                Введите вашу дату рождения
                            </label>
                            <input
                                type="date"
                                id="birthDate"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    )}

                    {/* Date of start and end insurance in the same row */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        {/* Start Date */}
                        <div className="flex-1">
                            <label htmlFor="insuranceStartDate" className="block text-sm font-medium text-gray-700">
                                Дата начала страховки
                            </label>
                            <input
                                type="date"
                                id="insuranceStartDate"
                                value={insuranceStartDate}
                                onChange={(e) => setInsuranceStartDate(e.target.value)}
                                className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex-1">
                            <label htmlFor="insuranceEndDate" className="block text-sm font-medium text-gray-700">
                                Дата конца страховки
                            </label>
                            <input
                                type="date"
                                id="insuranceEndDate"
                                value={insuranceEndDate}
                                disabled
                                className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                        >
                            Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalDataForm;
