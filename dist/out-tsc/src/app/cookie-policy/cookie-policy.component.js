import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
var CookiePolicyComponent = /** @class */ (function () {
    function CookiePolicyComponent(globals) {
        this.globals = globals;
    }
    CookiePolicyComponent.prototype.ngOnInit = function () {
        if (this.globals.authData != undefined && this.globals.authData.RoleId == 1) {
            $('header').addClass("active_menu_right_block");
            $('.content_block').addClass("active_menu_right_block");
            $('footer').addClass("active_menu_right_block");
        }
    };
    CookiePolicyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-cookie-policy',
            templateUrl: './cookie-policy.component.html',
            styleUrls: ['./cookie-policy.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals])
    ], CookiePolicyComponent);
    return CookiePolicyComponent;
}());
export { CookiePolicyComponent };
//# sourceMappingURL=cookie-policy.component.js.map