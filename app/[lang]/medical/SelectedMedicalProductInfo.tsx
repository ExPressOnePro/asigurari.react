import React from "react";
import { useSelector } from "react-redux";
import {RootState} from "@/store/store.ts";


const SelectedMedicalProductInfo: React.FC = () => {
    const selectedProduct = useSelector((state: RootState) => state.medicalForm);

    if (!selectedProduct) {
        return (
            <div className="text-gray-500 italic text-center">
                Страховой продукт не выбран.
            </div>
        );
    }

    return (
        <div className="my-8 border border-gray-200 bg-gray-50 shadow-xl p-8 rounded-2xl max-w-6xl mx-auto mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Выбранный страховой продукт</h2>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-lg font-semibold text-blue-600">{selectedProduct.Name}</p>
                    <p className="text-sm text-gray-500">IDNO: {selectedProduct.IDNO}</p>
                </div>
                <img src={selectedProduct.logo || "/default-logo.png"} alt={selectedProduct.Name} className="h-10" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p><strong>Начало действия:</strong> {selectedProduct.startDate}</p>
                <p><strong>Конец действия:</strong> {selectedProduct.endDate}</p>
                <p><strong>Валюта:</strong> {selectedProduct.valiuta_}</p>
                <p><strong>Сумма покрытия:</strong> €{selectedProduct.SumaDeAsig}</p>
                <p><strong>COVID-19:</strong> {selectedProduct.SARS_COV19 ? "Да" : "Нет"}</p>
                <p><strong>Регион:</strong> {selectedProduct.RegiuniUIN}</p>
                <p><strong>Цель поездки:</strong> {selectedProduct.ScopulCalatorieiUIN}</p>
                <p><strong>Страна:</strong> {selectedProduct.TaraUIN}</p>
                <p><strong>Вид спорта:</strong> {selectedProduct.TipSportUIN}</p>
                <p><strong>Стоимость:</strong> {selectedProduct.PrimaTotalaLEI} Lei</p>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Застрахованные лица</h3>
                {selectedProduct.persons.length === 0 ? (
                    <p className="text-gray-500 italic">Нет добавленных персон.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {selectedProduct.persons.map((person, index) => (
                            <li key={index} className="py-2">
                                <p><strong>ФИО:</strong> {person.fullName}</p>
                                <p><strong>IDNP:</strong> {person.idnp}</p>
                                <p><strong>Дата рождения:</strong> {person.birthday}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
};

export default SelectedMedicalProductInfo;
