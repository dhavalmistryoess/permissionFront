import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DiscountCouponService } from '../services/discount-coupon.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-discount-coupon-list',
  templateUrl: './discount-coupon-list.component.html',
  styleUrls: ['./discount-coupon-list.component.css']
})
export class DiscountCouponListComponent implements OnInit {

  deleteEntity;
  todaysdate;
  exportName;
  discountCouponList : any;
  pageSize = this.globals.pageSize;
  allowUnsort = true;
  skip = 0;
  paginationEntity = {
    limit: this.pageSize,
    offset:1,
    searchData:{
      status: '',
      searchQuery : ''
    },
    sortOrder:[{
      field: "DiscountType",
      dir: 'asc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'DiscountType',
    dir: 'asc'
  }];

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private DiscountCouponService: DiscountCouponService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  ngOnInit() {
    this.globals.isLoading = true;
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–AllDiscountCoupons–' + todaysdate;
    $(document).ready(function () {
      const body = document.querySelector('body');
      body.style.setProperty('--screen-height', $(window).height() + "px");
    });
    this.getDiscountData();
 }


 // getDiscountData Listing
 getDiscountData() {
  this.DiscountCouponService.getAllDiscount(this.paginationEntity)
    .then((data: any) => {
      this.discountCouponList = {
        data: (data.totalRecord > 0) ? orderBy(data.result, this.sort) : '',
        total: data.totalRecord,
      }
      this.globals.isLoading = false;
    },
      (error) => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      });
}

// pageChange Event
public pageChange(event: PageChangeEvent): void {
  this.globals.isLoading = true;
  this.skip = event.skip;
  this.paginationEntity.offset =  (event.skip / this.pageSize) + 1;
  this.getDiscountData();    
}

// sortOrder change Event
public sortChange(sort: any): void {
  if(sort.dir != "undefined") {
      this.sort = sort;
      this.paginationEntity.sortOrder = [];
      this.paginationEntity.sortOrder = sort;
      this.getDiscountData();
  }
}

// Filter event
public onFilter(inputValue: string): void {
  this.globals.isLoading = true;
  if(inputValue != "") {
    this.paginationEntity.offset = 1;
    this.paginationEntity.searchData.searchQuery =  inputValue;
    this.getDiscountData();
  } else {
    this.paginationEntity.searchData.searchQuery =  '';
    this.pageChange(this.state);
  }
}

  edit(id) {
    this.router.navigate(['/admin/discount-coupon/edit/' + window.btoa(id)]);
  }

  deleteDiscountCoupon(discountCoupon) {
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
      .then((result) => {
        if (result.value) {
          discountCoupon.UserId = this.globals.authData.UserId;
          discountCoupon.Id = discountCoupon.DiscountCouponId;
          discountCoupon.TableName = 'tblmstdiscountcoupons';
          discountCoupon.FieldName = 'DiscountCouponId';
          discountCoupon.Module = 'Discount Coupon';
          discountCoupon.ActivityText = 'Delete Discount Coupon';
          discountCoupon.ModuleId = 2;
          this.globals.isLoading = true;
          this.CommonService.deleteItem(discountCoupon)
            .then((data) => {
              this.getDiscountData();
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.discountCoupon.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.discountCoupon.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.discountCoupon.list.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
            },
              (error) => {
                this.globals.isLoading = false;
                this.globals.pageNotfound(error.error.code);
              });
        }
      })
  }


  isActiveChange(changeEntity, i) {
    debugger
    if (i) {
      changeEntity.IsActive = 1;
    } else {
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
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.discountCoupon.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.discountCoupon.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.discountCoupon.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.discountCoupon.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.discountCoupon.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.discountCoupon.list.alerts.activeSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }

  
}
