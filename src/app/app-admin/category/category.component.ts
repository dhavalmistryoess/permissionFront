import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
declare var $, CKEDITOR: any, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryEntity;
  submitted;
  parentCategoryList;
  btn_disable;
  des_valid;
  Description_valid;
  errorEntity;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private CategoryService: CategoryService) { }

  ngOnInit() {
    this.globals.isLoading = false;
    this.categoryEntity = {};
    this.errorEntity = {};
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
        removePlugins: 'save,newpage,flash,about,iframe,language',
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
      });
      $('select').selectpicker();
    }, 5000);
    this.globals.isLoading = true;
    let id = this.route.snapshot.paramMap.get('id');
    this.CategoryService.getAllCategory(1)
      .then((data) => {
        debugger
        var data1: any;
        data1 = data;
        var parentCategorySelect = {
          CategoryId: '',
          CategoryName: this.globals.adminTranslationText.category.form.parentCatgory.select,
          Value: ""
        }
        this.parentCategoryList.push(parentCategorySelect);
        this.parentCategoryList = [...this.parentCategoryList, ...data1];
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
          this.globals.isLoading = true;
        });
    if (id) {
      id = window.atob(id);

      this.globals.isLoading = true;
      this.CategoryService.getById(id)
        .then((data) => {
          this.categoryEntity = data;
          if (data['IsActive'] == 0) {
            this.categoryEntity.IsActive = 0;
          } else {
            this.categoryEntity.IsActive = 1;
          }
          CKEDITOR.instances.Description.setData(this.categoryEntity.Description);
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            window.location.href = 'pagenotfound/' + window.btoa(error.error.code);
            this.globals.isLoading = true;
          });
    }
    else {
      this.categoryEntity = {};
      this.categoryEntity.CategoryId = 0;
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
  }

  addUpdate(categoryForm) {
    let id = this.route.snapshot.paramMap.get('id');
    this.categoryEntity.Description = CKEDITOR.instances.Description.getData();
    this.categoryEntity.ParentId = null;
    var Description = CKEDITOR.instances.Description.editable().getText();
    if (this.categoryEntity.Description != "" && this.categoryEntity.Description != undefined) {
      this.des_valid = false;
      $(".cke_textarea_inline").removeClass("error_ckeditor");
    } else {
      this.des_valid = true;
      $(".cke_textarea_inline").addClass("error_ckeditor");
    }
    if (Description.length < 10 && this.categoryEntity.Description != '') {
      this.Description_valid = true;
      $(".cke_textarea_inline").addClass("error_ckeditor");
    } else {
      this.Description_valid = false;
    }

    if (id) {
      if (this.categoryEntity.IsActive == true) {
        this.categoryEntity.IsActive = 1;
      } else {
        this.categoryEntity.IsActive = 0;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }

    if (categoryForm.valid && !this.des_valid && !this.Description_valid) {
      this.categoryEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.CategoryService.addUpdate(this.categoryEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.categoryEntity = {};
          categoryForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.category.form.alerts.update.type,
              title: this.globals.adminTranslationText.category.form.alerts.update.title,
              text: this.globals.adminTranslationText.category.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.category.form.alerts.add.type,
              title: this.globals.adminTranslationText.category.form.alerts.add.title,
              text: this.globals.adminTranslationText.category.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
          this.router.navigate(['/admin/category/list']);
        },
          (error) => {
            console.log(error.error.code);
            this.globals.isLoading = false;
            this.btn_disable = false;
            if(error.error.code == 302)
            {
              swal({
                type: this.globals.adminTranslationText.category.form.alerts.alreadyExist.type,
                title: this.globals.adminTranslationText.category.form.alerts.alreadyExist.title,
                text: this.globals.adminTranslationText.category.form.alerts.alreadyExist.text,
                showConfirmButton: false,
                timer: 2000
              })
            }
            else if(error.error.code == 422)
                  {
                    this.errorEntity.CategoryName = (error.error.message.CategoryName != "") ? error.error.message.CategoryName : '';
                    this.errorEntity.Description = (error.error.message.Description != "") ? error.error.message.Description : '';
                  }
            else{
              this.globals.pageNotfound(error.error.code);
              this.globals.isLoading = true;
            }
            

          });
   }
  }

}
