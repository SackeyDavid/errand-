import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""
  constructor(
    public afAuth: AngularFireAuth, 
    public alert: AlertController, 
    public router: Router) { }

  ngOnInit() {
  }

  async register() {
    const{ username, password, cpassword } = this

    if (password !== cpassword) {
      this.showAlert("Error ", "Passwords don't match")
      return console.error("Passwords don't match")
    }

   try {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password)
    this.showAlert("Success ", "Welcome")
    this.router.navigate(['/tabs'])
    console.log(res)
   } catch (error) {
     console.dir(error)
   }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })

    await alert.present()
  }

}
