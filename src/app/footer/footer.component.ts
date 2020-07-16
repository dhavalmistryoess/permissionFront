import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

declare var $: any, PerfectScrollbar, swal: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, public globals: Globals) { }

  ngOnInit() {

    var scrolled = $(window).scrollTop();
    if (scrolled > 200) { $('.go_top').fadeIn('slow'); }
    if (scrolled < 200) { $('.go_top').fadeOut('slow'); }

    $('.go_top').click(function () {
      $("html, body").animate({ scrollTop: "0" }, 500);
    });

    setTimeout(function () {
      var currentYear = (new Date()).getFullYear();
      $(".footer_year").html(currentYear);
    }, 500);
  }

}
