import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InquireService } from '../services/inquire.service';
import { AuthService } from '../services/auth.service';
import { Globals } from '../globals';
declare var $, PerfectScrollbar, swal: any, google, map: any;

@Component({
  selector: 'app-inquire',
  templateUrl: './inquire.component.html',
  styleUrls: ['./inquire.component.css']
})
export class InquireComponent implements OnInit {
  inquireEntity;
  btn_disable;
  submitted;
  contactDetailList;
  isDisable;
  defaultContactEntity;
  errorEntity;

  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private InquireService: InquireService, private AuthService: AuthService) { }

  ngOnInit() {
    $(document).ready(function () {
      const body = document.querySelector('body');
      body.style.setProperty('--screen-height', $(window).height() + "px");
    });
    setTimeout(function () {
      $('select').selectpicker();
    }, 1000);
    this.setEntityData();
    this.errorEntity = {};
    this.defaultContactEntity = {};
    this.defaultContactEntity.Latitude = '';
    this.defaultContactEntity.Longitude = '';
    debugger
    this.AuthService.getAllDefault()
      .then((data) => {
        this.defaultContactEntity = data;

        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });


    // var text_max = 500;
    // $('#count_message').html('0 / ' + text_max);
    // $('#contact_us').keyup(function () {
    //   var text_length = $('#contact_us').val().length;
    //   var text_remaining = text_max - text_length;
    //   $('#count_message').html(text_length + ' / ' + text_max);
    // });

    setTimeout(function () {
      var uluru = { lat: parseFloat(this.defaultContactEntity.Latitude), lng: parseFloat(this.defaultContactEntity.Longitude) };
      var zoom_in = 12;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom_in,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        draggable: false
      });
    }, 200);

    this.isDisable = false;
    if (this.globals.authData)
      this.isDisable = true;
    else
      this.isDisable = false;


  }

  sendMessage(inquireForm) {
    debugger
    this.submitted = true;
    if (inquireForm.valid) {
      this.btn_disable = true;
      this.globals.isLoading = true;
      if (this.globals.authData)
        this.inquireEntity.UserId = this.globals.authData.UserId;
      else
        this.inquireEntity.UserId = 0;

      this.inquireEntity.LoginURL = '/login';
      this.inquireEntity.InquireId = 0;
      this.InquireService.sendMessage(this.inquireEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          inquireForm.form.markAsPristine();
          swal({
            type: this.globals.commonTranslationText.inquirePage.alerts.success.type,
            title: this.globals.commonTranslationText.inquirePage.alerts.success.title,
            text: this.globals.commonTranslationText.inquirePage.alerts.success.text,
            showConfirmButton: false,
            timer: 2000
          });

          // var text_max = 500;
          // $('#count_message').html('0 / ' + text_max);

          this.setEntityData();
        },
          (error) => {
            this.btn_disable = false;
            this.submitted = false;
            this.globals.isLoading = false;
            if (error.error.code == 422) {
              this.errorEntity.FirstName = (error.error.message.FirstName != "") ? error.error.message.FirstName : '';
              this.errorEntity.LastName = (error.error.message.LastName != "") ? error.error.message.LastName : '';
              this.errorEntity.EmailAddress = (error.error.message.INRPrice != "") ? error.error.message.EmailAddress : '';
              this.errorEntity.Message = (error.error.message.Message != "") ? error.error.message.Message : '';
            } else {
                this.globals.pageNotfound(error.error.code);
            }
            
          });
    }
  }

  setEntityData() {
    this.inquireEntity = {};

    if (this.globals.authData) {
      this.inquireEntity.FirstName = this.globals.authData.FirstName;
      this.inquireEntity.LastName = this.globals.authData.LastName;
      this.inquireEntity.EmailAddress = this.globals.authData.EmailAddress;
    }
    else {
      this.inquireEntity.FirstName = '';
      this.inquireEntity.LastName = '';
      this.inquireEntity.EmailAddress = '';
    }

    this.inquireEntity.PhoneNumber = "";
    this.inquireEntity.Message = "";
  }

}
