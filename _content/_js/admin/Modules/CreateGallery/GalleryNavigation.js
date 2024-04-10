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
