import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../globals';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(globals) {
        this.globals = globals;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        setTimeout(function () {
            new PerfectScrollbar('.sidebar_box');
        }, 500);
        setTimeout(function () {
            if ($(window).width() < 1251) {
                $('.pin_toggle').hide();
                $('.sidebar_wrap').removeClass("active_menu");
                $('.sidebar_wrap').addClass("sidebar_scroll");
                $('header').addClass("admin_small_right_block");
                $('.content_block').addClass("admin_small_right_block");
                $('footer').addClass("admin_small_right_block");
                // $('header').removeClass("active_menu_right_block");
                // $('.content_block').removeClass("active_menu_right_block");
                // $('footer').removeClass("active_menu_right_block");
                $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
            }
            $('.pin_toggle').click(function () {
                $('.pin_toggle').toggleClass("unpin");
                $('.sidebar_wrap').toggleClass("active_menu");
                $('.sidebar_wrap').toggleClass("sidebar_scroll");
                $('header').removeClass("admin_small_right_block");
                $('.content_block').removeClass("admin_small_right_block");
                $('footer').removeClass("admin_small_right_block");
                $('header').toggleClass("active_menu_right_block");
                $('.content_block').toggleClass("active_menu_right_block");
                $('footer').toggleClass("active_menu_right_block");
                $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
            });
            $(".sidebar_wrap").on("mouseleave", function () {
                if ($('.sidebar_scroll')[0]) {
                    $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
                    $('header').addClass("admin_small_right_block");
                    $('.content_block').addClass("admin_small_right_block");
                    $('footer').addClass("admin_small_right_block");
                }
            });
        }, 200);
    };
    SidebarComponent.prototype.closecollapse = function () {
        $(".dropdown_menu").addClass("collapsed");
        $(".dropdown_menu").attr("aria-expanded", "false");
        $(".collapse").removeClass("in");
    };
    SidebarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map