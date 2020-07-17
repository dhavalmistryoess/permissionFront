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

  pageNotfound(code)
  {
    window.location.href = 'pagenotfound/' + window.btoa(code);
  }

  hasAccess(permission) {
    let retrievedObject, index;
    let permissionEnity = [];
    retrievedObject = JSON.parse(localStorage.getItem('getUserPermission'));
  
    
    permission.forEach(function (menu, key) {
      index = retrievedObject.findIndex(retrievedObject=> (retrievedObject.DisplayName === menu.key && retrievedObject.HasAccess == 1 ))
      if(index != -1) {
        permissionEnity[menu.key] =  true;
      } else {
        permissionEnity[menu.key] =  false;
      }
    });

    return permissionEnity;
  }
  
}