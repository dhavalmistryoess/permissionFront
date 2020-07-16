import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  getAllNotifications(UserId,RoleId) {
    let promise = new Promise((resolve, reject) => {
      /*let isAdmin = false;
      if (this.globals.authData.RoleId == 1 || this.globals.authData.RoleId == 2) {
        isAdmin = false;
      }*/
      this.http.get(this.globals.baseAPIUrl+'Common/Notification/getAll/'+UserId+'/'+RoleId)
      
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

  getRecentNotifications(UserId) {
    //debugger
    let promise = new Promise((resolve, reject) => {
      let isAdmin = 'false';
      if (this.globals.authData.RoleId == 1 || this.globals.authData.RoleId == 2) {
        isAdmin = 'true';
      }
      this.http.get(this.globals.baseAPIUrl+'Common/Notification/getRecent/'+UserId+'/'+this.globals.authData.RoleId)
      
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

  clearDismissNotification(entity) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl+'Common/Notification/ClearDismiss',entity)
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
