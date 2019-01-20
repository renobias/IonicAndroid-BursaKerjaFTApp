import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the NotifikasiPerusahaanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifikasi-perusahaan',
  templateUrl: 'notifikasi-perusahaan.html',
})
export class NotifikasiPerusahaanPage {
  userPostData = { user_id: "", token: "" };
  public userDetails: any;
   public dataSet: any;
  public resposeData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public authService: AuthServiceProvider) {
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifikasiPerusahaanPage');
  }

  ionViewWillEnter() {
    this.getNotifikasi();
  }

  getNotifikasi(){
    this.authService.postData(this.userPostData, "notifikasiPerusahaan").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.notifikasiPerusahaanData) {
          this.dataSet = this.resposeData.notifikasiPerusahaanData;
          console.log(this.dataSet);
        } else {
        }
      },
      err => {}
    );
  }

}
