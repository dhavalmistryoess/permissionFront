import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var AssisgnAssessmentService = /** @class */ (function () {
    function AssisgnAssessmentService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    AssisgnAssessmentService.prototype.getAllDefault = function (scheduleHistoryId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/AssignAssessment/getAllDefault/' + scheduleHistoryId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssisgnAssessmentService.prototype.SuggestedProctors = function (assignAssessmentEntity1) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssignAssessment/SuggestedProctors', assignAssessmentEntity1)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssisgnAssessmentService.prototype.getProctorDetails = function (UserId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/AssignAssessment/getProctorDetails/' + UserId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssisgnAssessmentService.prototype.getStateByCountryId = function (id) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/AssignAssessment/getStateByCountryId/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssisgnAssessmentService.prototype.AssignAssessment = function (assignAssessmentEntity1) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/AssignAssessment/AssignAssessment', assignAssessmentEntity1)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AssisgnAssessmentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], AssisgnAssessmentService);
    return AssisgnAssessmentService;
}());
export { AssisgnAssessmentService };
//# sourceMappingURL=assisgn-assessment.service.js.map