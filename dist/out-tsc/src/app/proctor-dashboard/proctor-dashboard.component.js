import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ProctorDashboardService } from '../services/proctor-dashboard.service';
import { ProfileService } from '../services/profile.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var ProctorDashboardComponent = /** @class */ (function () {
    function ProctorDashboardComponent(globals, router, route, ProctorDashboardService, ProfileService, elem) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.ProctorDashboardService = ProctorDashboardService;
        this.ProfileService = ProfileService;
        this.elem = elem;
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
    ProctorDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.certificatedocumentEntity = {};
        this.certificatedocument = [];
        this.currentDate = new Date();
        var UserId = '';
        if (this.route.snapshot.paramMap.get('id'))
            UserId = window.atob(this.route.snapshot.paramMap.get('id'));
        else
            UserId = this.globals.authData.UserId;
        this.ProctorDashboardService.getById(UserId)
            .then(function (data) {
            debugger;
            console.log(data);
            _this.defaultDashboardEntity = data;
            _this.attendanceSheetList = data['AttendanceSheet'];
            console.log(_this.attendanceSheetList);
            _this.gridData = _this.attendanceSheetList;
            _this.calendarDetailsList = data['CalendarDetails'];
            _this.monthlyProctoringList = data['MonthlyProctoring'];
            _this.yearsList = data['Years'].reverse();
            _this.chartArr.selectedYear = _this.yearsList[0];
            _this.getQuarterData(_this.chartArr.selectedYear, 'all');
            var todaysdate = _this.globals.todaysdate;
            for (var i = 0; i < _this.attendanceSheetList.length; i++) {
                debugger;
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
                var d = new Date();
                var todayTime = (d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()) + ':00';
                var beforehours = new Date('December 17, 1995 ' + _this.attendanceSheetList[i].StartTime);
                beforehours.setHours(beforehours.getHours() - 2);
                var afterhours = new Date('December 17, 1995 ' + _this.attendanceSheetList[i].EndTime);
                afterhours.setHours(afterhours.getHours() + 2);
                console.log(beforehours.getHours() + ':' + beforehours.getMinutes() + ' ' + afterhours.getHours() + ':' + afterhours.getMinutes());
                var before2hours = (beforehours.getHours() < 10 ? '0' + beforehours.getHours() : '' + beforehours.getHours()) + ':' + (beforehours.getMinutes() < 10 ? '0' + beforehours.getMinutes() : '' + beforehours.getMinutes()) + ':00';
                var after2hours = (afterhours.getHours() < 10 ? '0' + afterhours.getHours() : '' + afterhours.getHours()) + ':' + (afterhours.getMinutes() < 10 ? '0' + afterhours.getMinutes() : '' + afterhours.getMinutes()) + ':00';
                if (before2hours <= todayTime || todayTime <= after2hours) {
                    _this.attendanceSheetList[i].assessmentbtndisplay = true;
                }
                else {
                    _this.attendanceSheetList[i].assessmentbtndisplay = false;
                }
            }
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
                selectable: true,
                // selectAllow: function (selectInfo) {
                //   return moment().diff(selectInfo.start) <= 0
                // },
                defaultDate: new Date(),
                defaultView: 'agendaWeek',
                navLinks: true,
                eventLimit: true,
                height: 500,
                events: _this.calendarDetailsList,
                // events:[{
                //   start: '2019-12-16T15:00:00',
                //   end: '2019-12-16T17:00:00',
                //   description: 'safsjfhjdsjfhdshfj afdsfdsffsas'
                // },
                // {
                //   start: '2019-11-13T09:00:00',
                //   end: '2019-11-13T12:00:00',
                //   description: 'safsjfhjdsjfhdshfj afdsfdsffsas'
                // },
                // {
                //   start: '2019-11-13T09:00:00',
                //   end: '2019-11-13T13:00:00',
                //   description: 'safsjfhjdsjfhdshfj afdsfdsffsas'
                // },
                // {
                //   start: '2019-11-13T10:00:00',
                //   end: '2019-11-13T12:00:00',
                //   description: 'safsjfhjdsjfhdshfj afdsfdsffsas'
                // },
                // {
                //   start: '2019-11-14T11:00:00',
                //   end: '2019-11-14T17:00:00',
                //   description: 'safsjfhjdsjfhdshfj afdsfdsffsas'
                // },
                // {
                //   start: '2019-11-11T19:00:00',
                //   end: '2019-11-11T22:00:00',
                //   description: 'safsjfhjdsjfhdshfj afdsfdsffsas'
                // }
                // ]
                // ,
                // eventMouseover: function (event, jsEvent, view) {
                //   $('.fc-event-inner', this).append('<div id=\"' + event.description + '\" class=\"hover-end\">' + $.fullCalendar.formatDate(event.end, 'h:mmt') + '</div>');
                // },
                // eventMouseout: function (event, jsEvent, view) {
                //   $('#' + event.id).remove();
                // }
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
            // new PerfectScrollbar('.attendance_block');
            $('select').selectpicker();
            new PerfectScrollbar('.fc-scroller');
        }, 1000);
        new PerfectScrollbar('.rejected_proctor');
        new PerfectScrollbar('.monthly_proctor');
    };
    ProctorDashboardComponent.prototype.generateChart = function () {
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
    ProctorDashboardComponent.prototype.getQuarterData = function (year, quarterKey) {
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
    ProctorDashboardComponent.prototype.getYearlyData = function (e) {
        if (this.monthlyProctoringList.length != 0) {
            var yearly = this.monthlyProctoringList[e.target.value];
            this.chartArr.selectedYear = e.target.value;
            this.chartArr.data = yearly['firstQuarter'].concat(yearly['secondQuarter'], yearly['thirdQuarter'], yearly['forthQuarter']);
            this.chartArr.selectedQuarter = 'all';
        }
        this.generateChart();
    };
    //change candidate status present or absent
    ProctorDashboardComponent.prototype.ChangePresentStatus = function (attendance, i) {
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
        this.changePresentStatusEntity.UserId = attendance.UserId;
        this.changePresentStatusEntity.CertificateName = attendance.CertificateName;
        this.changePresentStatusEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.changePresentStatusEntity.UserCertificateId = attendance.UserCertificateId;
        this.ProctorDashboardService.ChangePresentStatus(this.changePresentStatusEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (_this.changePresentStatusEntity.IsActive == 1) {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            window.location.href = '/proctorDashboard';
            _this.changePresentStatusEntity = {};
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   //position: 'top-end',
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            _this.globals.pageNotfound(error.error.code);
        });
    };
    //feedback popup open
    ProctorDashboardComponent.prototype.finalFeedbackShow = function (attendance) {
        this.finalFeedbackEntity = {};
        this.submitted1 = false;
        this.finalFeedbackEntity.ProctorId = attendance.ProctorId;
        this.finalFeedbackEntity.UserId = attendance.UserId;
        this.finalFeedbackEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.finalFeedbackEntity.CandidateName = attendance.CandidateName;
    };
    //final submit for feedback
    ProctorDashboardComponent.prototype.finalFeedbackSubmit = function (finalFeedbackForm) {
        var _this = this;
        this.submitted1 = true;
        if (finalFeedbackForm.valid) {
            this.globals.isLoading = true;
            this.ProctorDashboardService.finalFeedback(this.finalFeedbackEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.submitted1 = false;
                $("#FeedbackModal").modal('hide');
                finalFeedbackForm.form.markAsPristine();
                _this.finalFeedbackEntity = {};
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }, function (error) {
                _this.globals.isLoading = false;
                // swal({
                //   //position: 'top-end',
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
    //resume assessment
    ProctorDashboardComponent.prototype.resumeAssessment = function (attendance) {
        var _this = this;
        swal({
            title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.confirmResume.title,
            text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.confirmResume.text,
            icon: "warning",
            type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.confirmResume.type,
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
                _this.changePresentStatusEntity.UserId = attendance.UserId;
                _this.changePresentStatusEntity.CertificateName = attendance.CertificateName;
                _this.resumeAssessmentEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
                _this.ProctorDashboardService.ResumeAssessment(_this.resumeAssessmentEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.resumeAssessmentEntity = {};
                    swal({
                        type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.type,
                        title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.title,
                        text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    window.location.href = '/proctorDashboard';
                }, function (error) {
                    _this.globals.isLoading = false;
                    // swal({
                    //   //position: 'top-end',
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
    };
    //stop assessment popup open
    ProctorDashboardComponent.prototype.stopAssessmentShow = function (attendance) {
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
    ProctorDashboardComponent.prototype.stopAssessmentSubmit = function (stopAssessmentForm) {
        var _this = this;
        this.submitted2 = true;
        if (stopAssessmentForm.valid) {
            this.globals.isLoading = true;
            this.stopAssessmentEntity.LoginURL = '/login';
            this.ProctorDashboardService.stopAssessment(this.stopAssessmentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                $("#StopModal").modal('hide');
                stopAssessmentForm.form.markAsPristine();
                _this.stopAssessmentEntity = {};
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.text,
                    showConfirmButton: false,
                    timer: 4000
                });
                window.location.href = '/proctorDashboard';
            }, function (error) {
                _this.globals.isLoading = false;
                // swal({
                //   //position: 'top-end',
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
    //get incomplete Assessment
    ProctorDashboardComponent.prototype.incompleteAssessment = function () {
        var _this = this;
        if ($("#check_list").prop('checked') == true) {
            this.globals.isLoading = true;
            this.ProctorDashboardService.getincompleteAssessment(this.globals.authData.UserId)
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
        }
        else {
            this.globals.isLoading = true;
            this.ProctorDashboardService.getById(this.globals.authData.UserId)
                .then(function (data) {
                console.log(data);
                _this.defaultDashboardEntity = data;
                _this.attendanceSheetList = data['AttendanceSheet'];
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
    //document verification popup open
    ProctorDashboardComponent.prototype.documentVerificationShow = function (attendance) {
        debugger;
        this.optionalDocumentsList = attendance['OptionalDocuments'];
        this.mandatoryDocumentsList = attendance['MandatoryDocuments'];
        this.commentDisplay = false;
        console.log(this.mandatoryDocumentsList);
        this.documentVerificationEntity = attendance;
        this.documentVerificationEntity.UserId = attendance.UserId;
        this.documentVerificationEntity.ProctorId = attendance.ProctorId;
        this.documentVerificationEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
        this.documentVerificationEntity.CandidateName = attendance.CandidateName;
        this.documentVerificationEntity.CertificateName = attendance.CertificateName;
        this.certificatedocumentEntity.UserCertificateId = attendance.UserCertificateId;
        this.certificatedocumentEntity.CertificateId = attendance.CertificateId;
        this.certificatedocumentEntity.CertificateFor = attendance.CertificateFor;
        this.certificatedocumentEntity.UserId = attendance.UserId;
        for (var i = 0; i < this.mandatoryDocumentsList.length; i++) {
            if (this.mandatoryDocumentsList[i].UserDocumentId != null) {
                var ExtStr = this.mandatoryDocumentsList[i].CertificateDocumentName;
                var Ext = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                this.mandatoryDocumentsList[i].Ext = Ext;
                this.mandatoryDocumentsList[i].flag = 1;
            }
            else {
                this.mandatoryDocumentsList[i].flag = 0;
            }
        }
        for (var i = 0; i < this.optionalDocumentsList.length; i++) {
            if (this.optionalDocumentsList[i].UserDocumentId != null) {
                var ExtStr = this.optionalDocumentsList[i].CertificateDocumentName;
                var Ext = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                this.optionalDocumentsList[i].Ext = Ext;
                this.optionalDocumentsList[i].flag = 1;
            }
            else {
                this.optionalDocumentsList[i].flag = 0;
            }
        }
    };
    ProctorDashboardComponent.prototype.certificatedocuments = function (certificateDocument, value, documenId, edittimevalue) {
        var _this = this;
        debugger;
        this.Removeimage();
        if (certificateDocument) {
            this.editDocumentValue = edittimevalue;
            this.certificatedocumentEntity.UserDocumentId = certificateDocument.UserDocumentId;
            //this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
        }
        else {
            this.certificatedocumentEntity.UserDocumentId = 0;
            setTimeout(function () {
                _this.submitted3 = false;
            }, 200);
        }
        this.certificatedocumentEntity.UserDocumentCertificateMappingId = certificateDocument.UserDocumentCertificateMappingId;
        this.certificatedocumentEntity.CertiDocumentId = documenId;
        // this.certificatedocumentEntity.DocumentId = certificateDocument.DocumentId;
        // this.certificatedocumentEntity.CertificateDocumentId = certificateDocument.CertificateDocumentId;
        console.log(this.certificatedocumentEntity);
        var certificates = { 'UserId': this.certificatedocumentEntity.UserId, 'CertificateId': this.certificatedocumentEntity.CertificateId, 'CertificateFor': this.certificatedocumentEntity.CertificateFor };
        this.ProfileService.getData(certificates)
            .then(function (data) {
            _this.globals.isLoading = false;
            $('#uploaddocumentModal').modal('show');
            $('#document_verify').modal('hide');
            _this.certificateimage = data['UserAllDocuments'];
            _this.certificatedocument = data['CertificateDocuments'];
            // console.log(this.certificatedocument);
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    ProctorDashboardComponent.prototype.documentClose = function () {
        $('#uploaddocumentModal').modal('hide');
        $('#document_verify').modal('show');
    };
    ProctorDashboardComponent.prototype.imageclick = function (image, i) {
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
    ProctorDashboardComponent.prototype.Removeimage = function () {
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
    ProctorDashboardComponent.prototype.fileTypeCheck = function (file, CertiDocumentId) {
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
    ProctorDashboardComponent.prototype.certidocumentSubmit = function (CertificatedocumentForm) {
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
                    UserId: this.certificatedocumentEntity.UserId,
                    documentCount: 1,
                    UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName,
                    CertificateName: this.documentVerificationEntity.CertificateName, LoginURL: '/login'
                }];
            console.log(this.certificatedocumentEntity);
            this.globals.isLoading = true;
            this.ProfileService.UpdateCertificateDocuments(this.certificatedocumentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.submitted3 = false;
                if (_this.certificatedocumentEntity.UserDocumentId != 0) {
                    $("#new_upload_file").val(null);
                    $("#uploaddocumentModal").hide();
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    window.location.href = "/proctorDashboard";
                }
                else {
                    if (file1_1) {
                        _this.ProfileService.uploadFileCertificate(fd, total, _this.certificatedocumentEntity.UserId)
                            .then(function (data) {
                            $("#new_upload_file").val(null);
                            $("#uploaddocumentModal").hide();
                            swal({
                                type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                                title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                                text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                                showConfirmButton: false,
                                timer: 5000
                            });
                            window.location.href = "/proctorDashboard";
                            //this.router.navigate(['/profile']);	
                        }, function (error) {
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
                        window.location.href = "/proctorDashboard";
                    }
                }
            }, function (error) {
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                //this.globals.pageNotfound(error.error.code);
            });
        }
    };
    //verifiy for mandatory document status change
    ProctorDashboardComponent.prototype.mandatoryDocumentsStatusChange = function (mandatoryDocuments, i) {
        var _this = this;
        var IsVerify = 0;
        //if ($("#docactive" + i).is(':checked'))
        if (i)
            IsVerify = 1;
        this.globals.isLoading = true;
        mandatoryDocuments.IsVerifyByProctor = IsVerify;
        this.ProctorDashboardService.VerifyDocument(mandatoryDocuments.UserDocumentCertificateMappingId, IsVerify)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (IsVerify == 1) {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
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
    };
    //verifiy for optional document status change
    ProctorDashboardComponent.prototype.optionalDocumentsStatusChange = function (optionalDocuments, i) {
        var _this = this;
        var IsVerify = 0;
        //if ($("#docoptionalactive" + i).is(':checked'))
        if (i)
            IsVerify = 1;
        this.globals.isLoading = true;
        this.ProctorDashboardService.VerifyDocument(optionalDocuments.UserDocumentCertificateMappingId, IsVerify)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (IsVerify == 1) {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
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
    };
    //document verification status updated
    ProctorDashboardComponent.prototype.DocumentVerificationStatus = function (i) {
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
            else {
                this.documentVerificationEntity.DocumentVerificationComment = this.documentVerificationEntity.DocumentVerificationComment;
            }
            var count = 0;
            for (var j = 0; j < this.mandatoryDocumentsList.length; j++) {
                if (this.mandatoryDocumentsList[j].IsVerifyByProctor == 1) {
                    count++;
                }
            }
            if (count == this.mandatoryDocumentsList.length) {
                var title = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.alldocumentverifiedacceptproctormessage.title;
                var text = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.alldocumentverifiedacceptproctormessage.text;
            }
            else {
                var title = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.title;
                var text = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.text;
            }
            this.documentVerificationEntity.UpdatedBy = this.globals.authData.UserId;
            //this.documentVerificationEntity.UserName = this.certificateDetail.Name;
            this.documentVerificationEntity.LoginURL = '/login';
            console.log(this.documentVerificationEntity);
            if (i == 1) {
                swal({
                    title: title,
                    text: text,
                    icon: "warning",
                    type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.type,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: "No"
                })
                    .then(function (result) {
                    if (result.value) {
                        _this.globals.isLoading = true;
                        _this.ProctorDashboardService.updateDocumentVerificationStatus(_this.documentVerificationEntity)
                            .then(function (data) {
                            _this.globals.isLoading = false;
                            $('#document_verify').modal('hide');
                            swal({
                                type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                                title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                                text: _this.documentVerificationEntity.CandidateName + "'s " + _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                                showConfirmButton: false,
                                timer: 5000
                            });
                            window.location.href = '/proctorDashboard';
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
                });
            }
            else {
                this.globals.isLoading = true;
                this.ProctorDashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    $('#document_verify').modal('hide');
                    swal({
                        type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                        title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                        text: _this.documentVerificationEntity.CandidateName + "'s " + _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    window.location.href = '/proctorDashboard';
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
        }
    };
    ProctorDashboardComponent.prototype.onFilter = function (inputValue) {
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
    ], ProctorDashboardComponent.prototype, "dataBinding", void 0);
    ProctorDashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-proctor-dashboard',
            templateUrl: './proctor-dashboard.component.html',
            styleUrls: ['./proctor-dashboard.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, ProctorDashboardService, ProfileService, ElementRef])
    ], ProctorDashboardComponent);
    return ProctorDashboardComponent;
}());
export { ProctorDashboardComponent };
//# sourceMappingURL=proctor-dashboard.component.js.map