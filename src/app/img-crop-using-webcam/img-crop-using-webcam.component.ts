import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-img-crop-using-webcam',
  templateUrl: './img-crop-using-webcam.component.html',
  styleUrls: ['./img-crop-using-webcam.component.scss']
})
export class ImgCropUsingWebcamComponent {

  /*--------------------------------------------------------------------------------
                                Take Photo using Webcam 
    --------------------------------------------------------------------------------*/
  public trigger: Subject<any> = new Subject();
  public webcamImage: WebcamImage;
  public nextWebcam: Subject<any> = new Subject();
  showHideWebcam: boolean = true;
  capturedImage = '';

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.capturedImage = webcamImage.imageAsDataUrl;
    this.showHideWebcam = false;
    console.info('got webcam image.............', this.capturedImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }



  /*-----------------------------------------------------------------------------
                                     Crop Image
  ------------------------------------------------------------------------------*/
  croppedImage: any = '';
  img: any;

  constructor(private sanitizer: DomSanitizer) { }

  /*-------- Cropper Image Ready ---------*/
  cropperReady(evt) {
    // cropper ready
    console.log('CropperReady....', evt);
    console.log("width" + " - " + evt.width);
    console.log("height" + " - " + evt.height);
  }

  /*--------- Cropped Image ----------*/
  imageCropped(event: ImageCroppedEvent) {
    const fileSizeInBytes = event.blob.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to megabytes
    console.log(`size: ${fileSizeInMB.toFixed(2)} MB`);
    // this.croppedImage = event.objectUrl;

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64String = fileReader.result as string;
      console.log('Final-Img ', base64String);

      const imageName = 'name.png';
      const imageBlob = this.dataURItoBlob(base64String);
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      console.log("Last Converable File....", imageFile);
    };
    fileReader.readAsDataURL(event.blob);


    console.log("croppper image....", this.croppedImage);
  };

  dataURItoBlob(dataURI) {
    var byteCharacters = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {
      type: undefined
    });
    return blob;
  }



  fileChangeEvent(event: any): void {
    console.log("photo", event.target.files[0]);
  }



  /*----------------------------------------------------------------------------------
                                      File Upload
  ----------------------------------------------------------------------------------*/
  files: any;
  filechange(event: any) {
    // console.log("file upload", event.target.files[0]);
    this.files = event.target.files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.files = reader.result as string;
    };
    reader.readAsDataURL(this.files);

    this.capturedImage = this.files;
    console.log("file upload", this.files);
  }









  // <input type="file" (change)="onFileSelected($event)">
  // <button (click)="uploadFile()">Upload File</button>



  // selectedFile: File;

  // constructor(private http: HttpClient) {}

  // onFileSelected(event): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // uploadFile(): void {
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   this.http.post('your-upload-endpoint', formData)
  //     .subscribe(response => {
  //       console.log('File uploaded successfully:', response);
  //     }, error => {
  //       console.error('Error uploading file:', error);
  //     });
  // }


}
