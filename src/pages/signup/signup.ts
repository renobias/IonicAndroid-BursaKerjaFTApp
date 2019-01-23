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
import { Common } from "../../providers/auth-service/common";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  responseData: any;
  alumni: any;
  userData = {
    username: "",
    password: "",
    email: "",
    name: "",
    JenisDaftarPK: ""
  };
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController,
    public common:Common
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad Signup");
  }

  signup() {
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.name &&
      this.userData.JenisDaftarPK
    ) {
      this.alumni = "Alumni";
      console.log(this.alumni);
      this.common.presentLoading();
      //Api connections
      this.authService.postData(this.userData, "signuppencarikerja").then(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            console.log(this.responseData);
            window.localStorage.setItem("sudahloginPK", "sudah loginPK");
            localStorage.setItem("userData", JSON.stringify(this.responseData));
            if(this.userData.JenisDaftarPK=="Alumni"){
            this.navCtrl.push(AfterSignupPencarikerjaPage);
            this.common.closeLoading();
            const alert = this.alertCtrl.create({
              title: "Selamat datang",
              subTitle: this.userData.name,
              buttons: ["OK"]
            });
            alert.present();
          }else{
            this.navCtrl.push(AfterSignupMahasiswaPage);
            this.common.closeLoading()
            const alert = this.alertCtrl.create({
              title: "Selamat datang",
              subTitle: this.userData.name,
              buttons: ["OK"]
            });
            alert.present();
          }
            /**ini buat kalo nanti ada 2 tipe pendaftar : alumni dan mahasiswa */
            /*
      if(this.userData.JenisDaftarPK==this.alumni){
        alert.present();
      this.navCtrl.push(AfterSignupPencarikerjaPage);
      }else if(this.userData.JenisDaftarPK=="mahasiswa"){
        this.navCtrl.push(AfterSignupMahasiswaPage);
      }
      */
          } else {
            this.common.closeLoading();
            this.presentToast(
              "isilah data dengan format yang benar terutama email"
            );
          }
        },
        err => {
          this.common.closeLoading();
          //Connection failed message
          let alert = this.alertCtrl.create({
            title: "Gagal Masuk",
            subTitle:
              "Oh tidak! Pendaftaran kamu gagal.. mungkin koneksi kamu bermasalah",
            buttons: ["OK"]
          });
          alert.present();
        }
      );
    } else {
      this.common.closeLoading();
      this.presentToast(
        "Harap lengkapi setiap informasi atau kolom terlebih dahulu"
      );
      console.log("Berikan Informasi yang Sesuai.");
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
