import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../services/certificate.service';
import { CommonService } from '../services/common.service';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
import { DataBindingDirective, PageChangeEvent, GridDataResult,  DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'; 
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnInit {

  deleteEntity;
  exportName;
  todaysDate;
  certificateEntity;
  linkedCategoryList;
  unlinkedCategoryList;
  unlinkedCategoryEntity;
  linkedCategoryEntity;
  submitted;
  certificateCategoryMappingListEntity;
  certificateList : any;
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
      field: "CertificateName",
      dir: 'asc'
    }]
  };
  state = {
      skip: 0,
      take: this.pageSize
  };
  sort: SortDescriptor[] = [{
    field: 'CertificateName',
    dir: 'asc'
  }];

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private CertificateService: CertificateService, private CommonService: CommonService, private CertificateCategoryMappingService: CertificateCategoryMappingService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  ngOnInit() {

    this.globals.isLoading = true;
    // this.certificateList = [];
    this.certificateEntity = {};
    this.unlinkedCategoryList = [];
    this.unlinkedCategoryEntity = {};
    this.linkedCategoryList = [];
    this.linkedCategoryEntity = {};
    this.certificateCategoryMappingListEntity = {};
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    if (curr_month < 10) {
      var month = '0' + curr_month;
    } else {
      var month = '' + curr_month;
    }
    if (curr_date < 10) {
      var date = '0' + curr_date;
    }
    else {
      var date = '' + curr_date;
    }
    this.todaysDate = curr_year + '-' + month + '-' + date;
    this.exportName = 'Assessment–AllCertificates–' + this.todaysDate;
    this.getCertificateData();
  }

  // getCertificateData Data Listing
  getCertificateData() {
    this.CertificateService.getCertificateAll(this.paginationEntity)
      .then((data: any) => {
        this.certificateList = {
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
    this.getCertificateData();    
}

// sortOrder change Event
  public sortChange(sort: any): void {
    if(sort.dir != "undefined") {
        this.sort = sort;
        this.paginationEntity.sortOrder = [];
        this.paginationEntity.sortOrder = sort;
        this.getCertificateData();
    }
  }

  // Filter event
  public onFilter(inputValue: string): void {
    this.globals.isLoading = true;
    if(inputValue != "") {
      this.paginationEntity.offset = 1;
      this.paginationEntity.searchData.searchQuery =  inputValue;
      this.getCertificateData();
    } else {
      this.paginationEntity.searchData.searchQuery =  '';
      this.pageChange(this.state);
    }
  }

  edit(id) {
    this.router.navigate(['/admin/certificate/edit/' + window.btoa(id)]);
  }

  viewAlldDetail(i) {
    this.certificateEntity = i;
  }
  linkedCategoriesList(dataItem) 
  {
    this.linkedCategoryList = dataItem.UnlinkedCategories; //which is already linked to certificate and unlinked to the certificate
    $("#linkedCategory_popup").modal('show');
    this.linkedCategoryEntity = {};
    this.certificateCategoryMappingListEntity = {};
    this.submitted = false;
    this.linkedCategoryEntity = dataItem;
  }
  linkCategory(categoryLinkingForm) {
    debugger
    var CategoryId = this.certificateCategoryMappingListEntity.CategoryId;
    var CertificateId = this.linkedCategoryEntity.CertificateId;
    var practiceItem = 0;
    for(var i=0;i<this.linkedCategoryList.length;i++)
    {
      if(this.linkedCategoryList[i].CategoryId == CategoryId)
      {
        practiceItem = this.linkedCategoryList[i].PracticeTestItems;
      }
    }
     this.submitted = true;
    if (categoryLinkingForm.valid) {
      var practicedata: any = '';
      if (this.linkedCategoryEntity.PracticeExamAttempts > 0) {
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

                this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId) + '/' + window.btoa("0")]);
                // this.router.navigate(['/admin/certificate-category-mapping/edit/' + CertificateId + '/' + CategoryId]);
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
                window.location.href = '/admin/certificate/list';
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
  unlinkedCategoriesList(dataItem) 
  {
    this.unlinkedCategoryList = dataItem.LinkedCategories; //which is already linked to certificate and unlinked to the certificate
    $("#unlinkedCategory_popup").modal('show');
    this.unlinkedCategoryEntity = {};
    this.unlinkedCategoryEntity.CertificateName = dataItem.CertificateName;
  }
  unlinkCategory(CategoryId)
  {
    debugger
    if(CategoryId != '' && CategoryId != undefined)
    {
      swal({
      title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteConfirm.title,
      text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          this.globals.isLoading = true;
          for(var i=0;i<this.unlinkedCategoryList.length;i++)
          {
            if(CategoryId == this.unlinkedCategoryList[i].CategoryId)
            {
              this.unlinkedCategoryEntity.Id = this.unlinkedCategoryList[i].CertificateAssessmentMappingId;
              this.unlinkedCategoryEntity.Id2 = this.unlinkedCategoryList[i].CertificatePracticeTestMappingId;
              this.unlinkedCategoryEntity.CertificatePracticeTestMappingId = this.unlinkedCategoryList[i].CertificatePracticeTestMappingId;
            }
          }
          this.unlinkedCategoryEntity.UserId = this.globals.authData.UserId;
          
          this.unlinkedCategoryEntity.TableName = 'tblmstcertificateassessmentmapping';
          this.unlinkedCategoryEntity.FieldName = 'CertificateAssessmentMappingId';
          this.unlinkedCategoryEntity.Module = 'AssessmentMapping';
          this.unlinkedCategoryEntity.ModuleId = 2;

          
          this.unlinkedCategoryEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
          this.unlinkedCategoryEntity.FieldName2 = 'CertificatePracticeTestMappingId';
          this.CertificateCategoryMappingService.unlinkCategory(this.unlinkedCategoryEntity)
            .then((data) => {
              $("#unlinkedCategory_popup").modal('hide');
              let index = this.unlinkedCategoryList.indexOf(CategoryId);
              if (index != -1) {
                this.unlinkedCategoryList.splice(index, 1);
              }
              // var categorydata = { 'CategoryId': categoryData.CategoryId, 'CategoryName': categoryData.CategoryName, 'flag': 0, 'AssessmentItems': categoryData.isdisabled }
              // this.categoryList.push(categorydata);
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
              window.location.href = 'admin/certificate/list';
            },
              (error) => {
                this.globals.isLoading = false;
                this.globals.pageNotfound(error.error.code);
              });
        }
      })
    }
  }
  deleteCertificate(certificate) {
    debugger
    swal({
      title: this.globals.adminTranslationText.certificate.list.alerts.deleteConfirm.title,
      text: this.globals.adminTranslationText.certificate.list.alerts.deleteConfirm.text,
      icon: "warning",
      type: this.globals.adminTranslationText.certificate.list.alerts.deleteConfirm.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          certificate.UserId = this.globals.authData.UserId;
          certificate.Id = certificate.CertificateId;
          certificate.TableName = 'tblmstcertificates';
          certificate.FieldName = 'CertificateId';
          certificate.Module = 'Certificate';
          certificate.ModuleId = 2;
          certificate.ActivityText = 'Delete Certificate';

          certificate.TableName2 = 'tblcertificatedocuments';
          certificate.FieldName2 = 'CertificateId';
          certificate.Module2 = 'Certificate Documents';
          certificate.ModuleId2 = 2;
          certificate.ActivityText2 = 'Delete Certificate Documents';

          if (certificate.linked > 0) {
            certificate.TableName1 = 'tblmstcertificateassessmentmapping';
            certificate.FieldName1 = 'CertificateId';
            certificate.Module1 = 'Certificate Assessment Mapping';
            certificate.ModuleId1 = 2;
            certificate.ActivityText1 = 'Delete Certificate Mapping';
          }
          this.globals.isLoading = true; debugger
          this.CertificateService.deleteItem(certificate)
            .then((data) => {
              this.getCertificateData();
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.certificate.list.alerts.deleteSuccess.type,
                title: this.globals.adminTranslationText.certificate.list.alerts.deleteSuccess.title,
                text: this.globals.adminTranslationText.certificate.list.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
            },
              (error) => {
                this.globals.isLoading = false;
                window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
                this.globals.isLoading = true;
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
    changeEntity.Id = changeEntity.CertificateId;
    changeEntity.TableName = 'tblmstcertificates';
    changeEntity.FieldName = 'CertificateId';
    changeEntity.Module = 'Certificate';
    changeEntity.ModuleId = 2;
    if (changeEntity.IsActive == 1) {
      changeEntity.ActivityText = "Certificate Activated";
    }
    else {
      changeEntity.ActivityText = "Certificate Deactivated";
    }
    this.CommonService.isActiveChange(changeEntity)
      .then((data) => {
        this.globals.isLoading = false;
        if (changeEntity.IsActive == 0) {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.certificate.list.alerts.deactiveSuccess.type,
            title: this.globals.adminTranslationText.certificate.list.alerts.deactiveSuccess.title,
            text: this.globals.adminTranslationText.certificate.list.alerts.deactiveSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
        else {
          swal({
            //position: 'top-end',
            type: this.globals.adminTranslationText.certificate.list.alerts.activeSuccess.type,
            title: this.globals.adminTranslationText.certificate.list.alerts.activeSuccess.title,
            text: this.globals.adminTranslationText.certificate.list.alerts.activeSuccess.text,
            showConfirmButton: false,
            timer: 4000
          })
        }
      },
        (error) => {
          this.globals.isLoading = false;
          window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
              this.globals.isLoading = true;
        });
  }
  
  itemDisabled(itemArgs: { dataItem: any, index: number }) {
    return itemArgs.dataItem.IsMapped != '0';
  }

  itemDisabled1(itemArgs: { dataItem: any, index: number }) {
    return itemArgs.dataItem.AssessmentItems == '0';
  }
}
