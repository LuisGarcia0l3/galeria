
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


