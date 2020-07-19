import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, swal: any, Bloodhound: any;
declare function myInput(): any;

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {
  deleteEntity;
  exportName;
  stateList : any;
 
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
  menuDisplayEntity:any;
  menuEntity:any;
  listPermission;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private StateService: StateService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
 
  ngOnInit() {
    debugger
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment-StateList–' + todaysdate;
    this.globals.isLoading = true;
    this.getStateData();

    this.listPermission =[];
    this.menuEntity = [{
      key : 'add-state',
      value : false
    },
    {
      key : 'delete-all',
      value : false
    },
    {
      key : 'update-all',
      value : false
    },
    {
      key : 'state-list',
      value : false
    }
    ];

    this.CommonService.checkPermission()
    .then((data) => {
      this.listPermission = data;
      this.menuEntity = this.CommonService.hasAccess(this.listPermission,this.menuEntity);
    },
      (error) => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
    });

  }


   // getCountry Data Listing
   getStateData() {
    this.StateService.getStateAll(this.paginationEntity)
      .then((data: any) => {
        this.stateList = {
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
    this.getStateData();    
}

// sortOrder change Event
  public sortChange(sort: any): void {
    if(sort.dir != "undefined") {
        this.sort = sort;
        this.paginationEntity.sortOrder = [];
        this.paginationEntity.sortOrder = sort;
        this.getStateData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if(inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery =  inputValue;
      this.getStateData();
    } else {
      this.paginationEntity.searchData.searchQuery =  '';
      this.pageChange(this.state);
    }
  }
  

  edit(id) {
    this.router.navigate(['/admin/state/edit/' + window.btoa(id)]);
  }

  isActiveChange(activeEntity, i) {
    debugger
    this.globals.isLoading = true;

    if (i) {
      activeEntity.IsActive = 1;
    } else {
      activeEntity.IsActive = 0;
    }

    activeEntity.Id = activeEntity.StateId;
    activeEntity.UpdatedBy = this.globals.authData.UserId;
    activeEntity.TableName = 'tblmststate';
    activeEntity.FieldName = 'StateId';
    activeEntity.Module = 'State';

    this.CommonService.isActiveChange(activeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (activeEntity.IsActive == 0) {
          swal({
            type: this.globals.adminTranslationText.state.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.state.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.state.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          swal({
            type: this.globals.adminTranslationText.state.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.state.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.state.list.alerts.activeSuccess.text,
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


  deleteItem(state) {

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
      .then((result) => {
        if (result.value) {
          debugger

          state.Id = state.StateId;
          state.UserId = this.globals.authData.UserId;
          state.TableName = 'tblmststate';
          state.FieldName = 'StateId';
          state.Module = 'State';

          this.globals.isLoading = true;
          this.CommonService.deleteItem(state)
            .then((data) => {
              this.globals.isLoading = false;
              this.getStateData();
              swal({
                type: this.globals.adminTranslationText.state.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.state.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.state.list.alerts.deleteSuccess.text,
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
