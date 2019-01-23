import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, App, Nav, Platform, ToastController } from "ionic-angular";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../home/home";
import { NotificationJobSeekerPage } from "../notification-job-seeker/notification-job-seeker";
import { ProfilalumniPage } from "../profilalumni/profilalumni";
import { Common } from "../../providers/auth-service/common";
import { HomecompanyPage } from "../homecompany/homecompany";
import { NotifCompanyPage } from "../notif-company/notif-company";
import { ProfilCompanyPage } from "../profil-company/profil-company";
import { WelcomePage } from "../welcome/welcome";
import { NotifikasiPerusahaanPage } from "../notifikasi-perusahaan/notifikasi-perusahaan";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Badge } from "@ionic-native/badge";
import { BackgroundMode } from "@ionic-native/background-mode";
/**
 * Generated class for the TabsCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-tabs-company",
  templateUrl: "tabs-company.html"
})
export class TabsCompanyPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  notip: boolean;
  public notifDetails: any;
  public dataSet: any;
  public dataSetawal: any = 0;
  public resposeData: any;
  public userDetails: any;
  tab1Root = HomecompanyPage;
  tab2Root = NotifikasiPerusahaanPage;
  tab3Root = NotifCompanyPage;
  tab4Root = ProfilCompanyPage;
  userPostData = { user_id: "", token: "" };
  notifPostData = { user_id: "", token: "", count_badge_notif: "" };

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public authService: AuthServiceProvider,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    private badge: Badge,
    private backgroundMode: BackgroundMode,
    private toastCtrl: ToastController
  ) {
    this.backgroundMode.enable();
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.notifPostData.user_id = this.userDetails.user_id;
    this.notifPostData.token = this.userDetails.token;

    this.startTimer();
  }

  backToWelcome() {
    const root = this.app.getRootNav();
  }

  logout() {
    this.Common.presentLoading();
    localStorage.clear();
    this.navCtrl.setRoot(WelcomePage);
    this.backToWelcome();
    window.localStorage.setItem("sudahlogoutCompany", "sudah logoutCompany");
    this.Common.closeLoading();
  }

  gotoAbout() {
    this.navCtrl.push(AboutPage);
  }

  resetBadge(){
    const dataNotif = localStorage.getItem("setDataNotif");
    this.notifDetails = dataNotif;
    console.log("dataNotif :" + this.notifDetails);

    this.dataSet = 0;
    this.dataSetawal = 0;
    this.badge.set(this.dataSet);
    this.notifPostData.count_badge_notif = this.dataSet;
    this.authService
      .postData(this.notifPostData, "emptynotifikasi")
      .then(result => {}, err => {});
  }

  getnotif() {
    this.authService.postData(this.userPostData, "tampilnotifikasi").then(
      result => {
        this.resposeData = result;
        if (this.resposeData) {
          this.dataSet = this.resposeData;
          this.badge.set(this.dataSet);
          console.log(this.dataSet);
          if (
            /*agar alarm/pemberitahuan hanya menyala jika nilai notifikasi bertambah(dibandingkan dengan nilai datasetawal)*/ this.dataSet > this.dataSetawal
          ) {
            this.localNotifications.schedule({
              text: "Ada pencari kerja yang melakukan konfirmasi",
              led: "FF0000",
              icon: "res://drawable-hdpi/icon.png",
              sound: this.setSound()
            });
          }
          //dataset awal baru disamakan nilainya disini dengan nilai dataset agar alarm tidak bunyi terus menerus
          this.dataSetawal = this.dataSet;
        } else {
        }
      },
      err => {
        this.Common.closeLoading();
        this.presentToast("Error Connection");
      }
    );
  }

  //method agar fungsi getNotif dapat berjalan/terpanggil terus selama interval 1 detik
  startTimer() {
    setInterval(() => {
      this.getnotif();
    }, 1000);
  }

  setSound() {
    if (this.platform.is("android")) {
      return "file://assets/sounds/mars unj - cut musik.mp3";
    } else {
      return "file://assets/sounds/mars unj - cut musik.mp3";
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
