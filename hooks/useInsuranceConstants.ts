import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance.ts";
interface Option {
    codUIN: string;
    cod: string;
    naimenovanie: string;
}
interface Constants {
    medicina_producti: {
        medicina_producti: Option[];
    };
    medicina_tseli_poezdki: {
        ScopulCalatorieiMedPH: Option[];
    };
    medicina_regioni: {
        Regiuni: Option[];
    };
    medicina_straniUF: {
        Tara: Option[];
    };
}

export default function useInsuranceConstants() {
    const [constants, setConstants] = useState<Constants | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get("/medical-insurance/medical-insurance-constants/")
            .then((res) => setConstants(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { constants, loading };
}
