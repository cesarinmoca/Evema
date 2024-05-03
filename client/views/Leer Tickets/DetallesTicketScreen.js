import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetallesTicketScreen({ route, navigation }) {
  // Ticket parámetro
  const { ticket } = route.params;

  // Titulo de vista
  useEffect(() => {
    navigation.setOptions({
      title: ticket.nombre,
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
