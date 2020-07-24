import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DashboardService } from '../services/dashboard.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, Tooltip, swal: any, google, map: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  defaultDashboardEntity;
  attendanceSheetList;
  calendarDetailsList;
  monthlyProctoringList;
  yearsList;
  changePresentStatusEntity;
  finalFeedbackEntity;
  resumeAssessmentEntity;
  stopAssessmentEntity;
  documentVerificationEntity;
  mandatoryDocumentsList;
  optionalDocumentsList;
  commentDisplay;
  submitted1;
  submitted2;
  submitted3;
  submitted4;
  submitted5;
  currentDate;
  chartArr = {
    data: [],
    selectedYear: '',
    selectedQuarter: 'all',
  };
  auto;

  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private DashboardService: DashboardService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public mySelection: string[] = [];

  public sort: SortDescriptor[] = [{
    field: 'StartTime',
    dir: 'asc'
  }];

  ngOnInit() {
    this.globals.isLoading = false;
    this.defaultDashboardEntity = {};
    this.attendanceSheetList = [];
    this.calendarDetailsList = [];
    this.monthlyProctoringList = {};
    this.changePresentStatusEntity = {};
    this.finalFeedbackEntity = {};
    this.resumeAssessmentEntity = {};
    this.stopAssessmentEntity = {};
    this.yearsList = [];
    this.mandatoryDocumentsList = [];
    this.optionalDocumentsList = [];
    this.documentVerificationEntity = {};
    this.currentDate = new Date();
    
  }

 
}

