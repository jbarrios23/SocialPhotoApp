import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const captureImage = async () => {
  try {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la cámara.');
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log('Resultado de la cámara:', result);  // Verifica el resultado aquí

    // Verificar si el resultado tiene una imagen y no fue cancelado
    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;  // Obtener la URI de la imagen
      // const description = "Descripción de la foto";
      // const savedUri = await saveImage(imageUri, description);
      console.log('Imagen guardada en:', imageUri);
      return imageUri;
    } else {
      console.log('El usuario canceló o ocurrió un error');
      return null;
    }
  } catch (error) {
    console.error('Error al capturar la imagen:', error);
    return null;
  }
};

export const saveImage = async (uri, description) => {
  try {
    console.log("URI antes de decodificar:", uri);

    // En general no es necesario decodificar la URI aquí
    const decodedUri = uri;  // La URI proporcionada por ImagePicker ya está lista para usar
    console.log("URI después de decodificar:", decodedUri);

    if (!decodedUri || typeof decodedUri !== 'string') {
      throw new Error("La URI de la imagen no es válida");
    }

    // Obtener el nombre del archivo
    const fileName = decodedUri.split('/').pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    // Verificar si el archivo existe antes de copiar
    const fileInfo = await FileSystem.getInfoAsync(decodedUri);
    if (!fileInfo.exists) {
      throw new Error("El archivo no existe en la URI especificada");
    }

    // Copiar el archivo a la nueva ubicación
    await FileSystem.copyAsync({
      from: decodedUri,
      to: newPath,
    });

    const newImage = { uri: newPath, description };

    // Obtener las imágenes previas de AsyncStorage y agregar la nueva imagen
    const storedImages = await getSavedImage();
    storedImages.push(newImage);

    // Guardar las imágenes actualizadas en AsyncStorage
    await AsyncStorage.setItem('images', JSON.stringify(storedImages));
    console.log("Imagen guardada:", newImage);
    return newPath;
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    return null;
  }
};

export const getSavedImage = async () => {
  try {
    const storedImages = await AsyncStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : [];
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    return [];
  }
};
