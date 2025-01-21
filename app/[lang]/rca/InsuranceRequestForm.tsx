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
    // Состояние для отслеживания загрузки
    const [isLoading, setIsLoading] = useState(false);

    // Обработчик отправки формы
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Показываем индикатор загрузки

        try {
            await handleSubmit(e); // Обработчик отправки
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        } finally {
            setIsLoading(false); // Скрываем индикатор загрузки после завершения
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
                </div>
            </div>
        </div>
    );
};

export default InsuranceRequestForm;
