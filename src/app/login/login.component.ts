import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { debug } from 'util';
import { JwtHelperService } from '@auth0/angular-jwt';
import { count } from 'rxjs/operators';
import { now } from '@amcharts/amcharts4/.internal/core/utils/Time';
import { getLocaleDateTimeFormat } from '@angular/common';
import { time } from '@amcharts/amcharts4/core';

declare var $, swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  loginEntity;
  submitted;
  btn_disable;
  invalid;
  current_time;
  time;
  errorEntity;

  constructor(private router: Router, private route: ActivatedRoute, private AuthService: AuthService, public globals: Globals) { }

  ngOnInit() {
    this.errorEntity = {};
    $(document).ready(function () {
      const body = document.querySelector('body');
      body.style.setProperty('--screen-height', $(window).height() + "px");
    });

    
    $("#password-show").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#password").attr("type") == "password") {
        $("#password").attr("type", "text");

      }
      else {
        $("#password").attr("type", "password");
      }
    });

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {debugger
      var id1 = new JwtHelperService().decodeToken(id);
      if(id1.RoleId == undefined || id1.RoleId == '')
      {
        this.globals.isLoading = true;
        this.AuthService.ActiveAccount(id1)
          .then((data) => {
            this.globals.isLoading = false;
            swal({
              type: this.globals.commonTranslationText.registerPage.form.successActivateAccount.type,
              title: this.globals.commonTranslationText.registerPage.form.successActivateAccount.title,
              text: this.globals.commonTranslationText.registerPage.form.successActivateAccount.text,
              showConfirmButton: false,
              timer: 4000
            })
            this.router.navigate(['/login']);
          },
            (error) => {
              this.globals.isLoading = false;
              this.btn_disable = false;
              this.globals.pageNotfound(error.error.code);
            });
        // alert("successfully activation");
        // this.router.navigate(['/login']);
      }
      else
      {
        let CertificateId = [id1.CertificateId]
        var obj = { CertificateFor: id1.CertificateFor, CertificateId: CertificateId, UserId: id1.UserId }
        this.AuthService.AddCertificate(obj)
          .then((data) => {
            this.router.navigate(['/login']);
          },
            (error) => {
              this.globals.isLoading = false;
              this.btn_disable = false;
              this.globals.pageNotfound(error.error.code);
            });
        }
    }
    this.loginEntity = {};
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

  login(loginForm) {
    this.submitted = true;
    if (loginForm.valid) {
      this.btn_disable = true;
      //this.globals.isLoading = true;
      this.AuthService.checkLogin(this.loginEntity)
        .then((data) => {
          if (this.globals.authData.RoleId == 1)
            window.location.href = '/admin/adminDashboard';
          else if (this.globals.authData.RoleId == 2 || this.globals.authData.RoleId == 4)
            window.location.href = '/proctorDashboard';
          else
            window.location.href = '/dashboard';


          this.globals.isLoading = true;
        },
          (error) => {
            if (error.status == 404) {
              if (error.error.status == 'User Locked') {
                this.current_time = Date.now();
                const converted_last_time_stamp = new Date(error.error.time_lastattemp);
                if (this.current_time < converted_last_time_stamp.getTime()) {
                  const remaining_time = converted_last_time_stamp.getTime() - this.current_time;
                  const time = this.filter(remaining_time);
                  swal({
                    type: this.globals.commonTranslationText.loginPage.alerts.userLocked.type,
                    title: this.globals.commonTranslationText.loginPage.alerts.userLocked.title,
                    text: this.globals.commonTranslationText.loginPage.alerts.userLocked.text + time,
                    showConfirmButton: false,
                    timer: 4000
                  })
                }
              } else if (error.error.status == 'Please try again') {
                swal({
                  type: this.globals.commonTranslationText.loginPage.alerts.invalidCredential.type,
                  title: this.globals.commonTranslationText.loginPage.alerts.invalidCredential.title,
                  text: this.globals.commonTranslationText.loginPage.alerts.invalidCredential.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              }
              else if (error.error.status == 'Invalid Email') {
                swal({
                  type: this.globals.commonTranslationText.loginPage.alerts.invalidEmail.type,
                  title: this.globals.commonTranslationText.loginPage.alerts.invalidEmail.title,
                  text: this.globals.commonTranslationText.loginPage.alerts.invalidEmail.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              }
              else if (error.error.status == 'User banded') {
                swal({
                  type: this.globals.commonTranslationText.loginPage.alerts.userBaned.type,
                  title: this.globals.commonTranslationText.loginPage.alerts.userBaned.title,
                  text: this.globals.commonTranslationText.loginPage.alerts.userBaned.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              }
              else if (error.error.status == 'Not Active') {
                swal({
                  type: this.globals.commonTranslationText.loginPage.alerts.userInActive.type,
                  title: this.globals.commonTranslationText.loginPage.alerts.userInActive.title,
                  text: this.globals.commonTranslationText.loginPage.alerts.userInActive.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              }
              else if (error.error.status == 'Inactive by Admin') {
                swal({
                  type: this.globals.commonTranslationText.loginPage.alerts.userInActiveByAdmin.type,
                  title: this.globals.commonTranslationText.loginPage.alerts.userInActiveByAdmin.title,
                  text: this.globals.commonTranslationText.loginPage.alerts.userInActiveByAdmin.text,
                  showConfirmButton: false,
                  timer: 4000
                })
              }
            } else if(error.status == 422) {
                  this.errorEntity.email = (error.error.message.EmailAddress != "") ? error.error.message.EmailAddress : '';
                  this.errorEntity.password = (error.error.message.Password != "") ? error.error.message.Password : '';
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

