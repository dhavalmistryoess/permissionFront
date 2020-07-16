import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'; 
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  deleteEntity;
  todaysdate;
  exportName;
  linkedCertificateList;
  unlinkedCertificateList;
  unlinkedCertificateEntity;
  linkedCertificateEntity;
  submitted;
  certificateCategoryMappingListEntity;
  categoryList : any;
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
      field: "CategoryName",
      dir: 'asc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'CategoryName',
    dir: 'asc'
  }];
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private CategoryService: CategoryService, private CommonService: CommonService, private CertificateCategoryMappingService: CertificateCategoryMappingService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  ngOnInit() {

    this.globals.isLoading = true;
    this.linkedCertificateList = [];
    this.unlinkedCertificateList = [];
    this.unlinkedCertificateEntity = {};
    this.linkedCertificateEntity = {};
    this.certificateCategoryMappingListEntity = {};
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–AllCategories–' + todaysdate;
    this.getCategoryData();
  }

  
  // getCategoryData Data Listing
  getCategoryData() {
    this.CategoryService.getCategoryAll(this.paginationEntity)
      .then((data: any) => {
        this.categoryList = {
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
    this.getCategoryData();    
}

// sortOrder change Event
  public sortChange(sort: any): void {
    if(sort.dir != "undefined") {
        this.sort = sort;
        this.paginationEntity.sortOrder = [];
        this.paginationEntity.sortOrder = sort;
        this.getCategoryData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if(inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery =  inputValue;
      this.getCategoryData();
    } else {
      this.paginationEntity.searchData.searchQuery =  '';
      this.pageChange(this.state);
    }
  } 

  edit(id) {
    this.router.navigate(['/admin/category/edit/' + window.btoa(id)]);
  }

  linkedCertificatesList(dataItem) 
  {
    this.linkedCertificateList = dataItem.UnlinkedCertificates; //which is already linked to certificate and unlinked to the certificate
    $("#linkedCategory_popup").modal('show');
    this.linkedCertificateEntity = {};
    this.certificateCategoryMappingListEntity = {};
    this.submitted = false;
    this.linkedCertificateEntity = dataItem;
  }
  linkCertificate(categoryLinkingForm) {
    debugger
    var CategoryId = this.linkedCertificateEntity.CategoryId;
    var CertificateId = this.certificateCategoryMappingListEntity.CertificateId;
    var practiceItem = this.linkedCertificateEntity.AssessmentItems;
    for(var i=0;i<this.linkedCertificateList.length;i++)
    {
      if(this.linkedCertificateList[i].CertificateId == CertificateId)
      {
        this.linkedCertificateEntity.PracticeExamAttempts = this.linkedCertificateList[i].PracticeExamAttempts;
      }
    }
     this.submitted = true;
    if (categoryLinkingForm.valid) {
      var practicedata: any = '';
      if (this.linkedCertificateEntity.PracticeExamAttempts > 0) {
        if(practiceItem !=0)
        {
          practicedata = {
            "CertificatePracticeTestMappingId": 0,
            "PracticeTotalItems": "",
            "PracticeCategoryAssessmentTime": "",
            "PracticeScoreItems": "",
            "PracticeNoneScoreItems": "",
            "PracticePassingPercentage": "",
            "PracticeIsMandatoryCategoryAssessment": 0,
            "PracticeIsActive": 0
          };
        }
      }

      this.certificateCategoryMappingListEntity = {
        "CertificateId": CertificateId,
        "CategoryId": CategoryId,
        "hasPractice" : 0,
        "MappingDetails": [{
          "AssessmentDetails": {
            "CertificateAssessmentMappingId": 0,
            "AssessmentTotalItems": "",
            "CategoryAssessmentTime": "",
            "ScoreItems": "",
            "NoneScoreItems": "",
            "PassingPercentage": "",
            "IsMandatoryCategoryAssessment": 0,
            "IsActive": 0
          },
          "PracticeTestDetails": practicedata
        }],
        "UserId": this.globals.authData.UserId
      }
      console.log(this.certificateCategoryMappingListEntity);
      swal({
        title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.title,
        text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.text,
        icon: "warning",
        type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: "No",
        allowOutsideClick: false
      })
        .then((result) => {
          if (result.value) {
            this.globals.isLoading = true;
            this.CertificateCategoryMappingService.addUpdate(this.certificateCategoryMappingListEntity)
              .then((data) => {
                this.globals.isLoading = false;
                //this.btn_disable = false;
                this.submitted = false;
                this.certificateCategoryMappingListEntity = {};
                categoryLinkingForm.form.markAsPristine();
                swal({
                  type: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                  title: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                  text: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                  showConfirmButton: false,
                  timer: 2000
                })

                this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId) + '/' + window.btoa("1")]);
              },
                (error) => {
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
          }
          else {
            this.globals.isLoading = true;
            this.CertificateCategoryMappingService.addUpdate(this.certificateCategoryMappingListEntity)
              .then((data) => {
                this.globals.isLoading = false;
                //this.btn_disable = false;
                this.submitted = false;
                this.certificateCategoryMappingListEntity = {};
                this.certificateCategoryMappingListEntity.CertificateId = CertificateId;
                categoryLinkingForm.form.markAsPristine();
                swal({
                  type: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                  title: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                  text: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                  showConfirmButton: false,
                  timer: 2000
                })

                window.location.href = '/admin/category/list';
              },
                (error) => {
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
          }
          $('#linkedCategory_popup').modal('hide');
        })
    } else {

     }
  }
  unlinkedCertificatesList(dataItem) 
  {
    this.unlinkedCertificateList = dataItem.LinkedCertificates; //which is already linked to certificate and unlinked to the certificate
    $("#unlinkedCategory_popup").modal('show');
    this.unlinkedCertificateEntity = {};
    this.unlinkedCertificateEntity.CategoryName = dataItem.CategoryName;
  }

  unlinkCertificate(CertificateId)
  {
    debugger
    if(CertificateId != '' && CertificateId != undefined)
    {
      swal({
      title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteCertificateUnlinkConfirm.title,
      text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteCertificateUnlinkConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteCertificateUnlinkConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          this.globals.isLoading = true;
          for(var i=0;i<this.unlinkedCertificateList.length;i++)
          {
            if(CertificateId == this.unlinkedCertificateList[i].CertificateId)
            {
              this.unlinkedCertificateEntity.Id = this.unlinkedCertificateList[i].CertificateAssessmentMappingId;
              this.unlinkedCertificateEntity.Id2 = this.unlinkedCertificateList[i].CertificatePracticeTestMappingId;
              this.unlinkedCertificateEntity.CertificatePracticeTestMappingId = this.unlinkedCertificateList[i].CertificatePracticeTestMappingId;
            }
          }
          this.unlinkedCertificateEntity.UserId = this.globals.authData.UserId;
          
          this.unlinkedCertificateEntity.TableName = 'tblmstcertificateassessmentmapping';
          this.unlinkedCertificateEntity.FieldName = 'CertificateAssessmentMappingId';
          this.unlinkedCertificateEntity.Module = 'AssessmentMapping';
          this.unlinkedCertificateEntity.ModuleId = 2;

          
          this.unlinkedCertificateEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
          this.unlinkedCertificateEntity.FieldName2 = 'CertificatePracticeTestMappingId';
          this.CertificateCategoryMappingService.unlinkCategory(this.unlinkedCertificateEntity)
            .then((data) => {
              $("#unlinkedCategory_popup").modal('hide');
              let index = this.unlinkedCertificateList.indexOf(CertificateId);
              if (index != -1) {
                this.unlinkedCertificateList.splice(index, 1);
              }
               this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.text,
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
  }
  deleteCategory(category) {
    swal({
      title: this.globals.adminTranslationText.category.list.alerts.deleteConfirm.title,
      text: this.globals.adminTranslationText.category.list.alerts.deleteConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.category.list.alerts.deleteConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          category.UserId = this.globals.authData.UserId;
          category.Id = category.CategoryId;
          category.TableName = 'tblmstcategory';
          category.FieldName = 'CategoryId';
          category.Module = 'Category';
          category.ModuleId = 2;
          category.ActivityText = 'Delete Category';
          this.globals.isLoading = true; debugger
          this.CommonService.deleteItem(category)
            .then((data) => {
              this.getCategoryData();
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.category.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.category.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.category.list.alerts.deleteSuccess.text,
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
    changeEntity.Id = changeEntity.CategoryId;
    changeEntity.TableName = 'tblmstcategory';
    changeEntity.FieldName = 'CategoryId';
    changeEntity.Module = 'Category';
    changeEntity.ModuleId = 2;
    if (changeEntity.IsActive == 1) {
      changeEntity.ActivityText = "Category Activated";
    }
    else {
      changeEntity.ActivityText = "Category Deactivated";
    }
    this.CommonService.isActiveChange(changeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.category.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.category.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.category.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.category.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.category.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.category.list.alerts.activeSuccess.text,
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
  

  itemDisabled(itemArgs: { dataItem: any, index: number }) {
    return itemArgs.dataItem.IsMapped != '0';
  }

  
}

