import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EligibilityTestService } from '../services/eligibility-test.service';
var EligibilityTestComponent = /** @class */ (function () {
    function EligibilityTestComponent(router, route, AuthService, EligibilityTestService, globals) {
        this.router = router;
        this.route = route;
        this.AuthService = AuthService;
        this.EligibilityTestService = EligibilityTestService;
        this.globals = globals;
    }
    EligibilityTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eligibilityCredentialEntity = {};
        this.eligibilityTestEntity = {};
        this.eligibilityTestList = [];
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
        this.EligibilityTestService.getAllDefault()
            .then(function (data) {
            _this.certificateList = data['Certificates'];
            _this.roleList = data['Roles'];
            _this.globals.isLoading = false;
            _this.eligibilityCredentialEntity.CertificateId = '';
        }, function (error) {
            _this.globals.isLoading = false;
            if (error.text) {
                swal({
                    //position: 'top-end',
                    type: 'error',
                    title: 'Oops...',
                    text: "Something went wrong!"
                });
            }
        });
        $(window).on('load', function () {
            $('#eligibilitymodal').modal('show');
        });
        setTimeout(function () {
            $('select').selectpicker();
        }, 5000);
        setTimeout(function () {
            // new PerfectScrollbar('.eligibility_test_scroll');
            $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 300,
                itemMargin: 0,
                smoothHeight: true,
                asNavFor: '#slider'
            });
            $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                smoothHeight: true,
                slideshow: false,
                sync: "#carousel"
            });
        }, 500);
    };
    EligibilityTestComponent.prototype.radioChange = function (i) {
        this.eligibilityCredentialEntity.EligibilityItemFor = i;
    };
    EligibilityTestComponent.prototype.eligibilityCredential = function (eligibilityCredentialForm) {
        var _this = this;
        debugger;
        if (eligibilityCredentialForm.valid) {
            console.log(this.eligibilityCredentialEntity);
            this.EligibilityTestService.getById(this.eligibilityCredentialEntity)
                .then(function (data) {
                debugger;
                setTimeout(function () {
                    //new PerfectScrollbar('.eligibility_test_scroll');
                    $('#carousel').flexslider({
                        animation: "slide",
                        controlNav: false,
                        animationLoop: false,
                        slideshow: false,
                        itemWidth: 300,
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
                _this.eligibilityTestList = data;
                if (_this.eligibilityTestList.length < 0) {
                    swal({
                        type: _this.globals.commonTranslationText.eligibilityTestPage.alerts.noRecordFound.type,
                        title: _this.globals.commonTranslationText.eligibilityTestPage.alerts.noRecordFound.title,
                        text: _this.globals.commonTranslationText.eligibilityTestPage.alerts.noRecordFound.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else
                    $('#eligibilitymodal').modal('hide');
            }, function (error) {
                _this.globals.isLoading = false;
                //$('#eligibilitymodal').modal('hide');
                swal({
                    type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    text: _this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    showConfirmButton: false,
                    timer: 4000
                });
                // this.router.navigate(['/pagenotfound']);
            });
        }
    };
    EligibilityTestComponent.prototype.eligibilityTestAdd = function (eligibilityTestForm) {
        var _this = this;
        debugger;
        var count = 0;
        var totalQues = 0;
        var TotalUnanswered = 0;
        if (this.globals.authData) {
            this.eligibilityTestEntity.CandidateId = this.globals.authData.UserId;
            this.eligibilityTestEntity.UserId = this.globals.authData.UserId;
        }
        else {
            this.eligibilityTestEntity.CandidateId = 0;
            this.eligibilityTestEntity.UserId = 0;
        }
        this.eligibilityTestEntity.EligibilityAnswers = [];
        for (var i = 0; i < this.eligibilityTestList.length; i++) {
            for (var j = 0; j < this.eligibilityTestList[i].row.length; j++) {
                totalQues++;
                if ((this.eligibilityTestList[i].row[j].UserEligibilityAnswer == '') || (this.eligibilityTestList[i].row[j].UserEligibilityAnswer == null) || (this.eligibilityTestList[i].row[j].UserEligibilityAnswer == undefined)) {
                    TotalUnanswered++;
                }
                else {
                    count++;
                    var item = { EligibilityItemId: this.eligibilityTestList[i].row[j].EligibilityItemId, AnswerForEligibility: this.eligibilityTestList[i].row[j].AnswerForEligibility,
                        UserEligibilityAnswer: this.eligibilityTestList[i].row[j].UserEligibilityAnswer };
                    this.eligibilityTestEntity.EligibilityAnswers.push(item);
                    this.eligibilityTestEntity.EligibilityCriteria = this.eligibilityTestList[i].row[j].EligibilityCriteria;
                }
            }
        }
        this.eligibilityTestEntity.IsActive = 1;
        console.log(this.eligibilityTestEntity);
        if (TotalUnanswered == 0) {
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.EligibilityTestService.addEligibilityAnswer(this.eligibilityTestEntity)
                .then(function (data) {
                if (data == 'Eligible') {
                    swal({
                        //position: 'top-end',
                        type: _this.globals.commonTranslationText.eligibilityTestPage.alerts.eligible.type,
                        title: _this.globals.commonTranslationText.eligibilityTestPage.alerts.eligible.title,
                        text: _this.globals.commonTranslationText.eligibilityTestPage.alerts.eligible.text
                    });
                }
                else {
                    swal({
                        //position: 'top-end',
                        type: _this.globals.commonTranslationText.eligibilityTestPage.alerts.notEligible.type,
                        title: _this.globals.commonTranslationText.eligibilityTestPage.alerts.notEligible.title,
                        text: _this.globals.commonTranslationText.eligibilityTestPage.alerts.notEligible.text
                    });
                }
                _this.router.navigate(['/login']);
                _this.globals.isLoading = false;
            }, function (error) {
                _this.btn_disable = false;
                _this.globals.isLoading = false;
                if (error.text) {
                    swal({
                        //position: 'top-end',
                        type: 'error',
                        title: 'Oops...',
                        text: "Something went wrong!"
                    });
                }
            });
        }
        else {
            swal({
                type: this.globals.commonTranslationText.eligibilityTestPage.alerts.type,
                title: this.globals.commonTranslationText.eligibilityTestPage.alerts.title,
                text: this.globals.commonTranslationText.eligibilityTestPage.alerts.text,
                showConfirmButton: true
            });
        }
    };
    EligibilityTestComponent = tslib_1.__decorate([
        Component({
            selector: 'app-eligibility-test',
            templateUrl: './eligibility-test.component.html',
            styleUrls: ['./eligibility-test.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, AuthService, EligibilityTestService, Globals])
    ], EligibilityTestComponent);
    return EligibilityTestComponent;
}());
export { EligibilityTestComponent };
//# sourceMappingURL=eligibility-test.component.js.map