import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  checkLogin(loginEntity) {
    let jwtHelper = new JwtHelperService();
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Auth/login', loginEntity)
        .toPromise()
        .then(
          res => { // Success 
            let result = res;
            if (result && result['token']) {
              localStorage.setItem('token', result['token']);
              this.globals.authData = jwtHelper.decodeToken(result['token']);
            }
            resolve(res);
          },
          msg => { // Error
            reject(msg);
            // this.router.navigate(['/pagenotfound']);
          }
        );
    });
    return promise;
  }

  logout(logoutEntity) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/Auth/logout', logoutEntity)
        .toPromise()
        .then(
          res => { // Success
            this.globals.authData = '';
            localStorage.removeItem('token');
            localStorage.removeItem('getUserPermission');
            resolve(res);
          },
          msg => { // Error
            reject(msg);
            // this.router.navigate(['/pagenotfound']);
          }
        );
    });
    return promise;
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    let isExpired = jwtHelper.isTokenExpired(token) ? true : false;
    if (isExpired) {
      this.globals.authData = undefined;
    }
    return !isExpired;
  }

  getAllDefault() {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Common/Inquiry/getAllDefault')
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

  AddCertificate(entity) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/UserRegistration/AddCertificate', entity)
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

  ActiveAccount(UserId) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/UserRegistration/activateAccount/'+ UserId)
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
