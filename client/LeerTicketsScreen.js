import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function LeerTicketsScreen({ navigation }) {
  // Cambiar el título de la barra de navegación
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Leer Tickets', 
    });
  }, [navigation]);

  // Tickets de ejemplo
  const tickets = [
    { id: 1, nombre: 'Ticket 1', descripcion: 'Descripción del Ticket 1' },
    { id: 2, nombre: 'Ticket 2', descripcion: 'Descripción del Ticket 2' },
    { id: 3, nombre: 'Ticket 3', descripcion: 'Descripción del Ticket 3' },
  ];

  // Función para manejar el clic en un ticket
  const handleTicketPress = (ticket) => {
    // Redirigir a otra vista pasando el ticket como parámetro
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
