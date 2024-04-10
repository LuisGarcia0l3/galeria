class ImageUploader {
  constructor(createGallery) {
    this.createGallery = createGallery;
    this.modal = new Modal();
  }

  init(container) {
    this.areaImages = container;
    this.handleImageUpload();
  }

  handleImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.addEventListener('change', () => {
      const files = input.files;
      this.displayImages(files);
    });

    input.click();
  }

  calculateAspectRatio(width, height) {
    const aspectRatioText = this.getAspectRatioText(width, height);
    const validRatios = ['3:4', '4:3', '3:2', '2:3', '0', '16:9'];
    return validRatios.includes(aspectRatioText) ? aspectRatioText : null;
  }

  getAspectRatioText(width, height) {
    const ratio = width / height;
    if (Math.abs(ratio - (3 / 4)) < 0.01) {
      return '3:4';
    } else if (Math.abs(ratio - (4 / 3)) < 0.01) {
      return '4:3';
    } else if (Math.abs(ratio - (3 / 2)) < 0.01) {
      return '3:2';
    } else if (Math.abs(ratio - (2 / 3)) < 0.01) {
      return '2:3';
    } else if (Math.abs(ratio) < 0.01) {
      return '0';
    } else if (Math.abs(ratio - (16 / 9)) < 0.01) {
      return '16:9';
    } else {
      return 'Invalid';
    }
  }

  displayImages(files) {
    const repeatedImagesMap = {};

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          const img = new Image();
          img.onload = () => {
            const aspectRatio = this.calculateAspectRatio(img.width, img.height);
            const existingImage = this.createGallery.getDatosImagenes().find(img => img.name === file.name);

            if (!existingImage) {
              ImageRenderer.createImageContainer(file, reader, aspectRatio, img, this.createGallery, this.areaImages, this.modal);
              } else {
                if (!repeatedImagesMap[file.name]) {
                  repeatedImagesMap[file.name] = [];
                }
                repeatedImagesMap[file.name].push({
                  src: reader.result,
                  name: file.name,
                  type: file.type,
                  aspectRatio: aspectRatio,
                  orientation: img.width > img.height ? 'horizontal' : 'vertical'
                });
              }
            RepeatedImagesRenderer.renderRepeatedImages(repeatedImagesMap, this.modal);
          };
          img.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  }
}
