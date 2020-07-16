import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { JwtHelperService } from '@auth0/angular-jwt';
declare var $, swal: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordEntity;
  resetPasswordLinkEntity;
  submitted;
  btn_disable;
  newconfsame;
  UserDetail;
  errorEntity;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private PasswordService: PasswordService) { }

  ngOnInit() {
    debugger
    const body = document.querySelector('body');
    var count = $(window).height();
    body.style.setProperty('--screen-height', count + "px");
    this.passwordEntity = {};
    this.resetPasswordLinkEntity = {};
    this.errorEntity = {};

    $("#newpassword-show").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#newpassword").attr("type") == "password") {
        $("#newpassword").attr("type", "text");

      }
      else {
        $("#newpassword").attr("type", "password");
      }
    });
    $("#confpassword-show").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#confpassword").attr("type") == "password") {
        $("#confpassword").attr("type", "text");

      }
      else {
        $("#confpassword").attr("type", "password");
      }
    });

    this.globals.isLoading = true;

    try {
      let id = this.route.snapshot.paramMap.get('id');
      this.UserDetail = new JwtHelperService().decodeToken(id);
      this.resetPasswordLinkEntity.UserId = this.UserDetail.UserId;
      this.resetPasswordLinkEntity.ForgotPasswordCode = this.UserDetail.ForgotPasswordCode;

      this.PasswordService.checkResetPasswordLink(this.resetPasswordLinkEntity)
        .then((data) => {
          this.globals.isLoading = false;
        },
          (error) => {
            if (error.status == 404) {
              swal({
                type: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.type,
                title: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.title,
                text: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.text,
              })
            }
            this.router.navigate(['/login']);
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.submitted = false;
          });
    } catch (exception) {
      this.globals.isLoading = false;
      swal({
        type: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.type,
        title: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.title,
        text: this.globals.commonTranslationText.resetPasswordPage.alerts.invalidLink.text,
      })
      this.router.navigate(['/login']);
    }
  }

  resetPassword(resetPasswordForm) {
    this.submitted = true;

    if (resetPasswordForm.valid && !this.newconfsame) {

      this.globals.isLoading = true;
      this.btn_disable = true;

      this.passwordEntity.UserId = this.UserDetail.UserId;
      this.passwordEntity.LoginURL = 'login';
      this.passwordEntity.ForgotPasswordURL = 'forgot-password';
debugger
console.log(this.passwordEntity);
      this.PasswordService.resetPassword(this.passwordEntity)
        .then((data) => {
          this.globals.isLoading = false;
          swal({
            type: this.globals.commonTranslationText.resetPasswordPage.alerts.success.type,
            title: this.globals.commonTranslationText.resetPasswordPage.alerts.success.title,
            text: this.globals.commonTranslationText.resetPasswordPage.alerts.success.text,
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/login']);
        },
          (error) => {
            if(error.error.code == 422)
            {
              this.errorEntity.Password = (error.error.message.Password != "") ? error.error.message.Password : '';
              this.errorEntity.ConfirmPassword = (error.error.message.ConfirmPassword != "") ? error.error.message.ConfirmPassword : '';
            }
            else{ 
              this.globals.pageNotfound(error.error.code);
            }
              
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.submitted = false;
          });
    }
  }

  confirmPassword() {
    if (this.passwordEntity.ConfirmPassword != this.passwordEntity.Password) {
      this.newconfsame = true;
    } else {
      this.newconfsame = false;
    }
  }
}
