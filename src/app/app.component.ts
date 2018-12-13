import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { WelcomePage } from "../pages/welcome/welcome";
import { TabsPage } from "../pages/tabs/tabs";
import { LinkyModule } from "angular-linky";
import { MomentModule } from "angular2-moment";
import { TabsCompanyPage } from "../pages/tabs-company/tabs-company";
import { Badge } from "@ionic-native/badge";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private badge: Badge
  ) {
    platform.ready().then(() => {
      let sudahlogin = window.localStorage.getItem("sudahloginPK")
        ? window.localStorage.getItem("sudahloginPK")
        : "";
      let sudahloginCompany = window.localStorage.getItem("sudahloginCompany")
        ? window.localStorage.getItem("sudahloginCompany")
        : "";
      let sudahlogout = window.localStorage.getItem("sudahlogoutPK")
        ? window.localStorage.getItem("sudahlogoutPK")
        : "";
      let sudahlogoutCompany = window.localStorage.getItem("sudahlogoutCompany")
        ? window.localStorage.getItem("sudahlogoutCompany")
        : "";

      if (sudahlogin == "sudah loginPK") {
        this.nav.setRoot(TabsPage);
      } else if (sudahloginCompany == "sudah login company") {
        this.nav.setRoot(TabsCompanyPage);
      } else if (sudahlogout == "sudah logoutPK") {
        this.nav.setRoot(WelcomePage);
      } else if (sudahlogoutCompany == "sudah logoutCompany") {
        this.nav.setRoot(WelcomePage);
      } else {
        this.nav.setRoot(WelcomePage);
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
