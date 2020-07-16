import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var CountryListComponent = /** @class */ (function () {
    function CountryListComponent(globals, router, route, CountryService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CountryService = CountryService;
        this.CommonService = CommonService;
        this.pageSize = this.globals.pageSize;
        this.allowUnsort = true;
        this.skip = 0;
        this.paginationEntity = {
            limit: this.pageSize,
            offset: 1,
            searchData: {
                status: '',
                searchQuery: ''
            },
            sortOrder: [{
                    field: "CountryName",
                    dir: 'desc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'CountryName',
                dir: 'desc'
            }];
    }
    CountryListComponent.prototype.ngOnInit = function () {
        debugger;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment-CountryList–' + todaysdate;
        setTimeout(function () {
            $(document).ready(function () {
                var body = document.querySelector('body');
                body.style.setProperty('--screen-height', $(window).height() + "px");
            });
            new PerfectScrollbar('.content_height');
        }, 100);
        this.globals.isLoading = true;
        this.getCountryData();
    };
    // getCountry Data Listing
    CountryListComponent.prototype.getCountryData = function () {
        var _this = this;
        this.CountryService.getCountryAll(this.paginationEntity)
            .then(function (data) {
            _this.countryList = {
                data: (data.totalRecord > 0) ? orderBy(data.result, _this.sort) : '',
                total: data.totalRecord,
            };
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    // pageChange Event
    CountryListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getCountryData();
    };
    // sortOrder change Event
    CountryListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getCountryData();
        }
    };
    // Filter event
    CountryListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getCountryData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    CountryListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/country/edit/' + window.btoa(id)]);
    };
    CountryListComponent.prototype.isActiveChange = function (activeEntity, i) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        if (i) {
            activeEntity.IsActive = 1;
        }
        else {
            activeEntity.IsActive = 0;
        }
        activeEntity.Id = activeEntity.CountryId;
        activeEntity.UpdatedBy = this.globals.authData.UserId;
        activeEntity.TableName = 'tblmstcountry';
        activeEntity.FieldName = 'CountryId';
        activeEntity.Module = 'Country';
        this.CommonService.isActiveChange(activeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (activeEntity.IsActive == 0) {
                swal({
                    type: _this.globals.adminTranslationText.country.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.country.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.country.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            else {
                swal({
                    type: _this.globals.adminTranslationText.country.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.country.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.country.list.alerts.activeSuccess.text,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    CountryListComponent.prototype.deleteItem = function (country) {
        var _this = this;
        this.deleteEntity = country;
        swal({
            type: this.globals.adminTranslationText.country.list.alerts.deleteConfirm.type,
            title: this.globals.adminTranslationText.country.list.alerts.deleteConfirm.title + ' - ' + country.CountryName,
            text: this.globals.adminTranslationText.country.list.alerts.deleteConfirm.text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                country.Id = country.CountryId;
                country.UserId = _this.globals.authData.UserId;
                country.TableName = 'tblmstcountry';
                country.FieldName = 'CountryId';
                country.Module = 'Country';
                _this.globals.isLoading = true;
                _this.CommonService.deleteItem(country)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.getCountryData();
                    swal({
                        type: _this.globals.adminTranslationText.country.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.country.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.country.list.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], CountryListComponent.prototype, "dataBinding", void 0);
    CountryListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-country-list',
            templateUrl: './country-list.component.html',
            styleUrls: ['./country-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            CountryService, CommonService])
    ], CountryListComponent);
    return CountryListComponent;
}());
export { CountryListComponent };
//# sourceMappingURL=country-list.component.js.map