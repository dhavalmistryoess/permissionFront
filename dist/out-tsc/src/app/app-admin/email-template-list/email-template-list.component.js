import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateService } from '../services/email-template.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var EmailTemplateListComponent = /** @class */ (function () {
    function EmailTemplateListComponent(globals, router, route, EmailTemplateService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.EmailTemplateService = EmailTemplateService;
        this.CommonService = CommonService;
        this.pageSize = this.globals.pageSize;
        this.allowUnsort = true;
        this.skip = 0;
        this.paginationEntity = {
            limit: this.pageSize,
            offset: 1,
            searchData: {
                status: '',
                searchQuery: ''
            },
            sortOrder: [{
                    field: "Token",
                    dir: 'asc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'Token',
                dir: 'asc'
            }];
    }
    EmailTemplateListComponent.prototype.ngOnInit = function () {
        this.globals.isLoading = true;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–AllItems–' + todaysdate;
        this.globals.isLoading = true;
        this.getEmailData();
    };
    // getEmailData Listing
    EmailTemplateListComponent.prototype.getEmailData = function () {
        var _this = this;
        this.EmailTemplateService.getEmailAll(this.paginationEntity)
            .then(function (data) {
            _this.EmailList = {
                data: (data.totalRecord > 0) ? orderBy(data.result, _this.sort) : '',
                total: data.totalRecord,
            };
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    // pageChange Event
    EmailTemplateListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getEmailData();
    };
    // sortOrder change Event
    EmailTemplateListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getEmailData();
        }
    };
    // Filter event
    EmailTemplateListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getEmailData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    EmailTemplateListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/email-template/edit/' + window.btoa(id)]);
    };
    EmailTemplateListComponent.prototype.deleteEmail = function (Email) {
        var _this = this;
        swal({
            title: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteConfirm.title,
            text: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                Email.UserId = _this.globals.authData.UserId;
                Email.Id = Email.EmailTemplateId;
                Email.TableName = 'tblemailtemplate';
                Email.FieldName = 'EmailTemplateId';
                Email.Module = 'Email Template';
                Email.ActivityText = 'Delete Email Template - ' + Email.Token + ' (Id - ' + Email.EmailTemplateId + ')';
                _this.globals.isLoading = true;
                debugger;
                _this.CommonService.deleteItem(Email)
                    .then(function (data) {
                    _this.getEmailData();
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.emailTemplate.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.emailTemplate.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.emailTemplate.list.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    EmailTemplateListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        if (i) {
            changeEntity.IsActive = 1;
        }
        else {
            changeEntity.IsActive = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.EmailTemplateId;
        changeEntity.TableName = 'tblemailtemplate';
        changeEntity.FieldName = 'EmailTemplateId';
        changeEntity.Module = 'Email Template';
        changeEntity.ModuleId = 0;
        if (changeEntity.IsActive == 1) {
            changeEntity.ActivityText = "Email Template Activated - " + changeEntity.Token;
        }
        else {
            changeEntity.ActivityText = "Email Template Deactivated - " + changeEntity.Token;
        }
        this.CommonService.isActiveChange(changeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsActive == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.emailTemplate.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.emailTemplate.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.emailTemplate.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.emailTemplate.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.emailTemplate.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.emailTemplate.list.alerts.activeSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], EmailTemplateListComponent.prototype, "dataBinding", void 0);
    EmailTemplateListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-email-template-list',
            templateUrl: './email-template-list.component.html',
            styleUrls: ['./email-template-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            EmailTemplateService, CommonService])
    ], EmailTemplateListComponent);
    return EmailTemplateListComponent;
}());
export { EmailTemplateListComponent };
//# sourceMappingURL=email-template-list.component.js.map