
class EtiquetarPersonas {
  constructor(containerAreaOption,containerImageWorkspace ,image) {
    this.containerAreaOption = containerAreaOption;
    this.containerImageWorkspace = containerImageWorkspace;
    this.image = image;
  }

  showConfigMenu() {
    // Aquí puedes usar this.image para trabajar con la imagen
    this.containerAreaOption.innerHTML = '<p>Contenido de etiquetar personas</p>';
  }
}