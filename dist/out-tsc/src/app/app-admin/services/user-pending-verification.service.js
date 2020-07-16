import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var UserPendingVerificationService = /** @class */ (function () {
    function UserPendingVerificationService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    UserPendingVerificationService.prototype.getAllPendingVerificationUserList = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/UserRegistration/getAllPendingVerificationUserList/1')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    UserPendingVerificationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], UserPendingVerificationService);
    return UserPendingVerificationService;
}());
export { UserPendingVerificationService };
//# sourceMappingURL=user-pending-verification.service.js.map