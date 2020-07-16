import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DiscountCouponService } from '../services/discount-coupon.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
var DiscountCouponComponent = /** @class */ (function () {
    function DiscountCouponComponent(globals, router, route, DiscountCouponService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.DiscountCouponService = DiscountCouponService;
    }
    DiscountCouponComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = false;
        this.discountTypeList = [];
        this.currencyTypeList = [];
        this.discountCouponEntity = {};
        this.ValidFromDate = false;
        this.ValidToDate = false;
        this.DateValid = false;
        setTimeout(function () {
            $('.form_date').datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 1,
                forceParse: 0,
                pickTime: false,
                format: 'mm/dd/yyyy',
            });
        }, 1000);
        this.DiscountCouponService.getAllDefault()
            .then(function (data) {
            var discountTypeSelect = {
                ConfigurationId: '',
                DisplayText: _this.globals.adminTranslationText.discountCoupon.form.discountType.select,
                Value: ""
            };
            _this.discountTypeList.push(discountTypeSelect);
            _this.discountTypeList = _this.discountTypeList.concat(data['DocumentTypes']);
            var currencyTypeSelect = {
                ConfigurationId: '',
                DisplayText: _this.globals.adminTranslationText.discountCoupon.form.currencyType.select,
                Value: ""
            };
            _this.currencyTypeList.push(currencyTypeSelect);
            _this.currencyTypeList = _this.currencyTypeList.concat(data['CurrencyTypes']);
            // this.discountTypeList = data['DocumentTypes'];
            // this.currencyTypeList = data['CurrencyTypes'];
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
        //let id = window.atob(this.route.snapshot.paramMap.get('id'));
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            id = window.atob(id);
            this.globals.isLoading = true;
            this.DiscountCouponService.getById(id)
                .then(function (data) {
                _this.discountCouponEntity = data;
                _this.discountCouponEntity.ValidFrom = new Date(_this.discountCouponEntity.ValidFrom);
                _this.discountCouponEntity.ValidTo = new Date(_this.discountCouponEntity.ValidTo);
                console.log(_this.discountCouponEntity);
                if (data['IsActive'] == 1) {
                    _this.discountCouponEntity.IsActive = true;
                }
                else {
                    _this.discountCouponEntity.IsActive = false;
                }
                _this.discountCouponEntity.Value = _this.discountCouponEntity.Value.replace(".00", "");
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
            this.discountCouponEntity = {};
            this.discountCouponEntity.DiscountCouponId = 0;
            this.discountCouponEntity.CurrencyTypeId = '';
            this.discountCouponEntity.DiscountTypeId = '';
            this.discountCouponEntity.IsActive = true;
        }
        setTimeout(function () {
            $('select').selectpicker();
        }, 5000);
    };
    DiscountCouponComponent.prototype.addUpdate = function (discountCouponForm) {
        var _this = this;
        debugger;
        var id = this.route.snapshot.paramMap.get('id');
        var d = new Date(this.discountCouponEntity.ValidFrom);
        var ValidFromMonth = d.getMonth() + 1;
        var ValidFromDate = d.getDate();
        var ValidFromYear = d.getFullYear();
        this.discountCouponEntity.ValidFrom = ValidFromYear + '/' + (ValidFromMonth < 10 ? '0' + ValidFromMonth : '' + ValidFromMonth) + '/' + ((ValidFromDate < 10 ? '0' + ValidFromDate : '' + ValidFromDate));
        var d1 = new Date(this.discountCouponEntity.ValidTo);
        var ValidToMonth = d1.getMonth() + 1;
        var ValidToDate = d1.getDate();
        var ValidToYear = d1.getFullYear();
        this.discountCouponEntity.ValidTo = ValidToYear + '/' + (ValidToMonth < 10 ? '0' + ValidToMonth : '' + ValidToMonth) + '/' + (ValidToDate < 10 ? '0' + ValidToDate : '' + ValidToDate);
        // this.discountCouponEntity.ValidFrom = $("#ValidFrom").val();
        // this.discountCouponEntity.ValidTo = $("#ValidTo").val();
        if ((this.discountCouponEntity.ValidFrom != "" || this.discountCouponEntity.ValidFrom != null || this.discountCouponEntity.ValidFrom != undefined) || (this.discountCouponEntity.ValidTo != "" || this.discountCouponEntity.ValidTo != null || this.discountCouponEntity.ValidTo != undefined)) {
            if (this.discountCouponEntity.ValidFrom > this.discountCouponEntity.ValidTo) {
                this.DateValid = true;
            }
            else {
                this.DateValid = false;
            }
        }
        if (this.discountCouponEntity.ValidFrom == "" || this.discountCouponEntity.ValidFrom == null || this.discountCouponEntity.ValidFrom == undefined || this.discountCouponEntity.ValidFrom == "NaN/NaN/NaN") {
            this.ValidFromDate = true;
        }
        else {
            this.ValidFromDate = false;
        }
        if (this.discountCouponEntity.ValidTo == "" || this.discountCouponEntity.ValidTo == null || this.discountCouponEntity.ValidTo == undefined || this.discountCouponEntity.ValidTo == "NaN/NaN/NaN") {
            this.ValidToDate = true;
        }
        else {
            this.ValidToDate = false;
        }
        if (id) {
            if (this.discountCouponEntity.IsActive == 1) {
                this.discountCouponEntity.IsActive = true;
            }
            else {
                this.discountCouponEntity.IsActive = false;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (discountCouponForm.valid && !this.ValidFromDate && !this.ValidToDate && !this.DateValid) {
            this.discountCouponEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.DiscountCouponService.addUpdate(this.discountCouponEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.discountCouponEntity = {};
                discountCouponForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.discountCoupon.form.alerts.update.type,
                        title: _this.globals.adminTranslationText.discountCoupon.form.alerts.update.title,
                        text: _this.globals.adminTranslationText.discountCoupon.form.alerts.update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.discountCoupon.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.discountCoupon.form.alerts.add.title,
                        text: _this.globals.adminTranslationText.discountCoupon.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate(['/admin/discount-coupon/list']);
            }, function (error) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                _this.globals.pageNotfound(error.error.code);
            });
        }
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], DiscountCouponComponent.prototype, "dataBinding", void 0);
    DiscountCouponComponent = tslib_1.__decorate([
        Component({
            selector: 'app-discount-coupon',
            templateUrl: './discount-coupon.component.html',
            styleUrls: ['./discount-coupon.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, DiscountCouponService])
    ], DiscountCouponComponent);
    return DiscountCouponComponent;
}());
export { DiscountCouponComponent };
//# sourceMappingURL=discount-coupon.component.js.map