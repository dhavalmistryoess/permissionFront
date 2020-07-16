import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
declare var $, swal: any;

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.css']
})
export class CookiePolicyComponent implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit() {
    if(this.globals.authData != undefined && this.globals.authData.RoleId == 1)
      {
        $('header').addClass("active_menu_right_block");
        $('.content_block').addClass("active_menu_right_block");
        $('footer').addClass("active_menu_right_block");
      }
  }

}
