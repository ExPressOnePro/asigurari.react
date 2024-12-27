"use client";

import React, { useState } from "react";

export default function RCAForm() {
    const [idnp, setIdnp] = useState<string>("");
    const [carNumber, setCarNumber] = useState<string>("");
    const [showHint, setShowHint] = useState<boolean>(false); // Управление подсказкой

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ idnp, carNumber });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* IDNP/IDNO Field */}
                <div>
                    <label htmlFor="idnp" className="block text-sm font-medium text-gray-700">
                        IDNP/IDNO
                    </label>
                    <input
                        type="text"
                        id="idnp"
                        value={idnp}
                        onChange={(e) => setIdnp(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите IDNP/IDNO"
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
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Рассчитать
                    </button>
                </div>
            </form>

            {/* Additional Info */}
            <p className="text-sm text-gray-500 mt-6 text-center">
                Введите корректные данные для точного расчёта. Обработка данных защищена.
            </p>
        </>
    );
}
