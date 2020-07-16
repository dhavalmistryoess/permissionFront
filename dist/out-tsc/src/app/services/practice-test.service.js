import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var PracticeTestService = /** @class */ (function () {
    function PracticeTestService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    PracticeTestService.prototype.getByCertificateId = function (certificateid, userPracticeTestId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/getByCertificateId/' + certificateid + '/' + userPracticeTestId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService.prototype.addPracticeTest = function (addPracticeTestEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/addPracticeTest', addPracticeTestEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService.prototype.getById = function (UserPracticeTestId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/getById/' + UserPracticeTestId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService.prototype.AddPracticeAnswers = function (practiceTestEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/AddPracticeAnswers', practiceTestEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService.prototype.AddFinalSubmit = function (finalSubmitEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/AddFinalSubmit', finalSubmitEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService.prototype.oneShotPractice = function (getoneshotpracticeEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/getOneShotPracticeTest', getoneshotpracticeEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService.prototype.finalsubmitaddOneShotAssessment = function (finalSubmitEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/addOneShotPracticeTest', finalSubmitEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PracticeTestService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], PracticeTestService);
    return PracticeTestService;
}());
export { PracticeTestService };
//# sourceMappingURL=practice-test.service.js.map