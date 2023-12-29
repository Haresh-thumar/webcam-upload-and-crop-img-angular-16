import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-img-crop-using-webcam',
  templateUrl: './img-crop-using-webcam.component.html',
  styleUrls: ['./img-crop-using-webcam.component.scss']
})
export class ImgCropUsingWebcamComponent {

  constructor(private sanitizer: DomSanitizer) { }
  /*--------------------------------------------------------------------------------
                                Take Photo using Webcam
    --------------------------------------------------------------------------------*/
  public trigger: Subject<any> = new Subject();
  public webcamImage: WebcamImage;
  public nextWebcam: Subject<any> = new Subject();
  public allowCameraSwitch = true;
  public profileUploder: any = [];
  public errors: WebcamInitError[] = [];

  showHideWebcam: boolean = false;
  capturedImage = '';
  croppedImage: any = '';
  image: any = null;

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.capturedImage = webcamImage.imageAsDataUrl;
    this.showHideWebcam = false;
    this.image = webcamImage;
  }
  public get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  /*-------------------- WebcamImage to File Convert Logic --------------------*/

  // webCamTakenImg(event: WebcamImage) {
  //   this.capturedImage = event.imageAsDataUrl;
  //   if (event) {
  //     const dataUrl = event.imageAsDataUrl;
  //     const base64 = dataUrl.split(',')[1];
  //     const binary = atob(base64);
  //     const arrayBuffer = new ArrayBuffer(binary.length);
  //     const uint8Array = new Uint8Array(arrayBuffer);
  //     for (let i = 0; i < binary.length; i++) {
  //       uint8Array[i] = binary.charCodeAt(i);
  //     }
  //     const blob = new Blob([uint8Array], { type: 'image/png' });
  //     const file = new File([blob], 'profile.png', { type: 'image/png' });
  //     this.image = file;
  //   }
  // }



  /*-----------------------------------------------------------------------------
                                     Crop Image
  ------------------------------------------------------------------------------*/

  /*--------- Cropped Image ----------*/
  imageCropped(event: ImageCroppedEvent) {
    // const fileSizeInBytes = event.blob.size;
    // const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to megabytes
    // console.log(`size: ${fileSizeInMB.toFixed(2)} MB`);
    // this.croppedImage = event.objectUrl;

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64String = fileReader.result as string;
      const imageName = 'profile.png';
      const imageBlob = this.dataURItoBlob(base64String);
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      console.log("Last Convertable File....", imageFile);
    };
    fileReader.readAsDataURL(event.blob);

    this.croppedImage = fileReader;
    this.profileUploder = [];
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    var file = new File([event.blob], this.image.target.file[0].name, {
      type: event.blob.type,
    });
    file['Type'] = 3;
    this.profileUploder.push(file);
    console.log("profile-Upload-Image", this.profileUploder);
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
    this.capturedImage = event;
    this.image = event;
    console.log("photo", event.target.files[0]);
  }

  /*-------------- File-Upload Rotate & Transform --------------*/
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }



  /*----------------------------------------------------------------------------------
                                      File Upload
  ----------------------------------------------------------------------------------*/
  // files: any;
  // filechange(event: any) {
  //   // console.log("file upload", event.target.files[0]);
  //   this.files = event.target.files[0];

  //   // File Preview
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.files = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.files);

  //   this.capturedImage = this.files;
  //   console.log("file upload", this.files);
  // }









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
