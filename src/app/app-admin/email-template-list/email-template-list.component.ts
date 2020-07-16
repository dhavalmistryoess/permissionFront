import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateService } from '../services/email-template.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.css']
})
export class EmailTemplateListComponent implements OnInit {
  deleteEntity;
  exportName;
  EmailList : any;
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
      field: "Token",
      dir: 'asc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'Token',
    dir: 'asc'
  }];

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private EmailTemplateService: EmailTemplateService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
   ngOnInit() {

    this.globals.isLoading = true;
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–AllItems–' + todaysdate;

    this.globals.isLoading = true;
    this.getEmailData();
  }

   // getEmailData Listing
   getEmailData() {
    this.EmailTemplateService.getEmailAll(this.paginationEntity)
      .then((data: any) => {
        this.EmailList = {
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
    this.getEmailData();    
}

// sortOrder change Event
  public sortChange(sort: any): void {
    if(sort.dir != "undefined") {
        this.sort = sort;
        this.paginationEntity.sortOrder = [];
        this.paginationEntity.sortOrder = sort;
        this.getEmailData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if(inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery =  inputValue;
      this.getEmailData();
    } else {
      this.paginationEntity.searchData.searchQuery =  '';
      this.pageChange(this.state);
    }
  }

  edit(id) {
    this.router.navigate(['/admin/email-template/edit/' + window.btoa(id)]);
  }

  deleteEmail(Email) {
    swal({
      title: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteConfirm.title,
      text: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          Email.UserId = this.globals.authData.UserId;
          Email.Id = Email.EmailTemplateId;
          Email.TableName = 'tblemailtemplate';
          Email.FieldName = 'EmailTemplateId';
          Email.Module = 'Email Template';
          Email.ActivityText = 'Delete Email Template - ' + Email.Token + ' (Id - ' + Email.EmailTemplateId + ')';
          this.globals.isLoading = true; debugger
          this.CommonService.deleteItem(Email)
            .then((data) => {
              this.getEmailData();
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.emailTemplate.list.alerts.deleteSuccess.text,
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
    changeEntity.Id = changeEntity.EmailTemplateId;
    changeEntity.TableName = 'tblemailtemplate';
    changeEntity.FieldName = 'EmailTemplateId';
    changeEntity.Module = 'Email Template';
    changeEntity.ModuleId = 0;
    if (changeEntity.IsActive == 1) {
      changeEntity.ActivityText = "Email Template Activated - " + changeEntity.Token;
    }
    else {
      changeEntity.ActivityText = "Email Template Deactivated - " + changeEntity.Token;
    }
    this.CommonService.isActiveChange(changeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.emailTemplate.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.emailTemplate.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.emailTemplate.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.emailTemplate.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.emailTemplate.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.emailTemplate.list.alerts.activeSuccess.text,
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
