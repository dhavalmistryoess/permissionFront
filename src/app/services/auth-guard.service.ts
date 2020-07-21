import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
declare var $: any;


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public globals: Globals) { }

  canActivate(route, state: RouterStateSnapshot)  {
    this.globals.isLoading = false;
    var permission = this.globals.hasAccess();

   
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    if (curr_month < 10) {
      var month = '0' + curr_month;
    } else {
      var month = '' + curr_month;
    }
    if (curr_date < 10) {
      var date = '0' + curr_date;
    }
    else {
      var date = '' + curr_date;
    }
    var today = month + '-' + date + '-' + curr_year;

    this.globals.todaysdate = today;
    setTimeout(function () {
      if ($('.sidebar_wrap').hasClass('active_menu')) {
        $('.sidebar_wrap').addClass("active_menu");
        $('header').addClass("active_menu_right_block");
        $('.content_block').addClass("active_menu_right_block");
        $('footer').addClass("active_menu_right_block");
      }
      $(".sidebar_wrap").on("mouseleave", function () {
        if ($('.sidebar_scroll')[0]) {
          $('.sidebar_wrap.sidebar_scroll .sidebar_box').animate({ scrollTop: 0 }, "slow");
          $('header').addClass("admin_small_right_block");
          $('.content_block').addClass("admin_small_right_block");
          $('footer').addClass("admin_small_right_block");
        }
      });

      if ($(window).width() < 768) {
        $('.sidebar_wrap').removeClass("active_menu");
        $('.sidebar_wrap').removeClass("sidebar_scroll");

        $('.sidebar_wrap .sidebar_box .has_click').click(function () {
          $('.sidebar_wrap').removeClass("active_menu");
          $('.sidebar_wrap').removeClass("sidebar_scroll");
          $('.mobile_toggle').removeClass("close_toggle");
        });
      }
      $("html, body").animate({
        scrollTop: 0
      }, "slow");

    }, 500);
   
    if (route.data['permission'] != undefined) {
      if(!permission[route.data['permission']]) {
        return this.router.navigate(["/pagenotfound/" + window.btoa("403")]);
      }
    }
    


    $(".tooltip.show").remove();
    
    //debugger
    if (state.url.split('/')[3] != undefined) {
      this.globals.currentLink = '/' + state.url.split('/')[1] + '/' + state.url.split('/')[2] + '/' + state.url.split('/')[3];
      this.globals.currentModule = state.url.split('/')[1];
    } else if (state.url.split('/')[2] != undefined) {
      this.globals.currentLink = '/' + state.url.split('/')[1] + '/' + state.url.split('/')[2];
      this.globals.currentModule = state.url.split('/')[1];
    } else {
      this.globals.currentLink = '/' + state.url.split('/')[1];
    }

    if (this.authService.isLoggedIn() == true) {
      if (state.url == '/login' || state.url.split('/')[1] == 'login' || state.url == '/forgot-password' || state.url == '/register' || state.url.split('/')[1] == 'register' || state.url.split('/')[1] == 'reset-password') {
        this.globals.IsLoggedIn = true;
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        this.globals.IsLoggedIn = true;
        return true;
      }
      
    } else {

      if (state.url == '/login' || state.url.split('/')[1] == 'login' || state.url == '/forgot-password' || state.url == '/register' || state.url.split('/')[1] == 'register' || state.url.split('/')[1] == 'reset-password') {
        this.globals.IsLoggedIn = false;
        return true;
      } else {
        this.globals.IsLoggedIn = false;
        this.router.navigate(['/login']);
        return false;
      }

    }

  }

 
}

