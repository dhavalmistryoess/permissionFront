import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var ProctorDashboardService = /** @class */ (function () {
    function ProctorDashboardService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    ProctorDashboardService.prototype.getById = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/getById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.ChangePresentStatus = function (changePresentStatusEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/ChangePresentStatus/', changePresentStatusEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.finalFeedback = function (finalFeedbackEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/finalFeedback/', finalFeedbackEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.ResumeAssessment = function (finalFeedbackEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/ResumeAssessment/', finalFeedbackEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.stopAssessment = function (stopAssessmentEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/stopAssessment/', stopAssessmentEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.getincompleteAssessment = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/getPendingCandidates/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.updateDocumentVerificationStatus = function (documentVerificationEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/updateDocumentVerificationStatus/', documentVerificationEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.VerifyDocument = function (UserDocumentCertificateMappingId, IsVerify) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/VerifyDocument/' + UserDocumentCertificateMappingId + '/' + IsVerify)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.getFullAttendanceSheet = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/getFullAttendanceSheet/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.getFilterDefaultData = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/getFilterDefaultData/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.filterAttendanceList = function (filterEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorDashboard/filterAttendanceList/', filterEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.getDefaultListById = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/ProctorList/getById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService.prototype.filterProctorList = function (filterEntity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/ProctorList/filterProctorList', filterEntity)
                //this.http.post(this.globals.baseAPIUrl + 'Assessment/ProctorList/FilterProctorList/', filterEntity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ProctorDashboardService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], ProctorDashboardService);
    return ProctorDashboardService;
}());
export { ProctorDashboardService };
//# sourceMappingURL=proctor-dashboard.service.js.map