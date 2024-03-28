class ImageUploader {
    constructor(createGalleryInstance) {
        this.createGalleryInstance = createGalleryInstance;
        this.modal = new Modal(); // Assuming Modal class is available
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
                        if (aspectRatio !== null) {
                            const existingImage = this.createGalleryInstance.getDatosImagenes().find(img => img.name === file.name);

                            if (!existingImage) {
                                const containerDiv = document.createElement('div');
                                containerDiv.classList.add('omg_editor');

                                const aspectRatioContainer = document.createElement('div'); // New container for aspect ratio class
                                aspectRatioContainer.classList.add(aspectRatio ? 'valid-aspect-ratio' : 'invalid-aspect-ratio');
                                containerDiv.appendChild(aspectRatioContainer);

                                const imageContainer = document.createElement('div'); // Container for image and buttons
                                imageContainer.classList.add('image-container');

                                const imgElement = document.createElement('img');
                                imgElement.src = reader.result;
                                imgElement.classList.add('uploaded-image');
                                imgElement.dataset.aspectRatio = aspectRatio;
                                imgElement.dataset.orientation = img.width > img.height ? 'horizontal' : 'vertical';
                                imageContainer.appendChild(imgElement);

                                // Button in the center
                                const centerButton = document.createElement('button');
                                centerButton.classList.add('center-button');
                                centerButton.textContent = 'Editar'; 
                                containerDiv.appendChild(centerButton);

                                centerButton.addEventListener('click', () => {
                                    const cropperContainer = document.createElement('div');
                                    cropperContainer.classList.add('cropper-container');
                                
                                    const cropperImage = document.createElement('img');
                                    cropperImage.id = 'cropper-image';
                                    cropperImage.src = reader.result;
                                    cropperImage.alt = 'Cropped Image';
                                    cropperContainer.appendChild(cropperImage);
                                
                                    const cropperButtonsContainer = document.createElement('div');
                                    cropperButtonsContainer.classList.add('cropper-buttons-container');
                                
                                    const rotateButton = document.createElement('button');
                                    rotateButton.textContent = 'Rotar';
                                    rotateButton.addEventListener('click', () => {
                                        cropper.rotate(90); // Rotates the image by 90 degrees clockwise
                                    });
                                    cropperButtonsContainer.appendChild(rotateButton);
                                
                                    const flipHorizontalButton = document.createElement('button');
                                    flipHorizontalButton.textContent = 'Espejo Horizontal';
                                    flipHorizontalButton.addEventListener('click', () => {
                                        cropper.scaleX(-cropper.getData().scaleX || -1); // Flips the image horizontally
                                    });
                                    cropperButtonsContainer.appendChild(flipHorizontalButton);
                                
                                    const flipVerticalButton = document.createElement('button');
                                    flipVerticalButton.textContent = 'Espejo Vertical';
                                    flipVerticalButton.addEventListener('click', () => {
                                        cropper.scaleY(-cropper.getData().scaleY || -1); // Flips the image vertically
                                    });
                                    cropperButtonsContainer.appendChild(flipVerticalButton);
                                
                                    cropperContainer.appendChild(cropperButtonsContainer);
                                
                                    // Agrega el cropperContainer al modal
                                    this.modal.open({
                                        title: 'Editar imagen',
                                        text: 'Ajusta la imagen según tus necesidades',
                                        htmlContent: cropperContainer.outerHTML,
                                        buttons: [
                                            { label: 'Cerrar', action: () => { this.modal.close(); } }
                                        ],
                                        modalClass: 'custom-modal',
                                        contentClass: 'custom-content'
                                    });
                                
                                    // Después de abrir el modal, inicializa Cropper
                                    const cropper = new Cropper(document.getElementById('cropper-image'), {
                                        aspectRatio: 16 / 9,
                                        // Otras opciones de configuración de Cropper.js aquí
                                    });
                                });
                                


                                // Button in the top-right corner
                                const closeButton = document.createElement('button');
                                closeButton.classList.add('close-button');
                                closeButton.textContent = 'Borrar'; 
                                containerDiv.appendChild(closeButton);
                                // Dentro de la función displayImages
                                // After creating closeButton element
                                closeButton.addEventListener('click', () => {
                                    // Remove the containerDiv from the DOM
                                    containerDiv.remove();
                                    // Remove the image from the CreateGallery instance
                                    this.createGalleryInstance.removeImage(file.name);
                                    console.log(file.name)
                                });

                                containerDiv.appendChild(imageContainer); // Append image container to aspect ratio container

                                this.areaImages.appendChild(containerDiv);

                                this.createGalleryInstance.addImage({
                                    src: reader.result,
                                    name: file.name,
                                    type: file.type,
                                    aspectRatio: aspectRatio,
                                    orientation: img.width > img.height ? 'horizontal' : 'vertical'
                                });
                            }
                            else {
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

                                this.modal.open({
                                    title: 'Imágenes ya incluidas',
                                    text: 'Las siguientes imágenes ya han sido incluidas:',
                                    htmlContent: htmlContent,
                                    buttons: [
                                        { label: 'Cerrar', action: () => { this.modal.close() } }
                                    ],
                                    modalClass: 'custom-modal',
                                    contentClass: 'custom-content'
                                });
                            }
                        } else {
                            // Invalid aspect ratio
                            console.log(`La imagen ${file.name} tiene una relación de aspecto inválida.`);
                        }
                    };
                    img.src = reader.result;
                });

                reader.readAsDataURL(file);
            }
        }
    }
}