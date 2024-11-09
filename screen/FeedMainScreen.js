import { StyleSheet, Text, View } from 'react-native';
import FeedScreen from './FeedScreen';
import CapturePhotoButton from '../components/CapturePhotoButton';

export default function FeedMainScreen(){
    return (
        <View style={styles.container}>
          {/* <CapturePhotoButton/> */}
          <FeedScreen />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'   
    },
  });