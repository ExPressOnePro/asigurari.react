"use client";

import React, { useEffect, useRef, useState, use  } from "react";

import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm";
import InfoRCA from "@/app/[lang]/rca/InfoRCA";
import FAQAccordion from "@/app/[lang]/rca/FAQAccordion";
import InsurerList from "@/app/[lang]/rca/InsurerList";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm";
import SelectedParameters from "@/app/[lang]/rca/SelectedParameters.tsx";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";
import GenerateQr from "@/app/[lang]/rca/rca_components/qr/GenerateQr.tsx";
import RCASaver from "@/app/[lang]/rca/rca_components/RCASaver.tsx";
import ContactForm from "@/app/[lang]/rca/rca_components/ContactForm/ContactForm.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function Page() {
    const { dictionary } = useLocalization();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const handleStepChange = (nextStep: number) => {
        setCurrentStep(nextStep);
    };

    const [selectedAdditional, setSelectedAdditional] = useState<{
        possessionBase: { value: string; label: string } | null;
        insuranceStartDate: string;
    } | null>(null);

    const [insurers, setInsurers] = useState<any[]>([]);
    const handleInsurersUpdate = (newInsurers: any[]) => {
        setInsurers(newInsurers);
    };

    return (
        <div className="min-h-screen">
            <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
                        {dictionary?.osago?.Title || ""}
                    </h1>
                </div>
            </div>

            {/* Step 1*/}
            {currentStep === 1 && (
                <Provider store={store}>
                    <InsuranceRequestForm
                        dictionary={dictionary}
                        onStepChange={handleStepChange}
                        onInsurersUpdate={handleInsurersUpdate} // Передаем функцию для обновления insurers
                    />
                </Provider>
            )}

            {currentStep > 1 && (
                <Provider store={store}>
                    <SelectedParameters dictionary={dictionary} currentStep={currentStep}/>
                </Provider>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
                <Provider store={store}>
                    <InsurerList
                        insurers={insurers} // Передаем данные insurers в следующий шаг
                        dictionary={dictionary}
                        onStepChange={handleStepChange}
                    />
                </Provider>
            )}

            {currentStep === 3 && (
                <Provider store={store}>
                    <AdditionalDataForm
                        dictionary={dictionary}
                        onStepChange={handleStepChange}
                    />
                </Provider>
            )}

            {/*{currentStep === 4 && (*/}
            {/*    <Provider store={store}>*/}
            {/*        <ContactForm*/}
            {/*        />*/}
            {/*    </Provider>*/}
            {/*)}*/}

            {currentStep === 5 && (
                <Provider store={store}>
                    <GenerateQr
                        onStepChange={handleStepChange}
                    />
                </Provider>
            )}

            {currentStep === 6 && (
                <Provider store={store}>
                    <RCASaver   />
                </Provider>
            )}

            <InfoRCA/>
            <FAQAccordion/>
        </div>
    );
}
