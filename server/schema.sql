CREATE DATABASE EVEMA;

USE EVEMA;

--Tabla de Usuarios:
CREATE TABLE Usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre_usuario VARCHAR(50) NOT NULL,
contrasena VARCHAR(50) NOT NULL,
rol ENUM('Gestor', 'Usuario') NOT NULL
);

--Tabla de Eventos:
CREATE TABLE Eventos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
fecha DATE NOT NULL,
hora TIME,
codigo_salida VARCHAR(20) NOT NULL,
id_usuario_creador INT NOT NULL,
FOREIGN KEY (id_usuario_creador) REFERENCES Usuarios(id)
);

--Tabla de Inscripciones:
CREATE TABLE Inscripciones (
id INT AUTO_INCREMENT PRIMARY KEY,
id_evento INT NOT NULL,
id_alumno INT NOT NULL,
FOREIGN KEY (id_evento) REFERENCES Eventos(id),
FOREIGN KEY (id_alumno) REFERENCES Usuarios(id)
);

--Tabla de Postulaciones:
CREATE TABLE Postulaciones (
id INT AUTO_INCREMENT PRIMARY KEY,
id_evento INT NOT NULL,
id_usuario INT NOT NULL,
estado ENUM('Aceptada', 'Rechazada', 'Pendiente') NOT NULL,
FOREIGN KEY (id_evento) REFERENCES Eventos(id),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

--Tabla de Tickets:
CREATE TABLE Tickets (
id INT AUTO_INCREMENT PRIMARY KEY,
id_evento INT NOT NULL,
id_usuario INT NOT NULL,
descripcion_problema TEXT NOT NULL,
FOREIGN KEY (id_evento) REFERENCES Eventos(id),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

--Tabla de Asistencias:
CREATE TABLE Asistencias (
id INT AUTO_INCREMENT PRIMARY KEY,
id_evento INT NOT NULL,
id_usuario INT NOT NULL,
tipo ENUM('Asistencia', 'Salida') NOT NULL,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_evento) REFERENCES Eventos(id),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

--Tabla de Roles:
CREATE TABLE Roles (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre_rol VARCHAR(50) NOT NULL
);

--Maestro:
INSERT INTO Usuarios (nombre_usuario, contrasena, rol) VALUES ('Maestro', 'password', 'Gestor');

--Alumno:
INSERT INTO Usuarios (nombre_usuario, contrasena, rol) VALUES ('Alumno', 'password', 'Usuario');

