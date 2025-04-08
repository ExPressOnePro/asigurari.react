import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";
import axiosInstance from "@/lib/axiosInstance.ts";
import { setQrCodeData } from "@/store/insuranceFormSlice.ts";

interface QRCodeRequestProps {
    onStepChange: (step: number) => void;
    step: number;
}

const QRCodeRequest: React.FC<QRCodeRequestProps> = React.memo(({ onStepChange, step }) => {
    const dispatch = useDispatch();
    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const userData = useSelector((state: RootState) => state.insuranceForm.userData);
    const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);
    const additionalCarInfo = useSelector((state: RootState) => state.insuranceForm.additionalCarInfo);
    const QrCodeDate = useSelector((state: RootState) => state.insuranceForm.qrCodeData);

    // Флаг, который показывает, что компонент уже был смонтирован
    const isMounted = React.useRef(false);

    useEffect(() => {
        const sendRequest = async () => {
            if (!isMounted.current && selectedInsurer?.PrimeSumMDL) {
                console.log("Отправка запроса с суммой:", selectedInsurer?.PrimeSumMDL);
                isMounted.current = true;
                try {
                    const response = await axiosInstance.post("/qr/", {
                        extension: { amount: { sum: selectedInsurer?.PrimeSumMDL, currency: "MDL" } },
                        data: {
                            Company: { IDNO: selectedInsurer?.IDNO },
                            InsuredPhysicalPerson: {
                                IdentificationCode: userData?.IDNX,
                                BirthDate: additionalData?.BirthDate,
                                IsFromTransnistria: additionalData?.IsFromTransnistria,
                                PersonIsExternal: additionalData?.PersonIsExternal,
                            },
                            InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal) ? {
                                ProductionYear: additionalCarInfo?.ProductionYear,
                                RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                                CilinderVolume: additionalCarInfo?.CilinderVolume,
                                TotalWeight: additionalCarInfo?.TotalWeight,
                                EnginePower: additionalCarInfo?.EnginePower,
                                Seats: additionalCarInfo?.Seats,
                            } : {
                                RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
                            },
                            StartDate: additionalData?.StartDate,
                            PossessionBase: additionalData?.PossessionBase,
                            DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
                            OperatingMode: userData?.OperatingModes,
                        }
                    });

                    if (response.data?.uuid) {
                        dispatch(setQrCodeData({
                            uuid: response.data.uuid,
                            qr_as_image: response.data.qr_as_image,
                            url: response.data.url,
                            status: response.data.status,
                        }));
                        onStepChange(5);
                    } else {
                        throw new Error("Некорректный ответ API");
                    }
                } catch (error) {
                    console.error("Ошибка при отправке запроса:", error);
                }
            }
        };

        sendRequest();

        return () => {
            console.log("Компонент QRCodeRequest размонтирован");
        };
    }, [selectedInsurer?.PrimeSumMDL]);

    return null;
});

export default QRCodeRequest;


