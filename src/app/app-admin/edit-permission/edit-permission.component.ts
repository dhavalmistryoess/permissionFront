import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../services/permission.service';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {

  permissionEntity;
  submitted;
  btn_disable;
  countryId;
  errorEntity;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private PermissionService: PermissionService) { }
   ngOnInit() {

    debugger
    this.globals.isLoading = false;
    this.errorEntity = {};
    let id = this.route.snapshot.paramMap.get('permission');

    if (id) {
      id = window.atob(id);
      this.globals.isLoading = true;
      console.log(id);
      this.PermissionService.getPermissionByKey(id)
        .then((data) => {
          this.permissionEntity = data;
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      this.permissionEntity = {};
      this.permissionEntity.CountryId = 0;
      this.permissionEntity.IsActive = true;
    }
  }

  update(permissionForm) {
    debugger;
     if (permissionForm.valid) {
     console.log(this.permissionEntity);
     
     this.btn_disable = true;
      this.globals.isLoading = true;
      this.PermissionService.updatePermissionKey(this.permissionEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.permissionEntity = {};
          permissionForm.form.markAsPristine();
          swal({
            type: this.globals.adminTranslationText.permission.form.alerts.update.type,
            title: this.globals.adminTranslationText.permission.form.alerts.update.title,
            text: this.globals.adminTranslationText.permission.form.alerts.update.text,
            showConfirmButton: false,
            timer: 2000
          })
         
          this.router.navigate(['/admin/permission-list']);
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.status == 302) {
              swal({
                type: this.globals.adminTranslationText.permission.form.alerts.duplicateAbbreviation.type,
                title: this.globals.adminTranslationText.permission.form.alerts.duplicateAbbreviation.title,
                text: this.globals.adminTranslationText.permission.form.alerts.duplicateAbbreviation.text,
                showConfirmButton: false,
                timer: 4000
              })
            } else {
              if(error.error.code == 422)
              {
                this.errorEntity.DisplayName = (error.error.message.DisplayName != "") ? error.error.message.DisplayName : '';
                this.errorEntity.Slug = (error.error.message.Slug != "") ? error.error.message.Slug : '';
              }
              else
              {
                // this.globals.pageNotfound(error.error.code);
              }
            }
          });
    }
  }

}
