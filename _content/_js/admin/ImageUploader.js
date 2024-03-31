class ImageUploader {
  constructor(createGallery) {
    this.createGallery = createGallery;
    this.modal = new Modal();
  }

  init(container) {
    this.areaImages = container;
    this.handleImageUpload();
  }

  handleImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.addEventListener('change', () => {
      const files = input.files;
      this.displayImages(files);
    });

    input.click();
  }

  calculateAspectRatio(width, height) {
    const aspectRatioText = this.getAspectRatioText(width, height);
    const validRatios = ['3:4', '4:3', '3:2', '2:3', '0', '16:9'];
    return validRatios.includes(aspectRatioText) ? aspectRatioText : null;
  }

  getAspectRatioText(width, height) {
    const ratio = width / height;
    if (Math.abs(ratio - (3 / 4)) < 0.01) {
      return '3:4';
    } else if (Math.abs(ratio - (4 / 3)) < 0.01) {
      return '4:3';
    } else if (Math.abs(ratio - (3 / 2)) < 0.01) {
      return '3:2';
    } else if (Math.abs(ratio - (2 / 3)) < 0.01) {
      return '2:3';
    } else if (Math.abs(ratio) < 0.01) {
      return '0';
    } else if (Math.abs(ratio - (16 / 9)) < 0.01) {
      return '16:9';
    } else {
      return 'Invalid';
    }
  }

  displayImages(files) {
    const repeatedImagesMap = {};

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          const img = new Image();
          img.onload = () => {
            const aspectRatio = this.calculateAspectRatio(img.width, img.height);
            const existingImage = this.createGallery.getDatosImagenes().find(img => img.name === file.name);

            if (!existingImage) {
              console.log(this.createGallery)
              ImageRenderer.createImageContainer(file, reader, aspectRatio, img, this.createGallery, this.areaImages, this.modal);
            } else {
              if (!repeatedImagesMap[file.name]) {
                repeatedImagesMap[file.name] = [];
              }
              repeatedImagesMap[file.name].push({
                src: reader.result,
                name: file.name,
                type: file.type,
                aspectRatio: aspectRatio,
                orientation: img.width > img.height ? 'horizontal' : 'vertical'
              });
            }
            RepeatedImagesRenderer.renderRepeatedImages(repeatedImagesMap, this.modal);
          };
          img.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  }
}

class ConfiguracionImagen {
  constructor(container) {
    this.container = container;
  }

  showConfigMenu() {
    // Lógica para mostrar el contenido de configuración de imagen en el contenedor común
    this.container.innerHTML = '<p>Contenido de configuración de imagen</p>';
  }
}

class EtiquetarPersonas {
  constructor(container) {
    this.container = container;
  }

  showConfigMenu() {
    // Lógica para mostrar el contenido de etiquetar personas en el contenedor común
    this.container.innerHTML = '<p>Contenido de etiquetar personas</p>';
  }
}

class AgregarObjetos {
  constructor(container) {
    this.container = container;
  }

  showConfigMenu() {
    // Lógica para mostrar el contenido de agregar objetos en el contenedor común
    this.container.innerHTML = '<p>Contenido de agregar objetos</p>';
  }
}

class CropperHandler {
  static openCropperModal(dataImage, modal) {

    const dataOrientacion = dataImage.orientation;
    const dataApectRatio = dataImage.aspectRatio;

    console.log(dataOrientacion, dataApectRatio)

    const containerEditor = document.createElement('div');
    containerEditor.classList.add('ctn_ImageEditor');

    const ContainerImageWorkspace = document.createElement('div');
    ContainerImageWorkspace.classList.add('container_imageEdit');

    const cropperImage = document.createElement('img');
    cropperImage.id = 'image_edit';
    cropperImage.src = dataImage.src;
    cropperImage.alt = 'Cropped Image';
    ContainerImageWorkspace.appendChild(cropperImage);

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

    containerConfig.appendChild(ContainerConfigNav)
    containerConfig.appendChild(containerConfigOptions)

    containerEditor.appendChild(ContainerImageWorkspace);
    containerEditor.appendChild(containerConfig);


    modal.open({
      title: 'Editar imagen',
      text: 'Ajusta la imagen según tus necesidades',
      htmlContent: containerEditor,
      buttons: [
        { label: 'Guardar', action: () => { console.log("Guardar imagen") } },
        { label: 'Cerrar', action: () => { modal.close(); } }
      ],
      modalClass: 'Modal_editor',
      contentClass: 'Modal_editor_content'
    });

    // Crear instancias de las clases de opciones de la barra lateral
    const configuracionImagen = new ConfiguracionImagen(containerConfigOptions);
    const etiquetarPersonas = new EtiquetarPersonas(containerConfigOptions);
    const agregarObjetos = new AgregarObjetos(containerConfigOptions);

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

class ImageRenderer {
  static createImageContainer(file, reader, aspectRatio, img, createGallery, areaImages, modal) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('omg_editor');

    const aspectRatioContainer = document.createElement('div');
    aspectRatioContainer.classList.add(aspectRatio ? 'valid-aspect-ratio' : 'invalid-aspect-ratio');
    containerDiv.appendChild(aspectRatioContainer);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imgElement = document.createElement('img');
    imgElement.src = reader.result;
    imgElement.classList.add('uploaded-image');
    imgElement.dataset.aspectRatio = aspectRatio;
    imgElement.dataset.orientation = img.width > img.height ? 'horizontal' : 'vertical';
    imageContainer.appendChild(imgElement);

    const centerButton = document.createElement('button');
    centerButton.classList.add('center-button');
    centerButton.textContent = 'Editar';
    containerDiv.appendChild(centerButton);

    centerButton.addEventListener('click', () => {
      const imageName = file.name; // Suponiendo que reader.result contiene el nombre de la imagen
      const imageData = createGallery.steps[1].dataO.images.find(img => img.name == imageName);
        CropperHandler.openCropperModal(imageData, modal);
    });

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Borrar';
    containerDiv.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
      containerDiv.remove();
      createGallery.removeImage(file.name);
    });

    containerDiv.appendChild(imageContainer);
    areaImages.appendChild(containerDiv);

    createGallery.addImage({
      src: reader.result,
      name: file.name,
      type: file.type,
      aspectRatio: aspectRatio,
      orientation: img.width > img.height ? 'horizontal' : 'vertical'
    });
  }
}

class RepeatedImagesRenderer {
  static renderRepeatedImages(repeatedImagesMap, modal) {
    const repeatedImages = Object.values(repeatedImagesMap).flat();
    if (repeatedImages.length > 0) {
      let htmlContent = '';

      const containerDiv = document.createElement('div');
      containerDiv.classList.add('repeated-images-container');

      repeatedImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.name;
        imgElement.classList.add('repeated-image');
        containerDiv.appendChild(imgElement);
      });

      htmlContent += containerDiv.outerHTML;

      modal.open({
        title: 'Imágenes ya incluidas',
        text: 'Las siguientes imágenes ya han sido incluidas:',
        htmlContent: htmlContent,
        buttons: [
          { label: 'Cerrar', action: () => { modal.close(); } }
        ],
        modalClass: 'Modal_repeat',
        contentClass: 'Modal_repeat_content'
      });
    }
  }
}