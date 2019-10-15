import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  userPosts
  posts
  uid: string

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public afAuth: AngularFireAuth,
  ) {
    
    
   }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
     
      this.uid = user.uid
      console.log(this.uid)
      this.posts = this.afstore.doc(`users/${this.uid}`)
    
      this.userPosts = this.posts.valueChanges()
      console.log(this.uid)
      console.log(this.userPosts)
    });
    
  }

  

}
