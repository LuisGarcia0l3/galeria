
<?php

require_once 'DBAbstractModel.php';

class ModelAdmin extends DBAbstractModel
{
    public $success;
    public $mensaje;
    public $datos;

    public function handlerUserExiste($username)
        {
        try {
            $this->query = "SELECT * from usuarios where username= '$username'"; // Tu consulta aquí


            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.'.$this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.'. $this->query;
            }
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
        }
    }


    
    
    public function handlerUserRegistrar($username)
    {
        try {
            $this->query = "INSERT INTO visita (username, fecha, fecha_sin_hora) VALUES ('$username', NOW(), NOW())";
            $this->executeSingleQuery(); // Revisa esta línea, ya que puede ser la fuente del error
            $this->success = true;
            $this->mensaje = 'Usuario registrado correctamente.';
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error al registrar el usuario: ' . $e->getMessage();
        }
    }
    


public function handlerUserRegistrados()
        {
        try {
            
            $this->query = "SELECT v.id, u.username, u.nombre, u.apaterno, u.centro, u.equipo, v.fecha, v.fecha_sin_hora,DATE_FORMAT(fecha, '%H:%i:%s') AS hora
            FROM visita v
            JOIN usuarios u ON v.username = u.username
            ";


            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.'.$this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.'. $this->query;
            }
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function handlerRegistroNombre($username)
    {
    try {
        $this->query = "SELECT username,nombre,apaterno from usuarios where username= '$username'"; // Tu consulta aquí


        $this->getResultsFromQuery();
        $this->datos = $this->rows;
        if (count($this->rows) >= 1) {

            $this->success = true;
            $this->mensaje = 'Se han encontrado resultados.'.$this->query;
        } else {
            $this->success = false;
            $this->mensaje = 'No se encontró ningún resultado.'. $this->query;
        }
    } catch (Exception $e) {
        $this->success = false;
        $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
    }
}



    // Resto de los métodos abstractos de la clase padre


  // Implementación de los métodos abstractos
  public function get()
  {
      // Implementación del método get
  }

  public function set()
  {
      // Implementación del método set
  }

  public function edit()
  {
      // Implementación del método edit
  }

  public function delete()
  {
      // Implementación del método delete
  }



    public function __construct()
    {
        parent::__construct();
    }
}
?>
