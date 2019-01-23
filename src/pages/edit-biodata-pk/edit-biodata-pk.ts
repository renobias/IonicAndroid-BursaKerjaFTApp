import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Common } from '../../providers/auth-service/common';
import {ProfilalumniPage} from '../profilalumni/profilalumni';

/**
 * Generated class for the EditBiodataPkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-biodata-pk',
  templateUrl: 'edit-biodata-pk.html',
})
export class EditBiodataPkPage {
  userPostData={"user_id":"","token":"","nama_lengkap":"","tmpt_lahir":"","tgl_lahir":"","jenkel":""};
  userDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthServiceProvider,public Common: Common,public alertCtrl: AlertController,private toastCtrl: ToastController,public alertController:AlertController,public common:Common) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails=data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBiodataPkPage');
  }

  simpanBiodata(){
    if(this.userPostData.nama_lengkap&&this.userPostData.tmpt_lahir&&this.userPostData.tgl_lahir&&this.userPostData.jenkel){
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "editbiodataPK").then((result) =>{
        this.common.closeLoading();
          const alert = this.alertCtrl.create({
            title: 'Tersimpan',
            subTitle: 'Biodata berhasil diubah',
            buttons: ['OK']
          });
            alert.present();
            this.navCtrl.push(ProfilalumniPage);
        }, (err) => {
          this.common.closeLoading();
          //Connection failed message
          const alert = this.alertController.create({
            title: "Error!",
            subTitle:
              "Koneksi Error",
            buttons: ["OK"]
          });
          alert.present();
        });
      }else{
        this.common.closeLoading();
        this.presentToast("Harap isi dan lengkapi data terlebih dahulu ");
      }
    }

    presentToast(msg) {
      let toast = this.toastCtrl.create({message: msg,duration: 2000});
      toast.present();
    }
}