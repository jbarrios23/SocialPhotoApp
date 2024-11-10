// FeedScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Button } from "react-native";
import { getSavedImage } from "../components/PhotoService";
import CapturePhotoButton from "../components/CapturePhotoButton";
import { loadUser } from "../utils/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { signOut } from "../firebase/AuthService";

const FeedScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [userName, setUserName] = useState(null);
    const navigation = useNavigation();
    console.log("User name", userName);

    // Función para cargar las imágenes desde AsyncStorage
    const loadImages = async () => {
        const images = await getSavedImage();
        console.log("Images from Feed", images);
        setPhotos(images); // Actualiza el estado con las imágenes obtenidas
    };

    const loadUserTotal = async () => {
        try {
            const user = await loadUser();
            console.log("User name 1", user);
            if (user && user.email) {  // Verifica si el usuario tiene un correo
                console.log("User name 2", user.email);
                setUserName(user.email);  // Asigna el nombre del usuario
            } else {
                console.error("No se encontró el correo del usuario.");
            }
        } catch (error) {
            console.error("Error al cargar el nombre del usuario:", error);
        }
    };

    // Llama a loadImages cuando el componente se monta
    useEffect(() => {
        loadImages();
        //loadUserTotal();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadUserTotal();
        },[])
    );

    // Callback para actualizar el feed cuando una imagen es guardada
    const handleImageSaved = () => {
        loadImages(); // Recarga las imágenes
    };

    const handleLogout = async () => {
        try {
            // Elimina el usuario de AsyncStorage
            await AsyncStorage.removeItem('user');

            // Cierra sesión con Firebase
            await signOut();
            // Elimina las fotos de AsyncStorage (ajusta la clave si es necesario)
            await AsyncStorage.removeItem('photos');

            // Navega a la pantalla de Login
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };


    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20 }}>
            <Image source={{ uri: item.uri }} style={{ width: 200, height: 200 }} />
            <Text>{item.description}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Feed de Fotos</Text>

            {userName && <Text style={{ fontSize: 18, marginBottom: 20 }}>Hola, {userName}!</Text>}

            <FlatList
                data={photos}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <CapturePhotoButton onImageSaved={handleImageSaved} />

            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
};

export default FeedScreen;
