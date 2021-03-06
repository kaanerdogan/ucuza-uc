import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage} from "../tabs/tabs";
import {AngularFireAuth} from "@angular/fire/auth";
import {SignupPage} from "../signup/signup";
import {AlertController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public alertCtrl:AlertController
              ) {
  }



  async loginAction(email, pass) {

    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(auth => {
      let alert = this.alertCtrl.create({
        title: 'Başarılı',
        subTitle: "Başarıyla Giriş Yaptınız",
        buttons: ['Tamam']
      });
      alert.present();
      this.homePageSegue()
    })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Başarısız',
          subTitle: "Girdiğiniz e-posta adresi veya şifre hatalı",
          buttons: ['Tamam']
        });
        alert.present();
      })
  }

  loginPageSegue(){
    this.navCtrl.setRoot(SignupPage);
  }

  homePageSegue(){
    this.navCtrl.setRoot(TabsPage);
  }

  forgotPasswordSegue(){
    this.navCtrl.push(ForgotPassword)
  }

}


@Component({
  templateUrl: 'forgot.html',
})
export class ForgotPassword {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public alertCtrl:AlertController
  ) {
  }
  submitAction(email){
    this.afAuth.auth.sendPasswordResetEmail(email).then(gonder => {
        const alert = this.alertCtrl.create({
          title: 'Sıfırlama E-postası Gönderildi',
          subTitle: 'Lütfen e-posta adresinizi kontrol edin ve aşağıdaki butona tıklayıp giriş yapın',
          buttons: [{
            text: 'Giriş sayfasına git',
            handler: () => {
              this.navCtrl.setRoot(LoginPage)
            }
          }]
        });
        alert.present();
    })

  }


}
