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


class CropperHandler {
  static openCropperModal(imageSource, modal) {
    const containerEditor = document.createElement('div');
    containerEditor.classList.add('ctn_cropperEditor');

    const cropperContainer = document.createElement('div');
    cropperContainer.classList.add('cropper-container');
    cropperContainer.style.height = '450px';
    cropperContainer.style.width = '650px';


    const cropperImage = document.createElement('img');
    cropperImage.id = 'cropper-image';
    cropperImage.src = imageSource;
    cropperImage.alt = 'Cropped Image';
    cropperContainer.appendChild(cropperImage);

    const cropperButtonsContainer = document.createElement('div');
    cropperButtonsContainer.classList.add('cropper-buttons-container');

    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotar';
    rotateButton.addEventListener('click', () => {
      cropper.rotate(90);
    });
    cropperButtonsContainer.appendChild(rotateButton);

    const flipHorizontalButton = document.createElement('button');
    flipHorizontalButton.textContent = 'Espejo Horizontal';
    flipHorizontalButton.addEventListener('click', () => {
      cropper.scaleX(-cropper.getData().scaleX || -1);
    });
    cropperButtonsContainer.appendChild(flipHorizontalButton);

    const flipVerticalButton = document.createElement('button');
    flipVerticalButton.textContent = 'Espejo Vertical';
    flipVerticalButton.addEventListener('click', () => {
      cropper.scaleY(-cropper.getData().scaleY || -1);
    });
    cropperButtonsContainer.appendChild(flipVerticalButton);

    containerEditor.appendChild(cropperContainer);
    containerEditor.appendChild(cropperButtonsContainer);

    modal.open({
      title: 'Editar imagen',
      text: 'Ajusta la imagen según tus necesidades',
      htmlContent: containerEditor,
      buttons: [
        { label: 'Cerrar', action: () => { modal.close(); } }
      ],
      modalClass: 'Modal_editor',
      contentClass: 'Modal_editor_content'
    });

    const cropper = new Cropper(document.getElementById('cropper-image'), {
      aspectRatio: 16 / 9,
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
      CropperHandler.openCropperModal(reader.result, modal);
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