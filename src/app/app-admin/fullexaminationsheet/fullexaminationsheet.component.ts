import { Component, OnInit,ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, swal: any, PerfectScrollbar: any;

@Component({
  selector: 'app-fullexaminationsheet',
  templateUrl: './fullexaminationsheet.component.html',
  styleUrls: ['./fullexaminationsheet.component.css']
})
export class FullexaminationsheetComponent implements OnInit {

  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private DashboardService: DashboardService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public mySelection: string[] = [];

  public sort: SortDescriptor[] = [{
    field: 'StartTime',
    dir: 'asc'
  }];

  examinationSheetList;
  addressList;
  proctorList;
  candidateList;
  shiftFilterList;
  filterEntity;
  ngOnInit() {
    this.examinationSheetList = {};
    this.filterEntity = {};
    this.shiftFilterList = [];
    this.shiftFilterList = [
      { label: "Morning", value: "12:00:00" },
      { label: "Afternoon", value: "17:00:00" },
      { label: "Evening", value: "20:00:00" }
    ];
    this.DashboardService.getexaminationSheet()
      .then((data) => {
        this.globals.isLoading = false;
        this.gridData = data;
        this.examinationSheetList = data;
        for (let i = 0; i < this.examinationSheetList.length; i++) {
          let hour1 = (this.examinationSheetList[i].StartTime.split(':'))[0]
          let min = (this.examinationSheetList[i].StartTime.split(':'))[1]
          let part = hour1 > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          this.examinationSheetList[i].startTime = hour1 + ':' + min + part;

          let hour2 = (this.examinationSheetList[i].EndTime.split(':'))[0]
          let min2 = (this.examinationSheetList[i].EndTime.split(':'))[1]
          let part2 = hour2 > 12 ? 'pm' : 'am';
          min2 = (min2 + '').length == 1 ? `0${min2}` : min2;
          hour2 = hour2 > 12 ? hour2 - 12 : hour2;
          hour2 = (hour2 + '').length == 1 ? `0${hour2}` : hour2;
          this.examinationSheetList[i].endTime = hour2 + ':' + min2 + part;
        }
        console.log(data);
      },
        (error) => {
          this.globals.isLoading = false;
          // swal({
          //   //position: 'top-end',
          //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
          //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
          //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
          //   showConfirmButton: false,
          //   timer: 4000
          // })
          // this.router.navigate(['/pagenotfound']);
            this.globals.pageNotfound(error.error.code);
        });

    this.DashboardService.getFilterDefaultData()
      .then((data) => {
        this.globals.isLoading = false;
        this.addressList = data['Addresses'];
        this.proctorList = data['Proctors'];
        //this.candidateList = data['Candidates'];
        console.log(data);
      },
        (error) => {
          this.globals.isLoading = false;
          // swal({
          //   //position: 'top-end',
          //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
          //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
          //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
          //   showConfirmButton: false,
          //   timer: 4000
          // })
          // this.router.navigate(['/pagenotfound']);
            this.globals.pageNotfound(error.error.code);
        });
  }

  
  SearchFilter(SearchFilterForm) {
    debugger
    if (this.filterEntity.AssignDate != '' && this.filterEntity.AssignDate != undefined) {
      var d = new Date(this.filterEntity.AssignDate);
      var ValidFromMonth = d.getMonth() + 1;
      var ValidFromDate = d.getDate();
      var ValidFromYear = d.getFullYear();
      this.filterEntity.AssignDate = ValidFromYear + '-' + (ValidFromMonth < 10 ? '0' + ValidFromMonth : '' + ValidFromMonth) + '-' + ((ValidFromDate < 10 ? '0' + ValidFromDate : '' + ValidFromDate));
    }

    this.filterEntity.RoleId = this.globals.authData.RoleId;
    console.log(this.filterEntity);
    this.globals.isLoading = true;
    this.examinationSheetList = [];
    let todaysdate = this.globals.todaysdate;
    this.DashboardService.filterProctorDetails(this.filterEntity)
      .then((data) => {
        this.globals.isLoading = false;
        this.examinationSheetList = data;
        this.gridData = data;
        console.log(this.examinationSheetList);
        this.filterEntity = {};
        SearchFilterForm.form.markAsPristine();

        for (let i = 0; i < this.examinationSheetList.length; i++) {
          let hour1 = (this.examinationSheetList[i].StartTime.split(':'))[0]
          let min = (this.examinationSheetList[i].StartTime.split(':'))[1]
          let part = hour1 > 12 ? 'pm' : 'am';
          min = (min + '').length == 1 ? `0${min}` : min;
          hour1 = hour1 > 12 ? hour1 - 12 : hour1;
          hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
          this.examinationSheetList[i].startTime = hour1 + ':' + min + part;

          let hour2 = (this.examinationSheetList[i].EndTime.split(':'))[0]
          let min2 = (this.examinationSheetList[i].EndTime.split(':'))[1]
          let part2 = hour2 > 12 ? 'pm' : 'am';
          min2 = (min2 + '').length == 1 ? `0${min2}` : min2;
          hour2 = hour2 > 12 ? hour2 - 12 : hour2;
          hour2 = (hour2 + '').length == 1 ? `0${hour2}` : hour2;
          this.examinationSheetList[i].endTime = hour2 + ':' + min2 + part;
        }
      },
        (error) => {
          this.globals.isLoading = false;
          this.examinationSheetList = [];
          this.globals.pageNotfound(error.error.code);

        });
  }
  
  clearData(SearchFilterForm) {
    this.examinationSheetList = [];
    this.globals.isLoading = true;
      this.DashboardService.getexaminationSheet()
        //.map(res => res.json())
        .then((data) => {
          this.filterEntity = {};
          this.examinationSheetList = data;
          this.gridData = data;
          for (let i = 0; i < this.examinationSheetList.length; i++) {
            let hour1 = (this.examinationSheetList[i].StartTime.split(':'))[0]
            let min = (this.examinationSheetList[i].StartTime.split(':'))[1]
            let part = hour1 > 12 ? 'pm' : 'am';
            min = (min + '').length == 1 ? `0${min}` : min;
            hour1 = hour1 > 12 ? hour1 - 12 : hour1;
            hour1 = (hour1 + '').length == 1 ? `0${hour1}` : hour1;
            this.examinationSheetList[i].startTime = hour1 + ':' + min + part;

            let hour2 = (this.examinationSheetList[i].EndTime.split(':'))[0]
            let min2 = (this.examinationSheetList[i].EndTime.split(':'))[1]
            let part2 = hour2 > 12 ? 'pm' : 'am';
            min2 = (min2 + '').length == 1 ? `0${min2}` : min2;
            hour2 = hour2 > 12 ? hour2 - 12 : hour2;
            hour2 = (hour2 + '').length == 1 ? `0${hour2}` : hour2;
            this.examinationSheetList[i].endTime = hour2 + ':' + min2 + part;
          }
          this.globals.isLoading = false;
          // SearchFilterForm.form.markAsPristine();
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    } 

    public onFilter(inputValue: string): void {
      this.examinationSheetList = process(this.gridData, {
        filter: {
          logic: "or",
          filters: [
            {
              field: 'CountryName',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'StateName',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'City',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'Address1',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'AssignDate',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'StartTime',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'ProctorName',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'PhoneNumber',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'candidates',
              operator: 'contains',
              value: inputValue
            },
            {
              field: 'Value',
              operator: 'contains',
              value: inputValue
            }
          ],
        }
      }).data;
  
      this.dataBinding.skip = 0;
    }
  }

