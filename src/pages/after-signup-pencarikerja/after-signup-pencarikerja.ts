import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { LoginPage } from "../login/login";
import { Common } from "../../providers/auth-service/common";

/**
 * Generated class for the AfterSignupPencarikerjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-after-signup-pencarikerja",
  templateUrl: "after-signup-pencarikerja.html"
})
export class AfterSignupPencarikerjaPage {
  public userDetails: any;
  responseData: any;
  public dataSet: any;

  public resposeDataPS: any;
  public dataSetPS: any;
  userPostData = {
    user_id: "",
    token: "",
    namaLengkap: "",
    prodi: "",
    tahunmasuk:"",
    tahunlulus: "",
    jenis_pendaftar:1
  };

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
    this.getProgramStudi();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AfterSignupPencarikerjaPage");
  }

  keHome() {
    if (
      this.userPostData.namaLengkap &&
      this.userPostData.prodi &&
      this.userPostData.tahunlulus
    ) {
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "aftersignupPK").then(
        result => {
          this.responseData = result;
          if (this.responseData.profileData) {
            this.dataSet = this.responseData.profileData;
            this.navCtrl.push(TabsPage);
            this.common.closeLoading();
            console.log(this.dataSet);
            const alert = this.alertCtrl.create({
              title: "Selamat datang di halaman beranda kamu",
              subTitle:
                "Yuk lengkapi dahulu profil kamu di halaman profil biar makin banyak perusahaan yang melirik kamu",
              buttons: ["OK"]
            });
            alert.present();
          } else {
            this.common.closeLoading();
            this.presentToast(
              "Harap lengkapi isi dan lengkapi data terlebih dahulu"
            );
          }
        },
        err => {
          this.common.closeLoading();
          //Connection failed message
          const alert = this.alertCtrl.create({
            title: "Koneksi bermasalah",
            subTitle: "Jaringan internet atau server bermasalah",
            buttons: ["OK"]
          });
          alert.present();
        }
      );
    } else {
      this.common.closeLoading();
      this.presentToast(
        "Harap lengkapi isi dan lengkapi data terlebih dahulu 2"
      );
    }
  }

  getProgramStudi() {
    this.authService.postData(this.userPostData, "getProgramStudi").then(
      result => {
        this.resposeDataPS = result;
        if (this.resposeDataPS.ProgramStudiData) {
          this.dataSetPS = this.resposeDataPS.ProgramStudiData;
          console.log(this.dataSetPS);
        } else {
        }
      },
      err => {
        console.log("asuuu");
      }
    );
  }

  ambilIDProdi(index:any){
    console.log(this.dataSetPS[index].id_prodi);
    this.userPostData.prodi = this.dataSetPS[index].id_prodi;
    console.log(this.userPostData.prodi);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
