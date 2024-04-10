class ImageUploadArea {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    generateImageUploadArea() {
        const previousData = this.createGallery.getDatosImagenes();

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDiv');
        const div = document.createElement('div');
        div.textContent = previousData.length; // Mostrar la cantidad de imágenes cargadas previamente
        titleDiv.appendChild(div);
        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Cargar imágenes';
        titleDiv.appendChild(titleSpan);

        const div2 = document.createElement('div');
        const buttonadd = document.createElement('button');
        buttonadd.textContent = 'Añadir imágenes';
        buttonadd.id = 'btn_addimage';
        div2.appendChild(buttonadd);
        titleDiv.appendChild(div2);

        const areaImages = document.createElement('div');
        areaImages.id = 'areaimages';
        areaImages.classList.add('areaimages');

        buttonadd.addEventListener('click', () => {
            const imageUploader = new ImageUploader(this.createGallery);
            imageUploader.init(areaImages);
        });

        // Mostrar las imágenes cargadas previamente
        previousData.forEach(imageData => {

            const containerDiv = document.createElement('div');
            containerDiv.classList.add('omg_editor');

            const aspectRatioContainer = document.createElement('div');
            aspectRatioContainer.classList.add(imageData.aspectRatio ? 'valid-aspect-ratio' : 'invalid-aspect-ratio');
            containerDiv.appendChild(aspectRatioContainer);

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const imgElement = document.createElement('img');
            imgElement.src = imageData.src;
            imgElement.classList.add('uploaded-image');
            imgElement.dataset.aspectRatio = imageData.aspectRatio;
            imgElement.dataset.orientation = imageData.orientation;
            imageContainer.appendChild(imgElement);

            const centerButton = document.createElement('button');
            centerButton.classList.add('center-button');
            centerButton.textContent = 'Editar';
            containerDiv.appendChild(centerButton);

            centerButton.addEventListener('click', () => {
                const imageData = this.createGallery.steps[1].dataO.images.find(img => img.name);
                  CropperHandler.openCropperModal(imageData, this.createGallery.modal);
              });

            const closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.textContent = 'Borrar';
            containerDiv.appendChild(closeButton);

            closeButton.addEventListener('click', () => {
              containerDiv.remove();
              this.createGallery.removeImage(imageData.name);
            });

            containerDiv.appendChild(imageContainer);
            areaImages.appendChild(containerDiv);
        });

        this.createGallery.containerConfig.appendChild(titleDiv);
        this.createGallery.containerConfig.appendChild(areaImages);
    }
}
