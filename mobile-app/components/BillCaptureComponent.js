import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker'; // Assuming you're using this package for image selection
import Tesseract from 'react-native-tesseract-ocr';  // Assuming you're using this package for OCR

const BillCaptureComponent = () => {
  const [imageSource, setImageSource] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  const chooseImage = () => {
    const options = {
      title: 'Select Bill Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageSource(source);
        processImageWithOCR(response.path);
      }
    });
  };

  const processImageWithOCR = async (imagePath) => {
    try {
      const result = await Tesseract.recognize(
        imagePath,
        'LANG_ENGLISH', // language
        {
          whitelist: null,
          blacklist: null,
        }
      );
      setOcrResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose Bill Image" onPress={chooseImage} />
      {imageSource && <Image style={styles.billImage} source={imageSource} />}
      <Text style={styles.ocrText}>{ocrResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  billImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginTop: 20,
  },
  ocrText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default BillCaptureComponent;
