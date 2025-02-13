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

export default function RCAController() {
    const dispatch = useDispatch();
    const step = useSelector((state: RootState) => state.insuranceForm.step);
    const handleStepChange = (newStep: number) => {
        dispatch(setStep(newStep));
    };

    return (
        <div>
            {step > 1 && step < 6 && <SelectedParameters step={step}/>}
            {step === 1 && <InsuranceRequestForm onStepChange={handleStepChange} />}
            {step === 2 && <InsurerList onStepChange={handleStepChange}/>}
            {step === 3 && <AdditionalDataForm onStepChange={handleStepChange}/>}
            {step === 4 && <QRCodeRequest onStepChange={handleStepChange} step={step}/>}
            {step === 5 && <QRCodeImage onStepChange={handleStepChange}/>}
            {step === 6 && <RCASaver />}
        </div>
    );
}
