import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfterSignupMahasiswaPage } from './after-signup-mahasiswa';

@NgModule({
  declarations: [
    AfterSignupMahasiswaPage,
  ],
  imports: [
    IonicPageModule.forChild(AfterSignupMahasiswaPage),
  ],
})
export class AfterSignupMahasiswaPageModule {}
