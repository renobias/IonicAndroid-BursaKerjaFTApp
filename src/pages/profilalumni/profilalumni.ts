import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Common } from "../../providers/auth-service/common";
import { EditStatusPkPage } from "../edit-status-pk/edit-status-pk";
import { EditBiodataPkPage } from "../edit-biodata-pk/edit-biodata-pk";
import { EditKontakPkPage } from "../edit-kontak-pk/edit-kontak-pk";
import { EditIntroPkPage } from "../edit-intro-pk/edit-intro-pk";
import { EditRiwpenPkPage } from "../edit-riwpen-pk/edit-riwpen-pk";
import { EditRiwpelPkPage } from "../edit-riwpel-pk/edit-riwpel-pk";
import { EditPortofolioPkPage } from "../edit-portofolio-pk/edit-portofolio-pk";
import { EditKeahlianUtamaPage } from "../edit-keahlian-utama/edit-keahlian-utama";
import { EditKeahlianKeduaPage } from "../edit-keahlian-kedua/edit-keahlian-kedua";
import { EditKeahlianKetigaPage } from "../edit-keahlian-ketiga/edit-keahlian-ketiga";
import { UbahRiwayatPage } from "../ubah-riwayat/ubah-riwayat";

/**
 * Generated class for the ProfilalumniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profilalumni",
  templateUrl: "profilalumni.html"
})
export class ProfilalumniPage {
  public resposeData: any;
  public resposeDataKeahlianUtama: any;
  public resposeDataKeahlianKedua: any;
  public resposeDataKeahlianKetiga: any;
  public dataSet: any;
  public dataKeahlianUtama: any;
  public dataKeahlianKedua: any;
  public dataKeahlianKetiga: any;
  public userDetails: any;

  public resposeData2: any;
  public dataSet2: any;
  public tmpt_lahir: String;
  public img_profile:any;
  public img_profile_default:any;

  userPostData2 = { user_id: "", token: "" };
  userPostData = { user_id: "", token: "" };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider
  ) {

    this.tmpt_lahir = "";

    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    

    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;
    this.ionViewWillEnter();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilalumniPage");
  }

  ionViewWillEnter() {
    this.getProfileIntro();
    this.getProfileDetail();
  }

  getProfileIntro() {
    this.authService.postData(this.userPostData, "profileUserPK").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.profileUserData) {
          this.dataSet = this.resposeData.profileUserData;
          console.log(this.dataSet[0].foto_profil);
          if(this.dataSet[0].foto_profil){
            this.img_profile = "https://bursakerjaft.000webhostapp.com/img/foto_pencari_kerja/"+this.dataSet[0].foto_profil;
          }
          else{
            this.img_profile ="assets/imgs/Foto Profil Dark.jpg";
          }
            console.log(this.img_profile);
        } else {
        }
      },
      err => {}
    );
  }

  getProfileDetail() {
    this.authService.postData(this.userPostData2, "profileDetailPK").then(
      result => {
        this.resposeData2 = result;
        if (this.resposeData2.profileUserDetailData) {
          this.dataSet2 = this.resposeData2.profileUserDetailData;
        } else {
        }
      },
      err => {}
    );

    this.authService.postData(this.userPostData2, "getKeahlianUtama").then(
      result => {
        this.resposeDataKeahlianUtama = result;
        if (this.resposeDataKeahlianUtama.keahlianUtamaData) {
          this.dataKeahlianUtama = this.resposeDataKeahlianUtama.keahlianUtamaData;
        } else {
        }
      },
      err => {}
    );

    this.authService.postData(this.userPostData2, "getKeahlianKedua").then(
      result => {
        this.resposeDataKeahlianKedua = result;
        if (this.resposeDataKeahlianKedua.keahlianKeduaData) {
          this.dataKeahlianKedua = this.resposeDataKeahlianKedua.keahlianKeduaData;
        } else {
        }
      },
      err => {}
    );

    this.authService.postData(this.userPostData2, "getKeahlianKetiga").then(
      result => {
        this.resposeDataKeahlianKetiga = result;
        if (this.resposeDataKeahlianKetiga.keahlianKetigaData) {
          this.dataKeahlianKetiga = this.resposeDataKeahlianKetiga.keahlianKetigaData;
        } else {
        }
      },
      err => {}
    );
  }

  editstatus() {
    this.navCtrl.push(EditStatusPkPage);
  }

  editintro() {
    this.navCtrl.push(EditIntroPkPage);
  }
  editbiodata() {
    this.navCtrl.push(EditBiodataPkPage);
  }
  editkontak() {
    this.navCtrl.push(EditKontakPkPage);
  }
  editriwpen() {
    this.navCtrl.push(EditRiwpenPkPage);
  }
  editriwpel() {
    this.navCtrl.push(EditRiwpelPkPage);
  }
  editportofolio() {
    this.navCtrl.push(EditPortofolioPkPage);
  }
  editkeahlianutama(){
    this.navCtrl.push(EditKeahlianUtamaPage);
  }
  editkeahliankedua(){
    this.navCtrl.push(EditKeahlianKeduaPage);
  }
  editkeahlianketiga(){
    this.navCtrl.push(EditKeahlianKetigaPage);
  }
  ubahriwayat(){
    this.navCtrl.push(UbahRiwayatPage);
  }
}
