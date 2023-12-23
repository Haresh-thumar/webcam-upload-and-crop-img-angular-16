import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamCropperComponent } from './webcam-cropper.component';

describe('WebcamCropperComponent', () => {
  let component: WebcamCropperComponent;
  let fixture: ComponentFixture<WebcamCropperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamCropperComponent]
    });
    fixture = TestBed.createComponent(WebcamCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
