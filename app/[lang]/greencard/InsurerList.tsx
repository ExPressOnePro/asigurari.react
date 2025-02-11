import React, {useMemo} from "react";
import {Insurer} from "@/app/[lang]/greencard/types.ts";

// Типизация пропсов компонента
interface InsurerListProps {
    insurers: Insurer[];
    handleInsurerSelect: (insurer: Insurer) => void;
}

const InsurerList: React.FC<InsurerListProps> = ({insurers, handleInsurerSelect}) => {

    const sortedInsurers = useMemo(() => {
        return [...insurers].sort((a, b) => {
            const primeSumA = typeof a.PrimeSumMDL === "string" ? parseFloat(a.PrimeSumMDL) : a.PrimeSumMDL;
            const primeSumB = typeof b.PrimeSumMDL === "string" ? parseFloat(b.PrimeSumMDL) : b.PrimeSumMDL;
            return primeSumA - primeSumB;
        });
    }, [insurers]);

    const features = [
        {label: "Лимиты по нормам страны", value: null},
        {label: "Полис страхования на email", value: null},
        {label: "Онлайн регистрация полиса в RCAData", value: null},
    ];

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto sm:w-auto">
                {sortedInsurers.map((insurer, index) => (
                    <div
                        key={index}
                        className={`max-w-sm w-full border rounded-xl shadow-lg transition-transform duration-300 overflow-hidden ${
                            insurer.is_active
                                ? "bg-white border-gray-200 hover:shadow-xl hover:scale-105"
                                : "bg-gray-50 border-gray-300 opacity-60"
                        }`}
                    >
                        {/* Логотип страховщика */}

                        <div className="p-6 flex items-end w-full mb-4 justify-between">
                            <p className="text-sm text-gray-400 font-bold">{insurer.Name}</p>
                            <div className="flex items-end">
                                <img
                                    src={insurer.logo || "/default-logo.png"}
                                    alt={insurer.Name}
                                    loading="lazy"
                                    className={`h-10 object-contain ${!insurer.is_active && "grayscale"}`}
                                />
                            </div>
                        </div>

                        <div className="p-6">
                            {insurer.is_active && (
                                <div className="flex items-end justify-between w-full mb-4">
                                    <p className="text-sm text-gray-400 font-bold">Стоимость:</p>
                                    <div className="flex items-end">
                                        <div className="text-2xl font-bold text-orange-500">
                                            {typeof insurer.PrimeSumMDL !== "number"
                                                ? insurer.PrimeSumMDL?.split('.').map((part, index) => (
                                                    <span key={index}>
                {index === 0 ? part : (
                    <span className="text-sm">{part}</span>
                )}
                                                        {index === 0 && '.'}
            </span>
                                                ))
                                                : (
                                                    insurer.PrimeSumMDL.toFixed(2).split('.').map((part, index) => (
                                                        <span key={index}>
                    {index === 0 ? part : (
                        <span className="text-sm">{part}</span>
                    )}
                                                            {index === 0 && '.'}
                </span>
                                                    ))
                                                )}
                                        </div>

                                        <p className="text-sm text-gray-800 font-bold ml-2">MDL</p>
                                    </div>
                                </div>

                            )}
                            <ul className="space-y-3">
                                {features.map((feature, index) => (
                                    <li key={index}
                                        className="flex items-end justify-between w-full text-sm text-gray-700">
            <span className="text-sm text-gray-600 font-sans">
                <strong className="text-green-500 mr-2 text-md">✅︎</strong>
                {feature.label}:
            </span>
                                        {feature.value && <span className="mr-2 font-bold">{feature.value}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>

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
};

export default InsurerList;
