import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PracticeTestService } from '../services/practice-test.service';
var PracticeTestComponent = /** @class */ (function () {
    function PracticeTestComponent(router, route, PracticeTestService, globals) {
        this.router = router;
        this.route = route;
        this.PracticeTestService = PracticeTestService;
        this.globals = globals;
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.k = 1;
        this.questionitemid = '';
    }
    PracticeTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        $(".timer").empty();
        this.testc = 40;
        this.practiceTestListEntity = {};
        this.practiceTestEntity = {};
        this.categoryList = {};
        this.addPracticeTestEntity = {};
        this.finalSubmitEntity = {};
        this.getoneshotpracticeEntity = {};
        this.mappingIds = [];
        this.countEntity = [];
        var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
        var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        var userpracticetestid = window.atob(this.route.snapshot.paramMap.get('userpracticetestid'));
        this.HasOneShotAssessment = window.atob(this.route.snapshot.paramMap.get('HasOneShotAssessment'));
        if (this.HasOneShotAssessment == 0) {
            this.PracticeTestService.getByCertificateId(usercertificateid, userpracticetestid)
                .then(function (data) {
                // //debugger
                _this.categoryList = data;
                $('#practicecategorymodal').modal('show');
                //console.log(this.categoryList);
                _this.certificatename = data[0].CertificateName;
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
            debugger;
            this.getoneshotpracticeEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
            this.getoneshotpracticeEntity.UserId = this.globals.authData.UserId;
            this.getoneshotpracticeEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
            this.PracticeTestService.oneShotPractice(this.getoneshotpracticeEntity)
                .then(function (data) {
                debugger;
                $('#carousel').flexslider('destroy');
                $('#slider').flexslider('destroy');
                $('#practicecategorymodal').modal('hide');
                $('.flexslider').removeData('flexslider');
                _this.practiceTestListEntity = [];
                _this.practiceTestListEntity = data['all_question_details'];
                _this.mappingIds = data['UserPracticeTestMappingIds'];
                _this.practiceTestList = [];
                _this.practiceTestList = _this.practiceTestListEntity;
                _this.testc = data['PracticeTestTotalTime'] * 60;
                _this.oneshotPracticeTime = data['PracticeTestTotalTime'] * 60;
                _this.timedCount();
                setTimeout(function () {
                    $('#carousel').flexslider({
                        animation: "slide",
                        controlNav: false,
                        animationLoop: false,
                        slideshow: false,
                        itemWidth: 60,
                        itemMargin: 0,
                        asNavFor: '#slider'
                    });
                    $('#slider').flexslider({
                        animation: "slide",
                        controlNav: false,
                        animationLoop: false,
                        slideshow: false,
                        sync: "#carousel"
                    });
                }, 500);
                setTimeout(function () {
                    // alert($("#slider").find(".flex-direction-nav").length);
                    // alert($("#carousel").find(".flex-direction-nav").length);
                    $("#carousel .flex-direction-nav").removeAttr("style");
                    $("#slider .flex-direction-nav").removeAttr("style");
                    $("#carousel .flex-direction-nav").last().css("display", "block");
                    $("#slider .flex-direction-nav").last().css("display", "block");
                }, 1000);
                console.log(data);
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
        this.dropdownList = [
            { filter_option_id: 1, filter_option_text: 'Answered' },
            { filter_option_id: 2, filter_option_text: 'Unanswered' },
            { filter_option_id: 3, filter_option_text: 'Mark as Reviewed' }
        ];
    };
    PracticeTestComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.testt);
        $('.timer').html("00:00:00");
    };
    PracticeTestComponent.prototype.secondsTimeSpanToHMS = function (s) {
        var h = Math.floor(s / 3600); //Get whole hours
        s -= h * 3600;
        var m = Math.floor(s / 60); //Get remaining minutes
        s -= m * 60;
        return (h < 10 ? '0' + h : h) + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
    };
    PracticeTestComponent.prototype.callAlertMessage = function () {
        var _this = this;
        swal({
            title: 'Oops...',
            text: 'Your time is up.Kindly submit your assessment.',
            icon: "warning",
            type: 'warning',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonClass: 'theme_btn',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
        }).then(function (result) {
            //debugger
            if (result.value) {
                var certificateid = window.atob(_this.route.snapshot.paramMap.get('certificateid'));
                var usercertificateid = window.atob(_this.route.snapshot.paramMap.get('usercertificateid'));
                if (_this.HasOneShotAssessment == 0) {
                    _this.globals.isLoading = true;
                    console.log(_this.secondsTimeSpanToHMS(_this.addPracticeTestEntity.CategoryAssessmentTime * 60));
                    var time1 = _this.secondsTimeSpanToHMS(_this.addPracticeTestEntity.CategoryAssessmentTime * 60); // category original time your input string
                    var t1 = time1.split(':'); // split it at the colons
                    var time2 = $('.timer').html(); // remaining time
                    var t2 = time2.split(":");
                    // Hours are worth 60 minutes.
                    //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);;
                    var minutes1 = (+t1[0]) * 60 + (+t1[1]);
                    var minutes2 = (+t2[0]) * 60 + (+t2[1]);
                    console.log(minutes1 + ' ' + minutes2);
                    console.log(minutes1 - minutes2);
                    _this.finalSubmitEntity.TimeOfCategory = minutes1 - minutes2;
                    _this.finalSubmitEntity.TotalCategories = _this.categoryList.length;
                    _this.finalSubmitEntity.CertificateId = window.atob(_this.route.snapshot.paramMap.get('certificateid'));
                    _this.finalSubmitEntity.UserPracticeTestId = _this.practiceTestListEntity[0].UserPracticeTestId;
                    _this.finalSubmitEntity.UserId = _this.globals.authData.UserId;
                    _this.finalSubmitEntity.UserCertificateId = window.atob(_this.route.snapshot.paramMap.get('usercertificateid'));
                    _this.finalSubmitEntity.UserName = _this.globals.authData.FirstName + " " + _this.globals.authData.LastName;
                    _this.finalSubmitEntity.RoleId = _this.globals.authData.RoleId;
                    _this.PracticeTestService.AddFinalSubmit(_this.finalSubmitEntity)
                        .then(function (data1) {
                        _this.PracticeTestService.getByCertificateId(usercertificateid, _this.UserPracticeTestId)
                            .then(function (data) {
                            // //debugger        
                            _this.globals.isLoading = false;
                            _this.categoryList = {};
                            _this.categoryList = data;
                            var count = 0;
                            for (var i = 0; i < _this.categoryList.length; i++) {
                                if (_this.categoryList[i].CategoryStatusId == 1) {
                                    count++;
                                }
                            }
                            if (count == _this.categoryList.length) {
                                _this.router.navigate(['/practice-result/' + window.btoa(_this.practiceTestListEntity[0].UserPracticeTestId)]);
                            }
                            else {
                                $('#practicecategorymodal').modal('show');
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
                    }, function (error) {
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
                else {
                    _this.finalSubmitEntity = [];
                    var time = _this.oneshotPracticeTime / 60;
                    for (var i = 0; i < _this.mappingIds.length; i++) {
                        var item = { 'UserPracticeTestMappingId': _this.mappingIds[i], 'CertificateId': certificateid, 'UserId': _this.globals.authData.UserId, 'UserPracticeTestId': _this.practiceTestListEntity[0].UserPracticeTestId, 'UserCertificateId': usercertificateid,
                            'TimeOfPracticeTest': time, 'UserName': _this.globals.authData.FirstName + " " + _this.globals.authData.LastName, 'RoleId': _this.globals.authData.RoleId };
                        _this.finalSubmitEntity.push(item);
                    }
                    _this.PracticeTestService.finalsubmitaddOneShotAssessment(_this.finalSubmitEntity)
                        .then(function (data1) {
                        _this.router.navigate(['/practice-result/' + window.btoa(_this.practiceTestListEntity[0].UserPracticeTestId)]);
                    }, function (error) {
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
            }
        });
    };
    PracticeTestComponent.prototype.timedCount = function () {
        var self = this;
        clearInterval(self.testt);
        $('.timer').html("00:00:00");
        this.testt = setInterval(function () {
            self.testc--;
            // Display 'counter' wherever you want to display it.
            if (self.testc <= 0) {
                clearInterval(self.testt);
                $('.timer').html("00:00:00");
                self.callAlertMessage();
                return;
            }
            else {
                $('.timer').text(self.secondsTimeSpanToHMS(self.testc));
                $('.timer').attr("title", self.secondsTimeSpanToHMS(self.testc));
                //console.log("Timer --> " + self.testc);
            }
        }, 1000);
    };
    PracticeTestComponent.prototype.addPracticeTest = function (i) {
        var _this = this;
        //debugger
        var self = this;
        if (this.UserPracticeTestId > 0) {
            this.addPracticeTestEntity.UserPracticeTestId = this.UserPracticeTestId;
            this.addPracticeTestEntity.Flag = 1;
        }
        else {
            this.addPracticeTestEntity.UserPracticeTestId = 0;
            this.addPracticeTestEntity.Flag = window.atob(this.route.snapshot.paramMap.get('flag'));
        }
        if (this.UserPracticeTestMappingId > 0) {
            this.addPracticeTestEntity.UserPracticeTestMappingId = this.UserPracticeTestMappingId;
        }
        else {
            this.addPracticeTestEntity.UserPracticeTestMappingId = 0;
        }
        this.categoryname = this.categoryList[i].CategoryName;
        this.PracticeTotalItems = this.categoryList[i].PracticeTotalItems;
        this.CategoryAssessmentTime = parseInt(this.categoryList[i].CategoryAssessmentTime);
        // alert(this.CategoryAssessmentTime);
        this.globals.isLoading = true;
        var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        this.addPracticeTestEntity.UserCertificateId = usercertificateid;
        this.addPracticeTestEntity.UserId = this.globals.authData.UserId;
        this.addPracticeTestEntity.CertificateId = this.categoryList[i].CertificateId;
        this.addPracticeTestEntity.CategoryId = this.categoryList[i].CategoryId;
        this.addPracticeTestEntity.CertificatePracticeTestMappingId = this.categoryList[i].CertificatePracticeTestMappingId;
        this.addPracticeTestEntity.ScoreItems = this.categoryList[i].ScoreItems;
        this.addPracticeTestEntity.NoneScoreItems = this.categoryList[i].NoneScoreItems;
        this.addPracticeTestEntity.PracticeTotalItems = this.categoryList[i].PracticeTotalItems;
        this.addPracticeTestEntity.CategoryAssessmentTime = parseInt(this.categoryList[i].CategoryAssessmentTime);
        // var b = document.querySelector(".timer");
        // b.setAttribute('data-minutes-left', this.addPracticeTestEntity.CategoryAssessmentTime);
        // $('.timer').startTimer();
        // //console.log(this.addPracticeTestEntity);
        // alert(this.categoryList[i].CategoryAssessmentTime);
        this.PracticeTestService.addPracticeTest(this.addPracticeTestEntity)
            .then(function (data) {
            // //debugger        
            if (data) {
                _this.UserPracticeTestId = data['UserPracticeTestId'];
                _this.UserPracticeTestMappingId = data['UserPracticeTestMappingId'];
                _this.PracticeTestService.getById(_this.UserPracticeTestMappingId)
                    .then(function (data1) {
                    //debugger        
                    _this.globals.isLoading = false;
                    _this.testc = _this.addPracticeTestEntity.CategoryAssessmentTime * 60;
                    //console.log('');
                    _this.timedCount();
                    $('#carousel').flexslider('destroy');
                    $('#slider').flexslider('destroy');
                    $('#practicecategorymodal').modal('hide');
                    $('.flexslider').removeData('flexslider');
                    _this.practiceTestListEntity = {};
                    _this.practiceTestListEntity = data1;
                    //console.log(this.practiceTestListEntity);
                    _this.practiceTestList = [];
                    _this.practiceTestList = _this.practiceTestListEntity;
                    _this.finalSubmitEntity.UserPracticeTestMappingId = _this.practiceTestListEntity[0].UserPracticeTestMappingId;
                    setTimeout(function () {
                        $('#carousel').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            itemWidth: 60,
                            itemMargin: 0,
                            asNavFor: '#slider'
                        });
                        $('#slider').flexslider({
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            slideshow: false,
                            sync: "#carousel"
                        });
                    }, 500);
                    setTimeout(function () {
                        // alert($("#slider").find(".flex-direction-nav").length);
                        // alert($("#carousel").find(".flex-direction-nav").length);
                        $("#carousel .flex-direction-nav").removeAttr("style");
                        $("#slider .flex-direction-nav").removeAttr("style");
                        $("#carousel .flex-direction-nav").last().css("display", "block");
                        $("#slider .flex-direction-nav").last().css("display", "block");
                    }, 1000);
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
    PracticeTestComponent.prototype.filter_practice = function (event) {
        //debugger
        //alert(event);
        // //console.log(this.practiceTestList);
        // //console.log(this.practiceTestListEntity);
        if (event.length > 0) {
            this.practiceTestListEntity = [];
            var testList = [];
            for (var i = 0; i < event.length; i++) {
                if (event[i] == 3) {
                    for (var j = 0; j < this.practiceTestList.length; j++) {
                        if (this.practiceTestList[j].MarkAsReview == true || this.practiceTestList[j].MarkAsReview == 1) {
                            testList.push(this.practiceTestList[j]);
                        }
                    }
                }
                if (event[i] == 2) {
                    for (var j = 0; j < this.practiceTestList.length; j++) {
                        if (this.practiceTestList[j].UserItemOptionId == null && (this.practiceTestList[j].MarkAsReview != true || this.practiceTestList[j].MarkAsReview != 1)) {
                            testList.push(this.practiceTestList[j]);
                        }
                    }
                }
                if (event[i] == 1) {
                    for (var j = 0; j < this.practiceTestList.length; j++) {
                        if (this.practiceTestList[j].UserItemOptionId != null && (this.practiceTestList[j].MarkAsReview != true || this.practiceTestList[j].MarkAsReview != 1)) {
                            testList.push(this.practiceTestList[j]);
                        }
                    }
                }
            }
            //console.log(testList);
            this.practiceTestListEntity = testList;
        }
        else {
            this.practiceTestListEntity = this.practiceTestList;
        }
        setTimeout(function () {
            $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 60,
                itemMargin: 0,
                smoothHeight: true,
                asNavFor: '#slider'
            });
            $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                smoothHeight: true,
                sync: "#carousel"
            });
        }, 500);
        setTimeout(function () {
            // alert($("#slider").find(".flex-direction-nav").length);
            // alert($("#carousel").find(".flex-direction-nav").length);
            $("#carousel .flex-direction-nav").removeAttr("style");
            $("#slider .flex-direction-nav").removeAttr("style");
            $("#carousel .flex-direction-nav").last().css("display", "block");
            $("#slider .flex-direction-nav").last().css("display", "block");
        }, 1000);
        //console.log(this.practiceTestListEntity);
    };
    PracticeTestComponent.prototype.addPracticeAnswer = function (ItemOptionId, CorrectOptionId, PracticeTestAnswerId, i, itemid, Optionvalue) {
        if (this.questionitemid == '') {
            this.questionitemid = itemid;
        }
        if (this.questionitemid != '' && this.questionitemid != itemid) {
            this.questionitemid = itemid;
            this.k++;
        }
        if (this.practiceTestEntity.MarkAsReview == true) {
            this.practiceTestEntity.MarkAsReview = 1;
        }
        else
            this.practiceTestEntity.MarkAsReview = 0;
        this.practiceTestListEntity[i].UserAnswerValue = Optionvalue;
        $("#questionblock" + (i + 1)).addClass('complete');
        this.practiceTestEntity.PracticeTestAnswerId = PracticeTestAnswerId;
        this.practiceTestEntity.UserItemOptionId = ItemOptionId;
        this.practiceTestEntity.CorrectOptionId = CorrectOptionId;
        this.practiceTestEntity.UserId = this.globals.authData.UserId;
        this.practiceTestEntity.MarkAsReview = this.practiceTestListEntity[i].MarkAsReview;
        this.PracticeTestService.AddPracticeAnswers(this.practiceTestEntity)
            .then(function (data1) {
        }, function (error) {
        });
        this.countEntity.push(this.practiceTestEntity);
        //$('#totalAnswered').text(this.k);
        //this.k++;
    };
    PracticeTestComponent.prototype.markasreview = function (CorrectOptionId, PracticeTestAnswerId, i, ItemId) {
        //debugger
        //alert(CorrectOptionId);
        var UserItemOptionId = '';
        ////console.log(CorrectOptionId);
        if (this.practiceTestListEntity[i].UserItemOptionId == null) {
            UserItemOptionId = null;
        }
        else {
            UserItemOptionId = this.practiceTestListEntity[i].UserItemOptionId;
        }
        //$("#questionblock" + (i + 1)).addClass('fa fa-star');
        // alert(CorrectOptionId+" "+AssessmentAnswerId+" "+i+" "+ ItemId);
        //this.addAssessmentAnswer(UserItemOptionId,CorrectOptionId,AssessmentAnswerId,i,ItemId);
        if (this.practiceTestListEntity[i].MarkAsReview == true) {
            this.practiceTestListEntity[i].MarkAsReview = 1;
        }
        else {
            this.practiceTestListEntity[i].MarkAsReview = 0;
        }
        this.practiceTestEntity.PracticeTestAnswerId = PracticeTestAnswerId;
        this.practiceTestEntity.UserItemOptionId = UserItemOptionId;
        this.practiceTestEntity.CorrectOptionId = CorrectOptionId;
        this.practiceTestEntity.UserId = this.globals.authData.UserId;
        this.practiceTestEntity.MarkAsReview = this.practiceTestListEntity[i].MarkAsReview;
        this.PracticeTestService.AddPracticeAnswers(this.practiceTestEntity)
            .then(function (data1) {
        }, function (error) {
            //this.answerCount ++;
        });
    };
    PracticeTestComponent.prototype.practiceSubmit = function () {
        var count = 0;
        for (var i = 0; i < this.practiceTestListEntity.length; i++) {
            if (this.practiceTestListEntity[i]['UserItemOptionId'] == null || this.practiceTestListEntity[i]['UserItemOptionId'] == '' || this.practiceTestListEntity[i]['UserItemOptionId'] == undefined) {
                count++;
            }
        }
        if (count == 0) {
            $("#assessment_preview_modal").modal('show');
        }
        else {
            swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Please attempt all the items!',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonClass: 'theme_btn',
                confirmButtonText: 'Ok'
            });
        }
    };
    PracticeTestComponent.prototype.finalPracticeSubmit = function () {
        var _this = this;
        debugger;
        $("#assessment_preview_modal").modal('hide');
        var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
        var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        console.log(this.practiceTestListEntity);
        if (this.HasOneShotAssessment == 0) {
            console.log(this.secondsTimeSpanToHMS(this.addPracticeTestEntity.CategoryAssessmentTime * 60));
            var time1 = this.secondsTimeSpanToHMS(this.addPracticeTestEntity.CategoryAssessmentTime * 60); // category original time your input string
            var t1 = time1.split(':'); // split it at the colons
            var time2 = $('.timer').html(); // remaining time
            var t2 = time2.split(":");
            // Hours are worth 60 minutes.
            //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);;
            var minutes1 = (+t1[0]) * 60 + (+t1[1]);
            var minutes2 = (+t2[0]) * 60 + (+t2[1]);
            console.log(minutes1 + ' ' + minutes2);
            console.log(minutes1 - minutes2);
            this.finalSubmitEntity.TimeOfCategory = minutes1 - minutes2;
            this.finalSubmitEntity.TotalCategories = this.categoryList.length;
            this.finalSubmitEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
            this.finalSubmitEntity.UserPracticeTestId = this.practiceTestListEntity[0].UserPracticeTestId;
            this.finalSubmitEntity.UserId = this.globals.authData.UserId;
            this.finalSubmitEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
            this.finalSubmitEntity.UserName = this.globals.authData.FirstName + " " + this.globals.authData.LastName;
            this.finalSubmitEntity.RoleId = this.globals.authData.RoleId;
            this.globals.isLoading = true;
            this.PracticeTestService.AddFinalSubmit(this.finalSubmitEntity)
                .then(function (data1) {
                _this.PracticeTestService.getByCertificateId(usercertificateid, _this.UserPracticeTestId)
                    .then(function (data) {
                    // //debugger        
                    _this.globals.isLoading = false;
                    _this.categoryList = {};
                    _this.categoryList = data;
                    var count = 0;
                    for (var i = 0; i < _this.categoryList.length; i++) {
                        if (_this.categoryList[i].CategoryStatusId == 1) {
                            count++;
                        }
                    }
                    if (count == _this.categoryList.length) {
                        _this.router.navigate(['/practice-result/' + window.btoa(_this.practiceTestListEntity[0].UserPracticeTestId)]);
                    }
                    else {
                        $('#practicecategorymodal').modal('show');
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
            }, function (error) {
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.finalSubmitEntity = [];
            var time1 = this.secondsTimeSpanToHMS(this.oneshotPracticeTime); // Assessment original time your input string
            var t1 = time1.split(':'); // split it at the colons
            var time2 = $('.timer').html(); // remaining time
            var t2 = time2.split(":");
            // Hours are worth 60 minutes.
            //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);;
            var minutes1 = (+t1[0]) * 60 + (+t1[1]);
            var minutes2 = (+t2[0]) * 60 + (+t2[1]);
            console.log(minutes1 + ' ' + minutes2);
            console.log(minutes1 - minutes2);
            for (var i = 0; i < this.mappingIds.length; i++) {
                var item = { 'UserPracticeTestMappingId': this.mappingIds[i], 'CertificateId': certificateid, 'UserId': this.globals.authData.UserId, 'UserPracticeTestId': this.practiceTestListEntity[0].UserPracticeTestId, 'UserCertificateId': usercertificateid,
                    'TimeOfPracticeTest': minutes1 - minutes2, 'UserName': this.globals.authData.FirstName + " " + this.globals.authData.LastName, 'RoleId': this.globals.authData.RoleId };
                this.finalSubmitEntity.push(item);
            }
            this.PracticeTestService.finalsubmitaddOneShotAssessment(this.finalSubmitEntity)
                .then(function (data1) {
                _this.router.navigate(['/practice-result/' + window.btoa(_this.practiceTestListEntity[0].UserPracticeTestId)]);
            }, function (error) {
                _this.globals.pageNotfound(error.error.code);
            });
        }
        clearInterval(this.testt);
        $('.timer').html("00:00:00");
    };
    PracticeTestComponent.prototype.backdashboard = function () {
        var _this = this;
        swal({
            title: this.globals.commonTranslationText.practiceTest.alerts.title,
            text: this.globals.commonTranslationText.practiceTest.alerts.text,
            icon: "warning",
            type: this.globals.commonTranslationText.practiceTest.alerts.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                $("#practicecategorymodal").modal('hide');
                _this.router.navigate(['/certificateDetails/' + _this.route.snapshot.paramMap.get('usercertificateid')]);
            }
            else {
            }
        });
    };
    PracticeTestComponent.prototype.checkMarkedAsReview = function (i) {
        //alert(i);
    };
    PracticeTestComponent = tslib_1.__decorate([
        Component({
            selector: 'app-practice-test',
            templateUrl: './practice-test.component.html',
            styleUrls: ['./practice-test.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, PracticeTestService, Globals])
    ], PracticeTestComponent);
    return PracticeTestComponent;
}());
export { PracticeTestComponent };
//# sourceMappingURL=practice-test.component.js.map