import React, {useEffect, useState} from "react";
import axiosInstance from "@/lib/axiosInstance.ts";

const AdditionalDataForm = () => {
    const [isFromTransnistria, setIsFromTransnistria] = useState<boolean>(false);
    const [personIsExternal, setPersonIsExternal] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<string>("");
    const [insuranceStartDate, setInsuranceStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [insuranceEndDate, setInsuranceEndDate] = useState<string>("");
    const [possessionBase, setPossessionBase] = useState<string>('');
    const [vehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("218000136");

    // Car-related state variables
    const [productionYear, setProductionYear] = useState<number>(2025);
    const [cylinderVolume, setCylinderVolume] = useState<number>(2000);
    const [totalWeight, setTotalWeight] = useState<number>(2000);
    const [enginePower, setEnginePower] = useState<number>(200);
    const [seats, setSeats] = useState<number>(5);

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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        // Prepare form data
        const formData = {
            Company: {
                IDNO: "1010620005807",
            },
            InsuredPhysicalPerson: {
                IdentificationCode: "2005021106830",
                IsFromTransnistria: isFromTransnistria,
                IsExternal: personIsExternal,
                BirthDate: isFromTransnistria || personIsExternal ? birthDate : null
            },
            StartDate: insuranceStartDate,
            PossessionBase: possessionBase,
            OperatingMode: "Usual",
            InsuredVehicle: {
                ProductionYear: isFromTransnistria || personIsExternal ? productionYear : null,
                RegistrationCertificateNumber: vehicleRegistrationCertificateNumber,
                CilinderVolume: isFromTransnistria || personIsExternal ?cylinderVolume : null,
                TotalWeight: isFromTransnistria || personIsExternal ? totalWeight : null,
                EnginePower: isFromTransnistria || personIsExternal ? enginePower : null,
                Seats: isFromTransnistria || personIsExternal ? seats : null
            }
        };

        const response = axiosInstance.post("/rca/save-rca/", formData);
    };

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="w-full max-w-3xl">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
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
                            <option value="Property">Имущество</option>
                            <option value="Lease">Аренда</option>
                            <option value="Leasing">Лизинг</option>
                            <option value="PowerOfAttorney">Доверенность</option>
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

                    {/* Car Data Section */}
                    {(isFromTransnistria || personIsExternal) && (
                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Данные автомобиля</h3>

                            {/* Production Year */}
                            <div className="mb-4">
                                <label htmlFor="productionYear" className="block text-sm font-medium text-gray-700">
                                    Год производства
                                </label>
                                <input
                                    type="number"
                                    id="productionYear"
                                    value={productionYear}
                                    onChange={(e) => setProductionYear(Number(e.target.value))}
                                    className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    min="1900"
                                    max={new Date().getFullYear() + 10} // Assuming future 10 years
                                    required
                                />
                            </div>

                            {/* Cylinder Volume */}
                            <div className="mb-4">
                                <label htmlFor="cylinderVolume" className="block text-sm font-medium text-gray-700">
                                    Объем цилиндров (см³)
                                </label>
                                <input
                                    type="number"
                                    id="cylinderVolume"
                                    value={cylinderVolume}
                                    onChange={(e) => setCylinderVolume(Number(e.target.value))}
                                    className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Total Weight */}
                            <div className="mb-4">
                                <label htmlFor="totalWeight" className="block text-sm font-medium text-gray-700">
                                    Общий вес (кг)
                                </label>
                                <input
                                    type="number"
                                    id="totalWeight"
                                    value={totalWeight}
                                    onChange={(e) => setTotalWeight(Number(e.target.value))}
                                    className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Engine Power */}
                            <div className="mb-4">
                                <label htmlFor="enginePower" className="block text-sm font-medium text-gray-700">
                                    Мощность двигателя (л.с.)
                                </label>
                                <input
                                    type="number"
                                    id="enginePower"
                                    value={enginePower}
                                    onChange={(e) => setEnginePower(Number(e.target.value))}
                                    className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Seats */}
                            <div className="mb-4">
                                <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
                                    Количество мест
                                </label>
                                <input
                                    type="number"
                                    id="seats"
                                    value={seats}
                                    onChange={(e) => setSeats(Number(e.target.value))}
                                    className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    min="1"
                                    required
                                />
                            </div>
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
                </form>
            </div>
        </div>
    );
};

export default AdditionalDataForm;
