import { Injectable } from '@angular/core';

/*
  Generated class for the ShareServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareServiceProvider {
  userDetailstest: any;
  cntbdglclstrg: any;
  countbadge:any;
  userPostData = { "user_id": "", "token": "","user_id_fk":"","count_badge_notif":"" };
  constructor() {
    console.log('Hello ShareServiceProvider Provider');
    this.countbadge=0;
    this.cntbdglclstrg=0;

    localStorage.setItem('notifData',this.countbadge);
    this.userPostData.count_badge_notif=localStorage.getItem("notifData");
  }

  setcountbadge(countbadge){
    this.countbadge=countbadge;
    localStorage.setItem('notifData',this.countbadge);
    this.cntbdglclstrg=localStorage.getItem("notifData");
    this.userPostData.count_badge_notif=localStorage.getItem("notifData");
    console.log(this.countbadge);
  }

  increaseBadge(){
    this.countbadge=this.countbadge+1;
    localStorage.setItem('notifData',this.countbadge);
    this.cntbdglclstrg=localStorage.getItem("notifData");
    this.userPostData.count_badge_notif=localStorage.getItem("notifData");
    console.log(this.countbadge);
  }

  decreaseBadge(){
    if(this.countbadge>0){
    this.countbadge=this.countbadge-1;
    localStorage.setItem('notifData',this.countbadge);
    this.cntbdglclstrg=localStorage.getItem("notifData");
    this.userPostData.count_badge_notif=localStorage.getItem("notifData");
    console.log(this.countbadge);
    }
  }

  clearBadge(){
    this.countbadge=0;
    localStorage.setItem('notifData',this.countbadge);
    this.cntbdglclstrg=localStorage.getItem("notifData");
    this.userPostData.count_badge_notif=localStorage.getItem("notifData");
    console.log(this.countbadge);
  }


}
