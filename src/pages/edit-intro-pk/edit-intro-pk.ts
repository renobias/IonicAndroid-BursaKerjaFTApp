import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { variable } from "@angular/compiler/src/output/output_ast";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ProfilalumniPage } from "../profilalumni/profilalumni";
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditIntroPkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-intro-pk",
  templateUrl: "edit-intro-pk.html"
})
export class EditIntroPkPage {
  /** Djamware */
  imageURI:any;
  imageFileName:any;
  /** djamware */

  userPostData = { user_id: "", token: "", ttg_saya: "", avatar: "",poto_profil:"" };
  userDetails: any;
  imgPreview = "assets/imgs/Foto Profil Dark.jpg";
  loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private camera: Camera,
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditIntroPkPage");
  }

  simpanIntro() {
    this.showLoader();
    this.authService.postData(this.userPostData, "editintroPK").then(
      result => {
        const alert = this.alertCtrl.create({
          title: "Tersimpan",
          subTitle: "berhasil diubah",
          buttons: ["OK"]
        });
        this.loading.dismiss();
        alert.present();
        this.navCtrl.push(ProfilalumniPage);
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: "update Failed",
          subTitle: "Oh tidak! update gagal",
          buttons: ["OK"]
        });
        alert.present();
        //Connection failed message
      }
    );
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Submitting..."
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.userPostData.avatar = results[i];
        }

        const fileTransfer: FileTransferObject = this.transfer.create();

        let options1: FileUploadOptions = {
           fileKey: 'file',
           fileName: this.userPostData.user_id+'.jpg',
           headers: {}
        }

        this.userPostData.poto_profil = "http://10.0.2.2/WebService-BursaKerja-final/img/"+this.userPostData.user_id+".jpg";
        
    fileTransfer.upload(this.imgPreview, 'http://10.0.2.2/WebService-BursaKerja-final/upload.php', options1)
     .then((data) => {
       // success
       alert("success");
     }, (err) => {
       // error
       alert("error"+JSON.stringify(err));
     });

      },
      err => {}
    );
  }


}
