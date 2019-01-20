import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  Nav,
  App
} from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { HomePage } from "../home/home";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Common } from "../../providers/auth-service/common";
import { TabsCompanyPage } from "../tabs-company/tabs-company";
import { SignupPage } from "../signup/signup";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  responseData: any;
  userData = { username: "", password: "" };
  constructor(
    public app: App,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController,
    public Common: Common
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  goToRootTabs() {
    const root = this.app.getRootNav();
    root.pushToRoot();
  }

  login() {
    if (this.userData.username && this.userData.password) {
      this.Common.presentLoading();
      //Api connections
      this.authService.postData(this.userData, "login").then(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            if (this.responseData.userData.level == "pencari_kerja") {
              console.log(this.responseData);
              localStorage.setItem("userData",JSON.stringify(this.responseData));
              this.navCtrl.setRoot(TabsPage);
              this.app.getRootNav();
              this.Common.closeLoading();
              window.localStorage.setItem("sudahloginPK", "sudah loginPK");
            } else if (this.responseData.userData.level == "perusahaan") {
              window.localStorage.setItem(
                "sudahloginCompany",
                "sudah login company"
              );
              console.log(this.responseData);
              localStorage.setItem("userData",JSON.stringify(this.responseData));
              this.navCtrl.setRoot(TabsCompanyPage);
              this.app.getRootNav();
              this.Common.closeLoading();

            }
          } else {
            console.log(this.responseData);
            this.Common.closeLoading();
            this.presentToast("username dan password tidak cocok");
          }
        },
        err => {
          //Connection failed message
          this.Common.closeLoading();
          let alert = this.alertCtrl.create({
            title: "Login Failed",
            subTitle: "Oh tidak! gagal.. mungkin koneksi anda bermasalah",
            buttons: ["OK"]
          });
          alert.present();
        }
      );
    } else {
      this.Common.closeLoading();
      console.log("Berikan Informasi yang valid.");
      this.presentToast("Silahkan isi username dan password terlebih dahulu");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
