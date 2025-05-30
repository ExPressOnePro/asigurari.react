import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {setApiData, setUserData} from "@/store/insuranceFormSlice";
import { getStaticUrl } from "@/app/[lang]/components/Footer";
import SubmitButton from "@/app/[lang]/components/SubmitButton.tsx";
import StatusMessage from "@/app/[lang]/rca/rca_components/StatusMessage.tsx";
import TextInputWithTooltip from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/TextInputWithTooltip.tsx";
import ConsentToggle from "@/app/[lang]/components/ConsentToggle.tsx";
import OperatingModeSelect from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/OperatingModeSelect.tsx";
import PersonTypeToggle from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/PersonTypeToggle.tsx";
import axiosInstance from "@/lib/axiosInstance.ts";
import SkeletonLoaderForm from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/SkeletonLoaderForm.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";


const InsuranceRequestForm = React.memo(({ onStepChange }: any) => {
    const dispatch = useDispatch();
    const { dictionary } = useLocalization();

    const [IDNX, setIDNX] = useState<string>('2005021106830');
    const [VehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>('218000136');
    const [OperatingModes, setOperatingModes] = useState<string>('');
    const [PersonIsJuridical, setPersonIsJuridical] = useState<boolean>(false);

    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(true);
    const [localError, setLocalError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [calculatedData, setCalculatedData] = useState<any>({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsSkeletonLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsSkeletonLoading(false);
            }
        };
        loadData();
    }, []);

    const validateForm = () => {
        if (OperatingModes === null) {
            return dictionary?.RCA?.IRF?.ErrorSelectOperatingMode;
        }
        if (IDNX.length !== 13) {
            return dictionary?.RCA?.IRF?.ErrorIDNX13;
        }
        if (VehicleRegistrationCertificateNumber.length !== 9) {
            return dictionary?.RCA?.IRF?.ErrorTehPass;
        }
        return null;
    };

    useEffect(() => {
        if (IDNX.length > 0) {
            const firstDigit = IDNX[0];
            setPersonIsJuridical(firstDigit !== '0' && firstDigit !== '2');
        }
    }, [IDNX]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            setLocalError(error);
            return;
        }

        setIsLoading(true);
        setLocalError(null);


        const requestData = { IDNX, VehicleRegistrationCertificateNumber, OperatingModes, PersonIsJuridical };
        try {
            const response = await axiosInstance.post("/rca/calculate-rca/", requestData);
            const result = response.data;
            dispatch(setUserData({
                IDNX: IDNX,
                VehicleRegistrationCertificateNumber : VehicleRegistrationCertificateNumber,
                OperatingModes : OperatingModes,
                PersonIsJuridical : PersonIsJuridical
            }));

            dispatch(setApiData({
                InsurerPrimeRCAI: result.InsurersPrime.InsurerPrimeRCAI,
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

            setSuccess(true);
            setFormSubmitted(true);
            onStepChange(2);
        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            setLocalError("Произошла ошибка при расчетах.");
        } finally {
            setIsLoading(false);
        }
    };

    const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
    if (isSkeletonLoading) {
        return <SkeletonLoaderForm />;
    }

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8 relative">
                    {isLoading && <div className="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>}

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                        {dictionary?.RCA?.IRF?.RCAForm}
                    </h1>

                    <form onSubmit={handleSubmit} className={`space-y-6 ${isLoading ? "pointer-events-none" : ""}`}>

                        {/*<PersonTypeToggle*/}
                        {/*    PersonIsJuridical={PersonIsJuridical}*/}
                        {/*    setPersonIsJuridical={setPersonIsJuridical}*/}
                        {/*/>*/}

                        <TextInputWithTooltip
                            id="idnx"
                            label={dictionary?.RCA?.IRF?.IDNP}
                            value={IDNX}
                            onChange={(e) => setIDNX(e.target.value)}
                            placeholder={dictionary?.RCA?.IRF?.IDNPPlaceholder}
                            tooltipImage={getStaticUrl("public/exemplu-certificat-inmatriculare.webp")}
                        />

                        <TextInputWithTooltip
                            id="VehicleRegistrationCertificateNumber"
                            label={dictionary?.RCA?.IRF?.InputTehTitle}
                            value={VehicleRegistrationCertificateNumber}
                            onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                            placeholder={dictionary?.RCA?.IRF?.InputTehPlaceholder}
                            tooltipImage={getStaticUrl("public/idnp.webp")}
                        />

                        <OperatingModeSelect
                            value={OperatingModes}
                            onChange={setOperatingModes}
                        />

                        <ConsentToggle
                            isConsentGiven={isConsentGiven}
                            setIsConsentGiven={setIsConsentGiven}
                        />

                        <SubmitButton
                            isConsentGiven={isConsentGiven}
                            isLoading={isLoading}
                        />
                    </form>

                    {localError &&
                        <StatusMessage
                            message={localError}
                            isError={true}
                        />
                    }
                    {/*{formSubmitted && success && <StatusMessage message={dictionary?.RCA?.IRF?.RCAForm?.SuccessMessage} isError={false} />}*/}
                    {/*{formSubmitted && !success && <StatusMessage message={dictionary?.RCA?.IRF?.RCAForm?.ErrorMessage} isError={true} />}*/}
                </div>
            </div>
        </div>
    );
});

export default InsuranceRequestForm;
