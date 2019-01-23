import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ProfilalumniPage } from "../profilalumni/profilalumni";
import { Common } from "../../providers/auth-service/common";
/**
 * Generated class for the EditKeahlianKetigaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-keahlian-ketiga",
  templateUrl: "edit-keahlian-ketiga.html"
})
export class EditKeahlianKetigaPage {
  public userDetails:any;
  public resposeDataSimpan: any;
  public resposeDataBP: any;
  public resposeDataBK: any;

  public dataSetBP: any;
  public dataSetBK: any;
  pekerjaanPostData = { user_id: "", token: "", id_bidang_pekerjaan: "" };
  userPostData = { user_id: "", token: "",idBidangPekerjaan:"",idBidangKeahlian:"" };
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public alertController:AlertController,public common:Common) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.pekerjaanPostData.user_id = this.userDetails.user_id;
    this.pekerjaanPostData.token = this.userDetails.token;
    this.getBidangPekerjaan();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditKeahlianKetigaPage");
  }

  getBidangPekerjaan() {
    this.authService.postData(this.userPostData, "getBidangPekerjaan").then(
      result => {
        this.resposeDataBP = result;
        if (this.resposeDataBP.BidangPekerjaanData) {
          this.dataSetBP = this.resposeDataBP.BidangPekerjaanData;
          console.log(this.dataSetBP);
        } else {
        }
      },
      err => {
        console.log("koneksi gagal");
      }
    );
  }

  getBidangKeahlian(index) {
    console.log(this.dataSetBP[index].id_bidang_pekerjaan);
    this.pekerjaanPostData.id_bidang_pekerjaan = this.dataSetBP[index].id_bidang_pekerjaan;
    this.userPostData.idBidangPekerjaan = this.dataSetBP[index].id_bidang_pekerjaan;

    console.log(this.pekerjaanPostData.id_bidang_pekerjaan);

    this.authService.postData(this.pekerjaanPostData, "getBidangKeahlian").then(
      result => {
        this.resposeDataBK = result;
        if (this.resposeDataBK.BidangKeahlianData) {
          this.dataSetBK = this.resposeDataBK.BidangKeahlianData;
        } else {
        }
      },
      err => {
        console.log("koneksi gagal");
      }
    );
  }

  getIdBidangKeahlian(index){
    this.userPostData.idBidangKeahlian = this.dataSetBK[index].id_bidang_keahlian;
    console.log(this.userPostData.idBidangKeahlian);
  }

  simpan(){
    this.common.presentLoading();
    this.authService
    .postData(this.userPostData, "simpanBidangKeahlianTiga")
    .then(
      result => {
        this.resposeDataSimpan = result;
        console.log(this.resposeDataSimpan);
        this.common.closeLoading();
        const alert = this.alertController.create({
          title: "Berhasil!",
          subTitle:
            "Keahlian kedua anda berhasil diganti",
          buttons: ["OK"]
        });
        alert.present();
        this.navCtrl.push(ProfilalumniPage);
      },
      err => {
        this.common.closeLoading();
        console.log(this.resposeDataSimpan);
        const alert = this.alertController.create({
          title: "Error!",
          subTitle:
            "Kneksi Error",
          buttons: ["OK"]
        });
        alert.present();
      }
    );
}
}
