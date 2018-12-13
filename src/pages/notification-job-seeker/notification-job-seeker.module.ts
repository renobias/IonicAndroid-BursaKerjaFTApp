import { NgModule, Pipe, Component } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NotificationJobSeekerPage } from "./notification-job-seeker";
import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [NotificationJobSeekerPage],
  imports: [IonicPageModule.forChild(NotificationJobSeekerPage), MomentModule]
})
export class NotificationJobSeekerPageModule {}
