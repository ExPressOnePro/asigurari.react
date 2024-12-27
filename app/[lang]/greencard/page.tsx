import React from "react";
import GreenCardForm from "@/app/[lang]/greencard/GreenCardForm";

const Page = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
                            Зеленая карта
                        </h1>
                        <p className="text-gray-600 text-center text-sm sm:text-base mb-8">
                            Получите Зеленую карту для поездок за границу. Удобное оформление и доставка.
                        </p>
                        <GreenCardForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
