import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
var FooterComponent = /** @class */ (function () {
    function FooterComponent(router, globals) {
        this.router = router;
        this.globals = globals;
    }
    FooterComponent.prototype.ngOnInit = function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 200) {
            $('.go_top').fadeIn('slow');
        }
        if (scrolled < 200) {
            $('.go_top').fadeOut('slow');
        }
        $('.go_top').click(function () {
            $("html, body").animate({ scrollTop: "0" }, 500);
        });
        setTimeout(function () {
            var currentYear = (new Date()).getFullYear();
            $(".footer_year").html(currentYear);
        }, 500);
    };
    FooterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Globals])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map