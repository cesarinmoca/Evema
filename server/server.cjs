const express = require('express');
const mysql = require('mysql'); 
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '', 
  database: 'EVEMA'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.post('/eventos', (req, res) => {
  const { nombreEvento, descripcionEvento, fechaEvento, horaEvento, codigoSalida } = req.body;
  // Ejemplo
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
