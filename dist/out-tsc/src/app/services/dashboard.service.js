import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var DashboardService = /** @class */ (function () {
    function DashboardService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    DashboardService.prototype.getById = function (UserId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/getById/' + UserId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.scheduleAssessment = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/ScheduleAssessment', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.getCertificateDetailsById = function (userCertificateId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/getCertificateDetailsById/' + userCertificateId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.cancelAssessment = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/CancelAssessment', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.searchCertificate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/searchCertificate', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.DeleteCertificate = function (UserId, UserCertificateId) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/DeleteCertificate/' + UserId + '/' + UserCertificateId)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.AddCertificate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/AddCertificate', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.addPayment = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/Orders/OrderCheckout', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.addRecertification = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/Orders/Recertification', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.VerificationRequest = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/VerificationRequest', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService.prototype.buyNewPracticeTests = function (buyNewPracticeTestEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/CandidateDashboard/buyNewPracticeTests', buyNewPracticeTestEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    DashboardService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], DashboardService);
    return DashboardService;
}());
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map