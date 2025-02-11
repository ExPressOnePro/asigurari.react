"use client";

import React, {useEffect, useState} from "react";
import axiosInstance from "@/lib/axiosInstance";
import {GreenCardZoneOptions, GreenCardZones, TermInsurance, TermInsuranceOptions,} from "./Enums";
import {GreenCardCalculationResponse} from "./types";
import {getStaticUrl} from "@/app/[lang]/components/Footer.tsx";

import SelectInputWithTooltip from "@/app/[lang]/components/SelectInputWithTooltip.tsx";
import TextInputWithTooltip from "../rca/rca_components/InsuranceRequestForm/TextInputWithTooltip";
import SubmitButton from "@/app/[lang]/components/SubmitButton.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";
import ConsentToggle from "@/app/[lang]/components/ConsentToggle.tsx";
import {useDispatch} from "react-redux";
import {setUserData} from "@/store/greenCardFormSlice.ts";
import {setApiData} from "@/store/greenCardFormSlice.ts";
import SkeletonLoaderForm from "@/app/[lang]/rca/rca_components/InsuranceRequestForm/SkeletonLoaderForm.tsx";


const GreenCardRequestForm = ({ onStepChange, onInsurersUpdate }: any) => {
    const dispatch = useDispatch();
    const { dictionary } = useLocalization();

    const [GreenCardZone, setGreenCardZone] = useState<GreenCardZones>(GreenCardZones.Z3);
    const [termInsurance, setTermInsurance] = useState<TermInsurance>(TermInsurance.D15);
    const [IDNX, setIDNX] = useState<string>("2005021106830");
    const [VehicleRegistrationCertificateNumber, setVehicleRegistrationCertificateNumber] = useState<string>("218000136");

    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [calculatedData, setCalculatedData] = useState<any>({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);


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
        if (!isConsentGiven) {
            setLocalError(dictionary?.osago?.RCAForm?.Privacy);
            return false;
        }
        return true;
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            setLocalError(dictionary?.osago?.OperatingModes?.SelectOperatingModeError || "Please select a vehicle type.");
            return;
        }
        setIsLoading(true);
        setLocalError(null);

        const requestData = { IDNX, VehicleRegistrationCertificateNumber, TermInsurance: termInsurance, GreenCardZone };

        try {
            const response = await axiosInstance.post<GreenCardCalculationResponse>(
                "rca/calculate-green-card/",
                requestData
            );
            const result = response.data;
            onInsurersUpdate(result.InsurersPrime?.InsurerPrimeRCAE || []);

            dispatch(setUserData({
                IDNX: IDNX,
                VehicleRegistrationCertificateNumber : VehicleRegistrationCertificateNumber,
                TermInsurance : TermInsurance.D15,
                GreenCardZone : GreenCardZone
            }));

            dispatch(setApiData({
                IsSuccess: result.IsSuccess,
                ErrorMessage: result.ErrorMessage,
                PersonFirstName: result.PersonFirstName,
                PersonLastName: result.PersonLastName,
                VehicleMark: result.VehicleMark,
                VehicleModel: result.VehicleModel,
                VehicleRegistrationNumber: result.VehicleRegistrationNumber,
                VehicleCategory: result.VehicleCategory,
            }));

            setCalculatedData({
                vehicleMark: result.VehicleMark,
                vehicleModel: result.VehicleModel,
                vehicleRegistrationNumber: result.VehicleRegistrationNumber,
                personFirstName: result.PersonFirstName,
                personLastName: result.PersonLastName,
            });

            setSuccess(true);
            setFormSubmitted(true);
            onStepChange(2);
        } catch (error) {

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
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                        Рассчитайте стоимость "Зеленой карты"
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center space-x-4">
                            {/* Green Card Zone Selection */}
                            <div className="flex-1">
                                <SelectInputWithTooltip
                                    id="greenCardZone"
                                    label="Зона Зеленой Карты"
                                    value={GreenCardZone}
                                    onChange={(e) => setGreenCardZone(e.target.value as GreenCardZones)}
                                    options={GreenCardZoneOptions}
                                    tooltipImage={undefined}
                                    required={true}
                                />
                            </div>

                            {/* Term Insurance Selection */}
                            <div className="flex-1">
                                <SelectInputWithTooltip
                                    id="termInsurance"
                                    label="Срок страхования"
                                    value={termInsurance}
                                    onChange={(e) => setTermInsurance(e.target.value as TermInsurance)}
                                    options={TermInsuranceOptions}
                                    tooltipImage={undefined}
                                    required={true}
                                />
                            </div>
                        </div>


                        {/* IDNX Input */}
                        <TextInputWithTooltip
                            id="idnx"
                            label="IDNP"
                            value={IDNX}
                            onChange={(e) => setIDNX(e.target.value)}
                            placeholder="Введите IDNP"
                            tooltipImage={getStaticUrl("public/idnp.webp")}
                            maxLength={13}
                            minLength={13}
                            required
                        />

                        {/* Vehicle Registration Certificate Number Input */}
                        <TextInputWithTooltip
                            id="vehicleRegCertificateNumber"
                            label="Номер техпаспорта"
                            value={VehicleRegistrationCertificateNumber}
                            onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                            placeholder="Введите номер техпаспорта"
                            tooltipImage={getStaticUrl("public/exemplu-certificat-inmatriculare.webp")}
                            maxLength={9}
                            minLength={9}
                            required={true}
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



                    {/* Индикатор загрузки */}
                    {isLoading && (
                        <div className="flex justify-center mt-4">
                            <div
                                className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default GreenCardRequestForm;
