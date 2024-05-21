import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function DetallesEventoScreen({ route, navigation }) {
  // Evento parámetro 
  const { evento } = route.params;

  // Título de vista
  useEffect(() => {
    navigation.setOptions({
      title: evento.nombre,
    });
  }, [evento.nombre, navigation]);

  // Lista de integrantes
  const renderIntegrantes = (integrantes, tipo) => {
    return (
      <View>
        <Text style={styles.subtitulo}>{tipo}:</Text>
        {integrantes.map((integrante, index) => (
          <View key={index} style={styles.integranteItem}>
            <Text>{integrante}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Manejar clic en el botón de editar
  const handleEditarPress = () => {
    navigation.navigate('EditarEvento', { evento });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Evento</Text>
      <Text style={styles.infoTitle}>Nombre del Evento:</Text>
      <Text style={styles.infoText}>{evento.nombre || "Nombre del evento no proporcionado"}</Text>
      <Text style={styles.infoTitle}>Descripción:</Text>
      <Text style={styles.infoText}>{evento.descripcion || "Descripción del evento no proporcionada"}</Text>
      <Text style={styles.infoTitle}>Fecha:</Text>
      <Text style={styles.infoText}>{evento.fecha || "Fecha del evento no proporcionada"}</Text>
      <Text style={styles.infoTitle}>Hora:</Text>
      <Text style={styles.infoText}>{evento.hora || "Hora del evento no proporcionada"}</Text>
      <Text style={styles.infoTitle}>Código de Salida:</Text>
      <Text style={styles.infoText}>{evento.codigoSalida || "Código de salida no proporcionado"}</Text>
      <View style={styles.divider}></View>
      {renderIntegrantes(evento.staff || [], 'Staff')}
      {renderIntegrantes(evento.alumnos || [], 'Alumnos')}
      <TouchableOpacity style={styles.editarButton} onPress={handleEditarPress}>
        <Text style={styles.editarButtonText}>Editar</Text>
      </TouchableOpacity>
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
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  integranteItem: {
    marginBottom: 5,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  editarButton: {
    backgroundColor: '#6369a8',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  editarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default DetallesEventoScreen;
