import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData : any ;
  userData = {"username":"", "password":"","email":"","name":""};
  constructor(public alertCtrl: AlertController,public navCtrl : NavController, public authService : AuthServiceProvider, private toastCtrl:ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    if(this.userData.username && this.userData.password && this.userData.email && this.userData.name){
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
    this.responseData = result;
    if(this.responseData.userData){
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData) )
      const alert = this.alertCtrl.create({
        title: 'Welcome',
        subTitle: this.userData.name,
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(TabsPage);
    }
    else{
      this.presentToast("Please give valid username and password");
    }
    
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    console.log("Give valid information.");
  }
  
  }

login() {
    this
      .navCtrl
      .push(LoginPage);
  }  

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
