import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


export const captureImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        alert("Se necesita permio para acceder a la camara");
        return;
    }


    const result = await ImagePicker.launchCameraAsync();
    if (result.canceled) {
        return result.uri;
    }
    return null;

};

export const saveImage = async (imageUri, description) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;
      await FileSystem.copyAsync({
        from: imageUri,
        to: fileUri,
      });
  
      let storedImages = await AsyncStorage.getItem('images');
      storedImages = storedImages ? JSON.parse(storedImages) : [];
      storedImages.push({ uri: fileUri, description });
      await AsyncStorage.setItem('images', JSON.stringify(storedImages));
      
      console.log('Imagen guardada localmente:', fileUri);
      return fileUri;
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      return null;
    }
  };

  export const getSavedImage=async ()=>{
    const storedImage=await AsyncStorage.getItem('images');
    return storedImage ? JSON.pase(storedImage) : [];
  };