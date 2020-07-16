import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router';
var AppAdminComponent = /** @class */ (function () {
    function AppAdminComponent(route, globals) {
        this.route = route;
        this.globals = globals;
    }
    AppAdminComponent.prototype.ngOnInit = function () {
    };
    AppAdminComponent = tslib_1.__decorate([
        Component({
            selector: 'app-admin-root',
            templateUrl: './app-admin.component.html',
            styleUrls: ['./app-admin.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Globals])
    ], AppAdminComponent);
    return AppAdminComponent;
}());
export { AppAdminComponent };
//# sourceMappingURL=app-admin.component.js.map