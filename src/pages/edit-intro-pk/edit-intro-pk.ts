import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { variable } from '@angular/compiler/src/output/output_ast';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProfilalumniPage } from '../profilalumni/profilalumni';

/**
 * Generated class for the EditIntroPkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-intro-pk',
  templateUrl: 'edit-intro-pk.html',
})
export class EditIntroPkPage {
  userPostData={"user_id":"","token":"","ttg_saya":""};
  userDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public alertCtrl:AlertController,private toastCtrl:ToastController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id=this.userDetails.user_id;
    this.userPostData.token=this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditIntroPkPage');
  }

  simpanIntro(){
    if(this.userPostData.ttg_saya){
      this.authService.postData(this.userPostData, "editintroPK").then((result) =>{
        const alert = this.alertCtrl.create({
          title: 'Tersimpan',
          subTitle: 'berhasil diubah',
          buttons: ['OK']
        });
          alert.present();
          this.navCtrl.push(ProfilalumniPage);
      }, (err) => {
        //Connection failed message
      });
    }else{
      this.presentToast("Harap lengkapi isi dan lengkapi data terlebih dahulu ");
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
