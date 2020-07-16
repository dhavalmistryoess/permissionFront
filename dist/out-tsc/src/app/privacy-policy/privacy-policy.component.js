import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
var PrivacyPolicyComponent = /** @class */ (function () {
    function PrivacyPolicyComponent(globals) {
        this.globals = globals;
    }
    PrivacyPolicyComponent.prototype.ngOnInit = function () {
        if (this.globals.authData != undefined && this.globals.authData.RoleId == 1) {
            $('header').addClass("active_menu_right_block");
            $('.content_block').addClass("active_menu_right_block");
            $('footer').addClass("active_menu_right_block");
        }
    };
    PrivacyPolicyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-privacy-policy',
            templateUrl: './privacy-policy.component.html',
            styleUrls: ['./privacy-policy.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals])
    ], PrivacyPolicyComponent);
    return PrivacyPolicyComponent;
}());
export { PrivacyPolicyComponent };
//# sourceMappingURL=privacy-policy.component.js.map