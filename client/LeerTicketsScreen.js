import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar'; // Importamos el componente de NavBar

function LeerTicketsScreen({ navigation }) {
  // Cambiar el título de la barra de navegación
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Leer Tickets', 
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
            <NavBar />  
    <View style={styles.container}>
      <Text>Hello World from LeerTicketsScreen!</Text>
    </View>
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

export default LeerTicketsScreen;
