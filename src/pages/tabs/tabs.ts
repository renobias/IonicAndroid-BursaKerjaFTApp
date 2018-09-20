import { Component } from '@angular/core';
import { NavController,NavParams,App } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NotificationJobSeekerPage } from '../notification-job-seeker/notification-job-seeker';
import { ProfilalumniPage } from '../profilalumni/profilalumni';
import { Common } from "../../providers/auth-service/common";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public countbadge = 2;
  tab1Root = HomePage;
  tab2Root = NotificationJobSeekerPage;
  tab3Root = ProfilalumniPage;

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,public Common: Common) {

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
}
