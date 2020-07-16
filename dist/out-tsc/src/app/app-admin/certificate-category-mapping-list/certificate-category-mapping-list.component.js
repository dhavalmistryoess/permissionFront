import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
import { CommonService } from '../services/common.service';
var CertificateCategoryMappingListComponent = /** @class */ (function () {
    function CertificateCategoryMappingListComponent(globals, router, route, CertificateCategoryMappingService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CertificateCategoryMappingService = CertificateCategoryMappingService;
        this.CommonService = CommonService;
    }
    CertificateCategoryMappingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.submitted = false;
        this.certificateCategoryMappingListEntity = {};
        this.linkingCategoryList = {};
        this.certificateList = [];
        this.categoryList = [];
        this.activeEntity = {};
        $("#newLinking").hide();
        $("#categoryDisplay").hide();
        this.CertificateCategoryMappingService.getAllDefault()
            .then(function (data) {
            debugger;
            // this.certificateList = data['Certificates'];
            //this.categoryList = data['Categories'];
            var certificateSelect = {
                CertificateId: '',
                CertificateName: _this.globals.adminTranslationText.certificateCategoryMapping.form.certificate.select,
                Value: ""
            };
            _this.certificateList.push(certificateSelect);
            _this.certificateList = _this.certificateList.concat(data['Certificates']);
            var categoryeSelect = {
                CategoryId: '',
                CategoryName: _this.globals.adminTranslationText.certificateCategoryMapping.list.category.select,
                Value: ""
            };
            _this.categoryList.push(categoryeSelect);
            _this.categoryList = _this.categoryList.concat(data['Categories']);
            var certificateid = window.atob(_this.route.snapshot.paramMap.get('certificateid'));
            console.log(certificateid);
            _this.certificateCategoryMappingListEntity.CertificateId = certificateid;
            _this.certificateChange(certificateid);
            // this.categoryList = this.categoryList.filter( category => {
            //   if(category.isdisabled == 0)
            //     return this.categoryList.dis;
            // });
            _this.globals.isLoading = false;
            console.log(_this.categoryList);
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
        setTimeout(function () {
            $('select').selectpicker();
        }, 5000);
        this.certificateCategoryMappingListEntity.CertificateId = '';
        this.certificateCategoryMappingListEntity.CategoryId = '';
    };
    CertificateCategoryMappingListComponent.prototype.editCategory = function (CertificateId, CategoryId) {
        this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId)]);
    };
    CertificateCategoryMappingListComponent.prototype.certificateChange = function (CertificateId) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        for (var k = 0; k < this.certificateList.length; k++) {
            if (CertificateId == this.certificateList[k].CertificateId) {
                this.certificateCategoryMappingListEntity.certificateName = this.certificateList[k].CertificateName;
                this.certificateCategoryMappingListEntity.PracticeExamAttempts = this.certificateList[k].PracticeExamAttempts;
            }
        }
        if (this.certificateCategoryMappingListEntity.CertificateId == '') {
            this.CertificateError = true;
        }
        else {
            this.CertificateError = false;
        }
        if (this.CertificateError) {
            this.globals.isLoading = false;
        }
        else {
            this.CertificateCategoryMappingService.getByCertificateId(CertificateId)
                .then(function (data) {
                _this.linkingCategoryList = data;
                console.log(_this.linkingCategoryList);
                for (var i = 0; i < _this.linkingCategoryList.length; i++) {
                    if (_this.linkingCategoryList[i].CategoryId > 0) {
                        for (var j = 0; j < _this.categoryList.length; j++) {
                            if (_this.linkingCategoryList[i].CategoryId == _this.categoryList[j].CategoryId) {
                                _this.categoryList[j].flag = 1;
                            }
                        }
                    }
                }
                _this.categoryList = _this.categoryList.filter(function (category) {
                    return category.flag == 0;
                });
                console.log(_this.linkingCategoryList);
                setTimeout(function () {
                    $('#CategoryId').selectpicker('refresh');
                }, 1000);
                $("#noCertificate").hide();
                $("#newLinking").hide();
                $("#categoryDisplay").show();
                _this.globals.isLoading = false;
            }, function (error) {
                _this.globals.isLoading = false;
                _this.CertificateCategoryMappingService.getAllDefault()
                    .then(function (data) {
                    debugger;
                    //this.certificateList = data['Certificates'];
                    _this.categoryList = data['Categories'];
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
                setTimeout(function () {
                    $('#CategoryId').selectpicker('refresh');
                }, 5000);
                $("#noCertificate").hide();
                $("#newLinking").show();
                $("#categoryDisplay").hide();
                swal({
                    type: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.type,
                    title: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.title,
                    text: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            });
        }
    };
    CertificateCategoryMappingListComponent.prototype.certificatechange = function () {
        this.CertificateError = false;
    };
    CertificateCategoryMappingListComponent.prototype.linknewcategory = function () {
        this.submitted = false;
        //this.certificateCategoryMappingListEntity.CategoryId=0;
        setTimeout(function () {
            $("#link_new").modal('show');
            $('select').selectpicker("refresh");
        }, 100);
    };
    CertificateCategoryMappingListComponent.prototype.categoryLinking = function (categoryLinkingForm) {
        var _this = this;
        debugger;
        var CategoryId = this.certificateCategoryMappingListEntity.CategoryId;
        var CertificateId = this.certificateCategoryMappingListEntity.CertificateId;
        var practiceItem = 0;
        for (var i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].CategoryId == CategoryId) {
                practiceItem = this.categoryList[i].PracticeTestItems;
            }
        }
        this.submitted = true;
        if (categoryLinkingForm.valid) {
            var practicedata = '';
            if (this.certificateCategoryMappingListEntity.PracticeExamAttempts > 0) {
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
                        _this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId)]);
                        // this.router.navigate(['/admin/certificate-category-mapping/edit/' + CertificateId + '/' + CategoryId]);
                    }, function (error) {
                        _this.globals.isLoading = false;
                        //this.btn_disable = false;
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
                        _this.CertificateCategoryMappingService.getByCertificateId(CertificateId)
                            .then(function (data) {
                            _this.linkingCategoryList = data;
                            console.log(_this.linkingCategoryList);
                            for (var k = 0; k < _this.certificateList.length; k++) {
                                if (CertificateId == _this.certificateList[k].CertificateId) {
                                    _this.certificateCategoryMappingListEntity.certificateName = _this.certificateList[k].CertificateName;
                                    _this.certificateCategoryMappingListEntity.PracticeExamAttempts = _this.certificateList[k].PracticeExamAttempts;
                                }
                            }
                            _this.certificateCategoryMappingListEntity.CategoryId = '';
                            for (var i = 0; i < _this.linkingCategoryList.length; i++) {
                                if (_this.linkingCategoryList[i].CategoryId > 0) {
                                    for (var j = 0; j < _this.categoryList.length; j++) {
                                        if (_this.linkingCategoryList[i].CategoryId == _this.categoryList[j].CategoryId) {
                                            _this.categoryList[j].flag = 1;
                                        }
                                    }
                                }
                            }
                            _this.categoryList = _this.categoryList.filter(function (category) {
                                return category.flag == 0;
                            });
                            _this.globals.isLoading = false;
                        }, function (error) {
                            _this.globals.isLoading = false;
                            // swal({
                            //   type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.type,
                            //   title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.title,
                            //   text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.text,
                            //   showConfirmButton: false,
                            //   timer: 4000
                            // })
                            _this.globals.pageNotfound(error.error.code);
                        });
                        _this.router.navigate(['/admin/certificate-category-mapping/list/']);
                    }, function (error) {
                        _this.globals.isLoading = false;
                        //this.btn_disable = false;
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
                $('#link_new').modal('hide');
            });
        }
        else {
        }
    };
    CertificateCategoryMappingListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        debugger;
        if (changeEntity.AssessmentTotalItems == 0) {
            swal({
                type: "warning",
                title: "Fill Data",
                text: "Please fill the data",
                showConfirmButton: false,
                timer: 4000
            });
            //$('#active' + i).prop("checked", false);
            setTimeout(function () {
                $('#IsActive' + i).removeClass('k-widget k-switch k-switch-on');
                $('#IsActive' + i).addClass('k-widget k-switch k-switch-off');
            }, 100);
        }
        else {
            if (changeEntity.IsActive == 1) {
                changeEntity.IsActive = 0;
            }
            else {
                changeEntity.IsActive = 1;
            }
            //  alert(changeEntity.IsActive);
            this.globals.isLoading = true;
            changeEntity.UpdatedBy = this.globals.authData.UserId;
            changeEntity.Id = changeEntity.CertificateAssessmentMappingId;
            changeEntity.TableName = 'tblmstcertificateassessmentmapping';
            changeEntity.FieldName = 'CertificateAssessmentMappingId';
            changeEntity.Module = 'AssessmentMapping';
            changeEntity.ModuleId = 2;
            changeEntity.Id2 = '';
            changeEntity.TableName2 = '';
            changeEntity.FieldName2 = '';
            if (changeEntity.IsActive == 1) {
                if (changeEntity.PracticeTotalItems != 0) {
                    changeEntity.Id2 = changeEntity.CertificatePracticeTestMappingId;
                    changeEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
                    changeEntity.FieldName2 = 'CertificatePracticeTestMappingId';
                }
            }
            else {
                changeEntity.Id2 = changeEntity.CertificatePracticeTestMappingId;
                changeEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
                changeEntity.FieldName2 = 'CertificatePracticeTestMappingId';
            }
            if (changeEntity.IsActive == 1) {
                changeEntity.ActivityText = "AssessmentMapping Activated";
            }
            else {
                changeEntity.ActivityText = "AssessmentMapping Deactivated";
            }
            this.CertificateCategoryMappingService.isActiveChange(changeEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                var index = _this.linkingCategoryList.indexOf(changeEntity);
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
                // if (this.certificateList[i].IsActive == 1) {
                //   $('#active' + i).prop("checked", true);
                // }
                // else {
                //   $('#active' + i).prop("checked", false);
                // }
            });
        }
    };
    CertificateCategoryMappingListComponent.prototype.unlinkCategory = function (categoryData) {
        var _this = this;
        debugger;
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
                categoryData.UserId = _this.globals.authData.UserId;
                categoryData.Id = categoryData.CertificateAssessmentMappingId;
                categoryData.TableName = 'tblmstcertificateassessmentmapping';
                categoryData.FieldName = 'CertificateAssessmentMappingId';
                categoryData.Module = 'AssessmentMapping';
                categoryData.ModuleId = 2;
                categoryData.Id2 = categoryData.CertificatePracticeTestMappingId;
                categoryData.TableName2 = 'tblmstcertificatepracticetestmapping';
                categoryData.FieldName2 = 'CertificatePracticeTestMappingId';
                _this.CertificateCategoryMappingService.unlinkCategory(categoryData)
                    .then(function (data) {
                    var index = _this.linkingCategoryList.indexOf(categoryData);
                    if (index != -1) {
                        _this.linkingCategoryList.splice(index, 1);
                    }
                    var categorydata = { 'CategoryId': categoryData.CategoryId, 'CategoryName': categoryData.CategoryName, 'flag': 0, 'AssessmentItems': categoryData.isdisabled };
                    _this.categoryList.push(categorydata);
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
            }
        });
    };
    CertificateCategoryMappingListComponent.prototype.itemDisabled = function (itemArgs) {
        return itemArgs.dataItem.AssessmentItems == '0';
    };
    CertificateCategoryMappingListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-certificate-category-mapping-list',
            templateUrl: './certificate-category-mapping-list.component.html',
            styleUrls: ['./certificate-category-mapping-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, CertificateCategoryMappingService,
            CommonService])
    ], CertificateCategoryMappingListComponent);
    return CertificateCategoryMappingListComponent;
}());
export { CertificateCategoryMappingListComponent };
//# sourceMappingURL=certificate-category-mapping-list.component.js.map