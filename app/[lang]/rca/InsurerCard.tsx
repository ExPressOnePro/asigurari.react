"use client";

import React from "react";

interface InsurerCardProps {
    name: string;
    idno: string;
    primeSum: string;
    primeSumMDL: string;
    isActive: boolean;
    logo: string;
    onSelect: (name: string, primeSum: string) => void;
}

const InsurerCard: React.FC<InsurerCardProps> = ({
                                                     name,
                                                     idno,
                                                     primeSum,
                                                     primeSumMDL,
                                                     isActive,
                                                     logo,
                                                     onSelect,
                                                 }) => {
    return (
        <div
            className={`max-w-sm w-full border rounded-lg shadow-lg transition-shadow duration-200 overflow-hidden ${
                isActive
                    ? "bg-white border-gray-300 hover:shadow-xl"
                    : "bg-gray-200 border-gray-200 opacity-70 cursor-not-allowed"
            }`}
        >
            <div className="bg-gray-50 p-4 flex items-center justify-center">
                <img
                    src={logo}
                    alt={name}
                    className={`h-20 object-contain ${!isActive && "grayscale"}`}
                />
            </div>

            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">{name}</h2>
                <div className="text-center text-xl font-bold text-orange-600 mb-4">
                    {primeSum} {primeSumMDL}
                </div>
                <hr className="my-4" />
            </div>

            <div className="p-4 text-center">
                <button
                    className={`${
                        isActive
                            ? "bg-orange-300 hover:bg-orange-600"
                            : "bg-gray-400 cursor-not-allowed"
                    } text-white font-semibold py-2 px-4 rounded-lg`}
                    disabled={!isActive}
                    onClick={() => isActive && onSelect(name, primeSum)} // Вызов onSelect при нажатии
                >
                    Выбрать
                </button>
            </div>
        </div>
    );
};

export default InsurerCard;
