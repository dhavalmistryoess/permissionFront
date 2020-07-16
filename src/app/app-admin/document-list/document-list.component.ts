import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  deleteEntity;
  todaysdate;
  exportName;
  documentList : any;
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
      field: "DocumentName",
      dir: 'asc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'DocumentName',
    dir: 'asc'
  }];
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private DocumentService: DocumentService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  ngOnInit() {
    this.globals.isLoading = true;
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–AllDiscountCoupons–' + todaysdate;
    this.getDocumentData();
  }


  // getDocumentData Listing
  getDocumentData() {
    this.DocumentService.getDocumentAll(this.paginationEntity)
      .then((data: any) => {
        this.documentList = {
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
    this.getDocumentData();    
}

// sortOrder change Event
  public sortChange(sort: any): void {
    if(sort.dir != "undefined") {
        this.sort = sort;
        this.paginationEntity.sortOrder = [];
        this.paginationEntity.sortOrder = sort;
        this.getDocumentData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if(inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery =  inputValue;
      this.getDocumentData();
    } else {
      this.paginationEntity.searchData.searchQuery =  '';
      this.pageChange(this.state);
    }
  }
  edit(id) {
    this.router.navigate(['/admin/document/edit/' + window.btoa(id)]);
  }

  deleteDocument(document) {
    swal({
      title: this.globals.adminTranslationText.document.list.alerts.deleteConfirm.title,
      text: this.globals.adminTranslationText.document.list.alerts.deleteConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.document.list.alerts.deleteConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          document.UserId = this.globals.authData.UserId;
          document.Id = document.DocumentId;
          document.TableName = 'tbldocuments';
          document.FieldName = 'DocumentId';
          document.Module = 'Document';
          document.ActivityText = 'Delete Document';
          document.ModuleId = 2;
          this.globals.isLoading = true; debugger
          this.CommonService.deleteItem(document)
            .then((data) => {
              this.getDocumentData();
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.document.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.document.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.document.list.alerts.deleteSuccess.text,
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
    if (i) {
      changeEntity.IsActive = 1;
    } else {
      changeEntity.IsActive = 0;
    }
    this.globals.isLoading = true;
    changeEntity.UpdatedBy = this.globals.authData.UserId;
    changeEntity.Id = changeEntity.DocumentId;
    changeEntity.TableName = 'tbldocuments';
    changeEntity.FieldName = 'DocumentId';
    changeEntity.Module = 'Document';
    changeEntity.ModuleId = 2;
    if (changeEntity.IsActive == 1) {
      changeEntity.ActivityText = "Document Activated";
    }
    else {
      changeEntity.ActivityText = "Document Deactivated";
    }
    this.CommonService.isActiveChange(changeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.document.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.document.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.document.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.document.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.document.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.document.list.alerts.activeSuccess.text,
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
