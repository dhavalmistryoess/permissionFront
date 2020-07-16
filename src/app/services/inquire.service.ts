import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InquireService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  getAll() {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Common/Inquiry/getAll')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  

  sendMessage(inquireEntity) {

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Inquiry/addUpdate', inquireEntity)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}
