import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { LinkyModule } from "angular-linky";
import { MomentModule } from "angular2-moment";
import { ProfilCompanyPkSidePage } from "../profil-company-pk-side/profil-company-pk-side";

/**
 * Generated class for the NotificationJobSeekerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notification-job-seeker",
  templateUrl: "notification-job-seeker.html"
})
export class NotificationJobSeekerPage {
  public dataSet: any;
  public resposeData: any;
  public resposeDataAll: any;
  public userDetails: any;
  userPostData = { user_id: "", token: "" };
  terimaPostData = { user_id: "", token: "",id_interest:"" };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.terimaPostData.user_id = this.userDetails.user_id;
    this.terimaPostData.token = this.userDetails.token;

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotificationJobSeekerPage");
  }

  ionViewWillEnter() {
    this.getPesanNotifikasi();
  }
  getPesanNotifikasi() {
    this.authService.postData(this.userPostData, "pesannotifikasiPK").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.profileUserData) {
          this.dataSet = this.resposeData.profileUserData;
          localStorage.setItem("namaCompany", JSON.stringify(this.dataSet));
          console.log(this.dataSet);
        } else {
        }
      },
      err => {}
    );
  }

  beriNomor() {
    const alert = this.alertCtrl.create({
      title: "Terkirim!",
      subTitle:
        "Nomor anda sudah memberikan nomor kontak yang dapat dihubungi perusahaan tersebut!",
      buttons: ["OK"]
    });
    alert.present();
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  toCompany(index:any){
    localStorage.setItem("idIdentifier",index);
    this.navCtrl.push(ProfilCompanyPkSidePage);
  }

  terimaPenawaran(index:any){
    this.terimaPostData.id_interest = this.dataSet[index].id_interest;
    console.log(this.terimaPostData.id_interest);
      this.authService.postData(this.terimaPostData, "terimaPenawaranSDM").then(
      result => {
        const alert = this.alertCtrl.create({
          title: "Terkonfirmasi",
          subTitle: "Anda menerima tawaran tersebut dan akan segera dihubungi oleh yang bersangkutan",
          buttons: ["OK"]
        });
        alert.present();
      },
      err => {}
    );
    this.navCtrl.push(NotificationJobSeekerPage);
    }

  tolakPenawaran(index:any){
    this.terimaPostData.id_interest = this.dataSet[index].id_interest;
    console.log(this.terimaPostData.id_interest);
      this.authService.postData(this.terimaPostData, "tolakPenawaranSDM").then(
      result => {
        const alert = this.alertCtrl.create({
          title: "Terkonfirmasi",
          subTitle: "Anda telah memberitahu ke yang bersangkutan bahwa anda tidak tertarik dengan penawaran tersebut",
          buttons: ["OK"]
        });
        alert.present();
      },
      err => {}
    );
    this.navCtrl.push(NotificationJobSeekerPage);
  }
}
