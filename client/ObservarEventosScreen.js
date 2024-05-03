import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ObservarEventosScreen({ navigation }) {
  // Cambiar el título de la barra de navegación
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Observar Eventos',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Hello World from ObservarEventosScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ObservarEventosScreen;
