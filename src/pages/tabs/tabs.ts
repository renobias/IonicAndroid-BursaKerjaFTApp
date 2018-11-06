import { Component } from '@angular/core';
import { NavController,NavParams,App } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NotificationJobSeekerPage } from '../notification-job-seeker/notification-job-seeker';
import { ProfilalumniPage } from '../profilalumni/profilalumni';
import { Common } from "../../providers/auth-service/common";
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public notifDetails: any;
  public dataSet: any;
  public resposeData: any;
  public userDetails: any;
  tab1Root = HomePage;
  tab2Root = NotificationJobSeekerPage;
  tab3Root = ProfilalumniPage;

  userPostData = { "user_id": "", "token": "" };
  notifPostData={"user_id": "", "token": "","count_badge_notif":"" };

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,public Common: Common,public shareService:ShareServiceProvider,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.notifPostData.user_id = this.userDetails.user_id;
    this.notifPostData.token =this.userDetails.token;
    this.getnotif();
  }

	backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
 }

  logout(){
    this.Common.presentLoading();
    localStorage.clear();
    setTimeout(() => this.backToWelcome(),500);
    this.Common.closeLoading();
}

gotoAbout(){
  this.navCtrl.push(AboutPage);
}

resetBadge(){
  const dataNotif = localStorage.getItem("setDataNotif");
  this.notifDetails=dataNotif;
  console.log("dataNotif :"+this.notifDetails);

  this.dataSet = 0;
  this.notifPostData.count_badge_notif =this.dataSet;
  this.authService.postData(this.notifPostData, "emptynotifikasi").then(
    result => {
  
    },
    err => {}
  );
}

getnotif() {
  this.authService.postData(this.userPostData, "tampilnotifikasi").then(
    result => {
      this.resposeData = result;
      if (this.resposeData) {
        this.dataSet = this.resposeData;
        console.log(this.dataSet);
      } else {
      }
    },
    err => {}
  );
}

}
