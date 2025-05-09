"use client";

import { useDispatch, useSelector } from "react-redux";
import { setStep } from "@/store/rcaSlice";
import { RootState } from "@/store/store.ts";
import SelectedParameters from "@/app/[lang]/rca/SelectedParameters.tsx";
import GreenCardRequestForm from "@/app/[lang]/greencard/steps/step1/GreenCardRequestForm.tsx";
import SelectedParametersGreenCard from "@/app/[lang]/greencard/SelectedParametersGreenCard.tsx";
import InsurerListGreenCard from "@/app/[lang]/greencard/InsurerListGreenCard.tsx";
import AdditionalGreenCardDataForm from "@/app/[lang]/greencard/AdditionalGreenCardDataForm.tsx";
import QRCodeGreenCardRequest from "@/app/[lang]/greencard/QRCodeGreenCardRequest.tsx";
import QRCodeGreenCardImage from "@/app/[lang]/greencard/QRCodeGreenCardImage.tsx";
import RCESaver from "@/app/[lang]/greencard/RCESaver.tsx";


export default function GreenCardController() {
    const dispatch = useDispatch();
    const step = useSelector((state: RootState) => state.rca.step);
    const handleStepChange = (newStep: number) => {
        dispatch(setStep(newStep));
    };

    return (
        <div>
            {step > 1 && <SelectedParametersGreenCard step={step}/>}
            {step === 1 && <GreenCardRequestForm onStepChange={handleStepChange} />}
            {step === 2 && <InsurerListGreenCard onStepChange={handleStepChange}/>}
            {step === 3 && <AdditionalGreenCardDataForm onStepChange={handleStepChange}/>}
            {step === 4 && <QRCodeGreenCardRequest onStepChange={handleStepChange} step={step}/>}
            {step === 5 && <QRCodeGreenCardImage onStepChange={handleStepChange}/>}
            {step === 6 && <RCESaver />}
        </div>
    );
}
