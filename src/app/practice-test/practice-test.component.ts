import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PracticeTestService } from '../services/practice-test.service';
declare var $, swal: any;

@Component({
  selector: 'app-practice-test',
  templateUrl: './practice-test.component.html',
  styleUrls: ['./practice-test.component.css']
})
export class PracticeTestComponent implements OnInit {

  practiceTestListEntity;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  SubmitDisabled;
  TotalAnswered;
  TotalUnanswered;
  practiceTestEntity;
  categoryList;
  addPracticeTestEntity;
  certificatename;
  categoryname;
  finalSubmitEntity;
  countEntity;
  UserPracticeTestId;
  UserPracticeTestMappingId;
  PracticeTotalItems;
  CategoryAssessmentTime;
  practiceTestList;
  testc;
  testt;
  HasOneShotAssessment;
  getoneshotpracticeEntity;
  mappingIds;
  oneshotPracticeTime;
  constructor(private router: Router, private route: ActivatedRoute, private PracticeTestService: PracticeTestService, public globals: Globals) { }

  ngOnInit() {
    
    $(".timer").empty();
    this.testc=40;
    this.practiceTestListEntity = {};
    this.practiceTestEntity = {};
    this.categoryList = {};
    this.addPracticeTestEntity = {};
    this.finalSubmitEntity = {};
    this.getoneshotpracticeEntity = {};
    this.mappingIds = [];
    this.countEntity = [];
    var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
    var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
    var userpracticetestid = window.atob(this.route.snapshot.paramMap.get('userpracticetestid'));
    this.HasOneShotAssessment = window.atob(this.route.snapshot.paramMap.get('HasOneShotAssessment'));
    if(this.HasOneShotAssessment == 0)
    {
      this.PracticeTestService.getByCertificateId(usercertificateid, userpracticetestid)
      .then((data) => {
        // //debugger
        this.categoryList = data;
        $('#practicecategorymodal').modal('show');
        //console.log(this.categoryList);
        this.certificatename = data[0].CertificateName;
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
      else
      {debugger
        this.getoneshotpracticeEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        this.getoneshotpracticeEntity.UserId = this.globals.authData.UserId;
        this.getoneshotpracticeEntity.CertificateId = window.atob(this.route.snapshot.paramMap.get('certificateid'));
        this.PracticeTestService.oneShotPractice(this.getoneshotpracticeEntity)
          .then((data) => {
            debugger
            $('#carousel').flexslider('destroy');
            $('#slider').flexslider('destroy');
            $('#practicecategorymodal').modal('hide');
            $('.flexslider').removeData('flexslider');
            this.practiceTestListEntity = [];
            this.practiceTestListEntity = data['all_question_details'];
            this.mappingIds = data['UserPracticeTestMappingIds'];
            this.practiceTestList = [];
            this.practiceTestList = this.practiceTestListEntity;
            this.testc = data['PracticeTestTotalTime']*60;
            this.oneshotPracticeTime = data['PracticeTestTotalTime']*60;
            this.timedCount();
            setTimeout(function () {
              $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 60,
                itemMargin: 0,
                asNavFor: '#slider'
              });
              $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
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
        this.dropdownList = [
          { filter_option_id: 1, filter_option_text: 'Answered' },
          { filter_option_id: 2, filter_option_text: 'Unanswered' },
          { filter_option_id: 3, filter_option_text: 'Mark as Reviewed' }
        ];
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
    //debugger
    if (result.value) {
      var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
      var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        
      if(this.HasOneShotAssessment == 0)
      {
        this.globals.isLoading = true;
        console.log(this.secondsTimeSpanToHMS(this.addPracticeTestEntity.CategoryAssessmentTime*60));
        var time1 = this.secondsTimeSpanToHMS(this.addPracticeTestEntity.CategoryAssessmentTime*60);   // category original time your input string
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
        this.finalSubmitEntity.UserPracticeTestId = this.practiceTestListEntity[0].UserPracticeTestId;
        this.finalSubmitEntity.UserId = this.globals.authData.UserId;
        this.finalSubmitEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
        this.finalSubmitEntity.UserName = this.globals.authData.FirstName+" "+this.globals.authData.LastName;
        this.finalSubmitEntity.RoleId= this.globals.authData.RoleId;
        this.PracticeTestService.AddFinalSubmit(this.finalSubmitEntity)
        .then((data1) => {
          this.PracticeTestService.getByCertificateId(usercertificateid, this.UserPracticeTestId)
            .then((data) => {
              // //debugger        
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
                this.router.navigate(['/practice-result/' + window.btoa(this.practiceTestListEntity[0].UserPracticeTestId)]);
              }
              else {
                $('#practicecategorymodal').modal('show');
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
        this.finalSubmitEntity = [];
        var time = this.oneshotPracticeTime / 60;
        for(var i = 0;i<this.mappingIds.length;i++)
        {
          var item = {'UserPracticeTestMappingId':this.mappingIds[i],'CertificateId':certificateid,'UserId':this.globals.authData.UserId,'UserPracticeTestId':this.practiceTestListEntity[0].UserPracticeTestId,'UserCertificateId': usercertificateid
                      ,'TimeOfPracticeTest':time,'UserName':this.globals.authData.FirstName+" "+this.globals.authData.LastName,'RoleId':this.globals.authData.RoleId}
          this.finalSubmitEntity.push(item);
        }
        this.PracticeTestService.finalsubmitaddOneShotAssessment(this.finalSubmitEntity)
        .then((data1) => {
          this.router.navigate(['/practice-result/' + window.btoa(this.practiceTestListEntity[0].UserPracticeTestId)]);
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
        //console.log("Timer --> " + self.testc);
      }
  }, 1000);
  }

  addPracticeTest(i) {
    //debugger
    let self = this;
    if (this.UserPracticeTestId > 0) {
      this.addPracticeTestEntity.UserPracticeTestId = this.UserPracticeTestId;
      this.addPracticeTestEntity.Flag = 1;
    }
    else {
      this.addPracticeTestEntity.UserPracticeTestId = 0;
      this.addPracticeTestEntity.Flag = window.atob(this.route.snapshot.paramMap.get('flag'));
    }

    if (this.UserPracticeTestMappingId > 0) {
      this.addPracticeTestEntity.UserPracticeTestMappingId = this.UserPracticeTestMappingId;
    }
    else {
      this.addPracticeTestEntity.UserPracticeTestMappingId = 0;
    }
    this.categoryname = this.categoryList[i].CategoryName;
    this.PracticeTotalItems = this.categoryList[i].PracticeTotalItems;
    this.CategoryAssessmentTime = parseInt(this.categoryList[i].CategoryAssessmentTime);
    // alert(this.CategoryAssessmentTime);
    this.globals.isLoading = true;
    var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
    this.addPracticeTestEntity.UserCertificateId = usercertificateid;
    this.addPracticeTestEntity.UserId = this.globals.authData.UserId;
    this.addPracticeTestEntity.CertificateId = this.categoryList[i].CertificateId;
    this.addPracticeTestEntity.CategoryId = this.categoryList[i].CategoryId;
    this.addPracticeTestEntity.CertificatePracticeTestMappingId = this.categoryList[i].CertificatePracticeTestMappingId;
    this.addPracticeTestEntity.ScoreItems = this.categoryList[i].ScoreItems;
    this.addPracticeTestEntity.NoneScoreItems = this.categoryList[i].NoneScoreItems;
    this.addPracticeTestEntity.PracticeTotalItems = this.categoryList[i].PracticeTotalItems;
    this.addPracticeTestEntity.CategoryAssessmentTime = parseInt(this.categoryList[i].CategoryAssessmentTime);

    // var b = document.querySelector(".timer");
    // b.setAttribute('data-minutes-left', this.addPracticeTestEntity.CategoryAssessmentTime);
    // $('.timer').startTimer();

    // //console.log(this.addPracticeTestEntity);
    // alert(this.categoryList[i].CategoryAssessmentTime);

    this.PracticeTestService.addPracticeTest(this.addPracticeTestEntity)
      .then((data) => {
        // //debugger        
        if (data) {
          this.UserPracticeTestId = data['UserPracticeTestId'];
          this.UserPracticeTestMappingId = data['UserPracticeTestMappingId'];
          this.PracticeTestService.getById(this.UserPracticeTestMappingId)
            .then((data1) => {
              //debugger      
              console.log(data1);  
              this.globals.isLoading = false;
              this.testc = this.addPracticeTestEntity.CategoryAssessmentTime*60;
              //console.log('');
              this.timedCount();
              $('#carousel').flexslider('destroy');
              $('#slider').flexslider('destroy');
              $('#practicecategorymodal').modal('hide');
              $('.flexslider').removeData('flexslider');
              this.practiceTestListEntity = {};
              this.practiceTestListEntity = data1;
              //console.log(this.practiceTestListEntity);
              this.practiceTestList = [];
              this.practiceTestList = this.practiceTestListEntity;
              this.finalSubmitEntity.UserPracticeTestMappingId = this.practiceTestListEntity[0].UserPracticeTestMappingId;
              setTimeout(function () {
                $('#carousel').flexslider({
                  animation: "slide",
                  controlNav: false,
                  animationLoop: false,
                  slideshow: false,
                  itemWidth: 60,
                  itemMargin: 0,
                  asNavFor: '#slider'
                });
                $('#slider').flexslider({
                  animation: "slide",
                  controlNav: false,
                  animationLoop: false,
                  slideshow: false,
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

  filter_practice(event)
  {
    //debugger
    //alert(event);
    // //console.log(this.practiceTestList);
    // //console.log(this.practiceTestListEntity);
    if(event.length>0)
    {
      this.practiceTestListEntity = [];
      var testList = [];
      for (var i = 0; i < event.length; i++) {
        if (event[i] == 3) {          
          for(var j=0;j<this.practiceTestList.length;j++)
          {
            if(this.practiceTestList[j].MarkAsReview == true || this.practiceTestList[j].MarkAsReview == 1)
            {
              testList.push(this.practiceTestList[j]);
            }
          }
        } 
        if (event[i] == 2) {
          for(var j=0;j<this.practiceTestList.length;j++)
          {
            if(this.practiceTestList[j].UserItemOptionId == null && (this.practiceTestList[j].MarkAsReview != true || this.practiceTestList[j].MarkAsReview != 1))
            {
              testList.push(this.practiceTestList[j]);
            }
          }
        } 
        if (event[i] == 1) {
          for(var j=0;j<this.practiceTestList.length;j++)
          {
            if(this.practiceTestList[j].UserItemOptionId != null  && (this.practiceTestList[j].MarkAsReview != true || this.practiceTestList[j].MarkAsReview != 1))
            {
              testList.push(this.practiceTestList[j]);
            }
          }
        }
      }
      //console.log(testList);
      this.practiceTestListEntity = testList;
    }
    else{
      this.practiceTestListEntity = this.practiceTestList;
      
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
    //console.log(this.practiceTestListEntity);

  }
  k = 1;
  questionitemid = '';
  addPracticeAnswer(ItemOptionId, CorrectOptionId, PracticeTestAnswerId, i, itemid,Optionvalue,IsCorrectAnswer,AnswerTypeId,j) {
    debugger
    $("#questionblock" + (i + 1)).addClass('complete');
    if(AnswerTypeId == 78)
    {
      this.practiceTestListEntity[i].UserItemOptionId = ItemOptionId;
      var count = 0;
      for(var a=0;a<this.practiceTestListEntity[i].ItemOptions.length;a++)
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
        this.practiceTestListEntity[i].UserItemOptionId = null;
      }
      
    }
    else if(AnswerTypeId == 76)
    {
      this.practiceTestListEntity[i].UserItemOptionId = 0;
    }
    if (this.questionitemid == '') {
      this.questionitemid = itemid;
    }
    if (this.questionitemid != '' && this.questionitemid != itemid) {
      this.questionitemid = itemid;
      this.k++;
    }
    if (this.practiceTestEntity.MarkAsReview == true) {
      this.practiceTestEntity.MarkAsReview = 1;
    }
    else
      this.practiceTestEntity.MarkAsReview = 0;

    this.practiceTestListEntity[i].UserAnswerValue = Optionvalue; 
    this.practiceTestEntity.PracticeTestAnswerId = PracticeTestAnswerId;
    this.practiceTestEntity.UserItemOptionId = ItemOptionId;
    this.practiceTestEntity.CorrectOptionId = CorrectOptionId;
    this.practiceTestEntity.IsCorrectAnswer = IsCorrectAnswer;
    this.practiceTestEntity.UserId = this.globals.authData.UserId;
    this.practiceTestEntity.MarkAsReview = this.practiceTestListEntity[i].MarkAsReview;
    this.practiceTestEntity.DescriptiveAnswer = this.practiceTestListEntity[i].DescriptiveAnswer;

    this.PracticeTestService.AddPracticeAnswers(this.practiceTestEntity)
      .then((data1) => {

      },
        (error) => {
        });
    this.countEntity.push(this.practiceTestEntity);

    //$('#totalAnswered').text(this.k);
    //this.k++;

  }
  markasreview(CorrectOptionId, PracticeTestAnswerId, i, ItemId) {
    //debugger
    //alert(CorrectOptionId);
    var UserItemOptionId = '';
    ////console.log(CorrectOptionId);
    if (this.practiceTestListEntity[i].UserItemOptionId == null) {
      UserItemOptionId = null;
    }
    else {
      UserItemOptionId = this.practiceTestListEntity[i].UserItemOptionId;
    }
    //$("#questionblock" + (i + 1)).addClass('fa fa-star');
    // alert(CorrectOptionId+" "+AssessmentAnswerId+" "+i+" "+ ItemId);
    //this.addAssessmentAnswer(UserItemOptionId,CorrectOptionId,AssessmentAnswerId,i,ItemId);
    if (this.practiceTestListEntity[i].MarkAsReview == true) {
      this.practiceTestListEntity[i].MarkAsReview = 1;
    }
    else {
      this.practiceTestListEntity[i].MarkAsReview = 0;
    }

    this.practiceTestEntity.PracticeTestAnswerId = PracticeTestAnswerId;
    this.practiceTestEntity.UserItemOptionId = UserItemOptionId;
    this.practiceTestEntity.CorrectOptionId = CorrectOptionId;
    this.practiceTestEntity.UserId = this.globals.authData.UserId;
    this.practiceTestEntity.MarkAsReview = this.practiceTestListEntity[i].MarkAsReview;

    this.PracticeTestService.AddPracticeAnswers(this.practiceTestEntity)
      .then((data1) => {

      },
        (error) => {
          //this.answerCount ++;
        });
  }
  practiceSubmit()
  {
    var count = 0;
    for (let i = 0; i < this.practiceTestListEntity.length; i++) {
      if ((this.practiceTestListEntity[i]['UserItemOptionId'] == null || this.practiceTestListEntity[i]['UserItemOptionId'] == '' || this.practiceTestListEntity[i]['UserItemOptionId'] == undefined) && this.practiceTestListEntity[i]['UserItemOptionId'] != 0) {
        count++;
      }
    }
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
  finalPracticeSubmit() {
    debugger
    

    $("#assessment_preview_modal").modal('hide');
    var certificateid = window.atob(this.route.snapshot.paramMap.get('certificateid'));
    var usercertificateid = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
    
    console.log(this.practiceTestListEntity);
    if(this.HasOneShotAssessment == 0)
    {
      console.log(this.secondsTimeSpanToHMS(this.addPracticeTestEntity.CategoryAssessmentTime*60));
      var time1 = this.secondsTimeSpanToHMS(this.addPracticeTestEntity.CategoryAssessmentTime*60);   // category original time your input string
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

      this.finalSubmitEntity.UserPracticeTestId = this.practiceTestListEntity[0].UserPracticeTestId;
      this.finalSubmitEntity.UserId = this.globals.authData.UserId;
      this.finalSubmitEntity.UserCertificateId = window.atob(this.route.snapshot.paramMap.get('usercertificateid'));
      this.finalSubmitEntity.UserName = this.globals.authData.FirstName+" "+this.globals.authData.LastName;
      this.finalSubmitEntity.RoleId= this.globals.authData.RoleId;
      this.globals.isLoading = true;
      this.PracticeTestService.AddFinalSubmit(this.finalSubmitEntity)
        .then((data1) => {
          this.PracticeTestService.getByCertificateId(usercertificateid, this.UserPracticeTestId)
            .then((data) => {
              // //debugger        
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
                this.router.navigate(['/practice-result/' + window.btoa(this.practiceTestListEntity[0].UserPracticeTestId)]);
              }
              else {
                $('#practicecategorymodal').modal('show');
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
      this.finalSubmitEntity = [];
      var time1 = this.secondsTimeSpanToHMS(this.oneshotPracticeTime);   // Assessment original time your input string
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
        var item = {'UserPracticeTestMappingId':this.mappingIds[i],'CertificateId':certificateid,'UserId':this.globals.authData.UserId,'UserPracticeTestId':this.practiceTestListEntity[0].UserPracticeTestId,'UserCertificateId': usercertificateid
                    ,'TimeOfPracticeTest':minutes1 - minutes2,'UserName':this.globals.authData.FirstName+" "+this.globals.authData.LastName,'RoleId':this.globals.authData.RoleId}
        this.finalSubmitEntity.push(item);
      }
      this.PracticeTestService.finalsubmitaddOneShotAssessment(this.finalSubmitEntity)
      .then((data1) => {
        this.router.navigate(['/practice-result/' + window.btoa(this.practiceTestListEntity[0].UserPracticeTestId)]);
      },
      (error) => {
        this.globals.pageNotfound(error.error.code);
      });
    }
    clearInterval(this.testt);
          $('.timer').html("00:00:00");
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
        $("#practicecategorymodal").modal('hide');
        this.router.navigate(['/certificateDetails/' + this.route.snapshot.paramMap.get('usercertificateid')]);
      }
      else {

      }
    })
  }

  checkMarkedAsReview(i) {
    //alert(i);
  }

}
