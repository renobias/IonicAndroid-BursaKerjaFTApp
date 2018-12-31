import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Common } from "../../providers/auth-service/common";
import { ProfilHireAlumniPage } from "../profil-hire-alumni/profil-hire-alumni";

/**
 * Generated class for the NotifCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notif-company",
  templateUrl: "notif-company.html"
})
export class NotifCompanyPage {
  public resposeDataKeahlianUtama: any;
  public resposeDataKeahlianKedua: any;
  public resposeDataKeahlianKetiga: any;
  public dataKeahlianUtama: any;
  public dataKeahlianKedua: any;
  public dataKeahlianKetiga: any;
  public img_profile:any;

  berhentipenawaranPostData = { user_id: "", token: "", user_id_fk: "" };
  ambilCompanyNameData = { user_id: "", token: "",nama_perusahaan:"" };
  userPostData = { user_id: "", token: "",nama_perusahaan:"" };
  public userDetails: any;
  public daftarpenawaranDetails: any;
  public responseData: any;
  public dataSet: any;
  public userDetailstest: any;

  public companyNameDataSet: any;
  public responsecompanyNameData: any;

  public responseDataStop: any;
  public dataSetStop: any;
  constructor(
    public Common: Common,
    public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.nama_perusahaan = this.userDetails.nama_perusahaan;

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotifCompanyPage");
  }

  ionViewWillEnter() {
    this.authService.postData(this.userPostData, "daftarPenawaran").then(
      result => {
        this.responseData = result;
        if (this.responseData.profileUserData) {
          localStorage.setItem(
            "daftarPenawaran",
            JSON.stringify(this.responseData)
          );
          this.dataSet = this.responseData.profileUserData;
        } else {
        }
      },
      err => {}
    );

  }

  berhentiPenawaran(index: any) {
    console.log(index);
    const dataPenawaran = JSON.parse(localStorage.getItem("daftarPenawaran"));
    console.log(dataPenawaran.profileUserData[index].id_penawaran);
    this.berhentipenawaranPostData.user_id = this.userDetails.user_id;
    this.berhentipenawaranPostData.token = this.userDetails.token;
    this.berhentipenawaranPostData.user_id_fk =
      dataPenawaran.profileUserData[index].user_id_fk;
    console.log(this.berhentipenawaranPostData.user_id_fk);

    this.authService
      .postData(this.berhentipenawaranPostData, "berhentiPenawaran")
      .then(
        result => {
          this.responseDataStop = result;
          console.log(this.responseDataStop);
          const alert = this.alertController.create({
            title: "Berhasil",
            subTitle:
              "Pencari kerja tersebut telah diberhentikan dari masa penawaran!",
            buttons: ["OK"]
          });
          alert.present();
          this.navCtrl.push(NotifCompanyPage);
        },
        err => {}
      );
  }
}
