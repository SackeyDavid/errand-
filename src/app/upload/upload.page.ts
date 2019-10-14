import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageURL: string

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'd123ac315b6226fe95b3')

    
    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      
      console.log(event)
      this.imageURL =  event['file']
      
    })
  }

}
