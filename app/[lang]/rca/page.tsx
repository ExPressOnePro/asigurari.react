"use client";

import { Locale } from "@/i18n.config";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/dictionary";
import axiosInstance from "@/lib/axiosInstance";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm";

export default function Page({ params }: { params: { lang: Locale } }) {
    const [dictionary, setDictionary] = useState<any>(null);

    useEffect(() => {
        // Загрузка словаря
        const loadDictionary = async () => {
            const dict = await getDictionary(params.lang);
            setDictionary(dict);
        };
        loadDictionary();
    }, [params.lang]);

    const [IDNX, setIDNX] = useState<string>("2005021106830");
    const [VehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("218000136");
    const [OperatingModes, setOperatingModes] = useState<string>("1");
    const [PersonIsJuridical, setPersonIsJuridical] = useState<boolean>(false);
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [insurers, setInsurers] = useState<any[]>([]); // Состояние для страховщиков
    const [calculatedData, setCalculatedData] = useState<{
        vehicleMark: string;
        vehicleModel: string;
        vehicleRegistrationNumber: string;
        bonusMalusClass: number;
        personFirstName: string;
        personLastName: string;
    } | null>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // Состояние для контроля видимости формы
    const [selectedInsurer, setSelectedInsurer] = useState<any | null>(null); // Состояние для выбранного страховщика

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
            const response = await axiosInstance.post("/rca/calculate-rca/", requestData);
            const result = response.data;

            setCalculatedData({
                vehicleMark: result.VehicleMark,
                vehicleModel: result.VehicleModel,
                vehicleRegistrationNumber: result.VehicleRegistrationNumber,
                bonusMalusClass: result.BonusMalusClass,
                personFirstName: result.PersonFirstName,
                personLastName: result.PersonLastName,
            });

            setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);  // Заполняем список страховщиков
            setSuccess(true);
            setFormSubmitted(true); // Скрыть форму после успешной отправки
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setError("Произошла ошибка при расчетах");
        }
    };

    const handleInsurerSelect = (insurer: any) => {
        setSelectedInsurer(insurer); // Сохраняем выбранного страховщика
    };

    const [additionalData, setAdditionalData] = useState<any>({
        contactName: "",
        contactPhone: "",
        contactEmail: "",
    });
    // Функция для обработки отправки формы с дополнительными данными
    const handleAdditionalDataSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь можно отправить данные на сервер или выполнить другие действия
        console.log("Дополнительные данные:", additionalData);
    };
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Расчет стоимости ОСАГО
                </h1>

                {/* Скрываем форму после отправки */}
                {!formSubmitted && (
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
                )}

                {error && (
                    <div className="mt-4 text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800">Резутаты расчета:</h2>
                        <p className="mt-2 text-sm text-gray-700"><strong>Марка автомобиля:</strong> {calculatedData?.vehicleMark}</p>
                        <p className="mt-2 text-sm text-gray-700"><strong>Модель автомобиля:</strong> {calculatedData?.vehicleModel}</p>
                        <p className="mt-2 text-sm text-gray-700"><strong>Номер регистрации:</strong> {calculatedData?.vehicleRegistrationNumber}</p>
                        <p className="mt-2 text-sm text-gray-700"><strong>Класс бонус-малус:</strong> {calculatedData?.bonusMalusClass}</p>
                        <p className="mt-2 text-sm text-gray-700"><strong>Имя владельца:</strong> {calculatedData?.personFirstName}</p>
                        <p className="mt-2 text-sm text-gray-700"><strong>Фамилия владельца:</strong> {calculatedData?.personLastName}</p>
                    </div>
                )}

                {/* Проверяем, есть ли выбранный страховщик */}
                {selectedInsurer ? (
                    <div>
                        <div
                            className="max-w-sm w-full mt-4 border rounded-lg shadow-lg transition-shadow duration-200 overflow-hidden bg-white hover:shadow-xl">
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                                    Информация о страховщике
                                </h2>
                                <div
                                    className="bg-gray-50 p-4 rounded-lg flex items-center justify-center shadow-inner mb-4">
                                    <img
                                        src={selectedInsurer.logo || "/default-logo.png"}
                                        alt={selectedInsurer.Name}
                                        className="h-16 w-16 object-contain"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {selectedInsurer.Name}
                                    </h3>
                                    <p className="text-xl font-bold text-orange-600 mb-4">
                                        {selectedInsurer.PrimeSumMDL} MDL
                                    </p>
                                </div>
                                <div className="flex items-center justify-center mt-4">
            <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedInsurer.is_active
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                }`}
            >
                {selectedInsurer.is_active ? "Активен" : "Неактивен"}
            </span>
                                </div>
                            </div>
                        </div>


                        {/* Форма для дополнительных данных */}
                        <form onSubmit={handleAdditionalDataSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Дополнительные данные</h3>

                            {/* Поля формы для дополнительных данных */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700">
                                        Контактное имя
                                    </label>
                                    <input
                                        type="text"
                                        id="contactName"
                                        value={additionalData.contactName}
                                        onChange={(e) =>
                                            setAdditionalData({...additionalData, contactName: e.target.value})
                                        }
                                        className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Введите контактное имя"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-700">
                                        Контактный телефон
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactPhone"
                                        value={additionalData.contactPhone}
                                        onChange={(e) =>
                                            setAdditionalData({ ...additionalData, contactPhone: e.target.value })
                                        }
                                        className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Введите контактный телефон"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-700">
                                        Контактный email
                                    </label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        value={additionalData.contactEmail}
                                        onChange={(e) =>
                                            setAdditionalData({ ...additionalData, contactEmail: e.target.value })
                                        }
                                        className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Введите контактный email"
                                        required
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                                    >
                                        Отправить данные
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    // Если страховщик не выбран, показываем список
                    insurers.length > 0 && (
                        <div className="mt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                                {insurers.map((insurer, index) => (
                                    <div
                                        key={index}
                                        className={`max-w-sm w-full border rounded-xl shadow-lg transition-transform duration-300 overflow-hidden ${
                                            insurer.is_active
                                                ? "bg-white border-gray-200 hover:shadow-xl hover:scale-105"
                                                : "bg-gray-100 border-gray-300 opacity-80"
                                        }`}
                                    >
                                        {/* Логотип страховщика */}
                                        <div className="bg-gray-50 p-6 flex items-center justify-center">
                                            <img
                                                src={insurer.logo || "/default-logo.png"}
                                                alt={insurer.Name}
                                                className={`h-20 object-contain ${
                                                    !insurer.is_active && "grayscale"
                                                }`}
                                            />
                                        </div>

                                        {/* Информация о страховщике */}
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-800 text-center mb-4">
                                                {insurer.Name}
                                            </h3>
                                            <div className="text-center text-2xl font-bold text-orange-500 mb-6">
                                                {insurer.PrimeSumMDL} MDL
                                            </div>

                                            {/* Список характеристик */}
                                            <ul className="space-y-3">
                                                <li className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✔</span>
                                                    Территория покрытия: Moldova
                                                </li>
                                                <li className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✔</span>
                                                    Лимит по имуществу: 100 000 €
                                                </li>
                                                <li className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✔</span>
                                                    Лимит по здоровью (event): 500 000 €
                                                </li>
                                                <li className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✔</span>
                                                    Лимит по здоровью (event): 100 000 €
                                                </li>
                                                <li className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✔</span>
                                                    Моментальное получение договора на email
                                                </li>
                                                <li className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✔</span>
                                                    Онлайн регистрация полиса в RCAData
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Кнопка выбора */}
                                        <div className="p-6 text-center">
                                            <button
                                                className={`${
                                                    insurer.is_active
                                                        ? "bg-orange-500 hover:bg-orange-600"
                                                        : "bg-gray-400 cursor-not-allowed"
                                                } text-white font-medium py-2 px-6 rounded-full transition duration-200`}
                                                disabled={!insurer.is_active}
                                                onClick={() => insurer.is_active && handleInsurerSelect(insurer)}
                                            >
                                                {insurer.is_active ? "Выбрать" : "Недоступно"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    )
                )}

            </div>
        </div>
    );
}
