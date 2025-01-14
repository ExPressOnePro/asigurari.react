import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
    Company: {
        IDNO: string;
    };
    InsuredPhysicalPerson: {
        IdentificationCode: string;
        BirthDate: string;
        IsFromTransnistria: boolean;
        PersonIsExternal: boolean;
    };
    InsuredJuridicalPerson: {
        IdentificationCode: string;
    },
    InsuredVehicle: {
        ProductionYear: number;
        RegistrationCertificateNumber: string;
        CilinderVolume: number;
        TotalWeight: number;
        EnginePower: number;
        Seats: number;
    };
    StartDate: string;
    PaymentDate: string;
    PossessionBase: string;
    DocumentPossessionBaseDate: string;
    OperatingMode: string;
    qrCode: string;
}

const InsuranceRequestForm = () => {

    const [formData, setFormData] = useState<FormData>({
        Company: { IDNO: "1002600007813" },
        InsuredPhysicalPerson: {
            IdentificationCode: "2006002027403",
            BirthDate: "2025-01-14",
            IsFromTransnistria: false,
            PersonIsExternal: false,
        },
        InsuredJuridicalPerson: {
            IdentificationCode: "2006002027403"
        },
        InsuredVehicle: {
            ProductionYear: 2018,
            RegistrationCertificateNumber: "218000136",
            CilinderVolume: 1499,
            TotalWeight: 1955,
            EnginePower: 120,
            Seats: 5,
        },
        StartDate: "2025-01-14",
        PaymentDate: "2025-01-14",
        PossessionBase: "Property",
        DocumentPossessionBaseDate: "2023-08-24",
        OperatingMode: "Usual",
        qrCode: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // @ts-ignore
        const { name, value, type, checked } = e.target;
        const keys = name.split(".");
        let newFormData = { ...formData };

        if (keys.length === 2) {
            // Nested fields (e.g., Company.IDNO)
            // @ts-ignore
            newFormData[keys[0]][keys[1]] = type === "checkbox" ? checked : value;
        } else if (keys.length === 3) {
            // Deeper nested fields (e.g., InsuredPhysicalPerson.IdentificationCode)
            // @ts-ignore
            newFormData[keys[0]][keys[1]][keys[2]] = type === "checkbox" ? checked : value;
        } else {
            // Root-level fields
            // @ts-ignore
            newFormData[name] = type === "checkbox" ? checked : value;
        }
        setFormData(newFormData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("rca/save-rca",
                formData);
            console.log("Response:", response.data);
            toast.success("Запрос успешно отправлен!");
        } catch (error) {
            console.error("Ошибка отправки запроса:", error);
            toast.error("Ошибка отправки запроса.");
        }
    };

    return (
        <form className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Форма страхового запроса</h2>

            {/* Company IDNO */}
            <div>
                <label className="block text-gray-700">IDNO Компании</label>
                <input
                    type="text"
                    name="Company.IDNO"
                    value={formData.Company.IDNO}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>

            {/* Insured Physical Person */}
            <div>
                <label className="block text-gray-700">Код идентификации физ. лица</label>
                <input
                    type="text"
                    name="InsuredPhysicalPerson.IdentificationCode"
                    value={formData.InsuredPhysicalPerson.IdentificationCode}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-gray-700">Дата рождения</label>
                <input
                    type="date"
                    name="InsuredPhysicalPerson.BirthDate"
                    value={formData.InsuredPhysicalPerson.BirthDate}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-gray-700">
                    <input
                        type="checkbox"
                        name="InsuredPhysicalPerson.IsFromTransnistria"
                        checked={formData.InsuredPhysicalPerson.IsFromTransnistria}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Из Приднестровья
                </label>
            </div>

            {/* Insured Vehicle */}
            <div>
                <label className="block text-gray-700">Год производства автомобиля</label>
                <input
                    type="number"
                    name="InsuredVehicle.ProductionYear"
                    value={formData.InsuredVehicle.ProductionYear}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>

            {/* Start Date */}
            <div>
                <label className="block text-gray-700">Дата начала</label>
                <input
                    type="date"
                    name="StartDate"
                    value={formData.StartDate}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>

            {/* QR Code */}
            <div>
                <label className="block text-gray-700">QR-код</label>
                <input
                    type="text"
                    name="qrCode"
                    value={formData.qrCode}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Отправить запрос
            </button>
        </form>
    );
};

export default InsuranceRequestForm;
