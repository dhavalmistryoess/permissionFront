import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateService } from '../services/email-template.service';
declare var $, CKEDITOR: any, swal: any, PerfectScrollbar;


@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {
  header;
  emailEntity;
  roleList;
  roleList1;
  roleList2;
  placeholderList;
  tokenList;
  submitted;
  btn_disable;
  des_valid;
  errorEntity;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private EmailTemplateService: EmailTemplateService) { }

  ngOnInit() {
    this.globals.isLoading = true;
    this.emailEntity = {};
    this.des_valid = false;
    this.roleList = [];
    this.roleList1 = [];
    this.roleList2 = [];
    this.tokenList = [];
    this.errorEntity = {}; 
    CKEDITOR.replace('EmailBody', {
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

    let id = this.route.snapshot.paramMap.get('id');
    this.EmailTemplateService.getDefaultList()
      .then((data) => {
        this.placeholderList = data['Placeholders'];
        var roleSelect = {
          RoleId: '',
          RoleName: this.globals.adminTranslationText.emailTemplate.form.to.select,
          Value: ""
        }
        this.roleList.push(roleSelect);
        this.roleList = [...this.roleList, ...data['Roles']];

        var roleSelect1 = {
          RoleId: '',
          RoleName: this.globals.adminTranslationText.emailTemplate.form.cc.select,
          Value: ""
        }
        this.roleList1.push(roleSelect1);
        this.roleList1 = [...this.roleList1, ...data['Roles']];

        var roleSelect2 = {
          RoleId: '',
          RoleName: this.globals.adminTranslationText.emailTemplate.form.bcc.select,
          Value: ""
        }
        this.roleList2.push(roleSelect2);
        this.roleList2 = [...this.roleList2, ...data['Roles']];

        var tokenSelect = {
          TokenId: '',
          DisplayText: this.globals.adminTranslationText.emailTemplate.form.emailToken.select,
          Value: ""
        }
        this.tokenList.push(tokenSelect);
        this.tokenList = [...this.tokenList, ...data['Tokens']];
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
    if (id) {
      id = window.atob(id);
      this.header = 'Edit';
      this.EmailTemplateService.getById(id)
        .then((data) => {
          if (data != "") {
            this.emailEntity = data;
            if (this.emailEntity.IsActive == false) {
              this.emailEntity.IsActive = false;
            } else {
              this.emailEntity.IsActive = true;
            }
            if (this.emailEntity.Cc == 0) {
              this.emailEntity.Cc = "";
            }
            if (this.emailEntity.Bcc == 0) {
              this.emailEntity.Bcc = "";
            }
            CKEDITOR.instances.EmailBody.setData(this.emailEntity.EmailBody);
            this.globals.isLoading = false;

          } else {
            this.router.navigate(['/admin/adminDashboard']);
          }

        },
          (error) => {
            this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.header = 'Add';
      this.emailEntity = {};
      this.emailEntity.EmailTemplateId = 0;
      this.emailEntity.ModuleId = 0;
      this.emailEntity.TokenId = '';
      this.emailEntity.To = '';
      this.emailEntity.Cc = '';
      this.emailEntity.Bcc = '';
      this.emailEntity.IsActive = true;
      this.globals.isLoading = false;

    }
    CKEDITOR.on('instanceReady', function () {
      CKEDITOR.document.getById('contactList').on('dragstart', function (evt) {
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
  addEmailTemplate(EmailForm) {
    this.errorEntity.EmailBody = '';
    this.emailEntity.EmailBody = CKEDITOR.instances.EmailBody.getData();
    var EmailBody = CKEDITOR.instances.EmailBody.editable().getText();
    if (this.emailEntity.EmailBody != "" && this.emailEntity.EmailBody != undefined) {
      this.des_valid = false;
      $(".cke_textarea_inline").removeClass("error_ckeditor");
    } else {
      this.des_valid = true;
      $(".cke_textarea_inline").addClass("error_ckeditor");
    }
    let id = this.route.snapshot.paramMap.get('id');
    //let id = window.atob(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // id = window.atob(id);
      this.emailEntity.UserId = this.globals.authData.UserId;
      if (this.emailEntity.Cc == '' || this.emailEntity.Cc == 'undefined') {
        this.emailEntity.Cc = '0';
      }
      else {
        this.emailEntity.Cc = this.emailEntity.Cc;
      }

      if (this.emailEntity.Bcc == '' || this.emailEntity.Bcc == undefined) {
        this.emailEntity.Bcc = '0';
      }
      else {
        this.emailEntity.Bcc = this.emailEntity.Bcc;
      }

      if (this.emailEntity.BccEmail == '' || this.emailEntity.BccEmail == undefined) {
        this.emailEntity.BccEmail = '';
      }
      else {
        this.emailEntity.BccEmail = this.emailEntity.BccEmail;
      }
      this.submitted = false;
    } else {
      if (this.emailEntity.Cc == '' || this.emailEntity.Cc == 'undefined') {
        this.emailEntity.Cc = '0';
      }
      else {
        this.emailEntity.Cc = this.emailEntity.Cc;
      }
      if (this.emailEntity.Bcc == '' || this.emailEntity.Bcc == undefined) {
        this.emailEntity.Bcc = '0';
      }
      else {
        this.emailEntity.Bcc = this.emailEntity.Bcc;
      }

      if (this.emailEntity.BccEmail == '' || this.emailEntity.BccEmail == undefined) {
        this.emailEntity.BccEmail = '';
      }
      else {
        this.emailEntity.BccEmail = this.emailEntity.BccEmail;
      }
      this.emailEntity.CreatedBy = this.globals.authData.UserId;
      this.emailEntity.UserId = this.globals.authData.UserId;
      this.submitted = true;
    }
    if (EmailForm.valid && !this.des_valid) {
      this.btn_disable = true;
      this.emailEntity.check = 0;
      this.EmailTemplateService.add(this.emailEntity)
        .then((data) => {
          this.btn_disable = false;
          this.submitted = false;
          this.emailEntity = {};
          EmailForm.form.markAsPristine();
          if (id) {
            swal({
              type: 'success',
              title: 'Updated!',
              text: 'Email Template has been updated successfully.',
              showConfirmButton: false,
              timer: 4000
            })
          } else {
            swal({
              type: 'success',
              title: 'Added!',
              text: 'Email Template has been added successfully.',
              showConfirmButton: false,
              timer: 4000
            })
          }
          this.router.navigate(['/admin/email-template/list']);
        },
          (error) => {
            this.btn_disable = false;
            this.submitted = false;
            this.globals.isLoading = false;
            if(error.error.code == 422)
            {
              this.errorEntity.TokenId = (error.error.message.TokenId != "") ? error.error.message.TokenId : '';
              this.errorEntity.Subject = (error.error.message.Subject != "") ? error.error.message.Subject : '';
              this.errorEntity.EmailBody = (error.error.message.EmailBody != "") ? error.error.message.EmailBody : '';
              this.errorEntity.To = (error.error.message.To != "") ? error.error.message.To : '';
            }
            else{
              this.globals.pageNotfound(error.error.code);
            }
          
          });
    }
  }

  clearForm(EmailForm) {
    this.emailEntity = {};
    this.emailEntity.EmailTemplateId = 0;
    this.emailEntity.IsActive = true;
    this.submitted = false;
    this.des_valid = false;
    this.emailEntity.TokenId = '';
    this.emailEntity.To = '';
    this.emailEntity.Cc = '';
    this.emailEntity.Bcc = '';
    //CKEDITOR.instances.EmailBody.setData('');
    EmailForm.form.markAsPristine();
  }
}
