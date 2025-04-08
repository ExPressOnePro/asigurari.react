import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";
import axiosInstance from "@/lib/axiosInstance.ts";
import { clearData } from "@/store/insuranceFormSlice.ts";

export function useRcaProcessing() {
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const qrCodeData = useSelector((state: RootState) => state.insuranceForm.qrCodeData);
    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const userData = useSelector((state: RootState) => state.insuranceForm.userData);
    const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);
    const additionalCarInfo = useSelector((state: RootState) => state.insuranceForm.additionalCarInfo);

    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (qrCodeData?.status !== "Paid") return;

        const saveRCAData = async () => {
            setIsLoading(true);
            try {
                const requestData = {
                    Company: { IDNO: selectedInsurer?.IDNO || "" },
                    InsuredPhysicalPerson: {
                        IdentificationCode: userData?.IDNX || "",
                        BirthDate: additionalData?.BirthDate || "",
                        IsFromTransnistria: additionalData?.IsFromTransnistria || false,
                        PersonIsExternal: additionalData?.PersonIsExternal || false,
                    },
                    InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal) ? {
                        ProductionYear: additionalCarInfo?.ProductionYear || "",
                        RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber || "",
                        CilinderVolume: additionalCarInfo?.CilinderVolume || "",
                        TotalWeight: additionalCarInfo?.TotalWeight || "",
                        EnginePower: additionalCarInfo?.EnginePower || "",
                        Seats: additionalCarInfo?.Seats || "",
                    } : {
                        RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber || "",
                    },
                    StartDate: additionalData.StartDate,
                    PossessionBase: additionalData.PossessionBase?.value,
                    DocumentPossessionBaseDate: additionalData.DocumentPossessionBaseDate,
                    OperatingMode: userData.OperatingModes,
                    qrCode: qrCodeData?.uuid,
                };

                const response = await axiosInstance.post("/rca/save-rca/", requestData);
                setDocumentUrl(response.data.fileUrl);
            } catch (error: any) {
                setError(error?.response?.data?.message || "Ошибка при сохранении данных.");
            } finally {
                setIsLoading(false);
            }
        };

        saveRCAData();
        dispatch(clearData());
    }, [qrCodeData?.status, selectedInsurer?.PrimeSumMDL]);

    return { isLoading, documentUrl, error };
}
