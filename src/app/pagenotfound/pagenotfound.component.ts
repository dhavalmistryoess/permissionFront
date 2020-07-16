import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $;

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute) { }

  code;
  ngOnInit() {
    $(document).ready(function () {
      const body = document.querySelector('body');
      body.style.setProperty('--screen-height', $(window).height() + "px");
    });
    this.globals.isLoading = true;
    this.code = window.atob(this.route.snapshot.paramMap.get('code'));
    if(this.code)
    {
      this.globals.isLoading = false;
    }
  }

}
