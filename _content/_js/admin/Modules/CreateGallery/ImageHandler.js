class ImageHandler {
    constructor(createGallery) {
        this.createGallery = createGallery;
    }


    updateImage(data){
        console.log(data)
    }

    addImage(data) {
        if (!this.createGallery.steps[this.createGallery.currentStep].data.images) {
            this.createGallery.steps[this.createGallery.currentStep].data.images = [];
        }
        this.createGallery.steps[this.createGallery.currentStep].data.images.push(data);

        if (!this.createGallery.steps[this.createGallery.currentStep].dataO.images) {
            this.createGallery.steps[this.createGallery.currentStep].dataO.images = [];
        }
        this.createGallery.steps[this.createGallery.currentStep].dataO.images.push({ ...data });
    }

    removeImage(name) {
        const images = this.createGallery.steps[this.createGallery.currentStep].data.images;
        const imagesO = this.createGallery.steps[this.createGallery.currentStep].dataO.images;

        const index = images.findIndex(img => img.name === name);
        if (index !== -1) {
            images.splice(index, 1);
            imagesO.splice(index, 1);
        }
    }
}
