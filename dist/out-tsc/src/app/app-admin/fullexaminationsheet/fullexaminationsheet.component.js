import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var FullexaminationsheetComponent = /** @class */ (function () {
    function FullexaminationsheetComponent(router, globals, route, DashboardService) {
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.DashboardService = DashboardService;
        this.mySelection = [];
        this.sort = [{
                field: 'StartTime',
                dir: 'asc'
            }];
    }
    FullexaminationsheetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examinationSheetList = {};
        this.filterEntity = {};
        this.shiftFilterList = [];
        this.shiftFilterList = [
            { label: "Morning", value: "12:00:00" },
            { label: "Afternoon", value: "17:00:00" },
            { label: "Evening", value: "20:00:00" }
        ];
        this.DashboardService.getexaminationSheet()
            .then(function (data) {
            _this.globals.isLoading = false;
            _this.gridData = data;
            _this.examinationSheetList = data;
            for (var i = 0; i < _this.examinationSheetList.length; i++) {
                var hour1 = (_this.examinationSheetList[i].StartTime.split(':'))[0];
                var min = (_this.examinationSheetList[i].StartTime.split(':'))[1];
                var part = hour1 > 12 ? 'pm' : 'am';
                min = (min + '').length == 1 ? "0" + min : min;
                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                _this.examinationSheetList[i].startTime = hour1 + ':' + min + part;
                var hour2 = (_this.examinationSheetList[i].EndTime.split(':'))[0];
                var min2 = (_this.examinationSheetList[i].EndTime.split(':'))[1];
                var part2 = hour2 > 12 ? 'pm' : 'am';
                min2 = (min2 + '').length == 1 ? "0" + min2 : min2;
                hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                hour2 = (hour2 + '').length == 1 ? "0" + hour2 : hour2;
                _this.examinationSheetList[i].endTime = hour2 + ':' + min2 + part;
            }
            console.log(data);
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   //position: 'top-end',
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            // this.router.navigate(['/pagenotfound']);
            _this.globals.pageNotfound(error.error.code);
        });
        this.DashboardService.getFilterDefaultData()
            .then(function (data) {
            _this.globals.isLoading = false;
            _this.addressList = data['Addresses'];
            _this.proctorList = data['Proctors'];
            //this.candidateList = data['Candidates'];
            console.log(data);
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   //position: 'top-end',
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            // this.router.navigate(['/pagenotfound']);
            _this.globals.pageNotfound(error.error.code);
        });
    };
    FullexaminationsheetComponent.prototype.SearchFilter = function (SearchFilterForm) {
        var _this = this;
        debugger;
        if (this.filterEntity.AssignDate != '' && this.filterEntity.AssignDate != undefined) {
            var d = new Date(this.filterEntity.AssignDate);
            var ValidFromMonth = d.getMonth() + 1;
            var ValidFromDate = d.getDate();
            var ValidFromYear = d.getFullYear();
            this.filterEntity.AssignDate = ValidFromYear + '-' + (ValidFromMonth < 10 ? '0' + ValidFromMonth : '' + ValidFromMonth) + '-' + ((ValidFromDate < 10 ? '0' + ValidFromDate : '' + ValidFromDate));
        }
        this.filterEntity.RoleId = this.globals.authData.RoleId;
        console.log(this.filterEntity);
        this.globals.isLoading = true;
        this.examinationSheetList = [];
        var todaysdate = this.globals.todaysdate;
        this.DashboardService.filterProctorDetails(this.filterEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            _this.examinationSheetList = data;
            _this.gridData = data;
            console.log(_this.examinationSheetList);
            _this.filterEntity = {};
            SearchFilterForm.form.markAsPristine();
            for (var i = 0; i < _this.examinationSheetList.length; i++) {
                var hour1 = (_this.examinationSheetList[i].StartTime.split(':'))[0];
                var min = (_this.examinationSheetList[i].StartTime.split(':'))[1];
                var part = hour1 > 12 ? 'pm' : 'am';
                min = (min + '').length == 1 ? "0" + min : min;
                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                _this.examinationSheetList[i].startTime = hour1 + ':' + min + part;
                var hour2 = (_this.examinationSheetList[i].EndTime.split(':'))[0];
                var min2 = (_this.examinationSheetList[i].EndTime.split(':'))[1];
                var part2 = hour2 > 12 ? 'pm' : 'am';
                min2 = (min2 + '').length == 1 ? "0" + min2 : min2;
                hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                hour2 = (hour2 + '').length == 1 ? "0" + hour2 : hour2;
                _this.examinationSheetList[i].endTime = hour2 + ':' + min2 + part;
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.examinationSheetList = [];
            _this.globals.pageNotfound(error.error.code);
        });
    };
    FullexaminationsheetComponent.prototype.clearData = function (SearchFilterForm) {
        var _this = this;
        this.examinationSheetList = [];
        this.globals.isLoading = true;
        this.DashboardService.getexaminationSheet()
            //.map(res => res.json())
            .then(function (data) {
            _this.filterEntity = {};
            _this.examinationSheetList = data;
            _this.gridData = data;
            for (var i = 0; i < _this.examinationSheetList.length; i++) {
                var hour1 = (_this.examinationSheetList[i].StartTime.split(':'))[0];
                var min = (_this.examinationSheetList[i].StartTime.split(':'))[1];
                var part = hour1 > 12 ? 'pm' : 'am';
                min = (min + '').length == 1 ? "0" + min : min;
                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                hour1 = (hour1 + '').length == 1 ? "0" + hour1 : hour1;
                _this.examinationSheetList[i].startTime = hour1 + ':' + min + part;
                var hour2 = (_this.examinationSheetList[i].EndTime.split(':'))[0];
                var min2 = (_this.examinationSheetList[i].EndTime.split(':'))[1];
                var part2 = hour2 > 12 ? 'pm' : 'am';
                min2 = (min2 + '').length == 1 ? "0" + min2 : min2;
                hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                hour2 = (hour2 + '').length == 1 ? "0" + hour2 : hour2;
                _this.examinationSheetList[i].endTime = hour2 + ':' + min2 + part;
            }
            _this.globals.isLoading = false;
            // SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    FullexaminationsheetComponent.prototype.onFilter = function (inputValue) {
        this.examinationSheetList = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'CountryName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'StateName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'City',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'Address1',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'AssignDate',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'StartTime',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'ProctorName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'PhoneNumber',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'candidates',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'Value',
                        operator: 'contains',
                        value: inputValue
                    }
                ],
            }
        }).data;
        this.dataBinding.skip = 0;
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], FullexaminationsheetComponent.prototype, "dataBinding", void 0);
    FullexaminationsheetComponent = tslib_1.__decorate([
        Component({
            selector: 'app-fullexaminationsheet',
            templateUrl: './fullexaminationsheet.component.html',
            styleUrls: ['./fullexaminationsheet.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Globals, ActivatedRoute, DashboardService])
    ], FullexaminationsheetComponent);
    return FullexaminationsheetComponent;
}());
export { FullexaminationsheetComponent };
//# sourceMappingURL=fullexaminationsheet.component.js.map