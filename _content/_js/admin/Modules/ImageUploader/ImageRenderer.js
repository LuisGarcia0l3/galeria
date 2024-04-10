
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
      orientation: img.width > img.height ? 'horizontal' : 'vertical',
      editedSrc: null, // inicialmente null
        tags: [], // inicialmente un array vacío
        objects: [] 
    });
  }
}