import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

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

import { HomecompanyPageModule } from '../pages/homecompany/homecompany.module';
import { LoginPageModule  } from '../pages/login/login.module';
import { LogincompanyPageModule  } from '../pages/logincompany/logincompany.module';
import { MenuPageModule  } from '../pages/menu/menu.module';
import { MenuCompanyPageModule  } from '../pages/menu-company/menu-company.module';
import { MycompanyLokerPageModule  } from '../pages/mycompany-loker/mycompany-loker.module';
import { NotifCompanyPageModule  } from '../pages/notif-company/notif-company.module';
import { NotificationJobSeekerPageModule  } from '../pages/notification-job-seeker/notification-job-seeker.module';
import { ProfilCompanyPageModule  } from '../pages/profil-company/profil-company.module';
import { ProfilalumniPageModule  } from '../pages/profilalumni/profilalumni.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SignupcompanyPageModule  } from '../pages/signupcompany/signupcompany.module';
import { WelcomePageModule  } from '../pages/welcome/welcome.module';
import { ProfilHireAlumniPageModule  } from '../pages/profil-hire-alumni/profil-hire-alumni.module';
import { AfterSignupPencarikerjaPageModule  } from '../pages/after-signup-pencarikerja/after-signup-pencarikerja.module';
import { AfterSignupMahasiswaPageModule} from '../pages/after-signup-mahasiswa/after-signup-mahasiswa.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TabsCompanyPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpModule,LinkyModule,MomentModule,HomecompanyPageModule,
    LoginPageModule,LogincompanyPageModule,MenuPageModule,MenuCompanyPageModule, MycompanyLokerPageModule,
    NotifCompanyPageModule,NotificationJobSeekerPageModule,ProfilCompanyPageModule,ProfilalumniPageModule,
    SignupPageModule,SignupcompanyPageModule, WelcomePageModule,ProfilHireAlumniPageModule,AfterSignupPencarikerjaPageModule,
    AfterSignupMahasiswaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TabsCompanyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,Common
  ]
})
export class AppModule {}
