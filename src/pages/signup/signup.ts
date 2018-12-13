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
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad Signup");
  }

  signup() {
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.name
    ) {
      this.alumni = "alumni";
      console.log(this.alumni);
      //Api connections
      this.authService.postData(this.userData, "signuppencarikerja").then(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            console.log(this.responseData);
            window.localStorage.setItem("sudahloginPK", "sudah loginPK");
            localStorage.setItem("userData", JSON.stringify(this.responseData));
            this.navCtrl.push(AfterSignupPencarikerjaPage);
            const alert = this.alertCtrl.create({
              title: "Welcome",
              subTitle: this.userData.name,
              buttons: ["OK"]
            });
            alert.present();
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
            this.presentToast(
              "isilah data dengan format yang benar terutama email"
            );
          }
        },
        err => {
          //Connection failed message
          let alert = this.alertCtrl.create({
            title: "Login Failed",
            subTitle:
              "Oh no! Your Registration failed.. may be check your connection",
            buttons: ["OK"]
          });
          alert.present();
        }
      );
    } else {
      this.presentToast(
        "Harap lengkapi setiap informasi atau kolom terlebih dahulu"
      );
      console.log("Give valid information.");
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
