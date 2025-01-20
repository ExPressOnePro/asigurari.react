import React from "react";
import Link from "next/link";

const InsuranceRequestForm = ({
                                  IDNX,
                                  setIDNX,
                                  VehicleRegistrationCertificateNumber,
                                  setVehicleRegistrationCertificateNumber,
                                  isConsentGiven,
                                  setIsConsentGiven,
                                  handleSubmit,

                              }: any) => (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-4">
                    Рассчитайте стоимость ОСАГО
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="idnx" className="block text-sm font-bold text-gray-700">
                            IDNP/IDNO
                        </label>
                        <div className="flex items-center mt-2">
                            <input
                                type="text"
                                id="idnx"
                                value={IDNX}
                                onChange={(e) => setIDNX(e.target.value)}
                                className="block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Введите IDNP/IDNO"
                                required
                            />
                            <div className="ml-2 relative group">
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
                                    aria-label="Дополнительная информация"
                                >
                                    ?
                                </button>
                                <div
                                    className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-md mt-2 px-4 py-3 text-sm text-gray-700 w-64">
                                    <img
                                        src="/exemplu-certificat-inmatriculare.webp"
                                        alt="Пример IDNP/IDNO"
                                        className="w-full h-auto mb-2 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>

                        <label htmlFor="vehicleRegCertificateNumber"
                               className="block text-sm font-bold text-gray-700">
                            Номер техпаспорта
                        </label>
                        <div className="flex items-center mt-2">
                            <input
                                type="text"
                                id="VehicleRegistrationCertificateNumber"
                                value={VehicleRegistrationCertificateNumber}
                                onChange={(e) => setVehicleRegistrationCertificateNumber(e.target.value)}
                                className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Введите номер техпаспорта"
                                required
                            />
                            <div className="ml-2 relative group">
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
                                    aria-label="Дополнительная информация"
                                >
                                    ?
                                </button>
                                <div
                                    className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-md mt-2 px-4 py-3 text-sm text-gray-700 w-64">
                                    <img
                                        src="/idnp.webp"
                                        alt="Пример IDNP/IDNO"
                                        className="w-full h-auto mb-2 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <div
                                className={`${isConsentGiven ? "bg-green-500" : "bg-gray-400"} relative inline-block w-16 h-8 rounded-full cursor-pointer`}
                                onClick={() => setIsConsentGiven(!isConsentGiven)}
                            >
                            <span
                                className={`${isConsentGiven ? "translate-x-8" : "translate-x-0"} inline-block w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300`}
                            />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center space-x-2">
                                <label htmlFor="consent" className="text-sm text-gray-700 flex-grow">
                                    Согласие на обработку данных
                                </label>
                                <Link
                                    href={`/Privacy`}
                                    className="text-blue-700"
                                >
                                    Политика конфиденциальности
                                </Link>
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={isConsentGiven}
                                    onChange={() => setIsConsentGiven(!isConsentGiven)}
                                    className="sr-only"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={!isConsentGiven}
                                className={`w-full ${isConsentGiven ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"} text-white font-semibold py-2 px-4 rounded-lg shadow-md`}
                            >
                                Рассчитать
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </div>
);

export default InsuranceRequestForm;
