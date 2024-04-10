class FormGenerator {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }

    generateForm() {
        const previousData = this.createGallery.getDatosGenerales();
        const containerConfig = this.createGallery.containerConfig;

       

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDivcenter');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Informacion general de la galeria';
        titleDiv.appendChild(titleSpan);
        containerConfig.appendChild(titleDiv);

        const form = document.createElement('form');
        form.classList.add('formDataGeneral');

        const pregunta1 = document.createElement('div');
        pregunta1.classList.add('formDataGeneral_preg1', 'formDataGeneral_preg');
        const span1 = document.createElement('span');
        span1.textContent = 'Titulo de la galeria';
        const input1 = document.createElement('input');
        input1.setAttribute('type', 'text');
        pregunta1.appendChild(span1);
        pregunta1.appendChild(input1);
        form.appendChild(pregunta1);

        const pregunta2 = document.createElement('div');
        pregunta2.classList.add('formDataGeneral_preg2', 'formDataGeneral_preg');
        const span2 = document.createElement('span');
        span2.textContent = 'Fecha subida';
        const input2 = document.createElement('input');
        input2.setAttribute('type', 'date');
        pregunta2.appendChild(span2);
        pregunta2.appendChild(input2);
        form.appendChild(pregunta2);

        const pregunta3 = document.createElement('div');
        pregunta3.classList.add('formDataGeneral_preg3', 'formDataGeneral_preg');
        const span3 = document.createElement('span');
        span3.textContent = 'Centro';
        pregunta3.appendChild(span3);

        const divCenters = document.createElement('div');
        divCenters.classList.add('ctn_centers');

        const divPachuca = document.createElement('div');
        const inputPachuca = document.createElement('input');
        inputPachuca.setAttribute('type', 'checkbox');
        inputPachuca.setAttribute('name', 'centro');
        inputPachuca.setAttribute('value', 'Pachuca');
        const labelPachuca = document.createElement('label');
        labelPachuca.textContent = 'Pachuca';
        divPachuca.appendChild(inputPachuca);
        divPachuca.appendChild(labelPachuca);
        divCenters.appendChild(divPachuca);

        const divInterplaza = document.createElement('div');
        const inputInterplaza = document.createElement('input');
        inputInterplaza.setAttribute('type', 'checkbox');
        inputInterplaza.setAttribute('name', 'centro');
        inputInterplaza.setAttribute('value', 'Interplaza');
        const labelInterplaza = document.createElement('label');
        labelInterplaza.textContent = 'Interplaza';
        divInterplaza.appendChild(inputInterplaza);
        divInterplaza.appendChild(labelInterplaza);
        divCenters.appendChild(divInterplaza);

        pregunta3.appendChild(divCenters);

        form.appendChild(pregunta3);
        containerConfig.appendChild(form);


        if (Object.keys(previousData).length !== 0) {
            console.log(previousData.titulo)
            document.querySelector('.formDataGeneral_preg1 input').value = previousData.titulo;
            document.querySelector('.formDataGeneral_preg2 input').value = previousData.fechaSubida;
            const checkboxes = document.querySelectorAll('.formDataGeneral_preg3 input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (previousData.centros.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        }
    }
}