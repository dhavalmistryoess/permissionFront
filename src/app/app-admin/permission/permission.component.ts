import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../services/permission.service';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  permissionEntity;
  roleEntity;
  btn_disable;
  submitted;
  errorEntity;
  currentRole;
  rolePermissionEntity;
  defaultPermissionEntity;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private PermissionService: PermissionService) { }

  ngOnInit() {
    this.globals.isLoading = false;
    this.globals.isLoading = true;
    this.permissionEntity = [];
    this.defaultPermissionEntity = [];
    this.roleEntity = {};
    this.rolePermissionEntity = {};
    this.currentRole = 2;
   
    this.getAllRoles();
    this.getAllPermission(this.currentRole);
   
    
    // this.getUserPermission();
  }
  // getUserPermission() {
  //   this.PermissionService.getUserPermission()
  //   .then((data) => {
  //     this.rolePermissionEntity = data;
  //     this.globals.isLoading = false;
  //   },
  //     (error) => {
  //       this.globals.isLoading = false;
  //       this.globals.pageNotfound(error.error.code);
  //     });
  // }


  getAllPermission(getCurrentRole) {
    this.PermissionService.getAll(getCurrentRole)
      .then((data) => {
        console.log(data);
        this.defaultPermissionEntity = data;
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }

  getAllRoles() {
    this.PermissionService.getAllRoles()
    .then((data) => {
      this.roleEntity = data;
      this.globals.isLoading = false;
    },
      (error) => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      });   
  }

  checkValue($event, chlidParams){
    chlidParams.HasAccess = ($event.target.checked == true) ?  1 : 2 ;
 }
  
  changeRole(e) {
    this.currentRole = e;
    this.getAllPermission(e);
  }

  update(configurationForm) {
    var permission = [];
    this.defaultPermissionEntity.forEach(function (menu, key) {
      for(var i=0;i<menu[menu.key].length;i++)
      {
        console.log(menu[menu.key][i].DisplayName);
        var obj = {
          "RoleId": menu[menu.key][i].RoleId,
          "DisplayName": menu[menu.key][i].DisplayName,
          "ModuleIDs": menu[menu.key][i].ModuleIDs,
          "HasAccess": ((menu[menu.key][i].HasAccess == 1 || menu[menu.key][i].HasAccess == true) ? "1" : "2" ),
          "ClassName": menu[menu.key][i].ClassName
        }
        permission.push(obj);
      }
    });


    this.permissionEntity.permission = permission;
    if(configurationForm.valid)
    {
      this.globals.isLoading = true;
      this.PermissionService.updatePermission(this.permissionEntity.permission)
      .then((data) => {
        this.globals.isLoading = false;
        swal({
          type: this.globals.adminTranslationText.permission.alerts.permissionUpdate.type,
          title: this.globals.adminTranslationText.permission.alerts.permissionUpdate.title,
          text: this.globals.adminTranslationText.permission.alerts.permissionUpdate.text,
          showConfirmButton: false,
          timer: 2000
        })
        localStorage.removeItem('getUserPermission');
      },
      (error) => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      });   
    }
    
  }

}
