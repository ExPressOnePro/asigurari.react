import React, { useState, useEffect, useRef } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PageTitle from "@/app/[lang]/components/PageTitle.tsx";
import SelectInput from "@/app/[lang]/medical/SelectInput.tsx";
import CountrySelectInput from "@/app/[lang]/medical/CountrySelectInput.tsx";
import axiosInstance from "@/lib/axiosInstance.ts";
import InsuranceProductCardList from "@/app/[lang]/medical/InsuranceProductCardList.tsx";
import LabeledInput from "@/app/[lang]/medical/LabeledInput.tsx";
import DateRangePicker from "@/app/[lang]/medical/DateRangePicker.tsx";

import SportSelectInput from "@/app/[lang]/medical/SportSelectInput.tsx";
import {useDispatch} from "react-redux";
import SelectedMedicalParameters from "@/app/[lang]/medical/SelectedMedicalParameters.tsx";
import SelectedMedicalProductInfo from "@/app/[lang]/medical/SelectedMedicalProductInfo.tsx";
import {InsuranceProduct} from "@/types/medicalInsurance.ts";
import PaymentWrapper from "@/app/[lang]/PaymentMethod/PaymentWrapper.tsx";



interface Option {
    codUIN: string;
    cod: string;
    naimenovanie: string;
}

interface Constants {
    medicina_producti: Option[];
    ScopulCalatorieiMedPH: Option[];
    Regiuni: Option[];
    Tara: Option[];
    TipSport: Option[];
}

interface InsuranceFormProps {
    constants: Constants;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ constants }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        productUIN: "",
        regiuniUIN: "",
        scopCalatorieUIN: "",
        taraUIN: "",
        taraName: '',
        tipSportName:"",
        TipSportUIN: "",

        // sumaDeAsig: "",
        startDate: "",
        endDate: "",
        idnp: "2005004013331",
        fullName: "Golovenco Vladislav",
        birthday: "2001-03-30",
    });

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCountryNameChange = (newName: string) => {
        setForm(prev => ({ ...prev, naimenovanie: newName }));
    };

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            startDate: dateRange[0].startDate.toISOString().split('T')[0],
            endDate: dateRange[0].endDate.toISOString().split('T')[0],
        }));
    }, [dateRange]);

    const handleSelectCountry = (country: { codUIN: string, naimenovanie: string }) => {
        setForm(prev => ({
            ...prev,
            taraUIN: country.codUIN
        }));
    };
    const [calculatedProducts, setCalculatedProducts] = useState<InsuranceProduct[]>([]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        const payload = {
            DogMEDPH: [
                {
                    valiuta_: "498",
                    data: new Date().toISOString().split('T')[0],
                    startDate: form.startDate,
                    endDate: form.endDate,
                    ProductUIN: form.productUIN,
                    RegiuniUIN: form.regiuniUIN,
                    ScopulCalatorieiUIN: form.scopCalatorieUIN,
                    TaraUIN: form.taraUIN,
                    TipSportUIN: form.TipSportUIN,
                    SARS_COV19: true,
                    // SumaDeAsig: form.sumaDeAsig,
                    SumaDeAsig: 30000,
                    persons: [
                        {
                            idnp: form.idnp,
                            fullName: form.fullName,
                            birthday: form.birthday,
                        }
                    ]
                }
            ]
        };

        console.log("Отправляемый JSON:", JSON.stringify(payload, null, 2));

        try {
            const response = await axiosInstance.post("/medical-insurance/calculate-medical-insurance/", payload);

            const products = response.data?.[0]?.DogMEDPH ?? [];
            setCalculatedProducts(products);
            console.log("Ответ от сервера:", response.data);

        } catch (error: any) {
            if (error.response && error.response.data instanceof ArrayBuffer) {
                const decoder = new TextDecoder('windows-1251');
                const decodedText = decoder.decode(error.response.data);
                console.error("Ответ сервера (декодировано):", decodedText);
            } else if (error.response) {
                console.error("Ответ сервера:", error.response.data);
            } else {
                console.error("Ошибка:", error);
            }
        }
    };
    const validateForm = () => {
        const newErrors: string[] = [];

        if (!form.productUIN) newErrors.push("Выберите продукт");
        if (!form.regiuniUIN) newErrors.push("Выберите регион");
        if (!form.scopCalatorieUIN) newErrors.push("Выберите цель поездки");
        if (!form.taraUIN) newErrors.push("Выберите страну");

        if (!form.idnp.trim()) newErrors.push("Введите IDNP");
        if (!form.fullName.trim()) newErrors.push("Введите ФИО");
        if (!form.birthday) newErrors.push("Введите дату рождения");

        setErrors(newErrors);
        return newErrors.length === 0;
    };
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <div>
            <PageTitle title="Расчёт медицинской страховки для путешествий" />

            <form
                onSubmit={handleSubmit}
                className="bg-gray-50 shadow-xl p-8 rounded-2xl max-w-6xl mx-auto mt-10 space-y-6"
            >
                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg">
                        <ul className="list-disc list-inside">
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Левая колонка: Информация о поездке */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Информация о поездке</h2>

                        {/*<SumaDeAsigSelect*/}
                        {/*    value={form.sumaDeAsig}*/}
                        {/*    onChange={(val) => setForm((prev) => ({ ...prev, sumaDeAsig: val }))}*/}
                        {/*/>*/}

                        <SelectInput
                            label="Продукт"
                            name="productUIN"
                            value={form.productUIN}
                            onChange={handleChange}
                            options={constants?.medicina_producti}
                            placeholder="Выберите продукт"
                        />

                        <SelectInput
                            label="Регион"
                            name="regiuniUIN"
                            value={form.regiuniUIN}
                            onChange={handleChange}
                            options={constants?.Regiuni}
                            placeholder="Выберите регион"
                        />

                        <SelectInput
                            label="Цель поездки"
                            name="scopCalatorieUIN"
                            value={form.scopCalatorieUIN}
                            onChange={handleChange}
                            options={constants?.ScopulCalatorieiMedPH}
                            placeholder="Выберите цель поездки"
                        />

                        <SportSelectInput
                            label="Вид спорта"
                            value={form.tipSportName}
                            onChange={(val) =>
                                setForm((prev) => ({ ...prev, tipSportName: val }))
                            }
                            sports={constants.TipSport}
                            onSelect={(codUIN) =>
                                setForm((prev) => ({ ...prev, TipSportUIN: codUIN }))
                            }
                            placeholder="Выберите спорт"
                        />

                        <CountrySelectInput
                            label="Страна"
                            value={form.taraName}
                            onChange={(val) => {
                                setForm((prev) => ({ ...prev, taraName: val }));
                            }}
                            countries={constants.Tara}
                            onSelect={(codUIN) => {
                                const selectedCountry = constants.Tara.find((c) => c.codUIN === codUIN);
                                setForm((prev) => ({
                                    ...prev,
                                    taraUIN: codUIN,
                                    taraName: selectedCountry?.naimenovanie || '',
                                }));
                            }}
                            placeholder="Выберите страну"
                        />

                        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange}/>
                    </div>

                    {/* Правая колонка: Личная информация */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Личная информация</h2>

                        <LabeledInput
                            label="IDNP"
                            name="idnp"
                            value={form.idnp}
                            onChange={handleChange}
                            placeholder="1112223334445"
                        />

                        <LabeledInput
                            label="ФИО"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Иванов Иван"
                        />

                        <LabeledInput
                            label="Дата рождения"
                            type="date"
                            name="birthday"
                            value={form.birthday}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                    Рассчитать стоимость
                </button>
            </form>


            {calculatedProducts.length > 0 ? (
                <div className="mt-6">
                    <InsuranceProductCardList products={calculatedProducts} />

                    <SelectedMedicalParameters />
                </div>
            ) : (
                <p></p>
            )}
            <SelectedMedicalProductInfo />
            <PaymentWrapper/>

        </div>

    );
};

export default InsuranceForm;
