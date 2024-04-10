

class RepeatedImagesRenderer {
  static renderRepeatedImages(repeatedImagesMap, modal) {
    const repeatedImages = Object.values(repeatedImagesMap).flat();
    if (repeatedImages.length > 0) {
      let htmlContent = '';

      const containerDiv = document.createElement('div');
      containerDiv.classList.add('repeated-images-container');

      repeatedImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.name;
        imgElement.classList.add('repeated-image');
        containerDiv.appendChild(imgElement);
      });

      htmlContent += containerDiv.outerHTML;

      modal.open({
        title: 'Imágenes ya incluidas',
        text: 'Las siguientes imágenes ya han sido incluidas:',
        htmlContent: htmlContent,
        buttons: [
          { label: 'Cerrar', action: () => { modal.close(); } }
        ],
        modalClass: 'Modal_repeat',
        contentClass: 'Modal_repeat_content'
      });
    }
  }
}