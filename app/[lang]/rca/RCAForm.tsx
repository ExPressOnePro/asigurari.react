import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import InsurerCard from "@/app/[lang]/rca/InsurerCard";

interface RCAFormProps {
    onCalculationSuccess: (data: {
        vehicleMark: string;
        vehicleModel: string;
        vehicleRegistrationNumber: string;
        bonusMalusClass: number;
        personFirstName: string;
        personLastName: string;
    }) => void;
}

const RCAForm: React.FC<RCAFormProps> = ({ onCalculationSuccess }) => {
    const [IDNX, setIDNX] = useState<string>("2005021106830");
    const [VehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("218000136");
    const [OperatingModes, setOperatingModes] = useState<string>("1");
    const [PersonIsJuridical, setPersonIsJuridical] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [insurers, setInsurers] = useState<Array<any>>([]);  // Состояние для страховщиков
    const [selectedInsurer, setSelectedInsurer] = useState<any>(null);  // Состояние для выбранного страховщика

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConsentGiven) {
            setError("Вы должны дать согласие на обработку персональных данных.");
            return;
        }

        const requestData = {
            IDNX: IDNX,
            VehicleRegistrationCertificateNumber: VehicleRegistrationCertificateNumber,
            OperatingModes: OperatingModes,
            PersonIsJuridical: PersonIsJuridical,
        };

        try {
            const response = await axiosInstance.post("rca/calculate-rca/", requestData);
            const result = response.data;

            onCalculationSuccess({
                vehicleMark: result.VehicleMark,
                vehicleModel: result.VehicleModel,
                vehicleRegistrationNumber: result.VehicleRegistrationNumber,
                bonusMalusClass: result.BonusMalusClass,
                personFirstName: result.PersonFirstName,
                personLastName: result.PersonLastName,
            });

            setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);  // Заполняем список страховщиков
            setSuccess(true);
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setError("Произошла ошибка при расчетах");
        }
    };

    const handleInsurerSelect = (insurer: any) => {
        setSelectedInsurer(insurer);  // Заполняем выбранного страховщика
    };

    return (
        <>
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                            Рассчитайте стоимость ОСАГО
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Поля формы */}
                            <div>
                                <label htmlFor="idnx" className="block text-sm font-bold text-gray-700">
                                    IDNP/IDNO
                                </label>
                                <input
                                    type="text"
                                    id="IDNX"
                                    value={IDNX}
                                    onChange={(e) => setIDNX(e.target.value)}
                                    className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Введите IDNP/IDNO"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="vehicleRegCertificateNumber" className="block text-sm font-bold text-gray-700">
                                    Номер техпаспорта
                                </label>
                                <input
                                    type="text"
                                    id="VehicleRegistrationCertificateNumber"
                                    value={VehicleRegistrationCertificateNumber}
                                    onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                                    className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Введите номер техпаспорта"
                                    required
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <div
                                    className={`${isConsentGiven ? "bg-green-500" : "bg-gray-400"} relative inline-block w-16 h-8 rounded-full cursor-pointer`}
                                    onClick={() => setIsConsentGiven(!isConsentGiven)}
                                >
                                    <span
                                        className={`${isConsentGiven ? "translate-x-8" : "translate-x-0"} inline-block w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300`}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-center space-x-2">
                                    <label htmlFor="consent" className="text-sm text-gray-700 flex-grow">
                                        Согласие на обработку данных
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        checked={isConsentGiven}
                                        onChange={() => setIsConsentGiven(!isConsentGiven)}
                                        className="sr-only"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={!isConsentGiven}
                                    className={`w-full ${isConsentGiven ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"} text-white font-semibold py-2 px-4 rounded-lg shadow-md`}
                                >
                                    Рассчитать
                                </button>
                            </div>
                        </form>

                        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}




                    </div>
                </div>
            </div>
        </>
    );
};

export default RCAForm;
