import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InquireService } from '../services/inquire.service';
import { AuthService } from '../services/auth.service';
import { Globals } from '../globals';
var InquireComponent = /** @class */ (function () {
    function InquireComponent(router, globals, route, InquireService, AuthService) {
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.InquireService = InquireService;
        this.AuthService = AuthService;
    }
    InquireComponent.prototype.ngOnInit = function () {
        var _this = this;
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
        setTimeout(function () {
            $('select').selectpicker();
        }, 1000);
        this.setEntityData();
        this.defaultContactEntity = {};
        this.defaultContactEntity.Latitude = '';
        this.defaultContactEntity.Longitude = '';
        debugger;
        this.AuthService.getAllDefault()
            .then(function (data) {
            _this.defaultContactEntity = data;
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            // if (error.text) {
            //   swal({
            //     //position: 'top-end',
            //     type: 'error',
            //     title: 'Oops...',
            //     text: "Something went wrong!"
            //   })
            // }
            _this.globals.pageNotfound(error.error.code);
        });
        var text_max = 500;
        $('#count_message').html('0 / ' + text_max);
        $('#contact_us').keyup(function () {
            var text_length = $('#contact_us').val().length;
            var text_remaining = text_max - text_length;
            $('#count_message').html(text_length + ' / ' + text_max);
        });
        setTimeout(function () {
            var uluru = { lat: parseFloat(this.defaultContactEntity.Latitude), lng: parseFloat(this.defaultContactEntity.Longitude) };
            var zoom_in = 12;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: zoom_in,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                draggable: false
            });
        }, 200);
        this.isDisable = false;
        if (this.globals.authData)
            this.isDisable = true;
        else
            this.isDisable = false;
    };
    InquireComponent.prototype.sendMessage = function (inquireForm) {
        var _this = this;
        debugger;
        this.submitted = true;
        if (inquireForm.valid) {
            this.btn_disable = true;
            this.globals.isLoading = true;
            if (this.globals.authData)
                this.inquireEntity.UserId = this.globals.authData.UserId;
            else
                this.inquireEntity.UserId = 0;
            this.inquireEntity.LoginURL = '/login';
            this.inquireEntity.InquireId = 0;
            this.InquireService.sendMessage(this.inquireEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                inquireForm.form.markAsPristine();
                swal({
                    type: _this.globals.commonTranslationText.inquirePage.alerts.success.type,
                    title: _this.globals.commonTranslationText.inquirePage.alerts.success.title,
                    text: _this.globals.commonTranslationText.inquirePage.alerts.success.text,
                    showConfirmButton: false,
                    timer: 2000
                });
                var text_max = 500;
                $('#count_message').html('0 / ' + text_max);
                _this.setEntityData();
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted = false;
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                // this.globals.pageNotfound(error.error.code);
            });
        }
    };
    InquireComponent.prototype.setEntityData = function () {
        this.inquireEntity = {};
        if (this.globals.authData) {
            this.inquireEntity.FirstName = this.globals.authData.FirstName;
            this.inquireEntity.LastName = this.globals.authData.LastName;
            this.inquireEntity.EmailAddress = this.globals.authData.EmailAddress;
        }
        else {
            this.inquireEntity.FirstName = '';
            this.inquireEntity.LastName = '';
            this.inquireEntity.EmailAddress = '';
        }
        this.inquireEntity.PhoneNumber = "";
        this.inquireEntity.Message = "";
    };
    InquireComponent = tslib_1.__decorate([
        Component({
            selector: 'app-inquire',
            templateUrl: './inquire.component.html',
            styleUrls: ['./inquire.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Globals, ActivatedRoute, InquireService, AuthService])
    ], InquireComponent);
    return InquireComponent;
}());
export { InquireComponent };
//# sourceMappingURL=inquire.component.js.map