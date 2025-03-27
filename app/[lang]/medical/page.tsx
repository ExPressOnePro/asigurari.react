"use client"
import Head from "next/head";
import { useState } from "react";

export default function MedicalInsurancePage() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        period: "3",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Рассчет для: ${formData.name}, возраст: ${formData.age}, период: ${formData.period} мес.`);
    };

    const plans = [
        { title: "Базовый", price: "500 ₽ / мес", features: ["Скорая помощь", "Консультации онлайн"] },
        { title: "Стандартный", price: "1 200 ₽ / мес", features: ["Амбулаторное лечение", "Диагностика", "Консультации врачей"] },
        { title: "Премиум", price: "2 500 ₽ / мес", features: ["Стационарное лечение", "Широкий перечень услуг", "Стоматология"] },
    ];

    return (
        <>
            <Head>
                <title>Медицинская страховка - Защита вашего здоровья</title>
                <meta
                    name="description"
                    content="Медицинская страховка обеспечивает финансовую защиту в случае непредвиденных медицинских расходов. Узнайте больше и выберите подходящий полис."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="relative bg-gradient-to-b from-blue-100 to-white min-h-screen flex flex-col items-center p-6">
                {/* Фоновые изображения */}
                <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                    <img src="EMT.png" alt="Медицинский символ" className="h-64 opacity-10 ml-6" />
                    <img src="med.png" alt="Медицинский символ" className="h-64 opacity-10 mr-6" />
                </div>

                <div className="text-center max-w-3xl relative z-10">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Будьте уверены в своем здоровье</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Оформите медицинскую страховку и получите доступ к лучшим медицинским услугам.
                    </p>
                </div>

                {/* Форма */}
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Введите данные</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Имя"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Возраст"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <select
                            name="period"
                            value={formData.period}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="3">3 месяца</option>
                            <option value="6">6 месяцев</option>
                            <option value="12">12 месяцев</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg transition-all"
                        >
                            Рассчитать
                        </button>
                    </form>
                </div>

                {/* Тарифные планы */}
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-10 relative z-10">
                    {plans.map((plan, index) => (
                        <div key={index} className="p-8 border border-blue-300 shadow-xl rounded-2xl bg-white hover:shadow-2xl transition transform hover:scale-105">
                            <h2 className="text-3xl font-semibold text-center text-blue-800">{plan.title}</h2>
                            <p className="text-center text-2xl font-bold text-blue-700 mt-3">{plan.price}</p>
                            <ul className="mt-5 space-y-3">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="text-gray-700 text-lg flex items-center">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

