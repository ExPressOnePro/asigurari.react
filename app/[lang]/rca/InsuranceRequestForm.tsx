import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { setApiData} from "@/store/insuranceFormSlice";

import SubmitButton from "@/app/[lang]/components/SubmitButton.tsx";
import StatusMessage from "@/app/[lang]/rca/rca_components/StatusMessage.tsx";
import TextInputWithTooltip from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/TextInputWithTooltip.tsx";
import ConsentToggle from "@/app/[lang]/components/ConsentToggle.tsx";
import OperatingModeSelect from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/OperatingModeSelect.tsx";
import PersonTypeToggle from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/PersonTypeToggle.tsx";
import axiosInstance from "@/lib/axiosInstance.ts";
import SkeletonLoaderForm from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/SkeletonLoaderForm.tsx";


const InsuranceRequestForm = ({ dictionary }: any) => {
    const dispatch = useDispatch();
    const [IDNX, setIDNX] = useState<string>('');
    const [VehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>('');
    const [OperatingModes, setOperatingModes] = useState<string>('');
    const [PersonIsJuridical, setPersonIsJuridical] = useState<boolean>(false);

    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [calculatedData, setCalculatedData] = useState<any>({});
    const [insurers, setInsurers] = useState<any[]>([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsSkeletonLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Заглушка для загрузки
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsSkeletonLoading(false);
            }
        };
        loadData();
    }, []);

    const validateForm = () => {
        if (!isConsentGiven) {
            setLocalError(dictionary?.osago?.RCAForm?.Privacy);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm() || !OperatingModes) {
            setLocalError(dictionary?.osago?.OperatingModes?.SelectOperatingModeError || "Please select a vehicle type.");
            return;
        }

        setIsLoading(true);
        setLocalError(null);

        const requestData = { IDNX, VehicleRegistrationCertificateNumber, OperatingModes, PersonIsJuridical };
        console.log("Request data:", requestData);
        try {
            const response = await axiosInstance.post("/rca/calculate-rca/", requestData);
            const result = response.data;

            dispatch(setApiData({
                BonusMalusClass: result.BonusMalusClass,
                IsSuccess: result.IsSuccess,
                ErrorMessage: result.ErrorMessage,
                Territory: result.Territory,
                PersonFirstName: result.PersonFirstName,
                PersonLastName: result.PersonLastName,
                VehicleMark: result.VehicleMark,
                VehicleModel: result.VehicleModel,
                VehicleRegistrationNumber: result.VehicleRegistrationNumber,
            }));

            setCalculatedData({
                vehicleMark: result.VehicleMark,
                vehicleModel: result.VehicleModel,
                vehicleRegistrationNumber: result.VehicleRegistrationNumber,
                bonusMalusClass: result.BonusMalusClass,
                personFirstName: result.PersonFirstName,
                personLastName: result.PersonLastName,
            });

            setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);
            setSuccess(true);
            setFormSubmitted(true);
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setLocalError("Произошла ошибка при расчетах.");
        } finally {
            setIsLoading(false);
        }
    };
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(true); // Для скелетона
    if (isSkeletonLoading) {
        return <SkeletonLoaderForm />;
    }

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8 relative">
                    {isLoading && <div className="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>}

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                        {dictionary?.osago?.RCAForm?.Title}
                    </h1>

                    <form onSubmit={handleSubmit} className={`space-y-6 ${isLoading ? "pointer-events-none" : ""}`}>

                        <PersonTypeToggle
                            PersonIsJuridical={PersonIsJuridical}
                            setPersonIsJuridical={setPersonIsJuridical}
                            dictionary={dictionary}
                        />

                        <TextInputWithTooltip
                            id="idnx"
                            label="IDNP/IDNO"
                            value={IDNX}
                            onChange={(e) => setIDNX(e.target.value)}
                            placeholder={dictionary?.osago?.RCAForm?.IDNPPlaceholder}
                            tooltipImage="exemplu-certificat-inmatriculare.webp"
                        />

                        <TextInputWithTooltip
                            id="VehicleRegistrationCertificateNumber"
                            label={dictionary?.osago?.RCAForm?.InputTehTitle}
                            value={VehicleRegistrationCertificateNumber}
                            onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                            placeholder={dictionary?.osago?.RCAForm?.InputTehPlaceholder}
                            tooltipImage="public/idnp.webp"
                        />
                        <OperatingModeSelect
                            value={OperatingModes}
                            onChange={setOperatingModes}
                            dictionary={dictionary}
                        />
                        <ConsentToggle
                            isConsentGiven={isConsentGiven}
                            setIsConsentGiven={setIsConsentGiven}
                            dictionary={dictionary}
                        />

                        <SubmitButton
                            isConsentGiven={isConsentGiven}
                            isLoading={isLoading}
                            dictionary={dictionary}
                        />
                    </form>

                    {localError && <StatusMessage message={localError} isError={true} />}
                    {formSubmitted && success && <StatusMessage message={dictionary?.osago?.RCAForm?.SuccessMessage} isError={false} />}
                    {formSubmitted && !success && <StatusMessage message={dictionary?.osago?.RCAForm?.ErrorMessage} isError={true} />}
                </div>
            </div>
        </div>
    );
};

export default InsuranceRequestForm;
