import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { DashboardService } from '../services/dashboard.service';
import { ProfileService } from '../services/profile.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
var CertificateDetailComponent = /** @class */ (function () {
    function CertificateDetailComponent(router, globals, route, DashboardService, elem, ProfileService) {
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.DashboardService = DashboardService;
        this.elem = elem;
        this.ProfileService = ProfileService;
    }
    CertificateDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            // Add minus icon for collapse element which is open by default
            $(".collapse.show").each(function () {
                $(this).prev(".card-header").find(".plus_minus_acc").addClass("fa-minus").removeClass("fa-plus");
            });
            // Toggle plus minus icon on show hide of collapse element
            $(".collapse").on('show.bs.collapse', function () {
                $(this).prev(".card-header").find(".plus_minus_acc").removeClass("fa-plus").addClass("fa-minus");
            }).on('hide.bs.collapse', function () {
                $(this).prev(".card-header").find(".plus_minus_acc").removeClass("fa-minus").addClass("fa-plus");
            });
        }, 500);
        this.schedulePopup = false;
        this.reSchedulePopup = false;
        this.disabledDates = [new Date()];
        this.uploadDocumentPopup = false;
        this.globals.isLoading = true;
        setTimeout(function () {
            $('select').selectpicker();
            $('.file_upload input[type="file"]').change(function (e) {
                var fileName = e.target.files[0].name;
                $('.file_upload input[type="text"]').val(fileName);
            });
        }, 5000);
        $("#new_upload_file").change(function (event) {
            $('.uploaded_doc_block').show();
            $('.new_block').hide();
            readURLedit(this);
        });
        $('.uploaded_doc_block').hide();
        function readURLedit(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var filename = $("#new_upload_file").val();
                filename = filename.substring(filename.lastIndexOf('\\') + 1);
                reader.onload = function (e) {
                    $('#uploaded_doc').attr('src', event.target["result"]);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        var schedule = window.atob(this.route.snapshot.paramMap.get('schedule'));
        if (schedule == 'schedule') {
            $("#assessment-list-tab").addClass("active");
            $("#category-list-tab").removeClass("active");
            $("#assessment-list").addClass("show active");
            $("#category-list").removeClass("show active");
        }
        this.certificateDetail = {};
        this.categoryList = {};
        this.practiceTestList = {};
        this.certificateDocuments = {};
        this.scheduleEntity = {};
        this.scheduleAssessmentEntity = {};
        this.scheduleAssessmentList = {};
        this.documentEntity = {};
        this.Appointmentletterlist = {};
        this.documentEntity.CertificateDocumentId = '';
        this.viewResultStatus = false;
        this.cancelAssessmentEntity = {};
        var userCertificateId = this.route.snapshot.paramMap.get('usercertificateid');
        var todaysdate = this.globals.todaysdate;
        this.renewButtonDisplay = false;
        this.mandatoryDocumentsList = [];
        this.optionalDocumentsList = [];
        this.certificatedocumentEntity = {};
        this.verificationRequestEntity = {};
        this.assessment_subassessment_btn_display = false;
        this.certificatedocument = [];
        this.documentList = [];
        this.certificateDetail.AssessmentDetail = [];
        this.uploadedMandatoryDocumentsCount = 0;
        this.buyNewPracticeTestEntity = {};
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() + 1);
        this.minDate.setHours(0, 0, 0, 0);
        if (userCertificateId) {
            userCertificateId = window.atob(userCertificateId);
            this.DashboardService.getCertificateDetailsById(userCertificateId)
                .then(function (data) {
                debugger;
                _this.globals.isLoading = false;
                console.log(data);
                _this.certificateDetail = data['CertificateDetails'][0];
                //alert(this.certificateDetail.UserCertificateId);
                _this.certificateDetail.UserCertificateId = window.btoa(_this.certificateDetail.UserCertificateId);
                _this.categoryList = data['CertificateDetails'][0]['Categories'];
                _this.practiceTestList = data['CertificateDetails'][0]['TotalPracticeTest'];
                _this.scheduleAssessmentList = data['CertificateDetails'][0]['TotalScheduleAssessment'];
                _this.mandatoryDocumentsList = data['CertificateDetails'][0]['MandatoryDocuments'];
                _this.optionalDocumentsList = data['CertificateDetails'][0]['OptionalDocuments'];
                _this.Appointmentletterlist = data['Appointmentletter'];
                _this.certificateDetail.mandatoryDocumentsCount = 1;
                console.log(_this.practiceTestList);
                console.log(_this.certificateDetail.AssessmentDetail);
                _this.PracticeTestAttempts = parseInt(_this.certificateDetail.PracticeTestAttempts);
                _this.PracticeExamAttempts = parseInt(_this.certificateDetail.PracticeExamAttempts);
                for (var i = 0; i < _this.mandatoryDocumentsList.length; i++) {
                    if (_this.mandatoryDocumentsList[i].UserDocumentId != null) {
                        var ExtStr = _this.mandatoryDocumentsList[i].CertificateDocumentName;
                        var Ext = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                        _this.mandatoryDocumentsList[i].Ext = Ext;
                        _this.uploadedMandatoryDocumentsCount++;
                    }
                }
                for (var i = 0; i < _this.optionalDocumentsList.length; i++) {
                    if (_this.optionalDocumentsList[i].UserDocumentId != null) {
                        var ExtStr = _this.optionalDocumentsList[i].CertificateDocumentName;
                        var Ext = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                        _this.optionalDocumentsList[i].Ext = Ext;
                    }
                }
                console.log(_this.mandatoryDocumentsList);
                console.log(_this.optionalDocumentsList);
                var certificates = { 'UserId': _this.globals.authData.UserId, 'CertificateId': _this.certificateDetail.CertificateId, 'CertificateFor': _this.certificateDetail.CertificateFor };
                _this.ProfileService.getData(certificates)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.certificateimage = data['UserAllDocuments'];
                    _this.certificatedocument = data['CertificateDocuments'];
                    console.log(_this.certificatedocument);
                    if (_this.mandatoryDocumentsList.length > 0) {
                        for (var i = 0; i < _this.mandatoryDocumentsList.length; i++) {
                            if (_this.mandatoryDocumentsList[i].UserDocumentId != null) {
                                _this.mandatoryDocumentsList[i].flag = 1;
                            }
                            else {
                                _this.mandatoryDocumentsList[i].flag = 0;
                            }
                            // for (var j = 0; j < this.certificatedocument.length; j++) {
                            //   if (this.mandatoryDocumentsList[i].DocumentId == this.certificatedocument[j].DocumentId) {
                            //     this.certificatedocument[j].flag = 1;
                            //   }
                            //   if ( this.certificatedocument[j].IsMandatory == 1) {
                            //     this.certificatedocument[j].value = 1;
                            //   }
                            // }
                        }
                    }
                    else {
                        for (var j = 0; j < _this.certificatedocument.length; j++) {
                            if (_this.certificatedocument[j].IsMandatory == 1) {
                                _this.certificatedocument[j].value = 1;
                            }
                        }
                    }
                    if (_this.optionalDocumentsList.length > 0) {
                        for (var i = 0; i < _this.optionalDocumentsList.length; i++) {
                            if (_this.optionalDocumentsList[i].UserDocumentId != null) {
                                _this.optionalDocumentsList[i].flag = 1;
                            }
                            else {
                                _this.optionalDocumentsList[i].flag = 0;
                            }
                            // for (var j = 0; j < this.certificatedocument.length; j++) {
                            //   if (this.optionalDocumentsList[i].DocumentId == this.certificatedocument[j].DocumentId) {
                            //     this.certificatedocument[j].flag = 1;
                            //   }
                            //   if ( this.certificatedocument[j].IsMandatory == 0) {
                            //     this.certificatedocument[j].value = 0;
                            //   }
                            // }
                        }
                    }
                    else {
                        for (var j = 0; j < _this.certificatedocument.length; j++) {
                            if (_this.certificatedocument[j].IsMandatory == 0) {
                                _this.certificatedocument[j].value = 0;
                            }
                        }
                    }
                    setTimeout(function () {
                        $("#CertiDocumentId").selectpicker();
                        $("#CertiDocumentId").selectpicker('refresh');
                    }, 100);
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
                //console.log(this.optionalDocumentsList);
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
                var today = month + '-' + date + '-' + curr_year;
                var todayTime = (d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()) + ':00';
                _this.assessmentExpirationDate = '';
                if (_this.certificateDetail.CertificationEndDate == null) {
                    if (_this.certificateDetail.PaymentDate == null)
                        var someDate = new Date();
                    else
                        var someDate = new Date(_this.certificateDetail.PaymentDate);
                    // var numberOfDaysToAdd = JSON.parse(this.certificateDetail.AssessmentDuration);
                    // someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                    // console.log(this.certificateDetail.AssessmentDuration);
                    var AssessmentDuration = JSON.parse(_this.certificateDetail.AssessmentDuration);
                    someDate.setMonth(someDate.getMonth() + AssessmentDuration);
                    //console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    console.log(someDate);
                    console.log(new Date());
                    var newdate = new Date();
                    // var d = new Date(2000, 0, 1); // January 1, 2000
                    // d.setMonth(d.getMonth() + 13);
                    // console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    var dd = someDate.getDate();
                    var mm = someDate.getMonth() + 1;
                    var y = someDate.getFullYear();
                    _this.assessmentExpirationDate = y + '-' + mm + '-' + dd;
                    var assepirationdate = (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd) + '-' + y;
                    console.log(today + ' ' + assepirationdate);
                    if (_this.certificateDetail.HasProctor == 0) {
                        if (newdate <= someDate) // compare with original formate 
                         {
                            _this.assessmentbtndisplaywithoutproctor = true;
                        }
                        else {
                            _this.assessmentbtndisplaywithoutproctor = false;
                        }
                    }
                    else {
                        _this.assessmentbtndisplaywithoutproctor = true;
                    }
                }
                var date3;
                var date4;
                date3 = new Date();
                date4 = new Date(someDate);
                var diffTime = Math.abs(date3 - date4);
                console.log(diffTime);
                _this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(_this.diffDays);
                for (var i = 0; i < _this.certificateDetail.AssessmentDetail.length; i++) {
                    if (_this.certificateDetail.AssessmentDetail[i].AssignDate != null && _this.certificateDetail.HasProctor == 1) {
                        var someDateCancel = new Date(_this.certificateDetail.AssessmentDetail[i].AssignDate);
                        var numberOfDaysTominus1 = JSON.parse(data['CertificateDetails']['AppointmentCancelDays']);
                        someDateCancel.setDate(someDateCancel.getDate() - numberOfDaysTominus1);
                        var dd = someDateCancel.getDate();
                        var mm = someDateCancel.getMonth() + 1;
                        var y = someDateCancel.getFullYear();
                        if (mm < 10) {
                            var mmm = '0' + mm;
                        }
                        else {
                            var mmm = '' + mm;
                        }
                        if (dd < 10) {
                            var ddd = '0' + dd;
                        }
                        else {
                            var ddd = '' + dd;
                        }
                        _this.AppointmentCancelDate = mmm + '-' + ddd + '-' + y;
                    }
                    if (_this.certificateDetail.HasProctor == 1) {
                        if (_this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentStatus == 56) {
                            _this.scheduleStatus = _this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentStatus;
                        }
                        if (_this.certificateDetail.AssessmentDetail[0].ScheduleStatusId == 14) {
                            _this.scheduleStatusId = _this.certificateDetail.AssessmentDetail[0].ScheduleStatusId;
                        }
                    }
                }
                for (var i = 0; i < _this.certificateDetail.AssessmentDetail.length; i++) {
                    if (_this.certificateDetail.AssessmentDetail[i].AssignDate != null && _this.certificateDetail.HasProctor == 1) {
                        var hour = (_this.certificateDetail.AssessmentDetail[i].StartTime.split(':'))[0];
                        var min = (_this.certificateDetail.AssessmentDetail[i].StartTime.split(':'))[1];
                        var part = hour > 12 ? 'pm' : 'am';
                        min = (min + '').length == 1 ? "0" + min : min;
                        hour = hour > 12 ? hour - 12 : hour;
                        hour = (hour + '').length == 1 ? "0" + hour : hour;
                        console.log(hour + ':' + min + ' ' + part);
                        _this.certificateDetail.AssessmentDetail[i].startTime = hour + ':' + min + part;
                        var hour1 = (_this.certificateDetail.AssessmentDetail[i].EndTime.split(':'))[0];
                        var min1 = (_this.certificateDetail.AssessmentDetail[i].EndTime.split(':'))[1];
                        var part1 = hour1 > 12 ? 'pm' : 'am';
                        min1 = (min1 + '').length == 1 ? "0" + min1 : min1;
                        hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                        hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                        console.log(hour1 + ':' + min1 + ' ' + part1);
                        _this.certificateDetail.AssessmentDetail[i].endTime = hour1 + ':' + min1 + part1;
                        var beforehours = new Date('December 17, 1995 ' + _this.certificateDetail.AssessmentDetail[i].StartTime);
                        beforehours.setHours(beforehours.getHours() - 2);
                        var afterhours = new Date('December 17, 1995 ' + _this.certificateDetail.AssessmentDetail[i].EndTime);
                        afterhours.setHours(afterhours.getHours() + 2);
                        console.log(beforehours.getHours() + ':' + beforehours.getMinutes() + ' ' + afterhours.getHours() + ':' + afterhours.getMinutes());
                        var before2hours = (beforehours.getHours() < 10 ? '0' + beforehours.getHours() : '' + beforehours.getHours()) + ':' + (beforehours.getMinutes() < 10 ? '0' + beforehours.getMinutes() : '' + beforehours.getMinutes()) + ':00';
                        var after2hours = (afterhours.getHours() < 10 ? '0' + afterhours.getHours() : '' + afterhours.getHours()) + ':' + (afterhours.getMinutes() < 10 ? '0' + afterhours.getMinutes() : '' + afterhours.getMinutes()) + ':00';
                        var todaydate = curr_year + '-' + month + '-' + date;
                        console.log(todaydate);
                        if (_this.certificateDetail.AssessmentDetail[i].AssignDate == todaydate) {
                            if (before2hours <= todayTime || todayTime <= after2hours) {
                                _this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = true;
                            }
                            else {
                                _this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = false;
                            }
                        }
                        else {
                            _this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = false;
                        }
                    }
                    else {
                        _this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = true;
                    }
                }
                _this.ScheduleAssessmentId = 0;
                _this.resultStatus = 0;
                if (_this.certificateDetail.AssessmentDetail.length > 0) {
                    if (_this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentId != null)
                        _this.ScheduleAssessmentId = _this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentId;
                    if (_this.certificateDetail.AssessmentDetail[0].ResultStatus != null)
                        _this.resultStatus = _this.certificateDetail.AssessmentDetail[0].ResultStatus;
                    if (_this.certificateDetail.AssessmentDetail[0].UserAssessmentId != null)
                        _this.UserAssessmentId = _this.certificateDetail.AssessmentDetail[0].UserAssessmentId;
                    else
                        _this.UserAssessmentId = _this.certificateDetail.AssessmentDetail[0].LastUserAssessmentId;
                    if (_this.certificateDetail.AssessmentDetail[0].ParentAssessment != null)
                        _this.ParentAssessment = _this.certificateDetail.AssessmentDetail[0].ParentAssessment;
                    else
                        _this.ParentAssessment = 0;
                    if (_this.certificateDetail.AssessmentDetail[0].ResultStatus == 17) {
                        if (_this.certificateDetail.HasProctor == 0)
                            var dateDisplay = new Date(_this.certificateDetail.AssessmentDetail[0].AssessmentEndDate);
                        else
                            var dateDisplay = new Date(_this.certificateDetail.AssessmentDetail[0].AssignDate);
                        var numberOfDaysToplus = JSON.parse(_this.certificateDetail.CoolingPeriod);
                        dateDisplay.setDate(dateDisplay.getDate() + numberOfDaysToplus);
                        var getmonth = dateDisplay.getMonth() + 1;
                        if (getmonth < 10) {
                            var month = '0' + getmonth;
                        }
                        else {
                            var month = '' + getmonth;
                        }
                        var getdate = dateDisplay.getDate();
                        if (getdate < 10) {
                            var date = '0' + getdate;
                        }
                        else {
                            var date = '' + getdate;
                        }
                        var displayassessmentbtn = month + '-' + date + '-' + dateDisplay.getFullYear();
                        console.log(displayassessmentbtn);
                        console.log(todaysdate);
                        if (todaysdate >= displayassessmentbtn) //assessmentExpirationDate date check kravi
                            _this.assessment_subassessment_btn_display = true;
                        else
                            _this.assessment_subassessment_btn_display = false;
                    }
                }
                var count = 0;
                if (_this.certificateDetail.HasOneShotAssessment == 1) {
                    for (var j = 0; j < _this.practiceTestList.length; j++) {
                        if (_this.practiceTestList[j].PracticeTestStatusId == 0) {
                            count = 1;
                        }
                        if (count == 1)
                            _this.viewResultStatus = true;
                        else
                            _this.viewResultStatus = false;
                    }
                }
                else {
                    _this.viewResultStatus = false;
                }
                console.log(_this.assessmentExpirationDate);
                if (_this.certificateDetail.CertificateStatus == 64 && _this.certificateDetail.IsRenewable == 1) {
                    var beforedate = new Date(_this.certificateDetail.CertificationEndDate);
                    var numberOfDaysTominus = JSON.parse(_this.certificateDetail.BeforeRenewButtonDisplay);
                    beforedate.setDate(beforedate.getDate() - numberOfDaysTominus);
                    console.log(beforedate);
                    var getmonth = beforedate.getMonth() + 1;
                    if (getmonth < 10) {
                        var month = '0' + getmonth;
                    }
                    else {
                        var month = '' + getmonth;
                    }
                    var getdate = beforedate.getDate();
                    if (getdate < 10) {
                        var date = '0' + getdate;
                    }
                    else {
                        var date = '' + getdate;
                    }
                    console.log(_this.globals.todaysdate);
                    var afterdate = new Date(_this.certificateDetail.CertificationEndDate);
                    var numberOfDaysToAdd = JSON.parse(_this.certificateDetail.AfterRenewButtonDisplay);
                    afterdate.setDate(afterdate.getDate() + numberOfDaysToAdd);
                    console.log(afterdate);
                    var getmonth1 = afterdate.getMonth() + 1;
                    if (getmonth1 < 10) {
                        var month1 = '0' + getmonth1;
                    }
                    else {
                        var month1 = '' + getmonth1;
                    }
                    var getdate1 = afterdate.getDate();
                    if (getdate1 < 10) {
                        var date1 = '0' + getdate1;
                    }
                    else {
                        var date1 = '' + getdate1;
                    }
                    var BeforeRenewButtonDisplay = month + '-' + date + '-' + beforedate.getFullYear();
                    var AfterRenewButtonDisplay = month1 + '-' + date1 + '-' + afterdate.getFullYear();
                    console.log(BeforeRenewButtonDisplay + ' ' + AfterRenewButtonDisplay);
                    if (BeforeRenewButtonDisplay < todaysdate && todaysdate < AfterRenewButtonDisplay)
                        _this.renewButtonDisplay = true;
                    else
                        _this.renewButtonDisplay = false;
                }
                var resultEntity = [];
                for (var i = 0; i < _this.certificateDetail.AssessmentDetail.length; i++) {
                    var chartData = [];
                    for (var j = 0; j < _this.certificateDetail.AssessmentDetail[i].results.length; j++) {
                        var category = _this.certificateDetail.AssessmentDetail[i].results[j].category;
                        var score = _this.certificateDetail.AssessmentDetail[i].results[j].score;
                        chartData.push({ category: category, score: score });
                    }
                    setTimeout(function () {
                        var chart = am4core.create("chart_result", am4charts.XYChart);
                        // Add data
                        chart.data = chartData;
                        // chart.data = [{
                        //   "category": "phpwew",
                        //   "score": 30
                        // }, {
                        //   "category": "CorePHPq",
                        //   "score": 60
                        // }, {
                        //   "category": "phpee",
                        //   "score": 30
                        // }
                        // ];
                        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                        categoryAxis.tooltip.disabled = true;
                        categoryAxis.renderer.grid.template.location = 0;
                        categoryAxis.dataFields.category = "category";
                        categoryAxis.renderer.minGridDistance = 20;
                        categoryAxis.renderer.grid.template.location = 0;
                        categoryAxis.renderer.grid.template.strokeDasharray = "0.1";
                        categoryAxis.renderer.labels.template.horizontalCenter = "left";
                        categoryAxis.renderer.labels.template.location = 0.5;
                        categoryAxis.renderer.inside = true;
                        categoryAxis.renderer.fontSize = 0;
                        var label = chart.createChild(am4core.Label);
                        label.text = "";
                        label.fontSize = 0;
                        label.fontWeight = "bold";
                        label.align = "center";
                        categoryAxis.renderer.labels.template.adapter.add("dx", function (dx, target) {
                            return -target.maxRight / 2;
                        });
                        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                        valueAxis.tooltip.disabled = true;
                        valueAxis.renderer.ticks.template.disabled = true;
                        valueAxis.renderer.axisFills.template.disabled = true;
                        valueAxis.renderer.grid.template.strokeDasharray = "0.1";
                        valueAxis.min = 0;
                        valueAxis.max = 100;
                        valueAxis.maxPrecision = 0;
                        valueAxis.fontSize = 0;
                        valueAxis.fontFamily = 'Signika';
                        valueAxis.title.text = "";
                        valueAxis.title.fontSize = 0;
                        valueAxis.title.fontWeight = "bold";
                        valueAxis.numberFormatter = new am4core.NumberFormatter();
                        valueAxis.numberFormatter.numberFormat = "#";
                        valueAxis.calculateTotals = true;
                        var series = chart.series.push(new am4charts.ColumnSeries());
                        series.dataFields.categoryX = "category";
                        series.dataFields.valueY = "score";
                        series.numberFormatter = new am4core.NumberFormatter();
                        series.numberFormatter.numberFormat = "#.0";
                        series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
                        series.tooltipHTML = "{categoryX}: <strong>{valueY.value}%</strong>";
                        series.columns.template.column.cornerRadiusTopLeft = 5;
                        series.columns.template.column.cornerRadiusTopRight = 5;
                        series.columns.template.column.fillOpacity = 0.8;
                        series.columns.template.strokeWidth = 0;
                        series.tooltip.getFillFromObject = false;
                        series.tooltip.background.fill = am4core.color("rgba(255,255,255,0.4)");
                        series.tooltip.fontFamily = 'Signika';
                        series.tooltip.fontSize = 13;
                        series.tooltip.label.fill = am4core.color("#000");
                        series.sequencedInterpolation = true;
                        series.fillOpacity = 1;
                        series.strokeOpacity = 1;
                        series.columns.template.adapter.add("fill", function (fill, target) {
                            return chart.colors.getIndex(target.dataItem.index);
                        });
                        chart.cursor = new am4charts.XYCursor();
                        chart.cursor.lineY.strokeWidth = 0;
                        chart.cursor.lineY.strokeOpacity = 0;
                        chart.cursor.lineX.strokeWidth = 0;
                        chart.cursor.lineX.strokeOpacity = 0;
                        chart.cursor.lineX.disabled = true;
                        chart.cursor.lineY.disabled = true;
                    }, 500);
                }
                console.log(resultEntity);
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
    CertificateDetailComponent.prototype.overlay_close = function () {
        this.schedulePopup = false;
        this.reSchedulePopup = false;
        this.uploadDocumentPopup = false;
        $(".overlay").css("display", "none");
    };
    CertificateDetailComponent.prototype.close = function () {
        this.schedulePopup = false;
        this.reSchedulePopup = false;
        this.uploadDocumentPopup = false;
    };
    CertificateDetailComponent.prototype.viewResult = function (id) {
        // router.navigate(['/practice-result', practice.UserPracticeTestId]);
        this.router.navigate(['/practice-result/' + window.btoa(id)]);
    };
    CertificateDetailComponent.prototype.assessmentResult = function (id) {
        this.router.navigate(['/assessment-result/' + window.btoa(id)]);
    };
    CertificateDetailComponent.prototype.startAssessmentPanel = function (CertificateId, UserCertificateId, ScheduleAssessmentId, UserAssessmentId, resultStatus, parentAssessment, HasSubCertificate, HasOneShotAssessment) {
        this.router.navigate(['/assessmentPanel/' + window.btoa(CertificateId) + '/' + UserCertificateId + '/' + window.btoa(ScheduleAssessmentId) + '/' + window.btoa(UserAssessmentId) + '/' + window.btoa(resultStatus) + '/' + window.btoa(parentAssessment) + '/' + window.btoa(HasSubCertificate) + '/' + window.btoa(HasOneShotAssessment)]);
    };
    CertificateDetailComponent.prototype.practiceTest = function (certificateid, usercertificateid, userpracticetestid, flag, HasOneShotAssessment) {
        this.router.navigate(['/practice-test/' + window.btoa(certificateid) + '/' + usercertificateid + '/' + window.btoa(userpracticetestid) + '/' + window.btoa(flag) + '/' + window.btoa(HasOneShotAssessment)]);
    };
    CertificateDetailComponent.prototype.buyNewPracticeTestModalShow = function () {
        this.buyNewPracticeTestEntity = {};
        this.submitted4 = false;
        $('#buynewpracticeModal').modal('show');
    };
    CertificateDetailComponent.prototype.checkPracticeTestNumber = function () {
        if (this.buyNewPracticeTestEntity.BoughtNewPracticeTests > 10) {
            this.buyPracticeTestValid = true;
        }
        else {
            this.buyPracticeTestValid = false;
        }
    };
    CertificateDetailComponent.prototype.buyPracticeTest = function (buyPracticeTestForm) {
        var _this = this;
        this.submitted4 = true;
        if (buyPracticeTestForm.valid && !this.buyPracticeTestValid) {
            this.globals.isLoading = true;
            this.buyNewPracticeTestEntity.UserId = this.globals.authData.UserId;
            this.buyNewPracticeTestEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
            this.buyNewPracticeTestEntity.CertificateName = this.certificateDetail.CertificateName;
            this.submitted4 = false;
            this.DashboardService.buyNewPracticeTests(this.buyNewPracticeTestEntity)
                .then(function (data) {
                var attempts = parseInt(_this.certificateDetail.PracticeExamAttempts) + parseInt(_this.buyNewPracticeTestEntity.BoughtNewPracticeTests);
                _this.certificateDetail.PracticeExamAttempts = attempts;
                $('#buynewpracticeModal').modal('hide');
                _this.globals.isLoading = false;
                swal({
                    type: "success",
                    title: "Buy New Practice Test",
                    text: "Your new practice test has been bought successfully.",
                    showConfirmButton: false,
                    timer: 5000
                });
                //window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
                _this.router.navigate(["/certificateDetails/" + _this.certificateDetail.UserCertificateId]);
            }, function (error) {
                _this.btn_disable = false;
                _this.globals.isLoading = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
    };
    CertificateDetailComponent.prototype.certificatedocuments = function (certificateDocument, value, documenId, edittimevalue) {
        var _this = this;
        debugger;
        this.Removeimage();
        if (certificateDocument) {
            this.editDocumentValue = edittimevalue;
            this.certificatedocumentEntity.UserDocumentId = certificateDocument.UserDocumentId;
            if (certificateDocument.ExpiryDate != null) {
                this.certificatedocumentEntity.ExpiryDate = new Date(certificateDocument.ExpiryDate);
            }
            //this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
            this.certiDocumentDis = true;
            var aa = certificateDocument.DocumentId;
            setTimeout(function () {
                $("#CertiDocumentId").selectpicker('refresh');
                $("#CertiDocumentId").val(aa);
            }, 200);
        }
        else {
            this.certificatedocumentEntity.UserDocumentId = 0;
            this.certiDocumentDis = false;
            setTimeout(function () {
                $("#CertiDocumentId").selectpicker('refresh');
                //$("#CertiDocumentId").val('');
                _this.submitted3 = false;
                //this.certificatedocumentEntity.CertiDocumentId = '';
            }, 200);
        }
        this.certificatedocumentEntity.UserDocumentCertificateMappingId = certificateDocument.UserDocumentCertificateMappingId;
        this.certificatedocumentEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
        this.certificatedocumentEntity.CertiDocumentId = documenId;
        // this.certificatedocumentEntity.DocumentId = certificateDocument.DocumentId;
        // this.certificatedocumentEntity.CertificateDocumentId = certificateDocument.CertificateDocumentId;
        console.log(this.certificatedocumentEntity);
        //$('#uploaddocumentModal').modal('show');
        this.uploadDocumentPopup = true;
        var certificates = { 'UserId': this.globals.authData.UserId, 'CertificateId': this.certificateDetail.CertificateId, 'CertificateFor': this.certificateDetail.CertificateFor };
        certificates.UserId = this.globals.authData.UserId;
        // this.ProfileService.getData(certificates)
        //   .then((data) => {
        //     this.globals.isLoading = false;
        //     this.certificateimage = data['UserAllDocuments'];
        //     this.certificatedocument = data['CertificateDocuments'];
        //     // var certDocSelect =  {
        //     //   ConfigurationId:'',
        //     //   DisplayText: this.globals.adminTranslationText.document.form.documentType.select,
        //     //   Value: ""
        //     // }
        //     // this.certificatedocument.push(certDocSelect);
        //     // this.certificatedocument = [...this.certificatedocument,...data['CertificateDocuments']];
        //     console.log(this.certificatedocument);
        //     if (this.mandatoryDocumentsList.length > 0) {
        //       for (var i = 0; i < this.mandatoryDocumentsList.length; i++) {
        //         for (var j = 0; j < this.certificatedocument.length; j++) {
        //           if (this.mandatoryDocumentsList[i].DocumentId == this.certificatedocument[j].DocumentId) {
        //             this.certificatedocument[j].flag = 1;
        //           }
        //           if (value == 1 && this.certificatedocument[j].IsMandatory == 1) {
        //             this.certificatedocument[j].value = 1;
        //           }
        //         }
        //       }
        //     }
        //     else {
        //       for (var j = 0; j < this.certificatedocument.length; j++) {
        //         if (value == 1 && this.certificatedocument[j].IsMandatory == 1) {
        //           this.certificatedocument[j].value = 1;
        //         }
        //       }
        //     }
        //     if (this.optionalDocumentsList.length > 0) {
        //       for (var i = 0; i < this.optionalDocumentsList.length; i++) {
        //         for (var j = 0; j < this.certificatedocument.length; j++) {
        //           if (this.optionalDocumentsList[i].DocumentId == this.certificatedocument[j].DocumentId) {
        //             this.certificatedocument[j].flag = 1;
        //           }
        //           if (value == 0 && this.certificatedocument[j].IsMandatory == 0) {
        //             this.certificatedocument[j].value = 0;
        //           }
        //         }
        //       }
        //     }
        //     else {
        //       for (var j = 0; j < this.certificatedocument.length; j++) {
        //         if (value == 0 && this.certificatedocument[j].IsMandatory == 0) {
        //           this.certificatedocument[j].value = 0;
        //         }
        //       }
        //     }
        //     setTimeout(function () {
        //       $("#CertiDocumentId").selectpicker();
        //       $("#CertiDocumentId").selectpicker('refresh');
        //     }, 100);
        //   },
        //     (error) => {
        //       this.globals.isLoading = false;
        //       swal({
        //         type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
        //         title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
        //         text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
        //         showConfirmButton: false,
        //         timer: 4000
        //       })
        //     });
    };
    CertificateDetailComponent.prototype.imageclick = function (image, i) {
        //alert();
        setTimeout(function () {
            $('input[type="checkbox"]').on('change', function () {
                $('input[type="checkbox"]').not(this).prop('checked', false);
            });
            $("#new_upload_file").val('');
            $('#uploaded_doc').attr('src', '');
            $('.uploaded_doc_block').hide();
            $('.new_block').show();
        });
        this.editDocumentValue = 0;
        this.certificatedocumentEntity.UserDocumentId = image.UserDocumentId;
    };
    CertificateDetailComponent.prototype.Removeimage = function () {
        // //alert('s');
        // this.certificatedocumentEntity.UserDocumentId = 0;
        // $('.check_box input[name="document_select"]').prop('checked', false);
        // // setTimeout(function () {
        // //   $('.radio_box input[type="radio"]').val(false);
        // //  },);
        $("#new_upload_file").val('');
        $('#uploaded_doc').attr('src', '');
        $('.uploaded_doc_block').hide();
        $('.new_block').show();
        this.certificatedocumentEntity.CertificateName = '';
    };
    CertificateDetailComponent.prototype.fileTypeCheck = function (file, CertiDocumentId) {
        this.certificatedocumentEntity.UserDocumentId = 0;
        $('.check_box input[name="document_select"]').prop('checked', false);
        if (CertiDocumentId != '') {
            for (var j = 0; j < this.certificatedocument.length; j++) {
                if (this.certificatedocument[j].DocumentId == CertiDocumentId) {
                    var arrayExtensions = this.certificatedocument[j].DocumentType;
                }
            }
            var ext = file.split(".");
            ext = "." + ext[ext.length - 1].toLowerCase();
            //var arrayExtensions = [".jpg" , ".jpeg", ".png", ".bmp", ".gif"];
            if (arrayExtensions.lastIndexOf(ext) == -1) {
                swal({
                    type: 'warning',
                    title: 'Wrong Extensions',
                    //text: 'You can not upload file that extensions with ' + ext,
                    text: 'you can able to upload a file Extension with ' + arrayExtensions,
                    showConfirmButton: false,
                    timer: 3000
                });
                this.certificatedocumentEntity.CertificateName = '';
                setTimeout(function () {
                    $("#new_upload_file").val('');
                    $('#uploaded_doc').attr('src', '');
                    $('.uploaded_doc_block').hide();
                    $('.new_block').show();
                }, 200);
            }
        }
        else {
            swal({
                type: 'warning',
                title: 'Select Document',
                text: 'Please select a document',
                showConfirmButton: false,
                timer: 3000,
            });
            setTimeout(function () {
                $("#new_upload_file").val('');
                $('#uploaded_doc').attr('src', '');
                $('.uploaded_doc_block').hide();
                $('.new_block').show();
            }, 200);
        }
    };
    CertificateDetailComponent.prototype.certidocumentSubmit = function (CertificatedocumentForm) {
        var _this = this;
        debugger;
        //alert(this.certificatedocumentEntity.CertiDocumentId);
        this.submitted3 = true;
        var count = 0;
        var certificate;
        for (var _i = 0, _a = this.certificatedocument; _i < _a.length; _i++) {
            certificate = _a[_i];
            if (this.certificatedocumentEntity.CertiDocumentId == certificate.DocumentId) {
                this.certificatedocumentEntity.DocumentId = certificate.DocumentId;
                this.certificatedocumentEntity.CertificateDocumentId = certificate.CertificateDocumentId;
            }
        }
        if (this.certificatedocumentEntity.CertiDocumentId != '') {
            if (this.editDocumentValue == 1) {
                if (this.certificatedocumentEntity.CertificateName == "" || this.certificatedocumentEntity.CertificateName == null || this.certificatedocumentEntity.CertificateName == undefined) {
                    this.DocumentValid = true;
                    // count = 1;
                    swal({
                        type: 'warning',
                        title: 'Upload File',
                        text: 'Please upload a file or Select any one image',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
                else {
                    this.DocumentValid = false;
                }
            }
            else {
                if ((this.certificatedocumentEntity.CertificateName == "" || this.certificatedocumentEntity.CertificateName == null || this.certificatedocumentEntity.CertificateName == undefined)
                    && (this.certificatedocumentEntity.UserDocumentId == '')) {
                    this.DocumentValid = true;
                    // count = 1;
                    swal({
                        type: 'warning',
                        title: 'Upload File',
                        text: 'Please upload a file or Select any one image',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
                else {
                    this.DocumentValid = false;
                }
            }
        }
        if (CertificatedocumentForm.valid && !this.DocumentValid) {
            var getCurrentObj = CertificatedocumentForm.form.value;
            this.certificatedocumentEntity.ExpiryDate = getCurrentObj.ExpiryDate;
            var file1_1 = '';
            var fd = new FormData();
            var total = 0;
            this.certificatedocumentEntity.Document = [];
            if (this.certificatedocumentEntity.CertificateName != '' && this.certificatedocumentEntity.CertificateName != '') {
                file1_1 = this.elem.nativeElement.querySelector('#new_upload_file').files;
                if (file1_1 && file1_1.length != 0) {
                    total = file1_1.length;
                    for (var k = 0; k < file1_1.length; k++) {
                        var Images = Date.now() + '_' + file1_1[k]['name'];
                        fd.append('Document' + k, file1_1[k], Images);
                        this.certificatedocumentEntity.Document.push(Images);
                        this.certificatedocumentEntity.CertificateName = Images;
                    }
                }
                else {
                    fd.append('Document', null);
                    this.certificatedocumentEntity.Document = null;
                }
            }
            //CertificateName,UserName
            this.certificatedocumentEntity.UserDocuments = [{
                    UserDocumentId: this.certificatedocumentEntity.UserDocumentId,
                    DocumentId: this.certificatedocumentEntity.DocumentId,
                    UserCertificateId: this.certificatedocumentEntity.UserCertificateId,
                    CertificateDocumentId: this.certificatedocumentEntity.CertificateDocumentId,
                    UserDocumentCertificateMappingId: this.certificatedocumentEntity.UserDocumentCertificateMappingId,
                    CertificateDocumentName: this.certificatedocumentEntity.CertificateName,
                    DocumentUrl: 'assests/Documents/',
                    UserId: this.globals.authData.UserId,
                    documentCount: 1,
                    UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName,
                    CertificateName: this.certificateDetail.CertificateName, LoginURL: '/login',
                    ExpiryDate: this.certificatedocumentEntity.ExpiryDate
                }];
            console.log(this.certificatedocumentEntity);
            this.globals.isLoading = true;
            this.ProfileService.UpdateCertificateDocuments(this.certificatedocumentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted3 = false;
                if (_this.certificatedocumentEntity.UserDocumentId != 0) {
                    $("#new_upload_file").val(null);
                    //$("#uploaddocumentModal").hide();
                    _this.uploadDocumentPopup = false;
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    window.location.href = "/certificateDetails/" + _this.certificateDetail.UserCertificateId;
                }
                else {
                    if (file1_1) {
                        _this.ProfileService.uploadFileCertificate(fd, total, _this.globals.authData.UserId)
                            .then(function (data) {
                            $("#new_upload_file").val(null);
                            // $("#uploaddocumentModal").hide();
                            _this.uploadDocumentPopup = false;
                            swal({
                                type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                                title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                                text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                                showConfirmButton: false,
                                timer: 5000
                            });
                            window.location.href = "/certificateDetails/" + _this.certificateDetail.UserCertificateId;
                            //this.router.navigate(['/profile']);	
                        }, function (error) {
                            _this.btn_disable = false;
                            _this.globals.isLoading = false;
                            // this.globals.pageNotfound(error.error.code);
                        });
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        // window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
                    }
                }
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted1 = false;
                _this.globals.isLoading = false;
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
    CertificateDetailComponent.prototype.VerificationRequest = function () {
        var _this = this;
        this.verificationRequestEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
        this.verificationRequestEntity.UserName = this.globals.authData.FirstName + ' ' + this.globals.authData.LastName;
        this.verificationRequestEntity.UserId = this.globals.authData.UserId;
        this.verificationRequestEntity.CertificateName = this.certificateDetail.CertificateName;
        this.verificationRequestEntity.LoginURL = '/login';
        this.globals.isLoading = true;
        this.DashboardService.VerificationRequest(this.verificationRequestEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            swal({
                type: _this.globals.commonTranslationText.certificateDetailPage.documents.alerts.type,
                title: _this.globals.commonTranslationText.certificateDetailPage.documents.alerts.title,
                text: _this.globals.commonTranslationText.certificateDetailPage.documents.alerts.text,
                showConfirmButton: false,
                timer: 4000
            });
            //var userCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
            window.location.href = '/certificateDetails/' + _this.certificateDetail.UserCertificateId;
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
    CertificateDetailComponent.prototype.printDiv = function () {
        var innerContents = document.getElementById('printevaluation').innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write(innerContents);
        popupWinindow.document.close();
        popupWinindow.print();
        popupWinindow.close();
    };
    CertificateDetailComponent.prototype.viewSchedule = function (i) {
        var _this = this;
        debugger;
        if (this.certificateDetail.addressCount == 1) {
            // $("#schedule").modal('show');
            this.schedulePopup = true;
            var someDate = new Date();
            var numberOfDaysToAdd = JSON.parse(this.certificateDetail.ScheduleAfterDaysForCandidate);
            someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
            console.log(someDate);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();
            this.someFormattedDate = someDate;
            //this.someFormattedDate = new Date(mm, dd, y);
            // $('#AvailablePriorityDate1').datetimepicker({
            //   weekStart: 1,
            //   todayBtn: 1,
            //   autoclose: 1,
            //   todayHighlight: 1,
            //   startView: 2,
            //   minView: 2,
            //   forceParse: 0,
            //   pickTime: false,
            //   format: 'yyyy-mm-dd',
            //   startDate: this.someFormattedDate,
            // }).change(this.dateChanged);
        }
        else {
            swal({
                title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.title,
                text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.text,
                icon: "warning",
                type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
                html: "Before scheduling assessment <br> Add your address from your profile. "
            })
                .then(function (result) {
                if (result.value) {
                    //this.router.navigate(['/profile/' + 'addressadd']);
                    //this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                    _this.router.navigate(['/profile/' + window.btoa('addressadd') + '/' + _this.certificateDetail.UserCertificateId]);
                }
            });
        }
    };
    CertificateDetailComponent.prototype.dateChanged = function () {
        var someDate1 = new Date($("#AvailablePriorityDate1").val());
        var dd1 = someDate1.getDate();
        var mm1 = someDate1.getMonth() + 1;
        var y1 = someDate1.getFullYear();
        var someFormattedDate1 = y1 + '-' + mm1 + '-' + dd1;
        // $("#AvailablePriorityDate2").datetimepicker({
        //   weekStart: 1,
        //   todayBtn: 1,
        //   autoclose: 1,
        //   todayHighlight: 1,
        //   startView: 2,
        //   minView: 2,
        //   forceParse: 0,
        //   pickTime: false,
        //   format: 'yyyy-mm-dd',
        //   startDate: this.someFormattedDate,
        //   datesDisabled: [someFormattedDate1],
        // });
        // $("#AvailablePriorityDate3").datetimepicker({
        //   weekStart: 1,
        //   todayBtn: 1,
        //   autoclose: 1,
        //   todayHighlight: 1,
        //   startView: 2,
        //   minView: 2,
        //   forceParse: 0,
        //   pickTime: false,
        //   format: 'yyyy-mm-dd',
        //   startDate: this.someFormattedDate,
        //   datesDisabled: [someFormattedDate1],
        // });
        //$('#AvailablePriorityDate2').datetimepicker('setdatesDisabled', [someFormattedDate1]);
    };
    CertificateDetailComponent.prototype.scheduleAssessment = function (scheduleAssessmentForm) {
        var _this = this;
        var getCurrentObj = scheduleAssessmentForm.form.value;
        this.scheduleAssessmentEntity.AvailablePriorityDate1 = getCurrentObj.AvailablePriorityDate1;
        this.scheduleAssessmentEntity.AvailablePriorityDate2 = getCurrentObj.AvailablePriorityDate2;
        this.scheduleAssessmentEntity.AvailablePriorityDate3 = getCurrentObj.AvailablePriorityDate3;
        if (this.scheduleAssessmentEntity.AvailablePriorityDate1 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate1 == null || this.scheduleAssessmentEntity.AvailablePriorityDate1 == undefined) {
            this.ValidAvailablePriorityDate1 = true;
        }
        else {
            this.ValidAvailablePriorityDate1 = false;
        }
        if (this.scheduleAssessmentEntity.AvailablePriorityDate2 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate2 == null || this.scheduleAssessmentEntity.AvailablePriorityDate2 == undefined) {
            this.ValidAvailablePriorityDate2 = true;
        }
        else {
            this.ValidAvailablePriorityDate2 = false;
        }
        if (this.scheduleAssessmentEntity.AvailablePriorityDate3 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate3 == null || this.scheduleAssessmentEntity.AvailablePriorityDate3 == undefined) {
            this.ValidAvailablePriorityDate3 = true;
        }
        else {
            this.ValidAvailablePriorityDate3 = false;
        }
        if (scheduleAssessmentForm.valid && !this.ValidAvailablePriorityDate1 && !this.ValidAvailablePriorityDate2 && !this.ValidAvailablePriorityDate3) {
            this.scheduleAssessmentEntity.UserId = this.globals.authData.UserId;
            this.scheduleAssessmentEntity.FirstName = this.globals.authData.FirstName;
            this.scheduleAssessmentEntity.LastName = this.globals.authData.LastName;
            this.scheduleAssessmentEntity.CertificateName = this.certificateDetail.CertificateName;
            this.scheduleAssessmentEntity.LoginURL = '/login';
            this.scheduleAssessmentEntity.CertificateId = this.certificateDetail.CertificateId;
            this.scheduleAssessmentEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
            this.scheduleAssessmentEntity.IsDocumentVerificationRequired = this.certificateDetail.IsDocumentVerificationRequired;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.DashboardService.scheduleAssessment(this.scheduleAssessmentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                if (data == 'Address and Documents are not available') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload certificate document from your more details."
                    })
                        .then(function (result) {
                        if (result.value) {
                            $("#schedule").modal('hide');
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Address not available') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. "
                    })
                        .then(function (result) {
                        if (result.value) {
                            $("#schedule").modal('hide');
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Address is not available and Verification is in progress') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Your documents are under verification."
                    })
                        .then(function (result) {
                        if (result.value) {
                            $("#schedule").modal('hide');
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Address is not available and Documents are not verified') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload documents are not verfiy. Check your certificate details for more detail."
                    })
                        .then(function (result) {
                        if (result.value) {
                            $("#schedule").modal('hide');
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Documents are not verified') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No"
                    })
                        .then(function (result) {
                        if (result.value) {
                            $("#schedule").modal('hide');
                            _this.router.navigate(['/certificateDetails/' + _this.certificateDetail.UserCertificateId]);
                        }
                    });
                }
                else if (data == 'Verification is in progress') {
                    swal({
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.type,
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    $("#schedule").modal('hide');
                }
                else if (data == 'Documents not uploaded') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Upload certificate document from your more details."
                    })
                        .then(function (result) {
                        if (result.value) {
                            $("#schedule").modal('hide');
                            _this.router.navigate(['/certificateDetails/' + _this.certificateDetail.UserCertificateId]);
                        }
                    });
                }
                else {
                    // $("#schedule").modal('hide');
                    _this.schedulePopup = false;
                    _this.scheduleAssessmentEntity = {};
                    scheduleAssessmentForm.form.markAsPristine();
                    _this.certificateDetail.ScheduleStatusId = 15;
                    swal({
                        type: _this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.type,
                        title: _this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.text,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    window.location.href = "/certificateDetails/" + _this.certificateDetail.UserCertificateId;
                }
                // this.scheduleAssessmentEntity = {};
                // scheduleAssessmentForm.form.markAsPristine();
                // this.certificateDetail.ScheduleStatusId = 15;
                // swal({
                //   type: this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.type,
                //   title: this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.title,
                //   text: this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.text,
                //   showConfirmButton: false,
                //   timer: 2000
                // })
                // $("#schedule").modal('hide');
            }, function (error) {
                _this.schedulePopup = false;
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
    CertificateDetailComponent.prototype.addDisableDate = function (e, getDatepickerID) {
        this.disabledDates[getDatepickerID] = e;
    };
    CertificateDetailComponent.prototype.viewReschedule = function (assessment) {
        this.reSchedulePopup = true;
        this.scheduleAssessmentList = assessment.TotalScheduleAssessment;
        var someDate = new Date();
        var numberOfDaysToAdd = JSON.parse(this.certificateDetail.ScheduleAfterDaysForCandidate);
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        this.someFormattedDate = someDate;
        // $('#RescheduleAvailablePriorityDate1').datetimepicker({
        //   weekStart: 1,
        //   todayBtn: 1,
        //   autoclose: 1,
        //   todayHighlight: 1,
        //   startView: 2,
        //   minView: 2,
        //   forceParse: 0,
        //   pickTime: false,
        //   format: 'yyyy-mm-dd',
        //   startDate: this.someFormattedDate,
        // }).change(this.RescheduledateChanged);
    };
    CertificateDetailComponent.prototype.RescheduledateChanged = function () {
        var someDate1 = new Date($("#RescheduleAvailablePriorityDate1").val());
        var dd1 = someDate1.getDate();
        var mm1 = someDate1.getMonth() + 1;
        var y1 = someDate1.getFullYear();
        var someFormattedDate1 = y1 + '-' + mm1 + '-' + dd1;
        $("#RescheduleAvailablePriorityDate2").datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            pickTime: false,
            format: 'yyyy-mm-dd',
            startDate: this.someFormattedDate,
            datesDisabled: [someFormattedDate1],
        });
        $("#RescheduleAvailablePriorityDate3").datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            pickTime: false,
            format: 'yyyy-mm-dd',
            startDate: this.someFormattedDate,
            datesDisabled: [someFormattedDate1],
        });
        //$('#AvailablePriorityDate2').datetimepicker('setdatesDisabled', [someFormattedDate1]);
    };
    CertificateDetailComponent.prototype.RescheduleAssessment = function (RescheduleAssessmentForm) {
        var _this = this;
        debugger;
        var getRescheduleObj = RescheduleAssessmentForm.form.value;
        this.scheduleAssessmentEntity.AvailablePriorityDate1 = getRescheduleObj.AvailablePriorityDate1;
        this.scheduleAssessmentEntity.AvailablePriorityDate2 = getRescheduleObj.AvailablePriorityDate2;
        this.scheduleAssessmentEntity.AvailablePriorityDate3 = getRescheduleObj.AvailablePriorityDate3;
        if (this.scheduleAssessmentEntity.AvailablePriorityDate1 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate1 == null || this.scheduleAssessmentEntity.AvailablePriorityDate1 == undefined) {
            this.ValidAvailablePriorityDate1 = true;
        }
        else {
            this.ValidAvailablePriorityDate1 = false;
        }
        if (this.scheduleAssessmentEntity.AvailablePriorityDate2 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate2 == null || this.scheduleAssessmentEntity.AvailablePriorityDate2 == undefined) {
            this.ValidAvailablePriorityDate2 = true;
        }
        else {
            this.ValidAvailablePriorityDate2 = false;
        }
        if (this.scheduleAssessmentEntity.AvailablePriorityDate3 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate3 == null || this.scheduleAssessmentEntity.AvailablePriorityDate3 == undefined) {
            this.ValidAvailablePriorityDate3 = true;
        }
        else {
            this.ValidAvailablePriorityDate3 = false;
        }
        if (RescheduleAssessmentForm.valid && !this.ValidAvailablePriorityDate1 && !this.ValidAvailablePriorityDate2 && !this.ValidAvailablePriorityDate3) {
            this.scheduleAssessmentEntity.UserId = this.globals.authData.UserId;
            this.scheduleAssessmentEntity.FirstName = this.globals.authData.FirstName;
            this.scheduleAssessmentEntity.LastName = this.globals.authData.LastName;
            this.scheduleAssessmentEntity.CertificateName = this.certificateDetail.CertificateName;
            this.scheduleAssessmentEntity.LoginURL = '/login';
            this.scheduleAssessmentEntity.CertificateId = this.certificateDetail.CertificateId;
            this.scheduleAssessmentEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
            this.scheduleAssessmentEntity.IsDocumentVerificationRequired = this.certificateDetail.IsDocumentVerificationRequired;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.DashboardService.scheduleAssessment(this.scheduleAssessmentEntity)
                .then(function (data) {
                console.log("ReassessmentData" + data);
                _this.globals.isLoading = false;
                _this.reSchedulePopup = false;
                _this.btn_disable = false;
                _this.submitted = false;
                if (data == 'Address and Documents are not available') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload certificate document from your more details."
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.reSchedulePopup = false;
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Address not available') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailable.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. "
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.reSchedulePopup = false;
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Address is not available and Verification is in progress') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Your documents are under verification."
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.reSchedulePopup = false;
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Address is not available and Documents are not verified') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload documents are not verfiy. Check your certificate details for more detail."
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.reSchedulePopup = false;
                            _this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                        }
                    });
                }
                else if (data == 'Documents are not verified') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No"
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.reSchedulePopup = false;
                            _this.router.navigate(['/certificateDetails/' + _this.certificateDetail.UserCertificateId]);
                        }
                    });
                }
                else if (data == 'Verification is in progress') {
                    swal({
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.type,
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    _this.reSchedulePopup = false;
                }
                else if (data == 'Documents not uploaded') {
                    swal({
                        title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.text,
                        icon: "warning",
                        type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.type,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: "No",
                        html: "Before scheduling assessment <br>1. Upload certificate document from your more details."
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.reSchedulePopup = false;
                            _this.router.navigate(['/certificateDetails/' + _this.certificateDetail.UserCertificateId]);
                        }
                    });
                }
                else {
                    _this.reSchedulePopup = false;
                    _this.scheduleAssessmentEntity = {};
                    RescheduleAssessmentForm.form.markAsPristine();
                    _this.certificateDetail.ScheduleStatusId = 15;
                    swal({
                        type: _this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.type,
                        title: _this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    window.location.href = "/certificateDetails/" + _this.certificateDetail.UserCertificateId;
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
    CertificateDetailComponent.prototype.deleteDocument = function (documents, value) {
        var _this = this;
        swal({
            title: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.title,
            text: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                _this.globals.isLoading = true;
                _this.ProfileService.deleteDocument(documents.UserDocumentId, documents.UserDocumentCertificateMappingId)
                    .then(function (data) {
                    if (value == 0) {
                        var index = _this.optionalDocumentsList.indexOf(documents);
                        if (index != -1) {
                            _this.optionalDocumentsList.splice(index, 1);
                        }
                    }
                    else {
                        var index = _this.mandatoryDocumentsList.indexOf(documents);
                        if (index != -1) {
                            _this.mandatoryDocumentsList.splice(index, 1);
                        }
                    }
                    for (var i = 0; i < _this.certificatedocument.length; i++) {
                        if (_this.certificatedocument[i].DocumentId == documents.DocumentId) {
                            _this.certificatedocument[i].flag = 0;
                        }
                    }
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    var userCertificateId = window.atob(_this.route.snapshot.paramMap.get('usercertificateid'));
                    window.location.href = '/certificateDetails/' + _this.certificateDetail.UserCertificateId;
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
                    if (error.error.message == "Already in use") {
                        swal({
                            //position: 'top-end',
                            type: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else {
                        _this.globals.pageNotfound(error.error.code);
                    }
                });
                //this.router.navigate(['/profile']);
            }
        });
    };
    CertificateDetailComponent.prototype.documents = function (UserDocumentId, CertificateDocumentId) {
        var _this = this;
        if (UserDocumentId > 0) {
            this.documentEntity.CertificateDocumentId = CertificateDocumentId;
        }
        else {
            this.documentEntity.CertificateDocumentId = '';
        }
        this.documentEntity.CertificateDocumentName = '';
        this.documentEntity.UserDocumentId = UserDocumentId;
        this.documentEntity.UserCertificateId = this.certificateDetail.UserCertificateId;
        this.ProfileService.getById(this.certificateDetail.CertificateId)
            .then(function (data) {
            //this.documentList = data;
            var data1;
            data1 = data;
            var documentSelect = {
                CertificateDocumentId: '',
                DocumentName: _this.globals.adminTranslationText.document.form.documentType.select,
                Value: ""
            };
            _this.documentList.push(documentSelect);
            _this.documentList = _this.documentList.concat(data1);
            _this.documentList = _this.documentList.filter(function (docs) {
                return docs.flag == 0;
            });
            setTimeout(function () {
                $('#CertificateDocumentId').selectpicker('refresh');
            }, 100);
            for (var i = 0; i < _this.certificateDocuments.length; i++) {
                if (_this.certificateDocuments[i].CertificateDocumentId > 0) {
                    for (var i = 0; i < _this.documentList.length; i++) {
                        if (UserDocumentId == 0) {
                            if (_this.certificateDocuments[i].CertificateDocumentId == _this.documentList[i].CertificateDocumentId) {
                                _this.documentList[i].flag = 1;
                            }
                        }
                    }
                }
            }
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
    };
    CertificateDetailComponent.prototype.documentSubmit = function (documentForm) {
        var _this = this;
        this.submitted1 = true;
        if (documentForm.valid) {
            var file1_2 = '';
            var fd = new FormData();
            var total = 0;
            this.documentEntity.Document = [];
            if (this.documentEntity.CertificateDocumentId != '' && this.documentEntity.CertificateDocumentName != '') {
                file1_2 = this.elem.nativeElement.querySelector('#CertificateDocumentName').files;
                if (file1_2 && file1_2.length != 0) {
                    total = file1_2.length;
                    for (var k = 0; k < file1_2.length; k++) {
                        var Images = Date.now() + '_' + file1_2[k]['name'];
                        fd.append('Document' + k, file1_2[k], Images);
                        this.documentEntity.Document.push(Images);
                        this.documentEntity.CertificateDocumentName = Images;
                    }
                }
                else {
                    fd.append('Document', null);
                    this.documentEntity.Document = null;
                }
            }
            //CertificateName,UserName
            this.documentEntity.UserDocuments = [{
                    UserDocumentId: this.documentEntity.UserDocumentId, UserCertificateId: this.documentEntity.UserCertificateId,
                    CertificateDocumentId: this.documentEntity.CertificateDocumentId, CertificateDocumentName: this.documentEntity.CertificateDocumentName,
                    DocumentUrl: '/assests/Documents/', UserId: this.globals.authData.UserId, documentCount: this.documentList.length,
                    UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName, CertificateName: this.certificateDetail.CertificateName, LoginURL: '/login'
                }];
            //console.log(this.documentEntity.UserDocuments);
            if (this.documentEntity.CertificateDocumentId != '' && this.documentEntity.CertificateDocumentName != '') {
                this.globals.isLoading = true;
                this.ProfileService.addDocument(this.documentEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.btn_disable = false;
                    _this.submitted1 = false;
                    if (file1_2) {
                        _this.ProfileService.uploadFileCertificate(fd, total, _this.globals.authData.UserId)
                            .then(function (data) {
                            $("#CertificateDocumentName").val(null);
                            $("#documentModal").hide();
                            swal({
                                type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                                title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                                text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                                showConfirmButton: false,
                                timer: 3000
                            });
                            var userCertificateId = window.atob(_this.route.snapshot.paramMap.get('usercertificateid'));
                            window.location.href = '/certificateDetails/' + userCertificateId;
                        }, function (error) {
                            _this.btn_disable = false;
                            _this.globals.isLoading = false;
                            _this.globals.pageNotfound(error.error.code);
                        });
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        var userCertificateId = window.atob(_this.route.snapshot.paramMap.get('usercertificateid'));
                        window.location.href = '/certificateDetails/' + userCertificateId;
                    }
                }, function (error) {
                    _this.btn_disable = false;
                    _this.submitted1 = false;
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
        }
    };
    CertificateDetailComponent.prototype.CancelAssessmentView = function (assessment) {
        this.submitted2 = false;
        this.cancelAssessmentEntity.AssignDate = assessment.AssignDate;
        this.cancelAssessmentEntity.StartTime = assessment.StartTime;
        this.cancelAssessmentEntity.EndTime = assessment.EndTime;
    };
    CertificateDetailComponent.prototype.cancelAssessment = function (cancelAssessmentForm) {
        var _this = this;
        this.submitted2 = true;
        if (cancelAssessmentForm.valid) {
            this.cancelAssessmentEntity.ScheduleAssessmentId = this.ScheduleAssessmentId; // this.certificateDetail.ScheduleAssessmentId;
            this.cancelAssessmentEntity.FirstName = this.globals.authData.FirstName;
            this.cancelAssessmentEntity.LastName = this.globals.authData.LastName;
            this.cancelAssessmentEntity.CertificateName = this.certificateDetail.CertificateName;
            this.cancelAssessmentEntity.LoginURL = '/login';
            this.cancelAssessmentEntity.UserId = this.globals.authData.UserId;
            console.log(this.cancelAssessmentEntity);
            this.globals.isLoading = true;
            this.DashboardService.cancelAssessment(this.cancelAssessmentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.cancelAssessmentEntity = {};
                _this.btn_disable = false;
                _this.submitted2 = false;
                swal({
                    type: _this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.alerts.type,
                    title: _this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.alerts.title,
                    text: _this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.alerts.text,
                    showConfirmButton: false,
                    timer: 5000
                });
                window.location.href = '/certificateDetails/' + _this.certificateDetail.UserCertificateId;
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted1 = false;
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
    CertificateDetailComponent.prototype.payment = function (value) {
        var _this = this;
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_MHAfUuQx0qo9YiakFP8KMX75009DxAx6R1',
            locale: 'auto',
            currency: this.globals.selectedCurrency,
            token: function (token) {
                _this.btn_disable = true;
                _this.globals.isLoading = true;
                var date = new Date();
                var postData = {};
                postData['userCertificateId'] = window.atob(_this.certificateDetail.UserCertificateId);
                postData['token_id'] = token.id;
                postData['TotalAmount'] = _this.certificateDetail.USDPrice;
                postData['currency'] = _this.globals.selectedCurrency;
                postData['email'] = _this.globals.authData.EmailAddress;
                postData['UserId'] = _this.globals.authData.UserId;
                postData['CertificateName'] = _this.certificateDetail.CertificateName;
                postData['LoginURL'] = '/login';
                postData['forRenewal'] = value;
                _this.DashboardService.addPayment(postData)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.btn_disable = false;
                    if (value == 0) {
                        _this.certificateDetail.CertificateStatus = 62;
                        _this.certificateDetail.CertificateStatusText = 'Paid';
                        swal({
                            type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.type,
                            title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.title,
                            text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        _this.router.navigate[('/certificateDetails/' + _this.certificateDetail.UserCertificateId)];
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.type,
                            title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.title,
                            text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        window.location.href = '/certificateDetails/' + _this.certificateDetail.UserCertificateId;
                    }
                }, function (error) {
                    _this.globals.isLoading = false;
                    //this.submitted1 = false;
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
        });
        console.log(handler);
        handler.open({
            name: 'Assessment',
            //description: this.globals.CartItemCount + ' Products',
            amount: this.certificateDetail.USDPrice * 100,
            email: this.globals.authData.EmailAddress
        });
    };
    CertificateDetailComponent.prototype.recertification = function () {
        var _this = this;
        swal({
            title: this.globals.commonTranslationText.candidateDashboardPage.alerts.recertification.title,
            text: this.globals.commonTranslationText.candidateDashboardPage.alerts.recertification.text,
            icon: "warning",
            type: this.globals.commonTranslationText.candidateDashboardPage.alerts.recertification.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                var handler = window.StripeCheckout.configure({
                    key: 'pk_test_MHAfUuQx0qo9YiakFP8KMX75009DxAx6R1',
                    locale: 'auto',
                    currency: _this.globals.selectedCurrency,
                    token: function (token) {
                        _this.btn_disable = true;
                        _this.globals.isLoading = true;
                        var date = new Date();
                        var postData = {};
                        postData['CertificateId'] = _this.certificateDetail.CertificateId;
                        postData['userCertificateId'] = _this.certificateDetail.UserCertificateId;
                        postData['token_id'] = token.id;
                        postData['TotalAmount'] = _this.certificateDetail.USDPrice;
                        postData['currency'] = _this.globals.selectedCurrency;
                        postData['email'] = _this.globals.authData.EmailAddress;
                        postData['UserId'] = _this.globals.authData.UserId;
                        postData['CertificateName'] = _this.certificateDetail.CertificateName;
                        postData['LoginURL'] = '/login';
                        _this.DashboardService.addRecertification(postData)
                            .then(function (data) {
                            _this.globals.isLoading = false;
                            swal({
                                type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.recertificationSuccess.type,
                                title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.recertificationSuccess.title,
                                text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.recertificationSuccess.text,
                                showConfirmButton: false,
                                timer: 4000
                            });
                            window.location.href = '/dashboard';
                        }, function (error) {
                            _this.globals.isLoading = false;
                            //this.submitted1 = false;
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
                });
                console.log(handler);
                handler.open({
                    name: 'Assessment',
                    //description: this.globals.CartItemCount + ' Products',
                    amount: _this.certificateDetail.USDPrice * 100,
                    email: _this.globals.authData.EmailAddress
                });
            }
        });
    };
    CertificateDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-certificate-detail',
            templateUrl: './certificate-detail.component.html',
            styleUrls: ['./certificate-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Globals, ActivatedRoute, DashboardService, ElementRef, ProfileService])
    ], CertificateDetailComponent);
    return CertificateDetailComponent;
}());
export { CertificateDetailComponent };
//# sourceMappingURL=certificate-detail.component.js.map