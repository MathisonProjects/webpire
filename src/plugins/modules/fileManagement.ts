import { v4 as uuidv4 } from 'uuid'
export default {
    runSaveImage(imageToUpload:any) {
        return this.getBase64(imageToUpload).then(response => {
            return this.saveImage(response,imageToUpload)
        })
    },
    saveImage(response:any,imageToUpload:any) {
        // Validated for JPEGs
        const cleanResponse = response.split(',')[1].replace('dataimage/jpegbase', '')
        const imageData = {
            file_name: process.env.SITE_NAME?.toLocaleLowerCase() + '/' + uuidv4() + '.' + imageToUpload.type.replace('image/', ''),
            file_type: imageToUpload.type,
            file_data: cleanResponse
        }
        // api.uploadImage(imageData)
        return new Promise((resolve, reject) => {
            resolve(imageData)
        })
    },
    getImageType(imageToUpload:any):any {
        return '.' + imageToUpload.type.replace('image/', '')
    },
    getBase64(imageToUpload: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageToUpload);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
}