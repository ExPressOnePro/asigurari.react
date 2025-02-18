import React from "react";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function InfoRCA() {
    const {dictionary} = useLocalization();
    return (
        <>
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl p-8 text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
                        {dictionary.page.cards.rca.title}
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
                        {dictionary.page.cards.rca.longDescription}
                    </p>
                </div>
            </div>
        </>
    );
}
