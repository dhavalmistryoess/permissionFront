import { Component, OnInit } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../services/item.service";
declare var $, CKEDITOR: any, swal: any, PerfectScrollbar;

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent implements OnInit {
  itemEntity;
  categoryList;
  OptionsList;
  des_valid;
  submitted;
  btn_disable;
  ItemText_valid;
  optioncheck_valid;
  isActiveCheckValid;
  QuestionFor;
  answerTypeList;
  booleanWithScoringOptionList;
  booleanWithoutScoringOptionList;
  multiSelectOptionList;
  multiselectoptioncheck_valid;
  booleanwithscoreoptioncheck_valid;
  submitted1;
  
  errorEntity;
  constructor(
    public globals: Globals,
    private router: Router,
    private route: ActivatedRoute,
    private ItemService: ItemService
  ) {}

  ngOnInit() {
    this.globals.isLoading = false;
    this.itemEntity = {};
    this.categoryList = [];
    this.answerTypeList = [];
    this.errorEntity = {
      ItemOptions : []
    };
    this.ItemService.getAllDefault().then(
      data => {
        debugger;
        var category: any;
        category = data['Categories'];
        var categorySelect = {
          CategoryId: "",
          CategoryName: this.globals.adminTranslationText.item.form.category
            .select,
          Value: ""
        };
        this.categoryList.push(categorySelect);
        this.categoryList = [...this.categoryList, ...category];
        var answerType: any;
        answerType = data['AnswerTypes'];
        var answerTypeSelect = {
          ConfigurationId: "",
          DisplayText: this.globals.adminTranslationText.item.form.answerType
            .select,
          Value: ""
        };
        this.answerTypeList.push(answerTypeSelect);
        this.answerTypeList = [...this.answerTypeList, ...answerType];

        this.globals.isLoading = false;
      },
      error => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      }
    );

    setTimeout(function() {
      CKEDITOR.replace("ItemText", {
        height: "200",
        resize_enabled: "false",
        resize_maxHeight: "300",
        resize_maxWidth: "948",
        resize_minHeight: "300",
        resize_minWidth: "948",
        extraPlugins: "sourcedialog",
        //extraAllowedContent: 'style;*[id,rel](*){*}'
        removePlugins: "save,newpage,flash,about,iframe,language",
        extraAllowedContent: "span;ul;li;table;td;style;*[id];*(*);*{*}",
        enterMode: Number(2)
      });
    }, 2500);

    var item = {
      OptionValue: "",
      IsCorrectOption: 0,
      IsActive: 1,
      required: true
    };
    var item1 = {
      OptionValue: "",
      IsCorrectOption: 0,
      IsActive: 1,
      required: true
    };
    var item2 = {
      OptionValue: "",
      IsCorrectOption: 0,
      IsActive: 0,
      required: false
    };
    var item3 = {
      OptionValue: "",
      IsCorrectOption: 0,
      IsActive: 0,
      required: false
    };
    this.OptionsList = [];
    this.OptionsList.push(item);
    this.OptionsList.push(item1);
    this.OptionsList.push(item2);
    this.OptionsList.push(item3);
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      id = window.atob(id);
      this.globals.isLoading = true;
      this.ItemService.getById(id).then(
        data => {
          this.itemEntity = data;
          this.globals.isLoading = false;
          if (data["IsActive"] == 0) {
            this.itemEntity.IsActive = 0;
          } else {
            this.itemEntity.IsActive = 1;
          }
          if (data["IsNoScoreItem"] == 0) {
            this.itemEntity.IsNoScoreItem = 0;
          } else {
            this.itemEntity.IsNoScoreItem = 1;
          }
          if (data["ItemForPracticeTest"] == 0) {
            this.itemEntity.ItemForPracticeTest = 0;
          } else {
            this.itemEntity.ItemForPracticeTest = 1;
          }
          if (data["ItemForAssessment"] == 0) {
            this.itemEntity.ItemForAssessment = 0;
          } else {
            this.itemEntity.ItemForAssessment = 1;
          }
          if(this.itemEntity.AnswerTypeId == 77)
          {
            this.OptionsList = this.itemEntity.ItemOptions;
            if (this.OptionsList != null) {
              for (var i = 0; i < this.OptionsList.length; i++) {
                if (this.OptionsList[i].IsCorrectOption == 1) {
                  var j = i;
                  setTimeout(function() {
                    $("#IsCorrectOption" + j).attr("checked", "checked");
                  }, 500);
                }
                if (this.OptionsList[i].IsActive == 1) {
                  this.OptionsList[i].IsActive = 1;
                } else {
                  this.OptionsList[i].IsActive = 0;
                }
                if (i < 2) {
                  this.OptionsList[i].required = true;
                }
              }
              if (this.OptionsList.length == 2) {
                var item = { OptionValue: "",IsCorrectOption: 0, IsActive: 0,required: false};
                var item1 = {OptionValue: "",IsCorrectOption: 0,IsActive: 0,required: false};
                this.OptionsList.push(item);
                this.OptionsList.push(item1);
              }
              if (this.OptionsList.length == 3) {
                var item = {OptionValue: "",IsCorrectOption: 0,IsActive: 0,required: false};
                this.OptionsList.push(item);
              }
            } else {
              var itemoption = {OptionValue: "",IsCorrectOption: 0,IsActive: 1};
              this.OptionsList = [];
              this.OptionsList.push(itemoption);
            }
          }
          else if(this.itemEntity.AnswerTypeId == 78)
          {
            this.multiSelectOptionList = this.itemEntity.ItemOptions;
            for (var i = 0; i < this.multiSelectOptionList.length; i++) {
              if (this.multiSelectOptionList[i].IsCorrectOption == 1) {
                var j = i;
                setTimeout(function() {
                  $("#multiSelectIsCorrectOption" + j).attr("checked", "checked");
                }, 500);
              }
              if (this.multiSelectOptionList[i].IsActive == 1) {
                this.multiSelectOptionList[i].IsActive = 1;
              } else {
                this.multiSelectOptionList[i].IsActive = 0;
              }
            }
          }
          else if(this.itemEntity.AnswerTypeId == 79)
          {
            this.booleanWithScoringOptionList = this.itemEntity.ItemOptions;
            console.log(this.booleanWithScoringOptionList);
            for (var i = 0; i < this.booleanWithScoringOptionList.length; i++) {
              if (this.booleanWithScoringOptionList[i].IsCorrectOption == 1) {
                var j = i;
                setTimeout(function() {
                  $("#IsCorrectOption1" + j).attr("checked", "checked");
                }, 500);
              }
              if (this.booleanWithScoringOptionList[i].IsActive == 1) {
                this.booleanWithScoringOptionList[i].IsActive = 1;
              } else {
                this.booleanWithScoringOptionList[i].IsActive = 0;
              }
            }
          }
          else if(this.itemEntity.AnswerTypeId == 80)
          {
            this.booleanWithoutScoringOptionList = this.itemEntity.ItemOptions;
          }
          CKEDITOR.instances.ItemText.setData(this.itemEntity.ItemText);
        },
        error => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        }
      );
    } else {
      this.itemEntity = {};
      this.itemEntity.ItemId = 0;
      this.itemEntity.CategoryId = "";
      this.itemEntity.IsActive = 1;
      this.itemEntity.IsNoScoreItem = 0;
    }
  }
  answerTypeChange()
  {
    this.submitted1 = false;
    this.optioncheck_valid = false;
    this.multiselectoptioncheck_valid = false;
    this.booleanwithscoreoptioncheck_valid = false;
    if(this.itemEntity.AnswerTypeId == 77)
    {
      var item = {OptionValue: "",IsCorrectOption: 0,IsActive: 1,required: true};
      var item1 = {OptionValue: "",IsCorrectOption: 0,IsActive: 1,required: true};
      var item2 = {OptionValue: "",IsCorrectOption: 0,IsActive: 0,required: false};
      var item3 = {OptionValue: "",IsCorrectOption: 0,IsActive: 0,required: false};
      this.OptionsList = [];
      this.OptionsList.push(item);
      this.OptionsList.push(item1);
      this.OptionsList.push(item2);
      this.OptionsList.push(item3);
    }
    else if(this.itemEntity.AnswerTypeId == 78)
    {
      var multiselectoption = {OptionValue: "",IsCorrectOption: 0,IsActive: 1};
      var multiselectoption1 = {OptionValue: "",IsCorrectOption: 0,IsActive: 1};
      this.multiSelectOptionList = [];
      this.multiSelectOptionList.push(multiselectoption);
      this.multiSelectOptionList.push(multiselectoption1);
    }
    else if(this.itemEntity.AnswerTypeId == 79)
    {
      var yesNoitem = {OptionValue: "Yes",IsCorrectOption: 0,IsActive: 1};
      var yesNoitem1 = {OptionValue: "No",IsCorrectOption: 0,IsActive: 1};
      this.booleanWithScoringOptionList = [];
      this.booleanWithScoringOptionList.push(yesNoitem);
      this.booleanWithScoringOptionList.push(yesNoitem1);
    }
    else if(this.itemEntity.AnswerTypeId == 80)
    {
      var booleanwithoutscoreitem = {OptionValue: "Yes",IsCorrectOption: 0,IsActive: 1};
      var booleanwithoutscoreitem1 = {OptionValue: "No",IsCorrectOption: 0,IsActive: 1};
      this.booleanWithoutScoringOptionList = [];
      this.booleanWithoutScoringOptionList.push(booleanwithoutscoreitem);
      this.booleanWithoutScoringOptionList.push(booleanwithoutscoreitem1);
    }
  }
  AddOption(index) {
    var multiselectoption = { OptionValue: "", IsCorrectOption: 0, IsActive: 1 };
    this.multiSelectOptionList.push(multiselectoption);
    //this.optioncheck_valid = false;
  }
  RemoveOption(item) {
    var index = this.multiSelectOptionList.indexOf(item);
    this.multiSelectOptionList.splice(index, 1);
  }

  RadioChange(i) {
    if(this.itemEntity.AnswerTypeId == 77) // mcq
    {
      for (var j = 0; j < this.OptionsList.length; j++) {
        if (i == j) {
          //&& this.OptionsList[j].OptionValue != ''
          this.optioncheck_valid = false;
          this.OptionsList[j].IsCorrectOption = 1;
          $("#IsActive" + j).prop("checked", true);
          this.OptionsList[j].IsActive = true;
          this.isActiveCheckValid = false;
          this.OptionsList[j].required = true;
        } else if (this.OptionsList[j].IsCorrectOption == 0 && this.OptionsList[j].OptionValue == "" && i == j) {
          this.OptionsList[j].required = true;
        } else {
          this.OptionsList[j].IsCorrectOption = 0;
        }
      }
    }
    else if(this.itemEntity.AnswerTypeId == 78) // mcq multi select
    {
      if($("#multiSelectIsCorrectOption" + i).is(':checked'))
      {
        this.multiSelectOptionList[i].IsCorrectOption = 1;
        $("#IsActivemultiselect" + i).prop("checked", true);
        this.multiSelectOptionList[i].IsActive = true;
        this.multiselectoptioncheck_valid = false;
      }
      else
      {
        this.multiSelectOptionList[i].IsCorrectOption = 0;
      }
    }
    else if(this.itemEntity.AnswerTypeId == 79) // boolean with scoring
    {
      for(var j=0;j<=this.booleanWithScoringOptionList.length;j++)
      {
        if(i==j)
        {
          this.booleanwithscoreoptioncheck_valid = false;
          this.booleanWithScoringOptionList[j].IsCorrectOption = 1;
        }
        else
        {
          this.booleanWithScoringOptionList[j].IsCorrectOption = 0;
        }
      }
    }
  }

  multiselectActiveChange(i)
  {
    this.multiSelectOptionList[i].IsCorrectOption = 0;
    $("#multiSelectIsCorrectOption" + i).prop("checked", false);
  }
  activeChange(i) {
    if(this.itemEntity.AnswerTypeId == 77)
    {
      if (this.OptionsList[i].IsActive == false) {
        for (var j = 0; j <= this.OptionsList.length; j++) {
          if (i == j) {
            this.OptionsList[j].IsCorrectOption = 0;
            this.OptionsList[j].required = false;
            $("#IsCorrectOption" + i).prop("checked", false);
          }
        }
      } else {
        for (var j = 0; j <= this.OptionsList.length; j++) {
          if (i == j) {
            this.OptionsList[j].required = true;
          }
        }
        this.isActiveCheckValid = false;
      }
    }
    else if(this.itemEntity.AnswerTypeId == 78)
    {
      this.multiSelectOptionList[i].IsCorrectOption = 0;
      $("#multiSelectIsCorrectOption" + i).prop("checked", false);
    }
  }
  addUpdate(itemForm) {
    debugger;
    let id = this.route.snapshot.paramMap.get("id");
    this.itemEntity.ItemText = CKEDITOR.instances.ItemText.getData();
    var ItemText = CKEDITOR.instances.ItemText.editable().getText();
    if(this.itemEntity.ItemText != "" && this.itemEntity.ItemText != undefined) {
      this.des_valid = false;
      $(".cke").removeClass("error_ckeditor");
    } else {
      this.des_valid = true;
      $(".cke").addClass("error_ckeditor");
    }
    if (ItemText.length < 10 && this.itemEntity.ItemText != "") {
      this.ItemText_valid = true;
      $(".cke").addClass("error_ckeditor");
    }
    if (id) {
      if (this.itemEntity.IsActive == true) {
        this.itemEntity.IsActive = 1;
      } else {
        this.itemEntity.IsActive = 0;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
      this.submitted1 = true;
    }
    if(this.itemEntity.AnswerTypeId == 77)
    {
      var count = 0;
      for (var i = 0; i < this.OptionsList.length; i++) {
        if (this.OptionsList[i].OptionValue != "") {
          if (this.OptionsList[i].IsCorrectOption == 0) {
            // && this.OptionsList[i].required == true
            count += 1;
          } else {
            count = 0;
            break;
          }
        }
      }
      var isActiveCount = 0;
      for (var i = 0; i < this.OptionsList.length; i++) {
        if (this.OptionsList[i].IsActive == 1 || this.OptionsList[i].IsActive == true) {
          isActiveCount += 1;
        }
      }
      if (isActiveCount >= 2) this.isActiveCheckValid = false;
      else this.isActiveCheckValid = true;
      if (count == 0) {
        this.optioncheck_valid = false;
      } else {
        this.optioncheck_valid = true;
      }
    }
    else if(this.itemEntity.AnswerTypeId == 78)
    {
      var multiselectoptioncount = 0;
      for(var k=0;k<this.multiSelectOptionList.length;k++)
      {
        if(this.multiSelectOptionList[k].IsCorrectOption == 0 && this.multiSelectOptionList[k].OptionValue != '')
        {
          multiselectoptioncount++;
        }
        else{
          multiselectoptioncount = 0;
          break;
        }
      }
      if(multiselectoptioncount == 0)
      {
        this.multiselectoptioncheck_valid = false;
      }
      else
      {
        this.multiselectoptioncheck_valid = true;
      }
    }
    else if(this.itemEntity.AnswerTypeId == 79)
    {
      var booleanwithscorecount = 0;
      for(var a=0;a<this.booleanWithScoringOptionList.length;a++)
      {
        if(this.booleanWithScoringOptionList[a].IsCorrectOption == 0 && this.booleanWithScoringOptionList[a].OptionValue != '')
        {
          booleanwithscorecount+=1;
        }
        else{
          booleanwithscorecount = 0;
          break;
        }
      }
      if(booleanwithscorecount == 0)
      {
        this.booleanwithscoreoptioncheck_valid = false;
      }
      else
      {
        this.booleanwithscoreoptioncheck_valid = true;
      }
    }
    if ($("#ItemForPractice").is(":checked") == false && $("#ItemForAssessment").is(":checked") == false) {
      this.QuestionFor = true;
    }
    if (this.itemEntity.ItemForAssessment == true) {
      this.itemEntity.ItemForAssessment = 1;
    } else {
      this.itemEntity.ItemForAssessment = 0;
    }
    if (this.itemEntity.ItemForPracticeTest == true) {
      this.itemEntity.ItemForPracticeTest = 1;
    } else {
      this.itemEntity.ItemForPracticeTest = 0;
    }
    console.log(this.multiSelectOptionList);
    console.log(this.OptionsList);
    console.log(this.booleanWithScoringOptionList);
    console.log(this.booleanWithoutScoringOptionList);
    if (itemForm.valid && !this.des_valid && !this.ItemText_valid && !this.optioncheck_valid &&
      !this.isActiveCheckValid && !this.multiselectoptioncheck_valid && !this.booleanwithscoreoptioncheck_valid && !this.QuestionFor) {
      if(this.itemEntity.AnswerTypeId == 77)
      {
        for (var i = 0; i < this.OptionsList.length; i++) {
          if (this.OptionsList[i].OptionValue == "") {
            var item = this.OptionsList[i];
            let index = this.OptionsList.indexOf(item);
            if (index != -1) {
              this.OptionsList.splice(index, 1);
            }
            i = 0;
          }
        }
        this.itemEntity.ItemOptions = this.OptionsList;
      }
      else if(this.itemEntity.AnswerTypeId == 78)
      {
        this.itemEntity.ItemOptions = this.multiSelectOptionList;
      }
      else if(this.itemEntity.AnswerTypeId == 79)
      {
        this.itemEntity.ItemOptions = this.booleanWithScoringOptionList;
      }
      else if(this.itemEntity.AnswerTypeId == 80)
      {
        this.itemEntity.ItemOptions = this.booleanWithoutScoringOptionList;
      }
      
      this.itemEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      console.log(this.itemEntity);
      this.globals.isLoading = true;
      this.ItemService.addUpdate(this.itemEntity).then(
        data => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.itemEntity = {};
          itemForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.item.form.alerts.update.type,
              title: this.globals.adminTranslationText.item.form.alerts.update.title,
              text: this.globals.adminTranslationText.item.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            swal({
              type: this.globals.adminTranslationText.item.form.alerts.add.type,
              title: this.globals.adminTranslationText.item.form.alerts.add.title,
              text: this.globals.adminTranslationText.item.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            });
          }
          this.router.navigate(["/admin/item/list"]);
        },
        error => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          if(error.error.code == 422)
          {
            this.errorEntity.CategoryId = (error.error.message.CategoryId != "") ? error.error.message.CategoryId : '';
            this.errorEntity.ItemText = (error.error.message.ItemText != "") ? error.error.message.ItemText : '';
            this.errorEntity.ItemOptions[0] = (error.error.message["ItemOptions[0][OptionValue]"] != "") ? error.error.message["ItemOptions[0][OptionValue]"] : '';
            this.errorEntity.ItemOptions[1] = (error.error.message["ItemOptions[1][OptionValue]"] != "") ? error.error.message["ItemOptions[1][OptionValue]"] : '';
            this.errorEntity.ItemOptions[2] = (error.error.message["ItemOptions[0][OptionValue]"] != "") ? error.error.message["ItemOptions[0][OptionValue]"] : '';
            this.errorEntity.ItemOptions[3] = (error.error.message["ItemOptions[1][OptionValue]"] != "") ? error.error.message["ItemOptions[1][OptionValue]"] : '';
            this.errorEntity.ItemText = (error.error.message.ItemText != "") ? error.error.message.ItemText : '';
          }
          else
          {
            this.globals.pageNotfound(error.error.code);
          }
          
        }
      );
    }
  }
}
