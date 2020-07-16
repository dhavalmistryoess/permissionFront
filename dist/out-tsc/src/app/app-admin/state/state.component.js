import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { CountryService } from '../services/country.service';
var StateComponent = /** @class */ (function () {
    function StateComponent(globals, router, route, StateService, CountryService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.StateService = StateService;
        this.CountryService = CountryService;
    }
    StateComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.stateEntity = {};
        this.countryList = [];
        this.globals.isLoading = false;
        setTimeout(function () {
            $(document).ready(function () {
                var body = document.querySelector('body');
                body.style.setProperty('--screen-height', $(window).height() + "px");
            });
            new PerfectScrollbar('.content_height');
        }, 100);
        this.globals.isLoading = true;
        this.CountryService.getActivated()
            .then(function (data) {
            //  this.countryList = data;
            var data1;
            data1 = data;
            var countrySelect = {
                CountryId: '',
                CountryName: _this.globals.adminTranslationText.country.form.countryName.select,
                Value: ""
            };
            _this.countryList.push(countrySelect);
            _this.countryList = _this.countryList.concat(data1);
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            // this.router.navigate(['/pagenotfound']);
            _this.globals.pageNotfound(error.error.code);
        });
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            id = window.atob(id);
            this.globals.isLoading = true;
            this.StateService.getById(id)
                .then(function (data) {
                _this.stateEntity = data;
                console.log(_this.stateEntity);
                if (data['IsActive'] == 0) {
                    _this.stateEntity.IsActive = false;
                }
                else {
                    _this.stateEntity.IsActive = true;
                }
                _this.globals.isLoading = false;
            }, function (error) {
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                // this.router.navigate(['/pagenotfound']);
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.stateEntity = {};
            this.stateEntity.StateId = 0;
            this.stateEntity.IsActive = true;
            this.stateEntity.CountryId = '';
        }
        setTimeout(function () {
            $('select').selectpicker();
        }, 5000);
    };
    StateComponent.prototype.addUpdate = function (stateForm) {
        var _this = this;
        debugger;
        // let id = window.atob(this.route.snapshot.paramMap.get('id'));
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            if (this.stateEntity.IsActive == true) {
                this.stateEntity.IsActive = true;
            }
            else {
                this.stateEntity.IsActive = false;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (stateForm.valid) {
            this.stateEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.StateService.addUpdate(this.stateEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.stateEntity = {};
                stateForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.state.form.alerts.update.type,
                        title: _this.globals.adminTranslationText.state.form.alerts.update.title,
                        text: _this.globals.adminTranslationText.state.form.alerts.update.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.state.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.state.form.alerts.add.title,
                        text: _this.globals.adminTranslationText.state.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                _this.router.navigate(['/admin/state/list']);
            }, function (error) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                if (error.status == 302) {
                    swal({
                        type: _this.globals.adminTranslationText.state.form.alerts.duplicateAbbreviation.type,
                        title: _this.globals.adminTranslationText.state.form.alerts.duplicateAbbreviation.title,
                        text: _this.globals.adminTranslationText.state.form.alerts.duplicateAbbreviation.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else {
                    // swal({
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   showConfirmButton: false,
                    //   timer: 4000
                    // })
                    _this.globals.pageNotfound(error.error.code);
                }
            });
        }
    };
    StateComponent = tslib_1.__decorate([
        Component({
            selector: 'app-state',
            templateUrl: './state.component.html',
            styleUrls: ['./state.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, StateService, CountryService])
    ], StateComponent);
    return StateComponent;
}());
export { StateComponent };
//# sourceMappingURL=state.component.js.map