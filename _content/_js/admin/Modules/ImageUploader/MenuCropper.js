class MenuCropper {
  constructor(containerAreaOption, image) {
    this.containerAreaOption = containerAreaOption;
    this.image = image;
    this.cropper = null;
  }

  createCropperOption() {
    const cropperDiv = document.createElement('div');
    cropperDiv.classList.add('config-option');
    const cropperDivSpan = document.createElement('span');
    cropperDivSpan.textContent = 'Recorte';
    cropperDiv.appendChild(cropperDivSpan);
    this.containerAreaOption.appendChild(cropperDiv);

    cropperDiv.addEventListener('click', this.handleCropperOption.bind(this));
  }

  handleCropperOption() {
    this.clearExistingOptions();

    if (!this.cropper) {
      this.initializeCropper();
      this.createCropperButtons();
    }
  }

  initializeCropper() {
    this.cropper = new Cropper(this.image, {
      aspectRatio: 16 / 9,
      // Otras opciones de configuración de Cropper.js
    });
  }

  createCropperButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('config-options');
    this.containerAreaOption.appendChild(buttonsContainer);

    const rotateLeftBtn = document.createElement('button');
    rotateLeftBtn.textContent = 'Rotar a la izquierda';
    rotateLeftBtn.classList.add('config-option');
    buttonsContainer.appendChild(rotateLeftBtn);
    rotateLeftBtn.addEventListener('click', () => this.handleCropperButtonClick('rotateLeft'));

    const rotateRightBtn = document.createElement('button');
    rotateRightBtn.textContent = 'Rotar a la derecha';
    rotateRightBtn.classList.add('config-option');
    buttonsContainer.appendChild(rotateRightBtn);
    rotateRightBtn.addEventListener('click', () => this.handleCropperButtonClick('rotateRight'));

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Restablecer';
    resetBtn.classList.add('config-option');
    buttonsContainer.appendChild(resetBtn);
    resetBtn.addEventListener('click', () => this.handleCropperButtonClick('reset'));

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Guardar';
    saveBtn.classList.add('config-option');
    buttonsContainer.appendChild(saveBtn);
    saveBtn.addEventListener('click', () => this.handleCropperButtonClick('save'));
  }

  handleCropperButtonClick(button) {
    switch (button) {
      case 'rotateLeft':
        this.cropper.rotate(-90);
        break;
      case 'rotateRight':
        this.cropper.rotate(90);
        break;
      case 'reset':
        this.cropper.reset();
        break;
      case 'save':
        const croppedCanvas = this.cropper.getCroppedCanvas();
        break;
    }
  }

  clearExistingOptions() {
    const existingOptions = this.containerAreaOption.querySelectorAll('.config-options');
    existingOptions.forEach(option => option.remove());
  }

  destroyCropper() {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }
}