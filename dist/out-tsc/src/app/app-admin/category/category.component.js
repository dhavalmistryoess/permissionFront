import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(globals, router, route, CategoryService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CategoryService = CategoryService;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = false;
        this.categoryEntity = {};
        this.parentCategoryList = [];
        this.des_valid = false;
        setTimeout(function () {
            CKEDITOR.replace('Description', {
                height: '200',
                resize_enabled: 'false',
                resize_maxHeight: '300',
                resize_maxWidth: '948',
                resize_minHeight: '300',
                resize_minWidth: '948',
                extraPlugins: 'sourcedialog',
                //extraAllowedContent: 'style;*[id,rel](*){*}'
                removePlugins: 'save,newpage,flash,about,iframe,language',
                extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
            });
            $('select').selectpicker();
            //$(".cke_textarea_inline").addClass("error_ckeditor");
        }, 5000);
        this.globals.isLoading = true;
        // let id = window.atob(this.route.snapshot.paramMap.get('id'));
        var id = this.route.snapshot.paramMap.get('id');
        this.CategoryService.getAllCategory(1)
            .then(function (data) {
            debugger;
            // this.parentCategoryList = data;
            var data1;
            data1 = data;
            var parentCategorySelect = {
                CategoryId: '',
                CategoryName: _this.globals.adminTranslationText.category.form.parentCatgory.select,
                Value: ""
            };
            _this.parentCategoryList.push(parentCategorySelect);
            _this.parentCategoryList = _this.parentCategoryList.concat(data1);
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
            window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
            _this.globals.isLoading = true;
        });
        if (id) {
            id = window.atob(id);
            this.globals.isLoading = true;
            this.CategoryService.getById(id)
                .then(function (data) {
                _this.categoryEntity = data;
                if (data['IsActive'] == 0) {
                    _this.categoryEntity.IsActive = 0;
                }
                else {
                    _this.categoryEntity.IsActive = 1;
                }
                CKEDITOR.instances.Description.setData(_this.categoryEntity.Description);
                _this.globals.isLoading = false;
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
                window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
                _this.globals.isLoading = true;
            });
        }
        else {
            this.categoryEntity = {};
            this.categoryEntity.CategoryId = 0;
            //this.categoryEntity.ParentId = 0;
            this.categoryEntity.IsActive = 1;
        }
        CKEDITOR.on('instanceReady', function () {
            CKEDITOR.document.getById('Description').on('dragstart', function (evt) {
                var target = evt.data.getTarget().getAscendant('div', true);
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                var dataTransfer = evt.data.dataTransfer;
                dataTransfer.setData('text/html', '{' + target.getText() + '}');
            });
        });
    };
    CategoryComponent.prototype.addUpdate = function (categoryForm) {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.categoryEntity.Description = CKEDITOR.instances.Description.getData();
        this.categoryEntity.ParentId = null;
        var Description = CKEDITOR.instances.Description.editable().getText();
        if (this.categoryEntity.Description != "" && this.categoryEntity.Description != undefined) {
            this.des_valid = false;
            $(".cke_textarea_inline").removeClass("error_ckeditor");
        }
        else {
            this.des_valid = true;
            $(".cke_textarea_inline").addClass("error_ckeditor");
        }
        if (Description.length < 10 && this.categoryEntity.Description != '') {
            this.Description_valid = true;
            $(".cke_textarea_inline").addClass("error_ckeditor");
        }
        else {
            this.Description_valid = false;
        }
        if (id) {
            if (this.categoryEntity.IsActive == true) {
                this.categoryEntity.IsActive = 1;
            }
            else {
                this.categoryEntity.IsActive = 0;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (categoryForm.valid && !this.des_valid && !this.Description_valid) {
            this.categoryEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.CategoryService.addUpdate(this.categoryEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.categoryEntity = {};
                categoryForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.category.form.alerts.update.type,
                        title: _this.globals.adminTranslationText.category.form.alerts.update.title,
                        text: _this.globals.adminTranslationText.category.form.alerts.update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.category.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.category.form.alerts.add.title,
                        text: _this.globals.adminTranslationText.category.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate(['/admin/category/list']);
            }, function (error) {
                console.log(error.error.code);
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                if (error.error.code == 302) {
                    // swal({
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: (error.error.message != "") ? error.error.message :  this.globals.commonTranslationText.common.alerts.somethingWrong.title ,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   showConfirmButton: false,
                    //   timer: 4000
                    // })
                    swal({
                        type: _this.globals.adminTranslationText.category.form.alerts.alreadyExist.type,
                        title: _this.globals.adminTranslationText.category.form.alerts.alreadyExist.title,
                        text: _this.globals.adminTranslationText.category.form.alerts.alreadyExist.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
                    _this.globals.isLoading = true;
                }
            });
        }
    };
    CategoryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-category',
            templateUrl: './category.component.html',
            styleUrls: ['./category.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, CategoryService])
    ], CategoryComponent);
    return CategoryComponent;
}());
export { CategoryComponent };
//# sourceMappingURL=category.component.js.map