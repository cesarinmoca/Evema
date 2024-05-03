import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function ObservarEventosScreen({ navigation }) {
  // Cambiar el título de la barra de navegación
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Observar Eventos',
    });
  }, [navigation]);

  // Eventos de ejemplo
  const eventos = [
    { id: 1, nombre: 'Evento 1', descripcion: 'Descripción del Evento 1' },
    { id: 2, nombre: 'Evento 2', descripcion: 'Descripción del Evento 2' },
    { id: 3, nombre: 'Evento 3', descripcion: 'Descripción del Evento 3' },
  ];

  // Función para manejar el clic en un evento
  const handleEventoPress = (evento) => {
    // Redirigir a otra vista pasando el evento como parámetro
    navigation.navigate('DetallesEvento', { evento });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Eventos:</Text>
      {eventos.map((evento) => (
        <TouchableOpacity key={evento.id} onPress={() => handleEventoPress(evento)}>
          <View style={styles.eventoContainer}>
            <Text style={styles.eventoNombre}>{evento.nombre}</Text>
            <Text style={styles.eventoDescripcion}>{evento.descripcion}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventoContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  eventoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventoDescripcion: {
    fontSize: 16,
  },
});

export default ObservarEventosScreen;
