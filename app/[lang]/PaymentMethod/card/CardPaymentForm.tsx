import React from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import axiosInstance from "@/lib/axiosInstance.ts";


export default function CardPaymentForm() {
    const medicalData = useSelector((state: RootState) => state.medicalForm);
    const payload = {
        amount: medicalData.PrimaTotalaLEI,
            description: medicalData.Name || "Медицинская страховка",
        items: [
            {
                name: medicalData.Name,
                quantity: 1,
                price: medicalData.PrimaTotalaLEI
            }
        ]
    };

    const handleSubmit = async () => {
        console.log('📤 Отправка данных (карта):', payload);
        try {
            const res = await axiosInstance.post('/maib/create_payment/', payload);
            console.log('✅ Ответ сервера:', res.data);
        } catch (err) {
            console.error('❌ Ошибка запроса:', err);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-6 p-4 border rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">Оплата картой</h3>
            <p><strong>Сумма:</strong> {medicalData.PrimaTotalaLEI}</p>
            <p><strong>Описание:</strong> {medicalData.Name}</p>

            <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Отправить
            </button>
        </div>
    );
}
