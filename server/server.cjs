// Importa las dependencias
const express = require('express');
const mysql = require('mysql'); // Dependencia para MySQL
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitud HTTP

// Crea una instancia de la aplicación Express
const app = express();

// Configura Express para usar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// Ejemplo:
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});

// Inicia el servidor en un puerto específico
const PORT = process.env.PORT || 3000; // Puerto predeterminado: 3000
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.post('/eventos', (req, res) => {
  const { nombreEvento, descripcionEvento, fechaEvento, horaEvento, codigoSalida } = req.body;
  // Aquí puedes guardar los datos del evento en tu base de datos MySQL
  // Ejemplo de código para insertar los datos en tu base de datos:
  const query = "INSERT INTO Eventos (nombre, descripcion, fecha, codigo_salida) VALUES (?, ?, ?, ?)";
  connection.query(query, [nombreEvento, descripcionEvento, fechaEvento, codigoSalida], (error, results) => {
    if (error) {
      console.error('Error al insertar evento en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar evento en la base de datos' });
    } else {
      console.log('Evento insertado correctamente en la base de datos');
      res.status(200).json({ message: 'Evento insertado correctamente' });
    }
  });
});
