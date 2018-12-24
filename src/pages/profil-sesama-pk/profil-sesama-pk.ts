import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController,
  ToastController } from 'ionic-angular';
import { Common } from "../../providers/auth-service/common";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ShareServiceProvider } from "../../providers/share-service/share-service";
/**
 * Generated class for the ProfilSesamaPkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-sesama-pk',
  templateUrl: 'profil-sesama-pk.html',
})
export class ProfilSesamaPkPage {

  disableButton = true;
  enableButton = false;

  public resposeDataKeahlianUtama: any;
  public resposeDataKeahlianKedua: any;
  public resposeDataKeahlianKetiga: any;
  public dataKeahlianUtama: any;
  public dataKeahlianKedua: any;
  public dataKeahlianKetiga: any;

  public jumlah: any;
  public Dataint: any;
  public stringData: any;
  public objjumlah: any;

  public datasetNotifdetails: any;
  public resposeData: any;
  public dataSet: any;
  public dataSetNotif: any;
  public userDetails: any;
  public userDetailstest: any;
  public notifDetails: any;

  public resposeData2: any;
  public resposeDataNotif: any;
  public dataSet2: any;
  public tmpt_lahir: String;

  public resposenilainotif: any;
  public datasetnilaiNotif: any;

  public img_profile:any;

  userPostData = { user_id: "", token: "", user_id_fk: "" };
  userPostData2 = { user_id: "", token: "", user_id_fk: "" };
  gettKeahlianPostData={user_id:""};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public shareService: ShareServiceProvider,
    private toastCtrl: ToastController
  ) {
    const testdata = JSON.parse(localStorage.getItem("feedData"));
    const data = JSON.parse(localStorage.getItem("userData"));
    const dataIDFeedUser = localStorage.getItem("uidIdentifier");
    const dataNotif = localStorage.getItem("setDataNotif");

    this.userDetailstest = testdata;
    this.userDetails = data.userData;
    this.notifDetails = dataNotif;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;

    this.userPostData.user_id_fk = this.userDetailstest[
      dataIDFeedUser
    ].user_id_fk;
    this.userPostData2.user_id_fk = this.userDetailstest[
      dataIDFeedUser
    ].user_id_fk;
    this.gettKeahlianPostData.user_id = this.userDetailstest[dataIDFeedUser].user_id_fk;


    this.getProfileIntro();
    this.getProfileDetail();
    this.getKeahlian();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilSesamaPKPage");
  }

  getcountnotif() {}

  getProfileIntro() {
    this.authService.postData(this.userPostData, "profileUserPKHire").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.profileUserData) {
          this.dataSet = this.resposeData.profileUserData;
          if(this.dataSet[0].foto_profil){
            this.img_profile = this.dataSet[0].foto_profil;
          }
          else{
            this.img_profile ="assets/imgs/Foto Profil Dark.jpg";
          }
        } else {
        }
      },
      err => {}
    );
  }

  getProfileDetail() {
    this.authService.postData(this.userPostData2, "profileDetailPKHire").then(
      result => {
        this.resposeData2 = result;
        if (this.resposeData2.profileUserDetailData) {
          this.dataSet2 = this.resposeData2.profileUserDetailData;
          console.log(this.dataSet2);
          if (
            this.dataSet2.status_pencarian_kerja == "tidak mencari pekerjaan"
          ) {
            this.disableButton = true;
          }
        } else {
        }
      },
      err => {}
    );
  }

  getKeahlian(){
    this.authService.postData(this.gettKeahlianPostData, "getKeahlianUtama").then(
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

    this.authService.postData(this.gettKeahlianPostData, "getKeahlianKedua").then(
      result => {
        this.resposeDataKeahlianKedua = result;
        if (this.resposeDataKeahlianKedua.keahlianKeduaData) {
          this.dataKeahlianKedua = this.resposeDataKeahlianKedua.keahlianKeduaData;
        } else {
        }
      },
      err => {}
    );

    this.authService.postData(this.gettKeahlianPostData, "getKeahlianKetiga").then(
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
