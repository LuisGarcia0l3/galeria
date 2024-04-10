class MenuCropper {
  constructor(containerAreaOption, image, menuAdjust) {
    this.containerAreaOption = containerAreaOption;
    this.image = image;
    this.cropper = null;
    this.menuAdjust = menuAdjust;
  }

  initializeCropper() {

    this.cropper = new Cropper(this.image, {
      aspectRatio: 16 / 9,
      // Other Cropper.js configuration options
    });
    console.log(this.cropper)
  }

  createCropperButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('cropper-buttons');

    this.createRotateLeftButton(buttonsContainer);
    this.createRotateRightButton(buttonsContainer);
    this.createResetButton(buttonsContainer);
    this.createSaveButton(buttonsContainer);

    return buttonsContainer;
  }

  createRotateLeftButton(container) {
    const rotateLeftBtn = document.createElement('button');
    rotateLeftBtn.textContent = 'Rotate Left';
    rotateLeftBtn.classList.add('config-option');
    container.appendChild(rotateLeftBtn);
    rotateLeftBtn.addEventListener('click', () => this.handleRotateLeft());
  }

  createRotateRightButton(container) {
    const rotateRightBtn = document.createElement('button');
    rotateRightBtn.textContent = 'Rotate Right';
    rotateRightBtn.classList.add('config-option');
    container.appendChild(rotateRightBtn);
    rotateRightBtn.addEventListener('click', () => this.handleRotateRight());
  }

  createResetButton(container) {
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.classList.add('config-option');
    container.appendChild(resetBtn);
    resetBtn.addEventListener('click', () => this.handleReset());
  }

  createSaveButton(container) {
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('config-option');
    container.appendChild(saveBtn);
    saveBtn.addEventListener('click', () => this.handleSave());
  }

  handleRotateLeft() {
    this.cropper.rotate(-90);
  }

  handleRotateRight() {
    this.cropper.rotate(90);
  }

  handleReset() {
    this.cropper.reset();
  }

  handleSave() {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    console.log(croppedCanvas);
  }

  destroyCropper() {
      this.cropper.destroy();
      this.cropper = null;

  }
}