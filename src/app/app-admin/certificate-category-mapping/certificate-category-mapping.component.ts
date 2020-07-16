import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-certificate-category-mapping',
  templateUrl: './certificate-category-mapping.component.html',
  styleUrls: ['./certificate-category-mapping.component.css']
})
export class CertificateCategoryMappingComponent implements OnInit {

  certificateCategoryMappingEntity;
  certificateList;
  categoryList;
  submitted;
  submitted1;
  btn_disable;
  mappingDetailsData;
  linkingCategoryList;
  certificateCategoryMappingListEntity;
  itmeAssessmentCountError;
  noneScoreItemCountError;
  noneScoreItemCountError1;
  practiceNoneScoreItemCountError;
  practiceNoneScoreItemCountError1;
  itmePracticeCountError;
  passingAssessmentPercentageError;
  passingPracticePercentageError;
  errorEntity;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private CertificateCategoryMappingService: CertificateCategoryMappingService) { }

  ngOnInit() {
    this.globals.isLoading = true;
    this.errorEntity = {};
    this.certificateCategoryMappingEntity = [];
    this.categoryList = [];
    this.linkingCategoryList = [];
    this.certificateCategoryMappingListEntity = {};
    this.certificateCategoryMappingListEntity.CategoryId = '';
    let id = this.route.snapshot.paramMap.get('id');//certificateId
    let categoryId = this.route.snapshot.paramMap.get('categoryid');
    this.itmeAssessmentCountError = false;
    this.noneScoreItemCountError = false;
    this.noneScoreItemCountError1 = false;
    this.practiceNoneScoreItemCountError = false;
    this.practiceNoneScoreItemCountError1 = false;
    this.itmePracticeCountError = false;
    this.CertificateCategoryMappingService.getAllDefault()
      .then((data) => {
        debugger
        this.certificateList = data['Certificates'];
        // this.categoryList = data['Categories'];
        var categoryeSelect = {
          CategoryId: '',
          CategoryName: this.globals.adminTranslationText.certificateCategoryMapping.list.category.select,
          Value: ""
        }
        this.categoryList.push(categoryeSelect);
        this.categoryList = [...this.categoryList, ...data['Categories']];

        this.CertificateCategoryMappingService.getByCertificateId(id)
          .then((data) => {
            debugger
            //this.linkingCategoryList = data;
            var data1: any;
            data1 = data;
            this.linkingCategoryList = [...this.linkingCategoryList, ...data1];
            //console.log(this.linkingCategoryList);
            for (var i = 0; i < this.linkingCategoryList.length; i++) {
              if (this.linkingCategoryList[i].CategoryId > 0) {
                for (var j = 0; j < this.categoryList.length; j++) {
                  if (this.linkingCategoryList[i].CategoryId == this.categoryList[j].CategoryId) {
                    this.categoryList[j].flag = 1;
                  }
                }
              }
            }
            this.categoryList = this.categoryList.filter(category => {
              return category.flag == 0;
            });
            this.globals.isLoading = false;
          },
            (error) => {
              this.globals.isLoading = false;
              swal({
                type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.type,
                title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.title,
                text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.text,
                showConfirmButton: false,
                timer: 4000
              })
            });
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });

    setTimeout(function () {
      $('select').selectpicker();
    }, 5000);

    if (id && categoryId) {
      id = window.atob(id);
      categoryId = window.atob(categoryId);
      this.globals.isLoading = true;
      this.CertificateCategoryMappingService.getById(id, categoryId)
        .then((data) => {
          this.mappingDetailsData = data['CertificateDetails'];
          console.log(data);
          if (this.mappingDetailsData.IsActive == 0) {
            this.mappingDetailsData.IsActive = 0;
          } else {
            this.certificateCategoryMappingEntity.IsActive = 1;
          }
          if (this.mappingDetailsData.PracticeIsActive == 0) {
            this.mappingDetailsData.PracticeIsActive = 0;
          } else {
            this.certificateCategoryMappingEntity.PracticeIsActive = 1;
          }
          if (this.mappingDetailsData.IsMandatoryCategoryAssessment == 0) {
            this.mappingDetailsData.IsMandatoryCategoryAssessment = 0;
          } else {
            this.certificateCategoryMappingEntity.IsMandatoryCategoryAssessment = 1;
          }
          if (this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment == 0) {
            this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 0;
          } else {
            this.certificateCategoryMappingEntity.PracticeIsMandatoryCategoryAssessment = 1;
          }

          if (this.mappingDetailsData.PracticeTotalItems == 0 || this.mappingDetailsData.PracticeTotalItems == null) {
            this.mappingDetailsData.HasPractice = 0;
            $("#has_practice_test").hide();
            $("#no_practice_test").hide();
          }
          else {
            this.mappingDetailsData.HasPractice = 1;
            $("#has_practice_test").show();
            $("#no_practice_test").hide();
          }
          this.practiceTestReadOnly();
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      this.certificateCategoryMappingEntity = [];
      this.certificateCategoryMappingEntity.CertificateAssessmentMappingId = 0;
      this.certificateCategoryMappingEntity.CertificateId = 0;
      this.certificateCategoryMappingEntity.IsActive = 1;
    }
  }

  totalAssessmentItemCount() {
    debugger
    var AssessmentScoreItems1: number = parseInt($("#ScoreItems").val());
    var totalItems1: number = parseInt(this.mappingDetailsData.AssessmentScoreItems);
    var str = $("#ScoreItems").val().split(0);
    if (str[0] == 0)
      this.itmeAssessmentCountError = false;
    else {
      if (AssessmentScoreItems1 > totalItems1) {
        this.itmeAssessmentCountError = true;
      }
      else {
        this.itmeAssessmentCountError = false;
      }
    }
    this.noneScoreItemsCount();
  }

  noneScoreItemsCount() {
    debugger
    var NoneScoreItems1: number = parseInt($("#NoneScoreItems").val());
    var totalItems1: number = parseInt(this.mappingDetailsData.ScoreItems);
    var totalnoscoreitem: number = parseInt(this.mappingDetailsData.noScoreItems);
    var str = $("#ScoreItems").val().split(0);

    if (NoneScoreItems1 > totalnoscoreitem) {
      this.noneScoreItemCountError = true;
      this.noneScoreItemCountError1 = false;
    }
    else {
      this.noneScoreItemCountError = false;
      if (NoneScoreItems1 >= totalItems1) {
        this.noneScoreItemCountError1 = true;
      }
      else {
        this.noneScoreItemCountError1 = false;
      }
    }

    $("#AssessmentTotalItems").val(totalItems1 + NoneScoreItems1);
    this.mappingDetailsData.AssessmentTotalItems = totalItems1 + NoneScoreItems1;
  }

  practiceNoneScoreItemsCount() {
    debugger
    var PracticeNoneScoreItems: number = parseInt($("#PracticeNoneScoreItems").val());
    var totalItems1: number = parseInt(this.mappingDetailsData.PracticeScoreItems);
    var totalnoscoreitem: number = parseInt(this.mappingDetailsData.noScorePracticeItems);
    var str = $("#PracticeScoreItems").val().split(0);

    if (PracticeNoneScoreItems > totalnoscoreitem) {
      this.practiceNoneScoreItemCountError = true;
      this.practiceNoneScoreItemCountError1 = false;
    }
    else {
      this.practiceNoneScoreItemCountError = false;
      if (PracticeNoneScoreItems >= totalItems1) {
        this.practiceNoneScoreItemCountError1 = true;
      }
      else {
        this.practiceNoneScoreItemCountError1 = false;
      }
    }
    $("#PracticeTotalItems").val(totalItems1 + PracticeNoneScoreItems);
    this.mappingDetailsData.PracticeTotalItems = totalItems1 + PracticeNoneScoreItems;
  }

  totalPracticeItemCount() {
    debugger
    var PracticeScoreItems: number = parseInt($("#PracticeScoreItems").val());
    var totalItems1: number = parseInt(this.mappingDetailsData.PracticeTestScoreItems);

    var str = $("#PracticeScoreItems").val().split(0);
    if (str[0] == 0)
      this.itmePracticeCountError = false;
    else {
      if (PracticeScoreItems > totalItems1) {
        this.itmePracticeCountError = true;
      }
      else {
        this.itmePracticeCountError = false;
      }
    }
    this.practiceNoneScoreItemsCount();
  }

  passingPercentageCheck(value) {
    if (value == 0)
      {var passingPercentageCheck: number = parseInt($("#PassingPercentage").val());}
    else
      {var passingPercentageCheck: number = parseInt($("#PracticePassingPercentage").val());}
    //s.substr(0,1)
    if (passingPercentageCheck > 0 && (passingPercentageCheck < 35 || passingPercentageCheck > 100)) {
      if (value == 0)
        this.passingAssessmentPercentageError = true;
      else
        this.passingPracticePercentageError = true;
    }
    else {
      if (value == 0)
        this.passingAssessmentPercentageError = false;
      else
        this.passingPracticePercentageError = false;
    }
  }
  categoryChange(CategoryId, CertificateId) {
    debugger
    if (CategoryId > 0) {
      this.submitted = false;
      this.CertificateCategoryMappingService.getById(CertificateId, CategoryId)
        .then((data) => {
          this.mappingDetailsData = data['CertificateDetails'];

          if (this.mappingDetailsData.IsActive == 0) {
            this.mappingDetailsData.IsActive = 0;
          } else {
            this.certificateCategoryMappingEntity.IsActive = 1;
          }
          if (this.mappingDetailsData.PracticeIsActive == 0) {
            this.mappingDetailsData.PracticeIsActive = 0;
          } else {
            this.certificateCategoryMappingEntity.PracticeIsActive = 1;
          }
          if (this.mappingDetailsData.IsMandatoryCategoryAssessment == 0) {
            this.mappingDetailsData.IsMandatoryCategoryAssessment = 0;
          } else {
            this.certificateCategoryMappingEntity.IsMandatoryCategoryAssessment = 1;
          }
          if (this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment == 0) {
            this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 0;
          } else {
            this.certificateCategoryMappingEntity.PracticeIsMandatoryCategoryAssessment = 1;
          }

          if (this.mappingDetailsData.PracticeTotalItems == 0 || this.mappingDetailsData.PracticeTotalItems == null) {
            this.mappingDetailsData.HasPractice = 0;
            $("#has_practice_test").hide();
            $("#no_practice_test").hide();
          }
          else {
            this.mappingDetailsData.HasPractice = 1;
            $("#has_practice_test").show();
            $("#no_practice_test").hide();
          }
          this.practiceTestReadOnly();
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
  }

  showPracticeForm() {
    console.log(this.mappingDetailsData.HasPractice);
    if (this.mappingDetailsData.IsActive == false) {
      swal({
        type: "warning",
        title: "Active Category",
        text: "If you want to active practice test then please active this category in assessment",
        showConfirmButton: false,
        timer: 4000
      })
    }
    setTimeout(() => {
      this.practiceTestReadOnly();
    }, 100);

  }

  practiceTestReadOnly() {
    if (this.mappingDetailsData.IsActive == true) {
      $("#PracticeTotalItems").removeAttr('disabled');
      $("#PracticeCategoryAssessmentTime").removeAttr('disabled');
      $("#PracticeNoneScoreItems").removeAttr('disabled');
      $("#PracticePassingPercentage").removeAttr('disabled');
      $("#PracticeIsActive").removeAttr('disabled');
    }
    else {
      $("#PracticeTotalItems").attr('disabled', true);
      $("#PracticeCategoryAssessmentTime").attr('disabled', true);
      $("#PracticeNoneScoreItems").attr('disabled', true);
      $("#PracticePassingPercentage").attr('disabled', true);
      $("#PracticeIsActive").attr('disabled', true);
      this.mappingDetailsData.PracticeIsActive = 0;
      this.mappingDetailsData.HasPractice = 0;
    }
  }

  addUpdate(certificateCategoryMappingForm) {
    debugger
    let id = window.atob(this.route.snapshot.paramMap.get('id'));//certificateId
    let categoryId = window.atob(this.route.snapshot.paramMap.get('categoryid'));
    if (id && categoryId) {
      if(this.mappingDetailsData.ScoreItems != '')
      {
        if (this.mappingDetailsData.IsMandatoryCategoryAssessment == true) {
          this.mappingDetailsData.IsMandatoryCategoryAssessment = 1;
        } else {
          this.mappingDetailsData.IsMandatoryCategoryAssessment = 0;
        }
        if (this.mappingDetailsData.IsActive == true) {
          this.mappingDetailsData.IsActive = 1;
        } else {
          this.mappingDetailsData.IsActive = 0;
        }

        if (this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment == true) {
          this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 1;
        } else {
          this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment = 0;
        }
        if (this.mappingDetailsData.PracticeIsActive == true) {
          this.mappingDetailsData.PracticeIsActive = 1;
        } else {
          this.mappingDetailsData.PracticeIsActive = 0;
        }
        this.submitted = true;
      }
      else{
        this.submitted = false;
      }
    } else {
      this.submitted = true;
    }

    var AssessmentDetails = {
      "CertificateAssessmentMappingId": this.mappingDetailsData.CertificateAssessmentMappingId,
      "AssessmentTotalItems": this.mappingDetailsData.AssessmentTotalItems,
      "CategoryAssessmentTime": this.mappingDetailsData.CategoryAssessmentTime,
      "ScoreItems": this.mappingDetailsData.ScoreItems,
      "NoneScoreItems": this.mappingDetailsData.NoneScoreItems,
      "PassingPercentage": this.mappingDetailsData.PassingPercentage,
      "IsMandatoryCategoryAssessment": this.mappingDetailsData.IsMandatoryCategoryAssessment,
      "IsActive": this.mappingDetailsData.IsActive
    }
    var practicedata: any = '';
    if(this.mappingDetailsData.PracticeExamAttempts >0)
    {
      if(this.mappingDetailsData.PracticeTestItems !=0)
      {
        if (this.mappingDetailsData.CertificatePracticeTestMappingId > 0 && this.mappingDetailsData.CertificatePracticeTestMappingId != null) {
          practicedata = {
            "CertificatePracticeTestMappingId": this.mappingDetailsData.CertificatePracticeTestMappingId,
            "PracticeTotalItems": this.mappingDetailsData.PracticeTotalItems,
            "PracticeCategoryAssessmentTime": this.mappingDetailsData.PracticeCategoryAssessmentTime,
            "PracticeScoreItems": this.mappingDetailsData.PracticeScoreItems,
            "PracticeNoneScoreItems": this.mappingDetailsData.PracticeNoneScoreItems,
            "PracticePassingPercentage": this.mappingDetailsData.PracticePassingPercentage,
            "PracticeIsMandatoryCategoryAssessment": this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment,
            "PracticeIsActive": this.mappingDetailsData.PracticeIsActive
          };
        }
        else{
          practicedata = {
            "CertificatePracticeTestMappingId": 0,
            "PracticeTotalItems": this.mappingDetailsData.PracticeTotalItems,
            "PracticeCategoryAssessmentTime": this.mappingDetailsData.PracticeCategoryAssessmentTime,
            "PracticeScoreItems": this.mappingDetailsData.PracticeScoreItems,
            "PracticeNoneScoreItems": this.mappingDetailsData.PracticeNoneScoreItems,
            "PracticePassingPercentage": this.mappingDetailsData.PracticePassingPercentage,
            "PracticeIsMandatoryCategoryAssessment": this.mappingDetailsData.PracticeIsMandatoryCategoryAssessment,
            "PracticeIsActive": this.mappingDetailsData.PracticeIsActive
          };
        }
      }
    }
   
    this.certificateCategoryMappingEntity = {
      "CertificateId": id,
      "CategoryId": this.mappingDetailsData.CategoryId,
      "hasPractice" : this.mappingDetailsData.HasPractice,
      "MappingDetails": [
        {
          "AssessmentDetails": AssessmentDetails,
          "PracticeTestDetails": practicedata
        }
      ],
      "UserId": this.globals.authData.UserId
    }
  
    if (certificateCategoryMappingForm.valid && !this.itmeAssessmentCountError && !this.passingAssessmentPercentageError && !this.passingPracticePercentageError && !this.itmePracticeCountError) {
      this.btn_disable = true;
      this.globals.isLoading = true;

      this.CertificateCategoryMappingService.addUpdate(this.certificateCategoryMappingEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.certificateCategoryMappingEntity = {};
          certificateCategoryMappingForm.form.markAsPristine();
          if (id && categoryId) {
            swal({
              type: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.update.type,
              title: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.update.title,
              text: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
              title: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
              text: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
          var certificateid = window.atob(this.route.snapshot.paramMap.get('id'));
          var categoryid = window.atob(this.route.snapshot.paramMap.get('categoryid'));
          var flag = window.atob(this.route.snapshot.paramMap.get('flag'));
          if(flag=="0")
          { 
            this.router.navigate(['/admin/certificate/list']);
          }
          else if(flag == "1")
          {
            this.router.navigate(['/admin/category/list']);
          }
          else
          {
            var url = '/admin/certificate-category-mapping/edit/' + window.btoa(certificateid) + '/' + window.btoa(categoryid);
            this.router.navigate(['/admin/certificate-category-mapping/list/'+ window.btoa(certificateid)]);
          }
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.error.code == 422) {
              this.errorEntity.AssessmentTotalItems = (error.error.message['MappingDetails[0][AssessmentDetails][AssessmentTotalItems]'] != "") ? error.error.message['MappingDetails[0][AssessmentDetails][AssessmentTotalItems]'] : '';
              this.errorEntity.CategoryAssessmentTime = (error.error.message['MappingDetails[0][AssessmentDetails][CategoryAssessmentTime]'] != "") ? error.error.message['MappingDetails[0][AssessmentDetails][CategoryAssessmentTime]'] : '';
              this.errorEntity.NoneScoreItems = (error.error.message['MappingDetails[0][AssessmentDetails][NoneScoreItems]'] != "") ? error.error.message['MappingDetails[0][AssessmentDetails][NoneScoreItems]'] : '';
              this.errorEntity.PassingPercentage = (error.error.message['MappingDetails[0][AssessmentDetails][PassingPercentage]'] != "") ? error.error.message['MappingDetails[0][AssessmentDetails][PassingPercentage]'] : '';
              this.errorEntity.ScoreItems = (error.error.message['MappingDetails[0][AssessmentDetails][ScoreItems]'] != "") ? error.error.message['MappingDetails[0][AssessmentDetails][ScoreItems]'] : '';
              this.errorEntity.PracticeCategoryAssessmentTime = (error.error.message['MappingDetails[0][PracticeTestDetails][PracticeCategoryAssessmentTime]'] != "") ? error.error.message['MappingDetails[0][PracticeTestDetails][PracticeCategoryAssessmentTime]'] : '';
              this.errorEntity.PracticeNoneScoreItems = (error.error.message['MappingDetails[0][PracticeTestDetails][PracticeNoneScoreItems]'] != "") ? error.error.message['MappingDetails[0][PracticeTestDetails][PracticeNoneScoreItems]'] : '';
              this.errorEntity.PracticePassingPercentage = (error.error.message['MappingDetails[0][PracticeTestDetails][PracticePassingPercentage]'] != "") ? error.error.message['MappingDetails[0][PracticeTestDetails][PracticePassingPercentage]'] : '';
              this.errorEntity.PracticeScoreItems = (error.error.message['MappingDetails[0][PracticeTestDetails][PracticeScoreItems]'] != "") ? error.error.message['MappingDetails[0][PracticeTestDetails][PracticeScoreItems]'] : '';
              this.errorEntity.PracticeTotalItems = (error.error.message['MappingDetails[0][PracticeTestDetails][PracticeTotalItems]'] != "") ? error.error.message['MappingDetails[0][PracticeTestDetails][PracticeTotalItems]'] : '';
            } else {
              this.globals.pageNotfound(error.error.code);
            }
           
            
          });
    }
  }

  categoryLinking(categoryLinkingForm) {debugger
    var CategoryId = this.certificateCategoryMappingListEntity.CategoryId;
    var CertificateId = window.atob(this.route.snapshot.paramMap.get('id'));//certificateId;
    for (var k = 0; k < this.certificateList.length; k++) {
      if (CertificateId == this.certificateList[k].CertificateId) {
        this.certificateCategoryMappingListEntity.PracticeExamAttempts = this.certificateList[k].PracticeExamAttempts;
      }
    }
    var practiceItem = 0;
    for(var i=0;i<this.categoryList.length;i++)
    {
      if(this.categoryList[i].CategoryId == CategoryId)
      {
        practiceItem = this.categoryList[i].PracticeTestItems;
      }
    }
    this.submitted1 = true;
    if (categoryLinkingForm.valid) {
      var practicedata: any = '';
      if (this.certificateCategoryMappingListEntity.PracticeExamAttempts > 0) {
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
        "hasPractice" : this.mappingDetailsData.HasPractice,
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
      swal({
        title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.title,
        text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.text,
        icon: "warning",
        type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.addData.type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: "No"
      })
        .then((result) => {
          if (result.value) {
            this.CertificateCategoryMappingService.addUpdate(this.certificateCategoryMappingListEntity)
              .then((data) => {
                this.globals.isLoading = false;
                this.submitted1 = false;
                this.certificateCategoryMappingListEntity = {};
                 var certificateid = window.btoa(CertificateId).replace(/=/g,"%3D");
                 var categoryid = window.btoa(CategoryId).replace(/=/g,"%3D");
                
                window.location.href = '/admin/certificate-category-mapping/edit/' + certificateid + '/' + categoryid;
                
                categoryLinkingForm.form.markAsPristine();
                swal({
                  type: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                  title: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                  text: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                  showConfirmButton: false,
                  timer: 2000
                })
              },
                (error) => {
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
          }
          else {
            this.CertificateCategoryMappingService.addUpdate(this.certificateCategoryMappingListEntity)
              .then((data) => {
                this.globals.isLoading = false;
                this.submitted1 = false;
                this.certificateCategoryMappingListEntity = {};
                categoryLinkingForm.form.markAsPristine();
                swal({
                  type: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.type,
                  title: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.title,
                  text: this.globals.adminTranslationText.certificateCategoryMapping.form.alerts.add.text,
                  showConfirmButton: false,
                  timer: 2000
                })
                var certificateid = window.atob(this.route.snapshot.paramMap.get('id'));
                this.router.navigate(['/admin/certificate-category-mapping/list/'+ window.btoa(certificateid)]);
              },
                (error) => {
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
          }
          $('#link_new').modal('hide');
        })
    }
  }


  itemDisabled(itemArgs: { dataItem: any, index: number }) {
    return itemArgs.dataItem.AssessmentItems == '0';
  }
}
