import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CertificateCategoryMappingService } from '../services/certificate-category-mapping.service';
import { CommonService } from '../services/common.service';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-certificate-category-mapping-list',
  templateUrl: './certificate-category-mapping-list.component.html',
  styleUrls: ['./certificate-category-mapping-list.component.css']
})
export class CertificateCategoryMappingListComponent implements OnInit {

  certificateCategoryMappingListEntity;
  certificateList;
  categoryList;
  linkingCategoryList;
  submitted; CertificateError;
  activeEntity;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private CertificateCategoryMappingService: CertificateCategoryMappingService
    , private CommonService: CommonService) { }

  ngOnInit() {

    this.submitted = false;
    this.certificateCategoryMappingListEntity = {};
    this.linkingCategoryList = {};
    this.certificateList = [];
    this.categoryList = [];
    this.activeEntity = {};
    $("#newLinking").hide();
    $("#categoryDisplay").hide();
    this.CertificateCategoryMappingService.getAllDefault()
      .then((data) => {
        debugger
        // this.certificateList = data['Certificates'];
        //this.categoryList = data['Categories'];

        var certificateSelect = {
          CertificateId: '',
          CertificateName: this.globals.adminTranslationText.certificateCategoryMapping.form.certificate.select,
          Value: ""
        }
        this.certificateList.push(certificateSelect);
        this.certificateList = [...this.certificateList, ...data['Certificates']];

        var categoryeSelect = {
          CategoryId: '',
          CategoryName: this.globals.adminTranslationText.certificateCategoryMapping.list.category.select,
          Value: ""
        }
        this.categoryList.push(categoryeSelect);
        this.categoryList = [...this.categoryList, ...data['Categories']];

        var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
        console.log(certificateid);
        this.certificateCategoryMappingListEntity.CertificateId = certificateid;
        this.certificateChange(certificateid);
        // this.categoryList = this.categoryList.filter( category => {
        //   if(category.isdisabled == 0)
        //     return this.categoryList.dis;
        // });
        this.globals.isLoading = false;
        console.log(this.categoryList);
      },
        (error) => {
          this.globals.isLoading = false;
          // if (error.text) {
          //   swal({
          //     //position: 'top-end',
          //     type: 'error',
          //     title: 'Oops...',
          //     text: "Something went wrong!"
          //   })
          // }
          this.globals.pageNotfound(error.error.code);
        });
    setTimeout(function () {
      $('select').selectpicker();
    }, 5000);

    this.certificateCategoryMappingListEntity.CertificateId = '';
    this.certificateCategoryMappingListEntity.CategoryId = '';
  }

  editCategory(CertificateId, CategoryId) {
    this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId)]);
  }


  certificateChange(CertificateId) {
    debugger
    this.globals.isLoading = true;
    for (var k = 0; k < this.certificateList.length; k++) {
      if (CertificateId == this.certificateList[k].CertificateId) {
        this.certificateCategoryMappingListEntity.certificateName = this.certificateList[k].CertificateName;
        this.certificateCategoryMappingListEntity.PracticeExamAttempts = this.certificateList[k].PracticeExamAttempts;
      }
    }
    if (this.certificateCategoryMappingListEntity.CertificateId == '') {
      this.CertificateError = true;
    } else {
      this.CertificateError = false;
    }

    if (this.CertificateError) {
      this.globals.isLoading = false;
    } else {
      this.CertificateCategoryMappingService.getByCertificateId(CertificateId)
        .then((data) => {
          this.linkingCategoryList = data;
          console.log(this.linkingCategoryList);
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
          console.log(this.linkingCategoryList);
          setTimeout(function () {
            $('#CategoryId').selectpicker('refresh');
          }, 1000);
          $("#noCertificate").hide();
          $("#newLinking").hide();
          $("#categoryDisplay").show();
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.CertificateCategoryMappingService.getAllDefault()
              .then((data) => {
                debugger
                //this.certificateList = data['Certificates'];
                this.categoryList = data['Categories'];
                this.globals.isLoading = false;
              },
                (error) => {
                  this.globals.isLoading = false;
                  // if (error.text) {
                  //   swal({
                  //     //position: 'top-end',
                  //     type: 'error',
                  //     title: 'Oops...',
                  //     text: "Something went wrong!"
                  //   })
                  // }
                  this.globals.pageNotfound(error.error.code);
                });
            setTimeout(function () {
              $('#CategoryId').selectpicker('refresh');
            }, 5000);
            $("#noCertificate").hide();
            $("#newLinking").show();
            $("#categoryDisplay").hide();
            swal({
              type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.type,
              title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.title,
              text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.text,
              showConfirmButton: false,
              timer: 4000
            })
          });
    }
  }
  certificatechange() {
    this.CertificateError = false;
  }
  linknewcategory() {
    this.submitted = false;
    //this.certificateCategoryMappingListEntity.CategoryId=0;

    setTimeout(function () {
      $("#link_new").modal('show');
      $('select').selectpicker("refresh");
    }, 100);

  }
  categoryLinking(categoryLinkingForm) {
    debugger
    var CategoryId = this.certificateCategoryMappingListEntity.CategoryId;
    var CertificateId = this.certificateCategoryMappingListEntity.CertificateId;
    var practiceItem = 0;
    for(var i=0;i<this.categoryList.length;i++)
    {
      if(this.categoryList[i].CategoryId == CategoryId)
      {
        practiceItem = this.categoryList[i].PracticeTestItems;
      }
    }
    this.submitted = true;
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

                this.router.navigate(['/admin/certificate-category-mapping/edit/' + window.btoa(CertificateId) + '/' + window.btoa(CategoryId)]);
                // this.router.navigate(['/admin/certificate-category-mapping/edit/' + CertificateId + '/' + CategoryId]);
              },
                (error) => {
                  this.globals.isLoading = false;
                  //this.btn_disable = false;
                  // swal({
                  //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                  //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                  //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                  //   showConfirmButton: false,
                  //   timer: 4000
                  // })
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

                this.CertificateCategoryMappingService.getByCertificateId(CertificateId)
                  .then((data) => {
                    this.linkingCategoryList = data;
                    console.log(this.linkingCategoryList);
                    for (var k = 0; k < this.certificateList.length; k++) {
                      if (CertificateId == this.certificateList[k].CertificateId) {
                        this.certificateCategoryMappingListEntity.certificateName = this.certificateList[k].CertificateName;
                        this.certificateCategoryMappingListEntity.PracticeExamAttempts = this.certificateList[k].PracticeExamAttempts;
                      }
                    }
                    this.certificateCategoryMappingListEntity.CategoryId = '';
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
                      // swal({
                      //   type: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.type,
                      //   title: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.title,
                      //   text: this.globals.adminTranslationText.certificateCategoryMapping.list.alerts.noCertificateMapping.text,
                      //   showConfirmButton: false,
                      //   timer: 4000
                      // })
                      this.globals.pageNotfound(error.error.code);
                    });
                this.router.navigate(['/admin/certificate-category-mapping/list/']);
              },
                (error) => {
                  this.globals.isLoading = false;
                  //this.btn_disable = false;

                  // swal({
                  //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                  //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                  //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                  //   showConfirmButton: false,
                  //   timer: 4000
                  // })
                  this.globals.pageNotfound(error.error.code);
                });
          }
          $('#link_new').modal('hide');
        })
    } else {

    }
  }

  isActiveChange(changeEntity, i) {
    debugger
    if (changeEntity.AssessmentTotalItems == 0) {
     
      swal({
        type: "warning",
        title: "Fill Data",
        text: "Please fill the data",
        showConfirmButton: false,
        timer: 4000
      })
      //$('#active' + i).prop("checked", false);
      setTimeout(() => {
        $('#IsActive'+i).removeClass('k-widget k-switch k-switch-on');
        $('#IsActive'+i).addClass('k-widget k-switch k-switch-off');
      }, 100);
    }
    else {
      if (changeEntity.IsActive == 1) {
        changeEntity.IsActive = 0;
      } else {
        changeEntity.IsActive = 1;
      }
      //  alert(changeEntity.IsActive);
      this.globals.isLoading = true;
      changeEntity.UpdatedBy = this.globals.authData.UserId;
      changeEntity.Id = changeEntity.CertificateAssessmentMappingId;
      changeEntity.TableName = 'tblmstcertificateassessmentmapping';
      changeEntity.FieldName = 'CertificateAssessmentMappingId';
      changeEntity.Module = 'AssessmentMapping';
      changeEntity.ModuleId = 2;
      changeEntity.Id2 = '';
      changeEntity.TableName2 = '';
      changeEntity.FieldName2 = '';
      if (changeEntity.IsActive == 1) {
        if (changeEntity.PracticeTotalItems != 0) {
          changeEntity.Id2 = changeEntity.CertificatePracticeTestMappingId;
          changeEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
          changeEntity.FieldName2 = 'CertificatePracticeTestMappingId';
        }
      }
      else {
        changeEntity.Id2 = changeEntity.CertificatePracticeTestMappingId;
        changeEntity.TableName2 = 'tblmstcertificatepracticetestmapping';
        changeEntity.FieldName2 = 'CertificatePracticeTestMappingId';
      }

      if (changeEntity.IsActive == 1) {
        changeEntity.ActivityText = "AssessmentMapping Activated";
      }
      else {
        changeEntity.ActivityText = "AssessmentMapping Deactivated";
      }
      this.CertificateCategoryMappingService.isActiveChange(changeEntity)
        .then((data) => {
          this.globals.isLoading = false;
          let index = this.linkingCategoryList.indexOf(changeEntity);

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
            // if (this.certificateList[i].IsActive == 1) {
            //   $('#active' + i).prop("checked", true);
            // }
            // else {
            //   $('#active' + i).prop("checked", false);
            // }
          });
    }
  }

  unlinkCategory(categoryData) {
    debugger
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
          categoryData.UserId = this.globals.authData.UserId;
          categoryData.Id = categoryData.CertificateAssessmentMappingId;
          categoryData.TableName = 'tblmstcertificateassessmentmapping';
          categoryData.FieldName = 'CertificateAssessmentMappingId';
          categoryData.Module = 'AssessmentMapping';
          categoryData.ModuleId = 2;

          categoryData.Id2 = categoryData.CertificatePracticeTestMappingId;
          categoryData.TableName2 = 'tblmstcertificatepracticetestmapping';
          categoryData.FieldName2 = 'CertificatePracticeTestMappingId';
          this.CertificateCategoryMappingService.unlinkCategory(categoryData)
            .then((data) => {

              let index = this.linkingCategoryList.indexOf(categoryData);
              if (index != -1) {
                this.linkingCategoryList.splice(index, 1);
              }
              var categorydata = { 'CategoryId': categoryData.CategoryId, 'CategoryName': categoryData.CategoryName, 'flag': 0, 'AssessmentItems': categoryData.isdisabled }
              this.categoryList.push(categorydata);
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
                // if (error.text) {
                //   swal({
                //     //position: 'top-end',
                //     type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //     title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //     text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   })
                // }
                this.globals.pageNotfound(error.error.code);
              });
        }
      })
  }

  itemDisabled(itemArgs: { dataItem: any, index: number }) {
    return itemArgs.dataItem.AssessmentItems == '0';
  }
}
