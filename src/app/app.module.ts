import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WebcamCropperComponent } from './webcam-cropper/webcam-cropper.component';
import { WebcamModule } from 'ngx-webcam';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImgCropUsingWebcamComponent } from './img-crop-using-webcam/img-crop-using-webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamCropperComponent,
    ImageCropperComponent,
    ImgCropUsingWebcamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
