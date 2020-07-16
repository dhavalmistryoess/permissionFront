import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DiscountCouponService } from '../services/discount-coupon.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-discount-coupon',
  templateUrl: './discount-coupon.component.html',
  styleUrls: ['./discount-coupon.component.css']
})
export class DiscountCouponComponent implements OnInit {

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private DiscountCouponService: DiscountCouponService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  discountCouponEntity;
  submitted;
  discountTypeList;
  currencyTypeList;
  btn_disable;
  ValidFromDate;
  ValidToDate;
  DateValid;
  errorEntity;
  ngOnInit() {
    debugger
    this.globals.isLoading = false;
    this.discountTypeList = [];
    this.currencyTypeList = [];
    this.discountCouponEntity = {};
    this.errorEntity = {};
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
      .then((data) => {
        var discountTypeSelect = {
          ConfigurationId: '',
          DisplayText: this.globals.adminTranslationText.discountCoupon.form.discountType.select,
          Value: ""
        }
        this.discountTypeList.push(discountTypeSelect);
        this.discountTypeList = [...this.discountTypeList, ...data['DocumentTypes']];

        var currencyTypeSelect = {
          ConfigurationId: '',
          DisplayText: this.globals.adminTranslationText.discountCoupon.form.currencyType.select,
          Value: ""
        }
        this.currencyTypeList.push(currencyTypeSelect);
        this.currencyTypeList = [...this.currencyTypeList, ...data['CurrencyTypes']];
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });



    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      id = window.atob(id);

      this.globals.isLoading = true;
      this.DiscountCouponService.getById(id)
        .then((data) => {
          this.discountCouponEntity = data;
          this.discountCouponEntity.ValidFrom = new Date(this.discountCouponEntity.ValidFrom);
          this.discountCouponEntity.ValidTo = new Date(this.discountCouponEntity.ValidTo);
          console.log(this.discountCouponEntity);
          if (data['IsActive'] == 1) {
            this.discountCouponEntity.IsActive = true;
          } else {
            this.discountCouponEntity.IsActive = false;
          }
          this.discountCouponEntity.Value = this.discountCouponEntity.Value.replace(".00", "");
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
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
  }

  addUpdate(discountCouponForm) {
    debugger
    let id = this.route.snapshot.paramMap.get('id');
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

    if ((this.discountCouponEntity.ValidFrom != "" || this.discountCouponEntity.ValidFrom != null || this.discountCouponEntity.ValidFrom != undefined) || (this.discountCouponEntity.ValidTo != "" || this.discountCouponEntity.ValidTo != null || this.discountCouponEntity.ValidTo != undefined)) {
      if (this.discountCouponEntity.ValidFrom > this.discountCouponEntity.ValidTo) {
        this.DateValid = true;
      } else {
        this.DateValid = false;
      }
    }
    if (this.discountCouponEntity.ValidFrom == "" || this.discountCouponEntity.ValidFrom == null || this.discountCouponEntity.ValidFrom == undefined || this.discountCouponEntity.ValidFrom == "NaN/NaN/NaN") {
      this.ValidFromDate = true;
    } else {
      this.ValidFromDate = false;
    }
    if (this.discountCouponEntity.ValidTo == "" || this.discountCouponEntity.ValidTo == null || this.discountCouponEntity.ValidTo == undefined || this.discountCouponEntity.ValidTo == "NaN/NaN/NaN") {
      this.ValidToDate = true;
    } else {
      this.ValidToDate = false;
    }

    if (id) {
      if (this.discountCouponEntity.IsActive == 1) {
        this.discountCouponEntity.IsActive = true;
      } else {
        this.discountCouponEntity.IsActive = false;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }

    if (discountCouponForm.valid && !this.ValidFromDate && !this.ValidToDate && !this.DateValid) {
      this.discountCouponEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.DiscountCouponService.addUpdate(this.discountCouponEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.discountCouponEntity = {};
          discountCouponForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.discountCoupon.form.alerts.update.type,
              title: this.globals.adminTranslationText.discountCoupon.form.alerts.update.title,
              text: this.globals.adminTranslationText.discountCoupon.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.discountCoupon.form.alerts.add.type,
              title: this.globals.adminTranslationText.discountCoupon.form.alerts.add.title,
              text: this.globals.adminTranslationText.discountCoupon.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
          this.router.navigate(['/admin/discount-coupon/list']);
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.error.code == 422) {
                this.errorEntity.CouponCode = (error.error.message.CouponCode != "") ? error.error.message.CouponCode : '';
                this.errorEntity.CurrencyTypeId = (error.error.message.CurrencyTypeId != "") ? error.error.message.CurrencyTypeId : '';
                this.errorEntity.DiscountTypeId = (error.error.message.DiscountTypeId != "") ? error.error.message.DiscountTypeId : '';
                this.errorEntity.ValidFrom = (error.error.message.ValidFrom != "") ? error.error.message.ValidFrom : '';
                this.errorEntity.ValidTo = (error.error.message.ValidTo != "") ? error.error.message.ValidTo : '';
                this.errorEntity.Value = (error.error.message.Value != "") ? error.error.message.Value : '';
            } else {
              this.globals.pageNotfound(error.error.code);
            }
          
          });
    }
  }

}
