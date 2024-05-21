import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function DetallesEventoAlumnoScreen({ route, navigation }) {
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

  // Manejar clic en el botón de inscribirse
  const handleInscribirsePress = async () => {
    Alert.alert(
      "¿Deseas inscribirte al evento?",
      "",
      [
        {
          text: "Sí",
          onPress: async () => {
            try {
              // Asignar directamente el ID del alumno (en este caso, 3)
              const idAlumno = 3;

              // Envía una solicitud al servidor para inscribirse en el evento
              const inscripcionResponse = await fetch('http://172.16.100.231:3000/inscribirse', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  idEvento: evento.id,
                  idAlumno: idAlumno
                })
              });

              if (!inscripcionResponse.ok) {
                throw new Error('Error al inscribirse en el evento');
              }

              const data = await inscripcionResponse.json();
              alert(data.message); // Muestra un mensaje de éxito
              // Redirigir al HOME
              navigation.navigate('HomeAlumno');
            } catch (error) {
              console.error('Error al inscribirse en el evento:', error);
              alert('Error al inscribirse en el evento');
            }
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
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
      <TouchableOpacity style={styles.inscribirseButton} onPress={handleInscribirsePress}>
        <Text style={styles.inscribirseButtonText}>Inscribirse al Evento</Text>
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
  inscribirseButton: {
    backgroundColor: '#6369a8',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  inscribirseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default DetallesEventoAlumnoScreen;
