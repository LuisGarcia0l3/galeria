<?php
require_once 'modelAdmin.php';

class ControllerAdmin
{
    // Variable privada que almacena una instancia del modelo asociado al controlador
    private $model;

    // Constructor de la clase Controller
    public function __construct()
    {
        // Inicializa la variable $model con una nueva instancia de la clase Model
        $this->model = new ModelAdmin();
    }

/*********************** Función principal para manejar las solicitudes ***********************/
    
    public function handleRequest($data_post)
    {
        $event = isset($data_post['action']) ? $data_post['action'] : '';

        switch ($event) {
            case 'handlerUserExiste':
                $this->handlerUserExiste($data_post);
                break;
            case 'handlerUserRegistrar':
                $this->handlerUserRegistrar($data_post);
                break;
            case 'handlerUserRegistrados':
                $this->handlerUserRegistrados($data_post);
                break;
            case 'handlerRegistroNombre':
                $this->handlerRegistroNombre($data_post);
                break;
          
            default:
                break;
                
        }
    }

/**************************************** Manejadores ****************************************/

    private function handlerUserExiste($data_post)
    {
        $username = isset($data_post['username']) ? $data_post['username'] : '';

        $this->model->handlerUserExiste($username);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }

    private function handlerUserRegistrar($data_post)
    {
        $username = isset($data_post['username']) ? $data_post['username'] : '';
        $this->model->handlerUserRegistrar($username);
        $data = $this->createResponseData();
        echo json_encode($data);
    }

    private function handlerUserRegistrados($data_post)
    {
        $this->model->handlerUserRegistrados();
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }

    private function handlerRegistroNombre($data_post)
    {
        $username = isset($data_post['username']) ? $data_post['username'] : '';
    $this->model->handlerRegistroNombre($username);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }





/**************************************** Respuesta ****************************************/

     // Crea y devuelve los datos de respuesta comunes a todas las funciones
     private function createResponseData()
        {
            return array(
                'success' => $this->model->success,
                'data' => array(
                    'message' => $this->model->mensaje,
                    'datos' => $this->model->datos
                )
            );
        }
}


// Obtiene los datos del cuerpo de la solicitud y maneja la solicitud si es un array
$data_post = json_decode(file_get_contents('php://input'), true);
if (is_array($data_post)) {
    $controller = new ControllerAdmin();
    $controller->handleRequest($data_post);
}
?>
