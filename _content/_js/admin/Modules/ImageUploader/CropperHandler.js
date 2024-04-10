
class CropperHandler {
  static openCropperModal(dataImage, modal) {
    const dataOrientacion = dataImage.orientation;
    const dataApectRatio = dataImage.aspectRatio;

    console.log(dataOrientacion, dataApectRatio);

    const containerEditor = document.createElement('div');
    containerEditor.classList.add('ctn_ImageEditor');

    const containerImageWorkspace = document.createElement('div');
    containerImageWorkspace.classList.add('container_imageEdit');

    const cropperImage = document.createElement('img');
    cropperImage.id = 'image_edit';
    cropperImage.src = dataImage.src;
    cropperImage.alt = 'Cropped Image';
    containerImageWorkspace.appendChild(cropperImage);

    const containerConfig = document.createElement('div');
    containerConfig.classList.add('config-image');

    const ContainerConfigNav = document.createElement('div');
    ContainerConfigNav.classList.add('config-image_nav');

    const cropperConfigImage = document.createElement('div');
    cropperConfigImage.classList.add('config-image');
    const configTitleSpan = document.createElement('span');
    configTitleSpan.textContent = 'Configuración de imagen';
    cropperConfigImage.appendChild(configTitleSpan);
    ContainerConfigNav.appendChild(cropperConfigImage);

    const etiquetarPersonasDiv = document.createElement('div');
    etiquetarPersonasDiv.classList.add('config-Person');

    const etiquetarPersonasSpan = document.createElement('span');
    etiquetarPersonasSpan.textContent = 'Etiquetar personas';
    etiquetarPersonasDiv.appendChild(etiquetarPersonasSpan);
    ContainerConfigNav.appendChild(etiquetarPersonasDiv);

    const agregarObjetosDiv = document.createElement('div');
    agregarObjetosDiv.classList.add('config-image_objets');

    const agregarObjetosSpan = document.createElement('span');
    agregarObjetosSpan.textContent = 'Agregar Objetos';
    agregarObjetosDiv.appendChild(agregarObjetosSpan);
    ContainerConfigNav.appendChild(agregarObjetosDiv);

    const containerConfigOptions = document.createElement('div');
    containerConfigOptions.id = 'configOptionsImage';
    containerConfigOptions.classList.add('config-image_options');

    containerConfig.appendChild(ContainerConfigNav);
    containerConfig.appendChild(containerConfigOptions);

    containerEditor.appendChild(containerImageWorkspace);
    containerEditor.appendChild(containerConfig);

    modal.open({
      htmlContent: containerEditor,
      buttons: [
        { label: 'Guardar', action: () => { console.log("Guardar imagen"); } },
        { label: 'Cerrar', action: () => { modal.close(); } }
      ],
      modalClass: 'Modal_editor',
      contentClass: 'Modal_editor_content'
    });

    // Crear instancias de las clases de opciones de la barra lateral
    const configuracionImagen = new ConfiguracionImagen(containerConfigOptions,containerImageWorkspace ,cropperImage,dataImage);
    const etiquetarPersonas = new EtiquetarPersonas(containerConfigOptions,containerImageWorkspace ,cropperImage,dataImage);
    const agregarObjetos = new AgregarObjetos(containerConfigOptions,containerImageWorkspace ,cropperImage,dataImage);

    // Manejar eventos de clic en las opciones de la barra lateral
    cropperConfigImage.addEventListener('click', () => {
      configuracionImagen.showConfigMenu();
    });

    etiquetarPersonasDiv.addEventListener('click', () => {
      etiquetarPersonas.showConfigMenu();
    });

    agregarObjetosDiv.addEventListener('click', () => {
      agregarObjetos.showConfigMenu();
    });
  }
}
