import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { HomePage } from "../home/home";

/**
 * Generated class for the AfterSignupMahasiswaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-after-signup-mahasiswa",
  templateUrl: "after-signup-mahasiswa.html"
})
export class AfterSignupMahasiswaPage {
  public userDetails: any;
  userPostData = { user_id: "", token: "" };
  afterSignupData = { namaLengkap: "", programstudi: "", tahunlulus: "" };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AfterSignupMahasiswaPage");
  }

  keHome() {
    if (
      this.afterSignupData.namaLengkap &&
      this.afterSignupData.programstudi &&
      this.afterSignupData.tahunlulus
    ) {
      this.navCtrl.push(TabsPage);

      const alert = this.alertCtrl.create({
        title: "Lengkapi Profil",
        subTitle:
          "Yuk lengkapi dahulu profil kamu di halaman profil biar makin banyak perusahaan yang melirik kamu",
        buttons: ["OK"]
      });

      alert.present();
    } else {
      this.presentToast("Harap lengkapi isi dan lengkapi data terlebih dahulu");
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
