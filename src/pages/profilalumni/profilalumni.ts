import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Common } from '../../providers/auth-service/common';

/**
 * Generated class for the ProfilalumniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilalumni',
  templateUrl: 'profilalumni.html',
})
export class ProfilalumniPage {
  public resposeData:any;
  public dataSet:any;
  public userDetails:any;

  public resposeData2:any;
  public dataSet2:any;
  userPostData2={"user_id":"","token":""};
  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams,public Common: Common,public alertCtrl: AlertController,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;
    this.getProfileIntro();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilalumniPage');
  }

  getProfileIntro(){
    this.authService.postData(this.userPostData, 'profileUserPK')
    .then((result) => {
      this.resposeData = result;
      if (this.resposeData.feedData) {
        this.dataSet = this.resposeData.feedData;
      } else {}
    }, (err) => {
  
    });
  }

}
