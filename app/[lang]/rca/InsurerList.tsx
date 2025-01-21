import React from "react";
import {getStaticUrl} from "@/app/[lang]/components/Footer.tsx";

// Интерфейс для страховщика
interface Insurer {
    Name: string;
    Description: string;
    PrimeSumMDL: string | number;
    is_active: boolean;
    logo?: string;
}

// Типизация пропсов компонента
interface InsurerListProps {
    insurers: Insurer[];
    handleInsurerSelect: (insurer: Insurer) => void;
}

const InsurerList: React.FC<InsurerListProps> = ({insurers, handleInsurerSelect}) => (
    <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Выберите страховщика:</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-6xl">
            {insurers.map((insurer, index) => (
                <div
                    key={index}
                    className={`max-w-sm w-full border rounded-xl shadow-lg transition-transform duration-300 overflow-hidden ${
                        insurer.is_active
                            ? "bg-white border-gray-200 hover:shadow-xl hover:scale-105"
                            : "bg-gray-50 border-gray-300 opacity-60" // Тусклый стиль для неактивных
                    }`}
                >
                    {/* Логотип страховщика */}
                    <div className="bg-gray-50 p-6 flex items-center justify-center">
                        <img
                            src={insurer.logo || getStaticUrl('public/default-logo.png')}
                            alt={insurer.Name}
                            className={`h-20 object-contain ${!insurer.is_active && "grayscale"}`}
                        />
                    </div>

                    {/* Информация о страховщике */}
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 text-center mb-4">
                            {insurer.Name}
                        </h3>

                        {/* Цена отображается только если страховщик активен */}
                        {insurer.is_active && (
                            <div className="text-center text-2xl font-bold text-orange-500 mb-6">
                                {insurer.PrimeSumMDL} MDL
                            </div>
                        )}

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
);

export default InsurerList;
