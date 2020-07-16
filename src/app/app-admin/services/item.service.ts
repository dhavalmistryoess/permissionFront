import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  getAllDefault() {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/Item/getAllDefault')
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

  getById(id) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/Item/getById/' + id)
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

  addUpdate(entity) {
    debugger
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/Item/addUpdate', entity)
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

  getAll() {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/Item/getAll/' + 2)
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

  getItemAll(entity) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/Item/getAll', entity)
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

  //according new component and controller-model
  // getAllDefault() {
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.get(this.globals.baseAPIUrl + 'Assessment/ItemChanges/getAllDefault')
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           resolve(res);
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise;
  // } 

  // addUpdate(entity) {
  //   debugger
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.post(this.globals.baseAPIUrl + 'Assessment/ItemChanges/addUpdate', entity)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           resolve(res);
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise;
  // }

  // getById(id) {
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.get(this.globals.baseAPIUrl + 'Assessment/ItemChanges/getById/' + id)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           resolve(res);
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise;
  // }
}
