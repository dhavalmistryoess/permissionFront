import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserInviteService } from '../services/user-invite.service';

declare var $, swal: any;

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private UserInviteService: UserInviteService) { }

  userInviteEntity;
  submitted;
  btn_disable;
  certificateList;
  roleList;
  errorEntity;

  ngOnInit() {

    this.globals.isLoading = false;
    this.userInviteEntity = {};
    this.errorEntity = {};
    this.certificateList = [];
    this.roleList = [];
    this.UserInviteService.getAllDefault()
      .then((data) => {
        // this.certificateList = data['Certificates'];
        // this.roleList = data['Roles'];
        var certificateSelect = {
          CertificateId: '',
          CertificateName: this.globals.adminTranslationText.userInvite.form.certificate.select,
          Value: ""
        }
        this.certificateList.push(certificateSelect);
        this.certificateList = [...this.certificateList, ...data['Certificates']];

        var roleSelect = {
          RoleId: '',
          RoleName: this.globals.adminTranslationText.userInvite.form.role.select,
          Value: ""
        }
        this.roleList.push(roleSelect);
        this.roleList = [...this.roleList, ...data['Roles']];

        this.globals.isLoading = false;
        this.userInviteEntity.CertificateId = '';
        this.userInviteEntity.RoleId = '';
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }

  sendInvite(userInviteForm) {
    debugger
    var obj;
    for (var i = 0; i < this.certificateList.length; i++) {
      if (this.certificateList[i].CertificateId == this.userInviteEntity.CertificateId) {
        obj = { CertificateId: this.userInviteEntity.CertificateId, CertificateName: this.certificateList[i].CertificateName }
      }
    }
    this.userInviteEntity.CertificateDetails = obj;
    this.userInviteEntity.RegistrationURL = 'register';
    this.userInviteEntity.AdminId = this.globals.authData.UserId;
    this.submitted = true;
    if (userInviteForm.valid) {
      this.globals.isLoading = true;
      this.UserInviteService.sendInvite(this.userInviteEntity)
        .then((data) => {
          if (data == 'Successful invite') {
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.submitted = false;
            this.userInviteEntity = {};
            userInviteForm.form.markAsPristine();
            this.userInviteEntity.CertificateId = "";
            this.userInviteEntity.RoleId = "";
            swal({
              type: this.globals.adminTranslationText.userInvite.form.alerts.send.type,
              title: this.globals.adminTranslationText.userInvite.form.alerts.send.title,
              text: this.globals.adminTranslationText.userInvite.form.alerts.send.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            this.globals.isLoading = false;
            swal({
              type: this.globals.adminTranslationText.userInvite.form.alerts.duplicateSend.type,
              title: this.globals.adminTranslationText.userInvite.form.alerts.duplicateSend.title,
              text: this.globals.adminTranslationText.userInvite.form.alerts.duplicateSend.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.error.code == 422) {
              this.errorEntity.CertificateId = (error.error.message.CertificateId != "") ? error.error.message.CertificateId : '';
              this.errorEntity.EmailAddress = (error.error.message.EmailAddress != "") ? error.error.message.EmailAddress : '';
              this.errorEntity.FirstName = (error.error.message.FirstName != "") ? error.error.message.FirstName : '';
              this.errorEntity.LastName = (error.error.message.LastName != "") ? error.error.message.LastName : '';
              this.errorEntity.RoleId = (error.error.message.RoleId != "") ? error.error.message.RoleId : '';
            } else {
              this.globals.pageNotfound(error.error.code);
            }
          });
    }
  }
}
