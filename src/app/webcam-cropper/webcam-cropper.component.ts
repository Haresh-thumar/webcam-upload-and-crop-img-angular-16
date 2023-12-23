import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-webcam-cropper',
  templateUrl: './webcam-cropper.component.html',
  styleUrls: ['./webcam-cropper.component.scss']
})
export class WebcamCropperComponent {


  /*--------------------------------------------------------------------------------
                              Take Photo using Webcam 
  --------------------------------------------------------------------------------*/
  private trigger: Subject<any> = new Subject();
  public webcamImage?: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }




}
