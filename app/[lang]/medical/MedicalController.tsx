"use client";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {setFormData, setStep} from "@/store/medicalInsuranceSlice.ts";
import PersonForm from "./components/PersonForm";
import MedicalInsuranceConstants from "./components/MedicalInsuranceConstants";
import React, {useState} from "react";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function MedicalController() {
    const dispatch = useDispatch();
    const {dictionary} = useLocalization();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const medicalInsurance = useSelector((state: RootState) => state.medicalInsurance);
    const step = medicalInsurance?.step || 1;
    const formData = medicalInsurance?.formData || {};

    const handleConstantSelect = (type: string, value: string) => {
        dispatch(setFormData({[type]: value}));
    };

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {step === 1 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {isLoading && <div className="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>}
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                            {dictionary?.medical?.MF?.MedicalInsuranceForm}
                        </h1>
                        <MedicalInsuranceConstants onSelect={handleConstantSelect}/>
                        <div className="mt-6">
                            <button
                                onClick={() => dispatch(setStep(2))}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {dictionary?.medical?.MF?.ButtonCalculate}
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <PersonForm/>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => dispatch(setStep(1))}
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => dispatch(setStep(3))}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Review and Submit</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Selected Options:</h3>
                                <pre className="mt-2 bg-gray-100 p-4 rounded-md">
                                    {JSON.stringify(formData, null, 2)}
                                </pre>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => dispatch(setStep(2))}
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Back
                            </button>
                            <button
                                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
