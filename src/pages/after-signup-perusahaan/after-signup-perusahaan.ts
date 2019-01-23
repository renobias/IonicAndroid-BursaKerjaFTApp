import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TabsCompanyPage } from '../tabs-company/tabs-company';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Common } from '../../providers/auth-service/common';

/**
 * Generated class for the AfterSignupPerusahaanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-signup-perusahaan',
  templateUrl: 'after-signup-perusahaan.html',
})
export class AfterSignupPerusahaanPage {
userDetails:any;
responseData:any;
dataSet:any;
userPostData={"user_id":"","token":"","namaPerusahaan":"","bidangPerusahaan":"","alamatPerusahaan":"","kodeposPerusahaan":"","notelpPerusahaan":"","deskripsiPerusahaan":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,private toastCtrl:ToastController,public alertCtrl: AlertController,public common:Common) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails=data.userData;
    this.userPostData.user_id=this.userDetails.user_id;
    this.userPostData.token=this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfterSignupPerusahaanPage');
  }

  keHome(){
    if(this.userPostData.namaPerusahaan&&this.userPostData.bidangPerusahaan&&this.userPostData.alamatPerusahaan&&this.userPostData.kodeposPerusahaan&&this.userPostData.notelpPerusahaan&&this.userPostData.deskripsiPerusahaan){
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "aftersignupPerusahaan").then((result) =>{
        this.responseData = result;
        if(this.responseData.profileData){
          this.dataSet = this.responseData.profileData;
          console.log(this.dataSet);
          this.navCtrl.push(TabsCompanyPage);
          this.common.closeLoading();
          const alert = this.alertCtrl.create({
            title: 'Selamat datang di halaman beranda kamu',
            subTitle: 'Disini kamu dapat mencari kandidat dari fakultas Teknik yang sesuai dengan kriteria perusahaan kamu',
            buttons: ['OK']
          });
            alert.present();
        }
        else{
          this.common.closeLoading();
          this.presentToast("Format penulisan ada yang salah, periksa kembali format penulisan anda");
        }
        }, (err) => {
          this.common.closeLoading();
          //Connection failed message
          let alert = this.alertCtrl.create({
            title: 'Pendaftaran gagal',
            subTitle: 'Oh tidak! Pendaftaran kamu gagal',
            buttons: ['OK']
          });
          alert.present();
        });
    }else{
      this.common.closeLoading();
      this.presentToast("Harap lengkapi isi semua kolom dan lengkapi data terlebih dahulu 2");
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
