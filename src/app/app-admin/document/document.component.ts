import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../services/document.service';
declare var $, swal: any, PerfectScrollbar;
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private DocumentService: DocumentService) { }

  documentEntity;
  submitted;
  documentTypeList;
  documentSizeUnitsList;
  btn_disable;
  IsPrimaryDis;
  errorEntity;
  ngOnInit() {
    debugger
    this.globals.isLoading = false;
    this.errorEntity = {};
    this.documentEntity = {};
    this.IsPrimaryDis = false;
    this.documentTypeList = [];
    this.documentSizeUnitsList = [];
    let id = this.route.snapshot.paramMap.get('id');

    this.DocumentService.getAllDefault()
      .then((data) => {
        this.documentTypeList = [...this.documentTypeList, ...data['DocumentTypes']];

        var documentSizeUnitSelect = {
          ConfigurationId: '',
          DisplayText: this.globals.adminTranslationText.document.form.documentSizeUnit.select,
          Value: ""
        }
        this.documentSizeUnitsList.push(documentSizeUnitSelect);
        this.documentSizeUnitsList = [...this.documentSizeUnitsList, ...data['DocumentSizeUnits']];

        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
    if (id) {
      id = window.atob(id);

      this.globals.isLoading = true;
      this.DocumentService.getById(id)
        .then((data) => {
          this.documentEntity = data;
          if (data['IsActive'] == 0) {
            this.documentEntity.IsActive = 0;
          } else {
            this.documentEntity.IsActive = 1;
          }
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      this.documentEntity = {};
      this.documentEntity.DocumentId = 0;
      this.documentEntity.DocumentType = '';
      this.documentEntity.DocumentSizeUnit = '';
      this.documentEntity.IsActive = 1;
      this.documentEntity.IsPrimaryDocument = '';
    }
    setTimeout(function () {
      $('select').selectpicker();
    }, 5000);
  }

  addUpdate(documentForm) {
    let id = this.route.snapshot.paramMap.get('id');

    var count = 0;
    if (id) {
      if (this.documentEntity.IsActive == true) {
        this.documentEntity.IsActive = 1;
      } else {
        this.documentEntity.IsActive = 0;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }
    if (this.documentEntity.IsPrimaryDocument == '' || this.documentEntity.IsPrimaryDocument == undefined) {
      count = 1;
      this.IsPrimaryDis = true;
    } else {
      this.IsPrimaryDis = false;
    }
    if (documentForm.valid && count == 0 && !this.IsPrimaryDis) {
      this.documentEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.DocumentService.addUpdate(this.documentEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.documentEntity = {};
          documentForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.document.form.alerts.update.type,
              title: this.globals.adminTranslationText.document.form.alerts.update.title,
              text: this.globals.adminTranslationText.document.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.document.form.alerts.add.type,
              title: this.globals.adminTranslationText.document.form.alerts.add.title,
              text: this.globals.adminTranslationText.document.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
          this.router.navigate(['/admin/document/list']);
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.error.code == 422) {
              this.errorEntity.DocumentName = (error.error.message.DocumentName != "") ? error.error.message.DocumentName : '';
              this.errorEntity.DocumentSize = (error.error.message.DocumentSize != "") ? error.error.message.DocumentSize : '';
              this.errorEntity.DocumentSizeUnit = (error.error.message.DocumentSizeUnit != "") ? error.error.message.DocumentSizeUnit : '';
              this.errorEntity.DocumentType = (error.error.message.DocumentType != "") ? error.error.message.DocumentType : '';
              this.errorEntity.IsPrimaryDocument = (error.error.message.IsPrimaryDocument != "") ? error.error.message.IsPrimaryDocument : '';
            } else {
              this.globals.pageNotfound(error.error.code);
            }
           
          });
    }
  }
}
