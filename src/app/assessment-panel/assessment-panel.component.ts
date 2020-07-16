import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AssessmentPanelService } from '../services/assessment-panel.service';
import { TestBed } from '@angular/core/testing';
import { IsNullFilterOperatorComponent } from '@progress/kendo-angular-grid';
declare var $, PerfectScrollbar, swal: any;

@Component({
  selector: 'app-assessment-panel',
  templateUrl: './assessment-panel.component.html',
  styleUrls: ['./assessment-panel.component.css']
})
export class AssessmentPanelComponent implements OnInit,OnDestroy  {

  assessmentTestListEntity;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  SubmitDisabled;
  TotalUnanswered;
  assessmentTestEntity;
  categoryList;
  addAssessmentTestEntity;
  certificatename;
  categoryname;
  finalSubmitEntity;
  finaloneshotAssessmentSubmitEntity;
  countEntity;
  UserAssessmentId;
  AssessmentTotalItems;
  answerCount;
  resultStatus;
  parentAssessment;
  assessmentTestList;
  testc;
  testt;
  HasSubcertificate;
  HasOneShotAssessment;
  getoneshotassessmentEntity;
  mappingIds;
  oneshotAssessmentTime;
  CategoryAssessmentTime;
  
  constructor(private router: Router, private route: ActivatedRoute, private AuthService: AuthService, private AssessmentPanelService: AssessmentPanelService, public globals: Globals) { }

  ngOnInit() {
    this.testc=40;
    this.assessmentTestListEntity = [];
    this.assessmentTestEntity = {};
    this.categoryList = {};
    this.addAssessmentTestEntity = {};
    this.finalSubmitEntity = {};
    this.finaloneshotAssessmentSubmitEntity = [];
    this.countEntity = [];
    this.getoneshotassessmentEntity = {};
    this.mappingIds = [];
    this.answerCount = 0;
    var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
    var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
    this.resultStatus = window.atob(this.route.snapshot.paramMap.get('resultStatus'));
    this.parentAssessment = window.atob(this.route.snapshot.paramMap.get('parentAssessment'));
    this.HasSubcertificate = window.atob(this.route.snapshot.paramMap.get('HasSubCertificate'));
    this.HasOneShotAssessment = window.atob(this.route.snapshot.paramMap.get('HasOneShotAssessment'));
    console.log(this.resultStatus + ' ' + this.parentAssessment + usercertificateid);
    
    // setTimeout(function () {
    //   $('.timer').startTimer({
    //     onComplete: function (element) {
    //       alert("saf");
    //     }
    //   });
    // }, 500);
    if (this.UserAssessmentId > 0)
      this.addAssessmentTestEntity.UserAssessmentId = this.UserAssessmentId;
    else
      this.addAssessmentTestEntity.UserAssessmentId = 0;

    var UserAssessmentId = window.atob(this.route.snapshot.paramMap.get('UserAssessmentId'));
    console.log(UserAssessmentId);
    if(this.HasOneShotAssessment == 0)
    {
      this.AssessmentPanelService.getByCertificateId(usercertificateid, UserAssessmentId)
      .then((data) => {
        debugger
        this.categoryList = data;
        this.certificatename = data[0].CertificateName;
        $('#assessmentcategorymodal').modal('show');
        console.log(data);
      },
        (error) => {
          this.globals.isLoading = false;
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
      else{
        this.getoneshotassessmentEntity.ScheduleAssessmentId = window.atob(this.route.snapshot.paramMap.get('ScheduleAssessmentId'));
        this.getoneshotassessmentEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        this.getoneshotassessmentEntity.UserId = this.globals.authData.UserId;
        this.getoneshotassessmentEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
        this.AssessmentPanelService.oneShotAssessment(this.getoneshotassessmentEntity)
          .then((data) => {
            debugger
            if(data == "43")
            {
              swal({
                type: 'warning',
                title: 'Stop Assessment',
                text: 'Your assessment is stopped by your proctor, now you can not give your assessment',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 5000
              })
              this.router.navigate(['/certificateDetails/' + this.route.snapshot.paramMap.get('usercertificateid')]);
            }
            else
            {
              this.assessmentTestListEntity = [];
              this.assessmentTestListEntity = data['all_question_details'];
              this.mappingIds = data['UserAssessmentMappingIds'];
              this.assessmentTestList = [];
              this.assessmentTestList = this.assessmentTestListEntity;
              this.testc = data['AssessmentTotalTime']*60;
              this.oneshotAssessmentTime = data['AssessmentTotalTime']*60;
              this.timedCount();
              setTimeout(function () {
                $('#carousel').flexslider({
                  animation: "slide",
                  controlNav: false,
                  animationLoop: false,
                  slideshow: false,
                  itemWidth: 60,
                  itemMargin: 0,
                  smoothHeight: true,
                  asNavFor: '#slider'
                });
                $('#slider').flexslider({
                  animation: "slide",
                  controlNav: false,
                  animationLoop: false,
                  slideshow: false,
                  smoothHeight: true,
                  sync: "#carousel"
                });
              }, 500);
              setTimeout(function () {
                // alert($("#slider").find(".flex-direction-nav").length);
                // alert($("#carousel").find(".flex-direction-nav").length);
                $("#carousel .flex-direction-nav").removeAttr("style");
                $("#slider .flex-direction-nav").removeAttr("style");
                $("#carousel .flex-direction-nav").last().css("display", "block");
                $("#slider .flex-direction-nav").last().css("display", "block");
              }, 1000);
              //this.categoryList = data;
              // this.certificatename = data[0].CertificateName;
              // $('#assessmentcategorymodal').modal('show');
              console.log(data);
            }
          },
          (error) => {
            this.globals.isLoading = false;
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

    this.dropdownList = [
      { filter_option_id: 1, filter_option_text: 'Answered' },
      { filter_option_id: 2, filter_option_text: 'Unanswered' },
      { filter_option_id: 3, filter_option_text: 'Mark as Reviewed' }
    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'Answered' },
      { item_id: 2, item_text: 'Unanswered' },
      { item_id: 3, item_text: 'Mark as Reviewed' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnDestroy() {
    clearInterval(this.testt);
    $('.timer').html("00:00:00");
  }

  secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
  }

callAlertMessage(){
  swal({
    title: 'Oops...',
    text: 'Your time is up.Kindly submit your assessment.',
    icon: "warning",
    type: 'warning',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonClass: 'theme_btn',
    confirmButtonText: 'Ok',
    allowOutsideClick: false
  }).then((result) => {
    debugger
    if (result.value) {
      var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
      var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
      if(this.HasOneShotAssessment == 0)
      {
        this.finalSubmitEntity.TimeOfCategory = this.addAssessmentTestEntity.CategoryAssessmentTime;
        this.finalSubmitEntity.TotalCategories = this.categoryList.length;
        this.finalSubmitEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
        this.finalSubmitEntity.UserAssessmentId = this.assessmentTestListEntity[0].UserAssessmentId;
        this.finalSubmitEntity.UserId = this.globals.authData.UserId;
        this.finalSubmitEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        this.finalSubmitEntity.UserName = this.globals.authData.FirstName+" "+this.globals.authData.LastName;
        this.finalSubmitEntity.RoleId= this.globals.authData.RoleId;
      }
      else
      {
        //['UserAssessmentMappingId'=>361,'CertificateId'=>2,'UserId'=>220,'UserAssessmentId'=>92,'UserCertificateId'=>53];
        this.finalSubmitEntity = [];
        var time = this.oneshotAssessmentTime / 60;
        for(var i = 0;i<this.mappingIds.length;i++)
        {
          var item = {'UserAssessmentMappingId':this.mappingIds[i],'CertificateId':certificateid,'UserId':this.globals.authData.UserId,'UserAssessmentId':this.assessmentTestListEntity[0].UserAssessmentId,'UserCertificateId': window.atob(this.route.snapshot.paramMap.get('usercertificateid')),
                      'TimeOfAssessment':time,'UserName':this.globals.authData.FirstName+" "+this.globals.authData.LastName,'RoleId':this.globals.authData.RoleId}
          this.finalSubmitEntity.push(item);
        }
      }
      this.globals.isLoading = true;
      // this.finalSubmitEntity.TotalCategories = this.categoryList.length;
      // this.finalSubmitEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
      // this.finalSubmitEntity.UserAssessmentId = this.assessmentTestListEntity[0].UserAssessmentId;
      // this.finalSubmitEntity.UserId = this.globals.authData.UserId;
      // this.finalSubmitEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
      if(this.HasOneShotAssessment == 0)
      {
        this.AssessmentPanelService.AddFinalSubmit(this.finalSubmitEntity)
        .then((data1) => {
          this.AssessmentPanelService.getByCertificateId(usercertificateid, this.UserAssessmentId)
            .then((data) => {
              debugger
              this.globals.isLoading = false;
              this.categoryList = {};
              this.categoryList = data;
              var count = 0;
              for (var i = 0; i < this.categoryList.length; i++) {
                if (this.categoryList[i].CategoryStatusId == 1) {
                  count++;
                }
              }
              if (count == this.categoryList.length) {
                this.router.navigate(['/assessment-result/' + window.btoa(this.assessmentTestListEntity[0].UserAssessmentId)]);
              }
              else {
                $('#assessmentcategorymodal').modal('show');
              }
            },
              (error) => {
                this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                this.globals.pageNotfound(error.error.code);
              });
        },
          (error) => {
            this.globals.pageNotfound(error.error.code);
          });
        }
        else
        {
          this.AssessmentPanelService.finalsubmitaddOneShotAssessment(this.finalSubmitEntity)
            .then((data1) => {
              this.router.navigate(['/assessment-result/' + window.btoa(this.assessmentTestListEntity[0].UserAssessmentId)]);
            },
          (error) => {
            this.globals.pageNotfound(error.error.code);
          });
        }
    }
  })
}

  timedCount() {
    let self = this;
    clearInterval(self.testt);
          $('.timer').html("00:00:00");  
    this.testt = setInterval(function() {
      self.testc--;
      // Display 'counter' wherever you want to display it.
      if (self.testc <= 0) {
           clearInterval(self.testt);
           $('.timer').html("00:00:00");
           self.callAlertMessage();
          return;
      }else{
        $('.timer').text(self.secondsTimeSpanToHMS(self.testc));
        $('.timer').attr("title",self.secondsTimeSpanToHMS(self.testc));
       // //console.log("Timer --> " + self.testc);
      }
  }, 1000);
  }
 
  addPracticeTest(i) {
    if (this.UserAssessmentId > 0)
      this.addAssessmentTestEntity.UserAssessmentId = this.UserAssessmentId;
    else
      this.addAssessmentTestEntity.UserAssessmentId = 0;
    debugger
    this.categoryname = this.categoryList[i].CategoryName;
    this.AssessmentTotalItems = this.categoryList[i].AssessmentTotalItems;
    this.globals.isLoading = true;
    var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
    var ScheduleAssessmentId = window.atob(this.route.snapshot.paramMap.get('ScheduleAssessmentId'));
    var HasSubCertificate = window.atob(this.route.snapshot.paramMap.get('HasSubCertificate'));
    this.addAssessmentTestEntity.ScheduleAssessmentId = ScheduleAssessmentId;
    this.addAssessmentTestEntity.UserCertificateId = usercertificateid;
    this.addAssessmentTestEntity.UserId = this.globals.authData.UserId;
    this.addAssessmentTestEntity.CertificateId = this.categoryList[i].CertificateId;
    this.addAssessmentTestEntity.CategoryId = this.categoryList[i].CategoryId;
    this.addAssessmentTestEntity.CertificateAssessmentMappingId = this.categoryList[i].CertificateAssessmentMappingId;
    this.addAssessmentTestEntity.AssessmentTotalItems = this.categoryList[i].AssessmentTotalItems;
    this.addAssessmentTestEntity.ScoreItems = this.categoryList[i].ScoreItems;
    this.addAssessmentTestEntity.NoneScoreItems = this.categoryList[i].NoneScoreItems;
    this.addAssessmentTestEntity.HasSubCertificate = HasSubCertificate;
    this.addAssessmentTestEntity.CategoryAssessmentTime = parseInt(this.categoryList[i].CategoryAssessmentTime);
    //console.log(this.addAssessmentTestEntity);
    var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));

    this.AssessmentPanelService.addAssessment(this.addAssessmentTestEntity)
      .then((data) => {
        debugger
        if (data) {
          if(data == "43")
          {
            swal({
              type: 'warning',
              title: 'Stop Assessment',
              text: 'Your assessment is stopped by your proctor, now you can not give your assessment',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 5000
            })
            $('#assessmentcategorymodal').modal('hide');
            this.router.navigate(['/certificateDetails/' + this.route.snapshot.paramMap.get('usercertificateid')]);
          }
          else
          {
            this.UserAssessmentId = data['UserAssessmentId'];
            var UserAssessmentMappingId = data['UserAssessmentMappingId'];
            this.AssessmentPanelService.getById(UserAssessmentMappingId)
              .then((data1) => {
                debugger
                this.globals.isLoading = false;
                console.log(data1);
                this.testc = this.addAssessmentTestEntity.CategoryAssessmentTime*60;
                this.timedCount();
                $('#carousel').flexslider('destroy');
                $('#slider').flexslider('destroy');
                $('#assessmentcategorymodal').modal('hide');
                $('.flexslider').removeData('flexslider');
                this.assessmentTestListEntity = [];
                this.assessmentTestListEntity = data1;
                this.assessmentTestList = [];
                this.assessmentTestList = this.assessmentTestListEntity;
                // //console.log(this.assessmentTestListEntity);
                // //console.log(this.assessmentTestList);
                this.finalSubmitEntity.UserAssessmentMappingId = this.assessmentTestListEntity[0].UserAssessmentMappingId;
                setTimeout(function () {
                  $('#carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: 60,
                    itemMargin: 0,
                    smoothHeight: true,
                    asNavFor: '#slider'
                  });
                  $('#slider').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    smoothHeight: true,
                    sync: "#carousel"
                  });
                }, 500);
                setTimeout(function () {
                  // alert($("#slider").find(".flex-direction-nav").length);
                  // alert($("#carousel").find(".flex-direction-nav").length);
                  $("#carousel .flex-direction-nav").removeAttr("style");
                  $("#slider .flex-direction-nav").removeAttr("style");
                  $("#carousel .flex-direction-nav").last().css("display", "block");
                  $("#slider .flex-direction-nav").last().css("display", "block");
                }, 1000);
              },
              (error) => {
                this.globals.isLoading = false;
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

        }
      },
        (error) => {
          this.globals.isLoading = false;
          // swal({
          //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
          //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
          //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
          //   showConfirmButton: false,
          //   timer: 4000
          // })
          //this.globals.pageNotfound(error.error.code);
        });
  }

  filter_assessment(event)
  {
    debugger
    //alert(event);
    // //console.log(this.assessmentTestList);
    // //console.log(this.assessmentTestListEntity);
    if(event.length>0)
    {
      this.assessmentTestListEntity = [];
      var testList = [];
      for (var i = 0; i < event.length; i++) {
        if (event[i] == 3) {          
          for(var j=0;j<this.assessmentTestList.length;j++)
          {
            if(this.assessmentTestList[j].MarkAsReview == true || this.assessmentTestList[j].MarkAsReview == 1)
            {
              testList.push(this.assessmentTestList[j]);
            }
          }
        } 
        if (event[i] == 2) {
          for(var j=0;j<this.assessmentTestList.length;j++)
          {
            if(this.assessmentTestList[j].UserItemOptionId == null && (this.assessmentTestList[j].MarkAsReview != true || this.assessmentTestList[j].MarkAsReview != 1))
            {
              testList.push(this.assessmentTestList[j]);
            }
          }
        } 
        if (event[i] == 1) {
          for(var j=0;j<this.assessmentTestList.length;j++)
          {
            if(this.assessmentTestList[j].UserItemOptionId != null  && (this.assessmentTestList[j].MarkAsReview != true || this.assessmentTestList[j].MarkAsReview != 1))
            {
              testList.push(this.assessmentTestList[j]);
            }
          }
        }
      }
      //console.log(testList);
      this.assessmentTestListEntity = testList;
    }
    else{
      this.assessmentTestListEntity = this.assessmentTestList;
      
    }
    setTimeout(function () {
      $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 60,
        itemMargin: 0,
        smoothHeight: true,
        asNavFor: '#slider'
      });
      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        smoothHeight: true,
        sync: "#carousel"
      });
    }, 500);
    setTimeout(function () {
      // alert($("#slider").find(".flex-direction-nav").length);
      // alert($("#carousel").find(".flex-direction-nav").length);
      $("#carousel .flex-direction-nav").removeAttr("style");
      $("#slider .flex-direction-nav").removeAttr("style");
      $("#carousel .flex-direction-nav").last().css("display", "block");
      $("#slider .flex-direction-nav").last().css("display", "block");
    }, 1000);
    //console.log(this.assessmentTestListEntity);
    // this.assessmentTestListEntity = this.assessmentTestListEntity.filter(docs => {
    //   return docs.flag == 0;
    // });

  }
  onItemSelect(item: any) {
    //this.filterData();
  }

  onSelectAll(items: any) {
    this.selectedItems = [
      { item_id: 1, item_text: 'Answered' },
      { item_id: 2, item_text: 'Unanswered' },
      { item_id: 3, item_text: 'Mark as Reviewed' }
    ];
    //this.filterData();
  }

  onItemDeSelect(items: any) {
    //this.filterData();
  }

  onDeSelectAll(items: any) {
    this.selectedItems = [];
    //this.filterData();
  }

  k = 1;
  questionitemid = '';
  addAssessmentAnswer(ItemOptionId, CorrectOptionId, AssessmentAnswerId, i, itemid,Optionvalue,IsCorrectAnswer,AnswerTypeId,j) {
    debugger //alert(ItemOptionId+" "+CorrectOptionId+" "+PracticeTestAnswerId+" "+i)
    
    $("#questionblock" + (i + 1)).addClass('complete');
    if(AnswerTypeId == 78)
    {
      this.assessmentTestListEntity[i].UserItemOptionId = ItemOptionId;
      var count = 0;
      for(var a=0;a<this.assessmentTestListEntity[i].ItemOptions.length;a++)
      {
        if(a==j)
        {
          if($("#UserItemOptionId" + i + j).is(':checked'))
          {
            IsCorrectAnswer = IsCorrectAnswer;
          }
          else
          {
            IsCorrectAnswer = 0;
          }
        }
        if($("#UserItemOptionId" + i + a).is(':checked'))
        {
          count++;
        }
      }
      if(count == 0)
      {
        $("#questionblock" + (i + 1)).removeClass('complete');
        this.assessmentTestListEntity[i].UserItemOptionId = null;
      }
      
    }
    else if(AnswerTypeId == 76)
    {
      this.assessmentTestListEntity[i].UserItemOptionId = 0;
    }
    if (this.questionitemid == '') {
      this.questionitemid = itemid;
    }
    if (this.questionitemid != '' && this.questionitemid != itemid) {
      this.questionitemid = itemid;
      this.k++;
    }
    if (this.assessmentTestListEntity[i].MarkAsReview) {
      this.assessmentTestListEntity[i].MarkAsReview = 1;
    }
    else {
      this.assessmentTestListEntity[i].MarkAsReview = 0;
    }
    this.assessmentTestListEntity[i].UserAnswerValue = Optionvalue;
    this.assessmentTestEntity.AssessmentAnswerId = AssessmentAnswerId;
    this.assessmentTestEntity.UserItemOptionId = ItemOptionId;
    this.assessmentTestEntity.CorrectOptionId = CorrectOptionId;
    this.assessmentTestEntity.IsCorrectAnswer = IsCorrectAnswer;
    this.assessmentTestEntity.UserId = this.globals.authData.UserId;
    this.assessmentTestEntity.MarkAsReview = this.assessmentTestListEntity[i].MarkAsReview;
    this.assessmentTestEntity.DescriptiveAnswer = this.assessmentTestListEntity[i].DescriptiveAnswer;
    this.assessmentTestEntity.ScheduleAssessmentId = window.atob(this.route.snapshot.paramMap.get('ScheduleAssessmentId'));
    this.AssessmentPanelService.addAssessmentAnswer(this.assessmentTestEntity)
      .then((data1) => {
        if(data1 == 43)
        {
          swal({
              type: 'warning',
              title: 'Stop Assessment',
              text: 'Your assessment is stopped by your proctor, now you can not give your assessment',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 5000
            })
          this.router.navigate(['/certificateDetails/' + this.route.snapshot.paramMap.get('usercertificateid')]);
        }
        //console.log(this.assessmentTestListEntity);
      },
        (error) => {
          //this.answerCount ++;
        });
    this.countEntity.push(this.assessmentTestEntity);
  }
  markasreview(CorrectOptionId, AssessmentAnswerId, i, ItemId) {
    debugger
    //alert(CorrectOptionId);
    var UserItemOptionId = '';
    ////console.log(CorrectOptionId);
    if (this.assessmentTestListEntity[i].UserItemOptionId == null) {
      UserItemOptionId = null;
    }
    else {
      UserItemOptionId = this.assessmentTestListEntity[i].UserItemOptionId;
    }
    //$("#questionblock" + (i + 1)).addClass('fa fa-star');
    // alert(CorrectOptionId+" "+AssessmentAnswerId+" "+i+" "+ ItemId);
    //this.addAssessmentAnswer(UserItemOptionId,CorrectOptionId,AssessmentAnswerId,i,ItemId);
    if (this.assessmentTestListEntity[i].MarkAsReview) {
      this.assessmentTestListEntity[i].MarkAsReview = 1;
    }
    else {
      this.assessmentTestListEntity[i].MarkAsReview = 0;
    }

    this.assessmentTestEntity.AssessmentAnswerId = AssessmentAnswerId;
    this.assessmentTestEntity.UserItemOptionId = UserItemOptionId;
    this.assessmentTestEntity.CorrectOptionId = CorrectOptionId;
    this.assessmentTestEntity.UserId = this.globals.authData.UserId;
    this.assessmentTestEntity.MarkAsReview = this.assessmentTestListEntity[i].MarkAsReview;
    this.assessmentTestEntity.ScheduleAssessmentId = window.atob(this.route.snapshot.paramMap.get('ScheduleAssessmentId'));

    this.AssessmentPanelService.addAssessmentAnswer(this.assessmentTestEntity)
      .then((data1) => {
        if(data1 == 43)
        {
          swal({
              type: 'warning',
              title: 'Stop Assessment',
              text: 'Your assessment is stopped by your proctor, now you can not give your assessment',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 5000
            })
          this.router.navigate(['/certificateDetails/' + this.route.snapshot.paramMap.get('usercertificateid')]);
        }
      },
        (error) => {
          //this.answerCount ++;
        });
  }
  
  assessmentSubmit()
  {
    var count = 0;
    for (let i = 0; i < this.assessmentTestListEntity.length; i++) {
      if ((this.assessmentTestListEntity[i]['UserItemOptionId'] == null || this.assessmentTestListEntity[i]['UserItemOptionId'] == '' || this.assessmentTestListEntity[i]['UserItemOptionId'] == undefined) && this.assessmentTestListEntity[i]['UserItemOptionId'] != 0) {
        count++;
      }
    }
    console.log(this.assessmentTestListEntity);
    if (count == 0) {
      $("#assessment_preview_modal").modal('show');
    }
    else {
      swal.fire({
        type: 'warning',
        title: 'Oops...',
        text: 'Please attempt all the items!',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonClass: 'theme_btn',
        confirmButtonText: 'Ok'
      })
    }
  }
  finalAssessmentSubmit() {
    debugger
    console.log($('.timer').html());
    
    // var totalMinutes = $('.timer').html();

    // var hours = Math.floor(totalMinutes / 60);          
    // var minutes = totalMinutes % 60;

    // console.log(hours);
    // console.log(minutes);    

    var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
    var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
    $("#assessment_preview_modal").modal('hide');
    if(this.HasOneShotAssessment == 0)
    {
      console.log(this.secondsTimeSpanToHMS(this.addAssessmentTestEntity.CategoryAssessmentTime*60));
      var time1 = this.secondsTimeSpanToHMS(this.addAssessmentTestEntity.CategoryAssessmentTime*60);   // category original time your input string
      var t1 = time1.split(':'); // split it at the colons

      var time2 = $('.timer').html(); // remaining time
      var t2 = time2.split(":");
      // Hours are worth 60 minutes.
      //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);;
      var minutes1 = (+t1[0]) * 60 + (+t1[1]);
      var minutes2 = (+t2[0]) * 60 + (+t2[1]);

      console.log(minutes1 + ' '+ minutes2);
      console.log(minutes1 - minutes2);
      this.finalSubmitEntity.TimeOfCategory = minutes1 - minutes2;
      this.finalSubmitEntity.TotalCategories = this.categoryList.length;
      this.finalSubmitEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
      this.finalSubmitEntity.UserAssessmentId = this.assessmentTestListEntity[0].UserAssessmentId;
      this.finalSubmitEntity.UserId = this.globals.authData.UserId;
      this.finalSubmitEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
      this.finalSubmitEntity.UserName = this.globals.authData.FirstName+" "+this.globals.authData.LastName;
      this.finalSubmitEntity.RoleId= this.globals.authData.RoleId;
    }
    else
    {
      //['UserAssessmentMappingId'=>361,'CertificateId'=>2,'UserId'=>220,'UserAssessmentId'=>92,'UserCertificateId'=>53];
      this.finalSubmitEntity = [];
      var time1 = this.secondsTimeSpanToHMS(this.oneshotAssessmentTime);   // Assessment original time your input string
      var t1 = time1.split(':'); // split it at the colons

      var time2 = $('.timer').html(); // remaining time
      var t2 = time2.split(":");
      // Hours are worth 60 minutes.
      //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);;
      var minutes1 = (+t1[0]) * 60 + (+t1[1]);
      var minutes2 = (+t2[0]) * 60 + (+t2[1]);

      console.log(minutes1 + ' '+ minutes2);
      console.log(minutes1 - minutes2);
      for(var i = 0;i<this.mappingIds.length;i++)
      {
        var item = {'UserAssessmentMappingId':this.mappingIds[i],'CertificateId':certificateid,'UserId':this.globals.authData.UserId,
                    'UserAssessmentId':this.assessmentTestListEntity[0].UserAssessmentId,'UserCertificateId': window.atob(this.route.snapshot.paramMap.get('usercertificateid')),
                    'TimeOfAssessment':minutes1 - minutes2,'UserName':this.globals.authData.FirstName+" "+this.globals.authData.LastName,'RoleId':this.globals.authData.RoleId}
        this.finalSubmitEntity.push(item);
      }
    }
    clearInterval(this.testt);
          $('.timer').html("00:00:00");
    console.log(this.finalSubmitEntity);
    this.globals.isLoading = true;
    if(this.HasOneShotAssessment == 0)
    {
      this.AssessmentPanelService.AddFinalSubmit(this.finalSubmitEntity)
      .then((data1) => {
        this.AssessmentPanelService.getByCertificateId(usercertificateid, this.UserAssessmentId)
        .then((data) => {
          debugger
          this.globals.isLoading = false;
          this.categoryList = {};
          this.categoryList = data;
          console.log(data);
          var count = 0;
          for (var i = 0; i < this.categoryList.length; i++) {
            if(this.resultStatus > 0 && this.HasSubcertificate == 1)
            {
              if ((this.categoryList[i].CategoryStatusId == 1 && this.categoryList[i].parent_assessment>0) || (this.categoryList[i].CategoryStatusId == 1 && this.categoryList[i].parent_assessment == 0 && this.categoryList[i].categoryResultStatus == 'Pass')) {
                count++;
              }  
            }
            else
            {
              if (this.categoryList[i].CategoryStatusId == 1) {
                count++;
              }
            }            
          }
          if (count == this.categoryList.length) {
            this.router.navigate(['/assessment-result/' + window.btoa(this.assessmentTestListEntity[0].UserAssessmentId)]);
          }
          else {            
            $('#assessmentcategorymodal').modal('show');            
          }
        },
        (error) => {
          this.globals.isLoading = false;
          // swal({
          //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
          //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
          //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
          //   showConfirmButton: false,
          //   timer: 4000
          // })
          this.globals.pageNotfound(error.error.code);
        });
      },
        (error) => {
          this.globals.pageNotfound(error.error.code);
        });  
      }  
      else{
        this.AssessmentPanelService.finalsubmitaddOneShotAssessment(this.finalSubmitEntity)
      .then((data1) => {
        this.router.navigate(['/assessment-result/' + window.btoa(this.assessmentTestListEntity[0].UserAssessmentId)]);
      },
      (error) => {
        this.globals.pageNotfound(error.error.code);
      });
      }
  }

  backdashboard() {
    swal({
      title: this.globals.commonTranslationText.practiceTest.alerts.title,
      text: this.globals.commonTranslationText.practiceTest.alerts.text,
      icon: "warning",
      type: this.globals.commonTranslationText.practiceTest.alerts.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.value) {
        $("#assessmentcategorymodal").modal('hide');
        this.router.navigate(['/certificateDetails',this.route.snapshot.paramMap.get('usercertificateid')]);
      }
      else {

      }
    })
  }

}

