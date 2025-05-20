import React, {JSX, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLocalization } from "@/lib/LocalizationProvider.tsx";

const SelectedMedicalParameters = React.memo(() => {
    const [initialized, setInitialized] = useState(false);
    const { dictionary } = useLocalization();

    const medicalData = useSelector((state: RootState) => state.medicalForm.DogMEDPH[0]);

    useEffect(() => {
        if (medicalData) {
            setInitialized(true);
        }
    }, [medicalData]);

    const renderParameter = (label: string, value: string | number | boolean | JSX.Element | null) => (
        value !== undefined && value !== null && value !== "" ? (
            <div className="mb-2">
                <div className="text-sm text-gray-700">{label}</div>
                <div className="text-sm font-semibold text-gray-900">{String(value)}</div>
            </div>
        ) : null
    );

    if (!initialized || !medicalData) return null;

    const {
        valiuta_,
        data,
        startDate,
        endDate,
        ProductUIN,
        RegiuniUIN,
        ScopulCalatorieiUIN,
        TaraUIN,
        TipSportUIN,
        SARS_COV19,
        SumaDeAsig,
        persons,
    } = medicalData;

    const person = persons[0];

    return (
        <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="text-lg font-bold mb-4">Параметры страховки</h2>
            {renderParameter('Дата оформления', data)}
            {renderParameter('Дата начала', startDate)}
            {renderParameter('Дата окончания', endDate)}
            {renderParameter('Продукт', ProductUIN)}
            {renderParameter('Регион', RegiuniUIN)}
            {renderParameter('Цель поездки', ScopulCalatorieiUIN)}
            {renderParameter('Страна', TaraUIN)}
            {renderParameter('Вид спорта', TipSportUIN)}
            {renderParameter('Покрытие COVID-19', SARS_COV19 ? 'Да' : 'Нет')}
            {renderParameter('Сумма страхования', SumaDeAsig)}
            {renderParameter('Валюта', valiuta_)}

            <h3 className="text-md font-semibold mt-4 mb-2">Данные застрахованного</h3>
            {renderParameter('ФИО', person?.fullName)}
            {renderParameter('IDNP', person?.idnp)}
            {renderParameter('Дата рождения', person?.birthday)}
        </div>
    );
});

export default SelectedMedicalParameters;
