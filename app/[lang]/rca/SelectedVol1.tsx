import React from "react";

interface SelectedVol1Props {
    vehicleMark: string;
    vehicleModel: string;
    vehicleRegistrationNumber: string;
    bonusMalusClass: number;
    personFirstName: string;
    personLastName: string;
}

const SelectedVol1: React.FC<SelectedVol1Props> = ({
                                                       vehicleMark,
                                                       vehicleModel,
                                                       vehicleRegistrationNumber,
                                                       bonusMalusClass,
                                                       personFirstName,
                                                       personLastName,
                                                   }) => (
    <>
        <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium w-36">Автомобиль:</span>
            <span className="text-gray-800 font-bold">{vehicleMark} {vehicleModel} {vehicleRegistrationNumber}</span>
        </div>

        <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium w-36">Бонус-Малус:</span>
            <span className="text-gray-800 font-bold">{bonusMalusClass}</span>
        </div>

        <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium w-36">Клиент:</span>
            <span className="text-gray-800 font-bold">{personFirstName} {personLastName}</span>
        </div>
    </>
);

export default SelectedVol1;
