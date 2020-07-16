import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../services/password.service';
declare var $, swal: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordEntity;
  submitted;
  type;
  btn_disable;
  current_time;
  errorEntity;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private PasswordService: PasswordService) { }

  ngOnInit() {
    this.forgotPasswordEntity = {};
    this.errorEntity = {};

    $(document).ready(function () {
      const body = document.querySelector('body');
      body.style.setProperty('--screen-height', $(window).height() + "px");
    });
  }

  filter(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    //return hrs + ':' + mins + ':' + secs + ':' + ms;
    return hrs + ':' + mins + ':' + secs;
  }

  requestResetPassword(forgotPasswordForm) {
    debugger
    this.submitted = true;
    if (forgotPasswordForm.valid) {
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.forgotPasswordEntity.ResetPasswordURL = 'reset-password';  //reset password page url for email
      this.PasswordService.requestResetPassword(this.forgotPasswordEntity)
        .then((data) => {
          this.globals.isLoading = false;
          swal({
            type: this.globals.commonTranslationText.forgotPasswordPage.alerts.success.type,
            title: this.globals.commonTranslationText.forgotPasswordPage.alerts.success.title,
            text: this.globals.commonTranslationText.forgotPasswordPage.alerts.success.text,
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/login']);
        },
          (error) => {
            if (error.status == 400) {
              if (error.error.time) {
                this.current_time = Date.now();
                const converted_last_time_stamp = new Date(error.error.time);
                if (this.current_time < converted_last_time_stamp.getTime()) {
                  const remaining_time = converted_last_time_stamp.getTime() - this.current_time;
                  const time = this.filter(remaining_time);
                  swal({
                    type: this.globals.commonTranslationText.forgotPasswordPage.alerts.lockUser.type,
                    title: this.globals.commonTranslationText.forgotPasswordPage.alerts.lockUser.title,
                    text: this.globals.commonTranslationText.forgotPasswordPage.alerts.lockUser.text + time,
                    showConfirmButton: false,
                    timer: 4000
                  })
                } else {
                  // swal({
                  //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                  //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                  //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                  //   showConfirmButton: false,
                  //   timer: 4000
                  // })
              this.globals.pageNotfound(error.error.code);
                }
              } else {
                swal({
                  type: this.globals.commonTranslationText.forgotPasswordPage.alerts.invalidCredential.type,
                  title: this.globals.commonTranslationText.forgotPasswordPage.alerts.invalidCredential.title,
                  text: this.globals.commonTranslationText.forgotPasswordPage.alerts.invalidCredential.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              }
            } else if(error.status == 422) {
              this.errorEntity.email = (error.error.message.EmailAddress != "") ? error.error.message.EmailAddress : '';
            } else {
              this.globals.pageNotfound(error.error.code);
            }
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.submitted = false;
          });
    }
  }
}
