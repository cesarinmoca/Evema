import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

function EditarEventoScreen({ route, navigation }) {
  const { evento } = route.params;

  const [nombre, setNombre] = useState(evento.nombre);
  const [descripcion, setDescripcion] = useState(evento.descripcion);
  const [fecha, setFecha] = useState(evento.fecha.split('T')[0]); // Formatea la fecha
  const [hora, setHora] = useState(evento.hora);
  const [codigoSalida, setCodigoSalida] = useState(evento.codigo_salida);

  // Función para manejar el botón de guardar
  const handleGuardarPress = () => {
    // Mostrar cuadro de diálogo de confirmación
    Alert.alert(
      'Confirmar Cambios',
      '¿Estás seguro de que deseas guardar los cambios?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            guardarCambios();
          },
        },
      ]
    );
  };

  // Función para enviar los cambios al servidor
  const guardarCambios = () => {
    const updatedEvento = {
      ...evento,
      nombre,
      descripcion,
      fecha,
      hora: hora || null,
      codigoSalida
    };

    console.log(`Actualizando evento con ID: ${evento.id}`);

    fetch(`http://192.168.1.65:3000/eventos/${evento.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEvento)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      // Navegar a la vista de Home después de guardar los cambios
      navigation.navigate('Home');
    })
    .catch(error => {
      console.error('Error al actualizar el evento:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Evento</Text>
      <Text style={styles.label}>Nombre del Evento:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
      />
      <Text style={styles.label}>Hora:</Text>
      <TextInput
        style={styles.input}
        value={hora}
        onChangeText={setHora}
      />
      <Text style={styles.label}>Código de Salida:</Text>
      <TextInput
        style={styles.input}
        value={codigoSalida}
        onChangeText={setCodigoSalida}
      />
      <Button title="Guardar" onPress={handleGuardarPress} />
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default EditarEventoScreen;
