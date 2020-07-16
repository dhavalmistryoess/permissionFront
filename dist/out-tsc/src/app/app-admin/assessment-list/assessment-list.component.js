import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssessmentdetailService } from '../services/assessmentdetail.service';
var AssessmentListComponent = /** @class */ (function () {
    function AssessmentListComponent(globals, router, route, AssessmentdetailService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.AssessmentdetailService = AssessmentdetailService;
    }
    AssessmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        this.assessmentList = [];
        this.withoutProctorAssessmentList = [];
        this.FilterEntity = {};
        this.CheckEntity = {};
        this.CheckEntity2 = {};
        this.CandidatenameList = [];
        this.certificateList = [];
        this.declinedEntity = {};
        this.cancelAssessmentEntity = {};
        this.cancelViewAssessmentEntity = {};
        this.upcomingDetailEntity = {};
        this.proctorList = [];
        this.changeProctorEntity = {};
        this.proctorDetailEntity = {};
        this.FilterEntity.UserId = null;
        this.FilterEntity.CertificateId = null;
        var hasProctor = this.route.snapshot.paramMap.get('hasproctor');
        hasProctor = window.atob(hasProctor);
        if (hasProctor == "1") {
            $("#proctor-block-tab").addClass("active");
            $("#nonproctor-block-tab").removeClass("active");
            $("#proctor-block").addClass("show active");
            $("#nonproctor-block").removeClass("show active");
        }
        if (hasProctor == "0") {
            $("#nonproctor-block-tab").addClass("active");
            $("#proctor-block-tab").removeClass("active");
            $("#nonproctor-block").addClass("show active");
            $("#proctor-block").removeClass("show active");
        }
        this.AssessmentdetailService.getAllAssessments()
            .then(function (data) {
            console.log(data);
            _this.globals.isLoading = false;
            _this.assessmentList = data['Assessments'];
            _this.withoutProctorAssessmentList = data['withoutProctorAssessments'];
            _this.certificateList = data['defalut']['Certificates'];
            _this.CandidatenameList = data['defalut']['Candidatename'];
            _this.currentDate = new Date();
            //console.log(date);
            // var certificateSelect =  {
            //   CertificateId:'',
            //   CertificateName: 'Select Certificate Name',
            //   Value: ""
            // }
            //this.certificateList.push(data['defalut']['Certificates']);
            //console.log(data['defalut']);
            //this.certificateList = [...this.certificateList,...data['defalut']['Certificates']];
            // var candidateSelect =  {
            //   UserId:'',
            //   FirstName: 'Select Candidate Name',
            //   Value: ""
            // }
            //this.CandidatenameList.push(candidateSelect);
            //this.CandidatenameList = [...this.CandidatenameList,...data['defalut']['Candidatename']];
            // setTimeout(function () {
            //   $('select').selectpicker();
            // }, 200);
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
        // setTimeout(function () {
        //   //  $('select').selectpicker();
        //   $('input[name="OrderDateFrom"]').daterangepicker({
        //     autoUpdateInput: false,
        //     locale: {
        //       cancelLabel: 'Clear'
        //     }
        //   });
        //   $('input[name="OrderDateFrom"]').on('apply.daterangepicker', function (ev, picker) {
        //     $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        //   });
        //   $('input[name="OrderDateFrom"]').on('cancel.daterangepicker', function (ev, picker) {
        //     $(this).val('');
        //   });
        // }, 1000);
    };
    AssessmentListComponent.prototype.assignAssessment = function (id) {
        this.router.navigate(['/admin/assignAssessment/' + window.btoa(id)]);
    };
    AssessmentListComponent.prototype.assessmentDetails = function (id, HasProctor) {
        debugger;
        this.router.navigate(['/admin/assessmentDetails/' + window.btoa(id) + '/' + window.btoa(HasProctor)]);
    };
    AssessmentListComponent.prototype.viewDeclinedDetail = function (i) {
        debugger;
        this.declinedEntity = i; //this.assessmentList[i];
    };
    AssessmentListComponent.prototype.viewCancelAssessmentDetail = function (i) {
        this.cancelViewAssessmentEntity = i; //this.assessmentList[i];
        console.log(this.cancelViewAssessmentEntity.StartTime);
        var hour = (this.cancelViewAssessmentEntity.StartTime.split(':'))[0];
        var min = (this.cancelViewAssessmentEntity.StartTime.split(':'))[1];
        var part = hour > 12 ? 'pm' : 'am';
        min = (min + '').length == 1 ? "0" + min : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? "0" + hour : hour;
        console.log(hour + ':' + min + ' ' + part);
        this.cancelViewAssessmentEntity.startTime = hour + ':' + min + part;
        var hour1 = (this.cancelViewAssessmentEntity.EndTime.split(':'))[0];
        var min1 = (this.cancelViewAssessmentEntity.EndTime.split(':'))[1];
        var part1 = hour1 > 12 ? 'pm' : 'am';
        min1 = (min1 + '').length == 1 ? "0" + min1 : min1;
        hour1 = hour1 > 12 ? hour1 - 12 : hour1;
        hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
        console.log(hour1 + ':' + min1 + ' ' + part1);
        this.cancelViewAssessmentEntity.endTime = hour1 + ':' + min1 + part1;
    };
    AssessmentListComponent.prototype.viewUpcomingDetail = function (i) {
        this.upcomingDetailEntity = i; // this.assessmentList[i];
        console.log(this.upcomingDetailEntity);
        var date = new Date(this.upcomingDetailEntity.AssignDate);
        date.setDate(date.getDate() - 2);
        this.newDate = date;
        console.log(this.newDate);
        var hour = (this.upcomingDetailEntity.StartTime.split(':'))[0];
        var min = (this.upcomingDetailEntity.StartTime.split(':'))[1];
        var part = hour > 12 ? 'pm' : 'am';
        min = (min + '').length == 1 ? "0" + min : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? "0" + hour : hour;
        console.log(hour + ':' + min + ' ' + part);
        this.upcomingDetailEntity.startTime = hour + ':' + min + part;
        var hour1 = (this.upcomingDetailEntity.EndTime.split(':'))[0];
        var min1 = (this.upcomingDetailEntity.EndTime.split(':'))[1];
        var part1 = hour1 > 12 ? 'pm' : 'am';
        min1 = (min1 + '').length == 1 ? "0" + min1 : min1;
        hour1 = hour1 > 12 ? hour1 - 12 : hour1;
        hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
        console.log(hour1 + ':' + min1 + ' ' + part1);
        this.upcomingDetailEntity.endTime = hour1 + ':' + min1 + part1;
        this.cancelAssessmentEntity.CancelComment = '';
        this.submitted = false;
        this.submitted1 = false;
        $("#cancelComment").hide();
        $("#selectProctor").hide();
        //$("#selectedProctorDetails").hide();
    };
    AssessmentListComponent.prototype.cancelAssessment = function (cancelAssessmentForm) {
        var _this = this;
        this.submitted = true;
        if (cancelAssessmentForm.valid) {
            this.cancelAssessmentEntity.ScheduleAssessmentId = this.upcomingDetailEntity.ScheduleAssessmentId;
            this.cancelAssessmentEntity.FirstName = this.globals.authData.FirstName;
            this.cancelAssessmentEntity.LastName = this.globals.authData.LastName;
            this.cancelAssessmentEntity.CandidateName = this.upcomingDetailEntity.CandidateName;
            this.cancelAssessmentEntity.CertificateName = this.upcomingDetailEntity.CertificateName;
            this.cancelAssessmentEntity.AssignDate = this.upcomingDetailEntity.AssignDate;
            this.cancelAssessmentEntity.StartTime = this.upcomingDetailEntity.startTime;
            this.cancelAssessmentEntity.EndTime = this.upcomingDetailEntity.endTime;
            this.cancelAssessmentEntity.LoginURL = '/login';
            this.cancelAssessmentEntity.UserId = this.upcomingDetailEntity.CandidateId;
            this.cancelAssessmentEntity.ProctorId = this.upcomingDetailEntity.ProctorId;
            this.cancelAssessmentEntity.AdminId = this.globals.authData.UserId;
            this.cancelAssessmentEntity.ProctorName = this.upcomingDetailEntity.ProctorName;
            this.globals.isLoading = true;
            this.AssessmentdetailService.cancelAssessment(this.cancelAssessmentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.submitted = false;
                _this.cancelAssessmentEntity = {};
                swal({
                    type: _this.globals.adminTranslationText.assessment.list.cancelAssessment.alerts.type,
                    title: _this.globals.adminTranslationText.assessment.list.cancelAssessment.alerts.title,
                    text: _this.globals.adminTranslationText.assessment.list.cancelAssessment.alerts.text,
                    showConfirmButton: false,
                    timer: 5000
                });
                $("#upcoming_popup").modal('hide');
                window.location.href = '/admin/assessment-list/';
            }, function (error) {
                _this.submitted = false;
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
    AssessmentListComponent.prototype.cancelAssessmentShow = function () {
        $("#cancelComment").show();
        $("#selectProctor").hide();
        this.proctorDetailEntity = {};
        this.submitted1 = false;
        //$("#selectedProctorDetails").hide();
    };
    AssessmentListComponent.prototype.changeProctorShow = function (CandidateId) {
        var _this = this;
        $("#selectProctor").show();
        $("#cancelComment").hide();
        $("#selectedProctorDetails").hide();
        this.cancelAssessmentEntity = {};
        this.submitted = false;
        this.changeProctorEntity.UserId = '';
        this.AssessmentdetailService.getAllDefault(CandidateId)
            .then(function (data) {
            debugger;
            _this.globals.isLoading = false;
            // this.proctorList = data['Proctors'];
            _this.proctorList = [];
            var proctorSelect = {
                UserId: '',
                FirstName: _this.globals.adminTranslationText.assessment.list.proctorChange.selectProctor,
                Value: ""
            };
            _this.proctorList.push(proctorSelect);
            _this.proctorList = _this.proctorList.concat(data['Proctors']);
            // setTimeout(function () {
            //   $('select').selectpicker('refresh');
            // }, 4000);
        }, function (error) {
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    AssessmentListComponent.prototype.showProctorDetail = function (UserId) {
        var _this = this;
        $("#selectedProctorDetails").show();
        if (UserId != '') {
            this.AssessmentdetailService.getProctorDetails(UserId)
                .then(function (data) {
                debugger;
                _this.globals.isLoading = false;
                _this.proctorDetailEntity = data[0];
                _this.changeProctorEntity.ProctorName = _this.proctorDetailEntity.Name;
            }, function (error) {
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                _this.globals.isLoading = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            $("#selectedProctorDetails").hide();
            this.proctorDetailEntity = {};
        }
    };
    AssessmentListComponent.prototype.chanageProcotr = function (chanageProcotrForm) {
        var _this = this;
        this.submitted1 = true;
        if (chanageProcotrForm.valid) {
            this.changeProctorEntity.ScheduleAssessmentId = this.upcomingDetailEntity.ScheduleAssessmentId;
            this.changeProctorEntity.FirstName = this.globals.authData.FirstName;
            this.changeProctorEntity.LastName = this.globals.authData.LastName;
            this.changeProctorEntity.AdminId = this.globals.authData.UserId;
            this.changeProctorEntity.CertificateName = this.upcomingDetailEntity.CertificateName;
            this.changeProctorEntity.AssignDate = this.upcomingDetailEntity.AssignDate;
            this.changeProctorEntity.StartTime = this.upcomingDetailEntity.startTime;
            this.changeProctorEntity.EndTime = this.upcomingDetailEntity.endTime;
            this.changeProctorEntity.LoginURL = '/login';
            this.changeProctorEntity.CandidateId = this.upcomingDetailEntity.CandidateId;
            this.globals.isLoading = true;
            this.AssessmentdetailService.ChangeProctor(this.changeProctorEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.submitted = false;
                _this.changeProctorEntity = {};
                swal({
                    type: _this.globals.adminTranslationText.assessment.list.proctorChange.alerts.type,
                    title: _this.globals.adminTranslationText.assessment.list.proctorChange.alerts.title,
                    text: _this.globals.adminTranslationText.assessment.list.proctorChange.alerts.text,
                    showConfirmButton: false,
                    timer: 5000
                });
                _this.changeProctorEntity.UserId = '';
                $("#upcoming_popup").modal('hide');
                window.location.href = '/admin/assessment-list/';
            }, function (error) {
                _this.submitted = false;
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
    AssessmentListComponent.prototype.SearchFilter = function (SearchFilterForm) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        // var str = $("#OrderDateFrom").val();
        // var res = str.split(" ");
        // console.log(this.FilterEntity);
        // if (this.FilterEntity.UserId != null) {
        //   this.FilterEntity.UserId = this.FilterEntity.UserId.toString();
        // } else {
        //   this.FilterEntity.UserId = null;
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
        // if (res[0] == "") {
        //   this.FilterEntity.OrderDateFrom = "";
        //   this.FilterEntity.OrderDateTo = "";
        // } else {
        //   this.FilterEntity.OrderDateFrom = res[0];
        //   this.FilterEntity.OrderDateTo = res[2];
        // }{
        this.AssessmentdetailService.searchCertificate(this.FilterEntity)
            //.map(res => res.json())
            .then(function (data) {
            _this.assessmentList = data['Assessments'];
            _this.withoutProctorAssessmentList = data['withoutProctorAssessments'];
            console.log(_this.assessmentList);
            _this.globals.isLoading = false;
            _this.FilterEntity = {};
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    AssessmentListComponent.prototype.All = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        if ($('input[name="legend1"]').is(':checked')) {
            this.CheckEntity.NoProctorAssign = true;
            // this.NoProctorAssign = true;
        }
        else {
            this.CheckEntity.NoProctorAssign = false;
            //this.NoProctorAssign = false;
        }
        if ($('input[name="legend2"]').is(':checked')) {
            this.CheckEntity.Upcoming = true;
            //  this.UnAnswred = true;
        }
        else {
            this.CheckEntity.Upcoming = false;
            // this.UnAnswred = false;
        }
        if ($('input[name="legend3"]').is(':checked')) {
            this.CheckEntity.Completed = true;
            //this.Reviewed = true;
        }
        else {
            this.CheckEntity.Completed = false;
            // this.Reviewed = false;
        }
        if ($('input[name="legend4"]').is(':checked')) {
            this.CheckEntity.Cancelled = true;
            //this.Reviewed = true;
        }
        else {
            this.CheckEntity.Cancelled = false;
            // this.Reviewed = false;
        }
        if ($('input[name="legend7"]').is(':checked')) {
            this.CheckEntity.todays = true;
            //this.Reviewed = true;
        }
        else {
            this.CheckEntity.todays = false;
            // this.Reviewed = false;
        }
        this.CheckEntity;
        if (this.CheckEntity.Cancelled == true || this.CheckEntity.Completed == true || this.CheckEntity.Upcoming == true || this.CheckEntity.NoProctorAssign == true || this.CheckEntity.todays == true) {
            this.AssessmentdetailService.CheckSearchAssessment(this.CheckEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.assessmentList = data;
                setTimeout(function () {
                    $('select').selectpicker();
                }, 200);
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
        else {
            this.assessmentList = [];
            this.globals.isLoading = false;
        }
    };
    AssessmentListComponent.prototype.All2 = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        if ($('input[name="legend5"]').is(':checked')) {
            this.CheckEntity2.Upcoming = true;
            //  this.UnAnswred = true;
        }
        else {
            this.CheckEntity2.Upcoming = false;
            // this.UnAnswred = false;
        }
        if ($('input[name="legend6"]').is(':checked')) {
            this.CheckEntity2.Completed = true;
            //this.Reviewed = true;
        }
        else {
            this.CheckEntity2.Completed = false;
            // this.Reviewed = false;
        }
        this.CheckEntity2;
        if (this.CheckEntity2.Completed == true || this.CheckEntity2.Upcoming == true) {
            this.AssessmentdetailService.CheckSearchAssessment2(this.CheckEntity2)
                .then(function (data) {
                _this.globals.isLoading = false;
                console.log(data);
                _this.withoutProctorAssessmentList = data;
                setTimeout(function () {
                    $('select').selectpicker();
                }, 200);
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
        else {
            this.withoutProctorAssessmentList = [];
            this.globals.isLoading = false;
        }
    };
    AssessmentListComponent.prototype.clearData = function (SearchFilterForm) {
        var _this = this;
        this.globals.isLoading = true;
        this.AssessmentdetailService.getAllAssessments()
            //.map(res => res.json())
            .then(function (data) {
            _this.FilterEntity = {};
            _this.FilterEntity.CertificateId = '';
            _this.assessmentList = data['Assessments'];
            _this.withoutProctorAssessmentList = data['withoutProctorAssessments'];
            setTimeout(function () {
                $('select').selectpicker();
                $("#OrderDateFrom").val('');
                $('select').selectpicker("refresh");
            }, 200);
            _this.globals.isLoading = false;
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    AssessmentListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-assessment-list',
            templateUrl: './assessment-list.component.html',
            styleUrls: ['./assessment-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, AssessmentdetailService])
    ], AssessmentListComponent);
    return AssessmentListComponent;
}());
export { AssessmentListComponent };
//# sourceMappingURL=assessment-list.component.js.map