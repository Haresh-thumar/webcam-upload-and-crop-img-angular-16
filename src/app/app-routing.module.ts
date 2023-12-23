import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebcamCropperComponent } from './webcam-cropper/webcam-cropper.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImgCropUsingWebcamComponent } from './img-crop-using-webcam/img-crop-using-webcam.component';

const routes: Routes = [
  { path: '', redirectTo: 'webcam-cropper', pathMatch: 'full' },
  { path: 'webcam-cropper', component: WebcamCropperComponent },
  { path: 'image-crop', component: ImageCropperComponent },
  { path: 'img-crop-using-webcam', component: ImgCropUsingWebcamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
