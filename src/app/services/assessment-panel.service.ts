import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AssessmentPanelService {

  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }
  
  getByCertificateId(certificateid,UserAssessmentId) {debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getByCertificateId/' + certificateid + '/'+UserAssessmentId )
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

  addAssessment(addAssessmentTestEntity) {
    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/addAssessment', addAssessmentTestEntity)
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

  getById(UserAssessmentId) {debugger
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getById/' + UserAssessmentId )
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

  addAssessmentAnswer(assessmentTestEntity) {    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/AddAssessmentAnswers', assessmentTestEntity)
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
      this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/AddFinalSubmit', finalSubmitEntity)
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

  
  oneShotAssessment(getoneshotassessmentEntity) {
    
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getOneShotAssessment', getoneshotassessmentEntity)
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
      this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/addOneShotAssessment', finalSubmitEntity)
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
  // addAssessment(addAssessmentTestEntity) {
    
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanelChanges/addAssessment', addAssessmentTestEntity)
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

  // addAssessmentAnswer(assessmentTestEntity) {    
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanelChanges/AddAssessmentAnswers', assessmentTestEntity)
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

  // getById(UserAssessmentId) {debugger
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.get(this.globals.baseAPIUrl + 'Assessment/AssessmentPanelChanges/getById/' + UserAssessmentId )
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
  // oneShotAssessment(getoneshotassessmentEntity) {
    
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.post(this.globals.baseAPIUrl + 'Assessment/AssessmentPanelChanges/getOneShotAssessment', getoneshotassessmentEntity)
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
