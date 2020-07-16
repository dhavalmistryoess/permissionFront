import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var CountryListDummyComponent = /** @class */ (function () {
    function CountryListDummyComponent(globals, router, route, CountryService, CommonService) {
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
                    dir: 'asc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'CountryName',
                dir: 'asc'
            }];
    }
    CountryListDummyComponent.prototype.ngOnInit = function () {
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
    CountryListDummyComponent.prototype.getCountryData = function () {
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
    CountryListDummyComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getCountryData();
    };
    // sortOrder change Event
    CountryListDummyComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getCountryData();
        }
    };
    // Filter event
    CountryListDummyComponent.prototype.onFilter = function (inputValue) {
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
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], CountryListDummyComponent.prototype, "dataBinding", void 0);
    CountryListDummyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-country-list-dummy',
            templateUrl: './country-list-dummy.component.html',
            styleUrls: ['./country-list-dummy.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            CountryService, CommonService])
    ], CountryListDummyComponent);
    return CountryListDummyComponent;
}());
export { CountryListDummyComponent };
//# sourceMappingURL=country-list-dummy.component.js.map