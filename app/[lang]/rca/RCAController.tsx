"use client";

import {useDispatch, useSelector} from "react-redux";
import {setStep, setQrCodeData} from "@/store/insuranceFormSlice.ts";
import {RootState} from "@/store/store.ts";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm.tsx";
import SelectedParameters from "@/app/[lang]/rca/SelectedParameters.tsx";
import InsurerList from "@/app/[lang]/rca/InsurerList.tsx";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm.tsx";
import RcaFinal from "@/app/[lang]/rca/RcaFinal.tsx";
import PaymentWrapper from "@/app/[lang]/PaymentMethod/PaymentWrapper.tsx";
import {buildRcaRequestData} from "@/hooks/buildRcaRequestData.ts";

export default function RCAController() {
    const dispatch = useDispatch();

    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const userData = useSelector((state: RootState) => state.insuranceForm.userData);
    const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);
    const additionalCarInfo = useSelector((state: RootState) => state.insuranceForm.additionalCarInfo);
    const qrCodeData = useSelector((state: RootState) => state.insuranceForm.qrCodeData);

    const step = useSelector((state: RootState) => state.insuranceForm.step);

    const handleQrCodeDataChange = (newData: any) => {
        dispatch(setQrCodeData(newData));
    };

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
            {step > 1 && <SelectedParameters step={step}/>}
            <div>
                {step === 1 && <InsuranceRequestForm onStepChange={handleStepChange}/>}
                {step === 2 && <InsurerList onStepChange={handleStepChange}/>}
                {step === 3 && <AdditionalDataForm onStepChange={handleStepChange}/>}
                {step === 4 && <PaymentWrapper
                    requestData={buildRcaRequestData(selectedInsurer, userData, additionalData, additionalCarInfo)}
                    onStepChange={handleStepChange}
                    onQrCodeDataChange={handleQrCodeDataChange}
                    onQrCodeStatusChange={handleQrCodeStatusChange}
                    qrCodeData={qrCodeData}
                    postUrl="/qr/"
                />}
                {step === 5 && <RcaFinal/>}
            </div>
        </div>
    );
}
