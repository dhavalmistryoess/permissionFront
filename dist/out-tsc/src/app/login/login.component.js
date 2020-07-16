import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, route, AuthService, globals) {
        this.router = router;
        this.route = route;
        this.AuthService = AuthService;
        this.globals = globals;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorEntity = {};
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
        $("#password-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#password").attr("type") == "password") {
                $("#password").attr("type", "text");
            }
            else {
                $("#password").attr("type", "password");
            }
        });
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            debugger;
            var id1 = new JwtHelperService().decodeToken(id);
            if (id1.RoleId == undefined || id1.RoleId == '') {
                this.globals.isLoading = true;
                this.AuthService.ActiveAccount(id1)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.registerPage.form.successActivateAccount.type,
                        title: _this.globals.commonTranslationText.registerPage.form.successActivateAccount.title,
                        text: _this.globals.commonTranslationText.registerPage.form.successActivateAccount.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    _this.router.navigate(['/login']);
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.btn_disable = false;
                    _this.globals.pageNotfound(error.error.code);
                });
                // alert("successfully activation");
                // this.router.navigate(['/login']);
            }
            else {
                var CertificateId = [id1.CertificateId];
                var obj = { CertificateFor: id1.CertificateFor, CertificateId: CertificateId, UserId: id1.UserId };
                this.AuthService.AddCertificate(obj)
                    .then(function (data) {
                    _this.router.navigate(['/login']);
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.btn_disable = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        }
        this.loginEntity = {};
    };
    LoginComponent.prototype.filter = function (s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        //return hrs + ':' + mins + ':' + secs + ':' + ms;
        return hrs + ':' + mins + ':' + secs;
    };
    LoginComponent.prototype.login = function (loginForm) {
        var _this = this;
        this.submitted = true;
        if (loginForm.valid) {
            this.btn_disable = true;
            //this.globals.isLoading = true;
            this.AuthService.checkLogin(this.loginEntity)
                .then(function (data) {
                if (_this.globals.authData.RoleId == 1)
                    window.location.href = '/admin/adminDashboard';
                else if (_this.globals.authData.RoleId == 2 || _this.globals.authData.RoleId == 4)
                    window.location.href = '/proctorDashboard';
                else
                    window.location.href = '/dashboard';
                _this.globals.isLoading = true;
            }, function (error) {
                if (error.status == 404) {
                    if (error.error.status == 'User Locked') {
                        _this.current_time = Date.now();
                        var converted_last_time_stamp = new Date(error.error.time_lastattemp);
                        if (_this.current_time < converted_last_time_stamp.getTime()) {
                            var remaining_time = converted_last_time_stamp.getTime() - _this.current_time;
                            var time_1 = _this.filter(remaining_time);
                            swal({
                                type: _this.globals.commonTranslationText.loginPage.alerts.userLocked.type,
                                title: _this.globals.commonTranslationText.loginPage.alerts.userLocked.title,
                                text: _this.globals.commonTranslationText.loginPage.alerts.userLocked.text + time_1,
                                showConfirmButton: false,
                                timer: 4000
                            });
                        }
                    }
                    else if (error.error.status == 'Please try again') {
                        swal({
                            type: _this.globals.commonTranslationText.loginPage.alerts.invalidCredential.type,
                            title: _this.globals.commonTranslationText.loginPage.alerts.invalidCredential.title,
                            text: _this.globals.commonTranslationText.loginPage.alerts.invalidCredential.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else if (error.error.status == 'Invalid Email') {
                        swal({
                            type: _this.globals.commonTranslationText.loginPage.alerts.invalidEmail.type,
                            title: _this.globals.commonTranslationText.loginPage.alerts.invalidEmail.title,
                            text: _this.globals.commonTranslationText.loginPage.alerts.invalidEmail.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else if (error.error.status == 'User banded') {
                        swal({
                            type: _this.globals.commonTranslationText.loginPage.alerts.userBaned.type,
                            title: _this.globals.commonTranslationText.loginPage.alerts.userBaned.title,
                            text: _this.globals.commonTranslationText.loginPage.alerts.userBaned.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else if (error.error.status == 'Not Active') {
                        swal({
                            type: _this.globals.commonTranslationText.loginPage.alerts.userInActive.type,
                            title: _this.globals.commonTranslationText.loginPage.alerts.userInActive.title,
                            text: _this.globals.commonTranslationText.loginPage.alerts.userInActive.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else if (error.error.status == 'Inactive by Admin') {
                        swal({
                            type: _this.globals.commonTranslationText.loginPage.alerts.userInActiveByAdmin.type,
                            title: _this.globals.commonTranslationText.loginPage.alerts.userInActiveByAdmin.title,
                            text: _this.globals.commonTranslationText.loginPage.alerts.userInActiveByAdmin.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                }
                else if (error.status == 422) {
                    _this.errorEntity.email = (error.error.message.EmailAddress != "") ? error.error.message.EmailAddress : '';
                    _this.errorEntity.password = (error.error.message.Password != "") ? error.error.message.Password : '';
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
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, AuthService, Globals])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map