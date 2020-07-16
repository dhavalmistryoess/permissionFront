import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
var TermConditionsComponent = /** @class */ (function () {
    function TermConditionsComponent(globals) {
        this.globals = globals;
    }
    TermConditionsComponent.prototype.ngOnInit = function () {
        if (this.globals.authData != undefined && this.globals.authData.RoleId == 1) {
            $('header').addClass("active_menu_right_block");
            $('.content_block').addClass("active_menu_right_block");
            $('footer').addClass("active_menu_right_block");
        }
    };
    TermConditionsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-term-conditions',
            templateUrl: './term-conditions.component.html',
            styleUrls: ['./term-conditions.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals])
    ], TermConditionsComponent);
    return TermConditionsComponent;
}());
export { TermConditionsComponent };
//# sourceMappingURL=term-conditions.component.js.map