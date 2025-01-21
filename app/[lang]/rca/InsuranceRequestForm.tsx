import React, { useState } from "react";
import { getStaticUrl } from "@/app/[lang]/components/Footer.tsx";
import TextInputWithTooltip from "@/app/[lang]/rca/rca_components/TextInputWithTooltip.tsx";
import ConsentToggle from "@/app/[lang]/rca/rca_components/ConsentToggle.tsx";
import SubmitButton from "@/app/[lang]/rca/rca_components/SubmitButton.tsx";
const InsuranceRequestForm = ({
                                  IDNX,
                                  setIDNX,
                                  VehicleRegistrationCertificateNumber,
                                  setVehicleRegistrationCertificateNumber,
                                  isConsentGiven,
                                  setIsConsentGiven,
                                  handleSubmit,
                              }: any) => {
    // Состояние для отслеживания загрузки и ошибок
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Добавлено состояние для ошибки

    // Валидация формы
    const validateForm = () => {
        // Проверка, что IDNX состоит из 13 цифр
        const idnxRegex = /^[0-9]{13}$/;
        if (!idnxRegex.test(IDNX)) {
            setError("Поле IDNP/IDNO должно содержать 13 цифр.");
            return false;
        }

        // Проверка, что номер техпаспорта состоит из 9 цифр
        const vehicleRegNumRegex = /^[0-9]{9}$/;
        if (!vehicleRegNumRegex.test(VehicleRegistrationCertificateNumber)) {
            setError("Номер техпаспорта должен содержать 9 цифр.");
            return false;
        }

        if (!isConsentGiven) {
            setError("Необходимо согласие на обработку данных.");
            return false;
        }

        return true;
    };

    // Обработчик отправки формы
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка формы перед отправкой
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError(null); // Сбрасываем предыдущие ошибки

        try {
            await handleSubmit(e); // Ожидаем отправку формы
        } catch (error) {
            setError("Произошла ошибка при отправке формы.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8 relative">
                    {/* Затемняем форму, если идет загрузка */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-gray-200 opacity-50 z-10"></div>
                    )}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                        Рассчитайте стоимость ОСАГО
                    </h1>
                    <form
                        onSubmit={handleFormSubmit}
                        className={`space-y-6 ${isLoading ? "pointer-events-none" : ""}`}
                    >
                        <TextInputWithTooltip
                            id="idnx"
                            label="IDNP/IDNO"
                            value={IDNX}
                            onChange={(e) => setIDNX(e.target.value)}
                            placeholder="Введите IDNP/IDNO"
                            tooltipImage={getStaticUrl("public/exemplu-certificat-inmatriculare.webp")}
                        />

                        <TextInputWithTooltip
                            id="VehicleRegistrationCertificateNumber"
                            label="Номер техпаспорта"
                            value={VehicleRegistrationCertificateNumber}
                            onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                            placeholder="Введите номер техпаспорта"
                            tooltipImage={getStaticUrl("public/idnp.webp")}
                        />

                        <ConsentToggle
                            isConsentGiven={isConsentGiven}
                            setIsConsentGiven={setIsConsentGiven}
                        />

                        {/* Кнопка отправки с учётом загрузки */}
                        <SubmitButton isConsentGiven={isConsentGiven} isLoading={isLoading} />
                    </form>

                    {/* Индикатор загрузки */}
                    {isLoading && (
                        <div className="flex justify-center mt-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-solid"></div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InsuranceRequestForm;
