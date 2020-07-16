import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var NotificationService = /** @class */ (function () {
    function NotificationService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    NotificationService.prototype.getAllNotifications = function (UserId, RoleId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            /*let isAdmin = false;
            if (this.globals.authData.RoleId == 1 || this.globals.authData.RoleId == 2) {
              isAdmin = false;
            }*/
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Notification/getAll/' + UserId + '/' + RoleId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    NotificationService.prototype.getRecentNotifications = function (UserId) {
        var _this = this;
        //debugger
        var promise = new Promise(function (resolve, reject) {
            var isAdmin = 'false';
            if (_this.globals.authData.RoleId == 1 || _this.globals.authData.RoleId == 2) {
                isAdmin = 'true';
            }
            _this.http.get(_this.globals.baseAPIUrl + 'Common/Notification/getRecent/' + UserId + '/' + _this.globals.authData.RoleId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    NotificationService.prototype.clearDismissNotification = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Common/Notification/ClearDismiss', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    NotificationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], NotificationService);
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=notification.service.js.map