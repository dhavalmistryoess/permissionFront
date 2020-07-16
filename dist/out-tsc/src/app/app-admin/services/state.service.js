import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var StateService = /** @class */ (function () {
    function StateService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    StateService.prototype.addUpdate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/State/addUpdate', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    StateService.prototype.getById = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/State/getById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    StateService.prototype.getAll = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/State/getAll/' + 2) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    StateService.prototype.getStateAll = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/State/getAll', entity) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    StateService.prototype.getActivated = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/State/getAll/' + 1) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    StateService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], StateService);
    return StateService;
}());
export { StateService };
//# sourceMappingURL=state.service.js.map