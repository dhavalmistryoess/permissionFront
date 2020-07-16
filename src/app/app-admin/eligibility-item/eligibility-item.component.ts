import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EligibilityItemService } from '../services/eligibility-item.service';
declare var $, CKEDITOR: any, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-eligibility-item',
  templateUrl: './eligibility-item.component.html',
  styleUrls: ['./eligibility-item.component.css']
})
export class EligibilityItemComponent implements OnInit {

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private EligibilityItemService: EligibilityItemService) { }

  eligibilityItemEntity;
  submitted;
  certificateList;
  eligibilityItemForList;
  btn_disable;
  des_valid;
  EligibilityItemText_valid;
  ngOnInit() {

    this.globals.isLoading = false;
    this.eligibilityItemEntity = {};
    this.certificateList = [];
    this.eligibilityItemForList = [];
    setTimeout(function () {

      CKEDITOR.replace('EligibilityItemText', {
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
    }, 100);

    this.EligibilityItemService.getAllDefault()
      .then((data) => {
        // this.certificateList = data['Certificates'];
        // this.eligibilityItemForList = data['ItemFor'];
        // var certificateSelect =  {
        //   CertificateId:'',
        //   CertificateName: this.globals.adminTranslationText.eligibilityItem.form.certificate.select,
        //   Value: ""
        // }
        // this.certificateList.push(certificateSelect);
        this.certificateList = [...this.certificateList, ...data['Certificates']];

        // var eligibilityItemForSelect =  {
        //   ConfigurationId:'',
        //   DisplayText: this.globals.adminTranslationText.eligibilityItem.form.eligibilityItemFor.select,
        //   Value: ""
        // }
        // this.eligibilityItemForList.push(eligibilityItemForSelect);
        this.eligibilityItemForList = [...this.eligibilityItemForList, ...data['ItemFor']];
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

    //  let id = window.atob(this.route.snapshot.paramMap.get('id'));
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      id = window.atob(id);
      this.globals.isLoading = true;
      this.EligibilityItemService.getById(id)
        .then((data) => {
          this.eligibilityItemEntity = data;
          if (data['IsActive'] == 0) {
            this.eligibilityItemEntity.IsActive = 0;
          } else {
            this.eligibilityItemEntity.IsActive = 1;
          }
          if (data['AnswerForEligibility'] == 0) {
            this.eligibilityItemEntity.AnswerForEligibility = 0;
          } else {
            this.eligibilityItemEntity.AnswerForEligibility = 1;
          }
          CKEDITOR.instances.EligibilityItemText.setData(this.eligibilityItemEntity.EligibilityItemText);
          this.globals.isLoading = false;
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
            // this.router.navigate(['/pagenotfound']);
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      this.eligibilityItemEntity = {};
      this.eligibilityItemEntity.EligibilityItemId = 0;
      this.eligibilityItemEntity.CertificateId = '';
      this.eligibilityItemEntity.EligibilityItemFor = [];
      this.eligibilityItemEntity.IsActive = 1;
      this.eligibilityItemEntity.AnswerForEligibility = 1;
    }
    CKEDITOR.on('instanceReady', function () {
      CKEDITOR.document.getById('EligibilityItemText').on('dragstart', function (evt) {
        var target = evt.data.getTarget().getAscendant('div', true);
        CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
        var dataTransfer = evt.data.dataTransfer;
        dataTransfer.setData('text/html', '{' + target.getText() + '}');
      });
    });
    setTimeout(function () {
      $('select').selectpicker();
    }, 5000);
  }

  addUpdate(eligibilityItemForm) {
    debugger
    let id = this.route.snapshot.paramMap.get('id');
    // this.eligibilityItemEntity.EligibilityItemText = CKEDITOR.instances.EligibilityItemText.getData();
    // var EligibilityItemText = CKEDITOR.instances.EligibilityItemText.editable().getText();
    // if (this.eligibilityItemEntity.EligibilityItemText != "" && this.eligibilityItemEntity.EligibilityItemText != undefined) {
    //   this.des_valid = false;
    // } else {
    //   this.des_valid = true;
    // }
    // if (EligibilityItemText.length < 10 && this.eligibilityItemEntity.EligibilityItemText != '') {
    //   this.EligibilityItemText_valid = true;
    // } else {
    //   this.EligibilityItemText_valid = false;
    // }
    this.eligibilityItemEntity.EligibilityItemText = CKEDITOR.instances.EligibilityItemText.getData();
    var EligibilityItemText = CKEDITOR.instances.EligibilityItemText.editable().getText();
    if (this.eligibilityItemEntity.EligibilityItemText != "" && this.eligibilityItemEntity.EligibilityItemText != undefined) {
      this.des_valid = false;
      $(".cke_textarea_inline").removeClass("error_ckeditor");
    } else {
      this.des_valid = true;
      $(".cke_textarea_inline").addClass("error_ckeditor");
    }
    if (EligibilityItemText.length < 10 && this.eligibilityItemEntity.EligibilityItemText != '') {
      this.EligibilityItemText_valid = true;
      $(".cke_textarea_inline").addClass("error_ckeditor");
    } else {
      this.EligibilityItemText_valid = false;
    }
    if (id) {
      if (this.eligibilityItemEntity.IsActive == true) {
        this.eligibilityItemEntity.IsActive = 1;
      } else {
        this.eligibilityItemEntity.IsActive = 0;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }

    if (eligibilityItemForm.valid && !this.des_valid && !this.EligibilityItemText_valid) {
      this.eligibilityItemEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.EligibilityItemService.addUpdate(this.eligibilityItemEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.eligibilityItemEntity = {};
          eligibilityItemForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.eligibilityItem.form.alerts.update.type,
              title: this.globals.adminTranslationText.eligibilityItem.form.alerts.update.title,
              text: this.globals.adminTranslationText.eligibilityItem.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.eligibilityItem.form.alerts.add.type,
              title: this.globals.adminTranslationText.eligibilityItem.form.alerts.add.title,
              text: this.globals.adminTranslationText.eligibilityItem.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
          this.router.navigate(['/admin/eligibility-item/list']);
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
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

}
