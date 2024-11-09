import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el nombre del usuario cuando inicie sesión
export const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user)); // Guarda los datos del usuario
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
    }
};

export const loadUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');  // Obtiene el usuario desde AsyncStorage
        console.log('Get user',user)
        if (user) {
            const parsedUser = JSON.parse(user);  // Intenta parsear el valor
            console.log('Get user 2',parsedUser)
            return parsedUser;
        } else {
            console.error("Error al cargar el nombre del usuario 1:", error);
            return '';
        }

    } catch (error) {

        console.error("Error al cargar el nombre del usuario:", error);
        return '';
    }
};
