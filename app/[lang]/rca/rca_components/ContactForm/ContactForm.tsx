import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";
import {setContact} from "@/store/insuranceFormSlice.ts";


interface ContactFormProps {
    onStepChange: any;
}

const ContactForm: React.FC<ContactFormProps> = React.memo(({onStepChange}) => {
    const dispatch = useDispatch();
    const {dictionary} = useLocalization();
    const [email, setEmail] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const validateForm = () => {
        if (!email ) {
            setError('Пожалуйста, заполните все поля.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Введите корректный адрес электронной почты.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        dispatch(setContact({
            email: email
        }));
        onStepChange(5);

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className=" w-full max-w-3xl">
            <div className=" bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-10">
                    {dictionary?.RCA?.CF?.Title}
                </h1>
                <h5 className="font-semibold text-center mb-4">{dictionary?.RCA?.CF?.add}</h5>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Электронная почта
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите вашу почту"
                        required
                    />
                </div>


                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded-lg text-white ${isSubmitting ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            </div>
        </div>
        </form>
    );
});

export default ContactForm;
