class Modal {
    constructor() {
        this.container = document.getElementById('app');
        this.modal = document.getElementById('modal') || this.createModal();
        this.modalContent = document.getElementById('modal-content') || this.createModalContent();
        if (!this.modal.parentElement) {
            this.setupModal();
        }
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'modal';
        return modal;
    }

    createModalContent() {
        const modalContent = document.createElement('div');
        modalContent.id = 'modal-content';
        return modalContent;
    }

    setupModal() {
        this.modal.appendChild(this.modalContent);
        this.container.appendChild(this.modal);
    }

    open({ title = '', text = '', imageUrl = '', buttons = [], modalClass = '', contentClass = '', htmlContent = '' } = {}) {
        this.modalContent.innerHTML = '';
    
        // Limpiar clases existentes
        this.modal.classList.remove(...this.modal.classList);
        this.modalContent.classList.remove(...this.modalContent.classList);
    
        if (title) {
            const modalHeader = this.createModalHeader(title);
            this.modalContent.appendChild(modalHeader);
        }
    
        if (text) {
            const modalBody = this.createModalBody(text);
            this.modalContent.appendChild(modalBody);
        }
    
        if (imageUrl) {
            const modalImage = this.createModalImage(imageUrl);
            this.modalContent.appendChild(modalImage);
        }
    
        if (htmlContent) {
            if (typeof htmlContent === 'string') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                const fragment = document.createDocumentFragment();
                while (tempDiv.firstChild) {
                    fragment.appendChild(tempDiv.firstChild);
                }
                this.modalContent.appendChild(fragment);
            } else {
                this.modalContent.appendChild(htmlContent);
            }
        }
    
        if (buttons.length > 0) {
            const modalFooter = this.createModalFooter(buttons);
            this.modalContent.appendChild(modalFooter);
        }
    
        this.modal.classList.add(modalClass); // Agregar clase personalizada al modal
        this.modalContent.classList.add(contentClass); // Agregar clase personalizada al contenido del modal
        this.modal.style.display = 'block';
    }
    

updateContent({ title = '', text = '', imageUrl = '', htmlContent = '', buttons = [] } = {}) {
    this.modalContent.innerHTML = '';

    // Limpiar clases existentes
    this.modalContent.classList.remove(...this.modalContent.classList);

    if (title) {
        const modalHeader = this.createModalHeader(title);
        this.modalContent.appendChild(modalHeader);
    }

    if (text) {
        const modalBody = this.createModalBody(text);
        this.modalContent.appendChild(modalBody);
    }

    if (imageUrl) {
        const modalImage = this.createModalImage(imageUrl);
        this.modalContent.appendChild(modalImage);
    }

    if (htmlContent) {
        this.modalContent.innerHTML += htmlContent;
    }

    if (buttons.length > 0) {
        const modalFooter = this.createModalFooter(buttons);
        this.modalContent.appendChild(modalFooter);
    }
}

    createModalHeader(title) {
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header'); // Agrega la clase 'text-center' para centrar el texto
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = title;
        modalHeader.appendChild(modalTitle);
        return modalHeader;
    }
    
    createModalBody(text) {
        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body'); // Agrega la clase 'text-justify' para justificar el texto
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        modalBody.appendChild(paragraph);
        return modalBody;
    }
    
    createModalImage(imageUrl) {
        const modalImage = document.createElement('img');
        modalImage.src = imageUrl;
        modalImage.classList.add('modal-image');
        return modalImage;
    }

        createModalFooter(buttons) {
            const modalFooter = document.createElement('div');
            modalFooter.classList.add('modal-footer');
            buttons.forEach(buttonData => {
                const button = document.createElement('button');
                button.textContent = buttonData.label;
                button.addEventListener('click', buttonData.action);
                button.classList.add('btns_modal');
                modalFooter.appendChild(button);
            });
            return modalFooter;
        }

    close() {
        this.modal.style.display = 'none';
        this.modalContent.innerHTML = '';
    }

    addCustomEventListener(eventType, listener) {
        this.modal.addEventListener(eventType, listener);
    }

    removeCustomEventListener(eventType, listener) {
        this.modal.removeEventListener(eventType, listener);
    }
}
