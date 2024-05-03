import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function LeerTicketsScreen({ navigation }) {
  // Título de vista
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Leer Tickets', 
    });
  }, [navigation]);

  const tickets = [
    { id: 1, nombre: 'Ticket 1', descripcion: 'Descripción del Ticket 1' },
    { id: 2, nombre: 'Ticket 2', descripcion: 'Descripción del Ticket 2' },
    { id: 3, nombre: 'Ticket 3', descripcion: 'Descripción del Ticket 3' },
  ];

  // Evento con clic
  const handleTicketPress = (ticket) => {
    // Vista a la que dirige
    navigation.navigate('DetallesTicket', { ticket });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tickets:</Text>
      {tickets.map((ticket) => (
        <TouchableOpacity key={ticket.id} onPress={() => handleTicketPress(ticket)}>
          <View style={styles.ticketContainer}>
            <Text style={styles.ticketNombre}>{ticket.nombre}</Text>
            <Text style={styles.ticketDescripcion}>{ticket.descripcion}</Text>
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
  ticketContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  ticketNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketDescripcion: {
    fontSize: 16,
  },
});

export default LeerTicketsScreen;
