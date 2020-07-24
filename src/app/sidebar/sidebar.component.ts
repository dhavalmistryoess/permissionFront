import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { CommonService } from '../app-admin/services/common.service';
declare var $, PerfectScrollbar: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 
  menuDisplayEntity:any;
  menuEntity:any;
  listPermission;

  constructor(public globals: Globals, private CommonService : CommonService) { }

  ngOnInit() {
    this.listPermission =[];
    this.menuEntity = [{
      key : 'country-list',
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

    this.CommonService.checkPermission()
    .then((data) => {
      this.listPermission = data;
      this.menuEntity = this.CommonService.hasAccess(this.listPermission,this.menuEntity);
    },
      (error) => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
    });
     
    setTimeout(function () {
      new PerfectScrollbar('.sidebar_box');
      
    }, 500);
      setTimeout(function () {
      if ($(window).width() < 1251) {
        $('.pin_toggle').hide();
        $('.sidebar_wrap').removeClass("active_menu");
        $('.sidebar_wrap').addClass("sidebar_scroll");
        $('header').addClass("admin_small_right_block");
        $('.content_block').addClass("admin_small_right_block");
        $('footer').addClass("admin_small_right_block");
        $('header').removeClass("active_menu_right_block");
        $('.content_block').removeClass("active_menu_right_block");
        $('footer').removeClass("active_menu_right_block");
        $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
      }

      $('.pin_toggle').click(function () {
        $('.pin_toggle').toggleClass("unpin");
        $('.sidebar_wrap').toggleClass("active_menu");
        $('.sidebar_wrap').toggleClass("sidebar_scroll");
        $('header').removeClass("admin_small_right_block");
        $('.content_block').removeClass("admin_small_right_block");
        $('footer').removeClass("admin_small_right_block");
        $('header').toggleClass("active_menu_right_block");
        $('.content_block').toggleClass("active_menu_right_block");
        $('footer').toggleClass("active_menu_right_block");
        $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
      });
      $(".sidebar_wrap").on("mouseleave", function () {
        if ($('.sidebar_scroll')[0]) {
          $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
          $('header').addClass("admin_small_right_block");
          $('.content_block').addClass("admin_small_right_block");
          $('footer').addClass("admin_small_right_block");
        }
      });

    }, 3000);
  }


 
  closecollapse() {
    $(".dropdown_menu").addClass("collapsed");
    $(".dropdown_menu").attr("aria-expanded", "false");
    $(".collapse").removeClass("in");
  }
}
