// Importa las dependencias
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crea una instancia de la aplicación Express
const app = express();

// Configura Express para usar body-parser y cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Cambia a tu host de MySQL
  user: 'root',
  password: '', // Deja la contraseña en blanco
  database: 'EVEMA'
});

// Conecta a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Define tus rutas y controladores aquí
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});



// Endpoint para crear eventos
app.post('/eventos', (req, res) => {
  const { nombreEvento, descripcionEvento, fechaEvento, codigoSalida } = req.body;
  
  // Ejemplo de código para insertar los datos en tu base de datos:
  const query = "INSERT INTO Eventos (nombre, descripcion, fecha, codigo_salida, id_usuario_creador) VALUES (?, ?, ?, ?, ?)";
  const idUsuarioCreador = 1; // ID del usuario creador, actualiza este valor según sea necesario
  connection.query(query, [nombreEvento, descripcionEvento, fechaEvento, codigoSalida, idUsuarioCreador], (error, results) => {
    if (error) {
      console.error('Error al insertar evento en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar evento en la base de datos' });
    } else {
      console.log('Evento insertado correctamente en la base de datos');
      res.status(201).json({ message: 'Evento insertado correctamente' });
    }
  });
});



// Endpoint para obtener todos los eventos
app.get('/eventos', (req, res) => {
  const query = "SELECT * FROM Eventos";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener eventos de la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener eventos de la base de datos' });
    } else {
      console.log('Eventos obtenidos correctamente:', results);
      res.status(200).json(results);
    }
  });
});

// Endpoint para actualizar un evento
app.put('/eventos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha, hora, codigo_salida } = req.body;

  // Establece una hora por defecto si la hora es null
  const horaDB = hora !== null ? hora : '12:00:00';

  const query = "UPDATE Eventos SET nombre = ?, descripcion = ?, fecha = ?, hora = ?, codigo_salida = ? WHERE id = ?";
  connection.query(query, [nombre, descripcion, fecha, horaDB, codigo_salida, id], (error, results) => {
    if (error) {
      console.error('Error al actualizar evento en la base de datos:', error);
      res.status(500).json({ error: 'Error al actualizar evento en la base de datos' });
    } else if (results.affectedRows === 0) {
      console.error('El evento con el ID proporcionado no fue encontrado');
      res.status(404).json({ error: 'Evento no encontrado' });
    } else {
      console.log('Evento actualizado correctamente en la base de datos');
      res.status(200).json({ message: 'Evento actualizado correctamente' });
    }
  });
});

// Endpoint para inscribirse en un evento
app.post('/inscribirse', (req, res) => {
  const { idEvento, idAlumno } = req.body;
  
  // Verificar si el usuario es un alumno
  const query = "SELECT rol FROM Usuarios WHERE id = ?";
  connection.query(query, [idAlumno], (error, results) => {
    if (error) {
      console.error('Error al obtener el rol del usuario:', error);
      res.status(500).json({ error: 'Error al inscribirse en el evento' });
    } else {
      const rol = results[0].rol;
      if (rol !== 'Usuario') {
        res.status(403).json({ error: 'Solo los alumnos pueden inscribirse en eventos' });
      } else {
        // Insertar la inscripción en la base de datos
        const inscripcionQuery = "INSERT INTO Inscripciones (id_evento, id_alumno) VALUES (?, ?)";
        connection.query(inscripcionQuery, [idEvento, idAlumno], (inscripcionError, inscripcionResults) => {
          if (inscripcionError) {
            console.error('Error al inscribirse en el evento:', inscripcionError);
            res.status(500).json({ error: 'Error al inscribirse en el evento' });
          } else {
            console.log('Inscripción exitosa en el evento');
            res.status(200).json({ message: 'Inscripción exitosa en el evento' });
          }
        });
      }
    }
  });
});


// Endpoint para obtener eventos inscritos de un alumno
app.get('/tus-eventos/:idAlumno', (req, res) => {
  const { idAlumno } = req.params;
  
  const query = "SELECT * FROM Eventos WHERE id IN (SELECT id_evento FROM Inscripciones WHERE id_alumno = ?)";
  connection.query(query, [idAlumno], (error, results) => {
    if (error) {
      console.error('Error al obtener eventos inscritos del alumno:', error);
      res.status(500).json({ error: 'Error al obtener eventos inscritos del alumno' });
    } else {
      console.log('Eventos inscritos obtenidos correctamente del alumno:', results);
      res.status(200).json(results);
    }
  });
});

// Definimos el endpoint para eliminar eventos
app.delete('/eventos/:id', (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM Eventos WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar evento en la base de datos:', error);
      res.status(500).json({ error: 'Error al eliminar evento en la base de datos' });
    } else if (results.affectedRows === 0) {
      console.error('El evento con el ID proporcionado no fue encontrado');
      res.status(404).json({ error: 'Evento no encontrado' });
    } else {
      console.log('Evento eliminado correctamente de la base de datos');
      res.status(200).json({ message: 'Evento eliminado correctamente' });
    }
  });
});

// Endpoint para desinscribirse de un evento
app.delete('/desinscribirse', (req, res) => {
  const { idEvento, idAlumno } = req.body;
  
  // Eliminar la inscripción de la base de datos
  const query = "DELETE FROM Inscripciones WHERE id_evento = ? AND id_alumno = ?";
  connection.query(query, [idEvento, idAlumno], (error, results) => {
    if (error) {
      console.error('Error al desinscribirse del evento:', error);
      res.status(500).json({ error: 'Error al desinscribirse del evento' });
    } else if (results.affectedRows === 0) {
      console.error('No se encontró ninguna inscripción correspondiente');
      res.status(404).json({ error: 'No se encontró ninguna inscripción correspondiente' });
    } else {
      console.log('Desinscripción exitosa del evento');
      res.status(200).json({ message: 'Desinscripción exitosa del evento' });
    }
  });
});

// Inicia el servidor en un puerto específico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
