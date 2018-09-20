import { Component,ViewChild } from '@angular/core';
import { NavController,App,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LinkyModule } from 'angular-linky';
import { Common } from "../../providers/auth-service/common";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("updatebox") updatebox;
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;

  
	
  userPostData = {"user_id":"","token":""};
	
  constructor( public navCtrl: NavController,public authService:AuthServiceProvider, public app:App,public Common: Common,public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  
    this.getFeed();
  }


	backToWelcome(){
   const root = this.app.getRootNav();
   root.popToRoot();
}
	
	logout(){
    this.Common.presentLoading();
     localStorage.clear();
     setTimeout(() => this.backToWelcome(), 1000);
     this.Common.closeLoading();
}

getFeed(){
  this.Common.presentLoading();
  this.authService.postData(this.userPostData, 'feedLoker')
  .then((result) => {
    this.resposeData = result;
    if (this.resposeData.feedData) {
      this.dataSet = this.resposeData.feedData;
      this.Common.closeLoading();
    } else {}
  }, (err) => {

  });
}

doInfinite(e): Promise<any> {
  console.log("Begin async operation");
  return new Promise(resolve => {
    setTimeout(() => {
      this.authService.postData(this.userPostData, "feed").then(
        result => {
          this.resposeData = result;
          if (this.resposeData.feedData.length) {
            const newData = this.resposeData.feedData;
            

            for (let i = 0; i < newData.length; i++) {
              this.dataSet.push(newData[i]);
            }
          } else {
            this.noRecords = true;
            console.log("No user updates");
          }
        },
        err => {
          //Connection failed message
        }
      );
      resolve();
    }, 500);
  });
}

convertTime(created) {
  let date = new Date(created * 1000);
  return date;
}




}