CREATE TABLE Cultivo(
	id_cultivo serial PRIMARY KEY,
	nombre VARCHAR(50),
	descripcion VARCHAR(250),
	nodo VARCHAR(50) NOT NULL,
	activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Umbrales_Cultivo(
	id_umbrales serial PRIMARY KEY,
	temp_min FLOAT,
	temp_max FLOAT,
	humedad_min FLOAT,
	humedad_max FLOAT,
	radiacion_uv_min FLOAT,
	radiacion_uv_max FLOAT,
	id_cultivo INT NOT NULL,
	FOREIGN KEY(id_cultivo)
		REFERENCES Cultivo(id_cultivo)

);

CREATE TABLE Sensor(
	id_sensor serial PRIMARY KEY,
	temperatura BOOLEAN DEFAULT FALSE,
	humedad BOOLEAN DEFAULT FALSE,
	radiacion BOOLEAN DEFAULT FALSE,
	latitud FLOAT,
	longitud FLOAT,
	activo BOOLEAN DEFAULT TRUE,
	id_cultivo INT NOT NULL,
	FOREIGN KEY(id_cultivo)
		REFERENCES Cultivo(id_cultivo)
);

CREATE TABLE Estado_Sensor(
	id_estado_sensor serial PRIMARY KEY,
	fecha_hora TIMESTAMP,
	bateria INT,
	categoria VARCHAR(15),
	id_sensor INT NOT NULL,
	FOREIGN KEY(id_sensor)
		REFERENCES Sensor(id_sensor)
);

CREATE TABLE registro_temperatura(
	id_reg_temp serial PRIMARY KEY,
	fecha_hora TIMESTAMP,
	valor FLOAT,
	id_sensor INT NOT NULL,
	FOREIGN KEY(id_sensor)
		REFERENCES Sensor(id_sensor)
);

CREATE TABLE registro_humedad(
	id_reg_humedad serial PRIMARY KEY,
	fecha_hora TIMESTAMP,
	valor FLOAT,
	id_sensor INT NOT NULL,
	FOREIGN KEY(id_sensor)
		REFERENCES Sensor(id_sensor)
);

CREATE TABLE registro_radiacion(
	id_reg_radiacion serial PRIMARY KEY,
	fecha_hora TIMESTAMP,
	valor FLOAT,
	id_sensor INT NOT NULL,
	FOREIGN KEY(id_sensor)
		REFERENCES Sensor(id_sensor)
);

CREATE OR REPLACE FUNCTION fn_crear_umbrales()
  RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO umbrales_cultivo(temp_min, temp_max, humedad_min, humedad_max, radiacion_uv_min, 
            radiacion_uv_max, id_cultivo)
	VALUES (0, 0, 0, 0,0, 0, NEW.id_cultivo);

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tg_crear_umbrales
  AFTER INSERT
  ON cultivo
  FOR EACH ROW
  EXECUTE PROCEDURE fn_crear_umbrales();


INSERT INTO Cultivo (nombre, descripcion, nodo) VALUES 
('Cultivo 1', 'Cultivo de fresas', 'N0001');


INSERT INTO Umbrales_Cultivo (temp_min, temp_max, humedad_min, humedad_max, radiacion_uv_min, radiacion_uv_max, id_cultivo) VALUES 
(15.9, 26, 35, 62.5, 5, 9, 1),
(18, 29, 41, 76, 7, 11, 1),
(17, 29, 39, 69, 8, 10, 1),
(22, 30, 40, 53, 5, 7, 1),
(20, 33, 35, 72.5, 5, 9, 1),
(15, 27.5, 20, 62.5, 6, 9, 1),
(20.5, 29, 26, 42.5, 6, 12, 1),
(23.25, 35, 27, 48, 7, 10, 1),
(17, 28, 30, 51, 5, 11, 1),
(15, 26, 32, 47.75, 5, 9, 1);


INSERT INTO Sensor (temperatura, humedad, radiacion, latitud, longitud, id_cultivo) VALUES 
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1),
('1', '0', '0', -2.0000000, -77.5000000, 1),
('0', '1', '0', -2.0000000, -77.5000000, 1),
('0', '0', '1', -2.0000000, -77.5000000, 1);

INSERT INTO Estado_Sensor (fecha_hora, bateria, categoria, id_sensor) VALUES 
('2020/05/30 13:00:00.59', 50, 'categoria1', 1),
('2020/05/31 12:20:01.59', 90, 'categoria2', 2),
('2020/06/03 17:34:38.59', 76, 'categoria3', 3),
('2020/06/07 09:46:10.59', 100, 'categoria4', 4),
('2020/06/09 10:05:50.59', 45, 'categoria5', 5),
('2020/06/15 12:13:22.59', 33, 'categoria6', 6),
('2020/06/27 13:30:43.59', 50, 'categoria7', 7),
('2020/07/02 14:54:56.59', 25, 'categoria8', 8),
('2020/07/14 06:33:40.59', 50, 'categoria9', 9),
('2020/07/20 15:01:04.59', 81, 'categoria10', 10);


INSERT INTO registro_temperatura (fecha_hora, valor, id_sensor) VALUES 
('2020/05/30 13:00:00.59', 20, 1),
('2020/05/31 12:20:01.59', 25, 4),
('2020/06/03 17:34:38.59', 30, 7),
('2020/06/07 09:46:10.59', 32, 10),
('2020/06/09 10:05:50.59', 19, 13),
('2020/06/15 12:13:22.59', 18, 16),
('2020/06/27 13:30:43.59', 25, 19),
('2020/07/02 14:54:56.59', 32, 22),
('2020/07/14 06:33:40.59', 23, 25),
('2020/07/20 15:01:04.59', 26, 28);



INSERT INTO registro_humedad (fecha_hora, valor, id_sensor) VALUES 
('2020/05/30 13:00:00.59', 52, 2),
('2020/05/31 12:20:01.59', 45, 5),
('2020/06/03 17:34:38.59', 40, 8),
('2020/06/07 09:46:10.59', 52, 11),
('2020/06/09 10:05:50.59', 39, 14),
('2020/06/15 12:13:22.59', 28, 17),
('2020/06/27 13:30:43.59', 55, 20),
('2020/07/02 14:54:56.59', 42, 23),
('2020/07/14 06:33:40.59', 33, 26),
('2020/07/20 15:01:04.59', 66, 29);


INSERT INTO registro_radiacion (fecha_hora, valor, id_sensor) VALUES 
('2020/05/30 13:00:00.59', 8, 3),
('2020/05/31 12:20:01.59', 6, 6),
('2020/06/03 17:34:38.59', 5, 9),
('2020/06/07 09:46:10.59', 11, 12),
('2020/06/09 10:05:50.59', 10, 15),
('2020/06/15 12:13:22.59', 9, 18),
('2020/06/27 13:30:43.59', 4, 21),
('2020/07/02 14:54:56.59', 5, 24),
('2020/07/14 06:33:40.59', 12, 27),
('2020/07/20 15:01:04.59', 11, 30);