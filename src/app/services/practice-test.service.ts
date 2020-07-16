import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PracticeTestService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }

  getByCertificateId(certificateid,userPracticeTestId) {//debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/PracticeTest/getByCertificateId/' + certificateid +'/'+userPracticeTestId)
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

  addPracticeTest(addPracticeTestEntity) {
    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/PracticeTest/addPracticeTest', addPracticeTestEntity)
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

  getById(UserPracticeTestId) {//debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/PracticeTest/getById/' + UserPracticeTestId )
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

  AddPracticeAnswers(practiceTestEntity) {    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/PracticeTest/AddPracticeAnswers', practiceTestEntity)
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

  AddFinalSubmit(finalSubmitEntity) {    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/PracticeTest/AddFinalSubmit', finalSubmitEntity)
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

  
  oneShotPractice(getoneshotpracticeEntity) {
    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/PracticeTest/getOneShotPracticeTest', getoneshotpracticeEntity)
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

  finalsubmitaddOneShotAssessment(finalSubmitEntity) {
    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/PracticeTest/addOneShotPracticeTest', finalSubmitEntity)
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
