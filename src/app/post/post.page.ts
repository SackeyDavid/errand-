import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postID: string
  effect: string = ''
  post 
  postReference: AngularFirestoreDocument
  sub
  uid 

  heartType: string = "heart-empty"

  constructor(
    private route: ActivatedRoute, 
    private afstore: AngularFirestore,
    private user: UserService,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
      this.uid = user['uid']
     });

    this.postID = this.route.snapshot.paramMap.get("id")
    this.postReference = this.post = this.afstore.doc(`posts/${this.postID}`)

    this.sub = this.postReference.valueChanges().subscribe( val=> {
      this.post = val
      this.effect = val.effect
      this.heartType = val.likes.includes(this.uid) ? 'heart' : 'heart-empty'
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  toggleHeart() {
    if (this.heartType == "heart-empty"){
      this.postReference.update({
        likes: firestore.FieldValue.arrayUnion(this.uid)
      })
    } else {
      this.postReference.update({
        likes: firestore.FieldValue.arrayRemove(this.uid)
      })
    }
  }

}
