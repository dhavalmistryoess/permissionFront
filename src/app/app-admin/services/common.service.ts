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




 
  
  hasAccess(permission) {
    let retrievedObject, index;
    let permissionEnity = {};
    // if(localStorage.getItem('getUserPermission')) {
      retrievedObject = JSON.parse(localStorage.getItem('getUserPermission'));
    // } else {
    //   this.PermissionService.getUserPermission()
    //   .then((data) => {
    //     retrievedObject = data;
    //     this.globals.isLoading = false;
    //   },
    //     (error) => {
    //       this.globals.isLoading = false;
    //       this.globals.pageNotfound(error.error.code);
    //     });
    // }
    
    console.log(retrievedObject);
    
    
    permission.forEach(function (menu, key) {
      index = retrievedObject.findIndex(retrievedObject=> (retrievedObject.DisplayName === menu.key && retrievedObject.HasAccess == 1 ))
      if(index != -1) {
        permissionEnity[menu.key] =  true;
      } else {
        permissionEnity[menu.key] =  false;
      }
    });
    console.log(permissionEnity);
    return permissionEnity;
  
  }
}
