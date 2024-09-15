import React, { useRef, useEffect, useState } from 'react';

const CameraAccess = () => {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported by your browser.');
      return;
    }

    const startCamera = async () => {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }, // Use 'environment' for back camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      } catch (err) {
        console.error('Camera access error:', err);
        setError('Unable to access the camera. Please check your permissions.');
      }
    };

    startCamera();

    const takePicture = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Save the image as a data URL or upload to server
        const imageDataUrl = canvas.toDataURL('image/png');
        console.log(imageDataUrl);
      };      

    // Cleanup: stop the camera stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h2>Mobile Camera Access</h2>
      {error && <p>{error}</p>}
      {isCameraActive ? (
        <>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: 'auto' }}
          />
          {/* <button className="btn btn-primary" onClick={takePicture}>Start Scanning</button> */}
        </>
        
      ) : (
        <p>Loading camera...</p>
      )}
    </div>
  );
};

export default CameraAccess;
