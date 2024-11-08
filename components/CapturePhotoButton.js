// CapturePhotoButton.js
import React from 'react';
import { Button, Alert } from 'react-native';
import { captureImage, saveImage } from './PhotoService';

const CapturePhotoButton = () => {
  const handleCapturePhoto = async () => {
    const imageUri = await captureImage();
    if (imageUri) {
      const description = "Descripción de la imagen"; // Puedes agregar un input para la descripción
      const savedUri = await saveImage(imageUri, description);
      if (savedUri) {
        Alert.alert("Imagen guardada", "La imagen se ha guardado en el dispositivo.");
      }
    }
  };

  return <Button title="Tomar Foto" onPress={handleCapturePhoto} />;
};

export default CapturePhotoButton;
