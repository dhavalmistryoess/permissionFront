import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
var RegisterService = /** @class */ (function () {
    function RegisterService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    RegisterService.prototype.getAllDefault = function () {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/getAllDefault/')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    RegisterService.prototype.getAllcertificate = function (id, CertificateFor) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/getAllcertificate/' + id + '/' + CertificateFor)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    RegisterService.prototype.getById = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/getById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    RegisterService.prototype.addUpdate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/Registration', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    RegisterService.prototype.Updateproctor = function (entity) {
        var _this = this;
        debugger;
        var jwtHelper = new JwtHelperService();
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/Updateproctor', entity)
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
            });
        });
        return promise;
    };
    RegisterService.prototype.CheckEmail = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/CheckEmail', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    RegisterService.prototype.uploadFileCertificate = function (file, total, UserId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/uploadDocuments/' + total + '/' + UserId, file)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
                _this.globals.isLoading = false;
            });
        });
        return promise;
    };
    RegisterService.prototype.savePersonalInfo = function (userData) {
        // console.log(userData);
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegisteration/savePersonalInfo/', userData)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
                _this.globals.isLoading = false;
            });
        });
        return promise;
    };
    RegisterService.prototype.AddCertificate = function (entity) {
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
    RegisterService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], RegisterService);
    return RegisterService;
}());
export { RegisterService };
//# sourceMappingURL=register.service.js.map