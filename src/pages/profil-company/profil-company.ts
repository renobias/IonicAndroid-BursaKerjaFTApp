import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Common } from "../../providers/auth-service/common";

/**
 * Generated class for the ProfilCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profil-company",
  templateUrl: "profil-company.html"
})
export class ProfilCompanyPage {
  public resposeData: any;
  public dataSet: any;
  public userDetails: any;
  public img_profile_company:any;

  userPostData = { user_id: "" };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;

    this.ionViewWillEnter();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilCompanyPage");
  }

  ionViewWillEnter() {
    this.getProfilePerusahaan();
  }

  getProfilePerusahaan() {
    this.authService.postData(this.userPostData, "profilePerusahaan").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet[0].logo);
          if(this.dataSet[0].logo){
            this.img_profile_company = "https://bursakerjaft.000webhostapp.com/img/foto_perusahaan/"+this.dataSet[0].logo;
          }
          else{
            this.img_profile_company ="assets/imgs/office.jpg";
          }
          console.log(this.img_profile_company);
        } else {
        }
      },
      err => {}
    );
  }
}
