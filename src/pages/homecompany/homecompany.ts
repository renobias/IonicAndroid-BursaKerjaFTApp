import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { MenuCompanyPage} from '../menu-company/menu-company';
/**
 * Generated class for the HomecompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homecompany',
  templateUrl: 'homecompany.html',
})
export class HomecompanyPage {

  menuCtrl: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomecompanyPage');
  }

  

}
