import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageURL: string
  desc: string
  uid: string

  @ViewChild('fileButton', {static: false}) fileButton
 

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
    public afAuth: AngularFireAuth,
    ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
     this.uid = user['uid']
    });
  }

  createPost() {
    const image = this.imageURL 
    const desc = this.desc 
    console.log(this.uid)
    this.afstore.doc(`users/${this.uid}`).update({
        posts: firestore.FieldValue.arrayUnion({
          image,
          desc
        })
    })
  }

  uploadFile() {
    this.fileButton.nativeElement.click()
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
