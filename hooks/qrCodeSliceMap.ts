// lib/hooks/qrCodeSliceMap.ts
import { RootState } from "@/store/store";
import {
    setStep as setInsuranceStep,
    setQrCodeData as setInsuranceQrCodeData,
} from "@/store/insuranceFormSlice";

import {
    setStep as setGreenCardStep,
    setQrCodeData as setGreenCardQrCodeData,
} from "@/store/greenCardFormSlice";

export const qrCodeSliceMap = {
    insuranceForm: {
        selector: (state: RootState) => state.insuranceForm.qrCodeData,
        stepSelector: (state: RootState) => state.insuranceForm.step,
        setStep: setInsuranceStep,
        setQrCodeData: setInsuranceQrCodeData,
    },
    greenCardForm: {
        selector: (state: RootState) => state.greenCardForm.qrCodeData,
        stepSelector: (state: RootState) => state.greenCardForm.step,
        setStep: setGreenCardStep,
        setQrCodeData: setGreenCardQrCodeData,
    },
};
