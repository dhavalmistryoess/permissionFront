import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { CountryService } from '../services/country.service';
declare var $, swal: any, PerfectScrollbar;


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  stateEntity;
  countryList;
  submitted;
  btn_disable;
  header;
  errorEntity;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private StateService: StateService, private CountryService: CountryService) { }

  ngOnInit() {
    debugger
    this.stateEntity = {}
    this.countryList = [];
    this.errorEntity = {};
    this.globals.isLoading = false;

    setTimeout(function () {

      $(document).ready(function () {
        const body = document.querySelector('body');
        body.style.setProperty('--screen-height', $(window).height() + "px");
      });
      new PerfectScrollbar('.content_height');

    }, 100);
    this.globals.isLoading = true;

    this.CountryService.getActivated()
      .then((data) => {
        //  this.countryList = data;
        var data1: any;
        data1 = data;
        var countrySelect = {
          CountryId: '',
          CountryName: this.globals.adminTranslationText.country.form.countryName.select,
          Value: ""
        }
        this.countryList.push(countrySelect);
        this.countryList = [...this.countryList, ...data1];
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      id = window.atob(id);
      this.globals.isLoading = true;
      this.StateService.getById(id)
        .then((data) => {
          this.stateEntity = data;
          console.log(this.stateEntity);
          if (data['IsActive'] == 0) {
            this.stateEntity.IsActive = false;
          } else {
            this.stateEntity.IsActive = true;
          }
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      this.stateEntity = {};
      this.stateEntity.StateId = 0;
      this.stateEntity.IsActive = true;
      this.stateEntity.CountryId = '';
    }
    setTimeout(function () {
      $('select').selectpicker();
    }, 5000);
  }

  addUpdate(stateForm) {
    debugger

    // let id = window.atob(this.route.snapshot.paramMap.get('id'));
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      if (this.stateEntity.IsActive == true) {
        this.stateEntity.IsActive = true;
      } else {
        this.stateEntity.IsActive = false;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }

    if (stateForm.valid) {
      this.stateEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.StateService.addUpdate(this.stateEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.stateEntity = {};
          stateForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.state.form.alerts.update.type,
              title: this.globals.adminTranslationText.state.form.alerts.update.title,
              text: this.globals.adminTranslationText.state.form.alerts.update.text,
              showConfirmButton: false,
              timer: 4000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.state.form.alerts.add.type,
              title: this.globals.adminTranslationText.state.form.alerts.add.title,
              text: this.globals.adminTranslationText.state.form.alerts.add.text,
              showConfirmButton: false,
              timer: 4000
            })
          }
          this.router.navigate(['/admin/state/list']);
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.status == 302) {
              swal({
                type: this.globals.adminTranslationText.state.form.alerts.duplicateAbbreviation.type,
                title: this.globals.adminTranslationText.state.form.alerts.duplicateAbbreviation.title,
                text: this.globals.adminTranslationText.state.form.alerts.duplicateAbbreviation.text,
                showConfirmButton: false,
                timer: 4000
              })
            } else {
                if(error.error.code == 422)
                {
                  this.errorEntity.StateName = (error.error.message.StateName != "") ? error.error.message.StateName : '';
                  this.errorEntity.StateAbbreviation = (error.error.message.StateAbbreviation != "") ? error.error.message.StateAbbreviation : '';
                  this.errorEntity.CountryId = (error.error.message.CountryId != "") ? error.error.message.CountryId : '';
                }
                else{
                  this.globals.pageNotfound(error.error.code);
                }
            }
          });
    }
  }

}
