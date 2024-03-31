class GalleryNavigation {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    handleMenuOptionClick(index) {
        this.createGallery.containerConfig.innerHTML = '';
        this.createGallery.currentStep = index;
        this.createGallery.galleryNavigation.updateNavigation();
        if (index === 0) {
            const formGenerator = new FormGenerator(this.createGallery);
            formGenerator.generateForm();
        } else if (index === 1) {
            const imageUploadArea = new ImageUploadArea(this.createGallery);
            imageUploadArea.generateImageUploadArea();
        } else if (index === 2) {
            const reviewGenerator = new ReviewGenerator(this.createGallery);
            reviewGenerator.generateReview();
        }
    }

    updateNavigation() {
        const options = document.querySelectorAll('.ctn_navUpload_option');
        options.forEach((option, index) => {
            if (index < this.createGallery.currentStep) {
                option.classList.add('completed');
            } else {
                option.classList.remove('completed');
            }
            if (index === this.createGallery.currentStep) {
                option.classList.add('current');
            } else {
                option.classList.remove('current');
            }
            if (index === 1) {
                const step1Completed = this.createGallery.steps[0].completed;
                option.classList.toggle('disabled', !step1Completed);
                option.onclick = () => {
                    if (step1Completed) {
                        this.handleMenuOptionClick(index);
                    } else {
                        this.createGallery.notificationContainer.showNotification({
                            title: '¡Error!',
                            text: 'Por favor, Haz click en el boton para validar la informacion del formulario',
                            duration: 5000,
                            borderColor: 'red'
                        });
                    }
                };
            } else if (index === 2) {
                const step2Completed = this.createGallery.steps[1].completed;
                option.classList.toggle('disabled', !step2Completed);
                option.onclick = () => {
                    if (step2Completed) {
                        this.handleMenuOptionClick(index);
                    } else {
                        this.createGallery.notificationContainer.showNotification({
                            title: '¡Error!',
                            text: 'Por favor, agregue al menos una imagen antes de continuar.',
                            duration: 5000,
                            borderColor: 'red'
                        });
                    }
                };
            } else {
                option.onclick = () => this.handleMenuOptionClick(index);
            }
        });

        const buttonTexts = ["Guardar formulario", "Validar imágenes", "Subir galería"];
        const ButtonConfig = document.querySelector('.ctn_configbutton button');
        ButtonConfig.textContent = buttonTexts[this.createGallery.currentStep];
    }
}

class ImageHandler {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }


    updateImage(data){
        
    }

    addImage(data) {
        if (!this.createGallery.steps[this.createGallery.currentStep].data.images) {
            this.createGallery.steps[this.createGallery.currentStep].data.images = [];
        }
        this.createGallery.steps[this.createGallery.currentStep].data.images.push(data);

        if (!this.createGallery.steps[this.createGallery.currentStep].dataO.images) {
            this.createGallery.steps[this.createGallery.currentStep].dataO.images = [];
        }
        this.createGallery.steps[this.createGallery.currentStep].dataO.images.push({ ...data });
    }

    removeImage(name) {
        const images = this.createGallery.steps[this.createGallery.currentStep].data.images;
        const imagesO = this.createGallery.steps[this.createGallery.currentStep].dataO.images;

        const index = images.findIndex(img => img.name === name);
        if (index !== -1) {
            images.splice(index, 1);
            imagesO.splice(index, 1);
        }
    }
}

class FormValidator {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    validateForm() {
        const inputs = document.querySelectorAll('.formDataGeneral input[type="text"], .formDataGeneral input[type="date"]');
        const checkboxes = document.querySelectorAll('.formDataGeneral input[type="checkbox"]');

        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                this.createGallery.notificationContainer.showNotification({
                    title: '¡Error!',
                    text: 'Por favor, complete todos los campos del formulario.',
                    duration: 5000,
                    borderColor: 'red'
                });
                return false;
            }
        }

        let checkboxChecked = false;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxChecked = true;
                break;
            }
        }

        if (!checkboxChecked) {
            this.createGallery.notificationContainer.showNotification({
                title: '¡Error!',
                text: 'Por favor, seleccione al menos un centro.',
                duration: 5000,
                borderColor: 'red'
            });
            return false;
        }
        return true;
    }
}

class CreateGallery {
    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.notificationContainer = new NotificationContainer();
        this.modal = new Modal();
        this.container = document.getElementById('app');
        this.containerContent = document.getElementById('app_content');
        this.containerConfig = null;
        this.steps = [
            { name: 'Configurar datos generales', completed: false, data: {} },
            { name: 'Configurar Imagenes', completed: true, data: {}, dataO: {} },
            { name: 'Revisión', completed: false, data: {} }
        ];
        this.currentStep = 0;

        this.galleryNavigation = new GalleryNavigation(this);
        this.imageHandler = new ImageHandler(this);
        this.formValidator = new FormValidator(this);
    }

    init() {
        this.pantallaInicio();
        this.galleryNavigation.updateNavigation();
        this.galleryNavigation.handleMenuOptionClick(1);
    }

    pantallaInicio() {
        this.containerContent.innerHTML = '';

        const ctnPrincipal = document.createElement('div');
        ctnPrincipal.classList.add('ctn_principal');

        const ctnTittle = document.createElement('div');
        ctnTittle.classList.add('ctn_tittle');
        const tittleSpan = document.createElement('span');
        tittleSpan.textContent = 'Crear Galerias';
        ctnTittle.appendChild(tittleSpan);

        const ctnNavUpload = document.createElement('div');
        ctnNavUpload.classList.add('ctn_navUpload');

        const options = ["Configurar datos generales", "Configurar Imagenes", "Revisión"];
        options.forEach(optionText => {
            const ctnNavUploadOption = document.createElement('div');
            ctnNavUploadOption.classList.add('ctn_navUpload_option');
            const optionSpan = document.createElement('span');
            optionSpan.textContent = optionText;
            ctnNavUploadOption.appendChild(optionSpan);
            ctnNavUpload.appendChild(ctnNavUploadOption);
        });

        this.containerConfig = document.createElement('div');
        this.containerConfig.classList.add('ctn_configimages');
        this.containerConfig.setAttribute('id', 'configImages');

        const ctnConfigButton = document.createElement('div');
        ctnConfigButton.classList.add('ctn_configbutton');

        const ButtonConfig = document.createElement('button');
        const buttonTexts = ["Guardar formulario", "Validar imágenes", "Subir galería"];

        ButtonConfig.addEventListener('click', () => {
            if (this.currentStep === 0) {
                if (this.formValidator.validateForm()) {
                    const formData = {
                        titulo: document.querySelector('.formDataGeneral_preg1 input').value,
                        fechaSubida: document.querySelector('.formDataGeneral_preg2 input').value,
                        centros: Array.from(document.querySelectorAll('.formDataGeneral_preg3 input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
                    };
                    this.addDatosGenerales(formData);
                    this.galleryNavigation.handleMenuOptionClick(1);
                    this.steps[0].completed = true;
                }
            } else if (this.currentStep === 1) {
                this.galleryNavigation.handleMenuOptionClick(2);
            }
            ButtonConfig.textContent = buttonTexts[this.currentStep];

        });

        ctnPrincipal.appendChild(ctnTittle);
        ctnPrincipal.appendChild(ctnNavUpload);
        ctnPrincipal.appendChild(this.containerConfig);
        ctnConfigButton.appendChild(ButtonConfig);
        ctnPrincipal.appendChild(ctnConfigButton);

        this.containerContent.appendChild(ctnPrincipal);
    }

    addImage(data) {
        this.imageHandler.addImage(data);
    }

    updateImage(data) {
        this.imageHandler.updateImage(data);
    }

    removeImage(name) {
        this.imageHandler.removeImage(name);
    }

    addDatosGenerales(data) {
        this.steps[this.currentStep].data = { ...data };
    }

    getDatosGenerales() {
        return this.steps[0].data;
    }

    getDatosImagenes() {
        return this.steps[1].data.images || [];
    }
}

class FormGenerator {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    generateForm() {
        const previousData = this.createGallery.getDatosGenerales();
        const containerConfig = this.createGallery.containerConfig;

       

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDivcenter');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Informacion general de la galeria';
        titleDiv.appendChild(titleSpan);
        containerConfig.appendChild(titleDiv);

        const form = document.createElement('form');
        form.classList.add('formDataGeneral');

        const pregunta1 = document.createElement('div');
        pregunta1.classList.add('formDataGeneral_preg1', 'formDataGeneral_preg');
        const span1 = document.createElement('span');
        span1.textContent = 'Titulo de la galeria';
        const input1 = document.createElement('input');
        input1.setAttribute('type', 'text');
        pregunta1.appendChild(span1);
        pregunta1.appendChild(input1);
        form.appendChild(pregunta1);

        const pregunta2 = document.createElement('div');
        pregunta2.classList.add('formDataGeneral_preg2', 'formDataGeneral_preg');
        const span2 = document.createElement('span');
        span2.textContent = 'Fecha subida';
        const input2 = document.createElement('input');
        input2.setAttribute('type', 'date');
        pregunta2.appendChild(span2);
        pregunta2.appendChild(input2);
        form.appendChild(pregunta2);

        const pregunta3 = document.createElement('div');
        pregunta3.classList.add('formDataGeneral_preg3', 'formDataGeneral_preg');
        const span3 = document.createElement('span');
        span3.textContent = 'Centro';
        pregunta3.appendChild(span3);

        const divCenters = document.createElement('div');
        divCenters.classList.add('ctn_centers');

        const divPachuca = document.createElement('div');
        const inputPachuca = document.createElement('input');
        inputPachuca.setAttribute('type', 'checkbox');
        inputPachuca.setAttribute('name', 'centro');
        inputPachuca.setAttribute('value', 'Pachuca');
        const labelPachuca = document.createElement('label');
        labelPachuca.textContent = 'Pachuca';
        divPachuca.appendChild(inputPachuca);
        divPachuca.appendChild(labelPachuca);
        divCenters.appendChild(divPachuca);

        const divInterplaza = document.createElement('div');
        const inputInterplaza = document.createElement('input');
        inputInterplaza.setAttribute('type', 'checkbox');
        inputInterplaza.setAttribute('name', 'centro');
        inputInterplaza.setAttribute('value', 'Interplaza');
        const labelInterplaza = document.createElement('label');
        labelInterplaza.textContent = 'Interplaza';
        divInterplaza.appendChild(inputInterplaza);
        divInterplaza.appendChild(labelInterplaza);
        divCenters.appendChild(divInterplaza);

        pregunta3.appendChild(divCenters);

        form.appendChild(pregunta3);
        containerConfig.appendChild(form);


        if (Object.keys(previousData).length !== 0) {
            console.log(previousData.titulo)
            document.querySelector('.formDataGeneral_preg1 input').value = previousData.titulo;
            document.querySelector('.formDataGeneral_preg2 input').value = previousData.fechaSubida;
            const checkboxes = document.querySelectorAll('.formDataGeneral_preg3 input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (previousData.centros.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        }
    }
}

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
              this.createGallery.removeImage(imageData.name);
            });

            containerDiv.appendChild(imageContainer);
            areaImages.appendChild(containerDiv);
        });

        this.createGallery.containerConfig.appendChild(titleDiv);
        this.createGallery.containerConfig.appendChild(areaImages);
    }
}

class ReviewGenerator {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    generateReview() {
        const containerConfig = this.createGallery.containerConfig;
        const datosGenerales = this.createGallery.getDatosGenerales();         
        const imagenes = this.createGallery.getDatosImagenes();

        containerConfig.innerHTML = '';

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDivcenter');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Revisión';
        titleDiv.appendChild(titleSpan);
        containerConfig.appendChild(titleDiv);

        const datosGeneralesDiv = document.createElement('div');
        datosGeneralesDiv.classList.add('ctn_datareviewGeneral');
        const datosGeneralesTittle = document.createElement('span');
        datosGeneralesTittle.textContent = 'Datos Generales: ';
        datosGeneralesDiv.appendChild(datosGeneralesTittle);

        const datosGeneralesList = document.createElement('div');
        for (const key in datosGenerales) {
            const listItem = document.createElement('span');
            listItem.innerHTML = `<strong>${key}:</strong> ${datosGenerales[key]}`;
            datosGeneralesList.appendChild(listItem);
        }
        datosGeneralesDiv.appendChild(datosGeneralesList);
        containerConfig.appendChild(datosGeneralesDiv);

        const imagenesDiv = document.createElement('div');
        imagenesDiv.classList.add('ctn_datareviewImages');
        const dataImagensTittle = document.createElement('span');
        dataImagensTittle.textContent = 'Imágenes:';
        imagenesDiv.appendChild(dataImagensTittle);

        const imagenesList = document.createElement('div');
        imagenesList.classList.add('ctn_imgreview');
        imagenes.forEach((imagen, index) => {
            const listItem = document.createElement('div');
            const imageElement = document.createElement('img');
            imageElement.src = imagen.src; 
            listItem.appendChild(imageElement);
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `Nombre: ${imagen.name}`;
            listItem.appendChild(nameSpan);
            imagenesList.appendChild(listItem);
        });
        imagenesDiv.appendChild(imagenesList);
        containerConfig.appendChild(imagenesDiv);
    }
}