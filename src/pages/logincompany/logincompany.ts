import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{TabsCompanyPage} from '../tabs-company/tabs-company';
import{HomecompanyPage} from '../homecompany/homecompany';
/**
 * Generated class for the LogincompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logincompany',
  templateUrl: 'logincompany.html',
})
export class LogincompanyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogincompanyPage');
  }

  logincompany(){
    this.navCtrl.push(TabsCompanyPage);
  }

}
