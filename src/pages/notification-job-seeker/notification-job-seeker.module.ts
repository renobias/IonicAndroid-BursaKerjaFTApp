import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationJobSeekerPage } from './notification-job-seeker';

@NgModule({
  declarations: [
    NotificationJobSeekerPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationJobSeekerPage),
  ],
})
export class NotificationJobSeekerPageModule {}
