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


