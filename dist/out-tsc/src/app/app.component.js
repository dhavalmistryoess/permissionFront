import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Globals } from './globals';
import { ActivatedRoute } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(route, globals) {
        this.route = route;
        this.globals = globals;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Globals])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map