import * as tslib_1 from "tslib";
import { Component, ViewChild } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../services/item.service";
import { CommonService } from "../services/common.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { orderBy } from "@progress/kendo-data-query";
var ItemListComponent = /** @class */ (function () {
    function ItemListComponent(globals, router, route, ItemService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.ItemService = ItemService;
        this.CommonService = CommonService;
        this.pageSize = this.globals.pageSize;
        this.allowUnsort = true;
        this.skip = 0;
        this.paginationEntity = {
            limit: this.pageSize,
            offset: 1,
            searchData: {
                status: "",
                searchQuery: ""
            },
            sortOrder: [
                {
                    field: "CategoryName",
                    dir: "asc"
                }
            ]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [
            {
                field: "CategoryName",
                dir: "asc"
            }
        ];
    }
    ItemListComponent.prototype.ngOnInit = function () {
        this.globals.isLoading = true;
        var todaysdate = this.globals.todaysdate;
        this.exportName = "Assessment–AllItems–" + todaysdate;
        this.getItemData();
        // parth
        setTimeout(function () {
            $(".k-grid-table").kendoTooltip({
                autoHide: false,
                filter: "i",
                width: 400,
                height: 200,
                position: "top"
            });
        }, 5000);
    };
    // getItemData Listing
    ItemListComponent.prototype.getItemData = function () {
        var _this = this;
        this.ItemService.getItemAll(this.paginationEntity).then(function (data) {
            _this.itemList = {
                data: data.totalRecord > 0 ? orderBy(data.result, _this.sort) : "",
                total: data.totalRecord
            };
            _this.globals.isLoading = false;
            console.log(_this.itemList);
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    // pageChange Event
    ItemListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = event.skip / this.pageSize + 1;
        this.getItemData();
    };
    // sortOrder change Event
    ItemListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getItemData();
        }
    };
    // Filter event
    ItemListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getItemData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = "";
            this.pageChange(this.state);
        }
    };
    ItemListComponent.prototype.edit = function (id) {
        this.router.navigate(["/admin/item/edit/" + window.btoa(id)]);
    };
    ItemListComponent.prototype.deleteItem = function (item) {
        var _this = this;
        swal({
            title: this.globals.adminTranslationText.item.list.alerts.deleteConfirm
                .title,
            text: this.globals.adminTranslationText.item.list.alerts.deleteConfirm
                .text,
            icon: "warning",
            type: this.globals.adminTranslationText.item.list.alerts.deleteConfirm
                .type,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                item.UserId = _this.globals.authData.UserId;
                item.Id = item.ItemId;
                item.TableName = "tblmstitem";
                item.FieldName = "ItemId";
                item.Module = "Item";
                item.ModuleId = 2;
                item.ActivityText = "Delete Item";
                _this.globals.isLoading = true;
                debugger;
                _this.CommonService.deleteItem(item).then(function (data) {
                    _this.getItemData();
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.item.list.alerts
                            .deleteSuccess.type,
                        title: _this.globals.adminTranslationText.item.list.alerts
                            .deleteSuccess.title,
                        text: _this.globals.adminTranslationText.item.list.alerts
                            .deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    ItemListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        if (i) {
            changeEntity.IsActive = 1;
        }
        else {
            changeEntity.IsActive = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.ItemId;
        changeEntity.TableName = "tblmstitem";
        changeEntity.FieldName = "ItemId";
        changeEntity.Module = "Item";
        changeEntity.ModuleId = 2;
        if (changeEntity.IsActive == 1) {
            changeEntity.ActivityText = "Item Activated";
        }
        else {
            changeEntity.ActivityText = "Item Deactivated";
        }
        this.CommonService.isActiveChange(changeEntity).then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsActive == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.item.list.alerts
                        .deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.item.list.alerts
                        .deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.item.list.alerts
                        .deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.item.list.alerts
                        .activeSuccess.type,
                    title: _this.globals.adminTranslationText.item.list.alerts
                        .activeSuccess.title,
                    text: _this.globals.adminTranslationText.item.list.alerts
                        .activeSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    ItemListComponent.prototype.toggleValueChange = function (changeEntity, i) {
        var _this = this;
        debugger;
        if (i) {
            changeEntity.IsNoScoreItem = 1;
            changeEntity.fieldValue = 1;
        }
        else {
            changeEntity.IsNoScoreItem = 0;
            changeEntity.fieldValue = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.ItemId;
        changeEntity.TableName = "tblmstitem";
        changeEntity.FieldName = "ItemId";
        changeEntity.Module = "Item";
        changeEntity.field = "IsNoScoreItem";
        changeEntity.ModuleId = 2;
        if (changeEntity.IsNoScoreItem == 1) {
            changeEntity.ActivityText = "Is No Score Item Activated";
        }
        else {
            changeEntity.ActivityText = "Is No Score Item Deactivated";
        }
        this.CommonService.toggleValueChange(changeEntity).then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsNoScoreItem == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.item.list.alerts
                        .isNoScoredeactiveSuccess.type,
                    title: _this.globals.adminTranslationText.item.list.alerts
                        .isNoScoredeactiveSuccess.title,
                    text: _this.globals.adminTranslationText.item.list.alerts
                        .isNoScoredeactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.item.list.alerts
                        .isNoScoreactiveSuccess.type,
                    title: _this.globals.adminTranslationText.item.list.alerts
                        .isNoScoreactiveSuccess.title,
                    text: _this.globals.adminTranslationText.item.list.alerts
                        .isNoScoreactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], ItemListComponent.prototype, "dataBinding", void 0);
    ItemListComponent = tslib_1.__decorate([
        Component({
            selector: "app-item-list",
            templateUrl: "./item-list.component.html",
            styleUrls: ["./item-list.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [Globals,
            Router,
            ActivatedRoute,
            ItemService,
            CommonService])
    ], ItemListComponent);
    return ItemListComponent;
}());
export { ItemListComponent };
//# sourceMappingURL=item-list.component.js.map