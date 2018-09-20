import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';


/**
 * Generated class for the NotificationJobSeekerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-job-seeker',
  templateUrl: 'notification-job-seeker.html',
})
export class NotificationJobSeekerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationJobSeekerPage');
  }

  beriNomor(){
    const alert = this.alertCtrl.create({
      title: 'Terkirim!',
      subTitle: 'Nomor anda sudah memberikan nomor kontak yang dapat dihubungi perusahaan tersebut!',
      buttons: ['OK']
    });
    alert.present();
  }
}
