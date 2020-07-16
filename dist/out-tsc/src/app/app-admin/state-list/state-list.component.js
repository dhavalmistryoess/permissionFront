import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var StateListComponent = /** @class */ (function () {
    function StateListComponent(globals, router, route, StateService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.StateService = StateService;
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
    StateListComponent.prototype.ngOnInit = function () {
        debugger;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment-StateList–' + todaysdate;
        this.globals.isLoading = true;
        this.getStateData();
    };
    // getCountry Data Listing
    StateListComponent.prototype.getStateData = function () {
        var _this = this;
        this.StateService.getStateAll(this.paginationEntity)
            .then(function (data) {
            _this.stateList = {
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
    StateListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getStateData();
    };
    // sortOrder change Event
    StateListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getStateData();
        }
    };
    // Filter event
    StateListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getStateData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    StateListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/state/edit/' + window.btoa(id)]);
    };
    StateListComponent.prototype.isActiveChange = function (activeEntity, i) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        if (i) {
            activeEntity.IsActive = 1;
        }
        else {
            activeEntity.IsActive = 0;
        }
        activeEntity.Id = activeEntity.StateId;
        activeEntity.UpdatedBy = this.globals.authData.UserId;
        activeEntity.TableName = 'tblmststate';
        activeEntity.FieldName = 'StateId';
        activeEntity.Module = 'State';
        this.CommonService.isActiveChange(activeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (activeEntity.IsActive == 0) {
                swal({
                    type: _this.globals.adminTranslationText.state.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.state.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.state.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            else {
                swal({
                    type: _this.globals.adminTranslationText.state.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.state.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.state.list.alerts.activeSuccess.text,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    StateListComponent.prototype.deleteItem = function (state) {
        var _this = this;
        this.deleteEntity = state;
        swal({
            type: this.globals.adminTranslationText.state.list.alerts.deleteConfirm.type,
            title: this.globals.adminTranslationText.state.list.alerts.deleteConfirm.title + ' - ' + state.StateName,
            text: this.globals.adminTranslationText.state.list.alerts.deleteConfirm.text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                debugger;
                state.Id = state.StateId;
                state.UserId = _this.globals.authData.UserId;
                state.TableName = 'tblmststate';
                state.FieldName = 'StateId';
                state.Module = 'State';
                _this.globals.isLoading = true;
                _this.CommonService.deleteItem(state)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    _this.getStateData();
                    swal({
                        type: _this.globals.adminTranslationText.state.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.state.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.state.list.alerts.deleteSuccess.text,
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
    ], StateListComponent.prototype, "dataBinding", void 0);
    StateListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-state-list',
            templateUrl: './state-list.component.html',
            styleUrls: ['./state-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            StateService, CommonService])
    ], StateListComponent);
    return StateListComponent;
}());
export { StateListComponent };
//# sourceMappingURL=state-list.component.js.map