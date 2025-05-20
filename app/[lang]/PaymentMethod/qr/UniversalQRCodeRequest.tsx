import React, { useEffect, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance.ts";
import { useDispatch } from "react-redux";

interface UniversalQRCodeRequestProps {
    onStepChange: (step: number) => void;
    step: number;
    sum: number;
    requestData: any;
    dispatchAction: (data: any) => any;
    apiEndpoint: string;
    currency?: string;
}

const UniversalQRCodeRequest: React.FC<UniversalQRCodeRequestProps> = React.memo(
    ({ onStepChange, step, sum, requestData, dispatchAction, apiEndpoint, currency = "MDL" }) => {
        const dispatch = useDispatch();
        const isMounted = useRef(false);

        useEffect(() => {
            const sendRequest = async () => {
                if (!isMounted.current && sum) {
                    isMounted.current = true;
                    try {
                        const response = await axiosInstance.post(apiEndpoint, {
                            extension: {
                                amount: { sum, currency },
                            },
                            data: requestData,
                        });

                        if (response.data?.uuid) {
                            dispatch(
                                dispatchAction({
                                    uuid: response.data.uuid,
                                    qr_as_image: response.data.qr_as_image,
                                    url: response.data.url,
                                    status: response.data.status,
                                })
                            );
                            onStepChange(step);
                        } else {
                            throw new Error("Некорректный ответ API");
                        }
                    } catch (error) {
                        console.error("Ошибка при отправке запроса:", error);
                    }
                }
            };

            sendRequest();

            return () => {
                console.log("Компонент UniversalQRCodeRequest размонтирован");
            };
        }, [sum]);

        return null;
    }
);

export default UniversalQRCodeRequest;
