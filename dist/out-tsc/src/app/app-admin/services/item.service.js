import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Globals } from '../../globals';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
var ItemService = /** @class */ (function () {
    function ItemService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
    }
    ItemService.prototype.getAllDefault = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/Item/getAllDefault')
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ItemService.prototype.getById = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/Item/getById/' + id)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ItemService.prototype.addUpdate = function (entity) {
        var _this = this;
        debugger;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/Item/addUpdate', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ItemService.prototype.getAll = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.globals.baseAPIUrl + 'Assessment/Item/getAll/' + 2)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ItemService.prototype.getItemAll = function (entity) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.globals.baseAPIUrl + 'Assessment/Item/getAll', entity)
                .toPromise()
                .then(function (res) {
                resolve(res);
            }, function (msg) {
                reject(msg);
            });
        });
        return promise;
    };
    ItemService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Globals, Router])
    ], ItemService);
    return ItemService;
}());
export { ItemService };
//# sourceMappingURL=item.service.js.map