import React from "react";

import RCAForm from "@/app/[lang]/rca/RCAForm";
import BubbleBackground from "@/app/[lang]/components/BubbleBackground";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";

export default async function Page({
                                       params: {lang}
                                   }: {
    params: { lang: Locale }
}) {
    const {page} = await getDictionary(lang)

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
                        Рассчёт ОСАГО (RCA)
                    </h1>
                    <p className="text-gray-600 text-center text-sm sm:text-base mb-8">
                        ОСАГО (RCA), или Обязательное страхование автогражданской ответственности, — это ваш
                        надежный щит на дорогах Молдовы. Этот вид страхования покрывает расходы в случае аварий,
                        случайно вызванных вами. Наличие ОСАГО обязательно для всех водителей. Убедитесь, что ваш
                        полис активен, чтобы избежать штрафов и обеспечить защиту на дороге.
                    </p>
                    <RCAForm/>
                </div>
            </div>
        </div>
    );
}
