import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var EligibilityTestService = /** @class */ (function () {
    function EligibilityTestService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    EligibilityTestService.prototype.getAllDefault = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/EligibilityAnswer/getAllDefault/')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EligibilityTestService.prototype.getById = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/EligibilityAnswer/getById/' + entity.CertificateId + '/' + entity.EligibilityItemFor)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EligibilityTestService.prototype.addEligibilityAnswer = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/EligibilityAnswer/addEligibilityAnswer', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EligibilityTestService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], EligibilityTestService);
    return EligibilityTestService;
}());
export { EligibilityTestService };
//# sourceMappingURL=eligibility-test.service.js.map