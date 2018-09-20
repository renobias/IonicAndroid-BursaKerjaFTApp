import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SignupcompanyPage } from '../signupcompany/signupcompany';
import { LoginPage } from '../login/login';
import { LogincompanyPage } from '../logincompany/logincompany';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
	
openMenuSignup() {

	let actionSheet = this.actionSheetCtrl.create({
     title: 'Sign Up sebagai',
		cssClass: 'action-sheets-basic-page',
     buttons: [
       {
         text: 'Mahasiswa / Alumni',
         role: 'destructive',
         handler: () => {
          this.navCtrl.push(SignupPage, {}, {animate: true});
         }
       },
       {
         text: 'Perusahaan',
         handler: () => {
          this.navCtrl.push(SignupcompanyPage, {}, {animate: true});
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();

}
	
	openMenuLogin() {

	let actionSheet = this.actionSheetCtrl.create({
     title: 'Login sebagai',
     buttons: [
       {
         text: 'Mahasiswa / Alumni',
         role: 'destructive',
         handler: () => {
          this.navCtrl.push(LoginPage, {}, {animate: true});
         }
       },
       {
         text: 'Perusahaan',
         handler: () => {
          this.navCtrl.push(LogincompanyPage, {}, {animate: true});
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();

}

}