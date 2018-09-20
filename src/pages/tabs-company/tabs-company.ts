import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NotificationJobSeekerPage } from '../notification-job-seeker/notification-job-seeker';
import { ProfilalumniPage } from '../profilalumni/profilalumni';
import { Common } from "../../providers/auth-service/common";
import {HomecompanyPage} from "../homecompany/homecompany";
import {NotifCompanyPage} from "../notif-company/notif-company";
import {ProfilCompanyPage} from '../profil-company/profil-company';
/**
 * Generated class for the TabsCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tabs-company',
  templateUrl: 'tabs-company.html',
})
export class TabsCompanyPage {
  tab1Root = HomecompanyPage;
  tab2Root = NotifCompanyPage;
  tab3Root = ProfilCompanyPage;

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
