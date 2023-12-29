import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamImgComponent } from './webcam-img.component';

describe('WebcamImgComponent', () => {
  let component: WebcamImgComponent;
  let fixture: ComponentFixture<WebcamImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamImgComponent]
    });
    fixture = TestBed.createComponent(WebcamImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
