import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { IonButton, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageURL: string
  desc: string
  uid: string
  username: string

  scaleCrop: string = '-/scale_crop/200x200'


  effects = {
    effect1: '',
    effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
    effect3: '-/filter/elmet/150/',
    effect4: '-/filter/gavin/150/',
    effect5: '-/filter/misiara/150/' 
  }

  
  activeEffect: string =  this.effects.effect1

  busy: boolean = false
  noFace: boolean = false
  @ViewChild('fileButton', {static: false}) fileButton
 

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
    public afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
     this.uid = user['uid']
     this.username = user['email']
    });
  }

  async createPost() {
    this.busy = true
    const image = this.imageURL 
    const desc = this.desc 
    const activeEffect = this.activeEffect
    console.log(this.uid)
    this.afstore.doc(`users/${this.uid}`).update({
        posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.username,
      likes: [],
      effect: activeEffect
    })

    this.busy = false
    this.imageURL = ""
    this.desc = ""

    const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your post was saved',
      buttons: ['ok']
    })

    await alert.present()

    this.router.navigate(['/upload'])
  }

  setSelected(effect: string) {
    this.activeEffect = this.effects[effect]

  }

  uploadFile() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event) {

    this.busy = true
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'd123ac315b6226fe95b3')

    
    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      
      console.log(event)
      this.imageURL =  event['file']
      this.busy = false
      this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`)
      .subscribe(event => {
        this.noFace = event['faces'] == 0
      })
    })
  }

  

}
