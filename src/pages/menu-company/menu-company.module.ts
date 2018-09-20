import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuCompanyPage } from './menu-company';

@NgModule({
  declarations: [
    MenuCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuCompanyPage),
  ],
})
export class MenuCompanyPageModule {}
