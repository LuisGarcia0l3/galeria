

class ReviewGenerator {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    generateReview() {
        const containerConfig = this.createGallery.containerConfig;
        const datosGenerales = this.createGallery.getDatosGenerales();         
        const imagenes = this.createGallery.getDatosImagenes();

        containerConfig.innerHTML = '';

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDivcenter');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Revisión';
        titleDiv.appendChild(titleSpan);
        containerConfig.appendChild(titleDiv);

        const datosGeneralesDiv = document.createElement('div');
        datosGeneralesDiv.classList.add('ctn_datareviewGeneral');
        const datosGeneralesTittle = document.createElement('span');
        datosGeneralesTittle.textContent = 'Datos Generales: ';
        datosGeneralesDiv.appendChild(datosGeneralesTittle);

        const datosGeneralesList = document.createElement('div');
        for (const key in datosGenerales) {
            const listItem = document.createElement('span');
            listItem.innerHTML = `<strong>${key}:</strong> ${datosGenerales[key]}`;
            datosGeneralesList.appendChild(listItem);
        }
        datosGeneralesDiv.appendChild(datosGeneralesList);
        containerConfig.appendChild(datosGeneralesDiv);

        const imagenesDiv = document.createElement('div');
        imagenesDiv.classList.add('ctn_datareviewImages');
        const dataImagensTittle = document.createElement('span');
        dataImagensTittle.textContent = 'Imágenes:';
        imagenesDiv.appendChild(dataImagensTittle);

        const imagenesList = document.createElement('div');
        imagenesList.classList.add('ctn_imgreview');
        imagenes.forEach((imagen, index) => {
            const listItem = document.createElement('div');
            const imageElement = document.createElement('img');
            imageElement.src = imagen.src; 
            listItem.appendChild(imageElement);
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `Nombre: ${imagen.name}`;
            listItem.appendChild(nameSpan);
            imagenesList.appendChild(listItem);
        });
        imagenesDiv.appendChild(imagenesList);
        containerConfig.appendChild(imagenesDiv);
    }
}