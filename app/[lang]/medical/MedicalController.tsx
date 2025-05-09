"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue";
import MedicalInsuranceForm from "@/app/[lang]/medical/MedicalInsuranceForm.tsx";
import SkeletonLoaderForm from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/SkeletonLoaderForm.tsx";


interface Option {
    codUIN: string;
    cod: string;
    naimenovanie: string;
}

export interface Constants {
    medicina_producti: Option[]
    ScopulCalatorieiMedPH: Option[]
    Regiuni: Option[]
    Tara: Option[]
}

export default function MedicalController() {
    const [constants, setConstants] = useState<Constants | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isDataValid = (data: any): data is Constants => {
        return (
            data?.medicina_producti?.length > 0 &&
            data?.ScopulCalatorieiMedPH?.length > 0 &&
            data?.Regiuni?.length > 0 &&
            data?.Tara?.length > 0
        );
    };

    useEffect(() => {
        const fetchConstants = async () => {
            setIsLoading(true);
            let attempt = 0;
            let maxAttempts = 5;

            while (attempt < maxAttempts) {
                try {
                    const response = await axiosInstance.get("/medical-insurance/medical-insurance-constants");

                    if (isDataValid(response.data)) {
                        setConstants(response.data);
                        break;
                    } else {
                        console.warn("Incomplete data, retrying...");
                    }
                } catch (error) {
                    console.error("Ошибка загрузки:", error);
                }

                attempt++;
                await new Promise(res => setTimeout(res, 1000)); // подождать 1 секунду
            }

            setIsLoading(false);
        };

        fetchConstants();
    }, []);

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

    return <MedicalInsuranceForm constants={constants} />;
}

