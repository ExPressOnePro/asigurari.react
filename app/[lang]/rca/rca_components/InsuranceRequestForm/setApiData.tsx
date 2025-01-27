import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setApiData, setFormSubmitted, setSuccess, setError } from '@/store/insuranceFormSlice';

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestData = { IDNX, VehicleRegistrationCertificateNumber };

    try {
        const response = await axios.post("/rca/calculate-rca/", requestData);
        const result = response.data;

        // Извлекаем только нужные данные из ответа
        const apiData = {
            BonusMalusClass: result.BonusMalusClass,
            IsSuccess: result.IsSuccess,
            ErrorMessage: result.ErrorMessage,
            Territory: result.Territory,
            PersonFirstName: result.PersonFirstName,
            PersonLastName: result.PersonLastName,
            VehicleMark: result.VehicleMark,
            VehicleModel: result.VehicleModel,
            VehicleRegistrationNumber: result.VehicleRegistrationNumber,
        };

        // Сохраняем данные с API в Redux
        dispatch(setApiData(apiData));

        setSuccess(true);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Ошибка при запросе к API:", error);
        setError("Произошла ошибка при расчетах.");
    }
};
