import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var DocumentListComponent = /** @class */ (function () {
    function DocumentListComponent(globals, router, route, DocumentService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.DocumentService = DocumentService;
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
                    field: "DocumentName",
                    dir: 'asc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'DocumentName',
                dir: 'asc'
            }];
    }
    DocumentListComponent.prototype.ngOnInit = function () {
        this.globals.isLoading = true;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–AllDiscountCoupons–' + todaysdate;
        this.getDocumentData();
    };
    // getDocumentData Listing
    DocumentListComponent.prototype.getDocumentData = function () {
        var _this = this;
        this.DocumentService.getDocumentAll(this.paginationEntity)
            .then(function (data) {
            _this.documentList = {
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
    DocumentListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getDocumentData();
    };
    // sortOrder change Event
    DocumentListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getDocumentData();
        }
    };
    // Filter event
    DocumentListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getDocumentData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    DocumentListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/document/edit/' + window.btoa(id)]);
    };
    DocumentListComponent.prototype.deleteDocument = function (document) {
        var _this = this;
        swal({
            title: this.globals.adminTranslationText.document.list.alerts.deleteConfirm.title,
            text: this.globals.adminTranslationText.document.list.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.adminTranslationText.document.list.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                document.UserId = _this.globals.authData.UserId;
                document.Id = document.DocumentId;
                document.TableName = 'tbldocuments';
                document.FieldName = 'DocumentId';
                document.Module = 'Document';
                document.ActivityText = 'Delete Document';
                document.ModuleId = 2;
                _this.globals.isLoading = true;
                debugger;
                _this.CommonService.deleteItem(document)
                    .then(function (data) {
                    _this.getDocumentData();
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.document.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.document.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.document.list.alerts.deleteSuccess.text,
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
    DocumentListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        if (i) {
            changeEntity.IsActive = 1;
        }
        else {
            changeEntity.IsActive = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.DocumentId;
        changeEntity.TableName = 'tbldocuments';
        changeEntity.FieldName = 'DocumentId';
        changeEntity.Module = 'Document';
        changeEntity.ModuleId = 2;
        if (changeEntity.IsActive == 1) {
            changeEntity.ActivityText = "Document Activated";
        }
        else {
            changeEntity.ActivityText = "Document Deactivated";
        }
        this.CommonService.isActiveChange(changeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsActive == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.document.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.document.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.document.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.document.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.document.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.document.list.alerts.activeSuccess.text,
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
    ], DocumentListComponent.prototype, "dataBinding", void 0);
    DocumentListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-document-list',
            templateUrl: './document-list.component.html',
            styleUrls: ['./document-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            DocumentService, CommonService])
    ], DocumentListComponent);
    return DocumentListComponent;
}());
export { DocumentListComponent };
//# sourceMappingURL=document-list.component.js.map