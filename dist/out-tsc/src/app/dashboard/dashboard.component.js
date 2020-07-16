import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { DashboardService } from '../services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, globals, route, DashboardService) {
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.DashboardService = DashboardService;
        this.sort = [{
                field: 'CertificateName',
                dir: 'asc'
            }];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = true;
        this.certificateList = {};
        this.scheduleAssessmentListEntity = {};
        this.scheduleAssessmentEntity = {};
        this.scheduleEntity = {};
        this.Statuslist = [];
        this.FilterEntity = {};
        this.Certificatesnamelist = [];
        this.CertificatesNewlist = [];
        this.practiceTestHistoryEntity = {};
        this.assessmentDetailEntity = {};
        this.ValidAvailablePriorityDate1 = false;
        this.ValidAvailablePriorityDate2 = false;
        this.ValidAvailablePriorityDate3 = false;
        this.viewResultStatus = false;
        this.FilterEntity.statusid = null;
        this.FilterEntity.CertificateId = null;
        var todaysdate = this.globals.todaysdate;
        this.renewButtonDisplay = false;
        this.DashboardService.getById(this.globals.authData.UserId)
            .then(function (data) {
            debugger;
            _this.certificateList = data['certificateList'];
            // this.Statuslist = data['defalut']['Configuration'];
            // this.Certificatesnamelist = data['defalut']['Certificates'];
            // var certificateSelect =  {
            //   CertificateId:'',
            //   CertificateName: "Select Certificate Name",
            //   Value: ""
            // }
            // this.Certificatesnamelist.push(certificateSelect);
            _this.Certificatesnamelist = _this.Certificatesnamelist.concat(data['defalut']['Certificates']);
            // var statusSelect =  {
            //   ConfigurationId:'',
            //   DisplayText: "Select Status",
            //   Value: ""
            // }
            // this.Statuslist.push(statusSelect);
            _this.Statuslist = _this.Statuslist.concat(data['defalut']['Configuration']);
            console.log(_this.certificateList);
            for (var i = 0; i < _this.certificateList.length; i++) {
                if (_this.certificateList[i].CertificateStatus == 64 && _this.certificateList[i].IsRenewable == 1) {
                    debugger;
                    var beforedate = new Date(_this.certificateList[i].CertificationEndDate);
                    var numberOfDaysTominus = JSON.parse(_this.certificateList[i].BeforeRenewButtonDisplay);
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
                    var afterdate = new Date(_this.certificateList[i].CertificationEndDate);
                    var numberOfDaysToAdd = JSON.parse(_this.certificateList[i].AfterRenewButtonDisplay);
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
                    if (BeforeRenewButtonDisplay <= todaysdate && todaysdate <= AfterRenewButtonDisplay) {
                        _this.certificateList[i].renewButtonDisplay = true;
                        _this.certificateList[i].certificateAmount = _this.certificateList[i].RenewalUSDPrice;
                    }
                    else {
                        _this.certificateList[i].renewButtonDisplay = false;
                        _this.certificateList[i].certificateAmount = _this.certificateList[i].USDPrice;
                    }
                    console.log(_this.certificateList[i].USDPrice + " " + _this.certificateList[i].RenewalUSDPrice);
                }
                else {
                    debugger;
                    console.log(_this.certificateList[i].USDPrice + " " + _this.certificateList[i].RenewalUSDPrice);
                    _this.certificateList[i].certificateAmount = _this.certificateList[i].USDPrice;
                }
            }
            // setTimeout(function () {
            //   var table = $('#list_tables').DataTable({
            //     // scrollY: '55vh',
            //     scrollCollapse: true,
            //     "oLanguage": {
            //       "sLengthMenu": "_MENU_ Certificates per page",
            //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Certificates",
            //       "sInfoFiltered": "(filtered from _MAX_ total Certificates)",
            //       "sInfoEmpty": "Showing 0 to 0 of 0 Certificates"
            //     },
            //     aoColumnDefs: [{ "aTargets": [0], "bSortable": false }],
            //     dom: 'lBfrtip',
            //     buttons: [
            //       {
            //         extend: 'excel',
            //         title: 'Assessment – All Certificates – ' + todaysdate,
            //         filename: 'Assessment–AllCertificates–' + todaysdate,
            //         customize: function (xlsx) {
            //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
            //           source.setAttribute('name', 'Assessment-AllCertificates');
            //         },
            //         exportOptions: {
            //           columns: [1, 2, 3, 4]
            //         }
            //       },
            //       {
            //         extend: 'print',
            //         title: 'Assessment – All Certificates – ' + todaysdate,
            //         exportOptions: {
            //           columns: [1, 2, 3, 4]
            //         }
            //       },
            //     ]
            //   });
            //   $(".buttons-print").append("<i class='fa fa-print'></i>");
            //   $('.buttons-print').attr('title', 'Print');
            //   $('.buttons-print').attr('data-toggle', 'tooltip');
            //   $('.buttons-print').attr('data-placement', 'top');
            //   $(".buttons-excel").append("<i class='fa fa-file-excel-o'></i>");
            //   $('.buttons-excel').attr('title', 'Export to Excel');
            //   $('.buttons-excel').attr('data-toggle', 'tooltip');
            //   $('.buttons-excel').attr('data-placement', 'top');
            //   $('select').selectpicker();
            // }, 100);
            // this.CertificatesNewlist = data['certificate'];
            // setTimeout(function () {
            //   $('select').selectpicker();
            // }, 100);
            // this.globals.isLoading = false;
            _this.gridData = data['certificate'];
            _this.CertificatesNewlist = data['certificate'];
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
        // $(".form_date").change(function(){
        //   alert(this.value);
        //   var someDate = new Date(this.value);
        //   //var numberOfDaysToAdd = JSON.parse(this.scheduleEntity.ScheduleAfterDaysForCandidate);
        //   //someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
        //   var dd = someDate.getDate() + 1;
        //   var mm = someDate.getMonth() + 1;
        //   var y = someDate.getFullYear();
        //   var someFormattedDate = y+'-'+ mm + '-'+ dd;
        //   var dateRange = ["2019-10-27"];   
        //   for (var d = new Date(this.value); d <= new Date(this.value); d.setDate(d.getDate() + 1)) {
        //     dateRange.push($.datepicker.formatDate('yyyy-mm-dd', d));
        // }
        // // use this array 
        //   $('#AvailablePriorityDate2').datetimepicker({
        //     weekStart: 1,
        //     todayBtn: 1,
        //     autoclose: 1,
        //     todayHighlight: 1,
        //     startView: 2,
        //     minView: 2,
        //     forceParse: 0,
        //     pickTime: false,
        //     format: 'yyyy-mm-dd',
        //     beforeShowDay: function (date) {
        //       var dateString = $.datepicker.formatDate('yyyy-mm-dd', date);
        //       alert(dateRange.indexOf(dateString) == -1);
        //   }
        //   });
        // });
        setTimeout(function () {
            // $('select').selectpicker();
            $('input[name="OrderDateFrom"]').daterangepicker({
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear'
                }
            });
            $('input[name="OrderDateFrom"]').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            });
            $('input[name="OrderDateFrom"]').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
        }, 1000);
        var certificateId = 10;
        new PerfectScrollbar('.lastass_scroll');
    };
    DashboardComponent.prototype.viewDetails = function (id) {
        // router.navigate(['/certificateDetails', scheduledata.UserCertificateId]);
        this.router.navigate(['/certificateDetails/' + window.btoa(id)]);
    };
    DashboardComponent.prototype.viewSchedule = function (i) {
        this.scheduleEntity = i; // this.certificateList[i];
        this.scheduleEntity.userCertificateId = window.btoa(this.scheduleEntity.userCertificateId);
        var someDate = new Date();
        var numberOfDaysToAdd = JSON.parse(this.scheduleEntity.ScheduleAfterDaysForCandidate);
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        this.someFormattedDate = y + '-' + mm + '-' + dd;
        $('#AvailablePriorityDate1').datetimepicker({
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
        }).change(this.dateChanged);
    };
    DashboardComponent.prototype.dateChanged = function () {
        console.log(this.certificateList);
        // var someDate = new Date();
        // var numberOfDaysToAdd = JSON.parse(this.scheduleEntity.ScheduleAfterDaysForCandidate);
        // someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
        // var dd = someDate.getDate();
        // var mm = someDate.getMonth() + 1;
        // var y = someDate.getFullYear();
        // var someFormattedDate = y+'-'+ mm + '-'+ dd;alert(someFormattedDate);
        var someDate1 = new Date($("#AvailablePriorityDate1").val());
        var dd1 = someDate1.getDate();
        var mm1 = someDate1.getMonth() + 1;
        var y1 = someDate1.getFullYear();
        var someFormattedDate1 = y1 + '-' + mm1 + '-' + dd1;
        $("#AvailablePriorityDate2").datetimepicker({
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
        $("#AvailablePriorityDate3").datetimepicker({
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
    DashboardComponent.prototype.scheduleAssessment = function (scheduleAssessmentForm) {
        var _this = this;
        this.scheduleAssessmentEntity.AvailablePriorityDate1 = $("#AvailablePriorityDate1").val();
        this.scheduleAssessmentEntity.AvailablePriorityDate2 = $("#AvailablePriorityDate2").val();
        this.scheduleAssessmentEntity.AvailablePriorityDate3 = $("#AvailablePriorityDate3").val();
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
            this.scheduleAssessmentEntity.CertificateName = this.scheduleEntity.CertificateName;
            this.scheduleAssessmentEntity.LoginURL = '/login';
            this.scheduleAssessmentEntity.CertificateId = this.scheduleEntity.CertificateId;
            this.scheduleAssessmentEntity.UserCertificateId = this.scheduleEntity.UserCertificateId;
            this.scheduleAssessmentEntity.IsDocumentVerificationRequired = this.scheduleEntity.IsDocumentVerificationRequired;
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
                        else {
                            $("#schedule").modal('hide');
                            _this.scheduleAssessmentEntity = {};
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
                        else {
                            $("#schedule").modal('hide');
                            _this.scheduleAssessmentEntity = {};
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
                        else {
                            $("#schedule").modal('hide');
                            _this.scheduleAssessmentEntity = {};
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
                        else {
                            $("#schedule").modal('hide');
                            _this.scheduleAssessmentEntity = {};
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
                            _this.router.navigate(['/certificateDetails/' + _this.scheduleEntity.UserCertificateId]);
                        }
                        else {
                            $("#schedule").modal('hide');
                            _this.scheduleAssessmentEntity = {};
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
                    _this.scheduleAssessmentEntity = {};
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
                            _this.router.navigate(['/certificateDetails/' + _this.scheduleEntity.UserCertificateId]);
                        }
                        else {
                            $("#schedule").modal('hide');
                            _this.scheduleAssessmentEntity = {};
                        }
                    });
                }
                else {
                    $("#schedule").modal('hide');
                    _this.scheduleAssessmentEntity = {};
                    scheduleAssessmentForm.form.markAsPristine();
                    // for(var i=0;i<this.certificateList.length;i++)
                    // {
                    //   if(this.certificateList[i].CertificateId == this.scheduleEntity.CertificateId)
                    //   {
                    //     this.certificateList[i].ScheduleStatusId = 15;
                    //   }
                    // }
                    swal({
                        type: _this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.type,
                        title: _this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    window.location.href = '/dashboard';
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
    DashboardComponent.prototype.viewReschedule = function (i) {
        this.scheduleEntity = i; //this.certificateList[i];
        this.scheduleEntity.userCertificateId = window.btoa(this.scheduleEntity.userCertificateId);
        var someDate = new Date();
        var numberOfDaysToAdd = JSON.parse(this.scheduleEntity.ScheduleAfterDaysForCandidate);
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        this.someFormattedDate = y + '-' + mm + '-' + dd;
        $('#RescheduleAvailablePriorityDate1').datetimepicker({
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
        }).change(this.RescheduledateChanged);
    };
    DashboardComponent.prototype.RescheduledateChanged = function () {
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
    DashboardComponent.prototype.RescheduleAssessment = function (RescheduleAssessmentForm) {
        var _this = this;
        this.scheduleAssessmentEntity.AvailablePriorityDate1 = $("#RescheduleAvailablePriorityDate1").val();
        this.scheduleAssessmentEntity.AvailablePriorityDate2 = $("#RescheduleAvailablePriorityDate2").val();
        this.scheduleAssessmentEntity.AvailablePriorityDate3 = $("#RescheduleAvailablePriorityDate3").val();
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
            this.scheduleAssessmentEntity.CertificateName = this.scheduleEntity.CertificateName;
            this.scheduleAssessmentEntity.LoginURL = '/login';
            this.scheduleAssessmentEntity.CertificateId = this.scheduleEntity.CertificateId;
            this.scheduleAssessmentEntity.UserCertificateId = this.scheduleEntity.UserCertificateId;
            this.scheduleAssessmentEntity.IsDocumentVerificationRequired = this.scheduleEntity.IsDocumentVerificationRequired;
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
                            $("#reschedule").modal('hide');
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
                            $("#reschedule").modal('hide');
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
                            $("#reschedule").modal('hide');
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
                            $("#reschedule").modal('hide');
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
                            $("#reschedule").modal('hide');
                            _this.router.navigate(['/certificateDetails/' + _this.scheduleEntity.UserCertificateId]);
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
                    $("#reschedule").modal('hide');
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
                            $("#reschedule").modal('hide');
                            _this.router.navigate(['/certificateDetails/' + _this.scheduleEntity.UserCertificateId]);
                        }
                    });
                }
                else {
                    $("#reschedule").modal('hide');
                    _this.scheduleAssessmentEntity = {};
                    RescheduleAssessmentForm.form.markAsPristine();
                    for (var i = 0; i < _this.certificateList.length; i++) {
                        if (_this.certificateList[i].CertificateId == _this.scheduleEntity.CertificateId) {
                            _this.certificateList[i].ScheduleStatusId = 15;
                        }
                    }
                    swal({
                        type: _this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.type,
                        title: _this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.title,
                        text: _this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.text,
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
    DashboardComponent.prototype.practicetest = function (CertificateId, UserCertificateId) {
        this.router.navigate(['/practice-test/' + window.btoa(CertificateId) + '/' + window.btoa(UserCertificateId) + '/' + 0]);
    };
    DashboardComponent.prototype.assessmenttest = function (CertificateId, UserCertificateId, ScheduleAssessmentId, UserAssessmentId) {
        var scheduleAssessmentId = 0;
        if (scheduleAssessmentId != null)
            scheduleAssessmentId = ScheduleAssessmentId;
        this.router.navigate(['/assessmentPanel/' + window.btoa(CertificateId) + '/' + window.btoa(UserCertificateId) + '/' + window.btoa(scheduleAssessmentId) + '/' + window.btoa(UserAssessmentId)]);
    };
    DashboardComponent.prototype.viewPracticeTestHistory = function (i) {
        debugger;
        this.practiceTestHistoryEntity = i; //this.certificateList[i];
        var historydetail = this.practiceTestHistoryEntity.TotalPracticeTest;
        var count = 0;
        for (var j = 0; j < historydetail.length; j++) {
            if (historydetail[j].PracticeTestStatusId == 0) {
                count = 1;
            }
            if (count == 1)
                this.viewResultStatus = true;
            else
                this.viewResultStatus = false;
        }
    };
    DashboardComponent.prototype.SearchFilter = function (SearchFilterForm) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        // if (this.FilterEntity.statusid != null) {
        //   this.FilterEntity.statusid = this.FilterEntity.statusid.toString();
        // } else {
        //   this.FilterEntity.statusid = null;
        // }
        // if (this.FilterEntity.CertificateId != null) {
        //   this.FilterEntity.CertificateId = this.FilterEntity.CertificateId.toString();
        // } else {
        //   this.FilterEntity.CertificateId = null;
        // }
        if (this.FilterEntity.OrderDateFrom != undefined) {
            var d = new Date(this.FilterEntity.OrderDateFrom);
            var OrderFromMonth = d.getMonth() + 1;
            var OrderFromDate = d.getDate();
            var OrderFromYear = d.getFullYear();
            this.FilterEntity.OrderDateFrom = OrderFromYear + '/' + (OrderFromMonth < 10 ? '0' + OrderFromMonth : '' + OrderFromMonth) + '/' + ((OrderFromDate < 10 ? '0' + OrderFromDate : '' + OrderFromDate));
        }
        if (this.FilterEntity.OrderDateTo != undefined) {
            var d1 = new Date(this.FilterEntity.OrderDateTo);
            var OrderToMonth = d1.getMonth() + 1;
            var OrderToDate = d1.getDate();
            var OrderToYear = d1.getFullYear();
            this.FilterEntity.OrderDateTo = OrderToYear + '/' + (OrderToMonth < 10 ? '0' + OrderToMonth : '' + OrderToMonth) + '/' + ((OrderToDate < 10 ? '0' + OrderToDate : '' + OrderToDate));
        }
        if (this.FilterEntity.OrderDateFrom != undefined && this.FilterEntity.OrderDateTo == undefined) {
            this.FilterEntity.OrderDateTo = this.FilterEntity.OrderDateFrom;
        }
        if (this.FilterEntity.OrderDateFrom == undefined && this.FilterEntity.OrderDateTo != undefined) {
            this.FilterEntity.OrderDateFrom = this.FilterEntity.OrderDateTo;
        }
        this.FilterEntity.UserId = this.globals.authData.UserId;
        this.DashboardService.searchCertificate(this.FilterEntity)
            //.map(res => res.json())
            .then(function (data) {
            _this.certificateList = data;
            console.log(_this.certificateList);
            _this.globals.isLoading = false;
            _this.FilterEntity = {};
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    DashboardComponent.prototype.dataClear = function () {
        debugger;
        console.log(this.CertificatesNewlist);
        // this.CertificatesNewlist = this.CertificatesNewlist.filter( cert => {
        //   cert.Check=false;
        // });
        for (var i = 0; i < this.CertificatesNewlist.length; i++) {
            this.CertificatesNewlist[i].certificateCheck = false;
        }
    };
    DashboardComponent.prototype.clearData = function (SearchFilterForm) {
        var _this = this;
        this.globals.isLoading = true;
        this.DashboardService.getById(this.globals.authData.UserId)
            //.map(res => res.json())
            .then(function (data) {
            _this.FilterEntity = {};
            _this.certificateList = data['certificateList'];
            setTimeout(function () {
                $("#OrderDateFrom").val('');
                $('select').selectpicker();
                $('select').selectpicker("refresh");
            }, 200);
            _this.globals.isLoading = false;
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    DashboardComponent.prototype.DeleteCertificate = function (UserCertificateId, i) {
        var _this = this;
        debugger;
        swal({
            title: this.globals.commonTranslationText.certificate.list.alerts.deleteConfirm.title,
            text: this.globals.commonTranslationText.certificate.list.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.commonTranslationText.certificate.list.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                debugger;
                _this.globals.isLoading = true;
                var index = _this.certificateList.indexOf(i);
                if (index != -1) {
                    _this.certificateList.splice(index, 1);
                }
                _this.DashboardService.DeleteCertificate(_this.globals.authData.UserId, UserCertificateId)
                    //.map(res => res.json())
                    .then(function (data) {
                    _this.DashboardService.getById(_this.globals.authData.UserId)
                        .then(function (data) {
                        _this.CertificatesNewlist = data['certificate'];
                        _this.globals.isLoading = false;
                        setTimeout(function () {
                            $('select').selectpicker();
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
                    _this.certificateList = data['certificateList'];
                    swal({
                        type: _this.globals.commonTranslationText.certificate.list.alerts.deleteSuccess.type,
                        title: _this.globals.commonTranslationText.certificate.list.alerts.deleteSuccess.title,
                        text: _this.globals.commonTranslationText.certificate.list.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    _this.globals.isLoading = false;
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    DashboardComponent.prototype.addUserCertificate = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        var pusheditems = [];
        if (this.globals.authData.RoleId == 2) {
            this.CertificateFor = 1;
        }
        else {
            this.CertificateFor = 0;
        }
        for (var j = 0; j < this.CertificatesNewlist.length; j++) {
            if (this.CertificatesNewlist[j].certificateCheck == true) {
                this.CertificatesNewlist[j].certificateCheck = true;
                pusheditems.push(this.CertificatesNewlist[j].CertificateId);
            }
            else {
                this.CertificatesNewlist[j].certificateCheck = false;
            }
        }
        if (pusheditems.length > 0) {
            var add = { 'UserId': this.globals.authData.UserId, 'CertificatesNewlist': pusheditems, 'CertificateFor': this.CertificateFor };
            this.DashboardService.AddCertificate(add)
                //.map(res => res.json())
                .then(function (data) {
                debugger;
                $("#NewCertificate").modal('hide');
                _this.DashboardService.getById(_this.globals.authData.UserId)
                    .then(function (data) {
                    _this.certificateList = data['certificateList'];
                    //this.Certificatesnamelist = data['defalut']['Certificates'];
                    // var certificateSelect =  {
                    //   CertificateId:'',
                    //   CertificateName: "Select Certificate Name",
                    //   Value: ""
                    // }
                    // this.Certificatesnamelist.push(certificateSelect);
                    _this.Certificatesnamelist = _this.Certificatesnamelist.concat(data['defalut']['Certificates']);
                    _this.CertificatesNewlist = data['certificate'];
                    for (var i = 0; i < _this.certificateList.length; i++) {
                        _this.certificateList[i].certificateAmount = _this.certificateList[i].USDPrice;
                    }
                    setTimeout(function () {
                        $('select').selectpicker();
                    }, 200);
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.certificate.list.alerts.paymentConfirm.type,
                        title: _this.globals.commonTranslationText.certificate.list.alerts.paymentConfirm.title,
                        text: _this.globals.commonTranslationText.certificate.list.alerts.paymentConfirm.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    _this.router.navigate(['dashboard']);
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }, function (error) {
                _this.globals.isLoading = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            swal({
                type: this.globals.commonTranslationText.certificate.list.alerts.checkboxalert.type,
                title: this.globals.commonTranslationText.certificate.list.alerts.checkboxalert.title,
                showConfirmButton: false,
                timer: 3000
            });
            this.globals.isLoading = false;
        }
    };
    DashboardComponent.prototype.payment = function (scheduledata, i, value) {
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
                postData['userCertificateId'] = scheduledata.UserCertificateId;
                postData['token_id'] = token.id;
                postData['TotalAmount'] = scheduledata.USDPrice;
                postData['currency'] = _this.globals.selectedCurrency;
                postData['email'] = _this.globals.authData.EmailAddress;
                postData['UserId'] = _this.globals.authData.UserId;
                postData['RoleId'] = _this.globals.authData.RoleId;
                postData['UserName'] = _this.globals.authData.FirstName + " " + _this.globals.authData.LastName;
                postData['CertificateName'] = scheduledata.CertificateName;
                postData['LoginURL'] = '/login';
                postData['forRenewal'] = value;
                _this.DashboardService.addPayment(postData)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    if (value == 0) {
                        _this.certificateList[i].CertificateStatus = 62;
                        _this.certificateList[i].CertificateStatusText = 'Paid';
                        swal({
                            type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.type,
                            title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.title,
                            text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        _this.router.navigate[('/dashboard/')];
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.type,
                            title: _this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.title,
                            text: _this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        window.location.href = '/dashboard';
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
            amount: scheduledata.USDPrice * 100,
            email: this.globals.authData.EmailAddress
        });
    };
    DashboardComponent.prototype.recertification = function (scheduledata) {
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
                        postData['CertificateId'] = scheduledata.CertificateId;
                        postData['userCertificateId'] = scheduledata.UserCertificateId;
                        postData['token_id'] = token.id;
                        postData['TotalAmount'] = scheduledata.USDPrice;
                        postData['currency'] = _this.globals.selectedCurrency;
                        postData['email'] = _this.globals.authData.EmailAddress;
                        postData['UserId'] = _this.globals.authData.UserId;
                        postData['RoleId'] = _this.globals.authData.RoleId;
                        postData['UserName'] = _this.globals.authData.FirstName + " " + _this.globals.authData.LastName;
                        postData['CertificateName'] = scheduledata.CertificateName;
                        postData['LoginURL'] = '/login';
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
                            window.location.href = '/dashboard/';
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
                    amount: scheduledata.USDPrice * 100,
                    email: _this.globals.authData.EmailAddress
                });
            }
        });
    };
    DashboardComponent.prototype.onFilter = function (inputValue) {
        this.CertificatesNewlist = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'CertificateName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'USDPrice',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'CertificationDuration',
                        operator: 'contains',
                        value: inputValue
                    }
                ],
            }
        }).data;
        this.dataBinding.skip = 0;
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], DashboardComponent.prototype, "dataBinding", void 0);
    DashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Globals, ActivatedRoute, DashboardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map