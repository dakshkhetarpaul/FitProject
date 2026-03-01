export const checkCameraPermissions = async () => {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
            return true; // Permissions granted
        } catch (error) {
            return false; // Permissions denied
        }
    }
    return false; // Media devices not supported
};

export const requestCameraPermissions = async () => {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
            return true; // Permissions granted
        } catch (error) {
            return false; // Permissions denied
        }
    }
    return false; // Media devices not supported
};