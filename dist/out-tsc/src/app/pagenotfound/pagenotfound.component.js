import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
var PagenotfoundComponent = /** @class */ (function () {
    function PagenotfoundComponent(globals, router, route) {
        this.globals = globals;
        this.router = router;
        this.route = route;
    }
    PagenotfoundComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
        this.globals.isLoading = true;
        this.code = window.atob(this.route.snapshot.paramMap.get('code'));
        if (this.code) {
            this.globals.isLoading = false;
        }
    };
    PagenotfoundComponent = tslib_1.__decorate([
        Component({
            selector: 'app-pagenotfound',
            templateUrl: './pagenotfound.component.html',
            styleUrls: ['./pagenotfound.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute])
    ], PagenotfoundComponent);
    return PagenotfoundComponent;
}());
export { PagenotfoundComponent };
//# sourceMappingURL=pagenotfound.component.js.map