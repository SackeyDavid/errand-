import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  uid: string
  username: string
  sub
  profilePic: string
  password: string
  newpassword: string

  busy: boolean = false

  @ViewChild('fileBtn', {static: false}) fileBtn: {
      nativeElement: HTMLInputElement
  }
  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public user: UserService,
    public alertController: AlertController,
    public router: Router) { 
      this.mainuser = afstore.doc(`users/${this.uid}`)
      this.sub = this.mainuser.valueChanges()
      .subscribe(event => {
        this.username = event.username
        this.profilePic = event.profilePic
      })
    }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
      this.uid = user['uid']
      this.username = user['email']
    })
  }

  ngOnDestry() {
    this.sub.unsubscribe()
  }

  updateProfilePic() {
    this.fileBtn.nativeElement.click()
  }

  uploadPic(event) {
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'd123ac315b6226fe95b3')

    
    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
        const uuid = event['file'] 
        this.mainuser.update({
          profilePic: uuid
        }) 
      console.log(event)
      
    })

  }

  async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message:  content,
        buttons: ['OK']
      })

      await alert.present()
  }


  async updateDetails() {
    this.busy = true

    if(!this.password) {
      return this.presentAlert('Error', 'You have to enter a password')
    }

    try {
      await this.user.reAuth(this.username, this.password)
    } catch (error) {
      return this.presentAlert('Error', 'Wrong Password')
    }

    

    if(this.newpassword) {
      await this.user.updatePassword(this.newpassword)
    }

    if(this.username !== this.username) {
      await this.user.updateEmail(this.username)

      this.mainuser.update({
        username: this.username
      })
    }

    this.password = ""
    this.newpassword = ""
    this.busy = false

    await this.presentAlert('Done!', 'Your profile was updated')

    this.router.navigate(['/about'])

  }
  

}
