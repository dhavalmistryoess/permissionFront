import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DashboardService } from '../services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, globals, route, DashboardService) {
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.DashboardService = DashboardService;
        this.chartArr = {
            data: [],
            selectedYear: '',
            selectedQuarter: 'all',
        };
        this.mySelection = [];
        this.sort = [{
                field: 'StartTime',
                dir: 'asc'
            }];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = true;
        this.defaultDashboardEntity = {};
        this.attendanceSheetList = [];
        this.calendarDetailsList = [];
        this.monthlyProctoringList = {};
        this.changePresentStatusEntity = {};
        this.finalFeedbackEntity = {};
        this.resumeAssessmentEntity = {};
        this.stopAssessmentEntity = {};
        this.yearsList = [];
        this.mandatoryDocumentsList = [];
        this.optionalDocumentsList = [];
        this.documentVerificationEntity = {};
        this.currentDate = new Date();
        this.DashboardService.getById()
            .then(function (data) {
            debugger;
            _this.globals.isLoading = false;
            _this.defaultDashboardEntity = data;
            console.log(_this.defaultDashboardEntity);
            _this.attendanceSheetList = data['AttendanceSheet'];
            for (var i = 0; i < _this.attendanceSheetList.length; i++) {
                var hour1 = (_this.attendanceSheetList[i].StartTime.split(':'))[0];
                var min = (_this.attendanceSheetList[i].StartTime.split(':'))[1];
                var part = hour1 > 12 ? 'pm' : 'am';
                min = (min + '').length == 1 ? "0" + min : min;
                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                _this.attendanceSheetList[i].startTime = hour1 + ':' + min + part;
                var hour2 = (_this.attendanceSheetList[i].EndTime.split(':'))[0];
                var min2 = (_this.attendanceSheetList[i].EndTime.split(':'))[1];
                var part2 = hour2 > 12 ? 'pm' : 'am';
                min2 = (min2 + '').length == 1 ? "0" + min2 : min2;
                hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                hour2 = (hour2 + '').length == 1 ? "0" + hour2 : hour2;
                _this.attendanceSheetList[i].endTime = hour2 + ':' + min2 + part;
            }
            _this.gridData = data['AttendanceSheet'];
            _this.calendarDetailsList = data['CalendarDetails'];
            _this.monthlyProctoringList = data['MonthlyProctoring'];
            _this.yearsList = data['Years'];
            _this.chartArr.selectedYear = _this.yearsList[_this.yearsList.length - 1];
            _this.getQuarterData(_this.chartArr.selectedYear, 'all');
            //this.mandatoryDocumentsList = data['MandatoryDocuments'];
            //this.optionalDocumentsList = data['OptionalDocuments'];
            var todaysdate = _this.globals.todaysdate;
            console.log(_this.calendarDetailsList);
            // setTimeout(function () {
            //   var table = $('#dataTables-example').DataTable({
            //     scrollCollapse: true,
            //     "oLanguage": {
            //       "sLengthMenu": "_MENU_ Candidates per page",
            //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Candidates",
            //       "sInfoFiltered": "(filtered from _MAX_ total Candidates)",
            //       "sInfoEmpty": "Showing 0 to 0 of 0 Candidates"
            //     },
            //     "aoColumnDefs": [
            //       { 'bSortable': false, 'aTargets': [8, 9] }
            //     ],
            //     dom: 'lBfrtip',
            //     buttons: [
            //     ]
            //   });
            // }, 100);
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listWeek'
                },
                defaultDate: new Date(),
                defaultView: 'agendaWeek',
                navLinks: true,
                eventLimit: true,
                height: 500,
                events: _this.calendarDetailsList,
                eventRender: function (event, element) {
                    var tooltip = event.CertificateName;
                    element.popover({
                        title: event.CertificateName,
                        placement: 'right',
                        content: 'Total Candidate: ' + event.totalCandidates + '<br />Certificate Name: ' + event.CertificateName + '<br />Full Address: ' + event.FullAddress +
                            '<br />Start: ' + event.start.format('MM-DD-YYYYThh:mm') + '<br />End: ' + event.end.format('MM-DD-YYYYThh:mm'),
                        container: 'body',
                        html: true
                    });
                    $(element).tooltip({ title: event.CertificateName, html: true, container: "body" });
                }
            });
            am4core.ready(function () {
                var chart = am4core.create("reject_stopped_proctor", am4charts.RadarChart);
                chart.data = [{
                        "month": "January",
                        "value": 80,
                        "full": 100
                    }, {
                        "month": "February",
                        "value": 35,
                        "full": 100
                    }, {
                        "month": "March",
                        "value": 92,
                        "full": 100
                    }];
                // Make chart not full circle
                chart.startAngle = -90;
                chart.endAngle = 180;
                chart.innerRadius = am4core.percent(20);
                // Set number format
                chart.numberFormatter.numberFormat = "#.#'%'";
                // Create axes
                var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "month";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.grid.template.strokeOpacity = 0;
                categoryAxis.renderer.labels.template.horizontalCenter = "right";
                // categoryAxis.renderer.labels.template.fontWeight = 500;
                categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
                    return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
                });
                categoryAxis.renderer.minGridDistance = 10;
                var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.grid.template.strokeOpacity = 0;
                valueAxis.min = 0;
                valueAxis.max = 100;
                valueAxis.strictMinMax = true;
                // Create series
                var series1 = chart.series.push(new am4charts.RadarColumnSeries());
                series1.dataFields.valueX = "full";
                series1.dataFields.categoryY = "month";
                series1.clustered = false;
                series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
                series1.columns.template.fillOpacity = 0.08;
                // series1.columns.template.cornerRadiusTopLeft = 20;
                series1.columns.template.strokeWidth = 0;
                series1.columns.template.radarColumn.cornerRadius = 20;
                var series2 = chart.series.push(new am4charts.RadarColumnSeries());
                series2.dataFields.valueX = "value";
                series2.dataFields.categoryY = "month";
                series2.clustered = false;
                series2.columns.template.strokeWidth = 0;
                series2.columns.template.tooltipText = '[bold]{month} [/]\n Rejected: {value}\n Stopped: {value}';
                series2.columns.template.radarColumn.cornerRadius = 20;
                series2.columns.template.adapter.add("fill", function (fill, target) {
                    return chart.colors.getIndex(target.dataItem.index);
                });
                // Add cursor
                chart.cursor = new am4charts.RadarCursor();
            });
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            swal({
                type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                showConfirmButton: false,
                timer: 4000
            });
        });
        setTimeout(function () {
            // new PerfectScrollbar('.attendance_block');
            $('select').selectpicker();
            new PerfectScrollbar('.fc-scroller');
        }, 500);
        new PerfectScrollbar('.rejected_proctor');
        new PerfectScrollbar('.monthly_proctor');
    };
    DashboardComponent.prototype.generateChart = function () {
        console.log(this.chartArr.data);
        if (this.chartArr.data.length != 0) {
            var chart = am4core.create("month_proctor", am4charts.XYChart);
            // Add data
            chart.data = this.chartArr.data;
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "month";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;
            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "value";
            series.dataFields.categoryX = "month";
            series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;
            // on hover, make corner radiuses bigger
            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });
            // Cursor
            chart.cursor = new am4charts.XYCursor();
        }
        else {
            // todo
            $("#month_proctor").html("No record Found");
        }
    };
    DashboardComponent.prototype.getQuarterData = function (year, quarterKey) {
        var data = [];
        if (this.monthlyProctoringList.length != 0) {
            if (quarterKey != "all") {
                data = this.monthlyProctoringList[year][quarterKey];
            }
            else {
                data = this.monthlyProctoringList[year]['firstQuarter'].concat(this.monthlyProctoringList[year]['secondQuarter'], this.monthlyProctoringList[year]['thirdQuarter'], this.monthlyProctoringList[year]['forthQuarter']);
            }
        }
        this.chartArr.data = data;
        this.chartArr.selectedQuarter = quarterKey;
        this.generateChart();
    };
    DashboardComponent.prototype.getYearlyData = function (e) {
        if (this.monthlyProctoringList.length != 0) {
            var yearly = this.monthlyProctoringList[e.target.value];
            this.chartArr.selectedYear = e.target.value;
            this.chartArr.data = yearly['firstQuarter'].concat(yearly['secondQuarter'], yearly['thirdQuarter'], yearly['forthQuarter']);
            this.chartArr.selectedQuarter = 'all';
        }
        this.generateChart();
    };
    //change candidate status present or absent
    DashboardComponent.prototype.ChangePresentStatus = function (attendance, i) {
        var _this = this;
        //if ($("#active" + i).prop("checked") == true) {
        if (i) {
            this.changePresentStatusEntity.IsActive = 1;
            attendance.DisplayText = 'Present';
        }
        else {
            this.changePresentStatusEntity.IsActive = 0;
            attendance.DisplayText = 'Absent';
        }
        this.globals.isLoading = true;
        this.changePresentStatusEntity.ProctorId = attendance.ProctorId;
        this.changePresentStatusEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.changePresentStatusEntity.UserCertificateId = attendance.UserCertificateId;
        this.DashboardService.ChangePresentStatus(this.changePresentStatusEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (_this.changePresentStatusEntity.IsActive == 1) {
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            window.location.href = '/admin/adminDashboard';
            _this.changePresentStatusEntity = {};
        }, function (error) {
            _this.globals.isLoading = false;
            swal({
                //position: 'top-end',
                type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                showConfirmButton: false,
                timer: 4000
            });
        });
    };
    //feedback popup open
    DashboardComponent.prototype.finalFeedbackShow = function (attendance) {
        this.finalFeedbackEntity = {};
        this.submitted1 = false;
        this.finalFeedbackEntity.ProctorId = attendance.ProctorId;
        this.finalFeedbackEntity.UserId = attendance.UserId;
        this.finalFeedbackEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.finalFeedbackEntity.CandidateName = attendance.CandidateName;
    };
    //final submit for feedback
    DashboardComponent.prototype.finalFeedbackSubmit = function (finalFeedbackForm) {
        var _this = this;
        this.submitted1 = true;
        if (finalFeedbackForm.valid) {
            this.globals.isLoading = true;
            this.DashboardService.finalFeedback(this.finalFeedbackEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.submitted1 = false;
                $("#FeedbackModal").modal('hide');
                finalFeedbackForm.form.markAsPristine();
                _this.finalFeedbackEntity = {};
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.finalFeedback.alerts.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.finalFeedback.alerts.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.finalFeedback.alerts.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }, function (error) {
                _this.globals.isLoading = false;
                swal({
                    //position: 'top-end',
                    type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            });
        }
    };
    //resume assessment
    DashboardComponent.prototype.resumeAssessment = function (attendance) {
        var _this = this;
        swal({
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.confirmResume.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.confirmResume.text,
            icon: "warning",
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.confirmResume.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No",
        })
            .then(function (result) {
            if (result.value) {
                _this.globals.isLoading = true;
                _this.resumeAssessmentEntity.ProctorId = attendance.ProctorId;
                _this.resumeAssessmentEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
                _this.DashboardService.ResumeAssessment(_this.resumeAssessmentEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.resumeAssessmentEntity = {};
                    swal({
                        type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.type,
                        title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.title,
                        text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    window.location.href = '/admin/adminDashboard';
                }, function (error) {
                    _this.globals.isLoading = false;
                    swal({
                        //position: 'top-end',
                        type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                        title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                        text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                });
            }
        });
    };
    //stop assessment popup open
    DashboardComponent.prototype.stopAssessmentShow = function (attendance) {
        this.stopAssessmentEntity = {};
        this.submitted2 = false;
        this.stopAssessmentEntity.StopAssessmentStatus = 43;
        this.stopAssessmentEntity.ProctorId = attendance.ProctorId;
        this.stopAssessmentEntity.UserId = attendance.UserId;
        this.stopAssessmentEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.stopAssessmentEntity.CandidateName = attendance.CandidateName;
        this.stopAssessmentEntity.CertificateName = attendance.CertificateName;
    };
    //stop assessment submit
    DashboardComponent.prototype.stopAssessmentSubmit = function (stopAssessmentForm) {
        var _this = this;
        this.submitted2 = true;
        if (stopAssessmentForm.valid) {
            this.globals.isLoading = true;
            this.stopAssessmentEntity.LoginURL = '/login';
            this.DashboardService.stopAssessment(this.stopAssessmentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                $("#StopModal").modal('hide');
                stopAssessmentForm.form.markAsPristine();
                _this.stopAssessmentEntity = {};
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.stopAssessment.alerts.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.stopAssessment.alerts.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.stopAssessment.alerts.text,
                    showConfirmButton: false,
                    timer: 4000
                });
                window.location.href = '/admin/adminDashboard';
            }, function (error) {
                _this.globals.isLoading = false;
                swal({
                    //position: 'top-end',
                    type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            });
        }
    };
    //get incomplete Assessment
    DashboardComponent.prototype.incompleteAssessment = function () {
        var _this = this;
        if ($("#check_list").prop('checked') == true) {
            this.globals.isLoading = true;
            this.DashboardService.getincompleteAssessment()
                .then(function (data) {
                console.log(data);
                //this.defaultDashboardEntity = data;
                _this.attendanceSheetList = data;
                for (var i = 0; i < _this.attendanceSheetList.length; i++) {
                    var hour1 = (_this.attendanceSheetList[i].StartTime.split(':'))[0];
                    var min = (_this.attendanceSheetList[i].StartTime.split(':'))[1];
                    var part = hour1 > 12 ? 'pm' : 'am';
                    min = (min + '').length == 1 ? "0" + min : min;
                    hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                    hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                    _this.attendanceSheetList[i].startTime = hour1 + ':' + min + part;
                    var hour2 = (_this.attendanceSheetList[i].EndTime.split(':'))[0];
                    var min2 = (_this.attendanceSheetList[i].EndTime.split(':'))[1];
                    var part2 = hour2 > 12 ? 'pm' : 'am';
                    min2 = (min2 + '').length == 1 ? "0" + min2 : min2;
                    hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                    hour2 = (hour2 + '').length == 1 ? "0" + hour2 : hour2;
                    _this.attendanceSheetList[i].endTime = hour2 + ':' + min2 + part;
                }
                _this.gridData = data;
                _this.globals.isLoading = false;
            }, function (error) {
                _this.globals.isLoading = false;
                if (error.text) {
                    swal({
                        //position: 'top-end',
                        type: 'error',
                        title: 'Oops...',
                        text: "Something went wrong!"
                    });
                }
            });
        }
        else {
            this.globals.isLoading = true;
            this.DashboardService.getById()
                .then(function (data) {
                console.log(data);
                _this.defaultDashboardEntity = data;
                _this.attendanceSheetList = data['AttendanceSheet'];
                _this.gridData = data['AttendanceSheet'];
                _this.calendarDetailsList = data['CalendarDetails'];
                _this.monthlyProctoringList = data['MonthlyProctoring'];
                _this.yearsList = data['Years'];
                var todaysdate = _this.globals.todaysdate;
                for (var i = 0; i < _this.attendanceSheetList.length; i++) {
                    var hour1 = (_this.attendanceSheetList[i].StartTime.split(':'))[0];
                    var min = (_this.attendanceSheetList[i].StartTime.split(':'))[1];
                    var part = hour1 > 12 ? 'pm' : 'am';
                    min = (min + '').length == 1 ? "0" + min : min;
                    hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                    hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                    _this.attendanceSheetList[i].startTime = hour1 + ':' + min + part;
                    var hour2 = (_this.attendanceSheetList[i].EndTime.split(':'))[0];
                    var min2 = (_this.attendanceSheetList[i].EndTime.split(':'))[1];
                    var part2 = hour2 > 12 ? 'pm' : 'am';
                    min2 = (min2 + '').length == 1 ? "0" + min2 : min2;
                    hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                    hour2 = (hour2 + '').length == 1 ? "0" + hour2 : hour2;
                    _this.attendanceSheetList[i].endTime = hour2 + ':' + min2 + part;
                }
                _this.globals.isLoading = false;
            }, function (error) {
                _this.globals.isLoading = false;
                if (error.text) {
                    swal({
                        //position: 'top-end',
                        type: 'error',
                        title: 'Oops...',
                        text: "Something went wrong!"
                    });
                }
            });
        }
    };
    //document verification popup open
    DashboardComponent.prototype.documentVerificationShow = function (attendance) {
        debugger;
        this.optionalDocumentsList = attendance['OptionalDocuments'];
        this.mandatoryDocumentsList = attendance['MandatoryDocuments'];
        this.commentDisplay = false;
        console.log(this.optionalDocumentsList);
        this.documentVerificationEntity = attendance;
        this.documentVerificationEntity.UserId = attendance.UserId;
        this.documentVerificationEntity.ProctorId = attendance.ProctorId;
        this.documentVerificationEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.documentVerificationEntity.CandidateName = attendance.CandidateName;
        this.documentVerificationEntity.CertificateName = attendance.CertificateName;
    };
    //verifiy for mandatory document status change
    DashboardComponent.prototype.mandatoryDocumentsStatusChange = function (mandatoryDocuments, i) {
        var _this = this;
        var IsVerify = 0;
        //if ($("#docactive" + i).is(':checked'))
        if (i)
            IsVerify = 1;
        this.globals.isLoading = true;
        this.DashboardService.VerifyDocument(mandatoryDocuments.UserDocumentCertificateMappingId, IsVerify)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (IsVerify == 1) {
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            swal({
                type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                showConfirmButton: false,
                timer: 4000
            });
        });
    };
    //verifiy for optional document status change
    DashboardComponent.prototype.optionalDocumentsStatusChange = function (optionalDocuments, i) {
        var _this = this;
        var IsVerify = 0;
        //if ($("#docoptionalactive" + i).is(':checked'))
        if (i)
            IsVerify = 1;
        this.globals.isLoading = true;
        this.DashboardService.VerifyDocument(optionalDocuments.UserDocumentCertificateMappingId, IsVerify)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (IsVerify == 1) {
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.type,
                    title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.title,
                    text: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            swal({
                type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                showConfirmButton: false,
                timer: 4000
            });
        });
    };
    //document verification status updated
    DashboardComponent.prototype.DocumentVerificationStatus = function (i) {
        var _this = this;
        if (i == 0) {
            if (this.documentVerificationEntity.DocumentVerificationComment == null || this.documentVerificationEntity.DocumentVerificationComment == '' || this.documentVerificationEntity.DocumentVerificationComment == undefined) {
                this.commentDisplay = true;
            }
            else
                this.commentDisplay = false;
        }
        if (!this.commentDisplay) {
            if (i == 0) {
                this.documentVerificationEntity.DocumentVerificationStatus = 'Not Verify';
                var documentmsg = 'has been declined successfully';
                var documenttitle = 'Decline';
            }
            else {
                this.documentVerificationEntity.DocumentVerificationStatus = 'verify';
                var documentmsg = 'has been accepted successfully';
                var documenttitle = 'Accept';
            }
            if (this.documentVerificationEntity.DocumentVerificationComment == null || this.documentVerificationEntity.DocumentVerificationComment == '' || this.documentVerificationEntity.DocumentVerificationComment == undefined) {
                this.documentVerificationEntity.DocumentVerificationComment = 'NA';
            }
            else
                this.documentVerificationEntity.DocumentVerificationComment = this.documentVerificationEntity.DocumentVerificationComment;
            this.documentVerificationEntity.UpdatedBy = this.globals.authData.UserId;
            //this.documentVerificationEntity.UserName = this.certificateDetail.Name;
            this.documentVerificationEntity.LoginURL = '/login';
            console.log(this.documentVerificationEntity);
            if (i == 1) {
                swal({
                    title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.title,
                    text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.text,
                    icon: "warning",
                    type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.type,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: "No"
                })
                    .then(function (result) {
                    if (result.value) {
                        _this.globals.isLoading = true;
                        _this.DashboardService.updateDocumentVerificationStatus(_this.documentVerificationEntity)
                            .then(function (data) {
                            _this.globals.isLoading = false;
                            $('#document_verify').modal('hide');
                            swal({
                                type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                                title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                                text: _this.documentVerificationEntity.CandidateName + "'s " + _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                                showConfirmButton: false,
                                timer: 5000
                            });
                            window.location.href = '/admin/adminDashboard';
                        }, function (error) {
                            _this.globals.isLoading = false;
                            swal({
                                type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                                title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                                text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                                showConfirmButton: false,
                                timer: 4000
                            });
                        });
                    }
                });
            }
            else {
                this.globals.isLoading = true;
                this.DashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    $('#document_verify').modal('hide');
                    swal({
                        type: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                        title: _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                        text: _this.documentVerificationEntity.CandidateName + "'s " + _this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    window.location.href = '/admin/adminDashboard';
                }, function (error) {
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                        title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                        text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                });
            }
        }
    };
    DashboardComponent.prototype.onFilter = function (inputValue) {
        this.attendanceSheetList = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'CandidateName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'EmailAddress',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'PhoneNumber',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'AssignDate',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'StartTime',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'CertificateName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'DisplayText',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'Value',
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
            styleUrls: ['./dashboard.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Globals, ActivatedRoute, DashboardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map