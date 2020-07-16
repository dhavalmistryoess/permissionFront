import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssessmentdetailService } from '../services/assessmentdetail.service';
declare var $, swal: any;

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private AssessmentdetailService: AssessmentdetailService) { }
  assessmentList;
  withoutProctorAssessmentList;
  declinedEntity;
  cancelAssessmentEntity;
  cancelViewAssessmentEntity;
  upcomingDetailEntity;
  startTime;
  endTime;
  proctorList;
  submitted;
  changeProctorEntity;
  submitted1;
  proctorDetailEntity;
  certificateList;
  FilterEntity;
  CheckEntity;
  CheckEntity2;
  CandidatenameList;
  currentDate;
  newDate;
  p;
  p1;
  errorEntity;
  ngOnInit() {
    debugger
    this.globals.isLoading = true;
    this.errorEntity = {};
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
    if(hasProctor == "1")
    {
      $("#proctor-block-tab").addClass("active");
      $("#nonproctor-block-tab").removeClass("active");

      $("#proctor-block").addClass("show active")
      $("#nonproctor-block").removeClass("show active")
    }
    if(hasProctor == "0")
    {
      $("#nonproctor-block-tab").addClass("active");
      $("#proctor-block-tab").removeClass("active");

      $("#nonproctor-block").addClass("show active")
      $("#proctor-block").removeClass("show active")
    }
    this.AssessmentdetailService.getAllAssessments()
      .then((data) => {
        console.log(data);
        this.globals.isLoading = false;
        this.assessmentList = data['Assessments'];
        this.withoutProctorAssessmentList = data['withoutProctorAssessments'];
        this.certificateList = data['defalut']['Certificates'];
        this.CandidatenameList = data['defalut']['Candidatename'];
        this.currentDate = new Date();
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
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
  }

  assignAssessment(id) {
    this.router.navigate(['/admin/assignAssessment/' + window.btoa(id)]);
  }

  assessmentDetails(id,HasProctor) {debugger
    this.router.navigate(['/admin/assessmentDetails/' + window.btoa(id) + '/' + window.btoa(HasProctor)]);
  }

  viewDeclinedDetail(i) {debugger
    this.declinedEntity = i;//this.assessmentList[i];
  }
  viewCancelAssessmentDetail(i) {
    this.cancelViewAssessmentEntity = i;//this.assessmentList[i];
    console.log(this.cancelViewAssessmentEntity.StartTime);
    let hour = (this.cancelViewAssessmentEntity.StartTime.split(':'))[0]
    let min = (this.cancelViewAssessmentEntity.StartTime.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    console.log(hour + ':' + min + ' ' + part);
    this.cancelViewAssessmentEntity.startTime = hour + ':' + min + part;

    let hour1 = (this.cancelViewAssessmentEntity.EndTime.split(':'))[0]
    let min1 = (this.cancelViewAssessmentEntity.EndTime.split(':'))[1]
    let part1 = hour1 > 12 ? 'pm' : 'am';
    min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
    hour1 = hour1 > 12 ? hour1 - 12 : hour1;
    hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
    console.log(hour1 + ':' + min1 + ' ' + part1);
    this.cancelViewAssessmentEntity.endTime = hour1 + ':' + min1 + part1;
  }
  viewUpcomingDetail(i) {
    this.upcomingDetailEntity = i;// this.assessmentList[i];
    console.log(this.upcomingDetailEntity);
    var date = new Date(this.upcomingDetailEntity.AssignDate);
    date.setDate(date.getDate() - 2);
    this.newDate = date;
    console.log(this.newDate);
    let hour = (this.upcomingDetailEntity.StartTime.split(':'))[0]
    let min = (this.upcomingDetailEntity.StartTime.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    console.log(hour + ':' + min + ' ' + part);
    this.upcomingDetailEntity.startTime = hour + ':' + min + part;

    let hour1 = (this.upcomingDetailEntity.EndTime.split(':'))[0]
    let min1 = (this.upcomingDetailEntity.EndTime.split(':'))[1]
    let part1 = hour1 > 12 ? 'pm' : 'am';
    min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
    hour1 = hour1 > 12 ? hour1 - 12 : hour1;
    hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
    console.log(hour1 + ':' + min1 + ' ' + part1);
    this.upcomingDetailEntity.endTime = hour1 + ':' + min1 + part1;
    this.cancelAssessmentEntity.CancelComment = '';
    this.submitted = false;
    this.submitted1 = false;

    $("#cancelComment").hide();
    $("#selectProctor").hide();
    //$("#selectedProctorDetails").hide();
  }

  cancelAssessment(cancelAssessmentForm) {
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
        .then((data) => {
          this.globals.isLoading = false;
          this.submitted = false;
          this.cancelAssessmentEntity = {};
          swal({
            type: this.globals.adminTranslationText.assessment.list.cancelAssessment.alerts.type,
            title: this.globals.adminTranslationText.assessment.list.cancelAssessment.alerts.title,
            text: this.globals.adminTranslationText.assessment.list.cancelAssessment.alerts.text,
            showConfirmButton: false,
            timer: 5000
          })
          $("#upcoming_popup").modal('hide');
          window.location.href = '/admin/assessment-list/';
        },
          (error) => {
            debugger;
            this.submitted = false;
            this.globals.isLoading = false;
            if(error.error.code == 422)
            {
              this.errorEntity.CancelComment = (error.error.message.CancelComment != "") ? error.error.message.CancelComment : '';
            }
            else
            {
              this.globals.pageNotfound(error.error.code);
            }
          });
    }
  }
  cancelAssessmentShow() {
    $("#cancelComment").show();
    $("#selectProctor").hide();
    this.proctorDetailEntity = {};
    this.submitted1 = false;
  }
  changeProctorShow(CandidateId) {
    $("#selectProctor").show();
    $("#cancelComment").hide();
    $("#selectedProctorDetails").hide();
    this.cancelAssessmentEntity = {};
    this.submitted = false;
    this.changeProctorEntity.UserId = '';
    this.AssessmentdetailService.getAllDefault(CandidateId)
      .then((data) => {
        debugger

        this.globals.isLoading = false;
        // this.proctorList = data['Proctors'];
        this.proctorList = [];
        var proctorSelect = {
          UserId: '',
          FirstName: this.globals.adminTranslationText.assessment.list.proctorChange.selectProctor,
          Value: ""
        }
        this.proctorList.push(proctorSelect);
        this.proctorList = [...this.proctorList, ...data['Proctors']];
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  showProctorDetail(UserId) {
    $("#selectedProctorDetails").show();
    if (UserId != '') {
      this.AssessmentdetailService.getProctorDetails(UserId)
        .then((data) => {
          debugger
          this.globals.isLoading = false;
          this.proctorDetailEntity = data[0];
          this.changeProctorEntity.ProctorName = this.proctorDetailEntity.Name;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      $("#selectedProctorDetails").hide();
      this.proctorDetailEntity = {};
    }

  }

  chanageProcotr(chanageProcotrForm) {
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
        .then((data) => {
          this.globals.isLoading = false;
          this.submitted = false;
          this.changeProctorEntity = {};
          swal({
            type: this.globals.adminTranslationText.assessment.list.proctorChange.alerts.type,
            title: this.globals.adminTranslationText.assessment.list.proctorChange.alerts.title,
            text: this.globals.adminTranslationText.assessment.list.proctorChange.alerts.text,
            showConfirmButton: false,
            timer: 5000
          })
          this.changeProctorEntity.UserId = '';
          $("#upcoming_popup").modal('hide');
          window.location.href = '/admin/assessment-list/';
        },
          (error) => {
            this.submitted = false;
            this.globals.isLoading = false;
            if(error.error.code == 422)
            {
              this.errorEntity.ProctorName = (error.error.message.ProctorName != "") ? error.error.message.ProctorName : '';
            }
            else
            {
              this.globals.pageNotfound(error.error.code);
            }
          });
    }
  }
  SearchFilter(SearchFilterForm) {
    debugger
    this.globals.isLoading = true;
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
    if(this.FilterEntity.OrderDateFrom != undefined && this.FilterEntity.OrderDateTo == undefined){
      this.FilterEntity.OrderDateTo = this.FilterEntity.OrderDateFrom;
    }
    if(this.FilterEntity.OrderDateFrom == undefined && this.FilterEntity.OrderDateTo != undefined){
      this.FilterEntity.OrderDateFrom = this.FilterEntity.OrderDateTo;
    }
  
    this.AssessmentdetailService.searchCertificate(this.FilterEntity)
      //.map(res => res.json())
      .then((data) => {
        this.assessmentList = data['Assessments'];
        this.withoutProctorAssessmentList = data['withoutProctorAssessments'];
        console.log(this.assessmentList);
        this.globals.isLoading = false;
        this.FilterEntity = {};
        SearchFilterForm.form.markAsPristine();
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  All() {
    debugger
    this.globals.isLoading = true;
    if ($('input[name="legend1"]').is(':checked')) {
      this.CheckEntity.NoProctorAssign = true;
      // this.NoProctorAssign = true;
    } else {
      this.CheckEntity.NoProctorAssign = false;
      //this.NoProctorAssign = false;
    }
    if ($('input[name="legend2"]').is(':checked')) {
      this.CheckEntity.Upcoming = true;
      //  this.UnAnswred = true;
    } else {
      this.CheckEntity.Upcoming = false;
      // this.UnAnswred = false;
    }
    if ($('input[name="legend3"]').is(':checked')) {
      this.CheckEntity.Completed = true;
      //this.Reviewed = true;
    } else {
      this.CheckEntity.Completed = false;
      // this.Reviewed = false;
    }
    if ($('input[name="legend4"]').is(':checked')) {
      this.CheckEntity.Cancelled = true;
      //this.Reviewed = true;
    } else {
      this.CheckEntity.Cancelled = false;
      // this.Reviewed = false;
    }
    if ($('input[name="legend7"]').is(':checked')) {
      this.CheckEntity.todays = true;
      //this.Reviewed = true;
    } else {
      this.CheckEntity.todays = false;
      // this.Reviewed = false;
    }
    this.CheckEntity;
    if (this.CheckEntity.Cancelled == true || this.CheckEntity.Completed == true || this.CheckEntity.Upcoming == true || this.CheckEntity.NoProctorAssign == true || this.CheckEntity.todays == true) {
      this.AssessmentdetailService.CheckSearchAssessment(this.CheckEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.assessmentList = data;
          setTimeout(function () {
            $('select').selectpicker();
          }, 200);
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);

          });
    } else {
      this.assessmentList = [];
      this.globals.isLoading = false;
    }

  }
  All2() {
    debugger
    this.globals.isLoading = true;
    if ($('input[name="legend5"]').is(':checked')) {
      this.CheckEntity2.Upcoming = true;
      //  this.UnAnswred = true;
    } else {
      this.CheckEntity2.Upcoming = false;
      // this.UnAnswred = false;
    }
    if ($('input[name="legend6"]').is(':checked')) {
      this.CheckEntity2.Completed = true;
      //this.Reviewed = true;
    } else {
      this.CheckEntity2.Completed = false;
      // this.Reviewed = false;
    }
    this.CheckEntity2;
    if (this.CheckEntity2.Completed == true || this.CheckEntity2.Upcoming == true) {
      this.AssessmentdetailService.CheckSearchAssessment2(this.CheckEntity2)
        .then((data) => {
          this.globals.isLoading = false;
          console.log(data);
          this.withoutProctorAssessmentList = data;
          setTimeout(function () {
            $('select').selectpicker();
          }, 200);
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.withoutProctorAssessmentList = [];
      this.globals.isLoading = false;
    }

  }
  clearData(SearchFilterForm) {
    this.globals.isLoading = true;
    this.AssessmentdetailService.getAllAssessments()
      //.map(res => res.json())
      .then((data) => {
        this.FilterEntity = {};
        this.FilterEntity.CertificateId = '';

        this.assessmentList = data['Assessments'];
        this.withoutProctorAssessmentList = data['withoutProctorAssessments'];
        setTimeout(function () {
          $('select').selectpicker();
          $("#OrderDateFrom").val('');
          $('select').selectpicker("refresh");
        }, 200);

        this.globals.isLoading = false;
        SearchFilterForm.form.markAsPristine();

      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });


  }
}
