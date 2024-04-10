class ConfiguracionImagen {
  constructor(containerAreaOption, containerImageWorkspace, image, dataImage) {
    this.containerAreaOption = containerAreaOption;
    this.containerImageWorkspace = containerImageWorkspace;
    this.image = image;
    this.dataImage = dataImage;
  }

  showConfigMenu() {
    this.containerAreaOption.innerHTML = '';
    const menuCropper = new MenuCropper(this.containerAreaOption, this.image);
    const menuAdjust = new MenuAdjust(this.containerAreaOption, this.image);
    menuCropper.createCropperOption();
    menuAdjust.createAdjustOption();
  }
}