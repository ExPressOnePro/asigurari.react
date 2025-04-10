"use client";

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {useLocalization} from '../../../../lib/LocalizationProvider';
import {fetchMedicalInsuranceConstants} from '../../../../store/medicalInsuranceSlice';

interface MedicalInsuranceConstantsProps {
    onSelect: (type: string, value: string) => void;
}

interface SelectOption {
    UIN: string;
    Name: string;
}

export default function MedicalInsuranceConstants({onSelect}: MedicalInsuranceConstantsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {dictionary} = useLocalization();
    const {constants, isLoading, error} = useSelector((state: RootState) => state.medicalInsurance);

    useEffect(() => {
        dispatch(fetchMedicalInsuranceConstants());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="space-y-4" role="status" aria-label="Loading medical insurance options">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                ))}
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="rounded-lg bg-red-50 p-4 border border-red-200"
                role="alert"
                aria-live="polite"
            >
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            {error}
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    const SelectField = ({
                             label,
                             options,
                             onChange,
                             placeholder,
                             name
                         }: {
        label: string;
        options: SelectOption[];
        onChange: (value: string) => void;
        placeholder: string;
        name: string;
    }) => (
        <div className="relative group">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    className="block w-full rounded-lg border-gray-300 shadow-sm
                             focus:border-blue-500 focus:ring-blue-500
                             hover:border-blue-400 transition-colors
                             bg-white py-2.5 pl-4 pr-10 text-gray-900
                             disabled:bg-gray-50 disabled:text-gray-500"
                    onChange={(e) => onChange(e.target.value)}
                    aria-label={label}
                    required
                >
                    <option value="" disabled>{placeholder}</option>
                    {Array.isArray(options) ? options.map((item) => (
                        <option key={item.UIN} value={item.UIN}>
                            {item.Name}
                        </option>
                    )) : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                        className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 transition-all">
            <SelectField
                label={dictionary?.medical?.constants?.product}
                options={constants.medicina_producti}
                onChange={(value) => onSelect('ProductUIN', value)}
                placeholder={dictionary?.medical?.constants?.selectProduct}
                name="product"
            />

            <SelectField
                label={dictionary?.medical?.constants?.region}
                options={constants.medicina_regioni}
                onChange={(value) => onSelect('RegiuniUIN', value)}
                placeholder={dictionary?.medical?.constants?.selectRegion}
                name="region"
            />

            <SelectField
                label={dictionary?.medical?.constants?.travelPurpose}
                options={constants.medicina_tseli_poezdki}
                onChange={(value) => onSelect('ScopulCalatorieiUIN', value)}
                placeholder={dictionary?.medical?.constants?.selectTravelPurpose}
                name="travelPurpose"
            />

            <SelectField
                label={dictionary?.medical?.constants?.country}
                options={constants.spravociniki_strani}
                onChange={(value) => onSelect('TaraUIN', value)}
                placeholder={dictionary?.medical?.constants?.selectCountry}
                name="country"
            />

            <SelectField
                label={dictionary?.medical?.constants?.sportType}
                options={constants.medicina_sport}
                onChange={(value) => onSelect('TipSportUIN', value)}
                placeholder={dictionary?.medical?.constants?.selectSportType}
                name="sportType"
            />
        </div>
    );
}
