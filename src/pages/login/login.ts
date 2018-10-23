import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {HomePage} from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Common } from "../../providers/auth-service/common";
import { TabsCompanyPage } from '../tabs-company/tabs-company';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
responseData : any ;
  userData = {"username":"", "password":"" };
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,private toastCtrl:ToastController,public Common: Common) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.Common.presentLoading();
    if(this.userData.username && this.userData.password){
      //Api connections
    this.authService.postData(this.userData, "login").then((result) =>{
    this.responseData = result;
        if(this.responseData.userData){
          if(this.responseData.userData.level=="pencari kerja"){
            console.log(this.responseData);
            localStorage.setItem('userData', JSON.stringify(this.responseData) );
            this.navCtrl.push(TabsPage);
            this.Common.closeLoading();
            
            const alert = this.alertCtrl.create({
              title: 'Welcome',
              subTitle: this.userData.username,
              buttons: ['OK']
            });
  
            alert.present();
  
          }else if(this.responseData.userData.level=="perusahaan"){
            console.log(this.responseData);
            localStorage.setItem('userData', JSON.stringify(this.responseData) );
            this.navCtrl.push(TabsCompanyPage);
            this.Common.closeLoading();
            
            const alert = this.alertCtrl.create({
              title: 'Welcome',
              subTitle: this.userData.username,
              buttons: ['OK']
            });
  
            alert.present();
          }
        }else{
      this.Common.closeLoading();
      this.presentToast("Please give valid username and password");
      }
      }, (err) => {
      //Connection failed message
      });
    }else{
    this.Common.closeLoading();
    console.log("Give valid information.");
    this.presentToast("Silahkan isi username dan password terlebih dahulu");
  }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  
}
