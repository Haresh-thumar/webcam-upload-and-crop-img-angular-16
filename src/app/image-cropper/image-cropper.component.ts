import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private sanitizer: DomSanitizer) { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent | any) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    console.log("croppper image", this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
    console.log("show cropper", image.original.objectUrl);
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
