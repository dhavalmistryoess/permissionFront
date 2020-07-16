import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../services/password.service';
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(globals, router, route, PasswordService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.PasswordService = PasswordService;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPasswordEntity = {};
        this.errorEntity = {};
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
    };
    ForgotPasswordComponent.prototype.filter = function (s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        //return hrs + ':' + mins + ':' + secs + ':' + ms;
        return hrs + ':' + mins + ':' + secs;
    };
    ForgotPasswordComponent.prototype.requestResetPassword = function (forgotPasswordForm) {
        var _this = this;
        debugger;
        this.submitted = true;
        if (forgotPasswordForm.valid) {
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.forgotPasswordEntity.ResetPasswordURL = 'reset-password'; //reset password page url for email
            this.PasswordService.requestResetPassword(this.forgotPasswordEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                swal({
                    type: _this.globals.commonTranslationText.forgotPasswordPage.alerts.success.type,
                    title: _this.globals.commonTranslationText.forgotPasswordPage.alerts.success.title,
                    text: _this.globals.commonTranslationText.forgotPasswordPage.alerts.success.text,
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.router.navigate(['/login']);
            }, function (error) {
                if (error.status == 400) {
                    if (error.error.time) {
                        _this.current_time = Date.now();
                        var converted_last_time_stamp = new Date(error.error.time);
                        if (_this.current_time < converted_last_time_stamp.getTime()) {
                            var remaining_time = converted_last_time_stamp.getTime() - _this.current_time;
                            var time = _this.filter(remaining_time);
                            swal({
                                type: _this.globals.commonTranslationText.forgotPasswordPage.alerts.lockUser.type,
                                title: _this.globals.commonTranslationText.forgotPasswordPage.alerts.lockUser.title,
                                text: _this.globals.commonTranslationText.forgotPasswordPage.alerts.lockUser.text + time,
                                showConfirmButton: false,
                                timer: 4000
                            });
                        }
                        else {
                            // swal({
                            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                            //   showConfirmButton: false,
                            //   timer: 4000
                            // })
                            _this.globals.pageNotfound(error.error.code);
                        }
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.forgotPasswordPage.alerts.invalidCredential.type,
                            title: _this.globals.commonTranslationText.forgotPasswordPage.alerts.invalidCredential.title,
                            text: _this.globals.commonTranslationText.forgotPasswordPage.alerts.invalidCredential.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                }
                else if (error.status == 422) {
                    _this.errorEntity.email = (error.error.message.EmailAddress != "") ? error.error.message.EmailAddress : '';
                }
                else {
                    _this.globals.pageNotfound(error.error.code);
                }
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
            });
        }
    };
    ForgotPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-forgot-password',
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, PasswordService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map