import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var EmailTemplateService = /** @class */ (function () {
    function EmailTemplateService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    EmailTemplateService.prototype.add = function (emailEntity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/EmailTemplate/addUpdate', emailEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EmailTemplateService.prototype.getAll = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/EmailTemplate/getAll/' + 2)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EmailTemplateService.prototype.getEmailAll = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/EmailTemplate/getAll', entity) // 1-Active, 2-All
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EmailTemplateService.prototype.getById = function (Email_TemplateId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/EmailTemplate/getById/' + Email_TemplateId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EmailTemplateService.prototype.getDefaultList = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Common/EmailTemplate/getAllDefault')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    EmailTemplateService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], EmailTemplateService);
    return EmailTemplateService;
}());
export { EmailTemplateService };
//# sourceMappingURL=email-template.service.js.map