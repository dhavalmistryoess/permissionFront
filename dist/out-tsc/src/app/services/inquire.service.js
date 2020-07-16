import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var InquireService = /** @class */ (function () {
    function InquireService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    InquireService.prototype.getAll = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Inquiry/getAll')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    InquireService.prototype.sendMessage = function (inquireEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Inquiry/addUpdate', inquireEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    InquireService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], InquireService);
    return InquireService;
}());
export { InquireService };
//# sourceMappingURL=inquire.service.js.map