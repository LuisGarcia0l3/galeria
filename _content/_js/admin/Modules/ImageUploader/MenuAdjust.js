class MenuAdjust {
  constructor(containerAreaOption, image, menuCropper) {
    this.containerAreaOption = containerAreaOption;
    this.image = image;
    this.caman = null;
    this.menuCropper = menuCropper;
  }

  initializeCaman() {
    console.log("Inicilizando caman")
      this.caman = Caman('#image_edit', function () {
        // Configuración inicial de Caman
      });
    
  }
  createAdjustControls() {
    const adjustContainer = document.createElement('div');
    adjustContainer.classList.add('adjust-controls');

    this.createBrightnessSlider(adjustContainer);
    this.createContrastSlider(adjustContainer);
    this.createSaturationSlider(adjustContainer);

    return adjustContainer;
  }

  createBrightnessSlider(container) {
    const brightnessContainer = document.createElement('div');
    brightnessContainer.classList.add('config-option-container');
  
    const brightnessLabel = document.createElement('label');
    brightnessLabel.textContent = 'Brightness:';
    brightnessContainer.appendChild(brightnessLabel);
  
    const brightnessValue = document.createElement('span');
    brightnessValue.textContent = '0';
    brightnessValue.classList.add('config-value');
    brightnessContainer.appendChild(brightnessValue);
  
    const brightnessInput = document.createElement('input');
    brightnessInput.type = 'range';
    brightnessInput.min = '-100';
    brightnessInput.max = '100';
    brightnessInput.value = '0';
    brightnessInput.step = '1';
    brightnessInput.classList.add('config-option', 'brightness-slider');
    brightnessContainer.appendChild(brightnessInput);
    container.appendChild(brightnessContainer);
  
    brightnessInput.addEventListener('input', () => {
      brightnessValue.textContent = brightnessInput.value;
      this.handleBrightnessChange(brightnessInput.value);
    });
  }
  
  createContrastSlider(container) {
    const contrastContainer = document.createElement('div');
    contrastContainer.classList.add('config-option-container');
  
    const contrastLabel = document.createElement('label');
    contrastLabel.textContent = 'Contrast:';
    contrastContainer.appendChild(contrastLabel);
  
    const contrastValue = document.createElement('span');
    contrastValue.textContent = '0';
    contrastValue.classList.add('config-value');
    contrastContainer.appendChild(contrastValue);
  
    const contrastInput = document.createElement('input');
    contrastInput.type = 'range';
    contrastInput.min = '-100';
    contrastInput.max = '100';
    contrastInput.value = '0';
    contrastInput.step = '1';
    contrastInput.classList.add('config-option', 'contrast-slider');
    contrastContainer.appendChild(contrastInput);
    container.appendChild(contrastContainer);
  
    contrastInput.addEventListener('input', () => {
      contrastValue.textContent = contrastInput.value;
      this.handleContrastChange(contrastInput.value);
    });
  }
  
  createSaturationSlider(container) {
    const saturationContainer = document.createElement('div');
    saturationContainer.classList.add('config-option-container');
  
    const saturationLabel = document.createElement('label');
    saturationLabel.textContent = 'Saturation:';
    saturationContainer.appendChild(saturationLabel);
  
    const saturationValue = document.createElement('span');
    saturationValue.textContent = '0';
    saturationValue.classList.add('config-value');
    saturationContainer.appendChild(saturationValue);
  
    const saturationInput = document.createElement('input');
    saturationInput.type = 'range';
    saturationInput.min = '-100';
    saturationInput.max = '100';
    saturationInput.value = '0';
    saturationInput.step = '1';
    saturationInput.classList.add('config-option', 'saturation-slider');
    saturationContainer.appendChild(saturationInput);
    container.appendChild(saturationContainer);
  
    saturationInput.addEventListener('input', () => {
      saturationValue.textContent = saturationInput.value;
      this.handleSaturationChange(saturationInput.value);
    });
  }
  
  handleBrightnessChange(value) {
    this.menuCropper.destroyCropper(); // Detener Cropper.js
    const intValue = parseInt(value);
    Caman('#image_edit', function () {
      this.revert(false);
      this.brightness(intValue).render();
    });
  }
  
  handleContrastChange(value) {
    this.menuCropper.destroyCropper(); // Detener Cropper.js
    const intValue = parseInt(value);
    Caman('#image_edit', function () {
      this.revert(false);
      this.contrast(intValue).render();
    });
  }
  
  handleSaturationChange(value) {
    this.menuCropper.destroyCropper(); // Detener Cropper.js
    const intValue = parseInt(value);
    Caman('#image_edit', function () {
      this.revert(false);
      this.saturation(intValue).render();
    });
  }
  
  destroyCaman() {
      console.log(this.caman)
      this.caman = null;
    }
  
}