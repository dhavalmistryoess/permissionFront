import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ItemService } from "../services/item.service";
var ItemComponent = /** @class */ (function () {
    function ItemComponent(globals, router, route, ItemService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.ItemService = ItemService;
    }
    ItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = false;
        this.itemEntity = {};
        this.categoryList = [];
        this.ItemService.getAllDefault().then(function (data) {
            debugger;
            //this.categoryList = data;
            var data1;
            data1 = data;
            var categorySelect = {
                CategoryId: "",
                CategoryName: _this.globals.adminTranslationText.item.form.category
                    .select,
                Value: ""
            };
            _this.categoryList.push(categorySelect);
            _this.categoryList = _this.categoryList.concat(data1);
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            // if (error.text) {
            //   swal({
            //     //position: 'top-end',
            //     type: 'error',
            //     title: 'Oops...',
            //     text: "Something went wrong!"
            //   })
            // }
            _this.globals.pageNotfound(error.error.code);
        });
        setTimeout(function () {
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
            $("select").selectpicker();
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
        //console.log(this.OptionsList);
        var id = this.route.snapshot.paramMap.get("id");
        if (id) {
            id = window.atob(id);
            this.globals.isLoading = true;
            this.ItemService.getById(id).then(function (data) {
                _this.itemEntity = data;
                _this.globals.isLoading = false;
                if (data["IsActive"] == 0) {
                    _this.itemEntity.IsActive = 0;
                }
                else {
                    _this.itemEntity.IsActive = 1;
                }
                if (data["IsNoScoreItem"] == 0) {
                    _this.itemEntity.IsNoScoreItem = 0;
                }
                else {
                    _this.itemEntity.IsNoScoreItem = 1;
                }
                if (data["ItemForPracticeTest"] == 0) {
                    _this.itemEntity.ItemForPracticeTest = 0;
                }
                else {
                    _this.itemEntity.ItemForPracticeTest = 1;
                }
                if (data["ItemForAssessment"] == 0) {
                    _this.itemEntity.ItemForAssessment = 0;
                }
                else {
                    _this.itemEntity.ItemForAssessment = 1;
                }
                _this.OptionsList = _this.itemEntity.ItemOptions;
                console.log(_this.OptionsList);
                if (_this.OptionsList != null) {
                    for (var i = 0; i < _this.OptionsList.length; i++) {
                        //this.OptionsList = this.itemEntity[i].ItemOptions;
                        if (_this.OptionsList[i].IsCorrectOption == 1) {
                            var j = i;
                            setTimeout(function () {
                                $("#IsCorrectOption" + j).attr("checked", "checked");
                            }, 500);
                        }
                        if (_this.OptionsList[i].IsActive == 1) {
                            _this.OptionsList[i].IsActive = 1;
                        }
                        else {
                            _this.OptionsList[i].IsActive = 0;
                        }
                        if (i < 2) {
                            _this.OptionsList[i].required = true;
                        }
                    }
                    if (_this.OptionsList.length == 2) {
                        var item = {
                            OptionValue: "",
                            IsCorrectOption: 0,
                            IsActive: 0,
                            required: false
                        };
                        var item1 = {
                            OptionValue: "",
                            IsCorrectOption: 0,
                            IsActive: 0,
                            required: false
                        };
                        _this.OptionsList.push(item);
                        _this.OptionsList.push(item1);
                    }
                    if (_this.OptionsList.length == 3) {
                        var item = {
                            OptionValue: "",
                            IsCorrectOption: 0,
                            IsActive: 0,
                            required: false
                        };
                        _this.OptionsList.push(item);
                    }
                }
                else {
                    var itemoption = {
                        OptionValue: "",
                        IsCorrectOption: 0,
                        IsActive: 1
                    };
                    _this.OptionsList = [];
                    _this.OptionsList.push(itemoption);
                }
                //console.log(this.OptionsList);
                CKEDITOR.instances.ItemText.setData(_this.itemEntity.ItemText);
            }, function (error) {
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                // this.router.navigate(['/pagenotfound']);
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.itemEntity = {};
            this.itemEntity.ItemId = 0;
            this.itemEntity.CategoryId = "";
            this.itemEntity.IsActive = 1;
            this.itemEntity.IsNoScoreItem = 0;
        }
    };
    ItemComponent.prototype.AddOption = function (index) {
        var item = { OptionValue: "", IsCorrectOption: 0, IsActive: 1 };
        this.OptionsList.push(item);
        this.optioncheck_valid = false;
    };
    ItemComponent.prototype.RemoveOption = function (item) {
        var index = this.OptionsList.indexOf(item);
        this.OptionsList.splice(index, 1);
    };
    ItemComponent.prototype.RadioChange = function (i) {
        for (var j = 0; j <= this.OptionsList.length; j++) {
            if (i == j) {
                //&& this.OptionsList[j].OptionValue != ''
                this.optioncheck_valid = false;
                this.OptionsList[j].IsCorrectOption = 1;
                $("#IsActive" + j).prop("checked", true);
                this.OptionsList[j].IsActive = true;
                this.isActiveCheckValid = false;
                this.OptionsList[j].required = true;
            }
            else if (this.OptionsList[j].IsCorrectOption == 0 &&
                this.OptionsList[j].OptionValue == "" &&
                i == j) {
                this.OptionsList[j].required = true;
            }
            else {
                this.OptionsList[j].IsCorrectOption = 0;
            }
        }
    };
    ItemComponent.prototype.activeChange = function (i) {
        if (this.OptionsList[i].IsActive == false) {
            for (var j = 0; j <= this.OptionsList.length; j++) {
                if (i == j) {
                    this.OptionsList[j].IsCorrectOption = 0;
                    this.OptionsList[j].required = false;
                    $("#IsCorrectOption" + i).prop("checked", false);
                }
            }
        }
        else {
            for (var j = 0; j <= this.OptionsList.length; j++) {
                if (i == j) {
                    this.OptionsList[j].required = true;
                }
            }
            this.isActiveCheckValid = false;
        }
    };
    ItemComponent.prototype.addUpdate = function (itemForm) {
        var _this = this;
        debugger;
        var id = this.route.snapshot.paramMap.get("id");
        this.itemEntity.ItemText = CKEDITOR.instances.ItemText.getData();
        var ItemText = CKEDITOR.instances.ItemText.editable().getText();
        if (this.itemEntity.ItemText != "" &&
            this.itemEntity.ItemText != undefined) {
            this.des_valid = false;
            $(".cke").removeClass("error_ckeditor");
        }
        else {
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
            }
            else {
                this.itemEntity.IsActive = 0;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        // let index = itemList.indexOf(item);
        // if (index != -1) {
        //   itemList.splice(index, 1);
        // }
        var count = 0;
        for (var i = 0; i < this.OptionsList.length; i++) {
            if (this.OptionsList[i].OptionValue != "") {
                if (this.OptionsList[i].IsCorrectOption == 0) {
                    // && this.OptionsList[i].required == true
                    count += 1;
                }
                else {
                    count = 0;
                    break;
                }
            }
        }
        var isActiveCount = 0;
        for (var i = 0; i < this.OptionsList.length; i++) {
            if (this.OptionsList[i].IsActive == 1 ||
                this.OptionsList[i].IsActive == true) {
                isActiveCount += 1;
            }
            // else
            // {
            //   count = 0;
            //   break;
            // }
        }
        if (isActiveCount >= 2)
            this.isActiveCheckValid = false;
        else
            this.isActiveCheckValid = true;
        if (count == 0) {
            this.optioncheck_valid = false;
        }
        else {
            this.optioncheck_valid = true;
        }
        if ($("#ItemForPractice").is(":checked") == false &&
            $("#ItemForAssessment").is(":checked") == false) {
            this.QuestionFor = true;
        }
        if (this.itemEntity.ItemForAssessment == true) {
            this.itemEntity.ItemForAssessment = 1;
        }
        else {
            this.itemEntity.ItemForAssessment = 0;
        }
        if (this.itemEntity.ItemForPracticeTest == true) {
            this.itemEntity.ItemForPracticeTest = 1;
        }
        else {
            this.itemEntity.ItemForPracticeTest = 0;
        }
        if (itemForm.valid &&
            !this.des_valid &&
            !this.ItemText_valid &&
            !this.optioncheck_valid &&
            !this.isActiveCheckValid &&
            !this.QuestionFor) {
            for (var i = 0; i < this.OptionsList.length; i++) {
                if (this.OptionsList[i].OptionValue == "") {
                    var item = this.OptionsList[i];
                    var index = this.OptionsList.indexOf(item);
                    if (index != -1) {
                        this.OptionsList.splice(index, 1);
                    }
                    i = 0;
                }
            }
            //console.log(this.OptionsList);
            this.itemEntity.ItemOptions = this.OptionsList;
            this.itemEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.ItemService.addUpdate(this.itemEntity).then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.itemEntity = {};
                itemForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.item.form.alerts.update
                            .type,
                        title: _this.globals.adminTranslationText.item.form.alerts.update
                            .title,
                        text: _this.globals.adminTranslationText.item.form.alerts.update
                            .text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.item.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.item.form.alerts.add
                            .title,
                        text: _this.globals.adminTranslationText.item.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate(["/admin/item/list"]);
            }, function (error) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                _this.globals.pageNotfound(error.error.code);
            });
        }
    };
    ItemComponent = tslib_1.__decorate([
        Component({
            selector: "app-item",
            templateUrl: "./item.component.html",
            styleUrls: ["./item.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [Globals,
            Router,
            ActivatedRoute,
            ItemService])
    ], ItemComponent);
    return ItemComponent;
}());
export { ItemComponent };
//# sourceMappingURL=item.component.js.map