import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../services/configuration.service';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  configurationEntity;
  btn_disable;
  submitted;
  errorEntity;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private ConfigurationService: ConfigurationService) { }

  ngOnInit() {
    this.globals.isLoading = false;
    this.errorEntity = {
      SMTPDetails : [],
      docType : [],
      disType :[],
      curType : [],
      schStatus : [],
      regType : [],
      resStatus : [],
      userStatus : [],
    };

    $("#password-show").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#password").attr("type") == "password") {
        $("#password").attr("type", "text");
      }
      else {
        $("#password").attr("type", "password");
      }
    });

    this.globals.isLoading = true;

    this.configurationEntity = {};

    this.ConfigurationService.getAll()
      .then((data) => {
        debugger
        this.configurationEntity = data;
        console.log(this.configurationEntity);
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }

  update(configurationForm) {
    debugger
    if (configurationForm.valid) {
      this.btn_disable = true;
      this.submitted = false;
      this.globals.isLoading = true;
      this.ConfigurationService.update(this.configurationEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          swal({
            type: this.globals.adminTranslationText.configuration.form.alerts.success.type,
            title: this.globals.adminTranslationText.configuration.form.alerts.success.title,
            text: this.globals.adminTranslationText.configuration.form.alerts.success.text,
            showConfirmButton: false,
            timer: 2000
          })
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.error.code == 422) {
                this.errorEntity.SMTPDetails[0] = (error.error.message["SMTPDetails[0][Value]"] != "") ? error.error.message["SMTPDetails[0][Value]"] : '';
                this.errorEntity.SMTPDetails[1] = (error.error.message["SMTPDetails[1][Value]"] != "") ? error.error.message["SMTPDetails[1][Value]"] : '';
                this.errorEntity.SMTPDetails[2] = (error.error.message["SMTPDetails[2][Value]"] != "") ? error.error.message["SMTPDetails[2][Value]"] : '';
                this.errorEntity.SMTPDetails[3] = (error.error.message["SMTPDetails[3][Value]"] != "") ? error.error.message["SMTPDetails[3][Value]"] : '';
                this.errorEntity.docType[0] = (error.error.message["DocumentType[0][DisplayText]"] != "") ? error.error.message["DocumentType[0][DisplayText]"] : '';
                this.errorEntity.docType[1] = (error.error.message["DocumentType[1][DisplayText]"] != "") ? error.error.message["DocumentType[1][DisplayText]"] : '';
                this.errorEntity.docType[2] = (error.error.message["DocumentType[2][DisplayText]"] != "") ? error.error.message["DocumentType[2][DisplayText]"] : '';
                this.errorEntity.disType[0] = (error.error.message["DiscountType[0][DisplayText]"] != "") ? error.error.message["DiscountType[0][DisplayText]"] : '';
                this.errorEntity.disType[1] = (error.error.message["DiscountType[1][DisplayText]"] != "") ? error.error.message["DiscountType[1][DisplayText]"] : '';
                this.errorEntity.curType[0] = (error.error.message["CurrencyType[0][DisplayText]"] != "") ? error.error.message["CurrencyType[0][DisplayText]"] : '';
                this.errorEntity.curType[1] = (error.error.message["CurrencyType[1][DisplayText]"] != "") ? error.error.message["CurrencyType[1][DisplayText]"] : '';
                this.errorEntity.curType[2] = (error.error.message["CurrencyType[2][DisplayText]"] != "") ? error.error.message["CurrencyType[2][DisplayText]"] : '';
                this.errorEntity.schStatus[0] = (error.error.message["ScheduleStatus[0][DisplayText]"] != "") ? error.error.message["ScheduleStatus[0][DisplayText]"] : '';
                this.errorEntity.schStatus[1] = (error.error.message["ScheduleStatus[1][DisplayText]"] != "") ? error.error.message["ScheduleStatus[1][DisplayText]"] : '';
                this.errorEntity.schStatus[2] = (error.error.message["ScheduleStatus[2][DisplayText]"] != "") ? error.error.message["ScheduleStatus[2][DisplayText]"] : '';
                this.errorEntity.regType[0] = (error.error.message["RegistrationType[0][DisplayText]"] != "") ? error.error.message["RegistrationType[0][DisplayText]"] : '';
                this.errorEntity.regType[1] = (error.error.message["RegistrationType[1][DisplayText]"] != "") ? error.error.message["RegistrationType[1][DisplayText]"] : '';
                this.errorEntity.resStatus[0] = (error.error.message["ResultStatus[0][DisplayText]"] != "") ? error.error.message["ResultStatus[0][DisplayText]"] : '';
                this.errorEntity.resStatus[1] = (error.error.message["ResultStatus[1][DisplayText]"] != "") ? error.error.message["ResultStatus[1][DisplayText]"] : '';
                this.errorEntity.resStatus[2] = (error.error.message["ResultStatus[2][DisplayText]"] != "") ? error.error.message["ResultStatus[2][DisplayText]"] : '';
                this.errorEntity.userStatus[0] = (error.error.message["UserStatus[0][DisplayText]"] != "") ? error.error.message["UserStatus[0][DisplayText]"] : '';
                this.errorEntity.userStatus[1] = (error.error.message["UserStatus[1][DisplayText]"] != "") ? error.error.message["UserStatus[1][DisplayText]"] : '';
                this.errorEntity.userStatus[2] = (error.error.message["UserStatus[2][DisplayText]"] != "") ? error.error.message["UserStatus[2][DisplayText]"] : '';
                this.errorEntity.userStatus[3] = (error.error.message["UserStatus[3][DisplayText]"] != "") ? error.error.message["UserStatus[3][DisplayText]"] : '';
                this.errorEntity.lockAttempts = (error.error.message["lockAttempts[0][Value]"] != "") ? error.error.message["lockAttempts[0][Value]"] : '';
                this.errorEntity.lockPeriod = (error.error.message["lockPeriod[0][Value]"] != "") ? error.error.message["lockPeriod[0][Value]"] : '';
            } else  {
                 this.globals.pageNotfound(error.error.code);
            }

           
          });
    }
  }

}
