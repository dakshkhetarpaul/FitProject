import React, { useEffect, useRef } from 'react';
import { useCamera } from '../hooks/useCamera';

const CameraView = () => {
    const videoRef = useRef(null);
    const { startCamera, stopCamera } = useCamera();

    useEffect(() => {
        startCamera(videoRef.current);

        return () => {
            stopCamera();
        };
    }, [startCamera, stopCamera]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline></video>
        </div>
    );
};

export default CameraView;