import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Common } from '../../providers/auth-service/common';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { TabsPage } from '../tabs/tabs';
import { TabsCompanyPage } from '../tabs-company/tabs-company';

/**
 * Generated class for the ProfilHireAlumniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-hire-alumni',
  templateUrl: 'profil-hire-alumni.html',
})
export class ProfilHireAlumniPage {
  disableButton=true;
  enableButton=false;
  public jumlah:any;
  public Dataint:any;
  public stringData:any;
  public objjumlah:any;

  public datasetNotifdetails: any;
  public resposeData: any;
  public dataSet: any;
  public dataSetNotif: any;
  public userDetails: any;
  public userDetailstest: any;
  public notifDetails:any;

  public resposeData2: any;
  public resposeDataNotif: any;
  public dataSet2: any;
  public tmpt_lahir: String;

  public resposenilainotif:any;
  public datasetnilaiNotif:any;

  userPostData = { "user_id": "", "token": "","user_id_fk":""};
  userPostData2 = { "user_id": "", "token": "","user_id_fk":"" };
  notifPostData={"user_id": "", "token": "","user_id_fk":"","count_badge_notif":"" };

  nilaiNotifPostData = { "user_id": ""};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Common: Common,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public shareService: ShareServiceProvider,
    private toastCtrl:ToastController
  ) {

    const testdata = JSON.parse(localStorage.getItem("feedData"));
    const data = JSON.parse(localStorage.getItem("userData"));
    const dataIDFeedUser = localStorage.getItem("uidIdentifier");
    const dataNotif = localStorage.getItem("setDataNotif");
    
    this.userDetailstest = testdata.feedData;
    this.userDetails = data.userData;
    this.notifDetails=dataNotif;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;

    this.userPostData.user_id_fk = this.userDetailstest[dataIDFeedUser].user_id_fk;
    this.userPostData2.user_id_fk = this.userDetailstest[dataIDFeedUser].user_id_fk;

    this.notifPostData.user_id= this.userDetails.user_id;
    this.notifPostData.token=this.userDetails.token;
    this.notifPostData.user_id_fk=this.userDetailstest[dataIDFeedUser].user_id_fk;

    this.nilaiNotifPostData.user_id=this.userDetailstest[dataIDFeedUser].user_id_fk;

    this.getnilainotifPK();
    this.getProfileIntro();
    this.getProfileDetail();
    this.tidakbisaditawar();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilalumniPage");
  }

  getcountnotif(){

  }

  getProfileIntro() {
    this.authService.postData(this.userPostData, "profileUserPKHire").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.profileUserData) {
          this.dataSet = this.resposeData.profileUserData;
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
          if(this.dataSet2.status_pencarian_kerja=="tidak mencari pekerjaan"){
            this.disableButton=true;
          }
        } else {
        }
      },
      err => {}
    );
  }


  //fungsi ketika perusahaan menghire atau tertarik terhadap pencari kerja
  interest(){
    //mengambil jumlah data notifikasi dari local storage
    const dataNotif = localStorage.getItem("setDataNotif");
    this.notifDetails=dataNotif;
    console.log("dataNotif :"+this.notifDetails);

    this.jumlah=1;

    //mengubah type data jumlah notifikasi dari json object ke number
    this.Dataint=(this.notifDetails as number);

    //menambahkan jumlah notifikasi 
    this.jumlah = this.jumlah + +this.Dataint;
    console.log("jumlah :"+this.jumlah);

    //memasukkan jumlah notifikasi yang sudah ditambahkan ke dalam objek notifPostData.count_badge_notif
    this.notifPostData.count_badge_notif = (this.jumlah as string);
    console.log("notifPostData.count_badge_notif :"+this.notifPostData.count_badge_notif);
    
    //mengirim ke API untuk mengubah/mengupdate jumlah notifikasi di database
    this.authService.postData(this.notifPostData, "notifikasi").then(
      result => {
        this.resposeDataNotif = result;
        if (this.resposeDataNotif.notifData) {
          this.dataSetNotif = this.resposeDataNotif.notifData;
          console.log(this.dataSetNotif);
          const alert = this.alertCtrl.create({
            title: 'Berhasil',
            subTitle: 'Pencari kerja tersebut telah masuk ke dalam daftar penawaran dan notifikasi akan terkirim ke pencari kerja tersebut',
            buttons: ['OK']
          });
          alert.present();
        } else {
        }
      },
      err => {}
    );
    this.disableButton=true;
  }

  //fungsi untuk Mengambil data jumlah notifikasi dari database dan memasukkan ke localstorage
  getnilainotifPK() {
    this.authService.postData(this.nilaiNotifPostData, "ambilnilainotifikasi").then(
      result => {
        this.resposenilainotif = result;
        if (this.resposenilainotif) {
          this.datasetnilaiNotif = this.resposenilainotif;
          localStorage.setItem('setDataNotif',this.datasetnilaiNotif);
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

  tidakbisaditawar(){
    const dataIDFeedUser = localStorage.getItem("uidIdentifier");
  }
}
