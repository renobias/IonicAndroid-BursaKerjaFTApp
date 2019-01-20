import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { Common } from "../../providers/auth-service/common";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ShareServiceProvider } from "../../providers/share-service/share-service";
import { TabsPage } from "../tabs/tabs";
import { TabsCompanyPage } from "../tabs-company/tabs-company";

/**
 * Generated class for the ProfilHireAlumniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profil-hire-alumni",
  templateUrl: "profil-hire-alumni.html"
})
export class ProfilHireAlumniPage {
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

  public responseCekdaftarpenawaran:any;
  public dataSetcekPenawaran:any;

  userPostData = { user_id: "", token: "", user_id_fk: "" };
  userPostData2 = { user_id: "", token: "", user_id_fk: "" };
  notifPostData = {
    user_id: "",
    token: "",
    user_id_fk: "",
    count_badge_notif: "",
    nama_perusahaan:"",
    nama_PK:""
  };
  gettKeahlianPostData={user_id:""};
  nilaiNotifPostData = {user_id:""};

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

    console.log(dataIDFeedUser);
    console.log(this.userDetailstest[dataIDFeedUser]);
    console.log(this.userDetailstest[dataIDFeedUser].user_id_fk);

    this.userPostData.user_id_fk = this.userDetailstest[dataIDFeedUser].user_id_fk;
    this.userPostData2.user_id_fk = this.userDetailstest[
      dataIDFeedUser
    ].user_id_fk;

    this.notifPostData.user_id = this.userDetails.user_id;
    this.notifPostData.token = this.userDetails.token;
    this.notifPostData.nama_perusahaan = this.userDetails.nama_perusahaan;
    this.notifPostData.user_id_fk = this.userDetailstest[
      dataIDFeedUser
    ].user_id_fk;

    this.notifPostData.nama_PK = this.userDetailstest[
      dataIDFeedUser
    ].nama_lengkap;

    this.nilaiNotifPostData.user_id = this.userDetailstest[
      dataIDFeedUser
    ].user_id_fk;

    this.gettKeahlianPostData.user_id = this.userDetailstest[dataIDFeedUser].user_id_fk;

    this.getnilainotifPK();
    this.getProfileIntro();
    this.getProfileDetail();
    this.tidakbisaditawar();
    this.getKeahlian();
    this.cekDaftarPenawaran()
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilalumniPage");
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

  //fungsi ketika perusahaan menghire atau tertarik terhadap pencari kerja
  interest() {
    //mengambil jumlah data notifikasi dari local storage
    const dataNotif = localStorage.getItem("setDataNotif");
    this.notifDetails = dataNotif;
    console.log("dataNotif :" + this.notifDetails);

    this.jumlah = 1;

    //mengubah type data jumlah notifikasi dari json object ke number
    this.Dataint = this.notifDetails as number;

    //menambahkan jumlah notifikasi
    this.jumlah = this.jumlah + +this.Dataint;
    console.log("jumlah :" + this.jumlah);

    //memasukkan jumlah notifikasi yang sudah ditambahkan ke dalam objek notifPostData.count_badge_notif
    this.notifPostData.count_badge_notif = this.jumlah as string;
    console.log(
      "notifPostData.count_badge_notif :" + this.notifPostData.count_badge_notif
    );

  
      if(this.dataSetcekPenawaran){
        const alert = this.alertCtrl.create({
          title: "Tidak bisa melakukan penawaran",
          subTitle:
            "Anda sedang melakukan penawaran dengan "+this.dataSet[0].nama_lengkap+" dan tidak bisa melakukannya lagi",
          buttons: ["OK"]
        });
        alert.present();
        this.navCtrl.push(ProfilHireAlumniPage);
    }else{
      this.Common.presentLoading();
       //mengirim ke API untuk mengubah/mengupdate jumlah notifikasi di database
    this.authService.postData(this.notifPostData, "notifikasi").then(
      result => {
        this.resposeDataNotif = result;
        if (this.resposeDataNotif.notifData) {
          this.dataSetNotif = this.resposeDataNotif.notifData;
          console.log(this.dataSetNotif);
          this.Common.closeLoading();
          const alert = this.alertCtrl.create({
            title: "Berhasil",
            subTitle:
              this.dataSet[0].nama_lengkap+" telah masuk ke dalam daftar penawaran dan notifikasi akan segera terkirim ke "+this.dataSet[0].nama_lengkap,
            buttons: ["OK"]
          });
          alert.present();
        } else {
        }
      },
      err => {}
    );
    }
    this.disableButton = true;
    this.navCtrl.push(ProfilHireAlumniPage);
  }

  //fungsi untuk Mengambil data jumlah notifikasi dari database dan memasukkan ke localstorage
  getnilainotifPK() {
    this.authService
      .postData(this.nilaiNotifPostData, "ambilnilainotifikasi")
      .then(
        result => {
          this.resposenilainotif = result;
          if (this.resposenilainotif) {
            this.datasetnilaiNotif = this.resposenilainotif;
            localStorage.setItem("setDataNotif", this.datasetnilaiNotif);
            console.log(this.datasetnilaiNotif);
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

  tidakbisaditawar() {
    const dataIDFeedUser = localStorage.getItem("uidIdentifier");
  }

  cekDaftarPenawaran(){
    this.authService.postData(this.userPostData, "cekDaftarPenawaran").then(
      result => {
        this.responseCekdaftarpenawaran = result;
        if (this.responseCekdaftarpenawaran.profileUserData) {
          this.dataSetcekPenawaran = this.responseCekdaftarpenawaran.profileUserData;

          /**
          this.dataSet.forEach(element => {
            console.log(element.status_kerja);
            if(element.status_kerja=="bekerja" && element.status_pencarian_kerja=="sudah bekerja"){
              this.enableButton[element]=true;
            }else{
              this.enableButton[element]=false;
            }
          });
          */
        } else {
        }
      },
      err => {}
    );
  }
}
