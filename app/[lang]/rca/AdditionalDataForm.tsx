import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setAdditionalCarInfo, setAdditionalData} from "@/store/insuranceFormSlice";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

interface AdditionalDataFormProps {
    onStepChange: any;
}

const AdditionalDataForm: React.FC<AdditionalDataFormProps> = React.memo(({onStepChange}) => {
    const dispatch = useDispatch();
    const {dictionary} = useLocalization();

    const [isFromTransnistria, setIsFromTransnistria] = useState<boolean>(false);
    const [personIsExternal, setPersonIsExternal] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<string>("2001-03-30");
    const [insuranceStartDate, setInsuranceStartDate] = useState<string>("");
    const [insuranceEndDate, setInsuranceEndDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [possessionBase, setPossessionBase] = useState<{ value: string; label: string } | null>(null);
    const shouldShowDetails = isFromTransnistria || personIsExternal;

    const [additionalCarInfoForm, setAdditionalCarInfoForm] = useState({
        ProductionYear: 0,
        CilinderVolume: 0,
        TotalWeight: 0,
        EnginePower: 0,
        Seats: 0,
    });

    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        setInsuranceStartDate(currentDate);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAdditionalCarInfoForm((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

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

    const validateForm = () => {
        if (!possessionBase) {
            setError("Выберите тип владения");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        dispatch(setAdditionalData({
            IsFromTransnistria: isFromTransnistria,
            PersonIsExternal: personIsExternal,
            StartDate: insuranceStartDate,
            BirthDate: birthDate,
            PossessionBase: possessionBase,
            DocumentPossessionBaseDate: insuranceStartDate,
        }));

        dispatch(setAdditionalCarInfo({
            ProductionYear: additionalCarInfoForm.ProductionYear,
            CilinderVolume: additionalCarInfoForm.CilinderVolume,
            TotalWeight: additionalCarInfoForm.TotalWeight,
            EnginePower: additionalCarInfoForm.EnginePower,
            Seats: additionalCarInfoForm.Seats,
        }));

        onStepChange(4);
        setIsSubmitting(false);
    };


    return (
        <form onSubmit={handleSubmit} className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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


                    {/* Date of birth field */}
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

                    {shouldShowDetails && (
                        <div className="p-4 border border-gray-300 rounded-lg mb-6 bg-white shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Дополнительные данные</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {label: "Год выпуска", name: "ProductionYear", type: "number"},
                                    {label: "Объем двигателя (см³)", name: "CilinderVolume", type: "number"},
                                    {label: "Масса (кг)", name: "TotalWeight", type: "number"},
                                    {label: "Мощность двигателя (л.с.)", name: "EnginePower", type: "number"},
                                    {label: "Кол-во мест", name: "Seats", type: "number"},
                                ].map((field) => (
                                    <div key={field.name} className="flex flex-col">
                                        <label className="text-sm text-gray-600">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={additionalCarInfoForm[field.name as keyof typeof additionalCarInfoForm]}
                                            onChange={handleChange}
                                            className="p-2 border rounded-md focus:ring focus:ring-orange-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Possession Base Dropdown */}
                    <div className="mb-6">
                        <label htmlFor="possessionBase" className="block text-sm font-medium text-gray-700">
                            Тип владения
                        </label>
                        <select
                            id="possessionBase"
                            value={possessionBase?.value || ""}
                            onChange={(e) => {
                                const selectedOption = e.target.options[e.target.selectedIndex];
                                setPossessionBase({
                                    value: selectedOption.value,
                                    label: selectedOption.text,
                                });
                            }}
                            className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Выберите тип владения</option>
                            <option value="Property">Собственность</option>
                            <option value="Lease">Аренда</option>
                            <option value="Leasing">Лизинг</option>
                            <option value="PowerOfAttorney">Доверенность</option>
                        </select>

                    </div>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
                            disabled={isSubmitting}
                            className={`w-full ${isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 px-4 rounded-lg shadow-md`}
                        >
                            {isSubmitting ? "Загрузка..." : "Перейти к оплате"}
                        </button>

                    </div>
                </div>
            </div>
        </form>
    )
        ;
});

export default AdditionalDataForm;
