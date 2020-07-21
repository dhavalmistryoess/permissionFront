import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';


import commonTranslationText from "../assets/data/commonTranslationText.json";
import adminTranslationText from "../assets/data/adminTranslationText.json";
import { identifierModuleUrl } from '@angular/compiler';
declare var angular: any;

@Injectable()
export class Globals {

  constructor( ) { }

  baseAPIUrl: string = environment.apiUrl;
  baseUrl: string = environment.baseUrl;
  headerpath: string = "{'Content-Type': 'application/json','Accept': 'application/json'}";
  IsLoggedIn: boolean = false;
  isLoading: boolean = false;
  currentLink: string = '';
  currentModule: string = '';
  authData = localStorage.getItem('token') ? new JwtHelperService().decodeToken(localStorage.getItem('token')) : null;
  msgflag = false;
  message = '';
  type = '';
  check_login = false;
  todaysdate: string = '';
  commonTranslationText = commonTranslationText;
  adminTranslationText = adminTranslationText;
  current_progress: number = 0;
  selectedCurrency = 'usd';
  pageSize = 15;
  permissions;
  menuEntity = [{
    key : 'country-list',
    value : false
  },
  {
    key : 'add-country',
    value : false
  },
  {
    key : 'delete-all',
    value : false
  },
  {
    key : 'update-all',
    value : false
  },
  {
    key : 'emailtemplate-list',
    value : false
  },
  {
    key : 'state-list',
    value : false
  }
  ];
  pageNotfound(code)
  {
    window.location.href = 'pagenotfound/' + window.btoa(code);
  }

  
  hasAccess() {
    let retrievedObject1, index;
    let permissionEnity1 = {};
    if(this.authData != null)
    {
      retrievedObject1 = JSON.parse(localStorage.getItem('getUserPermission'));
    
      
      this.menuEntity.forEach(function (menu, key) {
        index = retrievedObject1.findIndex(retrievedObject1=> (retrievedObject1.DisplayName === menu.key && retrievedObject1.HasAccess == 1 ))
        if(index != -1) {
          permissionEnity1[menu.key] =  true;
        } else {
          permissionEnity1[menu.key] =  false;
        }
      });
      this.permissions = permissionEnity1;
      return this.permissions;
    }
  }
  
  
}