import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  App,
  AlertController,
  Item
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { LinkyModule } from "angular-linky";
import { Common } from "../../providers/auth-service/common";
import { ProfilHireAlumniPage } from "../profil-hire-alumni/profil-hire-alumni";
/**
 * Generated class for the HomecompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-homecompany",
  templateUrl: "homecompany.html"
})
export class HomecompanyPage {
  @ViewChild("updatebox") updatebox;
  public userDetails: any;

  public resposeData: any;
  public resposeDataBP: any;
  public resposeDataBK: any;
  public resposeDataPS: any;
  public resposeDatauser: any;

  public dataSet: any;
  public dataSetBP: any;
  public dataSetBK: any;
  public dataSetPS: any;
  public noScroll: any;

  public noRecords: boolean;
  public variabelsearch:any;
  searchQuery: string = "";
  items: string[]; 
  userPostData = { user_id: "", token: "",prodi:"",keyword:"",tahun_lulus:"",bidang_pekerjaan:"",bidang_keahlian:"",lastCreated: ""};
  userPostDataKey = { user_id: "", token: "",keyword:""};
  pekerjaanPostData = { user_id: "", token: "", id_bidang_pekerjaan: "" };
  public userIdentify = { uidfk: "" };

  constructor(
    public navCtrl: NavController,
    public authService: AuthServiceProvider,
    public app: App,
    public Common: Common,
    public alertCtrl: AlertController
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.lastCreated = "";

    this.pekerjaanPostData.user_id = this.userDetails.user_id;
    this.pekerjaanPostData.token = this.userDetails.token;
    this.noScroll=1;
  }

  ionViewWillEnter() {
    this.getFeed();
    this.getProgramStudi();
    this.getBidangPekerjaan();
    this.initializeItems();
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    this.Common.presentLoading();
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
    this.Common.closeLoading();
  }

  getProgramStudi() {
    this.authService.postData(this.userPostData, "getProgramStudi").then(
      result => {
        this.resposeDataPS = result;
        if (this.resposeDataPS.ProgramStudiData) {
          this.dataSetPS = this.resposeDataPS.ProgramStudiData;
          console.log(this.dataSetPS);
        } else {
        }
      },
      err => {
        console.log("asuuu");
      }
    );
  }

  getBidangPekerjaan() {
    this.authService.postData(this.userPostData, "getBidangPekerjaan").then(
      result => {
        this.resposeDataBP = result;
        if (this.resposeDataBP.BidangPekerjaanData) {
          this.dataSetBP = this.resposeDataBP.BidangPekerjaanData;
          console.log("datasetBP" + this.dataSetBP);
        } else {
        }
      },
      err => {
        console.log("asuuu");
      }
    );
  }

  getBidangKeahlian(index) {
    console.log(this.dataSetBP[index].id_bidang_pekerjaan);
    this.pekerjaanPostData.id_bidang_pekerjaan = this.dataSetBP[
      index
    ].id_bidang_pekerjaan;
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
        console.log("asuuu");
      }
    );
  }

  getFeed() {
    this.userPostData.tahun_lulus="";
    this.userPostData.bidang_pekerjaan="";
    this.userPostData.bidang_keahlian="";
    this.userPostData.prodi="";
    this.userPostData.lastCreated = "";
    console.log(this.userPostData.prodi);
    this.Common.presentLoading();
    this.authService.postData(this.userPostData, "feedPKinfinite").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.Common.closeLoading();
          this.dataSet = this.resposeData.feedData;
          localStorage.setItem("feedData", JSON.stringify(this.dataSet));
          console.log(this.dataSet);
          this.noScroll=1;

          const dataLength = this.resposeData.feedData.length;

          this.userPostData.lastCreated = this.resposeData.feedData[
            dataLength - 1
          ].user_id_fk;

        }
        else {
          this.Common.closeLoading();
          console.log("No data");
        }
      },
      err => {}
    );
  }

  /** 
  doInfinite(e): Promise<any> {
    console.log("Begin async operation");
    return new Promise(resolve => {
      setTimeout(() => {
        this.authService.postData(this.userPostData, "feed").then(
          result => {
            this.resposeData = result;
            if (this.resposeData.feedData.length) {
              const newData = this.resposeData.feedData;
              
  
              for (let i = 0; i < newData.length; i++) {
                this.dataSet.push(newData[i]);
              }
            } else {
              this.noRecords = true;
              console.log("No user updates");
            }
          },
          err => {
            //Connection failed message
          }
        );
        resolve();
      }, 500);
    });
  }
  
  */

  filter(){
    this.Common.presentLoading();
    this.authService.postData(this.userPostData, "feedfilterPK").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          localStorage.setItem("feedData", JSON.stringify(this.dataSet));
          console.log(this.dataSet);
          this.noScroll="";
          this.Common.closeLoading();
        } else {
        }
      },
      err => {}
    );
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  initializeItems() {
    return this.userPostData;
  }

  getItems(ev: any) {
    this.noScroll="";
    this.initializeItems();
    let val = ev.target.value;

    if (val && val.trim() != "") {
      this.authService.postData(this.userPostData, "feedPK").then(result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData.filter(item => {
            return (
              item.nama_lengkap.toLowerCase().indexOf(val.toLowerCase()) > -1
            );
          });
          localStorage.setItem("feedData", JSON.stringify(this.dataSet));
        } else {
          console.log("No access");
        }
      });
    }else {
      this.authService.postData(this.userPostData, "feedPK").then(result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          localStorage.setItem("feedData", JSON.stringify(this.dataSet));
        } else {
          console.log("No access");
        }
      });
    }
  }

  /** 
  searchbyword(){
    this.userPostDataKey.keyword = this.variabelsearch+'%';
    console.log(this.userPostDataKey.keyword);
   
    this.authService.postData(this.userPostDataKey, "searchfeedPK").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          localStorage.setItem("feedData", JSON.stringify(this.resposeData));
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);
      
        } else {
        }
      },
      err => {}
    );
  }
  */

  more(index: any) {
    //mengambil index feed dari pencari kerja
    localStorage.setItem("uidIdentifier", index);
    this.navCtrl.push(ProfilHireAlumniPage);
  }

   doInfinite(e): Promise<any> {
    console.log("Begin async operation");
    return new Promise(resolve => {
      setTimeout(() => {
        this.authService.postData(this.userPostData, "feedPKinfinite").then(
          result => {
            this.resposeData = result;
            if (this.resposeData.feedData.length) {
              const newData = this.resposeData.feedData;
              this.userPostData.lastCreated = this.resposeData.feedData[
                newData.length - 1
              ].user_id_fk;

              for (let i = 0; i < newData.length; i++) {
                this.dataSet.push(newData[i]);
              }

              localStorage.setItem("feedData", JSON.stringify(this.dataSet));
              console.log(this.dataSet);
            } else {
              this.noRecords = true;
              console.log("No user updates");
            }
          },
          err => {
            //Connection failed message
          }
        );
        resolve();
      }, 500);
    });
  }
}
