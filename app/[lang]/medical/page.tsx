"use client";
import React from "react";
import Head from "next/head";
export default function MedicalInsurancePage() {
    return (
        <>

            <Head>
                <title>Медицинская страховка - Защита вашего здоровья</title>
                <meta
                    name="description"
                    content="Медицинская страховка обеспечивает финансовую защиту в случае непредвиденных медицинских расходов. Узнайте больше и выберите подходящий полис."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Медицинская страховка - Защита вашего здоровья" />
                <meta
                    property="og:description"
                    content="Получите медицинскую страховку для себя и своей семьи. Обеспечьте защиту на случай болезней и несчастных случаев."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://example.com/medical-insurance" />
                <meta property="og:image" content="https://example.com/images/medical-insurance-cover.jpg" />
                <meta name="robots" content="index, follow" />
            </Head>

            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-3xl">
                        <div className="bg-white shadow-lg rounded-lg p-8">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
                                Медицинская страховка
                            </h1>
                            <p className="text-gray-600 text-center text-sm sm:text-base mb-8">
                                Медицинская страховка — это ваша финансовая защита в случае болезней и несчастных случаев.
                                Она покрывает расходы на лечение, медикаменты и реабилитацию, обеспечивая вам и вашей семье
                                душевное спокойствие. Выберите подходящий полис и будьте готовы к любым непредвиденным ситуациям.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Узнать больше
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
