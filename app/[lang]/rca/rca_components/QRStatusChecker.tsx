import React, { useState, useEffect } from 'react';
import axiosInstance from "@/lib/axiosInstance.ts";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue.tsx";

interface QRStatusCheckerProps {
    uuid: string;  // UUID для запроса статуса
    onStatusChange: (status: string) => void;  // Callback для обновления статуса
    onError?: (error: any) => void;
}

const QRStatusChecker: React.FC<QRStatusCheckerProps> = ({ uuid, onStatusChange, onError }) => {
    const [status, setStatus] = useState<string | null>('pending');  // Начальный статус
    const [isChecking, setIsChecking] = useState<boolean>(true);  // Состояние проверки

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await axiosInstance.get(`/qr/${uuid}/status/`);
                console.log('Ответ сервера:', response.data);  // Логируем весь ответ

                // Проверяем, что статус существует в ответе
                const data = response.data;
                if (data && data.status) {
                    console.log('Получен статус:', data.status);  // Лог для статуса

                    // Обновляем статус, если он изменился
                    if (data.status !== status) {
                        setStatus(data.status);
                        onStatusChange(data.status);  // Передаем новый статус родительскому компоненту
                    }

                    // Прерываем проверку, если статус успешный или неудачный
                    if (data.status === 'Paid' || data.status === 'failed') {
                        setIsChecking(false);  // Останавливаем проверку
                        await handleSaveRca();
                    }
                } else {
                    console.error('Статус не найден в ответе:', data);
                }
            } catch (error) {
                console.error('Ошибка при запросе статуса:', error);
                if (onError) onError(error);
            }
        };

        if (isChecking) {
            // Запускаем проверку статуса каждые 5 секунд
            const id = setInterval(checkStatus, 5000);

            // Очищаем интервал при размонтировании компонента или изменении UUID
            return () => clearInterval(id);
        }
    }, [uuid, isChecking, onStatusChange, onError, status]);  // Добавляем зависимости от `status` и `isChecking`

    return (
        <div className="flex items-center justify-center p-3 mt-4">
            {isChecking ? (
                <SpinnerBlue />
            ) : (
                <p className={`text-sm ${status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                    {status === 'Paid' ? 'Оплачено' : status === 'failed' ? 'Ошибка' : status}
                </p>

            )}
        </div>
    );
};

export default QRStatusChecker;
