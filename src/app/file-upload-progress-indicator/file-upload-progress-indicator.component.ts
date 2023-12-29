import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-file-upload-progress-indicator',
  templateUrl: './file-upload-progress-indicator.component.html',
  styleUrls: ['./file-upload-progress-indicator.component.scss']
})
export class FileUploadProgressIndicatorComponent {

  constructor(private sanitizer: DomSanitizer) { }

  // Profile image
  imageChangedEvent: any = '';
  image: any = null;

  /*--------------------------------------------------------------------------------
                              Upload & Drag-Drop Image
  ---------------------------------------------------------------------------------*/
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.image = event.target.files[0];
  }




  /*--------------------------------------------------------------------------------
                                    Webcam Image
  ---------------------------------------------------------------------------------*/
  public trigger: Subject<any> = new Subject();
  public webcamImage: WebcamImage;
  public nextWebcam: Subject<any> = new Subject();
  public allowCameraSwitch = true;
  public profileUploder: any = [];
  public errors: WebcamInitError[] = [];

  showHideWebcam: boolean = false;
  capturedImage: any = '';
  croppedImage: any = '';

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.capturedImage = webcamImage.imageAsDataUrl;
    console.log("Captured-Image", webcamImage);
    if (webcamImage) {
      const dataUrl = webcamImage.imageAsDataUrl;
      const base64 = dataUrl.split(',')[1];
      const binary = atob(base64);
      const arrayBuffer = new ArrayBuffer(binary.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binary.length; i++) {
        uint8Array[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: 'image/png' });
      const file = new File([blob], 'captured-image.png', { type: 'image/png' });
      this.image = file;
    }
  }

  public get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('Camera switched:', deviceId);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  /*--------- Cropped Image ----------*/
  imageCropped(event: ImageCroppedEvent) {
    this.profileUploder = [];
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    var file = new File([event.blob], this.image.name, {
      type: event.blob.type,
    });
    console.log("filesssssssss", file);
    file['Type'] = 3;
    this.profileUploder.push(file);
  }




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














  /*--------------------------------------------------------------------------------------------
                                     File Upload & Preview 
  --------------------------------------------------------------------------------------------*/
  // public selectedFile: File | null = null;
  // public previewImageUrl: string | ArrayBuffer | null = null;

  // onFileSelected(event: any) {
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     this.selectedFile = fileList[0];
  //     console.log("selected-file", this.selectedFile);
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       // Set the preview image source
  //       this.previewImageUrl = e.target.result;
  //       console.log("preview-img-url", this.previewImageUrl);
  //     };
  //     reader.readAsDataURL(this.selectedFile as File);
  //   }
  // }


}







