import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  posts
  uid: string
  mainuser: AngularFirestoreDocument
  sub
  username: string
  profilePic: string

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    
    
   }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
     
      this.uid = user.uid
      console.log(this.uid)
      this.mainuser = this.afstore.doc(`users/${this.uid}`)
    
      this.sub = this.mainuser.valueChanges().subscribe(event => {
          this.posts = event.posts
          this.username = event.username
          this.profilePic = event.profilePic
          console.log(event)
      })
      console.log(this.uid)
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  goTo(postID: string) {
    this.router.navigate(['/post/' +  postID.split('/')[0]])
  }
  

}
