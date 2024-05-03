import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetallesTicketScreen({ route, navigation }) {
  // Obtener el ticket pasado como parámetro de navegación
  const { ticket } = route.params;

  // Cambiar el título de la barra de navegación
  useEffect(() => {
    navigation.setOptions({
      title: ticket.nombre, // Utiliza el nombre del ticket como título
    });
  }, [ticket.nombre, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Ticket</Text>
      <Text style={styles.ticketDescripcion}>Descripción: {ticket.descripcion}</Text>
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
  ticketDescripcion: {
    fontSize: 16,
  },
});

export default DetallesTicketScreen;
