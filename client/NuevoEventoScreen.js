import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function NuevoEventoScreen({ navigation }) {
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState(new Date());
  const [horaEvento, setHoraEvento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleGuardarEvento = () => {
    // Tu lógica para guardar el evento
    console.log('Datos del evento:', {
      nombreEvento,
      descripcionEvento,
      fechaEvento,
      horaEvento,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del evento"
        value={nombreEvento}
        onChangeText={setNombreEvento}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción del evento"
        value={descripcionEvento}
        onChangeText={setDescripcionEvento}
        multiline
      />
      <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => {
          setShowDatePicker(false);
          setFechaEvento(date);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <Text>{fechaEvento.toDateString()}</Text>
      <Button title="Seleccionar Hora" onPress={() => setShowTimePicker(true)} />
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(time) => {
          setShowTimePicker(false);
          setHoraEvento(time);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
      <Text>{horaEvento.toTimeString()}</Text>
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default NuevoEventoScreen;
