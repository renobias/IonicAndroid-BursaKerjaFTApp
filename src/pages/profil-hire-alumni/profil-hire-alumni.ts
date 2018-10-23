import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Common } from '../../providers/auth-service/common';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
  public userDetails: any;
  public userDetailstest: any;

  public resposeData2: any;
  public dataSet2: any;
  public tmpt_lahir: String;
  userPostData2 = { "user_id": "", "token": "","user_id_fk":"" };
  userPostData = { "user_id": "", "token": "","user_id_fk":"" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider
  ) {
    this.tmpt_lahir = "";
    const testdata = JSON.parse(localStorage.getItem("feedData"));
    const data = JSON.parse(localStorage.getItem("userData"));
    const data2 = localStorage.getItem("uidIdentifier");
    
    this.userDetailstest = testdata.feedData;
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;
    this.userPostData.user_id_fk = this.userDetailstest[data2].user_id_fk;
    this.userPostData2.user_id_fk = this.userDetailstest[data2].user_id_fk;
    console.log(this.userDetailstest);
    this.getProfileIntro();
    this.getProfileDetail();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilalumniPage");
  }

  getProfileIntro() {
    this.authService.postData(this.userPostData, "profileUserPKHire").then(
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

}
