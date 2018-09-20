import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { HomecompanyPage } from '../pages/homecompany/homecompany';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsCompanyPage } from '../pages/tabs-company/tabs-company';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { NotificationJobSeekerPage } from '../pages/notification-job-seeker/notification-job-seeker';
import { ProfilalumniPage } from '../pages/profilalumni/profilalumni';
import { LinkyModule } from 'angular-linky';
import { MomentModule } from 'angular2-moment';

import { LogincompanyPage } from '../pages/logincompany/logincompany';
import { SignupcompanyPage } from '../pages/signupcompany/signupcompany';
import {NotifCompanyPage} from '../pages/notif-company/notif-company';
import {ProfilCompanyPage} from '../pages/profil-company/profil-company';
import {MenuCompanyPage} from '../pages/menu-company/menu-company';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Common } from "../providers/auth-service/common";
import{HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomecompanyPage,
    TabsPage,
    TabsCompanyPage,
	  WelcomePage,
	  SignupPage,
    LoginPage,
    MenuPage,
    NotificationJobSeekerPage,
    ProfilalumniPage,
    LogincompanyPage,
    SignupcompanyPage,
    NotifCompanyPage,
    ProfilCompanyPage,
    MenuCompanyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpModule,LinkyModule,MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomecompanyPage,
    TabsPage,
    TabsCompanyPage,
	  WelcomePage,
	  SignupPage,
    LoginPage,
    MenuPage,
    NotificationJobSeekerPage,
    ProfilalumniPage,
    LogincompanyPage,
    SignupcompanyPage,
    ProfilCompanyPage,
    NotifCompanyPage,
    MenuCompanyPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,Common
  ]
})
export class AppModule {}
