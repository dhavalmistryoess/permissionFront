import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  requestResetPassword(forgotEntity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Password/forgot', forgotEntity)
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

  checkResetPasswordLink(resetPasswordLinkEntity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Password/checkResetLink', resetPasswordLinkEntity)
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

  resetPassword(passwordEntity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Password/reset', passwordEntity)
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

  changePassword(passwordEntity) {
    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Password/change', passwordEntity)
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
