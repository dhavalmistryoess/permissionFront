import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../services/certificate.service';
import { CommonService } from '../services/common.service';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var CertificateListComponent = /** @class */ (function () {
    function CertificateListComponent(globals, router, route, CertificateService, CommonService, CertificateCategoryMappingService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CertificateService = CertificateService;
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
                    field: "CertificateName",
                    dir: 'asc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'CertificateName',
                dir: 'asc'
            }];
    }
    CertificateListComponent.prototype.ngOnInit = function () {
        this.globals.isLoading = true;
        // this.certificateList = [];
        this.certificateEntity = {};
        this.unlinkedCategoryList = [];
        this.unlinkedCategoryEntity = {};
        this.linkedCategoryList = [];
        this.linkedCategoryEntity = {};
        this.certificateCategoryMappingListEntity = {};
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        if (curr_month < 10) {
            var month = '0' + curr_month;
        }
        else {
            var month = '' + curr_month;
        }
        if (curr_date < 10) {
            var date = '0' + curr_date;
        }
        else {
            var date = '' + curr_date;
        }
        this.todaysDate = curr_year + '-' + month + '-' + date;
        this.exportName = 'Assessment–AllCertificates–' + this.todaysDate;
        this.getCertificateData();
    };
    // getCertificateData Data Listing
    CertificateListComponent.prototype.getCertificateData = function () {
        var _this = this;
        this.CertificateService.getCertificateAll(this.paginationEntity)
            .then(function (data) {
            _this.certificateList = {
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
    CertificateListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getCertificateData();
    };
    // sortOrder change Event
    CertificateListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getCertificateData();
        }
    };
    // Filter event
    CertificateListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getCertificateData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    CertificateListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/certificate/edit/' + window.btoa(id)]);
    };
    CertificateListComponent.prototype.viewAlldDetail = function (i) {
        this.certificateEntity = i;
    };
    CertificateListComponent.prototype.linkedCategoriesList = function (dataItem) {
        this.linkedCategoryList = dataItem.UnlinkedCategories; //which is already linked to certificate and unlinked to the certificate
        $("#linkedCategory_popup").modal('show');
        this.linkedCategoryEntity = {};
        this.certificateCategoryMappingListEntity = {};
        this.submitted = false;
        this.linkedCategoryEntity = dataItem;
    };
    CertificateListComponent.prototype.linkCategory = function (categoryLinkingForm) {
        var _this = this;
        debugger;
        var CategoryId = this.certificateCategoryMappingListEntity.CategoryId;
        var CertificateId = this.linkedCategoryEntity.CertificateId;
        var practiceItem = 0;
        for (var i = 0; i < this.linkedCategoryList.length; i++) {
            if (this.linkedCategoryList[i].CategoryId == CategoryId) {
                practiceItem = this.linkedCategoryList[i].PracticeTestItems;
            }
        }
        this.submitted = true;
        if (categoryLinkingForm.valid) {
            var practicedata = '';
            if (this.linkedCategoryEntity.PracticeExamAttempts > 0) {
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
                        _this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId) + '/' + window.btoa("0")]);
                        // this.router.navigate(['/admin/certificate-category-mapping/edit/' + CertificateId + '/' + CategoryId]);
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
                        window.location.href = '/admin/certificate/list';
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
    CertificateListComponent.prototype.unlinkedCategoriesList = function (dataItem) {
        this.unlinkedCategoryList = dataItem.LinkedCategories; //which is already linked to certificate and unlinked to the certificate
        $("#unlinkedCategory_popup").modal('show');
        this.unlinkedCategoryEntity = {};
        this.unlinkedCategoryEntity.CertificateName = dataItem.CertificateName;
    };
    CertificateListComponent.prototype.unlinkCategory = function (CategoryId) {
        var _this = this;
        debugger;
        if (CategoryId != '' && CategoryId != undefined) {
            swal({
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteConfirm.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteConfirm.text,
                icon: "warning",
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteConfirm.type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: "No"
            })
                .then(function (result) {
                if (result.value) {
                    _this.globals.isLoading = true;
                    for (var i = 0; i < _this.unlinkedCategoryList.length; i++) {
                        if (CategoryId == _this.unlinkedCategoryList[i].CategoryId) {
                            _this.unlinkedCategoryEntity.Id = _this.unlinkedCategoryList[i].CertificateAssessmentMappingId;
                            _this.unlinkedCategoryEntity.Id2 = _this.unlinkedCategoryList[i].CertificatePracticeTestMappingId;
                            _this.unlinkedCategoryEntity.CertificatePracticeTestMappingId = _this.unlinkedCategoryList[i].CertificatePracticeTestMappingId;
                        }
                    }
                    _this.unlinkedCategoryEntity.UserId = _this.globals.authData.UserId;
                    _this.unlinkedCategoryEntity.TableName = 'tblmstcertificateassessmentmapping';
                    _this.unlinkedCategoryEntity.FieldName = 'CertificateAssessmentMappingId';
                    _this.unlinkedCategoryEntity.Module = 'AssessmentMapping';
                    _this.unlinkedCategoryEntity.ModuleId = 2;
                    _this.unlinkedCategoryEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
                    _this.unlinkedCategoryEntity.FieldName2 = 'CertificatePracticeTestMappingId';
                    _this.CertificateCategoryMappingService.unlinkCategory(_this.unlinkedCategoryEntity)
                        .then(function (data) {
                        $("#unlinkedCategory_popup").modal('hide');
                        var index = _this.unlinkedCategoryList.indexOf(CategoryId);
                        if (index != -1) {
                            _this.unlinkedCategoryList.splice(index, 1);
                        }
                        // var categorydata = { 'CategoryId': categoryData.CategoryId, 'CategoryName': categoryData.CategoryName, 'flag': 0, 'AssessmentItems': categoryData.isdisabled }
                        // this.categoryList.push(categorydata);
                        _this.globals.isLoading = false;
                        swal({
                            type: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.type,
                            title: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.title,
                            text: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        window.location.href = 'admin/certificate/list';
                    }, function (error) {
                        _this.globals.isLoading = false;
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
            });
        }
    };
    CertificateListComponent.prototype.deleteCertificate = function (certificate) {
        var _this = this;
        debugger;
        swal({
            title: this.globals.adminTranslationText.certificate.list.alerts.deleteConfirm.title,
            text: this.globals.adminTranslationText.certificate.list.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.adminTranslationText.certificate.list.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                certificate.UserId = _this.globals.authData.UserId;
                certificate.Id = certificate.CertificateId;
                certificate.TableName = 'tblmstcertificates';
                certificate.FieldName = 'CertificateId';
                certificate.Module = 'Certificate';
                certificate.ModuleId = 2;
                certificate.ActivityText = 'Delete Certificate';
                certificate.TableName2 = 'tblcertificatedocuments';
                certificate.FieldName2 = 'CertificateId';
                certificate.Module2 = 'Certificate Documents';
                certificate.ModuleId2 = 2;
                certificate.ActivityText2 = 'Delete Certificate Documents';
                if (certificate.linked > 0) {
                    certificate.TableName1 = 'tblmstcertificateassessmentmapping';
                    certificate.FieldName1 = 'CertificateId';
                    certificate.Module1 = 'Certificate Assessment Mapping';
                    certificate.ModuleId1 = 2;
                    certificate.ActivityText1 = 'Delete Certificate Mapping';
                }
                _this.globals.isLoading = true;
                debugger;
                _this.CertificateService.deleteItem(certificate)
                    .then(function (data) {
                    _this.getCertificateData();
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.certificate.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.certificate.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.certificate.list.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
                    _this.globals.isLoading = true;
                });
            }
        });
    };
    CertificateListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        if (i) {
            changeEntity.IsActive = 1;
        }
        else {
            changeEntity.IsActive = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.CertificateId;
        changeEntity.TableName = 'tblmstcertificates';
        changeEntity.FieldName = 'CertificateId';
        changeEntity.Module = 'Certificate';
        changeEntity.ModuleId = 2;
        if (changeEntity.IsActive == 1) {
            changeEntity.ActivityText = "Certificate Activated";
        }
        else {
            changeEntity.ActivityText = "Certificate Deactivated";
        }
        this.CommonService.isActiveChange(changeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsActive == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.certificate.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.certificate.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.certificate.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.certificate.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.certificate.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.certificate.list.alerts.activeSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
            _this.globals.isLoading = true;
        });
    };
    CertificateListComponent.prototype.itemDisabled = function (itemArgs) {
        return itemArgs.dataItem.IsMapped != '0';
    };
    CertificateListComponent.prototype.itemDisabled1 = function (itemArgs) {
        return itemArgs.dataItem.AssessmentItems == '0';
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], CertificateListComponent.prototype, "dataBinding", void 0);
    CertificateListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-certificate-list',
            templateUrl: './certificate-list.component.html',
            styleUrls: ['./certificate-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            CertificateService, CommonService, CertificateCategoryMappingService])
    ], CertificateListComponent);
    return CertificateListComponent;
}());
export { CertificateListComponent };
//# sourceMappingURL=certificate-list.component.js.map