// CapturePhotoButton.js
import React from 'react';
import { Button, Alert } from 'react-native';
import { captureImage, saveImage } from './PhotoService';

const CapturePhotoButton = ({onImageSaved}) => {
  const handleCapturePhoto = async () => {
    const imageUri = await captureImage();
    console.log("Image Uri from Capture ",imageUri);
    if (imageUri) {
      const description = "Descripción de la imagen"; 
      const savedUri = await saveImage(imageUri, description);
      console.log("savedUri ",savedUri);
      if (savedUri) {
        Alert.alert("Imagen guardada", "La imagen se ha guardado en el dispositivo.");
        onImageSaved();
      }
    }
  };

  return <Button title="Tomar Foto" onPress={handleCapturePhoto} />;
};

export default CapturePhotoButton;
