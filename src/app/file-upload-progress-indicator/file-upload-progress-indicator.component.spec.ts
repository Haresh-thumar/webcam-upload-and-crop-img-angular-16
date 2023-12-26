import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProgressIndicatorComponent } from './file-upload-progress-indicator.component';

describe('FileUploadProgressIndicatorComponent', () => {
  let component: FileUploadProgressIndicatorComponent;
  let fixture: ComponentFixture<FileUploadProgressIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadProgressIndicatorComponent]
    });
    fixture = TestBed.createComponent(FileUploadProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
