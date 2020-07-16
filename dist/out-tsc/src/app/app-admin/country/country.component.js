import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
var CountryComponent = /** @class */ (function () {
    function CountryComponent(globals, router, route, CountryService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CountryService = CountryService;
    }
    CountryComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = false;
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            id = window.atob(id);
            this.globals.isLoading = true;
            this.CountryService.getById(id)
                .then(function (data) {
                _this.countryEntity = data;
                if (data['IsActive'] == 0) {
                    _this.countryEntity.IsActive = false;
                }
                else {
                    _this.countryEntity.IsActive = true;
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
            this.countryEntity = {};
            this.countryEntity.CountryId = 0;
            this.countryEntity.IsActive = true;
        }
    };
    CountryComponent.prototype.addUpdate = function (countryForm) {
        var _this = this;
        debugger;
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            if (this.countryEntity.IsActive == true) {
                this.countryEntity.IsActive = true;
            }
            else {
                this.countryEntity.IsActive = false;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (countryForm.valid) {
            this.countryEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.CountryService.addUpdate(this.countryEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.countryEntity = {};
                countryForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.country.form.alerts.update.type,
                        title: _this.globals.adminTranslationText.country.form.alerts.update.title,
                        text: _this.globals.adminTranslationText.country.form.alerts.update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.country.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.country.form.alerts.add.title,
                        text: _this.globals.adminTranslationText.country.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate(['/admin/country/list']);
            }, function (error) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                if (error.status == 302) {
                    swal({
                        type: _this.globals.adminTranslationText.country.form.alerts.duplicateAbbreviation.type,
                        title: _this.globals.adminTranslationText.country.form.alerts.duplicateAbbreviation.title,
                        text: _this.globals.adminTranslationText.country.form.alerts.duplicateAbbreviation.text,
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
    CountryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-country',
            templateUrl: './country.component.html',
            styleUrls: ['./country.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, CountryService])
    ], CountryComponent);
    return CountryComponent;
}());
export { CountryComponent };
//# sourceMappingURL=country.component.js.map