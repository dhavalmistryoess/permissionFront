import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../services/document.service';
var DocumentComponent = /** @class */ (function () {
    function DocumentComponent(globals, router, route, DocumentService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.DocumentService = DocumentService;
    }
    DocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = false;
        this.documentEntity = {};
        this.IsPrimaryDis = false;
        this.documentTypeList = [];
        this.documentSizeUnitsList = [];
        //  let id = window.atob(this.route.snapshot.paramMap.get('id'));
        var id = this.route.snapshot.paramMap.get('id');
        this.DocumentService.getAllDefault()
            .then(function (data) {
            //this.documentTypeList = data['DocumentTypes'];
            //this.documentSizeUnitsList = data['DocumentSizeUnits'];
            // var documentTypeSelect =  {
            //   ConfigurationId:'',
            //   DisplayText: this.globals.adminTranslationText.document.form.documentType.select,
            //   Value: ""
            // }
            // this.documentTypeList.push(documentTypeSelect);
            _this.documentTypeList = _this.documentTypeList.concat(data['DocumentTypes']);
            var documentSizeUnitSelect = {
                ConfigurationId: '',
                DisplayText: _this.globals.adminTranslationText.document.form.documentSizeUnit.select,
                Value: ""
            };
            _this.documentSizeUnitsList.push(documentSizeUnitSelect);
            _this.documentSizeUnitsList = _this.documentSizeUnitsList.concat(data['DocumentSizeUnits']);
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
        if (id) {
            id = window.atob(id);
            this.globals.isLoading = true;
            this.DocumentService.getById(id)
                .then(function (data) {
                _this.documentEntity = data;
                if (data['IsActive'] == 0) {
                    _this.documentEntity.IsActive = 0;
                }
                else {
                    _this.documentEntity.IsActive = 1;
                }
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
                _this.globals.pageNotfound(error.error.code);
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
    };
    DocumentComponent.prototype.addUpdate = function (documentForm) {
        var _this = this;
        debugger;
        var id = this.route.snapshot.paramMap.get('id');
        var count = 0;
        if (id) {
            if (this.documentEntity.IsActive == true) {
                this.documentEntity.IsActive = 1;
            }
            else {
                this.documentEntity.IsActive = 0;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (this.documentEntity.IsPrimaryDocument == '' || this.documentEntity.IsPrimaryDocument == undefined) {
            count = 1;
            this.IsPrimaryDis = true;
        }
        else {
            this.IsPrimaryDis = false;
        }
        if (documentForm.valid && count == 0 && !this.IsPrimaryDis) {
            this.documentEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.DocumentService.addUpdate(this.documentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.documentEntity = {};
                documentForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.document.form.alerts.update.type,
                        title: _this.globals.adminTranslationText.document.form.alerts.update.title,
                        text: _this.globals.adminTranslationText.document.form.alerts.update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.document.form.alerts.add.type,
                        title: _this.globals.adminTranslationText.document.form.alerts.add.title,
                        text: _this.globals.adminTranslationText.document.form.alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate(['/admin/document/list']);
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
    DocumentComponent = tslib_1.__decorate([
        Component({
            selector: 'app-document',
            templateUrl: './document.component.html',
            styleUrls: ['./document.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, DocumentService])
    ], DocumentComponent);
    return DocumentComponent;
}());
export { DocumentComponent };
//# sourceMappingURL=document.component.js.map