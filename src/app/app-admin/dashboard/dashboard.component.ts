import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DashboardService } from '../services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, Tooltip, swal: any, google, map: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  defaultDashboardEntity;
  attendanceSheetList;
  calendarDetailsList;
  monthlyProctoringList;
  yearsList;
  changePresentStatusEntity;
  finalFeedbackEntity;
  resumeAssessmentEntity;
  stopAssessmentEntity;
  documentVerificationEntity;
  mandatoryDocumentsList;
  optionalDocumentsList;
  commentDisplay;
  submitted1;
  submitted2;
  submitted3;
  submitted4;
  submitted5;
  currentDate;
  chartArr = {
    data: [],
    selectedYear: '',
    selectedQuarter: 'all',
  };
  auto;

  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private DashboardService: DashboardService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public mySelection: string[] = [];

  public sort: SortDescriptor[] = [{
    field: 'StartTime',
    dir: 'asc'
  }];

  ngOnInit() {
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
      .then((data) => {
        debugger
        this.globals.isLoading = false;
        this.defaultDashboardEntity = data;
        console.log(this.defaultDashboardEntity);
        this.attendanceSheetList = data['AttendanceSheet'];
        for (let i = 0; i < this.attendanceSheetList.length; i++) {
          let hour1 = (this.attendanceSheetList[i].StartTime.split(':'))[0]
          let min = (this.attendanceSheetList[i].StartTime.split(':'))[1]
          let part = hour1 > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          this.attendanceSheetList[i].startTime = hour1 + ':' + min + part;

          let hour2 = (this.attendanceSheetList[i].EndTime.split(':'))[0]
          let min2 = (this.attendanceSheetList[i].EndTime.split(':'))[1]
          let part2 = hour2 > 12 ? 'pm' : 'am';
          min2 = (min2 + '').length == 1 ? `0${min2}` : min2;
          hour2 = hour2 > 12 ? hour2 - 12 : hour2;
          hour2 = (hour2 + '').length == 1 ? `0${hour2}` : hour2;
          this.attendanceSheetList[i].endTime = hour2 + ':' + min2 + part;
        }
        this.gridData = data['AttendanceSheet'];
        this.calendarDetailsList = data['CalendarDetails'];
        this.monthlyProctoringList = data['MonthlyProctoring'];
        this.yearsList = data['Years'];
        this.chartArr.selectedYear = this.yearsList[this.yearsList.length - 1];
        this.getQuarterData(this.chartArr.selectedYear, 'all');
      
        let todaysdate = this.globals.todaysdate;
        console.log(this.calendarDetailsList);
       

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
          events: this.calendarDetailsList,

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
            $(element).tooltip({ title: event.CertificateName, html: true, container: "body" })
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
          var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererRadial>());
          categoryAxis.dataFields.category = "month";
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.grid.template.strokeOpacity = 0;
          categoryAxis.renderer.labels.template.horizontalCenter = "right";
          // categoryAxis.renderer.labels.template.fontWeight = 500;
          categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
            return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
          });
          categoryAxis.renderer.minGridDistance = 10;

          var valueAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
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
        this.globals.isLoading = false;

      },
        (error) => {
          this.globals.isLoading = false;
          swal({
            type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            showConfirmButton: false,
            timer: 4000
          })

        });

    setTimeout(function () {
      // new PerfectScrollbar('.attendance_block');
      $('select').selectpicker();
      new PerfectScrollbar('.fc-scroller');
    }, 500);
    new PerfectScrollbar('.rejected_proctor');
    new PerfectScrollbar('.monthly_proctor');
  }

  generateChart() {
    console.log(this.chartArr.data);
    if(this.chartArr.data.length != 0) {

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
   } else {
     // todo
       $("#month_proctor").html("No record Found");
   }

   
 }

 getQuarterData(year, quarterKey) {
   let data = [];
   if(this.monthlyProctoringList.length != 0) {
   if (quarterKey != "all") {
     data = this.monthlyProctoringList[year][quarterKey];
   } else {
     data = [...this.monthlyProctoringList[year]['firstQuarter'], ...this.monthlyProctoringList[year]['secondQuarter'], ...this.monthlyProctoringList[year]['thirdQuarter'], ...this.monthlyProctoringList[year]['forthQuarter']];
   }
  }
   this.chartArr.data =  data;
  
   this.chartArr.selectedQuarter =  quarterKey;
   this.generateChart();
 }

 getYearlyData(e) {
  if(this.monthlyProctoringList.length != 0) {
   const yearly = this.monthlyProctoringList[e.target.value];
   this.chartArr.selectedYear = e.target.value;
   this.chartArr.data = [...yearly['firstQuarter'], ...yearly['secondQuarter'], ...yearly['thirdQuarter'], ...yearly['forthQuarter']];
   this.chartArr.selectedQuarter =  'all';
  }
   this.generateChart();
 }

  //change candidate status present or absent
  ChangePresentStatus(attendance, i) {
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
      .then((data) => {
        this.globals.isLoading = false;
        if (this.changePresentStatusEntity.IsActive == 1) {
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        window.location.href = '/admin/adminDashboard';
        this.changePresentStatusEntity = {};
      },
        (error) => {
          this.globals.isLoading = false;
          swal({
            //position: 'top-end',
            type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            showConfirmButton: false,
            timer: 4000
          })
        });
  }

  //feedback popup open
  finalFeedbackShow(attendance) {
    this.finalFeedbackEntity = {};
    this.submitted1 = false;
    this.finalFeedbackEntity.ProctorId = attendance.ProctorId;
    this.finalFeedbackEntity.UserId = attendance.UserId;
    this.finalFeedbackEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
    this.finalFeedbackEntity.CandidateName = attendance.CandidateName;
  }

  //final submit for feedback
  finalFeedbackSubmit(finalFeedbackForm) {
    this.submitted1 = true;
    if (finalFeedbackForm.valid) {
      this.globals.isLoading = true;
      this.DashboardService.finalFeedback(this.finalFeedbackEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.submitted1 = false;
          $("#FeedbackModal").modal('hide');
          finalFeedbackForm.form.markAsPristine();
          this.finalFeedbackEntity = {};
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.finalFeedback.alerts.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.finalFeedback.alerts.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.finalFeedback.alerts.text,
            showConfirmButton: false,
            timer: 4000
          })
        },
          (error) => {
            this.globals.isLoading = false;
            swal({
              //position: 'top-end',
              type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
              title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
              text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
              showConfirmButton: false,
              timer: 4000
            })
          });
    }
  }

  //resume assessment
  resumeAssessment(attendance) {
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
      .then((result) => {
        if (result.value) {
          this.globals.isLoading = true;
          this.resumeAssessmentEntity.ProctorId = attendance.ProctorId;
          this.resumeAssessmentEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
          this.DashboardService.ResumeAssessment(this.resumeAssessmentEntity)
            .then((data) => {
              this.globals.isLoading = false;
              this.resumeAssessmentEntity = {};
              swal({
                type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.type,
                title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.title,
                text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.text,
                showConfirmButton: false,
                timer: 4000
              })
              window.location.href = '/admin/adminDashboard';
            },
              (error) => {
                this.globals.isLoading = false;
                swal({
                  //position: 'top-end',
                  type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                  title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                  text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              });
        }

      })
  }

  //stop assessment popup open
  stopAssessmentShow(attendance) {
    this.stopAssessmentEntity = {};
    this.submitted2 = false;
    this.stopAssessmentEntity.StopAssessmentStatus = 43;
    this.stopAssessmentEntity.ProctorId = attendance.ProctorId;
    this.stopAssessmentEntity.UserId = attendance.UserId;
    this.stopAssessmentEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
    this.stopAssessmentEntity.CandidateName = attendance.CandidateName;
    this.stopAssessmentEntity.CertificateName = attendance.CertificateName;
  }

  //stop assessment submit
  stopAssessmentSubmit(stopAssessmentForm) {
    this.submitted2 = true;
    if (stopAssessmentForm.valid) {
      this.globals.isLoading = true;
      this.stopAssessmentEntity.LoginURL = '/login';
      this.DashboardService.stopAssessment(this.stopAssessmentEntity)
        .then((data) => {
          this.globals.isLoading = false;
          $("#StopModal").modal('hide');
          stopAssessmentForm.form.markAsPristine();
          this.stopAssessmentEntity = {};
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.stopAssessment.alerts.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.stopAssessment.alerts.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.stopAssessment.alerts.text,
            showConfirmButton: false,
            timer: 4000
          })
          window.location.href = '/admin/adminDashboard';
        },
          (error) => {
            this.globals.isLoading = false;
            swal({
              //position: 'top-end',
              type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
              title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
              text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
              showConfirmButton: false,
              timer: 4000
            })
          });
    }
  }

  //get incomplete Assessment
  incompleteAssessment() {
    if ($("#check_list").prop('checked') == true) {
      this.globals.isLoading = true;
      this.DashboardService.getincompleteAssessment()
        .then((data) => {
          console.log(data);
          //this.defaultDashboardEntity = data;
          this.attendanceSheetList = data;
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            let hour1 = (this.attendanceSheetList[i].StartTime.split(':'))[0]
            let min = (this.attendanceSheetList[i].StartTime.split(':'))[1]
            let part = hour1 > 12 ? 'pm' : 'am';
            min = (min + '').length == 1 ? `0${min}` : min;
            hour1 = hour1 > 12 ? hour1 - 12 : hour1;
            hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
            this.attendanceSheetList[i].startTime = hour1 + ':' + min + part;

            let hour2 = (this.attendanceSheetList[i].EndTime.split(':'))[0]
            let min2 = (this.attendanceSheetList[i].EndTime.split(':'))[1]
            let part2 = hour2 > 12 ? 'pm' : 'am';
            min2 = (min2 + '').length == 1 ? `0${min2}` : min2;
            hour2 = hour2 > 12 ? hour2 - 12 : hour2;
            hour2 = (hour2 + '').length == 1 ? `0${hour2}` : hour2;
            this.attendanceSheetList[i].endTime = hour2 + ':' + min2 + part;
          }
          this.gridData = data;
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            if (error.text) {
              swal({
                //position: 'top-end',
                type: 'error',
                title: 'Oops...',
                text: "Something went wrong!"
              })
            }
          });
    }
    else {
      this.globals.isLoading = true;
      this.DashboardService.getById()
        .then((data) => {
          console.log(data);
          this.defaultDashboardEntity = data;
          this.attendanceSheetList = data['AttendanceSheet'];
          this.gridData = data['AttendanceSheet'];
          this.calendarDetailsList = data['CalendarDetails'];
          this.monthlyProctoringList = data['MonthlyProctoring'];
          this.yearsList = data['Years'];
          let todaysdate = this.globals.todaysdate;
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            let hour1 = (this.attendanceSheetList[i].StartTime.split(':'))[0]
            let min = (this.attendanceSheetList[i].StartTime.split(':'))[1]
            let part = hour1 > 12 ? 'pm' : 'am';
            min = (min + '').length == 1 ? `0${min}` : min;
            hour1 = hour1 > 12 ? hour1 - 12 : hour1;
            hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
            this.attendanceSheetList[i].startTime = hour1 + ':' + min + part;

            let hour2 = (this.attendanceSheetList[i].EndTime.split(':'))[0]
            let min2 = (this.attendanceSheetList[i].EndTime.split(':'))[1]
            let part2 = hour2 > 12 ? 'pm' : 'am';
            min2 = (min2 + '').length == 1 ? `0${min2}` : min2;
            hour2 = hour2 > 12 ? hour2 - 12 : hour2;
            hour2 = (hour2 + '').length == 1 ? `0${hour2}` : hour2;
            this.attendanceSheetList[i].endTime = hour2 + ':' + min2 + part;
          }

          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            if (error.text) {
              swal({
                //position: 'top-end',
                type: 'error',
                title: 'Oops...',
                text: "Something went wrong!"
              })
            }
          });
    }

  }

  //document verification popup open
  documentVerificationShow(attendance) {
    debugger
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
  }

  //verifiy for mandatory document status change
  mandatoryDocumentsStatusChange(mandatoryDocuments, i) {
    var IsVerify = 0;
    //if ($("#docactive" + i).is(':checked'))
    if (i)
      IsVerify = 1;
    this.globals.isLoading = true;
    this.DashboardService.VerifyDocument(mandatoryDocuments.UserDocumentCertificateMappingId, IsVerify)
      .then((data) => {
        this.globals.isLoading = false;
        if (IsVerify == 1) {
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.text,
            showConfirmButton: false,
            timer: 5000
          })
        }
        else {
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.text,
            showConfirmButton: false,
            timer: 5000
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          swal({
            type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            showConfirmButton: false,
            timer: 4000
          })
        });
  }

  //verifiy for optional document status change
  optionalDocumentsStatusChange(optionalDocuments, i) {
    var IsVerify = 0;
    //if ($("#docoptionalactive" + i).is(':checked'))
    if (i)
      IsVerify = 1;
    this.globals.isLoading = true;
    this.DashboardService.VerifyDocument(optionalDocuments.UserDocumentCertificateMappingId, IsVerify)
      .then((data) => {
        this.globals.isLoading = false;
        if (IsVerify == 1) {
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.text,
            showConfirmButton: false,
            timer: 5000
          })
        }
        else {
          swal({
            type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.type,
            title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.title,
            text: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.text,
            showConfirmButton: false,
            timer: 5000
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          swal({
            type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            showConfirmButton: false,
            timer: 4000
          })
        });
  }

  //document verification status updated
  DocumentVerificationStatus(i) {
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
          .then((result) => {
            if (result.value) {
              this.globals.isLoading = true;
              this.DashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
                .then((data) => {
                  this.globals.isLoading = false;
                  $('#document_verify').modal('hide');
                  swal({
                    type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                    title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                    text: this.documentVerificationEntity.CandidateName + "'s " + this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                    showConfirmButton: false,
                    timer: 5000
                  })
                  window.location.href = '/admin/adminDashboard';
                },
                  (error) => {
                    this.globals.isLoading = false;
                    swal({
                      type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                      title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                      text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                      showConfirmButton: false,
                      timer: 4000
                    })

                  });
            }
          });
      }
      else {
        this.globals.isLoading = true;
        this.DashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
          .then((data) => {
            this.globals.isLoading = false;
            $('#document_verify').modal('hide');
            swal({
              type: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
              title: this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
              text: this.documentVerificationEntity.CandidateName + "'s " + this.globals.commonTranslationText.adminDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
              showConfirmButton: false,
              timer: 5000
            })
            window.location.href = '/admin/adminDashboard';
          },
            (error) => {
              this.globals.isLoading = false;
              swal({
                type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                showConfirmButton: false,
                timer: 4000
              })

            });
      }


    }
  }

  public onFilter(inputValue: string): void {
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
  }
}

