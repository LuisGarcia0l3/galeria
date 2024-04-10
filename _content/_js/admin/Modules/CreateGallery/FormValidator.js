
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
