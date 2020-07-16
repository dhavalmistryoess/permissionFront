import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
var PasswordService = /** @class */ (function () {
    function PasswordService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    PasswordService.prototype.requestResetPassword = function (forgotEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Password/forgot', forgotEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PasswordService.prototype.checkResetPasswordLink = function (resetPasswordLinkEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Password/checkResetLink', resetPasswordLinkEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PasswordService.prototype.resetPassword = function (passwordEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Password/reset', passwordEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PasswordService.prototype.changePassword = function (passwordEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Password/change', passwordEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    PasswordService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], PasswordService);
    return PasswordService;
}());
export { PasswordService };
//# sourceMappingURL=password.service.js.map