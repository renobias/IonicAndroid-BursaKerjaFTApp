import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "../login/login";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { AfterSignupPencarikerjaPage } from "../after-signup-pencarikerja/after-signup-pencarikerja";
import { AfterSignupMahasiswaPage } from "../after-signup-mahasiswa/after-signup-mahasiswa";
import { AfterSignupPerusahaanPage } from "../after-signup-perusahaan/after-signup-perusahaan";
/**
 * Generated class for the SignupcompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signupcompany",
  templateUrl: "signupcompany.html"
})
export class SignupcompanyPage {
  responseData: any;
  userData = { username: "", password: "", email: "", name: "" };
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupCompanyPage");
  }

  signupperusahaan() {
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.name
    ) {
      //Api connections
      this.authService.postData(this.userData, "signupperusahaan").then(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            console.log(this.responseData);
            window.localStorage.setItem(
              "sudahloginCompany",
              "sudah login company"
            );
            localStorage.setItem("userData", JSON.stringify(this.responseData));
            this.navCtrl.push(AfterSignupPerusahaanPage);
            const alert = this.alertCtrl.create({
              title: "Welcome",
              subTitle: this.userData.name,
              buttons: ["OK"]
            });
            alert.present();
          } else {
            this.presentToast(
              "Format penulisan ada yang salah, mungkin anda salah memasukkan format email"
            );
          }
        },
        err => {
          //Connection failed message
          let alert = this.alertCtrl.create({
            title: "Pendaftaran Gagagl",
            subTitle:
              "Oh tidak! pendaftaran kamu gagal.. mungkin koneksi kamu bermasalah",
            buttons: ["OK"]
          });
          alert.present();
        }
      );
    } else {
      this.presentToast("lengkapi semua kolom terlebih dahulu");
      console.log("Berikan Informsai yang Sesuai.");
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  tessignup() {
    this.navCtrl.push(AfterSignupPencarikerjaPage);
  }
}
