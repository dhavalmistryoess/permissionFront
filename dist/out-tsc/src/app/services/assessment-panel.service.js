import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var AssessmentPanelService = /** @class */ (function () {
    function AssessmentPanelService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    AssessmentPanelService.prototype.getByCertificateId = function (certificateid, UserAssessmentId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getByCertificateId/' + certificateid + '/' + UserAssessmentId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService.prototype.addAssessment = function (addAssessmentTestEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/addAssessment', addAssessmentTestEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService.prototype.getById = function (UserAssessmentId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getById/' + UserAssessmentId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService.prototype.addAssessmentAnswer = function (assessmentTestEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/AddAssessmentAnswers', assessmentTestEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService.prototype.AddFinalSubmit = function (finalSubmitEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/AddFinalSubmit', finalSubmitEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService.prototype.oneShotAssessment = function (getoneshotassessmentEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getOneShotAssessment', getoneshotassessmentEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService.prototype.finalsubmitaddOneShotAssessment = function (finalSubmitEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/addOneShotAssessment', finalSubmitEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssessmentPanelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], AssessmentPanelService);
    return AssessmentPanelService;
}());
export { AssessmentPanelService };
//# sourceMappingURL=assessment-panel.service.js.map