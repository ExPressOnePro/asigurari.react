// lib/hooks/useQRCodeStatus.ts
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axiosInstance";
import { RootState } from "@/store/store";

interface QRCodeStatusProps {
    sliceName: "insuranceForm" | "greenCardForm"; // Название слайса
    setStepAction: (step: number) => any; // Действие для установки шага
    qrCodeDataSelector: (state: RootState) => any; // Селектор для получения данных QR-кода
    setQrCodeDataAction: (data: any) => any; // Действие для установки данных QR-кода
    successStep: number; // Шаг при успешной оплате
}

export const useQRCodeStatus = ({
                                    sliceName,
                                    setStepAction,
                                    qrCodeDataSelector,
                                    setQrCodeDataAction,
                                    successStep,
                                }: QRCodeStatusProps) => {
    const dispatch = useDispatch();
    const qrCodeData = useSelector(qrCodeDataSelector);
    const isMounted = useRef(true);

    useEffect(() => {
        if (!qrCodeData?.uuid) return;

        const checkStatus = async () => {
            try {
                const response = await axiosInstance.get(`/qr/${qrCodeData.uuid}/status/`);
                if (!isMounted.current) return;

                const newStatus = response.data?.status;

                if (newStatus === "Paid") {
                    dispatch(
                        setQrCodeDataAction({
                            uuid: response.data.uuid,
                            qr_as_image: response.data.qr_as_image,
                            url: response.data.url,
                            status: newStatus,
                        })
                    );
                    dispatch(setStepAction(successStep));
                    return;
                }

                setTimeout(checkStatus, 5000);
            } catch (error) {
                console.error("Ошибка при проверке статуса QR-кода:", error);
            }
        };

        checkStatus();

        return () => {
            isMounted.current = false;
        };
    }, [qrCodeData?.uuid, dispatch, setStepAction, setQrCodeDataAction, successStep]);

    return qrCodeData;
};