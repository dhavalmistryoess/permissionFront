import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var ResultPageService = /** @class */ (function () {
    function ResultPageService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    ResultPageService.prototype.getResultById = function (id) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/PracticeTest/getResultById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ResultPageService.prototype.getAssessmentResultById = function (id) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/AssessmentPanel/getResultById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ResultPageService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], ResultPageService);
    return ResultPageService;
}());
export { ResultPageService };
//# sourceMappingURL=result-page.service.js.map