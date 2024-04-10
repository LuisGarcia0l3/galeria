class ConfiguracionImagen {
  constructor(containerAreaOption, containerImageWorkspace, image, dataImage) {
    this.containerAreaOption = containerAreaOption;
    this.containerImageWorkspace = containerImageWorkspace;
    this.image = image;
    this.dataImage = dataImage;
    this.selectedOption = '';
    this.menuCropper = null;
    this.menuAdjust = null;

    this.initializeMenus();
    this.showConfigMenu();
  }

  initializeMenus() {
    this.menuCropper = new MenuCropper(this.containerAreaOption, this.image);
    this.menuAdjust = new MenuAdjust(this.containerAreaOption, this.image);
  }

  showConfigMenu() {
    this.containerAreaOption.innerHTML = '';

    const configMenuContainer = document.createElement('div');
    configMenuContainer.classList.add('config-menu-container');

    const cropperOption = this.createMenuOption('cropper', 'Recorte');
    configMenuContainer.appendChild(cropperOption);

    const adjustOption = this.createMenuOption('adjust', 'Ajuste General');
    configMenuContainer.appendChild(adjustOption);

    this.containerAreaOption.appendChild(configMenuContainer);

    this.menuCropper.createCropperButtons();
    this.menuAdjust.createAdjustControls();
  }

  createMenuOption(option, text) {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('menu-option-container');
    const optionSpan = document.createElement('span');
    optionSpan.textContent = text;
    optionContainer.appendChild(optionSpan);

    if (option === 'cropper') {
      const cropperButtons = this.menuCropper.createCropperButtons();
      optionContainer.appendChild(cropperButtons);
    } else if (option === 'adjust') {
      const adjustControls = this.menuAdjust.createAdjustControls();
      optionContainer.appendChild(adjustControls);
    }

    optionContainer.addEventListener('click', () => this.handleOptionSelect(option));

    return optionContainer;
  }

  handleOptionSelect(option) {
    this.selectedOption = option;

    if (option === 'cropper') {
      this.menuAdjust.destroyCaman();
      this.menuCropper.initializeCropper();
    } else if (option === 'adjust') {
      this.menuCropper.destroyCropper();
      this.menuAdjust.initializeCaman();
    }
  }
}