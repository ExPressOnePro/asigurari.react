import axiosInstance from "@/lib/axiosInstance.ts";
import {useEffect, useState} from "react";
import {InsuranceProduct, Constants} from "@/types/medicalInsurance.ts";

interface InsuranceFormProps {
    constants: Constants;
    onSubmit: (products: InsuranceProduct[]) => void; // 🔥 добавить
}

const MedicalInsuranceForm: React.FC<InsuranceFormProps> = ({ constants, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);

    const [form, setForm] = useState({
        productUIN: "",
        regiuniUIN: "",
        scopCalatorieUIN: "",
        taraUIN: "",
        taraName: '',
        tipSportName: "",
        TipSportUIN: "",
        startDate: "",
        endDate: "",
        idnp: "2005004013331",
        fullName: "Golovenco Vladislav",
        birthday: "2001-03-30",
        pasaport: "B04056997",
    });

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            startDate: dateRange[0].startDate.toISOString().split('T')[0],
            endDate: dateRange[0].endDate.toISOString().split('T')[0],
        }));
    }, [dateRange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors: string[] = [];

        if (!form.productUIN) newErrors.push("Выберите продукт");
        if (!form.regiuniUIN) newErrors.push("Выберите регион");
        if (!form.scopCalatorieUIN) newErrors.push("Выберите цель поездки");
        if (!form.taraUIN) newErrors.push("Выберите страну");
        if (!form.pasaport.trim()) newErrors.push("Введите паспорт");
        if (!form.idnp.trim()) newErrors.push("Введите IDNP");
        if (!form.fullName.trim()) newErrors.push("Введите ФИО");
        if (!form.birthday) newErrors.push("Введите дату рождения");

        setErrors(newErrors);
        return newErrors.length === 0;
    };

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
                    SumaDeAsig: 30000,
                    persons: [
                        {
                            idnp: form.idnp,
                            fullName: form.fullName,
                            birthday: form.birthday,
                            Pasaport: form.pasaport,
                        }
                    ]
                }
            ]
        };

        setLoading(true);
        try {
            const response = await axiosInstance.post("/medical-insurance/calculate-medical-insurance/", payload);
            const products = response.data?.[0]?.DogMEDPH ?? [];
            onSubmit(products); // 🔥 передаём наверх
        } catch (error: any) {
            console.error("Ошибка при расчёте:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 shadow-xl p-8 rounded-2xl max-w-6xl mx-auto mt-10 space-y-6">
            {errors.length > 0 && (
                <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg">
                    <ul className="list-disc list-inside">{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
                </div>
            )}

            {/* остальная форма — inputs, select, date range и т.д. */}
        </form>
    );
};

export default MedicalInsuranceForm;
