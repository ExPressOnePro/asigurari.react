import React, { useMemo } from "react";

// Интерфейс для страховщика
interface Insurer {
    Name: string;
    IDNO: string;
    Description: string;
    PrimeSumMDL: string | number;
    is_active: boolean;
    logo?: string;
}

// Типизация пропсов компонента
interface InsurerListProps {
    insurers: Insurer[];
    handleInsurerSelect: (insurer: Insurer) => void;
    dictionary: any;
}

const InsurerList: React.FC<InsurerListProps> = ({ insurers, handleInsurerSelect, dictionary }) => {
    // Сортировка страховщиков по возрастанию PrimeSumMDL
    const sortedInsurers = useMemo(() => {
        return [...insurers].sort((a, b) => {
            const primeSumA = typeof a.PrimeSumMDL === "string" ? parseFloat(a.PrimeSumMDL) : a.PrimeSumMDL;
            const primeSumB = typeof b.PrimeSumMDL === "string" ? parseFloat(b.PrimeSumMDL) : b.PrimeSumMDL;
            return primeSumA - primeSumB;
        });
    }, [insurers]);

    const features = [
        { label: dictionary?.osago?.InsurerList.Features?.CoverageArea, value: "Moldova" },
        { label: dictionary?.osago?.InsurerList.Features?.CoverageArea, value: "Moldova" },
        { label: dictionary?.osago?.InsurerList.Features?.PropertyLimit, value: "100 000 €" },
        { label: dictionary?.osago?.InsurerList.Features?.HealthLimitEvent, value: "500 000 €" },
        { label: dictionary?.osago?.InsurerList.Features?.HealthLimitEvent, value: "100 000 €" },
        { label: dictionary?.osago?.InsurerList.Features?.InstantContractEmail, value: null },
        { label: dictionary?.osago?.InsurerList.Features?.OnlineRegistration, value: null }
    ];

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {sortedInsurers.map((insurer, index) => (
                    <div
                        key={index}
                        className={`border rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ${
                            insurer.is_active
                                ? "bg-white border-gray-200 hover:shadow-xl hover:scale-105"
                                : "bg-gray-50 border-gray-300 opacity-60"
                        }`}
                    >

                        <div className="p-6 flex items-center justify-between">
                            <p className="text-sm text-gray-600 font-bold">{insurer.Name}</p>
                            <img
                                src={insurer.logo || "/default-logo.png"}
                                alt={insurer.Name}
                                loading="lazy"
                                className={`h-10 object-contain ${!insurer.is_active && "grayscale"}`}
                            />
                        </div>

                        <div className="p-6">
                            {insurer.is_active && (
                                <div className="flex items-end justify-between mb-4">
                                    <p className="text-sm text-gray-500 font-bold">{dictionary?.osago?.InsurerList.Cost}</p>
                                    <div className="flex items-end">
                                        <div className="text-2xl font-bold text-orange-500">
                                            {typeof insurer.PrimeSumMDL !== "number"
                                                ? insurer.PrimeSumMDL?.split('.').map((part, index) => (
                                                    <span key={index}>
                                                          {index === 0 ? part : <span className="text-sm">{part}</span>}
                                                        {index === 0 && '.'}
                                                      </span>
                                                ))
                                                : insurer.PrimeSumMDL.toFixed(2).split('.').map((part, index) => (
                                                    <span key={index}>
                                                          {index === 0 ? part : <span className="text-sm">{part}</span>}
                                                        {index === 0 && '.'}
                                                      </span>
                                                ))}
                                        </div>
                                        <p className="text-sm text-gray-800 font-bold ml-2">MDL</p>
                                    </div>
                                </div>
                            )}
                            <ul className="space-y-3">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex justify-between text-sm text-gray-700">
                                        <span className="text-sm text-gray-600">
                                            <strong className="text-green-500 mr-2">✅</strong>
                                            {feature.label}
                                        </span>
                                        {feature.value && <span className="font-bold">{feature.value}</span>}
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
                                {insurer.is_active ? dictionary?.osago?.InsurerList.InsurerStatus.Available : dictionary?.osago?.InsurerList.InsurerStatus.Unavailable }
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsurerList;
