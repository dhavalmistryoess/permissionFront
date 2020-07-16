import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from "@angular/common/http";
var AuthService = /** @class */ (function () {
    function AuthService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    AuthService.prototype.checkLogin = function (loginEntity) {
        var _this = this;
        //debugger
        var jwtHelper = new JwtHelperService();
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Auth/login', loginEntity)
                .toPromise()
                .then(function (res) {
                var result = res;
                if (result && result['token']) {
                    localStorage.setItem('token', result['token']);
                    _this.globals.authData = jwtHelper.decodeToken(result['token']);
                }
                resolve(res);
            }, function (msg) {
                reject(msg);
                // this.router.navigate(['/pagenotfound']);
            });
        });
        return promise;
    };
    AuthService.prototype.logout = function (logoutEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Auth/logout', logoutEntity)
                .toPromise()
                .then(function (res) {
                _this.globals.authData = '';
                localStorage.removeItem('token');
                resolve(res);
            }, function (msg) {
                reject(msg);
                // this.router.navigate(['/pagenotfound']);
            });
        });
        return promise;
    };
    AuthService.prototype.isLoggedIn = function () {
        //debugger
        var jwtHelper = new JwtHelperService();
        var token = localStorage.getItem('token');
        var isExpired = jwtHelper.isTokenExpired(token) ? true : false;
        if (isExpired) {
            this.globals.authData = undefined;
        }
        return !isExpired;
    };
    AuthService.prototype.getAllDefault = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Inquiry/getAllDefault')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AuthService.prototype.AddCertificate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/AddCertificate', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AuthService.prototype.ActiveAccount = function (UserId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/activateAccount/' + UserId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map