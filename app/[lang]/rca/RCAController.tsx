// src/app/[lang]/rca/RCAController.tsx
"use client";

import { useDispatch, useSelector } from "react-redux";
import { setStep } from "@/store/insuranceFormSlice.ts";
import { RootState } from "@/store/store.ts";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm.tsx";
import SelectedParameters from "@/app/[lang]/rca/SelectedParameters.tsx";
import InsurerList from "@/app/[lang]/rca/InsurerList.tsx";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm.tsx";
import QRCodeRequest from "@/app/[lang]/rca/rca_components/qr/QRCodeRequest.tsx";
import QRCodeImage from "@/app/[lang]/rca/rca_components/qr/QRCodeImage.tsx";
import RCASaver from "@/app/[lang]/rca/rca_components/RCASaver.tsx";
import {useEffect, useRef} from "react";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";
import ContactForm from "@/app/[lang]/rca/rca_components/ContactForm/ContactForm.tsx";

export default function RCAController() {
    const dispatch = useDispatch();
    const { dictionary } = useLocalization();

    const step = useSelector((state: RootState) => state.insuranceForm.step);
    const stepRef = useRef<HTMLDivElement>(null);
    const handleStepChange = (newStep: number) => {
        dispatch(setStep(newStep));
    };

    useEffect(() => {
        if (stepRef.current) {
            stepRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [step]);

    return (
        <div>
            {step > 1 && step < 7 && <SelectedParameters step={step}/>}
            <div ref={stepRef}>
                {step === 1 && <InsuranceRequestForm onStepChange={handleStepChange}/>}
                {step === 2 && <InsurerList onStepChange={handleStepChange}/>}
                {step === 3 && <AdditionalDataForm onStepChange={handleStepChange}/>}
                {step === 4 && <ContactForm onStepChange={handleStepChange}/>}
                {step === 5 && <QRCodeRequest onStepChange={handleStepChange} step={step}/>}
                {step === 6 && <QRCodeImage onStepChange={handleStepChange}/>}
                {step === 7 && <RCASaver/>}
            </div>
        </div>
    );
}
