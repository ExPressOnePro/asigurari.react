"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addPerson } from "@/store/medicalInsuranceSlice";
import { useLocalization } from "@/lib/LocalizationProvider";

interface PersonFormData {
    idnp: string;
    fullName: string;
    birthday: string;
}

export default function PersonForm() {
    const { dictionary } = useLocalization();
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<PersonFormData>({
        idnp: "",
        fullName: "",
        birthday: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addPerson(formData));
        setFormData({
            idnp: "",
            fullName: "",
            birthday: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="idnp" className="block text-sm font-medium text-gray-700">
                    {dictionary?.medical?.form?.idnp}
                </label>
                <input
                    type="text"
                    id="idnp"
                    value={formData.idnp}
                    onChange={(e) => setFormData({ ...formData, idnp: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    {dictionary?.medical?.form?.fullName}
                </label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                    {dictionary?.medical?.form?.birthday}
                </label>
                <input
                    type="date"
                    id="birthday"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {dictionary?.medical?.form?.addPerson}
            </button>
        </form>
    );
}
