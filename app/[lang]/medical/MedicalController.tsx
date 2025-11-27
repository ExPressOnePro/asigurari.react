"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue";
import SkeletonLoaderForm from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/SkeletonLoaderForm";
import SelectedMedicalProductInfo from "@/app/[lang]/medical/SelectedMedicalProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setStep } from "@/store/MedicalFormSlice";
import InsuranceProductCardList from "@/app/[lang]/medical/InsuranceProductCardList";
import SelectedMedicalParameters from "@/app/[lang]/medical/SelectedMedicalParameters";
import MedicalInsuranceForm from "@/app/[lang]/medical/MedicalInsuranceForm";

import type { Constants } from "@/types/medicalInsurance"; // или локально описать как у тебя

export default function MedicalController() {
    const [constants, setConstants] = useState<Constants | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [calculatedProducts, setCalculatedProducts] = useState([]);
    const step = useSelector((state: RootState) => state.medicalForm.step);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchConstants = async () => {
            setIsLoading(true);
            try {
                const res = await axiosInstance.get("/medical-insurance/medical-insurance-constants");
                const data = res.data;
                if (
                    data?.medicina_producti?.length &&
                    data?.ScopulCalatorieiMedPH?.length &&
                    data?.Regiuni?.length &&
                    data?.Tara?.length
                ) {
                    setConstants(data);
                }
            } catch (e) {
                console.error("Ошибка загрузки констант:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConstants();
    }, []);

    const handleFormSubmit = (products: any[]) => {
        setCalculatedProducts(products);
        dispatch(setStep(2));
    };

    if (isLoading) {
        return (
            <div>
                <SpinnerBlue />
                <SkeletonLoaderForm />
            </div>
        );
    }

    if (!constants) {
        return <div className="text-red-500 text-center mt-10">Ошибка загрузки данных. Попробуйте позже.</div>;
    }

    return (
        <div>
            {step > 1 && <SelectedMedicalProductInfo />}
            {step === 1 && <MedicalInsuranceForm constants={constants} onSubmit={handleFormSubmit} />}
            {step === 2 && (
                <div className="mt-6">
                    {calculatedProducts.length > 0 ? (
                        <>
                            <InsuranceProductCardList products={calculatedProducts} />
                            <SelectedMedicalParameters />
                        </>
                    ) : (
                        <p className="text-center text-gray-400">Нет доступных продуктов.</p>
                    )}
                </div>
            )}
        </div>
    );
}
