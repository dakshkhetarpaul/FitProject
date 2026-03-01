import { useEffect, useState } from 'react';
import { requestCameraPermission } from '../utils/permissions';

const useCamera = () => {
    const [isCameraAvailable, setIsCameraAvailable] = useState(false);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const checkCameraAvailability = async () => {
            const permissionGranted = await requestCameraPermission();
            if (permissionGranted) {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setStream(mediaStream);
                    setIsCameraAvailable(true);
                } catch (error) {
                    console.error('Error accessing the camera:', error);
                    setIsCameraAvailable(false);
                }
            } else {
                setIsCameraAvailable(false);
            }
        };

        checkCameraAvailability();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const startCamera = async () => {
        if (!isCameraAvailable) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setIsCameraAvailable(true);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsCameraAvailable(false);
        }
    };

    return { isCameraAvailable, stream, startCamera, stopCamera };
};

export default useCamera;