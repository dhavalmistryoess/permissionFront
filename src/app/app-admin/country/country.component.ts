import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
declare var $, swal: any, PerfectScrollbar;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryEntity;
  submitted;
  btn_disable;
  countryId;
  errorEntity;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private CountryService: CountryService) { }

  ngOnInit() {

    debugger
    this.globals.isLoading = false;
    this.errorEntity = {};
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      id = window.atob(id);
      this.globals.isLoading = true;
      this.CountryService.getById(id)
        .then((data) => {
          this.countryEntity = data;
          if (data['IsActive'] == 0) {
            this.countryEntity.IsActive = false;
          } else {
            this.countryEntity.IsActive = true;
          }
          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
    else {
      this.countryEntity = {};
      this.countryEntity.CountryId = 0;
      this.countryEntity.IsActive = true;
    }
  }

  addUpdate(countryForm) {
    debugger
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (this.countryEntity.IsActive == true) {
        this.countryEntity.IsActive = true;
      } else {
        this.countryEntity.IsActive = false;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }

    if (countryForm.valid) {
      this.countryEntity.UserId = this.globals.authData.UserId;
     this.btn_disable = true;
      this.globals.isLoading = true;
      this.CountryService.addUpdate(this.countryEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.countryEntity = {};
          countryForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.country.form.alerts.update.type,
              title: this.globals.adminTranslationText.country.form.alerts.update.title,
              text: this.globals.adminTranslationText.country.form.alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            swal({
              type: this.globals.adminTranslationText.country.form.alerts.add.type,
              title: this.globals.adminTranslationText.country.form.alerts.add.title,
              text: this.globals.adminTranslationText.country.form.alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            })
          }
          this.router.navigate(['/admin/country/list']);
        },
          (error) => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            if (error.status == 302) {
              swal({
                type: this.globals.adminTranslationText.country.form.alerts.duplicateAbbreviation.type,
                title: this.globals.adminTranslationText.country.form.alerts.duplicateAbbreviation.title,
                text: this.globals.adminTranslationText.country.form.alerts.duplicateAbbreviation.text,
                showConfirmButton: false,
                timer: 4000
              })
            } else {
              if(error.error.code == 422)
              {
                this.errorEntity.CountryName = (error.error.message.CountryName != "") ? error.error.message.CountryName : '';
                this.errorEntity.CountryAbbreviation = (error.error.message.CountryAbbreviation != "") ? error.error.message.CountryAbbreviation : '';
                this.errorEntity.PhonePrefix = (error.error.message.PhonePrefix != "") ? error.error.message.PhonePrefix : '';
              }
              else
              {
                this.globals.pageNotfound(error.error.code);
              }
            }
          });
    }
  }

}
