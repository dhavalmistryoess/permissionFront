import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProctorDashboardService } from '../services/proctor-dashboard.service';
import { ProfileService } from '../services/profile.service';
import { DashboardService } from '../app-admin/services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, swal: any;

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {

  attendanceSheetList;
  changePresentStatusEntity;
  finalFeedbackEntity;
  resumeAssessmentEntity;
  stopAssessmentEntity;
  documentVerificationEntity;
  mandatoryDocumentsList;
  optionalDocumentsList;
  commentDisplay;
  addressList;
  candidateList;
  proctorList;
  filterEntity;
  submitted1;
  submitted2;
  submitted3;
  submitted4;
  submitted5;
  currentDate;
  addedDate;
  showFilterLocationEntity;
  showFilterShiftEntity;
  showFilterCandidateEntity;
  shiftFilterList;
  certificatedocumentEntity;
  editDocumentValue;
  certificateimage;
  certificatedocument;
  DocumentValid;
  auto;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private ProctorDashboardService: ProctorDashboardService, private DashboardService: DashboardService, private ProfileService: ProfileService, private elem: ElementRef) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public mySelection: string[] = [];

  public sort: SortDescriptor[] = [{
    field: 'StartTime',
    dir: 'asc'
  }];

  ngOnInit() {
    debugger
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
    this.globals.isLoading = true;
    this.attendanceSheetList = [];
    this.changePresentStatusEntity = {};
    this.finalFeedbackEntity = {};
    this.resumeAssessmentEntity = {};
    this.stopAssessmentEntity = {};
    this.mandatoryDocumentsList = [];
    this.optionalDocumentsList = [];
    this.documentVerificationEntity = {};
    this.addressList = [];
    this.shiftFilterList = [];
    this.candidateList = [];
    this.proctorList = [];
    this.filterEntity = {};
    this.showFilterLocationEntity = [];
    this.showFilterShiftEntity = [];
    this.showFilterCandidateEntity = [];
    this.certificatedocumentEntity = {};
    this.certificatedocument = [];

    //this.currentDate = new Date();
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    this.currentDate = d;//curr_year + '-' + curr_month + '-' + curr_date;
    var dt = new Date();
    dt.setHours(dt.getHours() + 2);
    dt.setMinutes(dt.getMinutes() + 20);
    //alert(dt);
    this.shiftFilterList = [
      { label: "Morning", value: "12:00:00" },
      { label: "Afternoon", value: "17:00:00" },
      { label: "Evening", value: "20:00:00" }
    ];
    if (this.globals.authData.RoleId == 1) {
      debugger
      this.DashboardService.getFilterDefaultData()
        .then((data) => {
          debugger
          this.globals.isLoading = false;
          this.addressList = data['Addresses'];
          this.candidateList = data['Candidates'];
          var proctorSelect = {
            UserId: '',
            FirstName: 'Select Proctor Name',
            Value: ""
          }
          this.proctorList.push(proctorSelect);
          this.proctorList = [...this.proctorList, ...data['Proctors']];
          //this.proctorList = data['Proctors'];          
        },
          (error) => {
            this.globals.isLoading = false;
           this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.ProctorDashboardService.getFilterDefaultData(this.globals.authData.UserId)
        .then((data) => {
          console.log(data);
          debugger
          this.globals.isLoading = false;
          this.addressList = data['Addresses'];
          this.candidateList = data['Candidates'];
          var proctorSelect = {
            UserId: '',
            FirstName: 'Select Proctor Name',
            Value: ""
          }
          this.proctorList.push(proctorSelect);
          this.proctorList = [...this.proctorList, ...data['Proctors']];
          //this.proctorList = data['Proctors'];          
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    if (this.globals.authData.RoleId == 1) {
      this.DashboardService.getFullAttendanceSheet()
        .then((data) => {
          debugger

          this.attendanceSheetList = data;
          this.gridData = data;
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            var newDate1 = new Date(this.attendanceSheetList[i].AssignDate);
            var hour = this.attendanceSheetList[i].EndTime.substring(0, 2);
            var newDate = new Date(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(this.attendanceSheetList[i].EndTime.substring(0, 2), this.attendanceSheetList[i].EndTime.substring(3, 5));
            this.attendanceSheetList[i].addedDate = newDate;

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
          let todaysdate = this.globals.todaysdate;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });

    } else {
      this.ProctorDashboardService.getFullAttendanceSheet(this.globals.authData.UserId)
        .then((data) => {
          debugger

          this.attendanceSheetList = data;
          this.gridData = data;
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            var newDate1 = new Date(this.attendanceSheetList[i].AssignDate);
            var hour = this.attendanceSheetList[i].EndTime.substring(0, 2);
            var newDate = new Date(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(this.attendanceSheetList[i].EndTime.substring(0, 2), this.attendanceSheetList[i].EndTime.substring(3, 5));
            this.attendanceSheetList[i].addedDate = newDate;

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
            
            var d = new Date();
            var todayTime = (d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()) + ':00';
            var beforehours = new Date('December 17, 1995 ' + this.attendanceSheetList[i].StartTime);
            beforehours.setHours(beforehours.getHours() - 2);

            var afterhours = new Date('December 17, 1995 ' + this.attendanceSheetList[i].EndTime);
            afterhours.setHours(afterhours.getHours() + 2);
            console.log(beforehours.getHours() + ':' + beforehours.getMinutes() + ' ' + afterhours.getHours() + ':' + afterhours.getMinutes());
            var before2hours = (beforehours.getHours() < 10 ? '0' + beforehours.getHours() : '' + beforehours.getHours()) + ':' + (beforehours.getMinutes() < 10 ? '0' + beforehours.getMinutes() : '' + beforehours.getMinutes()) + ':00';
            var after2hours = (afterhours.getHours() < 10 ? '0' + afterhours.getHours() : '' + afterhours.getHours()) + ':' + (afterhours.getMinutes() < 10 ? '0' + afterhours.getMinutes() : '' + afterhours.getMinutes()) + ':00';

            if (before2hours <= todayTime || todayTime <= after2hours) {
              this.attendanceSheetList[i].assessmentbtndisplay = true;
            }
            else {
              this.attendanceSheetList[i].assessmentbtndisplay = false;
            }
          }
          let todaysdate = this.globals.todaysdate;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
  }

  //change candidate status present or absent
  ChangePresentStatus(attendance, i) {
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
    if (this.globals.authData.RoleId == 1) {
      this.DashboardService.ChangePresentStatus(this.changePresentStatusEntity)
        .then((data) => {
          this.globals.isLoading = false;

          if (this.changePresentStatusEntity.IsActive == 1) {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.text,
              showConfirmButton: false,
              timer: 4000
            })
          }
          else {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.text,
              showConfirmButton: false,
              timer: 4000
            })
          }
          window.location.href = '/attendanceSheet';
          this.changePresentStatusEntity = {};
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.ProctorDashboardService.ChangePresentStatus(this.changePresentStatusEntity)
        .then((data) => {
          this.globals.isLoading = false;

          if (this.changePresentStatusEntity.IsActive == 1) {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.presentSuccess.text,
              showConfirmButton: false,
              timer: 4000
            })
          }
          else {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.changePresentStatus.alerts.absentSuccess.text,
              showConfirmButton: false,
              timer: 4000
            })
          }
          window.location.href = '/attendanceSheet';
          this.changePresentStatusEntity = {};
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }

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
      if (this.globals.authData.RoleId == 1) {
        this.DashboardService.finalFeedback(this.finalFeedbackEntity)
          .then((data) => {
            this.globals.isLoading = false;
            this.submitted1 = false;
            $("#FeedbackModal").modal('hide');
            finalFeedbackForm.form.markAsPristine();
            this.finalFeedbackEntity = {};
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.text,
              showConfirmButton: false,
              timer: 4000
            })
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
      } else {
        this.ProctorDashboardService.finalFeedback(this.finalFeedbackEntity)
          .then((data) => {
            this.globals.isLoading = false;
            this.submitted1 = false;
            $("#FeedbackModal").modal('hide');
            finalFeedbackForm.form.markAsPristine();
            this.finalFeedbackEntity = {};
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.finalFeedback.alerts.text,
              showConfirmButton: false,
              timer: 4000
            })
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
      }

    }
  }
 
  //resume assessment
  resumeAssessment(attendance) {
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
      .then((result) => {
        if (result.value) {
          this.globals.isLoading = true;
          this.resumeAssessmentEntity.ProctorId = attendance.ProctorId;
          this.resumeAssessmentEntity.UserId = attendance.UserId;
          this.resumeAssessmentEntity.CertificateName = attendance.CertificateName;
          this.resumeAssessmentEntity.ScheduleAssessmentId = attendance.ScheduleAssessmentId;
          if (this.globals.authData.RoleId == 1) {
            this.DashboardService.ResumeAssessment(this.resumeAssessmentEntity)
              .then((data) => {
                this.globals.isLoading = false;
                this.resumeAssessmentEntity = {};
                swal({
                  type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.type,
                  title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.title,
                  text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.text,
                  showConfirmButton: false,
                  timer: 4000
                })
                window.location.href = '/attendanceSheet';
              },
                (error) => {
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
          } else {
            this.ProctorDashboardService.ResumeAssessment(this.resumeAssessmentEntity)
              .then((data) => {
                this.globals.isLoading = false;
                this.resumeAssessmentEntity = {};
                swal({
                  type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.type,
                  title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.title,
                  text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.resumeAssessment.alerts.successResumeAssessment.text,
                  showConfirmButton: false,
                  timer: 4000
                })
                window.location.href = '/attendanceSheet';
              },
                (error) => {
                  this.globals.isLoading = false;
                 this.globals.pageNotfound(error.error.code);
                });
          }
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
      if (this.globals.authData.RoleId == 1) {
        this.DashboardService.stopAssessment(this.stopAssessmentEntity)
          .then((data) => {
            this.globals.isLoading = false;
            $("#StopModal").modal('hide');
            stopAssessmentForm.form.markAsPristine();
            this.stopAssessmentEntity = {};
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.text,
              showConfirmButton: false,
              timer: 4000
            })
            window.location.href = '/attendanceSheet';
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });

      } else {
        this.ProctorDashboardService.stopAssessment(this.stopAssessmentEntity)
          .then((data) => {
            this.globals.isLoading = false;
            $("#StopModal").modal('hide');
            stopAssessmentForm.form.markAsPristine();
            this.stopAssessmentEntity = {};
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.stopAssessment.alerts.text,
              showConfirmButton: false,
              timer: 4000
            })
            window.location.href = '/attendanceSheet';
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
      }

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

    this.certificatedocumentEntity.UserCertificateId = attendance.UserCertificateId;
    this.certificatedocumentEntity.CertificateId = attendance.CertificateId;
    this.certificatedocumentEntity.CertificateFor = attendance.CertificateFor;
    this.certificatedocumentEntity.UserId = attendance.UserId;
    for (var i = 0; i < this.mandatoryDocumentsList.length; i++) {
      if (this.mandatoryDocumentsList[i].UserDocumentId != null) {
        var ExtStr = this.mandatoryDocumentsList[i].CertificateDocumentName;
        var Ext = "." + ExtStr.split(".")[1];//ExtStr.substring(ExtStr.length - 4, ExtStr.length);
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
        var Ext = "." + ExtStr.split(".")[1];//ExtStr.substring(ExtStr.length - 4, ExtStr.length);
        this.optionalDocumentsList[i].Ext = Ext;
        this.optionalDocumentsList[i].flag = 1;
      }
      else{
        this.optionalDocumentsList[i].flag = 0;
      }
    }
  }

  certificatedocuments(certificateDocument, value, documenId,edittimevalue) {
    debugger
    this.Removeimage();
    if (certificateDocument) {
      this.editDocumentValue = edittimevalue;
      this.certificatedocumentEntity.UserDocumentId = certificateDocument.UserDocumentId;
    } else {
      this.certificatedocumentEntity.UserDocumentId = 0;
      setTimeout(() => {
        this.submitted3 = false;
      }, 200);
    }
    this.certificatedocumentEntity.UserDocumentCertificateMappingId = certificateDocument.UserDocumentCertificateMappingId;
    this.certificatedocumentEntity.CertiDocumentId = documenId;
    var certificates = { 'UserId': this.certificatedocumentEntity.UserId, 'CertificateId': this.certificatedocumentEntity.CertificateId, 'CertificateFor': this.certificatedocumentEntity.CertificateFor }
    this.ProfileService.getData(certificates)
      .then((data) => {
        this.globals.isLoading = false;
        $('#uploaddocumentModal').modal('show');
        $('#document_verify').modal('hide');
        this.certificateimage = data['UserAllDocuments'];
         this.certificatedocument = data['CertificateDocuments'];            
      },
      (error) => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);        
      });    
  }

  documentClose() //document pop up close function
  {
    $('#uploaddocumentModal').modal('hide');
    $('#document_verify').modal('show');
  }
  
  imageclick(image, i) {
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
      if(this.editDocumentValue == 1)
      {
        if (this.certificatedocumentEntity.CertificateName == "" || this.certificatedocumentEntity.CertificateName == null || this.certificatedocumentEntity.CertificateName == undefined) 
        {
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
      else{
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
        UserId: this.certificatedocumentEntity.UserId,
        documentCount: 1,
        UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName,
        CertificateName: this.documentVerificationEntity.CertificateName, LoginURL: '/login'
      }];
      console.log(this.certificatedocumentEntity);

      this.globals.isLoading = true;
      this.ProfileService.UpdateCertificateDocuments(this.certificatedocumentEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.submitted3 = false;
          if (this.certificatedocumentEntity.UserDocumentId != 0) {
            $("#new_upload_file").val(null);
            $("#uploaddocumentModal").hide();
            swal({
              type: this.globals.commonTranslationText.profilePage.alerts.document.type,
              title: this.globals.commonTranslationText.profilePage.alerts.document.title,
              text: this.globals.commonTranslationText.profilePage.alerts.document.text,
              showConfirmButton: false,
              timer: 5000
            })
            window.location.href = "/attendanceSheet";
          } else {
            if (file1) {
              this.ProfileService.uploadFileCertificate(fd, total, this.certificatedocumentEntity.UserId)
                .then((data) => {
                  $("#new_upload_file").val(null);
                  $("#uploaddocumentModal").hide();
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                    showConfirmButton: false,
                    timer: 5000
                  })
                  window.location.href = "/attendanceSheet";
                },
                  (error) => {
                    this.globals.isLoading = false;
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
              window.location.href = "/attendanceSheet";
            }
          }
        },
          (error) => {
            this.globals.isLoading = false;
            //this.globals.pageNotfound(error.error.code);
          });
    }
  }
  //verifiy for mandatory document status change
  mandatoryDocumentsStatusChange(mandatoryDocuments, i) {
    debugger
    var IsVerify = 0;
    if (i)
      IsVerify = 1;
    this.globals.isLoading = true;
    mandatoryDocuments.IsVerifyByProctor = IsVerify;
    if (this.globals.authData.RoleId == 1) {
      this.DashboardService.VerifyDocument(mandatoryDocuments.UserDocumentCertificateMappingId, IsVerify)
        .then((data) => {
          this.globals.isLoading = false;
          if (IsVerify == 1) {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
          else {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.ProctorDashboardService.VerifyDocument(mandatoryDocuments.UserDocumentCertificateMappingId, IsVerify)
        .then((data) => {
          this.globals.isLoading = false;
          if (IsVerify == 1) {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
          else {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
        },
          (error) => {
            this.globals.isLoading = false;
            //this.globals.pageNotfound(error.error.code);
          });
    }
  }

  //verifiy for optional document status change
  optionalDocumentsStatusChange(optionalDocuments, i) {
    var IsVerify = 0;
    //if ($("#docoptionalactive" + i).is(':checked'))
    if (i)
      IsVerify = 1;
    this.globals.isLoading = true;
    if (this.globals.authData.RoleId == 1) {
      this.DashboardService.VerifyDocument(optionalDocuments.UserDocumentCertificateMappingId, IsVerify)
        .then((data) => {
          this.globals.isLoading = false;
          if (IsVerify == 1) {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
          else {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.ProctorDashboardService.VerifyDocument(optionalDocuments.UserDocumentCertificateMappingId, IsVerify)
        .then((data) => {
          this.globals.isLoading = false;
          if (IsVerify == 1) {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
          else {
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.title,
              text: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.text,
              showConfirmButton: false,
              timer: 5000
            })
          }
        },
          (error) => {
            this.globals.isLoading = false;
           // this.globals.pageNotfound(error.error.code);
          });
    }
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
        var documentmsg = 'decline successfully';
        var documenttitle = 'Decline';
      }
      else {
        this.documentVerificationEntity.DocumentVerificationStatus = 'verify';
        var documentmsg = 'accept successfully';
        var documenttitle = 'Accept';
      }

      if (this.documentVerificationEntity.DocumentVerificationComment == null || this.documentVerificationEntity.DocumentVerificationComment == '' || this.documentVerificationEntity.DocumentVerificationComment == undefined) {
        this.documentVerificationEntity.DocumentVerificationComment = 'NA';
      }
      else{
        this.documentVerificationEntity.DocumentVerificationComment = this.documentVerificationEntity.DocumentVerificationComment;
      }

      var count = 0 ;
      for(var j=0;j<this.mandatoryDocumentsList.length;j++)
      {
        if(this.mandatoryDocumentsList[j].IsVerifyByProctor == 1)
        {
          count++;
        }
      }
      if(count == this.mandatoryDocumentsList.length)
      {
        var title = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.alldocumentverifiedacceptproctormessage.title;
        var text = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.alldocumentverifiedacceptproctormessage.text;
      }
      else{
        var title = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.title;
        var text = this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentacceptproctormessage.text;
      }
      this.documentVerificationEntity.UpdatedBy = this.globals.authData.UserId;
      //this.documentVerificationEntity.UserName = this.certificateDetail.Name;
      this.documentVerificationEntity.LoginURL = '/login';
      console.log(this.documentVerificationEntity);
      if (this.globals.authData.RoleId == 1) {
        if(i==1)
        {
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
          .then((result) => {
            if (result.value) {
              this.globals.isLoading = true;
              this.DashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
              .then((data) => {
                this.globals.isLoading = false;
                $('#document_verify').modal('hide');
                swal({
                  type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                  title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                  text: this.documentVerificationEntity.CandidateName + "'s " + this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                  showConfirmButton: false,
                  timer: 5000
                })
                window.location.href = '/attendanceSheet';
              },
              (error) => {
                this.globals.isLoading = false;
                this.globals.pageNotfound(error.error.code);

              });
            }
          });
        }
        else
        {
          this.globals.isLoading = true;
          this.DashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
            .then((data) => {
              this.globals.isLoading = false;
              $('#document_verify').modal('hide');
              swal({
                type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                text: this.documentVerificationEntity.CandidateName + "'s " + this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                showConfirmButton: false,
                timer: 5000
              })
              window.location.href = '/attendanceSheet';
            },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);

            });
        }

      } else {
        if(i==1)
        {
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
          .then((result) => {
            if (result.value) {
              this.globals.isLoading = true;
              this.ProctorDashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
              .then((data) => {
                this.globals.isLoading = false;
                $('#document_verify').modal('hide');
                swal({
                  type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
                  title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
                  text: this.documentVerificationEntity.CandidateName + "'s " + this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
                  showConfirmButton: false,
                  timer: 5000
                })
                window.location.href = '/attendanceSheet';
              },
                (error) => {
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
            }
          });
        }
        else{
          this.globals.isLoading = true;
          this.ProctorDashboardService.updateDocumentVerificationStatus(this.documentVerificationEntity)
          .then((data) => {
            this.globals.isLoading = false;
            $('#document_verify').modal('hide');
            swal({
              type: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.type,
              title: this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.title + ' ' + documenttitle,
              text: this.documentVerificationEntity.CandidateName + "'s " + this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.documentVerified.text + ' ' + documentmsg,
              showConfirmButton: false,
              timer: 5000
            })
            window.location.href = '/attendanceSheet';
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
        }
      }


    }
  }

  SearchFilter(SearchFilterForm) {
    debugger
    if (this.filterEntity.AssignDate != '' && this.filterEntity.AssignDate != undefined) {
      var d = new Date(this.filterEntity.AssignDate);
      var ValidFromMonth = d.getMonth() + 1;
      var ValidFromDate = d.getDate();
      var ValidFromYear = d.getFullYear();
      this.filterEntity.AssignDate = ValidFromYear + '-' + (ValidFromMonth < 10 ? '0' + ValidFromMonth : '' + ValidFromMonth) + '-' + ((ValidFromDate < 10 ? '0' + ValidFromDate : '' + ValidFromDate));
    }

    //this.filterEntity.AssignDate = $("#AssignDate").val();
    if (this.globals.authData.RoleId != 1) {
      this.filterEntity.ProctorId = this.globals.authData.UserId;
    }
    this.filterEntity.RoleId = this.globals.authData.RoleId;
    console.log(this.filterEntity);
    this.globals.isLoading = true;
    this.attendanceSheetList = [];
    let todaysdate = this.globals.todaysdate;

    if (this.globals.authData.RoleId == 1) {
      this.DashboardService.filterAttendanceList(this.filterEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.attendanceSheetList = data;
          console.log(this.attendanceSheetList);
          this.filterEntity = {};
          SearchFilterForm.form.markAsPristine();

          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            var newDate1 = new Date(this.attendanceSheetList[i].AssignDate);
            var hour = this.attendanceSheetList[i].EndTime.substring(0, 2);
            var newDate = new Date(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(this.attendanceSheetList[i].EndTime.substring(0, 2), this.attendanceSheetList[i].EndTime.substring(3, 5));
            this.attendanceSheetList[i].addedDate = newDate;

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
        },
          (error) => {
            this.globals.isLoading = false;
            this.attendanceSheetList = [];
            this.globals.pageNotfound(error.error.code);

          });
    } else {
      this.ProctorDashboardService.filterAttendanceList(this.filterEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.attendanceSheetList = data;
          console.log(this.attendanceSheetList);
          this.filterEntity = {};
          SearchFilterForm.form.markAsPristine();
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            var newDate1 = new Date(this.attendanceSheetList[i].AssignDate);
            var hour = this.attendanceSheetList[i].EndTime.substring(0, 2);
            var newDate = new Date(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(this.attendanceSheetList[i].EndTime.substring(0, 2), this.attendanceSheetList[i].EndTime.substring(3, 5));
            this.attendanceSheetList[i].addedDate = newDate;

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
        },
          (error) => {
            this.globals.isLoading = false;
            this.attendanceSheetList = [];
            this.globals.pageNotfound(error.error.code);

          });
    }


  }

  // if(this.globals.authData.RoleId == 1) {}else{}


  clearData(SearchFilterForm) {
    this.attendanceSheetList = [];
    this.globals.isLoading = true;
    if (this.globals.authData.RoleId == 1) {
      this.DashboardService.getFullAttendanceSheet()
        //.map(res => res.json())
        .then((data) => {
          this.filterEntity = {};
          this.attendanceSheetList = data;
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            var newDate1 = new Date(this.attendanceSheetList[i].AssignDate);
            var hour = this.attendanceSheetList[i].EndTime.substring(0, 2);
            var newDate = new Date(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(this.attendanceSheetList[i].EndTime.substring(0, 2), this.attendanceSheetList[i].EndTime.substring(3, 5));
            this.attendanceSheetList[i].addedDate = newDate;

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
          // SearchFilterForm.form.markAsPristine();
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });

    } else {
      this.ProctorDashboardService.getFullAttendanceSheet(this.globals.authData.UserId)
        //.map(res => res.json())
        .then((data) => {
          this.filterEntity = {};
          this.attendanceSheetList = data;
          for (let i = 0; i < this.attendanceSheetList.length; i++) {
            var newDate1 = new Date(this.attendanceSheetList[i].AssignDate);
            var hour = this.attendanceSheetList[i].EndTime.substring(0, 2);
            var newDate = new Date(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate());
            newDate.setDate(newDate.getDate() + 1);
            newDate.setHours(this.attendanceSheetList[i].EndTime.substring(0, 2), this.attendanceSheetList[i].EndTime.substring(3, 5));
            this.attendanceSheetList[i].addedDate = newDate;

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
            this.globals.pageNotfound(error.error.code);
          });
    }

  }
  showFilterLocation(value) {
    this.showFilterLocationEntity = value;
  }
  showFilterDate() {//alert($("#AssignDate").val())
    this.filterEntity.AssignDate = $("#AssignDate").val();
  }
  showFilterShift(value) {
    //if(value == '12:00:00')
    this.showFilterShiftEntity = value;
  }
  showFilterCandidate(value) {
    this.showFilterCandidateEntity = [];
    for (var i = 0; i < this.candidateList.length; i++) {
      for (var j = 0; j < value.length; j++) {
        if (value[j] == this.candidateList[i].UserId)
          this.showFilterCandidateEntity.push(this.candidateList[i].Name)
      }

    }
  }

  removelocation(filter) {
    console.log(this.filterEntity.Location);
    this.filterEntity.Location.splice($.inArray(filter, this.filterEntity.Location), 1);
    //$('#Location').selectpicker('deselectAll');
    // $('#Location').selectpicker('val', this.filterEntity.Location );
    // $('#Location').selectpicker('refresh');
    $('#Location').find('[value=' + this.filterEntity.Location.find(filter).html() + ']').prop('selected', false);
  }
  removeshift(filter) {
    console.log(this.filterEntity.shiftFilters);
    this.filterEntity.shiftFilters.splice($.inArray(filter, this.filterEntity.shiftFilters), 1);
  }
  removecandidate(filter) {
    console.log(this.filterEntity.UserId);
    this.filterEntity.UserId.splice($.inArray(filter, this.filterEntity.UserId), 1);
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
