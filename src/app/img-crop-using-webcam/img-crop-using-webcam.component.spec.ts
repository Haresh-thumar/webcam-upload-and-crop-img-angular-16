import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCropUsingWebcamComponent } from './img-crop-using-webcam.component';

describe('ImgCropUsingWebcamComponent', () => {
  let component: ImgCropUsingWebcamComponent;
  let fixture: ComponentFixture<ImgCropUsingWebcamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgCropUsingWebcamComponent]
    });
    fixture = TestBed.createComponent(ImgCropUsingWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
