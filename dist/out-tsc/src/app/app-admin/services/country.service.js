import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var CountryService = /** @class */ (function () {
    function CountryService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    CountryService.prototype.addUpdate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Country/addUpdate', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    CountryService.prototype.getById = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Country/getById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    CountryService.prototype.getAll = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Country/getAll/' + 2) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    CountryService.prototype.getCountryAll = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Country/getCountry', entity) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    CountryService.prototype.getActivated = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Country/getAll/' + 1) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    CountryService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], CountryService);
    return CountryService;
}());
export { CountryService };
//# sourceMappingURL=country.service.js.map