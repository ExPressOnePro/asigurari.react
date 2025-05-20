"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";

import GreenCardRequestForm from "@/app/[lang]/greencard/steps/step1/GreenCardRequestForm.tsx";
import SelectedParametersGreenCard from "@/app/[lang]/greencard/SelectedParametersGreenCard.tsx";
import InsurerListGreenCard from "@/app/[lang]/greencard/InsurerListGreenCard.tsx";
import AdditionalGreenCardDataForm from "@/app/[lang]/greencard/AdditionalGreenCardDataForm.tsx";

import RCESaver from "@/app/[lang]/greencard/RCESaver.tsx";
import PaymentWrapper from "@/app/[lang]/PaymentMethod/PaymentWrapper.tsx";
import {buildGreenCardRequestData} from "@/hooks/buildGreenCardRequestData.ts";
import { setStep, setQrCodeData} from "@/store/greenCardFormSlice.ts";
import {useEffect} from "react";


export default function GreenCardController() {
    const dispatch = useDispatch();
    const selectedInsurer = useSelector((state: RootState) => state.greenCardForm.selectedInsurer);
    const userData = useSelector((state: RootState) => state.greenCardForm.userData);
    const additionalData = useSelector((state: RootState) => state.greenCardForm.additionalData);
    const additionalCarInfo = useSelector((state: RootState) => state.greenCardForm.additionalCarInfo);
    const qrCodeData = useSelector((state: RootState) => state.greenCardForm.qrCodeData);
    const step = useSelector((state: RootState) => state.greenCardForm.step);

    const handleQrCodeDataChange = (newData: any) => {
        dispatch(setQrCodeData(newData));
    };
    useEffect(() => {
        console.log("Текущий шаг:", step);
    }, [step]);
    const handleQrCodeStatusChange = (newStatus: string) => {
        dispatch(setQrCodeData({
            ...qrCodeData,
            status: newStatus,
        }));
    };
    const handleStepChange = (newStep: number) => {
        dispatch(setStep(newStep));
    };

    return (
        <div>
            {step > 1 && <SelectedParametersGreenCard step={step}/>}
            {step === 1 && <GreenCardRequestForm onStepChange={handleStepChange} />}
            {step === 2 && <InsurerListGreenCard onStepChange={handleStepChange}/>}
            {step === 3 && <AdditionalGreenCardDataForm onStepChange={handleStepChange}/>}
            {step === 4 && <PaymentWrapper
                requestData={buildGreenCardRequestData(selectedInsurer, userData, additionalData, additionalCarInfo)}
                onStepChange={handleStepChange}
                onQrCodeDataChange={handleQrCodeDataChange}
                onQrCodeStatusChange={handleQrCodeStatusChange}
                qrCodeData={qrCodeData}
                postUrl="/qr/"
            />}
            {/*{step === 4 && <QRCodeGreenCardRequest onStepChange={handleStepChange} step={step}/>}*/}
            {/*{step === 5 && <QRCodeGreenCardImage onStepChange={handleStepChange}/>}*/}
            {step === 5 && <RCESaver />}
        </div>
    );
}
