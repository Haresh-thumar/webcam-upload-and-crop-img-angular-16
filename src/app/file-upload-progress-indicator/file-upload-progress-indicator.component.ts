import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-file-upload-progress-indicator',
  templateUrl: './file-upload-progress-indicator.component.html',
  styleUrls: ['./file-upload-progress-indicator.component.scss']
})
export class FileUploadProgressIndicatorComponent {

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Perform actions with the selected file
      console.log('Selected file:', file);
      // You can also upload the file to a server here
    }
  }


  // constructor(private http: HttpClient) { }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     // Replace 'your-upload-endpoint' with the actual URL where you want to upload the file
  //     this.http.post('your-upload-endpoint', formData).subscribe(response => {
  //       console.log('File uploaded successfully:', response);
  //     });
  //   }
  // }


}
