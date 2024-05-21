import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function DetallesEventoScreen({ route, navigation }) {
  const { evento } = route.params;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: evento.nombre,
    });
  }, [evento.nombre, navigation]);

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

  const handleEditarPress = () => {
    navigation.navigate('EditarEvento', { evento });
  };

  const handleEliminarPress = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    // Realizar la solicitud HTTP al servidor para eliminar el evento
    fetch(`http://192.168.1.65:3000/eventos/${evento.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el evento');
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert('Evento eliminado', 'El evento ha sido eliminado correctamente', [
          {
            text: 'OK',
            onPress: () => {
              setShowDeleteDialog(false);
              navigation.navigate('Home'); // Redirigir al HomeScreen después de eliminar
            },
          },
        ]);
      })
      .catch((error) => {
        console.error('Error al eliminar el evento:', error);
        Alert.alert('Error', 'Se produjo un error al eliminar el evento. Por favor, intenta nuevamente.');
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
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
      <TouchableOpacity style={styles.eliminarButton} onPress={handleEliminarPress}>
        <Text style={styles.eliminarButtonText}>Eliminar evento</Text>
      </TouchableOpacity>

      {/* ConfirmDeleteDialog */}
      {showDeleteDialog && (
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>¿Seguro que deseas eliminar este evento?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCancelDelete}>
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleConfirmDelete}>
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
  eliminarButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '60%',
    alignSelf: 'center',
  },
  eliminarButtonText: {
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
  deleteButton: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DetallesEventoScreen;
