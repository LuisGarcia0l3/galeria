class AgregarObjetos {
  constructor(containerAreaOption,containerImageWorkspace ,image) {
    this.containerAreaOption = containerAreaOption;
    this.containerImageWorkspace = containerImageWorkspace;
    this.image = image;
  }

  showConfigMenu() {
    // Aquí puedes usar this.image para trabajar con la imagen
    this.container.innerHTML = '<p>Contenido de agregar objetos</p>';
  }
}