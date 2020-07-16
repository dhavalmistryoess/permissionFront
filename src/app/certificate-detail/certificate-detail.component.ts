import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { DashboardService } from '../services/dashboard.service';
import { ProfileService } from '../services/profile.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
//import { parse } from 'path';
declare var $, PerfectScrollbar, kendoWindow, swal: any;

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.css']
})
export class CertificateDetailComponent implements OnInit {

  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private DashboardService: DashboardService, private elem: ElementRef, private ProfileService: ProfileService) { }

  certificateDetail;
  categoryList;
  practiceTestList;
  certificateDocuments;
  assessmentExpirationDate;
  scheduleEntity;
  someFormattedDate;
  scheduleAssessmentEntity;
  btn_disable;
  ValidAvailablePriorityDate1;
  ValidAvailablePriorityDate2;
  ValidAvailablePriorityDate3;
  submitted;
  submitted1;
  viewResultStatus;
  scheduleAssessmentList;
  documentEntity;
  documentList;
  cancelAssessmentEntity;
  submitted2;
  Appointmentletterlist;
  ScheduleAssessmentId;
  resultStatus;
  renewButtonDisplay;
  mandatoryDocumentsList;
  optionalDocumentsList;
  certificateimage;
  certificatedocument;
  certificatedocumentEntity;
  submitted3;
  certiDocumentDis;
  DocumentDis;
  DocumentValid;
  verificationRequestEntity;
  assessment_subassessment_btn_display;
  PracticeTestAttempts;
  PracticeExamAttempts;
  AppointmentCancelDate;
  UserAssessmentId;
  ParentAssessment;
  todayTime;
  assessmentbtndisplay;
  diffDays;
  uploadedMandatoryDocumentsCount;
  assessmentbtndisplaywithoutproctor;
  schedulePopup;
  reSchedulePopup;
  disabledDates: Date[];
  editDocumentValue;
  buyNewPracticeTestEntity;
  submitted4;
  buyPracticeTestValid;
  minDate: Date;
  uploadDocumentPopup;
  scheduleStatus;
  scheduleStatusId;
  errorEntity;
  ngOnInit() {


    this.errorEntity = {};
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
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    var schedule = window.atob(this.route.snapshot.paramMap.get('schedule'));
    if (schedule == 'schedule') {
      $("#assessment-list-tab").addClass("active");
      $("#category-list-tab").removeClass("active");

      $("#assessment-list").addClass("show active")
      $("#category-list").removeClass("show active")

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
    let todaysdate = this.globals.todaysdate;
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
        .then((data) => {
          debugger
          this.globals.isLoading = false;
          this.certificateDetail = data['CertificateDetails'][0];
          console.log(this.certificateDetail);
          //alert(this.certificateDetail.UserCertificateId);
          this.certificateDetail.UserCertificateId = window.btoa(this.certificateDetail.UserCertificateId);
          this.categoryList = data['CertificateDetails'][0]['Categories'];
          this.practiceTestList = data['CertificateDetails'][0]['TotalPracticeTest'];
          this.scheduleAssessmentList = data['CertificateDetails'][0]['TotalScheduleAssessment'];
          this.mandatoryDocumentsList = data['CertificateDetails'][0]['MandatoryDocuments'];
          this.optionalDocumentsList = data['CertificateDetails'][0]['OptionalDocuments'];
          this.Appointmentletterlist = data['Appointmentletter'];
          this.certificateDetail.mandatoryDocumentsCount = 1;
          console.log(this.practiceTestList);
          console.log(this.certificateDetail.AssessmentDetail);
          this.PracticeTestAttempts = parseInt(this.certificateDetail.PracticeTestAttempts);
          this.PracticeExamAttempts = parseInt(this.certificateDetail.PracticeExamAttempts);
          for (var i = 0; i < this.mandatoryDocumentsList.length; i++) {
            if (this.mandatoryDocumentsList[i].UserDocumentId != null) {
              var ExtStr = this.mandatoryDocumentsList[i].CertificateDocumentName;
              var Ext = "." + ExtStr.split(".")[1];//ExtStr.substring(ExtStr.length - 4, ExtStr.length);
              this.mandatoryDocumentsList[i].Ext = Ext;
              this.uploadedMandatoryDocumentsCount++;
            }
          }
          for (var i = 0; i < this.optionalDocumentsList.length; i++) {
            if (this.optionalDocumentsList[i].UserDocumentId != null) {
              var ExtStr = this.optionalDocumentsList[i].CertificateDocumentName;
              var Ext = "." + ExtStr.split(".")[1];//ExtStr.substring(ExtStr.length - 4, ExtStr.length);
              this.optionalDocumentsList[i].Ext = Ext;
            }
          }
          console.log(this.mandatoryDocumentsList);
          console.log(this.optionalDocumentsList);
          var certificates = { 'UserId': this.globals.authData.UserId, 'CertificateId': this.certificateDetail.CertificateId, 'CertificateFor': this.certificateDetail.CertificateFor }
          this.ProfileService.getData(certificates)
            .then((data) => {
              this.globals.isLoading = false;
              this.certificateimage = data['UserAllDocuments'];
              this.certificatedocument = data['CertificateDocuments'];
              console.log(this.certificatedocument);
              if (this.mandatoryDocumentsList.length > 0) {
                for (var i = 0; i < this.mandatoryDocumentsList.length; i++) {
                  if (this.mandatoryDocumentsList[i].UserDocumentId != null) {
                    this.mandatoryDocumentsList[i].flag = 1;
                  }
                  else {
                    this.mandatoryDocumentsList[i].flag = 0;
                  }
                 
                }
              }
              else {
                for (var j = 0; j < this.certificatedocument.length; j++) {
                  if (this.certificatedocument[j].IsMandatory == 1) {
                    this.certificatedocument[j].value = 1;
                  }
                }
              }
              if (this.optionalDocumentsList.length > 0) {
                for (var i = 0; i < this.optionalDocumentsList.length; i++) {
                  if (this.optionalDocumentsList[i].UserDocumentId != null) {
                    this.optionalDocumentsList[i].flag = 1;
                  }
                  else {
                    this.optionalDocumentsList[i].flag = 0;
                  }
                  
                }
              }
              else {
                for (var j = 0; j < this.certificatedocument.length; j++) {
                  if (this.certificatedocument[j].IsMandatory == 0) {
                    this.certificatedocument[j].value = 0;
                  }
                }
              }

              setTimeout(function () {
                $("#CertiDocumentId").selectpicker();
                $("#CertiDocumentId").selectpicker('refresh');
              }, 100);
            },
              (error) => {
                this.globals.isLoading = false;
                this.globals.pageNotfound(error.error.code);
              });
          //console.log(this.optionalDocumentsList);

          var d = new Date();
          var curr_date = d.getDate();
          var curr_month = d.getMonth() + 1; //Months are zero based
          var curr_year = d.getFullYear();
          if (curr_month < 10) {
            var month = '0' + curr_month;
          } else {
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

          this.assessmentExpirationDate = '';
          if (this.certificateDetail.CertificationEndDate == null) {
            if (this.certificateDetail.PaymentDate == null)
              var someDate = new Date();
            else
              var someDate = new Date(this.certificateDetail.PaymentDate);
            var AssessmentDuration = JSON.parse(this.certificateDetail.AssessmentDuration);
            someDate.setMonth(someDate.getMonth() + AssessmentDuration);
            //console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
            console.log(someDate);
            console.log(new Date());
            var newdate = new Date();
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();

            this.assessmentExpirationDate = y + '-' + mm + '-' + dd;
            var assepirationdate = (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd) + '-' + y;
            console.log(today + ' ' + assepirationdate);
            if (this.certificateDetail.HasProctor == 0) {
              if (newdate <= someDate) // compare with original formate 
              {
                this.assessmentbtndisplaywithoutproctor = true;
              }
              else {
                this.assessmentbtndisplaywithoutproctor = false;
              }
            }
            else {
              this.assessmentbtndisplaywithoutproctor = true;
            }
          }

          var date3: any;
          var date4: any;
          date3 = new Date();
          date4 = new Date(someDate);
          const diffTime = Math.abs(date3 - date4);
          console.log(diffTime);
          this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(this.diffDays);

          for (var i = 0; i < this.certificateDetail.AssessmentDetail.length; i++) {
            if (this.certificateDetail.AssessmentDetail[i].AssignDate != null && this.certificateDetail.HasProctor == 1) {

              var someDateCancel = new Date(this.certificateDetail.AssessmentDetail[i].AssignDate);
              var numberOfDaysTominus1 = JSON.parse(data['CertificateDetails']['AppointmentCancelDays']);
              someDateCancel.setDate(someDateCancel.getDate() - numberOfDaysTominus1);

              var dd = someDateCancel.getDate();
              var mm = someDateCancel.getMonth() + 1;
              var y = someDateCancel.getFullYear();
              if (mm < 10) {
                var mmm = '0' + mm;
              } else {
                var mmm = '' + mm;
              }

              if (dd < 10) {
                var ddd = '0' + dd;
              } else {
                var ddd = '' + dd;
              }

              this.certificateDetail.AssessmentDetail[i].AppointmentCancelDate = mmm + '-' + ddd + '-' + y;
            }
            if (this.certificateDetail.HasProctor == 1) {
              if (this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentStatus == 56) {
                this.scheduleStatus = this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentStatus;
              }
              if (this.certificateDetail.AssessmentDetail[0].ScheduleStatusId == 14) {
                this.scheduleStatusId = this.certificateDetail.AssessmentDetail[0].ScheduleStatusId;
              }
            }
          }

          for (var i = 0; i < this.certificateDetail.AssessmentDetail.length; i++) {
            if (this.certificateDetail.AssessmentDetail[i].AssignDate != null && this.certificateDetail.HasProctor == 1) {
              let hour = (this.certificateDetail.AssessmentDetail[i].StartTime.split(':'))[0]
              let min = (this.certificateDetail.AssessmentDetail[i].StartTime.split(':'))[1]
              let part = hour > 12 ? 'pm' : 'am';
              min = (min + '').length == 1 ? `0${min}` : min;
              hour = hour > 12 ? hour - 12 : hour;
              hour = (hour + '').length == 1 ? `0${hour}` : hour;
              console.log(hour + ':' + min + ' ' + part);
              this.certificateDetail.AssessmentDetail[i].startTime = hour + ':' + min + part;

              let hour1 = (this.certificateDetail.AssessmentDetail[i].EndTime.split(':'))[0]
              let min1 = (this.certificateDetail.AssessmentDetail[i].EndTime.split(':'))[1]
              let part1 = hour1 > 12 ? 'pm' : 'am';
              min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
              hour1 = hour1 > 12 ? hour1 - 12 : hour1;
              hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
              console.log(hour1 + ':' + min1 + ' ' + part1);
              this.certificateDetail.AssessmentDetail[i].endTime = hour1 + ':' + min1 + part1;

              var beforehours = new Date('December 17, 1995 ' + this.certificateDetail.AssessmentDetail[i].StartTime);
              beforehours.setHours(beforehours.getHours() - 2);

              var afterhours = new Date('December 17, 1995 ' + this.certificateDetail.AssessmentDetail[i].EndTime);
              afterhours.setHours(afterhours.getHours() + 2);
              console.log(beforehours.getHours() + ':' + beforehours.getMinutes() + ' ' + afterhours.getHours() + ':' + afterhours.getMinutes());
              var before2hours = (beforehours.getHours() < 10 ? '0' + beforehours.getHours() : '' + beforehours.getHours()) + ':' + (beforehours.getMinutes() < 10 ? '0' + beforehours.getMinutes() : '' + beforehours.getMinutes()) + ':00';
              var after2hours = (afterhours.getHours() < 10 ? '0' + afterhours.getHours() : '' + afterhours.getHours()) + ':' + (afterhours.getMinutes() < 10 ? '0' + afterhours.getMinutes() : '' + afterhours.getMinutes()) + ':00';
              var todaydate = curr_year + '-' + month + '-' + date;
              console.log(todaydate);
              if (this.certificateDetail.AssessmentDetail[i].AssignDate == todaydate) {
                if (before2hours <= todayTime || todayTime <= after2hours) {
                  this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = true;
                }
                else {
                  this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = false;
                }
              }
              else {
                this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = false;
              }
            }
            else {
              this.certificateDetail.AssessmentDetail[i].assessmentbtndisplay = true;
            }
          }

          this.ScheduleAssessmentId = 0;
          this.resultStatus = 0;
          if (this.certificateDetail.AssessmentDetail.length > 0) {
            if (this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentId != null)
              this.ScheduleAssessmentId = this.certificateDetail.AssessmentDetail[0].ScheduleAssessmentId;
            if (this.certificateDetail.AssessmentDetail[0].ResultStatus != null)
              this.resultStatus = this.certificateDetail.AssessmentDetail[0].ResultStatus;

            if (this.certificateDetail.AssessmentDetail[0].UserAssessmentId != null)
              this.UserAssessmentId = this.certificateDetail.AssessmentDetail[0].UserAssessmentId;
            else
              this.UserAssessmentId = this.certificateDetail.AssessmentDetail[0].LastUserAssessmentId;

            if (this.certificateDetail.AssessmentDetail[0].ParentAssessment != null)
              this.ParentAssessment = this.certificateDetail.AssessmentDetail[0].ParentAssessment;
            else
              this.ParentAssessment = 0;
            if (this.certificateDetail.AssessmentDetail[0].ResultStatus == 17) {
              if (this.certificateDetail.HasProctor == 0)
                var dateDisplay = new Date(this.certificateDetail.AssessmentDetail[0].AssessmentEndDate);
              else
                var dateDisplay = new Date(this.certificateDetail.AssessmentDetail[0].AssignDate);
              var numberOfDaysToplus = JSON.parse(this.certificateDetail.CoolingPeriod);
              dateDisplay.setDate(dateDisplay.getDate() + numberOfDaysToplus);
              var getmonth = dateDisplay.getMonth() + 1;
              if (getmonth < 10) {
                var month = '0' + getmonth;
              } else {
                var month = '' + getmonth;
              }
              var getdate = dateDisplay.getDate();
              if (getdate < 10) {
                var date = '0' + getdate;
              } else {
                var date = '' + getdate;
              }
              var displayassessmentbtn = month + '-' + date + '-' + dateDisplay.getFullYear();
              console.log(displayassessmentbtn);
              console.log(todaysdate);
              if (todaysdate >= displayassessmentbtn)//assessmentExpirationDate date check kravi
                this.assessment_subassessment_btn_display = true;
              else
                this.assessment_subassessment_btn_display = false;
            }
          }
          var count = 0;
          if (this.certificateDetail.HasOneShotAssessment == 1) {
            for (var j = 0; j < this.practiceTestList.length; j++) {
              if (this.practiceTestList[j].PracticeTestStatusId == 0) {
                count = 1;
              }
              if (count == 1)
                this.viewResultStatus = true;
              else
                this.viewResultStatus = false;
            }
          }
          else { this.viewResultStatus = false; }
          console.log(this.assessmentExpirationDate);

          if (this.certificateDetail.CertificateStatus == 64 && this.certificateDetail.IsRenewable == 1) {
            var beforedate = new Date(this.certificateDetail.CertificationEndDate);
            var numberOfDaysTominus = JSON.parse(this.certificateDetail.BeforeRenewButtonDisplay);
            beforedate.setDate(beforedate.getDate() - numberOfDaysTominus);
            console.log(beforedate);
            var getmonth = beforedate.getMonth() + 1;
            if (getmonth < 10) {
              var month = '0' + getmonth;
            } else {
              var month = '' + getmonth;
            }
            var getdate = beforedate.getDate();
            if (getdate < 10) {
              var date = '0' + getdate;
            } else {
              var date = '' + getdate;
            }

            console.log(this.globals.todaysdate);

            var afterdate = new Date(this.certificateDetail.CertificationEndDate);
            var numberOfDaysToAdd = JSON.parse(this.certificateDetail.AfterRenewButtonDisplay);
            afterdate.setDate(afterdate.getDate() + numberOfDaysToAdd);
            console.log(afterdate);
            var getmonth1 = afterdate.getMonth() + 1;
            if (getmonth1 < 10) {
              var month1 = '0' + getmonth1;
            } else {
              var month1 = '' + getmonth1;
            }
            var getdate1 = afterdate.getDate();
            if (getdate1 < 10) {
              var date1 = '0' + getdate1;
            } else {
              var date1 = '' + getdate1;
            }
            var BeforeRenewButtonDisplay = month + '-' + date + '-' + beforedate.getFullYear();
            var AfterRenewButtonDisplay = month1 + '-' + date1 + '-' + afterdate.getFullYear();
            console.log(BeforeRenewButtonDisplay + ' ' + AfterRenewButtonDisplay);

            if (BeforeRenewButtonDisplay <= todaysdate && todaysdate <= AfterRenewButtonDisplay)
              this.renewButtonDisplay = true;
            else
              this.renewButtonDisplay = false;
          }


          var resultEntity = [];
          for (var i = 0; i < this.certificateDetail.AssessmentDetail.length; i++) {
            var chartData = [];
            for (var j = 0; j < this.certificateDetail.AssessmentDetail[i].results.length; j++) {

              var category = this.certificateDetail.AssessmentDetail[i].results[j].category;
              var score = this.certificateDetail.AssessmentDetail[i].results[j].score;
              chartData.push({ category: category, score: score });
            }
            setTimeout(() => {
              var chart = am4core.create("chart_result", am4charts.XYChart);
              // Add data
              chart.data = chartData;
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

              categoryAxis.renderer.labels.template.adapter.add("dx", (dx, target) => {
                return -target.maxRight / 2;
              })

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
              series.columns.template.column.fillOpacity = 0.8

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

        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
  }

  overlay_close() {
    this.schedulePopup = false;
    this.reSchedulePopup = false;
    this.uploadDocumentPopup = false;
    $(".overlay").css("display", "none");
  }

  close() {
    this.schedulePopup = false;
    this.reSchedulePopup = false;
    this.uploadDocumentPopup = false
  }


  viewResult(id) {
    // router.navigate(['/practice-result', practice.UserPracticeTestId]);
    this.router.navigate(['/practice-result/' + window.btoa(id)]);
  }

  assessmentResult(id) {
    this.router.navigate(['/assessment-result/' + window.btoa(id)]);
  }

  startAssessmentPanel(CertificateId, UserCertificateId, ScheduleAssessmentId, UserAssessmentId, resultStatus, parentAssessment, HasSubCertificate, HasOneShotAssessment) {
    this.router.navigate(['/assessmentPanel/' + window.btoa(CertificateId) + '/' + UserCertificateId + '/' + window.btoa(ScheduleAssessmentId) + '/' + window.btoa(UserAssessmentId) + '/' + window.btoa(resultStatus) + '/' + window.btoa(parentAssessment) + '/' + window.btoa(HasSubCertificate) + '/' + window.btoa(HasOneShotAssessment)]);
  }

  practiceTest(certificateid, usercertificateid, userpracticetestid, flag, HasOneShotAssessment) {
    this.router.navigate(['/practice-test/' + window.btoa(certificateid) + '/' + usercertificateid + '/' + window.btoa(userpracticetestid) + '/' + window.btoa(flag) + '/' + window.btoa(HasOneShotAssessment)]);
  }

  buyNewPracticeTestModalShow() {
    this.buyNewPracticeTestEntity = {};
    this.submitted4 = false;
    $('#buynewpracticeModal').modal('show');
  }

  checkPracticeTestNumber() {
    if (this.buyNewPracticeTestEntity.BoughtNewPracticeTests > 10) {
      this.buyPracticeTestValid = true;
    }
    else {
      this.buyPracticeTestValid = false;
    }
  }
  buyPracticeTest(buyPracticeTestForm) {
    this.submitted4 = true;
    if (buyPracticeTestForm.valid && !this.buyPracticeTestValid) {
      this.globals.isLoading = true;
      this.buyNewPracticeTestEntity.UserId = this.globals.authData.UserId;
      this.buyNewPracticeTestEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
      this.buyNewPracticeTestEntity.CertificateName = this.certificateDetail.CertificateName;
      this.submitted4 = false;
      this.DashboardService.buyNewPracticeTests(this.buyNewPracticeTestEntity)
        .then((data) => {
          var attempts = parseInt(this.certificateDetail.PracticeExamAttempts) + parseInt(this.buyNewPracticeTestEntity.BoughtNewPracticeTests);
          this.certificateDetail.PracticeExamAttempts = attempts;
          $('#buynewpracticeModal').modal('hide');
          this.globals.isLoading = false;
          swal({
            type: "success",
            title: "Buy New Practice Test",
            text: "Your new practice test has been bought successfully.",
            showConfirmButton: false,
            timer: 5000
          })
          this.router.navigate(["/certificateDetails/" + this.certificateDetail.UserCertificateId]);
        },
          (error) => {
            this.btn_disable = false;
            this.globals.isLoading = false;
            // this.globals.pageNotfound(error.error.code);
          });
    }
  }
  certificatedocuments(certificateDocument, value, documenId, edittimevalue) {

    debugger
    this.Removeimage();
    if (certificateDocument) {
      this.editDocumentValue = edittimevalue;
      this.certificatedocumentEntity.UserDocumentId = certificateDocument.UserDocumentId;
      
      if (certificateDocument.ExpiryDate != null && certificateDocument.ExpiryDate != "0000-00-00") {
        this.certificatedocumentEntity.ExpiryDate = new Date(certificateDocument.ExpiryDate);
      }
      else
      {
        this.certificatedocumentEntity.ExpiryDate = this.minDate;
      }
      
      
      //this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
      this.certiDocumentDis = true;

      var aa = certificateDocument.DocumentId;
      setTimeout(() => {
        $("#CertiDocumentId").selectpicker('refresh');
        $("#CertiDocumentId").val(aa);
      }, 200);
    } else {
      this.certificatedocumentEntity.UserDocumentId = 0;
      this.certiDocumentDis = false;
      setTimeout(() => {
        $("#CertiDocumentId").selectpicker('refresh');
        this.submitted3 = false;
      }, 200);
    }
    this.certificatedocumentEntity.UserDocumentCertificateMappingId = certificateDocument.UserDocumentCertificateMappingId;
    this.certificatedocumentEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
    this.certificatedocumentEntity.CertiDocumentId = documenId;
    this.uploadDocumentPopup = true;
    var certificates = { 'UserId': this.globals.authData.UserId, 'CertificateId': this.certificateDetail.CertificateId, 'CertificateFor': this.certificateDetail.CertificateFor }
    certificates.UserId = this.globals.authData.UserId;
   
  }
  imageclick(image, i) {

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
  }
  Removeimage() {
    $("#new_upload_file").val('');
    $('#uploaded_doc').attr('src', '');
    $('.uploaded_doc_block').hide();
    $('.new_block').show();
    this.certificatedocumentEntity.CertificateName = '';

  }
  fileTypeCheck(file, CertiDocumentId) {
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
        })
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
      })
      setTimeout(function () {
        $("#new_upload_file").val('');
        $('#uploaded_doc').attr('src', '');
        $('.uploaded_doc_block').hide();
        $('.new_block').show();
      }, 200);
    }

  }
  certidocumentSubmit(CertificatedocumentForm) {
    debugger
    //alert(this.certificatedocumentEntity.CertiDocumentId);
    this.submitted3 = true;
    var count = 0;
    var certificate;
    for (certificate of this.certificatedocument) {
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
          })
        } else {
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
          })
        } else {
          this.DocumentValid = false;
        }
      }

    }
    if (CertificatedocumentForm.valid && !this.DocumentValid) {
      let getCurrentObj = CertificatedocumentForm.form.value;
      if(this.certificatedocumentEntity.ExpiryDate == undefined || this.certificatedocumentEntity.ExpiryDate == '')
      {
        this.certificatedocumentEntity.ExpiryDate = null;
      }
      else
      {
        this.certificatedocumentEntity.ExpiryDate = getCurrentObj.ExpiryDate;
      }

      let file1 = '';
      var fd = new FormData();
      var total = 0;
      this.certificatedocumentEntity.Document = [];

      if (this.certificatedocumentEntity.CertificateName != '' && this.certificatedocumentEntity.CertificateName != '') {

        file1 = this.elem.nativeElement.querySelector('#new_upload_file').files;

        if (file1 && file1.length != 0) {
          total = file1.length;
          for (var k = 0; k < file1.length; k++) {
            var Images = Date.now() + '_' + file1[k]['name'].replace(/ /g, "_");
            fd.append('Document' + k, file1[k], Images);
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
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted3 = false;
          if (this.certificatedocumentEntity.UserDocumentId != 0) {
            $("#new_upload_file").val(null);
            //$("#uploaddocumentModal").hide();
            this.uploadDocumentPopup = false;
            swal({
              type: this.globals.commonTranslationText.profilePage.alerts.document.type,
              title: this.globals.commonTranslationText.profilePage.alerts.document.title,
              text: this.globals.commonTranslationText.profilePage.alerts.document.text,
              showConfirmButton: false,
              timer: 5000
            })
            window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
          } else {
            if (file1) {
              this.ProfileService.uploadFileCertificate(fd, total, this.globals.authData.UserId)
                .then((data) => {
                  $("#new_upload_file").val(null);
                  // $("#uploaddocumentModal").hide();
                  this.uploadDocumentPopup = false;
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                    showConfirmButton: false,
                    timer: 5000
                  })
                  window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
                  //this.router.navigate(['/profile']);	
                },
                  (error) => {
                    this.btn_disable = false;
                    this.globals.isLoading = false;
                    this.globals.pageNotfound(error.error.code);
                  });
            }
            else {
              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                showConfirmButton: false,
                timer: 5000
              })
              window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
            }
          }
        },
          (error) => {
            this.btn_disable = false;
            this.submitted1 = false;
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
  }

  VerificationRequest() {
    this.verificationRequestEntity.UserCertificateId = window.atob(this.certificateDetail.UserCertificateId);
    this.verificationRequestEntity.UserName = this.globals.authData.FirstName + ' ' + this.globals.authData.LastName;
    this.verificationRequestEntity.UserId = this.globals.authData.UserId;
    this.verificationRequestEntity.CertificateName = this.certificateDetail.CertificateName;
    this.verificationRequestEntity.LoginURL = '/login';
    this.globals.isLoading = true;
    this.DashboardService.VerificationRequest(this.verificationRequestEntity)
      .then((data) => {

        this.globals.isLoading = false;

        swal({
          type: this.globals.commonTranslationText.certificateDetailPage.documents.alerts.type,
          title: this.globals.commonTranslationText.certificateDetailPage.documents.alerts.title,
          text: this.globals.commonTranslationText.certificateDetailPage.documents.alerts.text,
          showConfirmButton: false,
          timer: 4000
        })
        //var userCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        window.location.href = '/certificateDetails/' + this.certificateDetail.UserCertificateId;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  printDiv() {
    var innerContents = document.getElementById('printevaluation').innerHTML;
    var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write(innerContents);
    popupWinindow.document.close();
    popupWinindow.print();
    popupWinindow.close();
  }
  viewSchedule(i) {
    debugger
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
        .then((result) => {
          if (result.value) {
            this.router.navigate(['/profile/' + window.btoa('addressadd') + '/' + this.certificateDetail.UserCertificateId]);
          }
        })
    }

  }
  dateChanged() {
    var someDate1 = new Date($("#AvailablePriorityDate1").val());
    var dd1 = someDate1.getDate();
    var mm1 = someDate1.getMonth() + 1;
    var y1 = someDate1.getFullYear();
    var someFormattedDate1 = y1 + '-' + mm1 + '-' + dd1;

    
  }

  scheduleAssessment(scheduleAssessmentForm) {
    let getCurrentObj = scheduleAssessmentForm.form.value;
    this.scheduleAssessmentEntity.AvailablePriorityDate1 = (getCurrentObj.AvailablePriorityDate1 != undefined ? getCurrentObj.AvailablePriorityDate1.getFullYear() + "-" + (getCurrentObj.AvailablePriorityDate1.getMonth() + 1) + "-" +getCurrentObj.AvailablePriorityDate1.getDate() : '') ;
    this.scheduleAssessmentEntity.AvailablePriorityDate2 = (getCurrentObj.AvailablePriorityDate2 != undefined ? getCurrentObj.AvailablePriorityDate2.getFullYear() + "-" + (getCurrentObj.AvailablePriorityDate2.getMonth() + 1) + "-" +getCurrentObj.AvailablePriorityDate2.getDate() : '');
    this.scheduleAssessmentEntity.AvailablePriorityDate3 = (getCurrentObj.AvailablePriorityDate3 != undefined ? getCurrentObj.AvailablePriorityDate3.getFullYear() + "-" + (getCurrentObj.AvailablePriorityDate3.getMonth() + 1) + "-" +getCurrentObj.AvailablePriorityDate3.getDate() : '');
    if (this.scheduleAssessmentEntity.AvailablePriorityDate1 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate1 == null || this.scheduleAssessmentEntity.AvailablePriorityDate1 == undefined) {
      this.ValidAvailablePriorityDate1 = true;
    } else {
      this.ValidAvailablePriorityDate1 = false;
    }
    if (this.scheduleAssessmentEntity.AvailablePriorityDate2 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate2 == null || this.scheduleAssessmentEntity.AvailablePriorityDate2 == undefined) {
      this.ValidAvailablePriorityDate2 = true;
    } else {
      this.ValidAvailablePriorityDate2 = false;
    }
    if (this.scheduleAssessmentEntity.AvailablePriorityDate3 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate3 == null || this.scheduleAssessmentEntity.AvailablePriorityDate3 == undefined) {
      this.ValidAvailablePriorityDate3 = true;
    } else {
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
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          if (data == 'Address and Documents are not available') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload certificate document from your more details."
            })
              .then((result) => {
                if (result.value) {
                  $("#schedule").modal('hide');
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);

                }
              })
          }
          else if (data == 'Address not available') {
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
              html: "Before scheduling assessment <br>1. Add your address from your profile. "
            })
              .then((result) => {
                if (result.value) {
                  $("#schedule").modal('hide');
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Address is not available and Verification is in progress') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Your documents are under verification."
            })
              .then((result) => {
                if (result.value) {
                  $("#schedule").modal('hide');
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Address is not available and Documents are not verified') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload documents are not verfiy. Check your certificate details for more detail."
            })
              .then((result) => {
                if (result.value) {
                  $("#schedule").modal('hide');
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Documents are not verified') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No"
            })
              .then((result) => {
                if (result.value) {
                  $("#schedule").modal('hide');
                  this.router.navigate(['/certificateDetails/' + this.certificateDetail.UserCertificateId]);
                }
              })
          }
          else if (data == 'Verification is in progress') {
            swal({
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.type,
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.text,
              showConfirmButton: false,
              timer: 5000
            })
            $("#schedule").modal('hide');
          }
          else if (data == 'Documents not uploaded') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Upload certificate document from your more details."
            })
              .then((result) => {
                if (result.value) {
                  $("#schedule").modal('hide');
                  this.router.navigate(['/certificateDetails/' + this.certificateDetail.UserCertificateId]);
                }
              })
          }
          else {
            // $("#schedule").modal('hide');
            this.schedulePopup = false;
            this.scheduleAssessmentEntity = {};
            scheduleAssessmentForm.form.markAsPristine();
            this.certificateDetail.ScheduleStatusId = 15;
            swal({
              type: this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.type,
              title: this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.scheduleAssessment.alerts.text,
              showConfirmButton: false,
              timer: 3000
            })
            window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
          }
         
        },
          (error) => {
            this.schedulePopup = false;
            this.globals.isLoading = false;
            this.btn_disable = false;
            if(error.error.code == 422)
            {
              this.errorEntity.AvailablePriorityDate1 = (error.error.message.AvailablePriorityDate1 != "") ? error.error.message.AvailablePriorityDate1 : '';
              this.errorEntity.AvailablePriorityDate2 = (error.error.message.AvailablePriorityDate2 != "") ? error.error.message.AvailablePriorityDate2 : '';
              this.errorEntity.AvailablePriorityDate3 = (error.error.message.AvailablePriorityDate3 != "") ? error.error.message.AvailablePriorityDate3 : '';
            }
            else
            { 
              this.globals.pageNotfound(error.error.code);
            }
          });
    }
  }


  addDisableDate(e, getDatepickerID) {
    this.disabledDates[getDatepickerID] = e;
  }

  viewReschedule(assessment) {
    this.reSchedulePopup = true;
    this.scheduleAssessmentList = assessment.TotalScheduleAssessment;
    var someDate = new Date();
    var numberOfDaysToAdd = JSON.parse(this.certificateDetail.ScheduleAfterDaysForCandidate);
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();

    this.someFormattedDate = someDate;
   
  }
  RescheduledateChanged() {
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

  }

  RescheduleAssessment(RescheduleAssessmentForm) {
    debugger;
    let getRescheduleObj = RescheduleAssessmentForm.form.value;

    this.scheduleAssessmentEntity.AvailablePriorityDate1 = (getRescheduleObj.AvailablePriorityDate1 != undefined ? getRescheduleObj.AvailablePriorityDate1.getFullYear() + "-" + (getRescheduleObj.AvailablePriorityDate1.getMonth() + 1) + "-" + getRescheduleObj.AvailablePriorityDate1.getDate() : '') ;
    this.scheduleAssessmentEntity.AvailablePriorityDate2 = (getRescheduleObj.AvailablePriorityDate2 != undefined ? getRescheduleObj.AvailablePriorityDate2.getFullYear() + "-" + (getRescheduleObj.AvailablePriorityDate2.getMonth() + 1) + "-" + getRescheduleObj.AvailablePriorityDate2.getDate() : '');
    this.scheduleAssessmentEntity.AvailablePriorityDate3 = (getRescheduleObj.AvailablePriorityDate3 != undefined ? getRescheduleObj.AvailablePriorityDate3.getFullYear() + "-" + (getRescheduleObj.AvailablePriorityDate3.getMonth() + 1) + "-" + getRescheduleObj.AvailablePriorityDate3.getDate() : '');
    
    if (this.scheduleAssessmentEntity.AvailablePriorityDate1 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate1 == null || this.scheduleAssessmentEntity.AvailablePriorityDate1 == undefined) {
      this.ValidAvailablePriorityDate1 = true;
    } else {
      this.ValidAvailablePriorityDate1 = false;
    }
    if (this.scheduleAssessmentEntity.AvailablePriorityDate2 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate2 == null || this.scheduleAssessmentEntity.AvailablePriorityDate2 == undefined) {
      this.ValidAvailablePriorityDate2 = true;
    } else {
      this.ValidAvailablePriorityDate2 = false;
    }
    if (this.scheduleAssessmentEntity.AvailablePriorityDate3 == "" || this.scheduleAssessmentEntity.AvailablePriorityDate3 == null || this.scheduleAssessmentEntity.AvailablePriorityDate3 == undefined) {
      this.ValidAvailablePriorityDate3 = true;
    } else {
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
        .then((data) => {
          console.log("ReassessmentData" + data);
          this.globals.isLoading = false;
          this.reSchedulePopup = false;
          this.btn_disable = false;
          this.submitted = false;
          if (data == 'Address and Documents are not available') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressDocumentNotAvailable.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload certificate document from your more details."
            })
              .then((result) => {
                if (result.value) {
                  this.reSchedulePopup = false;
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Address not available') {
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
              html: "Before scheduling assessment <br>1. Add your address from your profile. "
            })
              .then((result) => {
                if (result.value) {
                  this.reSchedulePopup = false;
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Address is not available and Verification is in progress') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableVerificationProgress.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Your documents are under verification."
            })
              .then((result) => {
                if (result.value) {
                  this.reSchedulePopup = false;
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Address is not available and Documents are not verified') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.addressNotAvailableDocmunetnotVerified.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Add your address from your profile. <br>2. Upload documents are not verfiy. Check your certificate details for more detail."
            })
              .then((result) => {
                if (result.value) {
                  this.reSchedulePopup = false;
                  this.router.navigate(['/profile/' + window.btoa('addressadd')]);
                }
              })
          }
          else if (data == 'Documents are not verified') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetnotVerified.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No"
            })
              .then((result) => {
                if (result.value) {
                  this.reSchedulePopup = false;
                  this.router.navigate(['/certificateDetails/' + this.certificateDetail.UserCertificateId]);
                }
              })
          }
          else if (data == 'Verification is in progress') {
            swal({
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.type,
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetVerificationProgress.text,
              showConfirmButton: false,
              timer: 5000
            })
            this.reSchedulePopup = false;
          }
          else if (data == 'Documents not uploaded') {
            swal({
              title: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.text,
              icon: "warning",
              type: this.globals.commonTranslationText.candidateDashboardPage.alerts.docmunetsNotUpload.type,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: "No",
              html: "Before scheduling assessment <br>1. Upload certificate document from your more details."
            })
              .then((result) => {
                if (result.value) {
                  this.reSchedulePopup = false;
                  this.router.navigate(['/certificateDetails/' + this.certificateDetail.UserCertificateId]);
                }
              })
          }
          else {
            this.reSchedulePopup = false;
            this.scheduleAssessmentEntity = {};
            RescheduleAssessmentForm.form.markAsPristine();
            this.certificateDetail.ScheduleStatusId = 15;
            swal({
              type: this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.type,
              title: this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.title,
              text: this.globals.commonTranslationText.candidateDashboardPage.rescheduleAssessment.alerts.text,
              showConfirmButton: false,
              timer: 2000
            })
            window.location.href = "/certificateDetails/" + this.certificateDetail.UserCertificateId;
          }
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.globals.pageNotfound(error.error.code);

          });
    }
  }

  deleteDocument(documents, value) {

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
      .then((result) => {
        if (result.value) {
          this.globals.isLoading = true;
          this.ProfileService.deleteDocument(documents.UserDocumentId, documents.UserDocumentCertificateMappingId)
            .then((data) => {
              if (value == 0) {
                let index = this.optionalDocumentsList.indexOf(documents);
                if (index != -1) {
                  this.optionalDocumentsList.splice(index, 1);
                }
              }
              else {
                let index = this.mandatoryDocumentsList.indexOf(documents);
                if (index != -1) {
                  this.mandatoryDocumentsList.splice(index, 1);
                }
              }
              for (var i = 0; i < this.certificatedocument.length; i++) {
                if (this.certificatedocument[i].DocumentId == documents.DocumentId) {
                  this.certificatedocument[i].flag = 0;
                }
              }
              this.globals.isLoading = false;

              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.type,
                title: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.title,
                text: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
              var userCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
              window.location.href = '/certificateDetails/' + this.certificateDetail.UserCertificateId;
            },
              (error) => {
                this.globals.isLoading = false;
                if (error.error.message == "Already in use") {
                  swal({
                    //position: 'top-end',
                    type: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.text,
                    showConfirmButton: false,
                    timer: 4000
                  })
                }
                else {
                  this.globals.pageNotfound(error.error.code);
                }
              });
          //this.router.navigate(['/profile']);
        }
      })
  }

  documents(UserDocumentId, CertificateDocumentId) {
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
      .then((data) => {
        //this.documentList = data;
        var data1: any;
        data1 = data;
        var documentSelect = {
          CertificateDocumentId: '',
          DocumentName: this.globals.adminTranslationText.document.form.documentType.select,
          Value: ""
        }
        this.documentList.push(documentSelect);
        this.documentList = [...this.documentList, ...data1];
        this.documentList = this.documentList.filter(docs => {
          return docs.flag == 0;
        });
        setTimeout(function () {
          $('#CertificateDocumentId').selectpicker('refresh');
        }, 100);
        for (var i = 0; i < this.certificateDocuments.length; i++) {
          if (this.certificateDocuments[i].CertificateDocumentId > 0) {
            for (var i = 0; i < this.documentList.length; i++) {
              if (UserDocumentId == 0) {
                if (this.certificateDocuments[i].CertificateDocumentId == this.documentList[i].CertificateDocumentId) {
                  this.documentList[i].flag = 1;
                }
              }
            }
          }
        }
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  documentSubmit(documentForm) {
    this.submitted1 = true;
    if (documentForm.valid) {
      let file1 = '';
      var fd = new FormData();
      var total = 0;
      this.documentEntity.Document = [];

      if (this.documentEntity.CertificateDocumentId != '' && this.documentEntity.CertificateDocumentName != '') {
        file1 = this.elem.nativeElement.querySelector('#CertificateDocumentName').files;
        if (file1 && file1.length != 0) {
          total = file1.length;
          for (var k = 0; k < file1.length; k++) {
            var Images = Date.now() + '_' + file1[k]['name'].replace(/ /g, "_");
            fd.append('Document' + k, file1[k], Images);
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
        UserDocumentId: this.documentEntity.UserDocumentId, UserCertificateId: this.documentEntity.UserCertificateId
        , CertificateDocumentId: this.documentEntity.CertificateDocumentId, CertificateDocumentName: this.documentEntity.CertificateDocumentName,
        DocumentUrl: '/assests/Documents/', UserId: this.globals.authData.UserId, documentCount: this.documentList.length,
        UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName, CertificateName: this.certificateDetail.CertificateName, LoginURL: '/login'
      }];
      //console.log(this.documentEntity.UserDocuments);

      if (this.documentEntity.CertificateDocumentId != '' && this.documentEntity.CertificateDocumentName != '') {
        this.globals.isLoading = true;
        this.ProfileService.addDocument(this.documentEntity)
          .then((data) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.submitted1 = false;
            if (file1) {
              this.ProfileService.uploadFileCertificate(fd, total, this.globals.authData.UserId)
                .then((data) => {
                  $("#CertificateDocumentName").val(null);
                  $("#documentModal").hide();
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                    showConfirmButton: false,
                    timer: 3000
                  })
                  var userCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
                  window.location.href = '/certificateDetails/' + userCertificateId;
                },
                  (error) => {
                    this.btn_disable = false;
                    this.globals.isLoading = false;
                    this.globals.pageNotfound(error.error.code);
                  });
            }
            else {
              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                showConfirmButton: false,
                timer: 3000
              })
              var userCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
              window.location.href = '/certificateDetails/' + userCertificateId;
            }
          },
            (error) => {
              this.btn_disable = false;
              this.submitted1 = false;
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
      }
    }
  }

  CancelAssessmentView(assessment) {
    this.submitted2 = false;
    this.cancelAssessmentEntity.AssignDate = assessment.AssignDate;
    this.cancelAssessmentEntity.StartTime = assessment.StartTime;
    this.cancelAssessmentEntity.EndTime = assessment.EndTime;
  }
  cancelAssessment(cancelAssessmentForm) {
    debugger;
    // this.submitted2 = true;
    // if (cancelAssessmentForm.valid) {
      this.cancelAssessmentEntity.ScheduleAssessmentId = this.ScheduleAssessmentId;// this.certificateDetail.ScheduleAssessmentId;
      this.cancelAssessmentEntity.FirstName = this.globals.authData.FirstName;
      this.cancelAssessmentEntity.LastName = this.globals.authData.LastName;
      this.cancelAssessmentEntity.CertificateName = this.certificateDetail.CertificateName;
      this.cancelAssessmentEntity.LoginURL = '/login';
      this.cancelAssessmentEntity.UserId = this.globals.authData.UserId;
      this.cancelAssessmentEntity.CancelComment = (this.cancelAssessmentEntity.CancelComment != "undefined") ? this.cancelAssessmentEntity.CancelComment : '';
      this.globals.isLoading = true;
      this.DashboardService.cancelAssessment(this.cancelAssessmentEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.cancelAssessmentEntity = {};
          this.btn_disable = false;
          this.submitted2 = false;
          swal({
            type: this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.alerts.type,
            title: this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.alerts.title,
            text: this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.alerts.text,
            showConfirmButton: false,
            timer: 5000
          })
          window.location.href = '/certificateDetails/' + this.certificateDetail.UserCertificateId;
        },
          (error) => {
            this.btn_disable = false;
            this.submitted1 = false;
            this.globals.isLoading = false;
            if(error.error.code == 422) {
              this.errorEntity.message = this.globals.commonTranslationText.certificateDetailPage.cancelAssessment.required;
            } else {
               this.globals.pageNotfound(error.error.code);
            }
            
          });
    // }
  }

  payment(value) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_MHAfUuQx0qo9YiakFP8KMX75009DxAx6R1',
      locale: 'auto',
      currency: this.globals.selectedCurrency,
      token: token => {
        this.btn_disable = true;
        this.globals.isLoading = true;
        var date = new Date();
        let postData = {};
        postData['userCertificateId'] = window.atob(this.certificateDetail.UserCertificateId);
        postData['token_id'] = token.id;
        postData['TotalAmount'] = this.certificateDetail.USDPrice;
        postData['currency'] = this.globals.selectedCurrency;
        postData['email'] = this.globals.authData.EmailAddress;
        postData['UserId'] = this.globals.authData.UserId;
        postData['CertificateName'] = this.certificateDetail.CertificateName;
        postData['LoginURL'] = '/login';
        postData['forRenewal'] = value;
        this.DashboardService.addPayment(postData)
          .then((data) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (value == 0) {
              this.certificateDetail.CertificateStatus = 62;
              this.certificateDetail.CertificateStatusText = 'Paid';
              swal({
                type: this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.type,
                title: this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.title,
                text: this.globals.commonTranslationText.candidateDashboardPage.alerts.paymentSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
              this.router.navigate[('/certificateDetails/' + this.certificateDetail.UserCertificateId)];
            }
            else {
              swal({
                type: this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.type,
                title: this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.title,
                text: this.globals.commonTranslationText.candidateDashboardPage.alerts.renew.text,
                showConfirmButton: false,
                timer: 4000
              })
              window.location.href = '/certificateDetails/' + this.certificateDetail.UserCertificateId;
            }
          },
            (error) => {
              this.globals.isLoading = false;
              this.btn_disable = false;
              this.globals.pageNotfound(error.error.code);
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
  }
  recertification() {
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
      .then((result) => {
        if (result.value) {
          var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_MHAfUuQx0qo9YiakFP8KMX75009DxAx6R1',
            locale: 'auto',
            currency: this.globals.selectedCurrency,
            token: token => {
              this.btn_disable = true;
              this.globals.isLoading = true;
              var date = new Date();
              let postData = {};
              postData['CertificateId'] = this.certificateDetail.CertificateId;
              postData['userCertificateId'] = this.certificateDetail.UserCertificateId;
              postData['token_id'] = token.id;
              postData['TotalAmount'] = this.certificateDetail.USDPrice;
              postData['currency'] = this.globals.selectedCurrency;
              postData['email'] = this.globals.authData.EmailAddress;
              postData['UserId'] = this.globals.authData.UserId;
              postData['CertificateName'] = this.certificateDetail.CertificateName;
              postData['LoginURL'] = '/login';
              this.DashboardService.addRecertification(postData)
                .then((data) => {
                  this.globals.isLoading = false;
                  swal({
                    type: this.globals.commonTranslationText.candidateDashboardPage.alerts.recertificationSuccess.type,
                    title: this.globals.commonTranslationText.candidateDashboardPage.alerts.recertificationSuccess.title,
                    text: this.globals.commonTranslationText.candidateDashboardPage.alerts.recertificationSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                  })
                  window.location.href = '/dashboard';
                },
                  (error) => {
                    this.globals.isLoading = false;
                    
                    this.btn_disable = false;
                    this.globals.pageNotfound(error.error.code);
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
        }
      })
  }
}
