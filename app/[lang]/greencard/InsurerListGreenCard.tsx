import React, { useCallback, useMemo } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setSelectedInsurer } from "@/store/greenCardFormSlice.ts";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";
import {RootState} from "@/store/store.ts";
import {getStaticUrl} from "@/app/[lang]/components/Footer.tsx";

// Интерфейс для страховщика
interface Insurer {
    Name: string;
    IDNO: string;
    PrimeSum: string;
    PrimeSumMDL: string | number;
    is_active: boolean;
    logo?: string;
}

// Типизация пропсов компонента

interface InsurerListProps {
    onStepChange: (nextStep: number) => void;
}

const InsurerList: React.FC<InsurerListProps> = ({ onStepChange }) => {
    const dispatch = useDispatch();
    const { dictionary } = useLocalization();
    const insurers = useSelector((state: RootState) => state.greenCardForm.apiData.InsurerPrimeRCAE);

    const sortedInsurers = useMemo(() => {
        return [...insurers].sort((a, b) => {
            const primeSumA = typeof a.PrimeSumMDL === "string" ? parseFloat(a.PrimeSumMDL) : a.PrimeSumMDL;
            const primeSumB = typeof b.PrimeSumMDL === "string" ? parseFloat(b.PrimeSumMDL) : b.PrimeSumMDL;
            return primeSumA - primeSumB;
        });
    }, [insurers]);

    const features = [
        { label: dictionary?.RCE?.ILGC?.CoverageArea},
        { label: dictionary?.RCE?.ILGC?.email},
        { label: dictionary?.RCE?.ILGC?.online},
    ];

    const handleSelectInsurer = useCallback(
        (insurer: Insurer | null) => {
            console.log('Selected insurer:', insurer);
            if (!insurer) {
                console.error("Ошибка: выбранный страховщик пустой!", insurer);
                return;
            }

            const primeSumMDL = typeof insurer.PrimeSumMDL === "string" ? parseFloat(insurer.PrimeSumMDL) : insurer.PrimeSumMDL;
            dispatch(setSelectedInsurer({
                Name: insurer.Name,
                IDNO: insurer.IDNO,
                PrimeSum: insurer.PrimeSum,
                PrimeSumMDL: primeSumMDL,
                is_active: insurer.is_active,
                logo: insurer.logo
            }));
            // onSelectInsurer(insurer);
            onStepChange(3);  // Убедитесь, что шаг меняется
        },
        [dispatch, onStepChange]
    );

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-10">
                {dictionary?.RCE?.ILGC?.SelectInsurer}
            </h1>
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
                                src={insurer.logo || getStaticUrl('public/default-logo.png')}
                                alt={insurer.Name}
                                loading="lazy"
                                className={`h-10 object-contain ${!insurer.is_active && "grayscale"}`}
                            />
                        </div>

                        <div className="p-6">
                            {insurer.is_active && (
                                <div className="flex items-end justify-between mb-4">
                                    <p className="text-sm text-gray-500 font-bold">{dictionary?.RCE?.ILGC?.Cost}</p>
                                    <div className="flex items-end">
                                        <div className="text-2xl font-bold text-orange-500">
                                            {typeof insurer.PrimeSumMDL !== "number"
                                                ? (insurer.PrimeSumMDL && typeof insurer.PrimeSumMDL === "string"
                                                    ? insurer.PrimeSumMDL.split('.').map((part, index) => (
                                                        <span key={index}>
                    {index === 0 ? part : <span className="text-sm">{part}</span>}
                                                            {index === 0 && '.'}
                </span>
                                                    ))
                                                    : "—") // Если значение null или undefined
                                                : (insurer.PrimeSumMDL as number).toFixed(2).split('.').map((part, index) => (
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
                                onClick={() => handleSelectInsurer(insurer)}
                            >
                                {insurer.is_active
                                    ? dictionary?.RCE?.ILGC?.Available
                                    : dictionary?.RCE?.ILGC?.Unavailable}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsurerList;
