import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

function NuevoEventoScreen({ navigation }) {
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState(new Date());
  const [horaEvento, setHoraEvento] = useState('');
  const [codigoSalida, setCodigoSalida] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Título de vista
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Crear Nuevo Evento',
    });
  }, [navigation]);

  const handleGuardarEvento = () => {
    const formattedFechaEvento = format(fechaEvento, 'yyyy-MM-dd');
    const formattedHoraEvento = horaEvento;
  
    fetch('http://localhost/eventos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreEvento,
        descripcionEvento,
        fechaEvento: `${formattedFechaEvento} ${formattedHoraEvento}`,
        codigoSalida,
        idUsuarioCreador: 1, // ID del usuario creador, actualiza este valor según sea necesario
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar la solicitud al servidor');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      Alert.alert('Evento guardado correctamente');
      navigation.navigate('Home'); // Redirige a la pantalla de inicio después de crear el evento
    })
    .catch(error => {
      console.error('Error al enviar solicitud al servidor:', error);
      Alert.alert('Error al guardar el evento');
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del evento"
        value={nombreEvento}
        onChangeText={setNombreEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="Código de Asistencia"
        value={codigoSalida}
        onChangeText={setCodigoSalida}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción del evento"
        value={descripcionEvento}
        onChangeText={setDescripcionEvento}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
        <Text style={styles.dateTimeText}>{fechaEvento.toDateString()}</Text>
      </View>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => {
          setShowDatePicker(false);
          setFechaEvento(date);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <TextInput
        style={[styles.input, styles.textInput]}
        placeholder="14:00:00"
        value={horaEvento}
        onChangeText={setHoraEvento}
      />
      <Button title="Guardar Evento" onPress={handleGuardarEvento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  textArea: {
    height: 100,
  },
  textInput: {
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default NuevoEventoScreen;
