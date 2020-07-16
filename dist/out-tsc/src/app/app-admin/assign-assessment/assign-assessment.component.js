import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssisgnAssessmentService } from '../services/assisgn-assessment.service';
var AssignAssessmentComponent = /** @class */ (function () {
    function AssignAssessmentComponent(globals, router, route, AssisgnAssessmentService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.AssisgnAssessmentService = AssisgnAssessmentService;
    }
    AssignAssessmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        $("body")
            .not($("#inputpicker-wrapped-list"))
            .click(function () {
            $("#inputpicker-wrapped-list").css("display", "none");
        });
        this.globals.isLoading = true;
        this.scheduleAssessmentEntity = {};
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
        //var todaysDate = new Date();
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        if (curr_month < 10) {
            var month = '0' + curr_month;
        }
        else {
            var month = '' + curr_month;
        }
        if (curr_date < 10) {
            var date = '0' + curr_date;
        }
        else {
            var date = '' + curr_date;
        }
        this.todaysDate = curr_year + '-' + month + '-' + date;
        var address = [];
        //this.assignAssessmentEntity1.TimeRange = [];
        var scheduleHistoryId = this.route.snapshot.paramMap.get('scheduleHistoryId');
        //  var scheduleHistoryId = window.atob(this.route.snapshot.paramMap.get('scheduleHistoryId'));
        if (scheduleHistoryId) {
            scheduleHistoryId = window.atob(scheduleHistoryId);
            this.AssisgnAssessmentService.getAllDefault(scheduleHistoryId)
                .then(function (data) {
                _this.scheduleAssessmentEntity = data['ScheduleAssessmentDetail'][0];
                console.log(_this.scheduleAssessmentEntity);
                _this.scheduleAssessmentEntity.candidateCity = _this.scheduleAssessmentEntity.City;
                // this.proctorList = data['Proctors'];
                var proctorSelect = {
                    UserId: '',
                    Name: _this.globals.adminTranslationText.assignAssessment.form.searchNewProctor.selectProctor,
                    Value: ""
                };
                _this.proctorList.push(proctorSelect);
                _this.proctorList = _this.proctorList.concat(data['Proctors']);
                _this.addressList = data['Cities']; // only cities
                _this.fullAddressList = data['Addresses'];
                // var addressSelect = {
                //   City: 'select location',
                //   Value: ""
                // }
                // this.addressList.push(addressSelect);
                // this.addressList = [...this.addressList, ...data['Addresses']];
                _this.assignAssessmentEntity1.CityCandidate = _this.scheduleAssessmentEntity.candidateCity;
                // for(var i=0;i<this.addressList.length;i++)
                // {
                //   if(this.addressList[i].City == this.scheduleAssessmentEntity.candidateCity)
                //   {
                //     this.defaultItem = this.addressList[i];
                //   }
                //   else
                //   {
                //     this.defaultItem = this.addressList[0];
                //   }
                // }
                //this.countryList = data['Countries'];
                var countrySelect = {
                    CountryId: '',
                    CountryName: _this.globals.adminTranslationText.assignAssessment.form.addressTab.country.select,
                    Value: ""
                };
                _this.countryList.push(countrySelect);
                _this.countryList = _this.countryList.concat(data['Countries']);
                _this.stateList = [];
                //console.log(this.scheduleAssessmentEntity.AvailablePriorityDate2 +" "+ this.todaysDate)
                if (_this.scheduleAssessmentEntity.AvailablePriorityDate1 <= _this.todaysDate) {
                    $("#dates1").attr('disabled', 'disabled');
                    $("#radio1").addClass('radio_disabled');
                }
                if (_this.scheduleAssessmentEntity.AvailablePriorityDate2 <= _this.todaysDate) {
                    $("#dates2").attr('disabled', 'disabled');
                    $("#radio2").addClass('radio_disabled');
                }
                if (_this.scheduleAssessmentEntity.AvailablePriorityDate3 <= _this.todaysDate) {
                    $("#dates3").attr('disabled', 'disabled');
                    $("#radio3").addClass('radio_disabled');
                }
                if (_this.addressList.length <= 0)
                    _this.assignAssessmentEntity1.CityCandidate = _this.scheduleAssessmentEntity.candidateCity;
                else {
                    for (var i = 0; i < _this.addressList.length; i++) {
                        if (_this.addressList[i].City == _this.scheduleAssessmentEntity.candidateCity) {
                            _this.assignAssessmentEntity1.CityCandidate = _this.scheduleAssessmentEntity.candidateCity;
                        }
                        else
                            _this.assignAssessmentEntity1.CityCandidate = '';
                    }
                    setTimeout(function () {
                        $("#CityCandidate").selectpicker('refresh');
                    }, 500);
                }
                //console.log(data);
                for (var i = 0; i < _this.fullAddressList.length; i++) {
                    address.push({
                        value: i + 1, text: _this.fullAddressList[i].AddressName, address: _this.fullAddressList[i].Address1 + " " + _this.fullAddressList[i].Address2,
                        city: _this.fullAddressList[i].City, state: _this.fullAddressList[i].StateName, country: _this.fullAddressList[i].CountryName, zipcode: _this.fullAddressList[i].ZipCode
                    });
                }
                _this.globals.isLoading = false;
                setTimeout(function () {
                    $('select').selectpicker();
                    $('#address_new').inputpicker({
                        data: address,
                        // data: [
                        //   { value: "1", text: "Address1", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "2", text: "Address2", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "3", text: "Address3", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "4", text: "Address4", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "5", text: "Address5", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "6", text: "Address1", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "7", text: "Address2", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "8", text: "Address3", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "9", text: "Address4", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" },
                        //   { value: "10", text: "Address5", address: "405 Iscon Atria", city: "Vadodara", state: "Gujarat", country: "India", zipcode: "390001" }
                        // ],
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
            }, function (error) {
                _this.globals.isLoading = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
        $("#proctor-tab").addClass('disabled');
        $("#address-tab").addClass('disabled');
        $("#comment-tab").addClass('disabled');
        var AddressName = '';
        $('#address_new').on('change', function (e) {
            debugger;
            var i = e.target.value - 1;
            $("#Address1").attr('disabled', true);
            $("#Address2").attr('disabled', true);
            $("#CountryId").attr('disabled', true);
            $("#StateId").attr('disabled', true);
            $("#City").attr('disabled', true);
            $("#ZipCode").attr('disabled', true);
            $("#AddressName").attr('disabled', true);
            _this.assignAssessmentEntity1.AddressId = _this.fullAddressList[i].AddressId;
            _this.assignAssessmentEntity1.AddressName = _this.fullAddressList[i].AddressName;
            _this.assignAssessmentEntity1.Address1 = _this.fullAddressList[i].Address1;
            _this.assignAssessmentEntity1.Address2 = _this.fullAddressList[i].Address2;
            _this.assignAssessmentEntity1.CountryId = _this.fullAddressList[i].CountryId;
            _this.assignAssessmentEntity1.CountryName = _this.fullAddressList[i].CountryName;
            _this.assignAssessmentEntity1.StateName = _this.fullAddressList[i].StateName;
            _this.assignAssessmentEntity1.City = _this.fullAddressList[i].City;
            _this.assignAssessmentEntity1.ZipCode = _this.fullAddressList[i].ZipCode;
            _this.AssisgnAssessmentService.getStateByCountryId(_this.assignAssessmentEntity1.CountryId)
                .then(function (data) {
                _this.stateList = data;
                _this.assignAssessmentEntity1.StateId = _this.fullAddressList[i].StateId;
                setTimeout(function () {
                    $('#StateId').selectpicker('refresh');
                }, 200);
            }, function (error) {
                //this.btn_disable = false;
                // this.submitted2 = false;
                _this.globals.pageNotfound(error.error.code);
            });
            setTimeout(function () {
                $('#CountryId').selectpicker('refresh');
            }, 200);
        });
        //   $('#address_new').change(function(){
        //     // alert($(this).val() );
        //     var i = $(this).val()-1;
        //     console.log(address);
        //     console.log(address[i].text);
        //     AddressName = address[i].text;
        // });
        // setTimeout(() => {
        //  alert(AddressName);  
        // }, 500);
        // this.assignAssessmentEntity1.AddressName = AddressName;
        setTimeout(function () {
            // $('.address').hide();
            // if ($('#address1').is(':checked')) {
            //   $('.address_2').hide();
            //   $('.address_1').show();
            // }
            // if ($('#address2').is(':checked')) {
            //   $('.address_1').hide();
            //   $('.address_2').show();
            // }
            // if ($('#address3').is(':checked')) {
            //   $('.address_4').hide();
            //   $('.address_3').show();
            // }
            // if ($('#address4').is(':checked')) {
            //   $('.address_3').hide();
            //   $('.address_4').show();
            // }
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
        // $(".address_label input").click(function () {
        //   if ($('#address1').is(':checked')) {
        //     $('.address_2').hide();
        //     $('.address_1').show();
        //   }
        //   if ($('#address2').is(':checked')) {
        //     $('.address_1').hide();
        //     $('.address_2').show();
        //   }
        //   if ($('#address3').is(':checked')) {
        //     $('.address_4').hide();
        //     $('.address_3').show();
        //   }
        //   if ($('#address4').is(':checked')) {
        //     $('.address_3').hide();
        //     $('.address_4').show();
        //   }
        // });
    };
    AssignAssessmentComponent.prototype.assignAssessmentSubmit1 = function (assignAssessmentForm1) {
        var _this = this;
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
            console.log(this.assignAssessmentEntity1);
            this.globals.isLoading = true;
            this.suggestedselectedProctorCheck = false;
            if (this.assignAssessmentEntity1.ScheduleWith == 0) //suggested proctor call
             {
                this.assignAssessmentEntity1.City = this.assignAssessmentEntity1.CityCandidate;
                this.AssisgnAssessmentService.SuggestedProctors(this.assignAssessmentEntity1)
                    .then(function (data) {
                    $("#suggested_proctor_block").show();
                    $("#seacrh_proctor_main_block").hide();
                    $("#selectedProctorDetails").hide();
                    _this.proctorEntity = data;
                    if (_this.proctorEntity.length == 0) {
                        _this.globals.isLoading = false;
                        swal({
                            //position: 'top-end',
                            type: _this.globals.adminTranslationText.assignAssessment.form.alerts.suggestedProctorNotFound.type,
                            title: _this.globals.adminTranslationText.assignAssessment.form.alerts.suggestedProctorNotFound.title,
                            text: _this.globals.adminTranslationText.assignAssessment.form.alerts.suggestedProctorNotFound.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else {
                        for (var i = 0; i < _this.proctorEntity.length; i++) {
                            for (var j = 0; j < _this.proctorEntity[i].Addresses.length; j++) {
                                var hour = (_this.proctorEntity[i].Addresses[j].min_start.split(':'))[0];
                                var min = (_this.proctorEntity[i].Addresses[j].min_start.split(':'))[1];
                                var part = hour > 12 ? 'pm' : 'am';
                                min = (min + '').length == 1 ? "0" + min : min;
                                hour = hour > 12 ? hour - 12 : hour;
                                hour = (hour + '').length == 1 ? "0" + hour : hour;
                                //console.log(hour+':'+min +' '+part);
                                _this.proctorEntity[i].Addresses[j].min_start = hour + ':' + min + part;
                                var hour1 = (_this.proctorEntity[i].Addresses[j].max_end.split(':'))[0];
                                var min1 = (_this.proctorEntity[i].Addresses[j].max_end.split(':'))[1];
                                var part1 = hour1 > 12 ? 'pm' : 'am';
                                min1 = (min1 + '').length == 1 ? "0" + min1 : min1;
                                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                                hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                                //console.log(hour1+':'+min1 +' '+part1);
                                _this.proctorEntity[i].Addresses[j].max_end = hour1 + ':' + min1 + part1;
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
                        _this.assignAssessmentEntity1.ProctorId = '';
                        _this.assignAssessmentEntity1.AddressId = '';
                        _this.assignAssessmentEntity1.AddressName = '';
                        _this.assignAssessmentEntity1.Address1 = '';
                        _this.assignAssessmentEntity1.Address2 = '';
                        _this.assignAssessmentEntity1.City = '';
                        _this.assignAssessmentEntity1.StateId = '';
                        _this.assignAssessmentEntity1.CountryId = '';
                        _this.assignAssessmentEntity1.ZipCode = '';
                        //console.log(data);
                        _this.globals.isLoading = false;
                        $('.address').hide();
                    }
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
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
                setTimeout(function () {
                    $("#ProctorId").selectpicker('refresh');
                }, 100);
                this.submitted2 = false;
            }
        }
    };
    AssignAssessmentComponent.prototype.addressChange = function (i, j) {
        //alert(i+" "+j);
        if ($('#address' + i + j).is(':checked')) {
            if (j == 0) {
                $('.address_' + i + '1').hide();
                $('.address_' + i + '0').show();
            }
            else {
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
    };
    AssignAssessmentComponent.prototype.suggestedProctorSelect = function (i) {
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
                    //this.assignAssessmentEntity1.StartTime = this.proctorEntity[i].Addresses[0].min_start;
                    //this.assignAssessmentEntity1.EndTime = this.proctorEntity[i].Addresses[0].max_end;
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
                    //this.assignAssessmentEntity1.StartTime = this.proctorEntity[i].Addresses[1].min_start;
                    //this.assignAssessmentEntity1.EndTime = this.proctorEntity[i].Addresses[1].max_end;
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
    };
    AssignAssessmentComponent.prototype.showProctorDetail = function (ProctorId) {
        var _this = this;
        $("#selectedProctorDetails").show();
        if (ProctorId != '') {
            this.globals.isLoading = true;
            this.AssisgnAssessmentService.getProctorDetails(ProctorId)
                .then(function (data) {
                debugger;
                _this.globals.isLoading = false;
                _this.proctorEntity = data[0];
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
            this.proctorEntity = {};
        }
    };
    AssignAssessmentComponent.prototype.previous1 = function () {
        $("#proctor").removeClass('show active');
        $("#date").addClass('show active');
    };
    AssignAssessmentComponent.prototype.assignAssessmentSubmit2 = function (assignAssessmentForm2) {
        //this.submitted2 = true;
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
    };
    AssignAssessmentComponent.prototype.assignAssessmentSubmit3 = function (assignAssessmentForm3) {
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
    };
    AssignAssessmentComponent.prototype.DeclineAssignAssessment = function () {
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
    };
    AssignAssessmentComponent.prototype.changeAddress = function () {
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
    };
    AssignAssessmentComponent.prototype.getStateListadd = function (assignAssessmentForm4) {
        var _this = this;
        debugger;
        assignAssessmentForm4.form.controls.StateId.markAsDirty();
        this.assignAssessmentEntity1.StateId = '';
        this.stateList = [];
        if (this.assignAssessmentEntity1.CountryId > 0) {
            for (var i = 0; i < this.countryList.length; i++) {
                if (this.assignAssessmentEntity1.CountryId == this.countryList[i].CountryId)
                    this.assignAssessmentEntity1.CountryName = this.countryList[i].CountryName;
            }
            this.AssisgnAssessmentService.getStateByCountryId(this.assignAssessmentEntity1.CountryId)
                .then(function (data) {
                // this.stateList = data;
                var data1;
                data1 = data;
                var stateSelect = {
                    StateId: '',
                    StateName: _this.globals.adminTranslationText.assignAssessment.form.addressTab.state.select,
                    Value: ""
                };
                _this.stateList.push(stateSelect);
                _this.stateList = _this.stateList.concat(data1);
                setTimeout(function () {
                    $('#StateId').selectpicker('refresh');
                }, 500);
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted2 = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.stateList = [];
        }
    };
    AssignAssessmentComponent.prototype.stateNameChange = function (StateId) {
        for (var i = 0; i < this.stateList.length; i++) {
            if (StateId == this.stateList[i].StateId)
                this.assignAssessmentEntity1.StateName = this.stateList[i].StateName;
        }
    };
    AssignAssessmentComponent.prototype.assignAssessmentSubmit4 = function (assignAssessmentForm4) {
        debugger;
        this.submitted3 = true;
        console.log(this.assignAssessmentEntity1);
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
            // var time = $("#StartTime").val();
            //   var hours = Number(this.time.match(/^(\d+)/)[1]);
            //   var minutes = Number(this.time.match(/:(\d+)/)[1]);
            //   var AMPM = this.time.match(/\s(.*)$/)[1];
            //   if(AMPM == "pm" && hours<12) hours = hours+12;
            //   if(AMPM == "am" && hours==12) hours = hours-12;
            //   var sHours = hours.toString();
            //   var sMinutes = minutes.toString();
            //   if(hours<10) sHours = "0" + sHours;
            //   if(minutes<10) sMinutes = "0" + sMinutes;
            //   // alert(sHours + ":" + sMinutes);
            //   this.time =sHours + ":" + sMinutes;
            //  // var time1 =  $("#EndTime").val();
            //   var hours1 = Number(this.time2.match(/^(\d+)/)[1]);
            //   var minutes1 = Number(this.time2.match(/:(\d+)/)[1]);
            //   var AMPM1 = this.time2.match(/\s(.*)$/)[1];
            //   if(AMPM1 == "pm" && hours1<12) hours1 = hours1+12;
            //   if(AMPM1 == "am" && hours1==12) hours1 = hours1-12;
            //   var sHours1 = hours1.toString();
            //   var sMinutes1 = minutes1.toString();
            //   if(hours1<10) sHours1 = "0" + sHours1;
            //   if(minutes1<10) sMinutes1 = "0" + sMinutes1;
            //   this.time2 =sHours1 + ":" + sMinutes1;
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
    };
    AssignAssessmentComponent.prototype.previous2 = function () {
        $("#address").removeClass('show active');
        $("#proctor").addClass('show active');
    };
    AssignAssessmentComponent.prototype.FinalAssignAssessmentSubmit = function (AssignStatus) {
        var _this = this;
        debugger;
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
                .then(function (data) {
                _this.globals.isLoading = false;
                if (_this.assignAssessmentEntity1.AssignStatus == 0) {
                    swal({
                        type: _this.globals.adminTranslationText.assignAssessment.form.alerts.declineAssign.type,
                        title: _this.globals.adminTranslationText.assignAssessment.form.alerts.declineAssign.title,
                        text: _this.globals.adminTranslationText.assignAssessment.form.alerts.declineAssign.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.assignAssessment.form.alerts.assign.type,
                        title: _this.globals.adminTranslationText.assignAssessment.form.alerts.assign.title,
                        text: _this.globals.adminTranslationText.assignAssessment.form.alerts.assign.text + _this.scheduleAssessmentEntity.Name,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                _this.router.navigate(['/admin/assessment-list']);
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
    };
    AssignAssessmentComponent.prototype.previous3 = function () {
        $("#comment").removeClass('show active');
        $("#address").addClass('show active');
        this.assignAssessmentEntity1.StartTime = this.time;
        this.assignAssessmentEntity1.EndTime = this.time2;
        console.log(this.assignAssessmentEntity1);
    };
    AssignAssessmentComponent = tslib_1.__decorate([
        Component({
            selector: 'app-assign-assessment',
            templateUrl: './assign-assessment.component.html',
            styleUrls: ['./assign-assessment.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, AssisgnAssessmentService])
    ], AssignAssessmentComponent);
    return AssignAssessmentComponent;
}());
export { AssignAssessmentComponent };
//# sourceMappingURL=assign-assessment.component.js.map