import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../services/dashboard.service";
import { ManageRegisterRequestService } from "../services/manage-register-request.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { SortDescriptor, process } from "@progress/kendo-data-query";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
declare var $, swal: any, PerfectScrollbar: any;

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public globals: Globals,
    private route: ActivatedRoute,
    private DashboardService: DashboardService,
    private ManageRegisterRequestService: ManageRegisterRequestService
  ) {}

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public mySelection: string[] = [];

  public sort: SortDescriptor[] = [
    {
      field: "StartTime",
      dir: "asc"
    }
  ];

  dashboardEntity;
  RegisteredUsersList;
  register1;
  paymentyearList;
  paymentdataList;
  paymentChartArr = {
    paymentdata: [],
    selectedPaymentYear: "",
    selectedPaymentQuarter: "all"
  };
  assessmentyearList;
  assessmentdataList;
  assessmentChartArr = {
    assessmentdata: [],
    selectedAssessmentYear: "",
    selectedAssessmentQuarter: "all"
  };
  sellingCertificatesyearsList;
  sellingCertificates;
  sellingCetificatesArr = {
    data: [],
    selectedYear: "",
    selectedQuarter: "all"
  };
  ngOnInit() {
    this.globals.isLoading = false;
    this.dashboardEntity = {};
    this.RegisteredUsersList = [];
    this.paymentyearList = [];
    this.paymentdataList = {};
    this.sellingCertificatesyearsList = [];
    this.sellingCertificates = {};
    this.register1 = {};
    

    setTimeout(function() {
      // new PerfectScrollbar('.height_assign_doc');
      new PerfectScrollbar(".height_payment_user");
    }, 1500);
  }

 
}
