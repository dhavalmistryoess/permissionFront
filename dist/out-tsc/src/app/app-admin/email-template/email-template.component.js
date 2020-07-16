import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateService } from '../services/email-template.service';
var EmailTemplateComponent = /** @class */ (function () {
    function EmailTemplateComponent(globals, router, route, EmailTemplateService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.EmailTemplateService = EmailTemplateService;
    }
    EmailTemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = true;
        this.emailEntity = {};
        this.des_valid = false;
        this.roleList = [];
        this.roleList1 = [];
        this.roleList2 = [];
        this.tokenList = [];
        CKEDITOR.replace('EmailBody', {
            height: '200',
            resize_enabled: 'false',
            resize_maxHeight: '300',
            resize_maxWidth: '948',
            resize_minHeight: '300',
            resize_minWidth: '948',
            extraPlugins: 'sourcedialog',
            //extraAllowedContent: 'style;*[id,rel](*){*}'
            removePlugins: 'save,newpage,flash,about,iframe,language',
            extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
        });
        var id = this.route.snapshot.paramMap.get('id');
        this.EmailTemplateService.getDefaultList()
            .then(function (data) {
            // this.roleList = data['Roles'];
            _this.placeholderList = data['Placeholders'];
            // this.tokenList = data['Tokens'];
            var roleSelect = {
                RoleId: '',
                RoleName: _this.globals.adminTranslationText.emailTemplate.form.to.select,
                Value: ""
            };
            _this.roleList.push(roleSelect);
            _this.roleList = _this.roleList.concat(data['Roles']);
            var roleSelect1 = {
                RoleId: '',
                RoleName: _this.globals.adminTranslationText.emailTemplate.form.cc.select,
                Value: ""
            };
            _this.roleList1.push(roleSelect1);
            _this.roleList1 = _this.roleList1.concat(data['Roles']);
            var roleSelect2 = {
                RoleId: '',
                RoleName: _this.globals.adminTranslationText.emailTemplate.form.bcc.select,
                Value: ""
            };
            _this.roleList2.push(roleSelect2);
            _this.roleList2 = _this.roleList2.concat(data['Roles']);
            var tokenSelect = {
                TokenId: '',
                DisplayText: _this.globals.adminTranslationText.item.form.category.select,
                Value: ""
            };
            _this.tokenList.push(tokenSelect);
            _this.tokenList = _this.tokenList.concat(data['Tokens']);
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            // if (error.text) {
            //   swal({
            //     //position: 'top-end',
            //     type: 'error',
            //     title: 'Oops...',
            //     text: "Something went wrong!"
            //   })
            // }
            _this.globals.pageNotfound(error.error.code);
        });
        if (id) {
            id = window.atob(id);
            this.header = 'Edit';
            this.EmailTemplateService.getById(id)
                .then(function (data) {
                if (data != "") {
                    _this.emailEntity = data;
                    if (_this.emailEntity.IsActive == false) {
                        _this.emailEntity.IsActive = false;
                    }
                    else {
                        _this.emailEntity.IsActive = true;
                    }
                    if (_this.emailEntity.Cc == 0) {
                        _this.emailEntity.Cc = "";
                    }
                    if (_this.emailEntity.Bcc == 0) {
                        _this.emailEntity.Bcc = "";
                    }
                    CKEDITOR.instances.EmailBody.setData(_this.emailEntity.EmailBody);
                    _this.globals.isLoading = false;
                }
                else {
                    _this.router.navigate(['/admin/adminDashboard']);
                }
            }, function (error) {
                _this.globals.isLoading = false;
                // if (error.text) {
                //   swal({
                //     //position: 'top-end',
                //     type: 'error',
                //     title: 'Oops...',
                //     text: "Something went wrong!"
                //   })
                // }
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.header = 'Add';
            this.emailEntity = {};
            this.emailEntity.EmailTemplateId = 0;
            this.emailEntity.ModuleId = 0;
            this.emailEntity.TokenId = '';
            this.emailEntity.To = '';
            this.emailEntity.Cc = '';
            this.emailEntity.Bcc = '';
            this.emailEntity.IsActive = true;
            this.globals.isLoading = false;
        }
        CKEDITOR.on('instanceReady', function () {
            CKEDITOR.document.getById('contactList').on('dragstart', function (evt) {
                var target = evt.data.getTarget().getAscendant('div', true);
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                var dataTransfer = evt.data.dataTransfer;
                dataTransfer.setData('text/html', '{' + target.getText() + '}');
            });
        });
        setTimeout(function () {
            $('select').selectpicker();
        }, 5000);
    };
    EmailTemplateComponent.prototype.addEmailTemplate = function (EmailForm) {
        var _this = this;
        // this.emailEntity.EmailBody = CKEDITOR.instances.EmailBody.getData();
        // if (this.emailEntity.EmailBody != "") {
        //   this.des_valid = false;
        // } else {
        //   this.des_valid = true;
        // }
        this.emailEntity.EmailBody = CKEDITOR.instances.EmailBody.getData();
        var EmailBody = CKEDITOR.instances.EmailBody.editable().getText();
        if (this.emailEntity.EmailBody != "" && this.emailEntity.EmailBody != undefined) {
            this.des_valid = false;
            $(".cke_textarea_inline").removeClass("error_ckeditor");
        }
        else {
            this.des_valid = true;
            $(".cke_textarea_inline").addClass("error_ckeditor");
        }
        var id = this.route.snapshot.paramMap.get('id');
        //let id = window.atob(this.route.snapshot.paramMap.get('id'));
        if (id) {
            // id = window.atob(id);
            this.emailEntity.UserId = this.globals.authData.UserId;
            if (this.emailEntity.Cc == '' || this.emailEntity.Cc == 'undefined') {
                this.emailEntity.Cc = '0';
            }
            else {
                this.emailEntity.Cc = this.emailEntity.Cc;
            }
            if (this.emailEntity.Bcc == '' || this.emailEntity.Bcc == undefined) {
                this.emailEntity.Bcc = '0';
            }
            else {
                this.emailEntity.Bcc = this.emailEntity.Bcc;
            }
            if (this.emailEntity.BccEmail == '' || this.emailEntity.BccEmail == undefined) {
                this.emailEntity.BccEmail = '';
            }
            else {
                this.emailEntity.BccEmail = this.emailEntity.BccEmail;
            }
            this.submitted = false;
        }
        else {
            if (this.emailEntity.Cc == '' || this.emailEntity.Cc == 'undefined') {
                this.emailEntity.Cc = '0';
            }
            else {
                this.emailEntity.Cc = this.emailEntity.Cc;
            }
            if (this.emailEntity.Bcc == '' || this.emailEntity.Bcc == undefined) {
                this.emailEntity.Bcc = '0';
            }
            else {
                this.emailEntity.Bcc = this.emailEntity.Bcc;
            }
            if (this.emailEntity.BccEmail == '' || this.emailEntity.BccEmail == undefined) {
                this.emailEntity.BccEmail = '';
            }
            else {
                this.emailEntity.BccEmail = this.emailEntity.BccEmail;
            }
            this.emailEntity.CreatedBy = this.globals.authData.UserId;
            this.emailEntity.UserId = this.globals.authData.UserId;
            this.submitted = true;
        }
        if (EmailForm.valid && !this.des_valid) {
            this.btn_disable = true;
            this.emailEntity.check = 0;
            this.EmailTemplateService.add(this.emailEntity)
                .then(function (data) {
                _this.btn_disable = false;
                _this.submitted = false;
                _this.emailEntity = {};
                EmailForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: 'success',
                        title: 'Updated!',
                        text: 'Email Template has been updated successfully.',
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else {
                    swal({
                        type: 'success',
                        title: 'Added!',
                        text: 'Email Template has been added successfully.',
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                _this.router.navigate(['/admin/email-template/list']);
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted = false;
                _this.globals.isLoading = false;
                // if (error.text) {
                //   swal({
                //     //position: 'top-end',
                //     type: 'error',
                //     title: 'Oops...',
                //     text: "Something went wrong!"
                //   })
                // }
                _this.globals.pageNotfound(error.error.code);
            });
        }
    };
    EmailTemplateComponent.prototype.clearForm = function (EmailForm) {
        this.emailEntity = {};
        this.emailEntity.EmailTemplateId = 0;
        this.emailEntity.IsActive = true;
        this.submitted = false;
        this.des_valid = false;
        this.emailEntity.TokenId = '';
        this.emailEntity.To = '';
        this.emailEntity.Cc = '';
        this.emailEntity.Bcc = '';
        //CKEDITOR.instances.EmailBody.setData('');
        EmailForm.form.markAsPristine();
    };
    EmailTemplateComponent = tslib_1.__decorate([
        Component({
            selector: 'app-email-template',
            templateUrl: './email-template.component.html',
            styleUrls: ['./email-template.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            EmailTemplateService])
    ], EmailTemplateComponent);
    return EmailTemplateComponent;
}());
export { EmailTemplateComponent };
//# sourceMappingURL=email-template.component.js.map