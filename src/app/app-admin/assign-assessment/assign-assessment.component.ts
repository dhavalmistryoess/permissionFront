import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssisgnAssessmentService } from '../services/assisgn-assessment.service';
//import { EHOSTUNREACH } from 'constants';
import { jitExpression } from '@angular/compiler';
declare var $, swal: any;


@Component({
  selector: 'app-assign-assessment',
  templateUrl: './assign-assessment.component.html',
  styleUrls: ['./assign-assessment.component.css']
})
export class AssignAssessmentComponent implements OnInit {

  countryList;
  proctorList;
  btn_disable;
  scheduleAssessmentEntity;
  addressList;
  assignAssessmentEntity1;
  submitted1;
  submitted2;
  submitted3;
  submitted4;
  AssignDateValid;
  scheduleWithValid;
  proctorEntity;
  preferedTime;
  addressEntity;
  suggestedselectedProctorCheck;
  suggestedselectedProctorValid;
  stateList;
  startTimeCheck;
  endTimeCheck;
  startTimeValid;
  commentDisplay;
  todaysDate;
  time;
  time2;
  defaultItem;
  fullAddressList;
  errorEntity;
  p;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private AssisgnAssessmentService: AssisgnAssessmentService) { }

  ngOnInit() {
    $("body")
    .not($("#inputpicker-wrapped-list"))
    .click(function() {
      $("#inputpicker-wrapped-list").css("display", "none");
    });
    this.globals.isLoading = true;
    this.scheduleAssessmentEntity = {};
    this.errorEntity = {};
    this.proctorList = [];
    this.countryList = [];
    this.addressList = [];
    this.assignAssessmentEntity1 = {};
    this.proctorEntity = {};
    this.preferedTime = [];
    this.AssignDateValid = false;
    this.scheduleWithValid = false;
    this.addressEntity = '';
    this.suggestedselectedProctorCheck = false;
    this.suggestedselectedProctorValid = false;
    this.startTimeCheck = false;
    this.endTimeCheck = false;
    this.startTimeValid = false;
    this.commentDisplay = false;
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
    this.todaysDate = curr_year + '-' +  month + '-' + date;
    var address = [];
    var scheduleHistoryId = this.route.snapshot.paramMap.get('scheduleHistoryId');
    if (scheduleHistoryId) {
      scheduleHistoryId = window.atob(scheduleHistoryId);
      this.AssisgnAssessmentService.getAllDefault(scheduleHistoryId)
        .then((data) => {
          this.scheduleAssessmentEntity = data['ScheduleAssessmentDetail'][0];
          console.log(this.scheduleAssessmentEntity);
          this.scheduleAssessmentEntity.candidateCity = this.scheduleAssessmentEntity.City;
          var proctorSelect = {
            UserId: '',
            Name: this.globals.adminTranslationText.assignAssessment.form.searchNewProctor.selectProctor,
            Value: ""
          }
          this.proctorList.push(proctorSelect);
          this.proctorList = [...this.proctorList, ...data['Proctors']];

          this.addressList = data['Cities']; // only cities
          this.fullAddressList = data['Addresses'];
          this.assignAssessmentEntity1.CityCandidate = this.scheduleAssessmentEntity.candidateCity;
          var countrySelect = {
            CountryId: '',
            CountryName: this.globals.adminTranslationText.assignAssessment.form.addressTab.country.select,
            Value: ""
          }
          this.countryList.push(countrySelect);
          this.countryList = [...this.countryList, ...data['Countries']];

          this.stateList = [];
          if (this.scheduleAssessmentEntity.AvailablePriorityDate1 <= this.todaysDate) {
            $("#dates1").attr('disabled', 'disabled');
            $("#radio1").addClass('radio_disabled');
          }
          if (this.scheduleAssessmentEntity.AvailablePriorityDate2 <= this.todaysDate) {
            $("#dates2").attr('disabled', 'disabled');
            $("#radio2").addClass('radio_disabled');
          }
          if (this.scheduleAssessmentEntity.AvailablePriorityDate3 <= this.todaysDate) {
            $("#dates3").attr('disabled', 'disabled');
            $("#radio3").addClass('radio_disabled');
          }
          if (this.addressList.length <= 0)
            this.assignAssessmentEntity1.CityCandidate = this.scheduleAssessmentEntity.candidateCity;
          else {
            for (var i = 0; i < this.addressList.length; i++) {
              if (this.addressList[i].City == this.scheduleAssessmentEntity.candidateCity) {
                this.assignAssessmentEntity1.CityCandidate = this.scheduleAssessmentEntity.candidateCity;
              }
              else
                this.assignAssessmentEntity1.CityCandidate = '';
            }
            setTimeout(() => {
              $("#CityCandidate").selectpicker('refresh');
            }, 500);
          }
          for (var i = 0; i < this.fullAddressList.length; i++) {
            address.push({
              value: i + 1, text: this.fullAddressList[i].AddressName, address: this.fullAddressList[i].Address1 + " " + this.fullAddressList[i].Address2,
              city: this.fullAddressList[i].City, state: this.fullAddressList[i].StateName, country: this.fullAddressList[i].CountryName, zipcode: this.fullAddressList[i].ZipCode
            });
          }

          this.globals.isLoading = false;
          setTimeout(() => {
            $('select').selectpicker();
            $('#address_new').inputpicker({
              data: address,
              fields: [
                { name: 'value', text: 'Id' },
                { name: 'text', text: 'Name' },
                { name: 'address', text: 'Address Line 1' },
                { name: 'city', text: 'City' },
                { name: 'state', text: 'State' },
                { name: 'country', text: 'Country' },
                { name: 'zipcode', text: 'Zipcode' }
              ],
              headShow: true,
              fieldText: 'text',
              autoOpen: true,
              fieldValue: 'value',
              filterOpen: true,
              pagination: false,
              responsive: true,
            });
          }, 1000);
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }


    $("#proctor-tab").addClass('disabled');
    $("#address-tab").addClass('disabled');
    $("#comment-tab").addClass('disabled');
    var AddressName = '';
    $('#address_new').on('change', (e) => {debugger
      var i = e.target.value - 1;
      $("#Address1").attr('disabled',true);
      $("#Address2").attr('disabled',true);
      $("#CountryId").attr('disabled',true);
      $("#StateId").attr('disabled',true);
      $("#City").attr('disabled',true);
      $("#ZipCode").attr('disabled',true);
      $("#AddressName").attr('disabled',true);
      this.assignAssessmentEntity1.AddressId = this.fullAddressList[i].AddressId;
      this.assignAssessmentEntity1.AddressName = this.fullAddressList[i].AddressName;
      this.assignAssessmentEntity1.Address1 = this.fullAddressList[i].Address1;
      this.assignAssessmentEntity1.Address2 = this.fullAddressList[i].Address2;
      this.assignAssessmentEntity1.CountryId = this.fullAddressList[i].CountryId;
      this.assignAssessmentEntity1.CountryName = this.fullAddressList[i].CountryName;
      this.assignAssessmentEntity1.StateName = this.fullAddressList[i].StateName;
      this.assignAssessmentEntity1.City = this.fullAddressList[i].City;
      this.assignAssessmentEntity1.ZipCode = this.fullAddressList[i].ZipCode;
      this.AssisgnAssessmentService.getStateByCountryId(this.assignAssessmentEntity1.CountryId)
        .then((data) => {
          this.stateList = data;
          this.assignAssessmentEntity1.StateId = this.fullAddressList[i].StateId;
          setTimeout(function () {
            $('#StateId').selectpicker('refresh');
          }, 200);
        },
          (error) => {
            this.globals.pageNotfound(error.error.code);
          });
      setTimeout(() => {
        $('#CountryId').selectpicker('refresh');
      }, 200);

    });
    setTimeout(function () {
      $('.form_time').datetimepicker({
        weekStart: 1,
        todayBtn: 0,
        autoclose: 1,
        startView: 1,
        maxView: 1,
        forceParse: 1,
        format: 'HH:ii p',
        pickerPosition: 'top-left',
        pickDate: false,
        showMeridian: true,
      }).on('hide', function (ev) {
        $(".datetimepicker .prev").attr("style", "visibility:visible");
        $(".datetimepicker .next").attr("style", "visibility:visible");
        $(".switch").attr("style", "pointer-events: auto");
      });
      $(".form_time").click(function () {
        $(".datetimepicker .prev").attr("style", "visibility:hidden");
        $(".datetimepicker .next").attr("style", "visibility:hidden");
        $(".switch").attr("style", "pointer-events: none");
      });
    }, 1000);
  }
  assignAssessmentSubmit1(assignAssessmentForm1) {
    this.submitted1 = true;
    console.log(assignAssessmentForm1);
    this.assignAssessmentEntity1.CandidateId = this.scheduleAssessmentEntity.CandidateId;
    if (this.assignAssessmentEntity1.AssignDate == '' || this.assignAssessmentEntity1.AssignDate == undefined)
      this.AssignDateValid = true;
    else
      this.AssignDateValid = false;

    this.assignAssessmentEntity1.TimeRange = [];
    this.preferedTime = [];
    if ($("#TimeRange1").is(":checked") == true) {
      this.assignAssessmentEntity1.TimeRange.push($("#TimeRange1").val());
      this.preferedTime.push(this.globals.adminTranslationText.assignAssessment.form.morning);
    }
    if ($("#TimeRange2").is(":checked") == true) {
      this.assignAssessmentEntity1.TimeRange.push($("#TimeRange2").val());
      this.preferedTime.push(this.globals.adminTranslationText.assignAssessment.form.afternoon);
    }
    if ($("#TimeRange3").is(":checked") == true) {
      this.assignAssessmentEntity1.TimeRange.push($("#TimeRange3").val());
      this.preferedTime.push(this.globals.adminTranslationText.assignAssessment.form.evening);
    }

    if (this.assignAssessmentEntity1.ScheduleWith == '' || this.assignAssessmentEntity1.ScheduleWith == undefined)
      this.scheduleWithValid = true;
    else
      this.scheduleWithValid = false;

    if (assignAssessmentForm1.valid && !this.AssignDateValid && !this.scheduleWithValid) {
      this.submitted1 = false;
      this.globals.isLoading = true;
      this.suggestedselectedProctorCheck = false;

      if (this.assignAssessmentEntity1.ScheduleWith == 0)//suggested proctor call
      {
        this.assignAssessmentEntity1.City = this.assignAssessmentEntity1.CityCandidate;
        this.AssisgnAssessmentService.SuggestedProctors(this.assignAssessmentEntity1)
          .then((data) => {

            $("#suggested_proctor_block").show();
            $("#seacrh_proctor_main_block").hide();
            $("#selectedProctorDetails").hide();
            this.proctorEntity = data;
            if(this.proctorEntity.length==0){
              this.globals.isLoading = false;
              swal({
                //position: 'top-end',
                type: this.globals.adminTranslationText.assignAssessment.form.alerts.suggestedProctorNotFound.type,
                title: this.globals.adminTranslationText.assignAssessment.form.alerts.suggestedProctorNotFound.title,
                text: this.globals.adminTranslationText.assignAssessment.form.alerts.suggestedProctorNotFound.text,
                showConfirmButton: false,
                timer: 4000
              })
            }
            else{
            for (var i = 0; i < this.proctorEntity.length; i++) {
              for (var j = 0; j < this.proctorEntity[i].Addresses.length; j++) {
                let hour = (this.proctorEntity[i].Addresses[j].min_start.split(':'))[0]
                let min = (this.proctorEntity[i].Addresses[j].min_start.split(':'))[1]
                let part = hour > 12 ? 'pm' : 'am';
                min = (min + '').length == 1 ? `0${min}` : min;
                hour = hour > 12 ? hour - 12 : hour;
                hour = (hour + '').length == 1 ? `0${hour}` : hour;
                //console.log(hour+':'+min +' '+part);
                this.proctorEntity[i].Addresses[j].min_start = hour + ':' + min + part;

                let hour1 = (this.proctorEntity[i].Addresses[j].max_end.split(':'))[0]
                let min1 = (this.proctorEntity[i].Addresses[j].max_end.split(':'))[1]
                let part1 = hour1 > 12 ? 'pm' : 'am';
                min1 = (min1 + '').length == 1 ? `0${min1}` : min1;
                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
                //console.log(hour1+':'+min1 +' '+part1);
                this.proctorEntity[i].Addresses[j].max_end = hour1 + ':' + min1 + part1;
              }
            }
            $("#date-tab").removeClass('active');
            $("#date-tab").addClass('complete');
            $("#proctor-tab").removeClass('disabled');
            $("#proctor-tab").removeClass('complete');
            $("#address-tab").removeClass('complete');
            $("#proctor-tab").addClass('active');
            $("#address-tab").addClass('disabled');
            $("#comment-tab").addClass('disabled');
            $("#date").removeClass('show active');
            $("#proctor").addClass('show active');

            this.assignAssessmentEntity1.ProctorId = '';
            this.assignAssessmentEntity1.AddressId = '';
            this.assignAssessmentEntity1.AddressName = '';
            this.assignAssessmentEntity1.Address1 = '';
            this.assignAssessmentEntity1.Address2 = '';
            this.assignAssessmentEntity1.City = '';
            this.assignAssessmentEntity1.StateId = '';
            this.assignAssessmentEntity1.CountryId = '';
            this.assignAssessmentEntity1.ZipCode = '';
            //console.log(data);
            this.globals.isLoading = false;

            $('.address').hide();
        }
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
      }
      else //new proctor call
      {
        this.globals.isLoading = false;
        $("#suggested_proctor_block").hide();
        $("#seacrh_proctor_main_block").show();
        $("#selectedProctorDetails").hide();

        $("#date-tab").removeClass('active');
        $("#date-tab").addClass('complete');
        $("#proctor-tab").removeClass('disabled');
        $("#proctor-tab").removeClass('complete');
        $("#address-tab").removeClass('complete');
        $("#proctor-tab").addClass('active');
        $("#address-tab").addClass('disabled');
        $("#comment-tab").addClass('disabled');
        $("#date").removeClass('show active');
        $("#proctor").addClass('show active');

        this.assignAssessmentEntity1.ProctorId = '';
        this.assignAssessmentEntity1.AddressId = '';
        this.assignAssessmentEntity1.AddressName = '';
        this.assignAssessmentEntity1.Address1 = '';
        this.assignAssessmentEntity1.Address2 = '';
        this.assignAssessmentEntity1.City = '';
        this.assignAssessmentEntity1.StateId = '';
        this.assignAssessmentEntity1.CountryId = '';
        this.assignAssessmentEntity1.ZipCode = '';
        this.assignAssessmentEntity1.StateName = '';
        this.assignAssessmentEntity1.CountryName = '';
        setTimeout(() => {
          $("#ProctorId").selectpicker('refresh');

        }, 100);
        this.submitted2 = false;
      }
    }
  }
  addressChange(i, j) {
    //alert(i+" "+j);
    if ($('#address' + i + j).is(':checked')) {

      if (j == 0) {
        $('.address_' + i + '1').hide();
        $('.address_' + i + '0').show();

      } else {
        $('.address_' + i + '0').hide();
        $('.address_' + i + '1').show();
      }
      if ($("#selectedSuggestedProctor" + i).val() == 1) {
        $("#suggestedProctors" + i).removeClass("selected_proctor");
        $("#selectedSuggestedProctor" + i).text("Select");
        $("#address-tab").addClass('disabled');
        this.suggestedselectedProctorCheck = false;
        this.suggestedselectedProctorValid = true;
        $("#selectedSuggestedProctor" + i).val(0);
      }
    }
  }
  suggestedProctorSelect(i) {
    for (var j = 0; j < this.proctorEntity.length; j++) {
      if (j == i) {
        $("#suggestedProctors" + i).addClass("selected_proctor");
        $("#selectedSuggestedProctor" + i).text("Selected");
        if ($('#address' + i + '0').is(':checked')) {
          this.assignAssessmentEntity1.AddressId = this.proctorEntity[i].Addresses[0].AddressId;
          this.assignAssessmentEntity1.AddressName = this.proctorEntity[i].Addresses[0].AddressName;
          this.assignAssessmentEntity1.Address1 = this.proctorEntity[i].Addresses[0].Address1;
          this.assignAssessmentEntity1.Address2 = this.proctorEntity[i].Addresses[0].Address2;
          this.assignAssessmentEntity1.City = this.proctorEntity[i].Addresses[0].City;
          this.assignAssessmentEntity1.StateId = this.proctorEntity[i].Addresses[0].StateId;
          this.assignAssessmentEntity1.CountryId = this.proctorEntity[i].Addresses[0].CountryId;
          this.assignAssessmentEntity1.ZipCode = this.proctorEntity[i].Addresses[0].ZipCode;
          this.assignAssessmentEntity1.StateName = this.proctorEntity[i].Addresses[0].StateName;
          this.assignAssessmentEntity1.CountryName = this.proctorEntity[i].Addresses[0].CountryName;
          this.assignAssessmentEntity1.Address = $("#addressSelected" + i + '0').text();
        }
        else {
          this.assignAssessmentEntity1.AddressId = this.proctorEntity[i].Addresses[1].AddressId;
          this.assignAssessmentEntity1.AddressName = this.proctorEntity[i].Addresses[1].AddressName;
          this.assignAssessmentEntity1.Address1 = this.proctorEntity[i].Addresses[1].Address1;
          this.assignAssessmentEntity1.Address2 = this.proctorEntity[i].Addresses[1].Address2;
          this.assignAssessmentEntity1.City = this.proctorEntity[i].Addresses[1].City;
          this.assignAssessmentEntity1.StateId = this.proctorEntity[i].Addresses[1].StateId;
          this.assignAssessmentEntity1.CountryId = this.proctorEntity[i].Addresses[1].CountryId;
          this.assignAssessmentEntity1.ZipCode = this.proctorEntity[i].Addresses[1].ZipCode;
          this.assignAssessmentEntity1.StateName = this.proctorEntity[i].Addresses[1].StateName;
          this.assignAssessmentEntity1.CountryName = this.proctorEntity[i].Addresses[1].CountryName;
          this.assignAssessmentEntity1.Address = $("#addressSelected" + i + '1').text();
        }

        this.suggestedselectedProctorCheck = true;
        this.suggestedselectedProctorValid = false;
        $("#selectedSuggestedProctor" + i).val(1);
        this.assignAssessmentEntity1.ProctorId = this.proctorEntity[i].ProctorId;
        this.assignAssessmentEntity1.ProctorName = this.proctorEntity[i].ProctorName;
        this.assignAssessmentEntity1.PhoneNumber = this.proctorEntity[i].PhoneNumber;
        this.assignAssessmentEntity1.ProctorEmailAddress = this.proctorEntity[i].EmailAddress;

      }
      else {
        $("#suggestedProctors" + j).removeClass("selected_proctor");
        $("#selectedSuggestedProctor" + j).text("Select");
        $("#selectedSuggestedProctor" + j).val(0);
      }
    }
  }
  showProctorDetail(ProctorId) {
    $("#selectedProctorDetails").show();
    if (ProctorId != '') {
      this.globals.isLoading = true;
      this.AssisgnAssessmentService.getProctorDetails(ProctorId)
        .then((data) => {
          debugger
          this.globals.isLoading = false;
          this.proctorEntity = data[0];

        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      $("#selectedProctorDetails").hide();
      this.proctorEntity = {};
    }

  }

  previous1() {
    $("#proctor").removeClass('show active');
    $("#date").addClass('show active');
  }
  assignAssessmentSubmit2(assignAssessmentForm2) {
    this.submitted2 = true;
    if (this.suggestedselectedProctorCheck)
      this.suggestedselectedProctorValid = false;
    else
      this.suggestedselectedProctorValid = true;
    if (this.suggestedselectedProctorCheck && !this.suggestedselectedProctorValid) {
      this.assignAssessmentEntity1.AssignStatus = 1;
      $("#proctor-tab").removeClass('active');
      $("#proctor-tab").addClass('complete');
      $("#address-tab").removeClass('disabled');
      $("#address-tab").addClass('active');
      $("#proctor").removeClass('show active');
      $("#address").addClass('show active');
      $("#suggestedproctorAddress").show();
      $("#newProctorAddress").hide();
    }
  }
  assignAssessmentSubmit3(assignAssessmentForm3) {
    this.submitted2 = true;
    if (assignAssessmentForm3.valid) {
      this.assignAssessmentEntity1.AssignStatus = 1;
      this.assignAssessmentEntity1.ProctorName = this.proctorEntity.Name;
      this.assignAssessmentEntity1.PhoneNumber = this.proctorEntity.PhoneNumber;
      this.assignAssessmentEntity1.ProctorEmailAddress = this.proctorEntity.EmailAddress;
      this.commentDisplay = false;
      $("#proctor-tab").removeClass('active');
      $("#proctor-tab").addClass('complete');
      $("#address-tab").removeClass('disabled');
      $("#address-tab").addClass('active');
      $("#proctor").removeClass('show active');
      $("#address").addClass('show active');
      $("#suggestedproctorAddress").hide();
      $("#newProctorAddress").show();
    }
  }
  DeclineAssignAssessment() {
    this.assignAssessmentEntity1.AssignStatus = 0;
    this.commentDisplay = false;
    $("#proctor-tab").removeClass('active');
    $("#proctor-tab").addClass('complete');
    $("#address-tab").addClass('disabled');
    $("#address-tab").removeClass('complete');
    $("#comment-tab").removeClass('disabled');
    $("#comment-tab").addClass('active');
    $("#proctor").removeClass('show active');
    $("#comment").addClass('show active');
  }

  changeAddress() {
    $("#newProctorAddress").show();
    this.assignAssessmentEntity1.AddressId = '';
    this.assignAssessmentEntity1.AddressName = '';
    this.assignAssessmentEntity1.Address1 = '';
    this.assignAssessmentEntity1.Address2 = '';
    this.assignAssessmentEntity1.City = '';
    this.assignAssessmentEntity1.StateId = '';
    this.assignAssessmentEntity1.CountryId = '';
    this.assignAssessmentEntity1.ZipCode = '';
    this.assignAssessmentEntity1.StateName = '';
    this.assignAssessmentEntity1.CountryName = '';
  }
  getStateListadd(assignAssessmentForm4) {
    debugger
    assignAssessmentForm4.form.controls.StateId.markAsDirty();
    this.assignAssessmentEntity1.StateId = '';

    this.stateList = [];
    if (this.assignAssessmentEntity1.CountryId > 0) {
      for (var i = 0; i < this.countryList.length; i++) {
        if (this.assignAssessmentEntity1.CountryId == this.countryList[i].CountryId)
          this.assignAssessmentEntity1.CountryName = this.countryList[i].CountryName;
      }
      this.AssisgnAssessmentService.getStateByCountryId(this.assignAssessmentEntity1.CountryId)
        .then((data) => {
          var data1: any;
          data1 = data;
          var stateSelect = {
            StateId: '',
            StateName: this.globals.adminTranslationText.assignAssessment.form.addressTab.state.select,
            Value: ""
          }
          this.stateList.push(stateSelect);
          this.stateList = [...this.stateList, ...data1];

          setTimeout(function () {
            $('#StateId').selectpicker('refresh');
          }, 500);
        },
          (error) => {
            this.btn_disable = false;
            this.submitted2 = false;
            this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.stateList = [];
    }
  }
  stateNameChange(StateId) {
    for (var i = 0; i < this.stateList.length; i++) {
      if (StateId == this.stateList[i].StateId)
        this.assignAssessmentEntity1.StateName = this.stateList[i].StateName;
    }
  }
  assignAssessmentSubmit4(assignAssessmentForm4) {
    debugger
    this.submitted3 = true;
    if (this.assignAssessmentEntity1.StartTime == '' || this.assignAssessmentEntity1.StartTime == null || this.assignAssessmentEntity1.StartTime == undefined) {
      this.startTimeCheck = true;
    }
    else {
      this.startTimeCheck = false;
      this.time = this.assignAssessmentEntity1.StartTime;
      var startTimeHour = this.time.getHours();
      var startTimeMinutes = this.time.getMinutes();
      this.assignAssessmentEntity1.StartTime1 = (startTimeHour < 10 ? '0' + startTimeHour : '' + startTimeHour) + ":" + (startTimeMinutes < 10 ? '0' + startTimeMinutes : '' + startTimeMinutes);
    }

    if (this.assignAssessmentEntity1.EndTime == '' || this.assignAssessmentEntity1.EndTime == null || this.assignAssessmentEntity1.EndTime == undefined) {
      this.endTimeCheck = true;
    }
    else {
      this.endTimeCheck = false;
      this.time2 = this.assignAssessmentEntity1.EndTime;
      var endTimeHour = this.time2.getHours();
      var endTimeMinutes = this.time2.getMinutes();
      this.assignAssessmentEntity1.EndTime1 = (endTimeHour < 10 ? '0' + endTimeHour : '' + endTimeHour) + ":" + (endTimeMinutes < 10 ? '0' + endTimeMinutes : '' + endTimeMinutes);
    }

    if (this.assignAssessmentEntity1.StartTime1 != '' || this.assignAssessmentEntity1.StartTime1 != null || this.assignAssessmentEntity1.StartTime1 != undefined || this.assignAssessmentEntity1.EndTime1 != '' || this.assignAssessmentEntity1.EndTime1 != null || this.assignAssessmentEntity1.EndTime1 != undefined) {
      if (this.assignAssessmentEntity1.StartTime1 >= this.assignAssessmentEntity1.EndTime1)
        this.startTimeValid = true;
      else
        this.startTimeValid = false;
    }
    console.log(this.assignAssessmentEntity1);
    if (assignAssessmentForm4.valid && !this.startTimeCheck && !this.endTimeCheck && !this.startTimeValid) {
      $("#address-tab").removeClass('active');
      $("#address-tab").addClass('complete');
      $("#comment-tab").removeClass('disabled');
      $("#comment-tab").addClass('active');
      $("#address").removeClass('show active');
      $("#comment").addClass('show active');
    }
  }

  previous2() {
    $("#address").removeClass('show active');
    $("#proctor").addClass('show active');
  }
  FinalAssignAssessmentSubmit(AssignStatus) {
    debugger
    if (AssignStatus == 0) {
      if (this.assignAssessmentEntity1.AdminComment == null || this.assignAssessmentEntity1.AdminComment == '' || this.assignAssessmentEntity1.AdminComment == undefined) {
        this.commentDisplay = true;
      }
      else
        this.commentDisplay = false;
    }

    if (!this.commentDisplay) {
      this.assignAssessmentEntity1.ScheduleAssessmentHistoryId = this.scheduleAssessmentEntity.ScheduleAssessmentHistoryId;
      this.assignAssessmentEntity1.CertificateId = this.scheduleAssessmentEntity.CertificateId;
      this.assignAssessmentEntity1.CandidateId = this.scheduleAssessmentEntity.CandidateId;
      this.assignAssessmentEntity1.UserCertificateId = this.scheduleAssessmentEntity.UserCertificateId;
      this.assignAssessmentEntity1.UserId = this.globals.authData.UserId;
      this.assignAssessmentEntity1.CertificateName = this.scheduleAssessmentEntity.CertificateName;
      this.assignAssessmentEntity1.LoginURL = '/login';
      if (this.assignAssessmentEntity1.Address != '')
        this.assignAssessmentEntity1.Address = this.assignAssessmentEntity1.Address1 + ' ' + this.assignAssessmentEntity1.Address2 + ' ' + this.assignAssessmentEntity1.City + ' ' + this.assignAssessmentEntity1.StateName + ' ' + this.assignAssessmentEntity1.ZipCode;

      console.log(this.assignAssessmentEntity1);
      $("#comment-tab").addClass('complete');
      this.globals.isLoading = true;
      this.AssisgnAssessmentService.AssignAssessment(this.assignAssessmentEntity1)
        .then((data) => {
          this.globals.isLoading = false;

          if (this.assignAssessmentEntity1.AssignStatus == 0) {
            swal({
              type: this.globals.adminTranslationText.assignAssessment.form.alerts.declineAssign.type,
              title: this.globals.adminTranslationText.assignAssessment.form.alerts.declineAssign.title,
              text: this.globals.adminTranslationText.assignAssessment.form.alerts.declineAssign.text,
              showConfirmButton: false,
              timer: 4000
            })
          }
          else {
            swal({
              type: this.globals.adminTranslationText.assignAssessment.form.alerts.assign.type,
              title: this.globals.adminTranslationText.assignAssessment.form.alerts.assign.title,
              text: this.globals.adminTranslationText.assignAssessment.form.alerts.assign.text + this.scheduleAssessmentEntity.Name,
              showConfirmButton: false,
              timer: 4000
            })
          }
          this.router.navigate(['/admin/assessment-list']);
        },
          (error) => {
            this.globals.isLoading = false;
            if(error.error.code == 422)
            {
              this.errorEntity.Address1 = (error.error.message.Address1 != "") ? error.error.message.Address1 : '';
              this.errorEntity.AddressName = (error.error.message.AddressName != "") ? error.error.message.AddressName : '';
              this.errorEntity.AdminComment = (error.error.message.AdminComment != "") ? error.error.message.AdminComment : '';
              this.errorEntity.AssignDate = (error.error.message.AssignDate != "") ? error.error.message.AssignDate : '';
              this.errorEntity.CityCandidate = (error.error.message.CityCandidate != "") ? error.error.message.CityCandidate : '';
              this.errorEntity.CountryId = (error.error.message.CountryId != "") ? error.error.message.CountryId : '';
              this.errorEntity.EndTime1 = (error.error.message.EndTime1 != "") ? error.error.message.EndTime1 : '';
              this.errorEntity.ProctorId = (error.error.message.ProctorId != "") ? error.error.message.ProctorId : '';
              this.errorEntity.ScheduleWith = (error.error.message.ScheduleWith != "") ? error.error.message.ScheduleWith : '';
              this.errorEntity.StartTime1 = (error.error.message.StartTime1 != "") ? error.error.message.StartTime1 : '';
              this.errorEntity.StateId = (error.error.message.StateId != "") ? error.error.message.StateId : '';
              this.errorEntity.ZipCode = (error.error.message.ZipCode != "") ? error.error.message.ZipCode : '';
            }
            else
            {
              this.globals.pageNotfound(error.error.code);
            }
          });

    }
  }
  previous3() {
    $("#comment").removeClass('show active');
    $("#address").addClass('show active');
    this.assignAssessmentEntity1.StartTime = this.time;
    this.assignAssessmentEntity1.EndTime = this.time2;
    console.log(this.assignAssessmentEntity1);
  }
}
