import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ProfilalumniPage } from "../profilalumni/profilalumni";
import { Common } from "../../providers/auth-service/common";

/**
 * Generated class for the EditKeahlianUtamaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-keahlian-utama",
  templateUrl: "edit-keahlian-utama.html"
})
export class EditKeahlianUtamaPage {
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
    console.log("ionViewDidLoad EditKeahlianUtamaPage");
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
        console.log("jaringan bermasalah");
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
        console.log("jaringan bermasalah");
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
    .postData(this.userPostData, "simpanBidangKeahlianSatu")
    .then(
      result => {
        this.resposeDataSimpan = result;
        console.log(this.resposeDataSimpan);
        this.common.closeLoading();
        const alert = this.alertController.create({
          title: "Berhasil!",
          subTitle:
            "Keahlian utama anda berhasil diganti",
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
            "Koneksi Error",
          buttons: ["OK"]
        });
        alert.present();
      }
    );
}
}
