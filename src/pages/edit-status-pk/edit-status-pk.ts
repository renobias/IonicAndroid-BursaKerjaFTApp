import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ProfilalumniPage } from "../profilalumni/profilalumni";
import { Common } from "../../providers/auth-service/common";

/**
 * Generated class for the EditStatusPkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-status-pk",
  templateUrl: "edit-status-pk.html"
})
export class EditStatusPkPage {
  public responseData: any;
  public dataSet: any;
  public userDetails: any;
  userPostData = { user_id: "", token: "", status: "", statusPK: "" };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public common:Common
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditStatusPkPage");
  }

  simpandata() {
    if (this.userPostData.status && this.userPostData.statusPK) {
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "editstatusPK").then(
        result => {
          this.common.closeLoading();
          const alert = this.alertCtrl.create({
            title: "Tersimpan",
            subTitle: "status dan status kerja berhasil diubah",
            buttons: ["OK"]
          });
          alert.present();
          this.navCtrl.push(ProfilalumniPage);
        },
        err => {
          this.common.closeLoading();
          //Connection failed message
          const alert = this.alertCtrl.create({
            title: "Error!",
            subTitle:
              "Jaringan Bermasalah",
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
