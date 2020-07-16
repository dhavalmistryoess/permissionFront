import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var ManageRegisterRequestService = /** @class */ (function () {
    function ManageRegisterRequestService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    ManageRegisterRequestService.prototype.getAll = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/getAll/' + 2)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService.prototype.getUserCertificates = function (UserId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/getUserCertificates/' + UserId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService.prototype.UpdateCertificateDocuments = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/EditProfile/UpdateCertificateDocuments', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService.prototype.uploadFileCertificate = function (file, total, UserId) {
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
    ManageRegisterRequestService.prototype.deleteDocument = function (UserDocumentId, UserDocumentCertificateMappingId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/EditProfile/deleteDocument/' + UserDocumentId + '/' + UserDocumentCertificateMappingId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService.prototype.VerifyDocuments = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/VerifyDocuments', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService.prototype.VerifyDocument = function (UserDocumentCertificateMappingId, IsVerify) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/VerifyDocument/' + UserDocumentCertificateMappingId + '/' + IsVerify)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService.prototype.isBanByadmin = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/isBanByadmin', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ManageRegisterRequestService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], ManageRegisterRequestService);
    return ManageRegisterRequestService;
}());
export { ManageRegisterRequestService };
//# sourceMappingURL=manage-register-request.service.js.map