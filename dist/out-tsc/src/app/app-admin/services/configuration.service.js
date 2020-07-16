import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    ConfigurationService.prototype.getAll = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Configuration/getAll')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ConfigurationService.prototype.update = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Configuration/Update', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ConfigurationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], ConfigurationService);
    return ConfigurationService;
}());
export { ConfigurationService };
//# sourceMappingURL=configuration.service.js.map