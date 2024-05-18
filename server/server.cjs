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


// Inicia el servidor en un puerto específico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
