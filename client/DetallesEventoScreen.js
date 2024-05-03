import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetallesEventoScreen({ route, navigation }) {
  // Obtener el evento pasado como parámetro de navegación
  const { evento } = route.params;

  // Cambiar el título de la barra de navegación
  useEffect(() => {
    navigation.setOptions({
      title: evento.nombre, // Utiliza el nombre del evento como título
    });
  }, [evento.nombre, navigation]);

  // Función para renderizar la lista de integrantes
  const renderIntegrantes = (integrantes, tipo) => {
    if (integrantes && integrantes.length > 0) {
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
    } else {
      // Ejemplos de integrantes
      const ejemplos = tipo === 'Staff' ? ['Staff 1', 'Staff 2', 'Staff 3'] : ['Alumno 1', 'Alumno 2', 'Alumno 3'];

      return (
        <View>
          <Text style={styles.subtitulo}>{tipo}:</Text>
          {ejemplos.map((ejemplo, index) => (
            <View key={index} style={styles.integranteItem}>
              <Text>{ejemplo}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Evento</Text>
      <Text style={styles.eventoTitulo}>Nombre del Evento: {evento.nombre}</Text>
      <Text style={styles.eventoDescripcion}>Descripción: {evento.descripcion}</Text>
      <Text style={styles.eventoFecha}>Fecha: {evento.fecha}</Text>
      <Text style={styles.eventoHora}>Hora: {evento.hora}</Text>
      <Text style={styles.eventoCodigoSalida}>Código de Salida: {evento.codigoSalida}</Text>
      <View style={styles.divider}></View>
      {renderIntegrantes(evento.staff, 'Staff')}
      {renderIntegrantes(evento.alumnos, 'Alumnos')}
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
  eventoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventoDescripcion: {
    fontSize: 16,
    marginBottom: 10,
  },
  eventoFecha: {
    fontSize: 16,
    marginBottom: 10,
  },
  eventoHora: {
    fontSize: 16,
    marginBottom: 10,
  },
  eventoCodigoSalida: {
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
});

export default DetallesEventoScreen;
