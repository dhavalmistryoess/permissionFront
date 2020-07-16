import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import commonTranslationText from "../assets/data/commonTranslationText.json";
import adminTranslationText from "../assets/data/adminTranslationText.json";
var Globals = /** @class */ (function () {
    function Globals() {
        this.baseAPIUrl = environment.apiUrl;
        this.baseUrl = environment.baseUrl;
        this.headerpath = "{'Content-Type': 'application/json','Accept': 'application/json'}";
        this.IsLoggedIn = false;
        this.isLoading = false;
        this.currentLink = '';
        this.currentModule = '';
        this.authData = localStorage.getItem('token') ? new JwtHelperService().decodeToken(localStorage.getItem('token')) : null;
        this.msgflag = false;
        this.message = '';
        this.type = '';
        this.check_login = false;
        this.todaysdate = '';
        this.commonTranslationText = commonTranslationText;
        this.adminTranslationText = adminTranslationText;
        this.current_progress = 0;
        this.selectedCurrency = 'usd';
        this.pageSize = 15;
    }
    Globals.prototype.pageNotfound = function (code) {
        window.location.href = 'pagenotfound/' + window.btoa(code);
    };
    Globals = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], Globals);
    return Globals;
}());
export { Globals };
//# sourceMappingURL=globals.js.map