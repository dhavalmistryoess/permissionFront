import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent(globals, router, route, CategoryService, CommonService, CertificateCategoryMappingService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CategoryService = CategoryService;
        this.CommonService = CommonService;
        this.CertificateCategoryMappingService = CertificateCategoryMappingService;
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
                    field: "CategoryName",
                    dir: 'asc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'CategoryName',
                dir: 'asc'
            }];
    }
    CategoryListComponent.prototype.ngOnInit = function () {
        this.globals.isLoading = true;
        this.linkedCertificateList = [];
        this.unlinkedCertificateList = [];
        this.unlinkedCertificateEntity = {};
        this.linkedCertificateEntity = {};
        this.certificateCategoryMappingListEntity = {};
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–AllCategories–' + todaysdate;
        this.getCategoryData();
    };
    // getCategoryData Data Listing
    CategoryListComponent.prototype.getCategoryData = function () {
        var _this = this;
        this.CategoryService.getCategoryAll(this.paginationEntity)
            .then(function (data) {
            _this.categoryList = {
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
    CategoryListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getCategoryData();
    };
    // sortOrder change Event
    CategoryListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getCategoryData();
        }
    };
    // Filter event
    CategoryListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getCategoryData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    CategoryListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/category/edit/' + window.btoa(id)]);
    };
    CategoryListComponent.prototype.linkedCertificatesList = function (dataItem) {
        this.linkedCertificateList = dataItem.UnlinkedCertificates; //which is already linked to certificate and unlinked to the certificate
        $("#linkedCategory_popup").modal('show');
        this.linkedCertificateEntity = {};
        this.certificateCategoryMappingListEntity = {};
        this.submitted = false;
        this.linkedCertificateEntity = dataItem;
    };
    CategoryListComponent.prototype.linkCertificate = function (categoryLinkingForm) {
        var _this = this;
        debugger;
        var CategoryId = this.linkedCertificateEntity.CategoryId;
        var CertificateId = this.certificateCategoryMappingListEntity.CertificateId;
        var practiceItem = this.linkedCertificateEntity.AssessmentItems;
        for (var i = 0; i < this.linkedCertificateList.length; i++) {
            if (this.linkedCertificateList[i].CertificateId == CertificateId) {
                this.linkedCertificateEntity.PracticeExamAttempts = this.linkedCertificateList[i].PracticeExamAttempts;
            }
        }
        this.submitted = true;
        if (categoryLinkingForm.valid) {
            var practicedata = '';
            if (this.linkedCertificateEntity.PracticeExamAttempts > 0) {
                if (practiceItem != 0) {
                    practicedata = {
                        "CertificatePracticeTestMappingId": 0,
                        "PracticeTotalItems": "",
                        "PracticeCategoryAssessmentTime": "",
                        "PracticeScoreItems": "",
                        "PracticeNoneScoreItems": "",
                        "PracticePassingPercentage": "",
                        "PracticeIsMandatoryCategoryAssessment": 0,
                        "PracticeIsActive": 0
                    };
                }
            }
            this.certificateCategoryMappingListEntity = {
                "CertificateId": CertificateId,
                "CategoryId": CategoryId,
                "MappingDetails": [{
                        "AssessmentDetails": {
                            "CertificateAssessmentMappingId": 0,
                            "AssessmentTotalItems": "",
                            "CategoryAssessmentTime": "",
                            "ScoreItems": "",
                            "NoneScoreItems": "",
                            "PassingPercentage": "",
                            "IsMandatoryCategoryAssessment": 0,
                            "IsActive": 0
                        },
                        "PracticeTestDetails": practicedata
                    }],
                "UserId": this.globals.authData.UserId
            };
            console.log(this.certificateCategoryMappingListEntity);
            swal({
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.text,
                icon: "warning",
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
                allowOutsideClick: false
            })
                .then(function (result) {
                if (result.value) {
                    _this.globals.isLoading = true;
                    _this.CertificateCategoryMappingService.addUpdate(_this.certificateCategoryMappingListEntity)
                        .then(function (data) {
                        _this.globals.isLoading = false;
                        //this.btn_disable = false;
                        _this.submitted = false;
                        _this.certificateCategoryMappingListEntity = {};
                        categoryLinkingForm.form.markAsPristine();
                        swal({
                            type: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                            title: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                            text: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        _this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId) + '/' + window.btoa("1")]);
                    }, function (error) {
                        _this.globals.isLoading = false;
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
                else {
                    _this.globals.isLoading = true;
                    _this.CertificateCategoryMappingService.addUpdate(_this.certificateCategoryMappingListEntity)
                        .then(function (data) {
                        _this.globals.isLoading = false;
                        //this.btn_disable = false;
                        _this.submitted = false;
                        _this.certificateCategoryMappingListEntity = {};
                        _this.certificateCategoryMappingListEntity.CertificateId = CertificateId;
                        categoryLinkingForm.form.markAsPristine();
                        swal({
                            type: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                            title: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                            text: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        window.location.href = '/admin/category/list';
                    }, function (error) {
                        _this.globals.isLoading = false;
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
                $('#linkedCategory_popup').modal('hide');
            });
        }
        else {
        }
    };
    CategoryListComponent.prototype.unlinkedCertificatesList = function (dataItem) {
        this.unlinkedCertificateList = dataItem.LinkedCertificates; //which is already linked to certificate and unlinked to the certificate
        $("#unlinkedCategory_popup").modal('show');
        this.unlinkedCertificateEntity = {};
        this.unlinkedCertificateEntity.CategoryName = dataItem.CategoryName;
    };
    CategoryListComponent.prototype.unlinkCertificate = function (CertificateId) {
        var _this = this;
        debugger;
        if (CertificateId != '' && CertificateId != undefined) {
            swal({
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteCertificateUnlinkConfirm.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteCertificateUnlinkConfirm.text,
                icon: "warning",
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteCertificateUnlinkConfirm.type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: "No"
            })
                .then(function (result) {
                if (result.value) {
                    _this.globals.isLoading = true;
                    for (var i = 0; i < _this.unlinkedCertificateList.length; i++) {
                        if (CertificateId == _this.unlinkedCertificateList[i].CertificateId) {
                            _this.unlinkedCertificateEntity.Id = _this.unlinkedCertificateList[i].CertificateAssessmentMappingId;
                            _this.unlinkedCertificateEntity.Id2 = _this.unlinkedCertificateList[i].CertificatePracticeTestMappingId;
                            _this.unlinkedCertificateEntity.CertificatePracticeTestMappingId = _this.unlinkedCertificateList[i].CertificatePracticeTestMappingId;
                        }
                    }
                    _this.unlinkedCertificateEntity.UserId = _this.globals.authData.UserId;
                    _this.unlinkedCertificateEntity.TableName = 'tblmstcertificateassessmentmapping';
                    _this.unlinkedCertificateEntity.FieldName = 'CertificateAssessmentMappingId';
                    _this.unlinkedCertificateEntity.Module = 'AssessmentMapping';
                    _this.unlinkedCertificateEntity.ModuleId = 2;
                    _this.unlinkedCertificateEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
                    _this.unlinkedCertificateEntity.FieldName2 = 'CertificatePracticeTestMappingId';
                    _this.CertificateCategoryMappingService.unlinkCategory(_this.unlinkedCertificateEntity)
                        .then(function (data) {
                        $("#unlinkedCategory_popup").modal('hide');
                        var index = _this.unlinkedCertificateList.indexOf(CertificateId);
                        if (index != -1) {
                            _this.unlinkedCertificateList.splice(index, 1);
                        }
                        _this.globals.isLoading = false;
                        swal({
                            type: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.type,
                            title: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.title,
                            text: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }, function (error) {
                        _this.globals.isLoading = false;
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
            });
        }
    };
    CategoryListComponent.prototype.deleteCategory = function (category) {
        var _this = this;
        swal({
            title: this.globals.adminTranslationText.category.list.alerts.deleteConfirm.title,
            text: this.globals.adminTranslationText.category.list.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.adminTranslationText.category.list.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                category.UserId = _this.globals.authData.UserId;
                category.Id = category.CategoryId;
                category.TableName = 'tblmstcategory';
                category.FieldName = 'CategoryId';
                category.Module = 'Category';
                category.ModuleId = 2;
                category.ActivityText = 'Delete Category';
                _this.globals.isLoading = true;
                debugger;
                _this.CommonService.deleteItem(category)
                    .then(function (data) {
                    _this.getCategoryData();
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.category.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.category.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.category.list.alerts.deleteSuccess.text,
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
    CategoryListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        if (i) {
            changeEntity.IsActive = 1;
        }
        else {
            changeEntity.IsActive = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.CategoryId;
        changeEntity.TableName = 'tblmstcategory';
        changeEntity.FieldName = 'CategoryId';
        changeEntity.Module = 'Category';
        changeEntity.ModuleId = 2;
        if (changeEntity.IsActive == 1) {
            changeEntity.ActivityText = "Category Activated";
        }
        else {
            changeEntity.ActivityText = "Category Deactivated";
        }
        this.CommonService.isActiveChange(changeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsActive == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.category.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.category.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.category.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.category.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.category.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.category.list.alerts.activeSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    CategoryListComponent.prototype.itemDisabled = function (itemArgs) {
        return itemArgs.dataItem.IsMapped != '0';
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], CategoryListComponent.prototype, "dataBinding", void 0);
    CategoryListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-category-list',
            templateUrl: './category-list.component.html',
            styleUrls: ['./category-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            CategoryService, CommonService, CertificateCategoryMappingService])
    ], CategoryListComponent);
    return CategoryListComponent;
}());
export { CategoryListComponent };
//# sourceMappingURL=category-list.component.js.map