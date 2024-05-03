import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function GestionarEventosScreen({ navigation }) {
  // Título de la vista
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Gestionar Eventos',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Hello World from GestionarEventosScreen!</Text>
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

export default GestionarEventosScreen;
