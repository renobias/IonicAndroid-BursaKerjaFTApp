import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ProfilalumniPage } from "../profilalumni/profilalumni";
import { Common } from "../../providers/auth-service/common";

/**
 * Generated class for the EditKontakPkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-kontak-pk",
  templateUrl: "edit-kontak-pk.html"
})
export class EditKontakPkPage {
  userPostData = {
    user_id: "",
    token: "",
    alamat: "",
    kodepos: "",
    no_telp: "",
    email: ""
  };
  userDetails: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public common:Common
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditKontakPkPage");
  }

  simpanKontak() {
    if (
      this.userPostData.alamat &&
      this.userPostData.kodepos &&
      this.userPostData.no_telp &&
      this.userPostData.email
    ) {
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "editkontakPK").then(
        result => {
          this.common.closeLoading();
          const alert = this.alertCtrl.create({
            title: "Tersimpan",
            subTitle: "Kontak berhasil diubah",
            buttons: ["OK"]
          });
          alert.present();
          this.navCtrl.push(ProfilalumniPage);
        },
        err => {
          this.common.closeLoading();
          //Connection failed message
          let alert = this.alertCtrl.create({
            title: "update Failed",
            subTitle: "Oh no! Your update is failed",
            buttons: ["OK"]
          });
          alert.present();
        }
      );
    } else {
      this.common.closeLoading();
      this.presentToast(
        "Harap lengkapi isi dan lengkapi data terlebih dahulu "
      );
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
