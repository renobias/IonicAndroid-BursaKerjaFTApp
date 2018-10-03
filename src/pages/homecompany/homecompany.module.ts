import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomecompanyPage } from './homecompany';

@NgModule({
  declarations: [
    HomecompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(HomecompanyPage)
  ],
})
export class HomecompanyPageModule {}
