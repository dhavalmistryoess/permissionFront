import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, swal: any, Bloodhound: any;
declare function myInput(): any;

@Component({
  selector: 'app-country-list-dummy',
  templateUrl: './country-list-dummy.component.html',
  styleUrls: ['./country-list-dummy.component.css']
})
export class CountryListDummyComponent implements OnInit {
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
      dir: 'asc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'CountryName',
    dir: 'asc'
  }];
 
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private CountryService: CountryService, private CommonService: CommonService) {
  }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  ngOnInit() {
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
          this.globals.pageNotfound(error.error.code);
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
}

