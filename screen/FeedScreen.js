import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList} from "react-native";
import { getSavedImage } from "../components/PhotoService";

const FeedScreen = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const loadImage = async () => {
            const images = await getSavedImage();
            setPhotos(images);
        };
        loadImage();
    }, []);


    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20 }}>
            <Image source={{ uri: item.uri }} style={{ width: 200, height: 200 }} />
            <Text>{item.description}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Feed de Fotos</Text>
            <FlatList
                data={photos}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

};

export default FeedScreen;