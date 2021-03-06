import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

//let apiUrl = 'https://bursakerjaftunj.000webhostapp.com/api/';
//let apiUrl = 'http://10.0.2.2/WebService-BursaKerja-final/api/';
//let apiUrl = "http://localhost/WebService-BursaKerja-final/api/";
let apiUrl = 'https://bursakerjaft.000webhostapp.com/api/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  constructor(public http: Http) {
    console.log("Hello AuthServiceProvider Provider");
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers })
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
