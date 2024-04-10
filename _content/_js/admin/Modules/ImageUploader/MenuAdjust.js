class MenuAdjust {
  constructor(containerAreaOption, image) {
    this.containerAreaOption = containerAreaOption;
    this.image = image;
    this.caman = null;
  }

  initializeCaman() {
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
    const brightnessInput = document.createElement('input');
    brightnessInput.type = 'range';
    brightnessInput.min = '-100';
    brightnessInput.max = '100';
    brightnessInput.value = '0';
    brightnessInput.step = '1';
    brightnessInput.classList.add('config-option', 'brightness-slider');
    container.appendChild(brightnessInput);
    brightnessInput.addEventListener('input', this.handleBrightnessChange.bind(this));
  }

  createContrastSlider(container) {
    const contrastInput = document.createElement('input');
    contrastInput.type = 'range';
    contrastInput.min = '-100';
    contrastInput.max = '100';
    contrastInput.value = '0';
    contrastInput.step = '1';
    contrastInput.classList.add('config-option', 'contrast-slider');
    container.appendChild(contrastInput);
    contrastInput.addEventListener('input', this.handleContrastChange.bind(this));
  }

  createSaturationSlider(container) {
    const saturationInput = document.createElement('input');
    saturationInput.type = 'range';
    saturationInput.min = '-100';
    saturationInput.max = '100';
    saturationInput.value = '0';
    saturationInput.step = '1';
    saturationInput.classList.add('config-option', 'saturation-slider');
    container.appendChild(saturationInput);
    saturationInput.addEventListener('input', this.handleSaturationChange.bind(this));
  }

  handleBrightnessChange(event) {
    const value = parseInt(event.target.value);
    Caman('#image_edit', function () {
      this.revert(false);
      this.brightness(value).render();
    });
  }

  handleContrastChange(event) {
    const value = parseInt(event.target.value);
    Caman('#image_edit', function () {
      this.revert(false);
      this.contrast(value).render();
    });
  }

  handleSaturationChange(event) {
    const value = parseInt(event.target.value);
    Caman('#image_edit', function () {
      this.revert(false);
      this.saturation(value).render();
    });
  }

  destroyCaman() {
    if (this.caman) {
      this.caman.reset();
      this.caman = null;
    }
  }
}