"use client";

import { Locale } from "@/i18n.config";
import React, { useEffect, useRef, useState, use  } from "react";
import { getDictionary } from "@/lib/dictionary";
import axiosInstance from "@/lib/axiosInstance";
import InsuranceRequestForm from "@/app/[lang]/rca/InsuranceRequestForm";
import InfoRCA from "@/app/[lang]/rca/InfoRCA";
import FAQAccordion from "@/app/[lang]/rca/FAQAccordion";
import InsurerList from "@/app/[lang]/rca/InsurerList";
import AdditionalDataForm from "@/app/[lang]/rca/AdditionalDataForm";
import SelectedParameters from "@/app/[lang]/rca/SelectedParameters.tsx";
import QRCodeFetcher from "@/app/[lang]/rca/rca_components/QRCodeFetcher.tsx";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";


export default function Page({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = use(params); // Используем use() для извлечения параметров
    const [dictionary, setDictionary] = useState<any>(null);

    useEffect(() => {
        const loadDictionary = async () => {
            const dict = await getDictionary(lang); // Используем извлеченное значение lang
            setDictionary(dict);
        };
        loadDictionary();
    }, [lang]);


    const insuranceRequestFormRef = useRef<HTMLDivElement | null>(null); // 1 step
    const selectedParametersRef = useRef<HTMLDivElement | null>(null); // 2 step
    const qrCodeSectionRef = useRef<HTMLDivElement | null>(null); // 3 step
    // 4 step
    // 5 step FINAL download button and send email with insurance

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [selectedInsurer, setSelectedInsurer] = useState(null);

    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [qrCodeData, setQrCodeData] = useState(null);

    const [isAdditionalDataSubmitted, setIsAdditionalDataSubmitted] = useState(false);
    const [selectedAdditional, setSelectedAdditional] = useState<{
        possessionBase: { value: string; label: string } | null;
        insuranceStartDate: string;
    } | null>(null);

    const [isSelectedAdditionalReady, setIsSelectedAdditionalReady] = useState(false);


    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [insurers, setInsurers] = useState<any[]>([]);
    const [calculatedData, setCalculatedData] = useState<{
        vehicleMark: string;
        vehicleModel: string;
        vehicleRegistrationNumber: string;
        bonusMalusClass: number;
        personFirstName: string;
        personLastName: string;
        possessionBase?: string;
        insuranceStartDate?: string;
    } | null>(null);

    const handleInsurerSelect = (insurer: any) => {
        setSelectedInsurer(insurer);
    };

    const handleAdditionalSubmit = (data: { possessionBase: { value: string; label: string } | null; insuranceStartDate: string }) => {
        setSelectedAdditional(data);
        setIsAdditionalDataSubmitted(true);
    };


    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //
    //     if (!isConsentGiven) {
    //         setError("Вы должны дать согласие на обработку персональных данных.");
    //         return;
    //     }
    //
    //     const requestData = { IDNX, VehicleRegistrationCertificateNumber, OperatingModes, PersonIsJuridical };
    //     try {
    //         const response = await axiosInstance.post("/rca/calculate-rca/", requestData);
    //         const result = response.data;
    //
    //         setCalculatedData({
    //             vehicleMark: result.VehicleMark,
    //             vehicleModel: result.VehicleModel,
    //             vehicleRegistrationNumber: result.VehicleRegistrationNumber,
    //             bonusMalusClass: result.BonusMalusClass,
    //             personFirstName: result.PersonFirstName,
    //             personLastName: result.PersonLastName,
    //             possessionBase: "",
    //             insuranceStartDate: "",
    //         });
    //
    //         setInsurers(result.InsurersPrime?.InsurerPrimeRCAI || []);
    //         setSuccess(true);
    //         setFormSubmitted(true);
    //     } catch (error) {
    //         console.error("Ошибка при запросе к API:", error);
    //         setError("Произошла ошибка при расчетах.");
    //     }
    // };

    // useEffect(() => {
    //     if (formSubmitted && success) {
    //         scrollToRef(selectedParametersRef);
    //     }
    //     if (qrCodeUrl) {
    //         scrollToRef(qrCodeSectionRef);
    //     }
    // }, [formSubmitted, success, qrCodeUrl]);

    const handleSuccess = (data: any) => {
        setQrCodeData(data);
    };

    const handleError = (error: any) => {
        console.error('Ошибка загрузки данных:', error);
    };

    useEffect(() => {
        if (selectedAdditional) {
            setIsSelectedAdditionalReady(true);
        }
    }, [selectedAdditional]);

    const handleSuccessQR = () => {
        console.log("QR Code fetched successfully!");
    };

    const handleErrorQR = (error: any) => {
        console.error("Error fetching QR code:", error);
    };


    return (
        <div className="min-h-screen">
            <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
                        {dictionary?.osago?.Title || ""}
                    </h1>
                </div>
            </div>
            <Provider store={store}>
                <InsuranceRequestForm
                    // IDNX={IDNX}
                    // setIDNX={setIDNX}
                    // VehicleRegistrationCertificateNumber={VehicleRegistrationCertificateNumber}
                    // setVehicleRegistrationCertificateNumber={setVehicleRegistrationCertificateNumber}
                    // isConsentGiven={isConsentGiven}
                    // setIsConsentGiven={setIsConsentGiven}
                    // handleSubmit={handleSubmit}
                    // error={error}
                    dictionary={dictionary}
                />
            </Provider>
            {/*{!formSubmitted && (*/}
            {/*    <div ref={insuranceRequestFormRef}>*/}
            {/*        <InsuranceRequestForm*/}
            {/*            IDNX={IDNX}*/}
            {/*            setIDNX={setIDNX}*/}
            {/*            VehicleRegistrationCertificateNumber={VehicleRegistrationCertificateNumber}*/}
            {/*            setVehicleRegistrationCertificateNumber={setVehicleRegistrationCertificateNumber}*/}
            {/*            isConsentGiven={isConsentGiven}*/}
            {/*            setIsConsentGiven={setIsConsentGiven}*/}
            {/*            handleSubmit={handleSubmit}*/}
            {/*            error={error}*/}
            {/*            dictionary={dictionary}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}

            {success && (
                <div ref={selectedParametersRef}>
                    <SelectedParameters
                        calculatedData={calculatedData}
                        selectedInsurer={selectedInsurer}
                        selectedAdditional={isSelectedAdditionalReady ? selectedAdditional : null} // Передаем только после инициализации
                        dictionary={dictionary}
                    />
                    {!selectedInsurer && (
                        <InsurerList insurers={insurers}
                                     handleInsurerSelect={handleInsurerSelect}
                                     dictionary={dictionary}
                        />
                    )}
                </div>
            )}

            {selectedInsurer && !isAdditionalDataSubmitted && (
                <AdditionalDataForm onSubmit={handleAdditionalSubmit} />
            )}

            {/* QR Code Fetcher */}
            {isAdditionalDataSubmitted && (
                <QRCodeFetcher
                    VehicleRegistrationCertificateNumber={VehicleRegistrationCertificateNumber}
                    selectedInsurer={selectedInsurer}
                    calculatedData={calculatedData}
                    selectedAdditional={selectedAdditional}
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            )}

            {isAdditionalDataSubmitted && selectedAdditional && (
                <QRCodeFetcher
                    VehicleRegistrationCertificateNumber="SomeCertificateNumber" // замените на свой номер
                    selectedInsurer="SomeInsurer" // замените на выбранного страховщика
                    calculatedData={{}} // добавьте свои данные
                    selectedAdditional={selectedAdditional}
                    onSuccess={handleSuccessQR}
                    onError={handleErrorQR}
                />
            )}





            <InfoRCA/>
            <FAQAccordion/>
        </div>
    );
}
