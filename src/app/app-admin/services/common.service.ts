import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { PermissionService } from './permission.service';
declare var $, swal: any;
declare var angular: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router, private PermissionService: PermissionService) { }

  isActiveChange(activeEntity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/isActiveChange', activeEntity)
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

  toggleValueChange(activeEntity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/toggleValueChange', activeEntity)
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

  deleteItem(deleteEntity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Common/delete', deleteEntity)
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


  checkPermission() {
    let promise = new Promise((resolve, reject) => {
      if (localStorage.getItem('getUserPermission')) {
       let retrievedObject = JSON.parse(localStorage.getItem('getUserPermission'));
        resolve(retrievedObject);
      }
      else
      {
        this.http.get(this.globals.baseAPIUrl + 'Assessment/SyncDetails/getRolePermissionDetails/' + this.globals.authData.RoleId)
          .toPromise()
          .then(
            res => { // Success
              localStorage.setItem('getUserPermission', JSON.stringify(res));
              resolve(res);
            },
            msg => { // Error
              reject(msg);
            }
          );
      }
    });

    return promise;
  }



  hasAccess(listPermission, currentPermission) {
    debugger;
    let index;
    let permissionEnity = {};
    currentPermission.forEach(function (menu, key) {
      index = listPermission.findIndex(listPermission => (listPermission.Slug === menu.key && listPermission.HasAccess == 1))
      if (index != -1) {
        permissionEnity[menu.key] = true;
      } else {
        permissionEnity[menu.key] = false;
      }
    });

    return permissionEnity;

  }
}
