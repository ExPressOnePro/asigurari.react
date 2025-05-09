import { useDispatch } from "react-redux";
import { setInsurerInfo } from "@/store/MedicalFormSlice.ts";
import { InsuranceProduct } from "@/types/medicalInsurance";

type Props = {
    products: InsuranceProduct[];
};

const InsuranceProductCardList = ({ products }: Props) => {
    const dispatch = useDispatch();

    const handleSelectInsurer = (product: InsuranceProduct) => {
        dispatch(setInsurerInfo(product));
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-10">
                Выберите страховщика
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {products.length === 0 ? (
                    <p className="text-center text-gray-600">Нет доступных продуктов для отображения.</p>
                ) : (
                    products.map((product, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ${
                                product.is_active
                                    ? "bg-white border-gray-200 hover:shadow-xl hover:scale-105"
                                    : "bg-gray-50 border-gray-300 opacity-60"
                            }`}
                        >
                            <div className="p-6 flex items-center justify-between">
                                <p className="text-sm text-gray-600 font-bold">{product.Name}</p>
                                <img
                                    src={product.logo || "/default-logo.png"}
                                    alt={product.Name}
                                    loading="lazy"
                                    className={`h-10 object-contain ${!product.is_active && "grayscale"}`}
                                />
                            </div>

                            <div className="p-6 divide-y divide-gray-200">
                                <div className="flex items-end justify-between mb-4">
                                    <p className="text-sm text-gray-500 font-bold">Стоимость</p>
                                    <div className="flex items-end">
                                        <div className="text-2xl font-bold text-orange-500">
                                            {typeof product.PrimaTotalaLEI !== "number"
                                                ? "—"
                                                : product.PrimaTotalaLEI.toFixed(2).split('.').map((part, idx) => (
                                                    <span key={idx}>
                              {idx === 0 ? part : <span className="text-sm">{part}</span>}
                                                        {idx === 0 && '.'}
                            </span>
                                                ))}
                                        </div>
                                        <p className="text-sm text-gray-800 font-bold ml-2">Lei</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 divide-y divide-gray-200 py-2">
                                    <li className="flex justify-between text-sm text-gray-700">
                    <span className="text-sm text-gray-600">
                      Покрытие: {product.SumaDeAsig} €
                    </span>
                                    </li>
                                    <li className="flex justify-between text-sm text-gray-700 py-2">
                    <span className="text-sm text-gray-600">
                      <strong className="text-green-500 mr-2">✅</strong>
                      Страхование от COVID-19: {product.SARS_COV19 ? "Да" : "Нет"}
                    </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-4">
                                <button
                                    onClick={() => handleSelectInsurer(product)}
                                    disabled={!product.is_active}
                                    className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
                                        product.is_active ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Выбрать
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InsuranceProductCardList;
