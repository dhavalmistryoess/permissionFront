import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, swal: any, Bloodhound: any;
declare function myInput(): any;

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  deleteEntity;
  exportName;
  countryList : any;
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
      field: "CountryName",
      dir: 'desc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'CountryName',
    dir: 'desc'
  }];
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private CountryService: CountryService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  ngOnInit() {
    debugger
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment-CountryList–' + todaysdate;


  
   

    setTimeout(function () {

      $(document).ready(function () {
        const body = document.querySelector('body');
        body.style.setProperty('--screen-height', $(window).height() + "px");
      });
      new PerfectScrollbar('.content_height');

    }, 100);

    this.globals.isLoading = true;
    this.getCountryData();
  }

  // getCountry Data Listing
  getCountryData() {
    this.CountryService.getCountryAll(this.paginationEntity)
      .then((data: any) => {
        this.countryList = {
          data: (data.totalRecord > 0) ? orderBy(data.result, this.sort) : '',
          total: data.totalRecord,
        }
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          // this.globals.pageNotfound(error.error.code);
        });
  }

  // pageChange Event
  public pageChange(event: PageChangeEvent): void {
    this.globals.isLoading = true;
    this.skip = event.skip;
    this.paginationEntity.offset =  (event.skip / this.pageSize) + 1;
    this.getCountryData();    
}

// sortOrder change Event
  public sortChange(sort: any): void {
    if(sort.dir != "undefined") {
        this.sort = sort;
        this.paginationEntity.sortOrder = [];
        this.paginationEntity.sortOrder = sort;
        this.getCountryData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if(inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery =  inputValue;
      this.getCountryData();
    } else {
      this.paginationEntity.searchData.searchQuery =  '';
      this.pageChange(this.state);
    }
  }

  edit(id) {
    this.router.navigate(['/admin/country/edit/' + window.btoa(id)]);
  }


  isActiveChange(activeEntity, i) {
    debugger
    this.globals.isLoading = true;
    if (i) {
      activeEntity.IsActive = 1;
    } else {
      activeEntity.IsActive = 0;
    }

    activeEntity.Id = activeEntity.CountryId;
    activeEntity.UpdatedBy = this.globals.authData.UserId;
    activeEntity.TableName = 'tblmstcountry';
    activeEntity.FieldName = 'CountryId';
    activeEntity.Module = 'Country';

    this.CommonService.isActiveChange(activeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (activeEntity.IsActive == 0) {
          swal({
            type: this.globals.adminTranslationText.country.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.country.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.country.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          swal({
            type: this.globals.adminTranslationText.country.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.country.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.country.list.alerts.activeSuccess.text,
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }


  deleteItem(country) {

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
      .then((result) => {
        if (result.value) {
          country.Id = country.CountryId;
          country.UserId = this.globals.authData.UserId;
          country.TableName = 'tblmstcountry';
          country.FieldName = 'CountryId';
          country.Module = 'Country';

          this.globals.isLoading = true;
          this.CommonService.deleteItem(country)
            .then((data) => {
              this.globals.isLoading = false;
              this.getCountryData();
              swal({
                type: this.globals.adminTranslationText.country.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.country.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.country.list.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 2000
              });
            },
              (error) => {
                this.globals.isLoading = false;
                this.globals.pageNotfound(error.error.code);
              });
        }
      })
  }
}
