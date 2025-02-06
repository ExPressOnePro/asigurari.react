import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const validateForm = () => {
        if (!email || !phone) {
            setError('Пожалуйста, заполните все поля.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Введите корректный адрес электронной почты.');
            return false;
        }
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Простая валидация для телефона
        if (!phoneRegex.test(phone)) {
            setError('Введите корректный номер телефона.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        // Здесь можно добавить логику отправки данных на сервер
        console.log('Email:', email);
        console.log('Phone:', phone);

        // После отправки данных
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className=" w-full max-w-3xl">
                <div className=" bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Контактная информация</h2>

            {/* Email */}
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

            {/* Phone */}
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Номер телефона
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Введите номер телефона"
                    required
                />
            </div>

            {/* Error message */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {/* Submit button */}
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
};

export default ContactForm;
