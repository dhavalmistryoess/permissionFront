import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

import commonTranslationText from "../assets/data/commonTranslationText.json";
import adminTranslationText from "../assets/data/adminTranslationText.json";

@Injectable()
export class Globals {

  constructor() { }

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

  hasAccess(permissionName) {
    let retrievedObject = JSON.parse(localStorage.getItem('getUserPermission'));

   
    retrievedObject.forEach(function (value) {
       if(value.DisplayName == permissionName && value.HasAccess == 1) {
         console.log("Hello");
         return true;
        //  console.log("dsadsad");
       }
    });
   
    return false;
  }
  
}