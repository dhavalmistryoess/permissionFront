import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
var CertificateCategoryMappingComponent = /** @class */ (function () {
    function CertificateCategoryMappingComponent(globals, router, route, CertificateCategoryMappingService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CertificateCategoryMappingService = CertificateCategoryMappingService;
    }
    CertificateCategoryMappingComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        this.certificateCategoryMappingEntity = [];
        this.categoryList = [];
        this.linkingCategoryList = [];
        this.certificateCategoryMappingListEntity = {};
        this.certificateCategoryMappingListEntity.CategoryId = '';
        var id = this.route.snapshot.paramMap.get('id'); //certificateId
        var categoryId = this.route.snapshot.paramMap.get('categoryid');
        this.itmeAssessmentCountError = false;
        this.noneScoreItemCountError = false;
        this.noneScoreItemCountError1 = false;
        this.practiceNoneScoreItemCountError = false;
        this.practiceNoneScoreItemCountError1 = false;
        this.itmePracticeCountError = false;
        this.CertificateCategoryMappingService.getAllDefault()
            .then(function (data) {
            debugger;
            _this.certificateList = data['Certificates'];
            // this.categoryList = data['Categories'];
            var categoryeSelect = {
                CategoryId: '',
                CategoryName: _this.globals.adminTranslationText.certificateCategoryMapping.list.category.select,
                Value: ""
            };
            _this.categoryList.push(categoryeSelect);
            _this.categoryList = _this.categoryList.concat(data['Categories']);
            _this.CertificateCategoryMappingService.getByCertificateId(id)
                .then(function (data) {
                debugger;
                //this.linkingCategoryList = data;
                var data1;
                data1 = data;
                _this.linkingCategoryList = _this.linkingCategoryList.concat(data1);
                //console.log(this.linkingCategoryList);
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
                swal({
                    type: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.type,
                    title: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.title,
                    text: _this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            });
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
            $('select').selectpicker();
        }, 5000);
        if (id && categoryId) {
            id = window.atob(id);
            categoryId = window.atob(categoryId);
            this.globals.isLoading = true;
            this.CertificateCategoryMappingService.getById(id, categoryId)
                .then(function (data) {
                _this.mappingDetailsData = data['CertificateDetails'];
                console.log(data);
                if (_this.mappingDetailsData.IsActive == 0) {
                    _this.mappingDetailsData.IsActive = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.IsActive = 1;
                }
                if (_this.mappingDetailsData.PracticeIsActive == 0) {
                    _this.mappingDetailsData.PracticeIsActive = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.PracticeIsActive = 1;
                }
                if (_this.mappingDetailsData.IsMandatoryCategoryAssessment == 0) {
                    _this.mappingDetailsData.IsMandatoryCategoryAssessment = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.IsMandatoryCategoryAssessment = 1;
                }
                if (_this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment == 0) {
                    _this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.PracticeIsMandatoryCategoryAssessment = 1;
                }
                if (_this.mappingDetailsData.PracticeTotalItems == 0 || _this.mappingDetailsData.PracticeTotalItems == null) {
                    _this.mappingDetailsData.HasPractice = 0;
                    $("#has_practice_test").hide();
                    $("#no_practice_test").hide();
                }
                else {
                    _this.mappingDetailsData.HasPractice = 1;
                    $("#has_practice_test").show();
                    $("#no_practice_test").hide();
                }
                _this.practiceTestReadOnly();
                _this.globals.isLoading = false;
            }, function (error) {
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                // this.router.navigate(['/pagenotfound']);
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.certificateCategoryMappingEntity = [];
            this.certificateCategoryMappingEntity.CertificateAssessmentMappingId = 0;
            this.certificateCategoryMappingEntity.CertificateId = 0;
            this.certificateCategoryMappingEntity.IsActive = 1;
        }
    };
    CertificateCategoryMappingComponent.prototype.totalAssessmentItemCount = function () {
        debugger;
        var AssessmentScoreItems1 = parseInt($("#ScoreItems").val());
        var totalItems1 = parseInt(this.mappingDetailsData.AssessmentScoreItems);
        var str = $("#ScoreItems").val().split(0);
        if (str[0] == 0)
            this.itmeAssessmentCountError = false;
        else {
            if (AssessmentScoreItems1 > totalItems1) {
                this.itmeAssessmentCountError = true;
            }
            else {
                this.itmeAssessmentCountError = false;
            }
        }
        this.noneScoreItemsCount();
    };
    CertificateCategoryMappingComponent.prototype.noneScoreItemsCount = function () {
        debugger;
        var NoneScoreItems1 = parseInt($("#NoneScoreItems").val());
        var totalItems1 = parseInt(this.mappingDetailsData.ScoreItems);
        var totalnoscoreitem = parseInt(this.mappingDetailsData.noScoreItems);
        var str = $("#ScoreItems").val().split(0);
        if (NoneScoreItems1 > totalnoscoreitem) {
            this.noneScoreItemCountError = true;
            this.noneScoreItemCountError1 = false;
        }
        else {
            this.noneScoreItemCountError = false;
            if (NoneScoreItems1 >= totalItems1) {
                this.noneScoreItemCountError1 = true;
            }
            else {
                this.noneScoreItemCountError1 = false;
            }
        }
        $("#AssessmentTotalItems").val(totalItems1 + NoneScoreItems1);
        this.mappingDetailsData.AssessmentTotalItems = totalItems1 + NoneScoreItems1;
    };
    CertificateCategoryMappingComponent.prototype.practiceNoneScoreItemsCount = function () {
        debugger;
        var PracticeNoneScoreItems = parseInt($("#PracticeNoneScoreItems").val());
        var totalItems1 = parseInt(this.mappingDetailsData.PracticeScoreItems);
        var totalnoscoreitem = parseInt(this.mappingDetailsData.noScorePracticeItems);
        var str = $("#PracticeScoreItems").val().split(0);
        if (PracticeNoneScoreItems > totalnoscoreitem) {
            this.practiceNoneScoreItemCountError = true;
            this.practiceNoneScoreItemCountError1 = false;
        }
        else {
            this.practiceNoneScoreItemCountError = false;
            if (PracticeNoneScoreItems >= totalItems1) {
                this.practiceNoneScoreItemCountError1 = true;
            }
            else {
                this.practiceNoneScoreItemCountError1 = false;
            }
        }
        $("#PracticeTotalItems").val(totalItems1 + PracticeNoneScoreItems);
        this.mappingDetailsData.PracticeTotalItems = totalItems1 + PracticeNoneScoreItems;
    };
    CertificateCategoryMappingComponent.prototype.totalPracticeItemCount = function () {
        debugger;
        var PracticeScoreItems = parseInt($("#PracticeScoreItems").val());
        var totalItems1 = parseInt(this.mappingDetailsData.PracticeTestScoreItems);
        var str = $("#PracticeScoreItems").val().split(0);
        if (str[0] == 0)
            this.itmePracticeCountError = false;
        else {
            if (PracticeScoreItems > totalItems1) {
                this.itmePracticeCountError = true;
            }
            else {
                this.itmePracticeCountError = false;
            }
        }
        this.practiceNoneScoreItemsCount();
    };
    CertificateCategoryMappingComponent.prototype.passingPercentageCheck = function (value) {
        if (value == 0) {
            var passingPercentageCheck = parseInt($("#PassingPercentage").val());
        }
        else {
            var passingPercentageCheck = parseInt($("#PracticePassingPercentage").val());
        }
        //s.substr(0,1)
        if (passingPercentageCheck > 0 && (passingPercentageCheck < 35 || passingPercentageCheck > 100)) {
            if (value == 0)
                this.passingAssessmentPercentageError = true;
            else
                this.passingPracticePercentageError = true;
        }
        else {
            if (value == 0)
                this.passingAssessmentPercentageError = false;
            else
                this.passingPracticePercentageError = false;
        }
    };
    CertificateCategoryMappingComponent.prototype.categoryChange = function (CategoryId, CertificateId) {
        var _this = this;
        debugger;
        if (CategoryId > 0) {
            this.submitted = false;
            this.CertificateCategoryMappingService.getById(CertificateId, CategoryId)
                .then(function (data) {
                _this.mappingDetailsData = data['CertificateDetails'];
                if (_this.mappingDetailsData.IsActive == 0) {
                    _this.mappingDetailsData.IsActive = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.IsActive = 1;
                }
                if (_this.mappingDetailsData.PracticeIsActive == 0) {
                    _this.mappingDetailsData.PracticeIsActive = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.PracticeIsActive = 1;
                }
                if (_this.mappingDetailsData.IsMandatoryCategoryAssessment == 0) {
                    _this.mappingDetailsData.IsMandatoryCategoryAssessment = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.IsMandatoryCategoryAssessment = 1;
                }
                if (_this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment == 0) {
                    _this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 0;
                }
                else {
                    _this.certificateCategoryMappingEntity.PracticeIsMandatoryCategoryAssessment = 1;
                }
                if (_this.mappingDetailsData.PracticeTotalItems == 0 || _this.mappingDetailsData.PracticeTotalItems == null) {
                    _this.mappingDetailsData.HasPractice = 0;
                    $("#has_practice_test").hide();
                    $("#no_practice_test").hide();
                }
                else {
                    _this.mappingDetailsData.HasPractice = 1;
                    $("#has_practice_test").show();
                    $("#no_practice_test").hide();
                }
                _this.practiceTestReadOnly();
                _this.globals.isLoading = false;
            }, function (error) {
                _this.globals.isLoading = false;
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
    CertificateCategoryMappingComponent.prototype.showPracticeForm = function () {
        var _this = this;
        console.log(this.mappingDetailsData.HasPractice);
        if (this.mappingDetailsData.IsActive == false) {
            swal({
                type: "warning",
                title: "Active Category",
                text: "If you want to active practice test then please active this category in assessment",
                showConfirmButton: false,
                timer: 4000
            });
        }
        // else{
        //   if(this.mappingDetailsData.HasPractice == true)
        //   {
        //     if(this.mappingDetailsData.CertificatePracticeTestMappingId!=null)
        //     {
        //       $("#has_practice_test").show();
        //     }
        //     else{
        //       $("#no_practice_test").show();
        //     }
        //   }
        //   else
        //   {
        //     if(this.mappingDetailsData.CertificatePracticeTestMappingId!=null)
        //     {
        //       $("#has_practice_test").hide();
        //     }
        //     else{
        //       $("#no_practice_test").hide();
        //     }
        //   }
        // }
        setTimeout(function () {
            _this.practiceTestReadOnly();
        }, 100);
    };
    CertificateCategoryMappingComponent.prototype.practiceTestReadOnly = function () {
        if (this.mappingDetailsData.IsActive == true) {
            $("#PracticeTotalItems").removeAttr('disabled');
            $("#PracticeCategoryAssessmentTime").removeAttr('disabled');
            $("#PracticeNoneScoreItems").removeAttr('disabled');
            $("#PracticePassingPercentage").removeAttr('disabled');
            //$("#PracticeIsMandatoryCategoryAssessment").removeAttr('disabled');
            $("#PracticeIsActive").removeAttr('disabled');
        }
        else {
            $("#PracticeTotalItems").attr('disabled', true);
            $("#PracticeCategoryAssessmentTime").attr('disabled', true);
            $("#PracticeNoneScoreItems").attr('disabled', true);
            $("#PracticePassingPercentage").attr('disabled', true);
            //$("#PracticeIsMandatoryCategoryAssessment").attr('disabled',true);
            $("#PracticeIsActive").attr('disabled', true);
            this.mappingDetailsData.PracticeIsActive = 0;
            this.mappingDetailsData.HasPractice = 0;
        }
    };
    CertificateCategoryMappingComponent.prototype.addUpdate = function (certificateCategoryMappingForm) {
        var _this = this;
        debugger;
        var id = window.atob(this.route.snapshot.paramMap.get('id')); //certificateId
        var categoryId = window.atob(this.route.snapshot.paramMap.get('categoryid'));
        if (id && categoryId) {
            if (this.mappingDetailsData.ScoreItems != '') {
                if (this.mappingDetailsData.IsMandatoryCategoryAssessment == true) {
                    this.mappingDetailsData.IsMandatoryCategoryAssessment = 1;
                }
                else {
                    this.mappingDetailsData.IsMandatoryCategoryAssessment = 0;
                }
                if (this.mappingDetailsData.IsActive == true) {
                    this.mappingDetailsData.IsActive = 1;
                }
                else {
                    this.mappingDetailsData.IsActive = 0;
                }
                if (this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment == true) {
                    this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 1;
                }
                else {
                    this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 0;
                }
                if (this.mappingDetailsData.PracticeIsActive == true) {
                    this.mappingDetailsData.PracticeIsActive = 1;
                }
                else {
                    this.mappingDetailsData.PracticeIsActive = 0;
                }
                this.submitted = true;
            }
            else {
                this.submitted = false;
            }
        }
        else {
            this.submitted = true;
        }
        var AssessmentDetails = {
            "CertificateAssessmentMappingId": this.mappingDetailsData.CertificateAssessmentMappingId,
            "AssessmentTotalItems": this.mappingDetailsData.AssessmentTotalItems,
            "CategoryAssessmentTime": this.mappingDetailsData.CategoryAssessmentTime,
            "ScoreItems": this.mappingDetailsData.ScoreItems,
            "NoneScoreItems": this.mappingDetailsData.NoneScoreItems,
            "PassingPercentage": this.mappingDetailsData.PassingPercentage,
            "IsMandatoryCategoryAssessment": this.mappingDetailsData.IsMandatoryCategoryAssessment,
            "IsActive": this.mappingDetailsData.IsActive
        };
        var practicedata = '';
        if (this.mappingDetailsData.PracticeExamAttempts > 0) {
            if (this.mappingDetailsData.PracticeTestItems != 0) {
                if (this.mappingDetailsData.CertificatePracticeTestMappingId > 0 && this.mappingDetailsData.CertificatePracticeTestMappingId != null) {
                    practicedata = {
                        "CertificatePracticeTestMappingId": this.mappingDetailsData.CertificatePracticeTestMappingId,
                        "PracticeTotalItems": this.mappingDetailsData.PracticeTotalItems,
                        "PracticeCategoryAssessmentTime": this.mappingDetailsData.PracticeCategoryAssessmentTime,
                        "PracticeScoreItems": this.mappingDetailsData.PracticeScoreItems,
                        "PracticeNoneScoreItems": this.mappingDetailsData.PracticeNoneScoreItems,
                        "PracticePassingPercentage": this.mappingDetailsData.PracticePassingPercentage,
                        "PracticeIsMandatoryCategoryAssessment": this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment,
                        "PracticeIsActive": this.mappingDetailsData.PracticeIsActive
                    };
                }
                else {
                    practicedata = {
                        "CertificatePracticeTestMappingId": 0,
                        "PracticeTotalItems": this.mappingDetailsData.PracticeTotalItems,
                        "PracticeCategoryAssessmentTime": this.mappingDetailsData.PracticeCategoryAssessmentTime,
                        "PracticeScoreItems": this.mappingDetailsData.PracticeScoreItems,
                        "PracticeNoneScoreItems": this.mappingDetailsData.PracticeNoneScoreItems,
                        "PracticePassingPercentage": this.mappingDetailsData.PracticePassingPercentage,
                        "PracticeIsMandatoryCategoryAssessment": this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment,
                        "PracticeIsActive": this.mappingDetailsData.PracticeIsActive
                    };
                }
            }
        }
        this.certificateCategoryMappingEntity = {
            "CertificateId": id,
            "CategoryId": this.mappingDetailsData.CategoryId,
            "MappingDetails": [
                {
                    "AssessmentDetails": AssessmentDetails,
                    "PracticeTestDetails": practicedata
                }
            ],
            "UserId": this.globals.authData.UserId
        };
        console.log(this.certificateCategoryMappingEntity);
        if (certificateCategoryMappingForm.valid && !this.itmeAssessmentCountError && !this.passingAssessmentPercentageError && !this.passingPracticePercentageError && !this.itmePracticeCountError) {
            debugger;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.CertificateCategoryMappingService.addUpdate(this.certificateCategoryMappingEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.certificateCategoryMappingEntity = {};
                certificateCategoryMappingForm.form.markAsPristine();
                if (id && categoryId) {
                    swal({
                        type: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.update.type,
                        title: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.update.title,
                        text: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                        text: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                var certificateid = window.atob(_this.route.snapshot.paramMap.get('id'));
                var categoryid = window.atob(_this.route.snapshot.paramMap.get('categoryid'));
                //flag value 0 means redirect from certificte-list & 1 means redirect from category-list
                var flag = window.atob(_this.route.snapshot.paramMap.get('flag'));
                if (flag == "0") {
                    _this.router.navigate(['/admin/certificate/list']);
                }
                else if (flag == "1") {
                    _this.router.navigate(['/admin/category/list']);
                }
                else {
                    var url = '/admin/certificate-category-mapping/edit/' + window.btoa(certificateid) + '/' + window.btoa(categoryid);
                    //window.location.href = url;
                    _this.router.navigate(['/admin/certificate-category-mapping/list/' + window.btoa(certificateid)]);
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
                // this.globals.pageNotfound(error.error.code);
            });
        }
    };
    CertificateCategoryMappingComponent.prototype.categoryLinking = function (categoryLinkingForm) {
        var _this = this;
        debugger;
        var CategoryId = this.certificateCategoryMappingListEntity.CategoryId;
        var CertificateId = window.atob(this.route.snapshot.paramMap.get('id')); //certificateId;
        for (var k = 0; k < this.certificateList.length; k++) {
            if (CertificateId == this.certificateList[k].CertificateId) {
                this.certificateCategoryMappingListEntity.PracticeExamAttempts = this.certificateList[k].PracticeExamAttempts;
            }
        }
        var practiceItem = 0;
        for (var i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].CategoryId == CategoryId) {
                practiceItem = this.categoryList[i].PracticeTestItems;
            }
        }
        this.submitted1 = true;
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
            swal({
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.text,
                icon: "warning",
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: "No"
            })
                .then(function (result) {
                if (result.value) {
                    _this.CertificateCategoryMappingService.addUpdate(_this.certificateCategoryMappingListEntity)
                        .then(function (data) {
                        _this.globals.isLoading = false;
                        //this.btn_disable = false;
                        _this.submitted1 = false;
                        _this.certificateCategoryMappingListEntity = {};
                        //  alert(window.btoa(CertificateId).replace(/=/g,"%3D"));
                        //  alert(window.btoa(CategoryId).replace(/=/g,"%3D"));
                        var certificateid = window.btoa(CertificateId).replace(/=/g, "%3D");
                        var categoryid = window.btoa(CategoryId).replace(/=/g, "%3D");
                        window.location.href = '/admin/certificate-category-mapping/edit/' + certificateid + '/' + categoryid;
                        categoryLinkingForm.form.markAsPristine();
                        swal({
                            type: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                            title: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                            text: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                            showConfirmButton: false,
                            timer: 2000
                        });
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
                    _this.CertificateCategoryMappingService.addUpdate(_this.certificateCategoryMappingListEntity)
                        .then(function (data) {
                        _this.globals.isLoading = false;
                        //this.btn_disable = false;
                        _this.submitted1 = false;
                        _this.certificateCategoryMappingListEntity = {};
                        categoryLinkingForm.form.markAsPristine();
                        swal({
                            type: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                            title: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                            text: _this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        var certificateid = window.atob(_this.route.snapshot.paramMap.get('id'));
                        _this.router.navigate(['/admin/certificate-category-mapping/list/' + window.btoa(certificateid)]);
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
    };
    CertificateCategoryMappingComponent.prototype.itemDisabled = function (itemArgs) {
        return itemArgs.dataItem.AssessmentItems == '0';
    };
    CertificateCategoryMappingComponent = tslib_1.__decorate([
        Component({
            selector: 'app-certificate-category-mapping',
            templateUrl: './certificate-category-mapping.component.html',
            styleUrls: ['./certificate-category-mapping.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, CertificateCategoryMappingService])
    ], CertificateCategoryMappingComponent);
    return CertificateCategoryMappingComponent;
}());
export { CertificateCategoryMappingComponent };
//# sourceMappingURL=certificate-category-mapping.component.js.map