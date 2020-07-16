import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DiscountCouponService } from '../services/discount-coupon.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { orderBy } from '@progress/kendo-data-query';
var DiscountCouponListComponent = /** @class */ (function () {
    function DiscountCouponListComponent(globals, router, route, DiscountCouponService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.DiscountCouponService = DiscountCouponService;
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
                    field: "DiscountType",
                    dir: 'asc'
                }]
        };
        this.state = {
            skip: 0,
            take: this.pageSize
        };
        this.sort = [{
                field: 'DiscountType',
                dir: 'asc'
            }];
    }
    DiscountCouponListComponent.prototype.ngOnInit = function () {
        this.globals.isLoading = true;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–AllDiscountCoupons–' + todaysdate;
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
        this.getDiscountData();
    };
    // getDiscountData Listing
    DiscountCouponListComponent.prototype.getDiscountData = function () {
        var _this = this;
        this.DiscountCouponService.getAllDiscount(this.paginationEntity)
            .then(function (data) {
            _this.discountCouponList = {
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
    DiscountCouponListComponent.prototype.pageChange = function (event) {
        this.globals.isLoading = true;
        this.skip = event.skip;
        this.paginationEntity.offset = (event.skip / this.pageSize) + 1;
        this.getDiscountData();
    };
    // sortOrder change Event
    DiscountCouponListComponent.prototype.sortChange = function (sort) {
        if (sort.dir != "undefined") {
            this.sort = sort;
            this.paginationEntity.sortOrder = [];
            this.paginationEntity.sortOrder = sort;
            this.getDiscountData();
        }
    };
    // Filter event
    DiscountCouponListComponent.prototype.onFilter = function (inputValue) {
        this.globals.isLoading = true;
        if (inputValue != "") {
            this.paginationEntity.offset = 1;
            this.paginationEntity.searchData.searchQuery = inputValue;
            this.getDiscountData();
        }
        else {
            this.paginationEntity.searchData.searchQuery = '';
            this.pageChange(this.state);
        }
    };
    DiscountCouponListComponent.prototype.edit = function (id) {
        this.router.navigate(['/admin/discount-coupon/edit/' + window.btoa(id)]);
    };
    DiscountCouponListComponent.prototype.deleteDiscountCoupon = function (discountCoupon) {
        var _this = this;
        swal({
            title: this.globals.adminTranslationText.discountCoupon.list.alerts.deleteConfirm.title,
            text: this.globals.adminTranslationText.discountCoupon.list.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.adminTranslationText.discountCoupon.list.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                discountCoupon.UserId = _this.globals.authData.UserId;
                discountCoupon.Id = discountCoupon.DiscountCouponId;
                discountCoupon.TableName = 'tblmstdiscountcoupons';
                discountCoupon.FieldName = 'DiscountCouponId';
                discountCoupon.Module = 'Discount Coupon';
                discountCoupon.ActivityText = 'Delete Discount Coupon';
                discountCoupon.ModuleId = 2;
                _this.globals.isLoading = true;
                _this.CommonService.deleteItem(discountCoupon)
                    .then(function (data) {
                    _this.getDiscountData();
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.discountCoupon.list.alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.discountCoupon.list.alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.discountCoupon.list.alerts.deleteSuccess.text,
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
    DiscountCouponListComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        debugger;
        if (i) {
            changeEntity.IsActive = 1;
        }
        else {
            changeEntity.IsActive = 0;
        }
        this.globals.isLoading = true;
        changeEntity.UpdatedBy = this.globals.authData.UserId;
        changeEntity.Id = changeEntity.DiscountCouponId;
        changeEntity.TableName = 'tblmstdiscountcoupons';
        changeEntity.FieldName = 'DiscountCouponId';
        changeEntity.Module = 'Discount Coupon';
        changeEntity.ModuleId = 2;
        if (changeEntity.IsActive == 1) {
            changeEntity.ActivityText = "Discount Coupon Activated";
        }
        else {
            changeEntity.ActivityText = "Discount Coupon Deactivated";
        }
        this.CommonService.isActiveChange(changeEntity)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (changeEntity.IsActive == 0) {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.discountCoupon.list.alerts.deactiveSuccess.type,
                    title: _this.globals.adminTranslationText.discountCoupon.list.alerts.deactiveSuccess.title,
                    text: _this.globals.adminTranslationText.discountCoupon.list.alerts.deactiveSuccess.text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
            else {
                swal({
                    //position: 'top-end',
                    type: _this.globals.adminTranslationText.discountCoupon.list.alerts.activeSuccess.type,
                    title: _this.globals.adminTranslationText.discountCoupon.list.alerts.activeSuccess.title,
                    text: _this.globals.adminTranslationText.discountCoupon.list.alerts.activeSuccess.text,
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
    ], DiscountCouponListComponent.prototype, "dataBinding", void 0);
    DiscountCouponListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-discount-coupon-list',
            templateUrl: './discount-coupon-list.component.html',
            styleUrls: ['./discount-coupon-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            DiscountCouponService, CommonService])
    ], DiscountCouponListComponent);
    return DiscountCouponListComponent;
}());
export { DiscountCouponListComponent };
//# sourceMappingURL=discount-coupon-list.component.js.map