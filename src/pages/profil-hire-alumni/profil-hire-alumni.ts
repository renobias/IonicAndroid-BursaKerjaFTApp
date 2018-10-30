import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Common } from '../../providers/auth-service/common';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';

/**
 * Generated class for the ProfilHireAlumniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-hire-alumni',
  templateUrl: 'profil-hire-alumni.html',
})
export class ProfilHireAlumniPage {
  public resposeData: any;
  public dataSet: any;
  public dataSetNotif: any;
  public userDetails: any;
  public userDetailstest: any;
  public notifDetails:any;

  public resposeData2: any;
  public resposeDataNotif: any;
  public dataSet2: any;
  public tmpt_lahir: String;
  userPostData2 = { "user_id": "", "token": "","user_id_fk":"" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public shareService: ShareServiceProvider,
    private toastCtrl:ToastController
  ) {
    this.tmpt_lahir = "";
    const testdata = JSON.parse(localStorage.getItem("feedData"));
    const data = JSON.parse(localStorage.getItem("userData"));
    const dataIDFeedUser = localStorage.getItem("uidIdentifier");
    const dataNotif = localStorage.getItem("notifData");
    
    this.userDetailstest = testdata.feedData;
    this.userDetails = data.userData;
    this.notifDetails=dataNotif;

    shareService.userPostData.user_id = this.userDetails.user_id;
    shareService.userPostData.token = this.userDetails.token;

    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;

    shareService.userPostData.user_id_fk = this.userDetailstest[dataIDFeedUser].user_id_fk;
    this.userPostData2.user_id_fk = this.userDetailstest[dataIDFeedUser].user_id_fk;


    this.getProfileIntro();
    this.getProfileDetail();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilalumniPage");
  }

  getcountnotif(){

  }

  getProfileIntro() {
    this.authService.postData(this.shareService.userPostData, "profileUserPKHire").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.profileUserData) {
          this.dataSet = this.resposeData.profileUserData;
        } else {
        }
      },
      err => {}
    );
  }

  getProfileDetail() {
    this.authService.postData(this.userPostData2, "profileDetailPKHire").then(
      result => {
        this.resposeData2 = result;
        if (this.resposeData2.profileUserDetailData) {
          this.dataSet2 = this.resposeData2.profileUserDetailData;
        } else {
        }
      },
      err => {}
    );
  }

  interest(){
    this.shareService.increaseBadge();
    this.authService.postData(this.shareService.userPostData, "notifikasi").then(
      result => {
        this.resposeDataNotif = result;
        if (this.resposeDataNotif.notifData) {
          this.dataSetNotif = this.resposeDataNotif.notifData;
          console.log(this.dataSetNotif);
          const alert = this.alertCtrl.create({
            title: 'Welcome',
            subTitle: 'yess',
            buttons: ['OK']
          });
          alert.present();
        } else {
        }
      },
      err => {}
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
