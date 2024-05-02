import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      console.log('Foto tomada:', photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Por favor, concede permisos para acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={ref => setCameraRef(ref)}
      >
        <View style={styles.overlay}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
          </View>
        </View>
      </Camera>
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Text style={styles.buttonText}>Capturar</Text>
      </TouchableOpacity>
    </View>
  );
}

const overlayColor = 'rgba(0,0,0,0.5)';
const borderColor = '#fff';
const borderWidth = 2;
const rectangleSize = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  camera: {
    width: windowWidth - 40,
    height: 400,
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    width: rectangleSize,
    height: rectangleSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: borderWidth,
    borderColor: borderColor,
  },
  rectangle: {
    width: rectangleSize - borderWidth * 2,
    height: rectangleSize - borderWidth * 2,
    borderWidth: borderWidth,
    borderColor: borderColor,
  },
  captureButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#6369a8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
