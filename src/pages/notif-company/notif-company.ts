import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Common } from "../../providers/auth-service/common";

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

  berhentipenawaranPostData = { user_id: "", token: "", id_penawaran: "" };
  userPostData = { user_id: "", token: "" };
  public userDetails: any;
  public daftarpenawaranDetails: any;
  public responseData: any;
  public dataSet: any;
  public userDetailstest: any;

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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotifCompanyPage");
  }

  ionViewWillEnter() {
    this.authService.postData(this.userPostData, "daftarPenawaran").then(
      result => {
        this.responseData = result;
        if (this.responseData.profileUserData) {
          console.log(this.responseData);
          localStorage.setItem(
            "daftarPenawaran",
            JSON.stringify(this.responseData)
          );
          this.dataSet = this.responseData.profileUserData;
          console.log(this.dataSet);
        } else {
        }
      },
      err => {}
    );

    this.authService.postData(this.userPostData, "getKeahlianUtamaAll").then(
      result => {
        this.resposeDataKeahlianUtama = result;
        if (this.resposeDataKeahlianUtama.keahlianUtamaData) {
          this.dataKeahlianUtama = this.resposeDataKeahlianUtama.keahlianUtamaData;
          console.log(this.dataKeahlianUtama);
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
    this.berhentipenawaranPostData.id_penawaran =
      dataPenawaran.profileUserData[index].id_penawaran;
    console.log(this.berhentipenawaranPostData.id_penawaran);

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
