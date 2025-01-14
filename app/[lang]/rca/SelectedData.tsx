import React from "react";

interface SelectedDataProps {
    data: {
        vehicleMark: string;
        vehicleModel: string;
        vehicleRegistrationNumber: string;
        bonusMalusClass: number;
        personFirstName: string;
        personLastName: string;
    };
}

const SelectedData: React.FC<SelectedDataProps> = ({ data }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-700">Результаты расчета</h2>
            <ul className="mt-2 text-gray-600">
                <li><strong>Марка:</strong> {data.vehicleMark}</li>
                <li><strong>Модель:</strong> {data.vehicleModel}</li>
                <li><strong>Номер регистрации:</strong> {data.vehicleRegistrationNumber}</li>
                <li><strong>Класс бонус-малус:</strong> {data.bonusMalusClass}</li>
                <li><strong>Имя:</strong> {data.personFirstName}</li>
                <li><strong>Фамилия:</strong> {data.personLastName}</li>
            </ul>
        </div>
    );
};

export default SelectedData;
