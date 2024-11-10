import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el nombre del usuario cuando inicie sesión
export const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('User data saved successfully'); 
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
    }
};


export const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  };
  
