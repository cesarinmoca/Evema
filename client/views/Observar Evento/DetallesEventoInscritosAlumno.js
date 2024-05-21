import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function DetallesEventoInscritosAlumno({ route, navigation }) {
  const { evento } = route.params;
  const [showUnsubscribeDialog, setShowUnsubscribeDialog] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: evento.nombre,
    });
  }, [evento.nombre, navigation]);

  const renderIntegrantes = (integrantes, tipo) => {
    return (
      <View>
        <Text style={styles.subtitulo}>{tipo}:</Text>
        {integrantes.length > 0 ? (
          integrantes.map((integrante, index) => (
            <View key={index} style={styles.integranteItem}>
              <Text>{integrante.nombre}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.infoText}>No hay {tipo.toLowerCase()}</Text>
        )}
      </View>
    );
  };

  const handleUnsubscribePress = () => {
    Alert.alert(
      "¿Seguro que deseas salir de este evento?",
      "",
      [
        {
          text: "Sí",
          onPress: () => {
            setShowUnsubscribeDialog(true);
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const handleConfirmUnsubscribe = async () => {
    try {
      // Realiza una solicitud al servidor para desinscribirse del evento
      const desinscripcionResponse = await fetch('http://172.16.100.231:3000/desinscribirse', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idEvento: evento.id,
          idAlumno: 3 // Reemplaza con el ID del alumno actual
        })
      });

      if (!desinscripcionResponse.ok) {
        throw new Error('Error al salir del evento');
      }

      const data = await desinscripcionResponse.json();
      alert(data.message); // Muestra un mensaje de éxito
      // Redirige al Home
      navigation.navigate('HomeAlumno');
    } catch (error) {
      console.error('Error al salir del evento:', error);
      alert('Error al salir del evento');
    }
  };

  const handleCancelUnsubscribe = () => {
    setShowUnsubscribeDialog(false);
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
      
      <TouchableOpacity style={styles.unsubscribeButton} onPress={handleUnsubscribePress}>
        <Text style={styles.unsubscribeButtonText}>Salir del Evento</Text>
      </TouchableOpacity>

      {/* ConfirmUnsubscribeDialog */}
      {showUnsubscribeDialog && (
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>¿Seguro que deseas salir de este evento?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCancelUnsubscribe}>
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.unsubscribeButton]} onPress={handleConfirmUnsubscribe}>
                <Text style={styles.buttonText}>SI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  unsubscribeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  unsubscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DetallesEventoInscritosAlumno;
