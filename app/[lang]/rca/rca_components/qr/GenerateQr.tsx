// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from "@/store/store.ts";
// import axiosInstance from "@/lib/axiosInstance.ts";
// import QRCodeImage from "@/app/[lang]/rca/rca_components/QRCodeImage.tsx";
// import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue.tsx";
// import { setQrCodeData } from "@/store/insuranceFormSlice.ts";
//
// interface QRCodeFetcherProps {
//     onStepChange: any;
// }
//
// const QRCodeFetcher: React.FC<QRCodeFetcherProps> = ({ onStepChange }) => {
//     const dispatch = useDispatch();
//     const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
//     const qrCodeData = useSelector((state: RootState) => state.insuranceForm.qrCodeData);
//     const userData = useSelector((state: RootState) => state.insuranceForm.userData);
//     const additionalData = useSelector((state: RootState) => state.insuranceForm.additionalData);
//     const additionalCarInfo = useSelector((state: RootState) => state.insuranceForm.additionalCarInfo);
//
//     const [isQrCodeLoading, setIsQrCodeLoading] = useState(false);
//     const [qrCodeError, setQrCodeError] = useState<string | null>(null);
//     const hasFetchedQrCodeRef = useRef(false);
//
//     const [statusCheckData, setStatusCheckData] = useState<string | null>(null);
//     const [isStatusChecking, setIsStatusChecking] = useState(false);
//     const [statusCheckError, setStatusCheckError] = useState<string | null>(null);
//
//     useEffect(() => {
//         hasFetchedQrCodeRef.current = false;
//         dispatch(setQrCodeData(null));
//         setStatusCheckData(null);
//         setQrCodeError(null);
//         setStatusCheckError(null);
//         setIsStatusChecking(false);
//     }, [selectedInsurer, dispatch]);
//
//     useEffect(() => {
//         if (selectedInsurer && !hasFetchedQrCodeRef.current) {
//             hasFetchedQrCodeRef.current = true;
//
//             const fetchQrCode = async () => {
//                 setIsQrCodeLoading(true);
//                 try {
//                     console.log("Отправка запроса на /qr/", {
//                         extension: {
//                             amount: {
//                                 sum: selectedInsurer.PrimeSumMDL,
//                                 currency: "MDL",
//                             },
//                         },
//                     });
//
//                     const response = await axiosInstance.post('/qr/', {
//                         extension: {
//                             amount: {
//                                 sum: selectedInsurer.PrimeSumMDL,
//                                 currency: "MDL",
//                             },
//                         },
//                         data: {
//                             Company: { IDNO: selectedInsurer?.IDNO },
//                             InsuredPhysicalPerson: {
//                                 IdentificationCode: userData?.IDNX,
//                                 BirthDate: additionalData?.BirthDate,
//                                 IsFromTransnistria: additionalData?.IsFromTransnistria,
//                                 PersonIsExternal: additionalData?.PersonIsExternal,
//                             },
//                             InsuredVehicle: (additionalData?.IsFromTransnistria || additionalData?.PersonIsExternal === true) ? {
//                                 ProductionYear: additionalCarInfo?.ProductionYear,
//                                 RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
//                                 CilinderVolume: additionalCarInfo?.CilinderVolume,
//                                 TotalWeight: additionalCarInfo?.TotalWeight,
//                                 EnginePower: additionalCarInfo?.EnginePower,
//                                 Seats: additionalCarInfo?.Seats,
//                             } : {
//                                 RegistrationCertificateNumber: userData?.VehicleRegistrationCertificateNumber,
//                             },
//                             StartDate: additionalData?.StartDate,
//                             PossessionBase: additionalData?.PossessionBase,
//                             DocumentPossessionBaseDate: additionalData?.DocumentPossessionBaseDate,
//                             OperatingMode: userData?.OperatingModes,
//                             qrCode: qrCodeData?.uuid,
//                         }
//                     });
//
//                     console.log("Ответ API:", response);
//
//                     if (response.data?.qr_as_image && response.data?.url && response.data?.uuid) {
//                         console.log("QR-код успешно загружен:", response.data);
//
//
//                         dispatch(setQrCodeData({
//                             uuid: response.data.uuid,
//                             qr_as_image: response.data.qr_as_image,
//                             url: response.data.url,
//                             status: response.status,
//                         }));
//
//                         // Начинаем проверку статуса сразу после загрузки QR
//                         setIsStatusChecking(true);
//                     } else {
//                         throw new Error('Некорректный ответ API');
//                     }
//                 } catch (err: unknown) {
//                     console.error("Ошибка при запросе QR-кода:", err);
//
//                     if (err instanceof Error) {
//                         setQrCodeError(`Не удалось загрузить QR-код: ${err.message}`);
//                     } else {
//                         setQrCodeError('Не удалось загрузить QR-код.');
//                     }
//                 } finally {
//                     setIsQrCodeLoading(false);
//                 }
//             };
//
//             fetchQrCode();
//         }
//
//     }, [selectedInsurer, dispatch]);
//
//     useEffect(() => {
//         if (!isStatusChecking || !qrCodeData?.uuid) return;
//
//         const checkStatus = async () => {
//             try {
//                 const response = await axiosInstance.get(`/qr/${qrCodeData.uuid}/status/`);
//                 const data = response.data;
//
//                 if (data?.status) {
//                     setStatusCheckData(data.status);
//                     onStepChange(5); // Переключение на следующий шаг
//                     setIsStatusChecking(false);
//                 }
//             } catch (error) {
//                 setStatusCheckError('Ошибка при проверке статуса. Попробуйте позже.');
//                 setIsStatusChecking(false);
//             }
//         };
//
//         const intervalId = setInterval(checkStatus, 5000);
//
//         return () => clearInterval(intervalId); // Очистка таймера при размонтировании
//     }, [qrCodeData, isStatusChecking, onStepChange]);
//
//     return (
//         <div className="flex flex-col items-center mt-4">
//             {isQrCodeLoading ? (
//                 <SpinnerBlue />
//             ) : qrCodeError ? (
//                 <p className="text-red-500">{qrCodeError}</p>
//             ) : qrCodeData?.uuid ? (
//                 <QRCodeImage qrImageData={qrCodeData.qr_as_image} url={qrCodeData.url} />
//             ) : null}
//
//             <div className="mt-4 w-full text-center">
//                 {isStatusChecking && <SpinnerBlue />}
//                 {statusCheckData && (
//                     <p className={`mt-2 text-sm ${
//                         statusCheckData === 'Active'
//                             ? 'text-green-500'
//                             : statusCheckData === 'failed'
//                                 ? 'text-red-500'
//                                 : 'text-gray-500'
//                     }`}>
//                         {statusCheckData === 'Active' ? 'Оплачено' :
//                             statusCheckData === 'failed' ? 'Ошибка' :
//                                 `Статус: ${statusCheckData}`}
//                     </p>
//                 )}
//                 {statusCheckError && <p className="text-red-500">{statusCheckError}</p>}
//             </div>
//         </div>
//     );
// };
//
// export default QRCodeFetcher;
