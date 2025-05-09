import React, { useState } from "react";

const PaymentMethodSelector: React.FC = () => {
    const [method, setMethod] = useState<"qr" | "card" | null>(null);

    return (
        <div className="max-w-md mx-auto p-4 rounded-xl shadow-lg bg-white space-y-4">
            <h2 className="text-xl font-semibold text-center">Выберите способ оплаты</h2>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setMethod("qr")}
                    className={`p-4 border rounded-lg text-center transition ${
                        method === "qr" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                >
                    📱 QR-код
                </button>

                <button
                    onClick={() => setMethod("card")}
                    className={`p-4 border rounded-lg text-center transition ${
                        method === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                >
                    💳 Банковская карта
                </button>
            </div>

            {method === "qr" && (
                <div className="mt-4 text-center">
                    <p className="mb-2">Отсканируйте QR-код для оплаты:</p>
                    <img src="/placeholder-qr.png" alt="QR-код" className="w-40 h-40 mx-auto" />
                </div>
            )}

            {method === "card" && (
                <div className="mt-4 space-y-2">
                    <p className="text-center">Введите данные карты:</p>
                    <input
                        type="text"
                        placeholder="Номер карты"
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Срок действия (MM/YY)"
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                    <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Оплатить
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodSelector;
