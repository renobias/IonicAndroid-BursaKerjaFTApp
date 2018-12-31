import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProfilalumniPage } from '../profilalumni/profilalumni';

/**
 * Generated class for the UbahRiwayatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubah-riwayat',
  templateUrl: 'ubah-riwayat.html',
})
export class UbahRiwayatPage {
  dataRiwayat = {user_id:"",token:"",judul_skripsi:""};
  public dataDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider,private toastCtrl: ToastController,public alertCtrl: AlertController) {
  const data = JSON.parse(localStorage.getItem('userData'));
    this.dataDetails = data.userData;

    this.dataRiwayat.user_id = this.dataDetails.user_id;
    this.dataRiwayat.token = this.dataDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbahRiwayatPage');
  }
  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

simpanJudulSkripsi(){
  console.log(this.dataRiwayat.user_id);
  console.log(this.dataRiwayat.token);
  console.log(this.dataRiwayat.judul_skripsi);
  if(this.dataRiwayat.user_id && this.dataRiwayat.token && this.dataRiwayat.judul_skripsi){
    this.authService.postData(this.dataRiwayat, "simpanRiwayat").then(
      result => {
        const alert = this.alertCtrl.create({
          title: "Tersimpan",
          subTitle: "Judul skripsi berhasil disimpan",
          buttons: ["OK"]
        });
        alert.present();
        this.navCtrl.push(ProfilalumniPage);
      },
      err => {
        //Connection failed message
        let alert = this.alertCtrl.create({
          title: "gagal menyimpan",
          subTitle: "Oh tidak! gagal menyimpan",
          buttons: ["OK"]
        });
        alert.present();
      }
    );
  }else{
    this.presentToast(
      "isilah kolom judul skripsi"
    );
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
