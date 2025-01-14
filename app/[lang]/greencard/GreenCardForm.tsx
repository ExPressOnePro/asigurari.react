"use client";

import React, { useState } from "react";

export default function GreenCardForm() {
    const [zone, setZone] = useState<string>("");
    const [term, setTerm] = useState<string>("");
    const [idnp, setIdnp] = useState<string>("");
    const [carNumber, setCarNumber] = useState<string>("");
    const [showHint, setShowHint] = useState<boolean>(false); // Управление подсказкой

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Форматирование данных перед отправкой
        const data = {
            GreenCardZone: zone,
            TermInsurance: term,
            IDNX: idnp,
            VehicleRegistrationCertificateNumber: carNumber,
        };

        // Отправка данных на сервер (пример с использованием fetch)
        try {
            const response = await fetch("/api/green-card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Зеленая карта успешно оформлена!");
            } else {
                console.error("Ошибка при оформлении Зеленой Карты");
            }
        } catch (error) {
            console.error("Ошибка сервера:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
                Оформление Зеленой Карты
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Coverage Zone Field */}
                <div>
                    <label htmlFor="zone" className="block text-sm font-medium text-gray-700">
                        Зона покрытия
                    </label>
                    <select
                        id="zone"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Выберите зону покрытия</option>
                        <option value="Europe">Европа</option>
                        <option value="Asia">Азия</option>
                        <option value="Africa">Африка</option>
                    </select>
                </div>

                {/* Term of Validity Field */}
                <div>
                    <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                        Срок действия
                    </label>
                    <select
                        id="term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Выберите срок действия</option>
                        <option value="1 year">1 год</option>
                        <option value="3 years">3 года</option>
                        <option value="5 years">5 лет</option>
                    </select>
                </div>

                {/* IDNP/IDNO Field */}
                <div>
                    <label htmlFor="idnp" className="block text-sm font-medium text-gray-700">
                        DNP/IDNO
                    </label>
                    <input
                        type="text"
                        id="idnp"
                        value={idnp}
                        onChange={(e) => setIdnp(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите DNP/IDNO"
                        required
                    />
                </div>

                {/* Car Passport Number Field */}
                <div className="relative">
                    <label htmlFor="carNumber" className="block text-sm font-medium text-gray-700">
                        Номер техпаспорта авто
                    </label>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            id="carNumber"
                            value={carNumber}
                            onChange={(e) => setCarNumber(e.target.value)}
                            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введите номер техпаспорта"
                            required
                        />
                        {/* Info Icon */}
                        <button
                            type="button"
                            onMouseEnter={() => setShowHint(true)} // Показываем подсказку при наведении
                            onMouseLeave={() => setShowHint(false)} // Скрываем подсказку при уходе мыши
                            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M12 18.5C7.30558 18.5 3.5 14.6944 3.5 10S7.30558 1.5 12 1.5 20.5 5.30558 20.5 10 16.6944 18.5 12 18.5z"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Hint Popup */}
                    {showHint && (
                        <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                            <img
                                src="/techpass.png"
                                alt="Подсказка для ввода номера техпаспорта"
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Оформить
                    </button>
                </div>
            </form>

            {/* Additional Info */}
            <p className="text-sm text-gray-500 mt-6 text-center">
                Введите корректные данные для оформления Зеленой Карты. Обработка данных защищена.
            </p>
        </div>
    );
}
