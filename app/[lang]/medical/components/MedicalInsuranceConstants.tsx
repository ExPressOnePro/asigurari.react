"use client";

import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {useLocalization} from '@/lib/LocalizationProvider';

interface MedicalInsuranceConstantsProps {
    onSelect: (type: string, value: string) => void;
}

export default function MedicalInsuranceConstants({onSelect}: MedicalInsuranceConstantsProps) {
    const {dictionary} = useLocalization();
    const medicalInsurance = useSelector((state: RootState) => state.medicalInsurance);
    const constants = medicalInsurance?.constants || {
        medicina_producti: [],
        medicina_tseli_poezdki: [],
        medicina_regioni: [],
        spravociniki_strani: [],
        medicina_sport: [],
        medicina_straniUF: []
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary?.medical?.constants?.product}
                </label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => onSelect('ProductUIN', e.target.value)}
                >
                    <option value="">{dictionary?.medical?.constants?.selectProduct}</option>
                    {constants.medicina_producti?.map((product: any) => (
                        <option key={product.UIN} value={product.UIN}>
                            {product.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary?.medical?.constants?.region}
                </label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => onSelect('RegiuniUIN', e.target.value)}
                >
                    <option value="">{dictionary?.medical?.constants?.selectRegion}</option>
                    {constants.medicina_regioni?.map((region: any) => (
                        <option key={region.UIN} value={region.UIN}>
                            {region.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary?.medical?.constants?.travelPurpose}
                </label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => onSelect('ScopulCalatorieiUIN', e.target.value)}
                >
                    <option value="">{dictionary?.medical?.constants?.selectTravelPurpose}</option>
                    {constants.medicina_tseli_poezdki?.map((purpose: any) => (
                        <option key={purpose.UIN} value={purpose.UIN}>
                            {purpose.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary?.medical?.constants?.country}
                </label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => onSelect('TaraUIN', e.target.value)}
                >
                    <option value="">{dictionary?.medical?.constants?.selectCountry}</option>
                    {constants.spravociniki_strani?.map((country: any) => (
                        <option key={country.UIN} value={country.UIN}>
                            {country.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dictionary?.medical?.constants?.sportType}
                </label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => onSelect('TipSportUIN', e.target.value)}
                >
                    <option value="">{dictionary?.medical?.constants?.selectSportType}</option>
                    {constants.medicina_sport?.map((sport: any) => (
                        <option key={sport.UIN} value={sport.UIN}>
                            {sport.Name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
