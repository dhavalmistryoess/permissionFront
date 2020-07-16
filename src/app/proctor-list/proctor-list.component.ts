import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProctorDashboardService } from '../services/proctor-dashboard.service';
declare var $, swal: any;

@Component({
  selector: 'app-proctor-list',
  templateUrl: './proctor-list.component.html',
  styleUrls: ['./proctor-list.component.css']
})
export class ProctorListComponent implements OnInit {

  addressList;
  candidateList;
  certificateList;
  proctorList;
  filterEntity;
  currentDate;
  p;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private ProctorDashboardService: ProctorDashboardService) { }

  ngOnInit() {

    this.addressList = [];
    this.candidateList = [];
    this.certificateList = [];
    this.proctorList = [];
    this.filterEntity = {};


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


    this.currentDate = curr_year + '-' + month + '-' + date;
    this.globals.isLoading = true;
    this.ProctorDashboardService.getDefaultListById(this.globals.authData.UserId)
      .then((data) => {
        debugger
        this.addressList = data['Addresses'];
        this.candidateList = data['Candidates'];
        this.certificateList = data['Certificates'];
        this.proctorList = data['ProctorList'];
        this.globals.isLoading = false;
        for (var i = 0; i < this.proctorList.length; i++) {

          let hour = (this.proctorList[i].StartTime.split(':'))[0]
          let min = (this.proctorList[i].StartTime.split(':'))[1]
          let part = hour > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour = hour > 12 ? hour - 12 : hour;
          hour = (hour + '').length == 1 ? `0${hour}` : hour;
          //console.log(hour+':'+min +' '+part);
          this.proctorList[i].StartTime = hour + ':' + min + part;

          let hour1 = (this.proctorList[i].EndTime.split(':'))[0]
          let min1 = (this.proctorList[i].EndTime.split(':'))[1]
          let part1 = hour1 > 12 ? 'pm' : 'am';
          min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          //console.log(hour1+':'+min1 +' '+part1);
          this.proctorList[i].EndTime = hour1 + ':' + min1 + part1;

        }
        // setTimeout(function () {
        //   $('select').selectpicker();
        //   $('input[name="AssignDate"]').daterangepicker({
        //     autoUpdateInput: false,

        //   });
        //   $('input[name="AssignDate"]').on('apply.daterangepicker', function (ev, picker) {
        //     $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
        //     $('input[name="legend1"]').prop('checked', false);
        //     $('input[name="legend2"]').prop('checked', false);
        //     $('input[name="legend3"]').prop('checked', false);
        //   });

        //   $('input[name="AssignDate"]').on('cancel.daterangepicker', function (ev, picker) {
        //     $(this).val('');
        //   });

        // }, 1000);
      },
        (error) => {
          this.globals.isLoading = false;
          // if (error.text) {
          //   swal({
          //     //position: 'top-end',
          //     type: 'error',
          //     title: 'Oops...',
          //     text: "Something went wrong!"
          //   })
          // }
          this.globals.pageNotfound(error.error.code);
        });

  }

  checkboxClear(){
    $('input[name="legend1"]').prop('checked', false);
    $('input[name="legend2"]').prop('checked', false);
    $('input[name="legend3"]').prop('checked', false);
  }
  
  SearchFilter() {
    debugger
    this.filterEntity.dateFilter = [];
    if ($('input[name="legend1"]').is(':checked')) {
      this.filterEntity.dateFilter.push(1);
      this.filterEntity.AssignDateFrom = '';
      this.filterEntity.AssignDateTo = '';
    }
    if ($('input[name="legend2"]').is(':checked')) {
      this.filterEntity.dateFilter.push(2);
      this.filterEntity.AssignDateFrom = '';
      this.filterEntity.AssignDateTo = '';
    }
    if ($('input[name="legend3"]').is(':checked')) {
      this.filterEntity.dateFilter.push(3);
      this.filterEntity.AssignDateFrom = '';
      this.filterEntity.AssignDateTo = '';
    }

    if(this.filterEntity.AssignDateFrom != '' && this.filterEntity.AssignDateFrom != undefined){
      var d = new Date(this.filterEntity.AssignDateFrom);
      var OrderFromMonth = d.getMonth() + 1;
      var OrderFromDate = d.getDate();
      var OrderFromYear = d.getFullYear();
      this.filterEntity.AssignDateFrom = OrderFromYear  + '/' + (OrderFromMonth < 10 ? '0'+OrderFromMonth: ''+OrderFromMonth) + '/' + ((OrderFromDate < 10 ? '0'+OrderFromDate: ''+OrderFromDate));
    }
    
    if(this.filterEntity.AssignDateTo != '' && this.filterEntity.AssignDateTo != undefined){
    var d1 = new Date(this.filterEntity.AssignDateTo);
    var OrderToMonth = d1.getMonth() + 1;
    var OrderToDate = d1.getDate();
    var OrderToYear = d1.getFullYear();
    this.filterEntity.AssignDateTo = OrderToYear  + '/' + (OrderToMonth < 10 ? '0'+OrderToMonth: ''+OrderToMonth) + '/' + ((OrderToDate < 10 ? '0'+OrderToDate: ''+OrderToDate));
    }
    // var assigndate = $("#AssignDate").val();
    // var assigndatesplit = assigndate.split(" ");
    // if (assigndatesplit[0] == "") {
    //   this.filterEntity.AssignDateFrom = "";
    //   this.filterEntity.AssignDateTo = "";
    // } else {
    //   this.filterEntity.AssignDateFrom = assigndatesplit[0];
    //   this.filterEntity.AssignDateTo = assigndatesplit[2];
    // }
    this.filterEntity.ProctorId = this.globals.authData.UserId;
    if (this.filterEntity.UserId != null) {
      this.filterEntity.UserId = this.filterEntity.UserId;
    } else {

      this.filterEntity.UserId = [];
    }
    if (this.filterEntity.CertificateId != null) {
      this.filterEntity.CertificateId = this.filterEntity.CertificateId;
    } else {
      this.filterEntity.CertificateId = [];
    }

    if (this.filterEntity.Location != null) {
      this.filterEntity.Location = this.filterEntity.Location;
    } else {
      this.filterEntity.Location = [];
    }

    if (this.filterEntity.EmailAddress != null) {
      this.filterEntity.EmailAddress = this.filterEntity.EmailAddress;
    } else {
      this.filterEntity.EmailAddress = "";
    }
    console.log(this.filterEntity);
    this.globals.isLoading = true;
    //this.proctorList = [];

    this.ProctorDashboardService.filterProctorList(this.filterEntity)
      .then((data) => {
        this.globals.isLoading = false;
        this.proctorList = data;
        for (var i = 0; i < this.proctorList.length; i++) {
          let hour = (this.proctorList[i].StartTime.split(':'))[0]
          let min = (this.proctorList[i].StartTime.split(':'))[1]
          let part = hour > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour = hour > 12 ? hour - 12 : hour;
          hour = (hour + '').length == 1 ? `0${hour}` : hour;
          //console.log(hour+':'+min +' '+part);
          this.proctorList[i].StartTime = hour + ':' + min + part;

          let hour1 = (this.proctorList[i].EndTime.split(':'))[0]
          let min1 = (this.proctorList[i].EndTime.split(':'))[1]
          let part1 = hour1 > 12 ? 'pm' : 'am';
          min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          //console.log(hour1+':'+min1 +' '+part1);
          this.proctorList[i].EndTime = hour1 + ':' + min1 + part1;

        }
        console.log(this.proctorList);
      },
        (error) => {
          this.globals.isLoading = false;
          this.proctorList = [];
          this.globals.pageNotfound(error.error.code);
        });
  }

  clearData1(value) {
    this.proctorList = [];
    if (value == 1) {
      // $("#AssignDate").val('');
      this.filterEntity.AssignDateFrom = "";
      this.filterEntity.AssignDateTo = "";
      this.filterEntity.CertificateId = [];
      this.filterEntity.Location = [];
      setTimeout(function () {
        $('select').selectpicker();
        $('#CertificateId').selectpicker("refresh");
        $('#Location').selectpicker("refresh");
      }, 200);
    }
    if (value == 2) {
      this.filterEntity.EmailAddress = "";
      this.filterEntity.UserId = [];
      setTimeout(function () {
        $('select').selectpicker();
        $('#UserId').selectpicker("refresh");
      }, 200);
    }
    this.globals.isLoading = true;
    this.ProctorDashboardService.filterProctorList(this.filterEntity)
      .then((data) => {
        this.globals.isLoading = false;
        this.proctorList = data;
        for (var i = 0; i < this.proctorList.length; i++) {
          let hour = (this.proctorList[i].StartTime.split(':'))[0]
          let min = (this.proctorList[i].StartTime.split(':'))[1]
          let part = hour > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour = hour > 12 ? hour - 12 : hour;
          hour = (hour + '').length == 1 ? `0${hour}` : hour;
          //console.log(hour+':'+min +' '+part);
          this.proctorList[i].StartTime = hour + ':' + min + part;

          let hour1 = (this.proctorList[i].EndTime.split(':'))[0]
          let min1 = (this.proctorList[i].EndTime.split(':'))[1]
          let part1 = hour1 > 12 ? 'pm' : 'am';
          min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          //console.log(hour1+':'+min1 +' '+part1);
          this.proctorList[i].EndTime = hour1 + ':' + min1 + part1;

        }
        console.log(this.proctorList);
      },
        (error) => {
          this.globals.isLoading = false;
          this.proctorList = [];
          this.globals.pageNotfound(error.error.code);
        });
  }

  clearData2() {
    this.proctorList = [];
    this.globals.isLoading = true;
    this.ProctorDashboardService.getDefaultListById(this.globals.authData.UserId)
      //.map(res => res.json())
      .then((data) => {
        this.filterEntity.EmailAddress = "";
        this.filterEntity.UserId = [];
        this.proctorList = data['ProctorList'];
        setTimeout(function () {
          $('select').selectpicker();
          $('#UserId').selectpicker("refresh");
        }, 200);
        for (var i = 0; i < this.proctorList.length; i++) {
          let hour = (this.proctorList[i].StartTime.split(':'))[0]
          let min = (this.proctorList[i].StartTime.split(':'))[1]
          let part = hour > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour = hour > 12 ? hour - 12 : hour;
          hour = (hour + '').length == 1 ? `0${hour}` : hour;
          //console.log(hour+':'+min +' '+part);
          this.proctorList[i].StartTime = hour + ':' + min + part;

          let hour1 = (this.proctorList[i].EndTime.split(':'))[0]
          let min1 = (this.proctorList[i].EndTime.split(':'))[1]
          let part1 = hour1 > 12 ? 'pm' : 'am';
          min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          //console.log(hour1+':'+min1 +' '+part1);
          this.proctorList[i].EndTime = hour1 + ':' + min1 + part1;

        }

        this.globals.isLoading = false;
        // SearchFilterForm.form.markAsPristine();
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
}
