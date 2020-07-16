import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserInviteService } from '../services/user-invite.service';
var UserInviteComponent = /** @class */ (function () {
    function UserInviteComponent(globals, router, route, UserInviteService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.UserInviteService = UserInviteService;
    }
    UserInviteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = false;
        this.userInviteEntity = {};
        this.certificateList = [];
        this.roleList = [];
        this.UserInviteService.getAllDefault()
            .then(function (data) {
            // this.certificateList = data['Certificates'];
            // this.roleList = data['Roles'];
            var certificateSelect = {
                CertificateId: '',
                CertificateName: _this.globals.adminTranslationText.userInvite.form.certificate.select,
                Value: ""
            };
            _this.certificateList.push(certificateSelect);
            _this.certificateList = _this.certificateList.concat(data['Certificates']);
            var roleSelect = {
                RoleId: '',
                RoleName: _this.globals.adminTranslationText.userInvite.form.role.select,
                Value: ""
            };
            _this.roleList.push(roleSelect);
            _this.roleList = _this.roleList.concat(data['Roles']);
            _this.globals.isLoading = false;
            _this.userInviteEntity.CertificateId = '';
            _this.userInviteEntity.RoleId = '';
        }, function (error) {
            _this.globals.isLoading = false;
            // if (error.text) {
            //   swal({
            //     //position: 'top-end',
            //     type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //     title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //     text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   })
            // }
            _this.globals.pageNotfound(error.error.code);
        });
    };
    UserInviteComponent.prototype.sendInvite = function (userInviteForm) {
        var _this = this;
        debugger;
        var obj;
        for (var i = 0; i < this.certificateList.length; i++) {
            if (this.certificateList[i].CertificateId == this.userInviteEntity.CertificateId) {
                obj = { CertificateId: this.userInviteEntity.CertificateId, CertificateName: this.certificateList[i].CertificateName };
            }
        }
        this.userInviteEntity.CertificateDetails = obj;
        this.userInviteEntity.RegistrationURL = 'register';
        this.userInviteEntity.AdminId = this.globals.authData.UserId;
        this.submitted = true;
        if (userInviteForm.valid) {
            this.globals.isLoading = true;
            this.UserInviteService.sendInvite(this.userInviteEntity)
                .then(function (data) {
                if (data == 'Successful invite') {
                    _this.globals.isLoading = false;
                    _this.btn_disable = false;
                    _this.submitted = false;
                    _this.userInviteEntity = {};
                    userInviteForm.form.markAsPristine();
                    _this.userInviteEntity.CertificateId = "";
                    _this.userInviteEntity.RoleId = "";
                    swal({
                        type: _this.globals.adminTranslationText.userInvite.form.alerts.send.type,
                        title: _this.globals.adminTranslationText.userInvite.form.alerts.send.title,
                        text: _this.globals.adminTranslationText.userInvite.form.alerts.send.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.userInvite.form.alerts.duplicateSend.type,
                        title: _this.globals.adminTranslationText.userInvite.form.alerts.duplicateSend.title,
                        text: _this.globals.adminTranslationText.userInvite.form.alerts.duplicateSend.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }, function (error) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                _this.globals.pageNotfound(error.error.code);
            });
        }
    };
    UserInviteComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-invite',
            templateUrl: './user-invite.component.html',
            styleUrls: ['./user-invite.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, UserInviteService])
    ], UserInviteComponent);
    return UserInviteComponent;
}());
export { UserInviteComponent };
//# sourceMappingURL=user-invite.component.js.map