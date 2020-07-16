import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { JwtHelperService } from '@auth0/angular-jwt';
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(globals, router, route, PasswordService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.PasswordService = PasswordService;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        var body = document.querySelector('body');
        var count = $(window).height();
        body.style.setProperty('--screen-height', count + "px");
        this.passwordEntity = {};
        this.resetPasswordLinkEntity = {};
        $("#newpassword-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#newpassword").attr("type") == "password") {
                $("#newpassword").attr("type", "text");
            }
            else {
                $("#newpassword").attr("type", "password");
            }
        });
        $("#confpassword-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#confpassword").attr("type") == "password") {
                $("#confpassword").attr("type", "text");
            }
            else {
                $("#confpassword").attr("type", "password");
            }
        });
        this.globals.isLoading = true;
        try {
            var id = this.route.snapshot.paramMap.get('id');
            this.UserDetail = new JwtHelperService().decodeToken(id);
            this.resetPasswordLinkEntity.UserId = this.UserDetail.UserId;
            this.resetPasswordLinkEntity.ForgotPasswordCode = this.UserDetail.ForgotPasswordCode;
            this.PasswordService.checkResetPasswordLink(this.resetPasswordLinkEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
            }, function (error) {
                if (error.status == 404) {
                    swal({
                        type: _this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.type,
                        title: _this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.title,
                        text: _this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.text,
                    });
                }
                _this.router.navigate(['/login']);
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
            });
        }
        catch (exception) {
            this.globals.isLoading = false;
            swal({
                type: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.type,
                title: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.title,
                text: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.text,
            });
            this.router.navigate(['/login']);
        }
    };
    ResetPasswordComponent.prototype.resetPassword = function (resetPasswordForm) {
        var _this = this;
        this.submitted = true;
        if (resetPasswordForm.valid && !this.newconfsame) {
            this.globals.isLoading = true;
            this.btn_disable = true;
            this.passwordEntity.UserId = this.UserDetail.UserId;
            this.passwordEntity.LoginURL = 'login';
            this.passwordEntity.ForgotPasswordURL = 'forgot-password';
            debugger;
            this.PasswordService.resetPassword(this.passwordEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                swal({
                    type: _this.globals.commonTranslationText.resetPasswordPage.alerts.success.type,
                    title: _this.globals.commonTranslationText.resetPasswordPage.alerts.success.title,
                    text: _this.globals.commonTranslationText.resetPasswordPage.alerts.success.text,
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.router.navigate(['/login']);
            }, function (error) {
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                _this.globals.pageNotfound(error.error.code);
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
            });
        }
    };
    ResetPasswordComponent.prototype.confirmPassword = function () {
        if (this.passwordEntity.ConfirmPassword != this.passwordEntity.Password) {
            this.newconfsame = true;
        }
        else {
            this.newconfsame = false;
        }
    };
    ResetPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, PasswordService])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map