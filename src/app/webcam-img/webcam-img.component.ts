import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-webcam-img',
  templateUrl: './webcam-img.component.html',
  styleUrls: ['./webcam-img.component.scss']
})
export class WebcamImgComponent {

  constructor(private sanitizer: DomSanitizer) { }

  /*--------------------------------------------------------------------------------
                              Take Photo using Webcam
  --------------------------------------------------------------------------------*/
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.pictureTaken.emit(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }




  /*--------------------------------------------------
             File Upload Toggle Section
  --------------------------------------------------*/
  // capturedImage: any;
  // uploader: any = [];

  // handleImage(webcamImage: WebcamImage, type) {
  //   if (webcamImage) {
  //     const dataUrl = webcamImage.imageAsDataUrl;
  //     const base64 = dataUrl.split(',')[1];
  //     const binary = atob(base64);
  //     const arrayBuffer = new ArrayBuffer(binary.length);
  //     const uint8Array = new Uint8Array(arrayBuffer);
  //     for (let i = 0; i < binary.length; i++) {
  //       uint8Array[i] = binary.charCodeAt(i);
  //     }
  //     const blob = new Blob([uint8Array], { type: 'image/png' });
  //     const file = new File([blob], 'profile.png', { type: 'image/png' });
  //     file['Type'] = type;
  //     this.uploader.push(file);
  //     this.capturedImage = this.sanitizer.bypassSecurityTrustUrl(webcamImage.imageAsDataUrl);
  //   }
  // }



}
