import * as tslib_1 from "tslib";
import { Component, ViewChild } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../services/dashboard.service";
import { ManageRegisterRequestService } from "../services/manage-register-request.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
var AdminDashboardComponent = /** @class */ (function () {
    function AdminDashboardComponent(router, globals, route, DashboardService, ManageRegisterRequestService) {
        this.router = router;
        this.globals = globals;
        this.route = route;
        this.DashboardService = DashboardService;
        this.ManageRegisterRequestService = ManageRegisterRequestService;
        this.mySelection = [];
        this.sort = [
            {
                field: "StartTime",
                dir: "asc"
            }
        ];
        this.paymentChartArr = {
            paymentdata: [],
            selectedPaymentYear: "",
            selectedPaymentQuarter: "all"
        };
        this.assessmentChartArr = {
            assessmentdata: [],
            selectedAssessmentYear: "",
            selectedAssessmentQuarter: "all"
        };
        this.sellingCetificatesArr = {
            data: [],
            selectedYear: "",
            selectedQuarter: "all"
        };
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = true;
        this.dashboardEntity = {};
        this.RegisteredUsersList = [];
        this.paymentyearList = [];
        this.paymentdataList = {};
        this.sellingCertificatesyearsList = [];
        this.sellingCertificates = {};
        this.register1 = {};
        //get all admin dashboard details
        this.DashboardService.getAllDetails().then(function (data) {
            _this.globals.isLoading = false;
            _this.dashboardEntity = data;
            _this.gridData = _this.dashboardEntity.todaysExamination;
            for (var i = 0; i < _this.dashboardEntity.todaysExamination.length; i++) {
                var hour1 = _this.dashboardEntity.todaysExamination[i].StartTime.split(":")[0];
                var min = _this.dashboardEntity.todaysExamination[i].StartTime.split(":")[1];
                var part = hour1 > 12 ? "pm" : "am";
                min = (min + "").length == 1 ? "0" + min : min;
                hour1 = hour1 > 12 ? hour1 - 12 : hour1;
                hour1 = (hour1 + "").length == 1 ? "0" + hour1 : hour1;
                _this.dashboardEntity.todaysExamination[i].startTime =
                    hour1 + ":" + min + part;
                var hour2 = _this.dashboardEntity.todaysExamination[i].EndTime.split(":")[0];
                var min2 = _this.dashboardEntity.todaysExamination[i].EndTime.split(":")[1];
                var part2 = hour2 > 12 ? "pm" : "am";
                min2 = (min2 + "").length == 1 ? "0" + min2 : min2;
                hour2 = hour2 > 12 ? hour2 - 12 : hour2;
                hour2 = (hour2 + "").length == 1 ? "0" + hour2 : hour2;
                _this.dashboardEntity.todaysExamination[i].endTime =
                    hour2 + ":" + min2 + part;
            }
            _this.paymentyearList = _this.dashboardEntity.paymentyear;
            _this.paymentyearList.reverse();
            _this.paymentChartArr.selectedPaymentYear = _this.paymentyearList[0];
            _this.assessmentyearList = _this.dashboardEntity.assessmentyear;
            _this.assessmentyearList.reverse();
            _this.assessmentChartArr.selectedAssessmentYear = _this.assessmentyearList[0];
            _this.sellingCertificatesyearsList = _this.paymentyearList; //same year beacuse selling and payment year in one tbl
            //this.sellingCertificatesyearsList.reverse();
            _this.sellingCetificatesArr.selectedYear = _this.sellingCertificatesyearsList[0];
            setTimeout(function () {
                _this.showWithoutProctoringDetails();
                $("select").selectpicker();
            }, 1000);
            console.log(data);
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   //position: 'top-end',
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            // this.router.navigate(['/pagenotfound']);
            _this.globals.pageNotfound(error.error.code);
        });
        // am4core.ready(function () {
        //   var chart = am4core.create("payment_proctor_chart", am4charts.XYChart);
        //   //chart.scrollbarX = new am4core.Scrollbar();
        //   // Add data
        //   chart.data = [{
        //     "month": "January",
        //     "value": 2000
        //   }, {
        //     "month": "February",
        //     "value": 1200
        //   }, {
        //     "month": "March",
        //     "value": 800
        //   }];
        //   // Create axes
        //   var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        //   categoryAxis.dataFields.category = "month";
        //   categoryAxis.renderer.grid.template.location = 0;
        //   categoryAxis.renderer.minGridDistance = 30;
        //   // categoryAxis.renderer.labels.template.horizontalCenter = "right";
        //   // categoryAxis.renderer.labels.template.verticalCenter = "middle";
        //   // categoryAxis.renderer.labels.template.rotation = 270;
        //   categoryAxis.tooltip.disabled = true;
        //   // categoryAxis.renderer.minHeight = 110;
        //   var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        //   valueAxis.renderer.minWidth = 50;
        //   // Create series
        //   var series = chart.series.push(new am4charts.ColumnSeries());
        //   series.sequencedInterpolation = true;
        //   series.dataFields.valueY = "value";
        //   series.dataFields.categoryX = "month";
        //   series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        //   series.columns.template.strokeWidth = 0;
        //   series.tooltip.pointerOrientation = "vertical";
        //   series.columns.template.column.cornerRadiusTopLeft = 10;
        //   series.columns.template.column.cornerRadiusTopRight = 10;
        //   series.columns.template.column.fillOpacity = 0.8;
        //   // on hover, make corner radiuses bigger
        //   var hoverState = series.columns.template.column.states.create("hover");
        //   hoverState.properties.cornerRadiusTopLeft = 0;
        //   hoverState.properties.cornerRadiusTopRight = 0;
        //   hoverState.properties.fillOpacity = 1;
        //   series.columns.template.adapter.add("fill", function (fill, target) {
        //     return chart.colors.getIndex(target.dataItem.index);
        //   });
        //   // Cursor
        //   chart.cursor = new am4charts.XYCursor();
        // });
        // am4core.ready(function () {
        //   var chart = am4core.create("assessment_proctor_chart", am4charts.XYChart);
        //   var data = [{
        //     "month": "January",
        //     "value": 20
        //   }, {
        //     "month": "February",
        //     "value": 12
        //   }, {
        //     "month": "March",
        //     "value": 8
        //   }];
        //   /* Create axes */
        //   var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        //   categoryAxis.dataFields.category = "month";
        //   categoryAxis.renderer.minGridDistance = 30;
        //   categoryAxis.renderer.grid.template.location = 0;
        //   /* Create value axis */
        //   var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        //   valueAxis.renderer.minWidth = 50;
        //   var lineSeries = chart.series.push(new am4charts.LineSeries());
        //   lineSeries.name = "Assessment";
        //   lineSeries.dataFields.valueY = "value";
        //   lineSeries.dataFields.categoryX = "month";
        //   lineSeries.stroke = am4core.color("#0061AF");
        //   lineSeries.strokeWidth = 2;
        //   lineSeries.propertyFields.strokeDasharray = "lineDash";
        //   lineSeries.tooltip.label.textAlign = "middle";
        //   var bullet = lineSeries.bullets.push(new am4charts.Bullet());
        //   bullet.fill = am4core.color("#0061AF");
        //   bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
        //   var circle = bullet.createChild(am4core.Circle);
        //   circle.radius = 4;
        //   circle.fill = am4core.color("#fff");
        //   circle.strokeWidth = 3;
        //   chart.data = data;
        // });
        setTimeout(function () {
            // new PerfectScrollbar('.height_assign_doc');
            new PerfectScrollbar(".height_payment_user");
        }, 1500);
    };
    //redirect to assign page
    AdminDashboardComponent.prototype.assignAssessment = function (id) {
        this.router.navigate(["/admin/assignAssessment/" + window.btoa(id)]);
    };
    //redirect to usercertificte detail page for document verification
    AdminDashboardComponent.prototype.userCertificateDetail = function (id) {
        this.router.navigate([
            "/admin/userCertificateDetail/" +
                window.btoa(id) +
                "/" +
                window.btoa("pendingverification")
        ]);
    };
    //show without proctor deatils
    AdminDashboardComponent.prototype.showWithoutProctoringDetails = function () {
        debugger;
        if ($("#show_data").prop("checked") == true) {
            this.RegisteredUsersList = this.dashboardEntity.withoutProctorRegisteredUsers;
            this.paymentdataList = this.dashboardEntity.WithoutProctorMonthlyPayment;
            this.assessmentdataList = this.dashboardEntity.WithoutProctorAssessment;
            this.sellingCertificates = this.dashboardEntity.WithoutProctorSellingCertificates;
        }
        else {
            this.RegisteredUsersList = this.dashboardEntity.withProctorRegisteredUsers;
            //console.log(this.paymentyearList);
            this.paymentdataList = this.dashboardEntity.WithProctorMonthlyPayment;
            this.assessmentdataList = this.dashboardEntity.WithProctorAssessment;
            this.sellingCertificates = this.dashboardEntity.WithProctorSellingCertificates;
            // this.sellingCertificates = {
            //   "2019": {
            //     "firstQuarter": [
            //       {
            //         "name": "css",
            //         "count": "20",
            //         "year": "2019"
            //       }
            //     ],
            //     "secondQuarter": [],
            //     "thirdQuarter": [],
            //     "forthQuarter": []
            //     },
            //     "2020": {
            //       "firstQuarter": [
            //         {
            //           "name": "angular",
            //           "count": "30",
            //           "year": "2020"
            //         },
            //         {
            //           "name": "java",
            //           "count": "40",
            //           "year": "2020"
            //         },
            //       ],
            //       "secondQuarter": [
            //         {
            //           "name": "php",
            //           "count": "250",
            //           "year": "2020"
            //         },
            //         {
            //           "name": "html",
            //           "count": "60",
            //           "year": "2020"
            //           },],
            //       "thirdQuarter": [],
            //       "forthQuarter": []
            //       }
            // }
        }
        this.getpaymentQuarterData(this.paymentChartArr.selectedPaymentYear, "all");
        this.getassessmentQuarterData(this.assessmentChartArr.selectedAssessmentYear, "all");
        this.getSellingCertificatesQuarterData(this.sellingCetificatesArr.selectedYear, "all");
    };
    //redirect to user orderhistory page
    AdminDashboardComponent.prototype.userOrderHistory = function (id) {
        debugger;
        this.router.navigate(["/admin/userHistory/" + window.btoa(id)]);
    };
    //redirect to proctor dashboard page
    AdminDashboardComponent.prototype.dashboard = function (id) {
        debugger;
        this.router.navigate(["/proctorDashboard/" + window.btoa(id)]);
    };
    // user ban by admin
    AdminDashboardComponent.prototype.userBan = function (register) {
        var _this = this;
        debugger;
        swal({
            title: "Ban Candidate",
            text: "Are you sure want to ban candidate?",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                _this.register1.UpdatedBy = _this.globals.authData.UserId;
                _this.register1.UserId = register.UserId;
                _this.register1.IsBan = "1";
                _this.globals.isLoading = true;
                debugger;
                _this.ManageRegisterRequestService.isBanByadmin(_this.register1).then(function (data) {
                    _this.globals.isLoading = false;
                    register.IsBan = 1;
                    swal({
                        type: "success",
                        title: "Candidate Ban",
                        text: "Candidate Baned Successfully",
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    // swal({
                    //   //position: 'top-end',
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    // })
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    // user active by admin
    AdminDashboardComponent.prototype.userActive = function (register) {
        var _this = this;
        debugger;
        swal({
            title: "Activate Candidate",
            text: "Are you sure, you want to Activate the Candidate ?",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                _this.register1.UpdatedBy = _this.globals.authData.UserId;
                _this.register1.UserId = register.UserId;
                _this.register1.IsBan = "0";
                _this.globals.isLoading = true;
                debugger;
                _this.ManageRegisterRequestService.isBanByadmin(_this.register1).then(function (data) {
                    _this.globals.isLoading = false;
                    register.IsBan = 0;
                    swal({
                        type: "success",
                        title: "Candidate Active",
                        text: "Candidate Activeted Successfully",
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    // swal({
                    //   //position: 'top-end',
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    // })
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    //generate payment chart
    AdminDashboardComponent.prototype.generatePaymentChart = function () {
        console.log(this.paymentChartArr.paymentdata);
        if (this.paymentChartArr.paymentdata.length != 0) {
            var chart = am4core.create("payment_proctor_chart", am4charts.XYChart);
            //chart.scrollbarX = new am4core.Scrollbar();
            // Add data
            chart.data = this.paymentChartArr.paymentdata;
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "month";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            // categoryAxis.renderer.labels.template.horizontalCenter = "right";
            // categoryAxis.renderer.labels.template.verticalCenter = "middle";
            // categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            // categoryAxis.renderer.minHeight = 110;
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;
            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "value";
            series.dataFields.categoryX = "month";
            series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;
            // on hover, make corner radiuses bigger
            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });
            // Cursor
            chart.cursor = new am4charts.XYCursor();
        }
        else {
            $("#payment_proctor_chart").html("No record Found");
        }
    };
    //get payment quarter data
    AdminDashboardComponent.prototype.getpaymentQuarterData = function (year, quarterKey) {
        var data = [];
        if (this.paymentdataList.length != 0) {
            if (quarterKey != "all") {
                data = this.paymentdataList[year][quarterKey];
            }
            else {
                data = this.paymentdataList[year]["firstQuarter"].concat(this.paymentdataList[year]["secondQuarter"], this.paymentdataList[year]["thirdQuarter"], this.paymentdataList[year]["forthQuarter"]);
            }
        }
        this.paymentChartArr.paymentdata = data;
        this.paymentChartArr.selectedPaymentQuarter = quarterKey;
        this.generatePaymentChart();
    };
    AdminDashboardComponent.prototype.getpaymentYearlyData = function (e) {
        if (this.paymentdataList.length != 0) {
            var yearly = this.paymentdataList[e.target.value];
            this.paymentChartArr.selectedPaymentYear = e.target.value;
            this.paymentChartArr.paymentdata = yearly["firstQuarter"].concat(yearly["secondQuarter"], yearly["thirdQuarter"], yearly["forthQuarter"]);
            this.paymentChartArr.selectedPaymentQuarter = "all";
        }
        this.generatePaymentChart();
    };
    //generate assessment chart
    AdminDashboardComponent.prototype.generateAssessmentChart = function () {
        console.log(this.assessmentChartArr.assessmentdata);
        if (this.assessmentChartArr.assessmentdata.length != 0) {
            var chart = am4core.create("assessment_proctor_chart", am4charts.XYChart);
            var data = this.assessmentChartArr.assessmentdata;
            // var data = [{
            //   "month": "January",
            //   "value": 20
            // }, {
            //   "month": "February",
            //   "value": 12
            // }, {
            //   "month": "March",
            //   "value": 8
            // }];
            /* Create axes */
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "month";
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.grid.template.location = 0;
            /* Create value axis */
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;
            var lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.name = "Assessment";
            lineSeries.dataFields.valueY = "value";
            lineSeries.dataFields.categoryX = "month";
            lineSeries.stroke = am4core.color("#0061AF");
            lineSeries.strokeWidth = 2;
            lineSeries.propertyFields.strokeDasharray = "lineDash";
            lineSeries.tooltip.label.textAlign = "middle";
            var bullet = lineSeries.bullets.push(new am4charts.Bullet());
            bullet.fill = am4core.color("#0061AF");
            bullet.tooltipText =
                "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
            var circle = bullet.createChild(am4core.Circle);
            circle.radius = 4;
            circle.fill = am4core.color("#fff");
            circle.strokeWidth = 3;
            chart.data = data;
        }
        else {
            // todo
            $("#assessment_proctor_chart").html("No record Found");
        }
    };
    AdminDashboardComponent.prototype.getassessmentQuarterData = function (year, quarterKey) {
        var data = [];
        if (this.assessmentdataList.length != 0) {
            if (quarterKey != "all") {
                data = this.assessmentdataList[year][quarterKey];
            }
            else {
                data = this.assessmentdataList[year]["firstQuarter"].concat(this.assessmentdataList[year]["secondQuarter"], this.assessmentdataList[year]["thirdQuarter"], this.assessmentdataList[year]["forthQuarter"]);
            }
        }
        this.assessmentChartArr.assessmentdata = data;
        this.assessmentChartArr.selectedAssessmentQuarter = quarterKey;
        this.generateAssessmentChart();
    };
    AdminDashboardComponent.prototype.getassessmentYearlyData = function (e) {
        if (this.assessmentdataList.length != 0) {
            var yearly = this.assessmentdataList[e.target.value];
            this.assessmentChartArr.selectedAssessmentYear = e.target.value;
            this.assessmentChartArr.assessmentdata = yearly["firstQuarter"].concat(yearly["secondQuarter"], yearly["thirdQuarter"], yearly["forthQuarter"]);
            this.assessmentChartArr.selectedAssessmentQuarter = "all";
        }
        this.generateAssessmentChart();
    };
    //get quarterdata year wise for selling certificates
    AdminDashboardComponent.prototype.getSellingCertificatesQuarterData = function (year, quarterKey) {
        debugger;
        var data = [];
        if (this.sellingCertificates.length != 0) {
            if (quarterKey != "all") {
                data = this.sellingCertificates[year][quarterKey];
            }
            else {
                data = this.sellingCertificates[year]["firstQuarter"].concat(this.sellingCertificates[year]["secondQuarter"], this.sellingCertificates[year]["thirdQuarter"], this.sellingCertificates[year]["forthQuarter"]);
            }
        }
        this.sellingCetificatesArr.data = data;
        this.sellingCetificatesArr.selectedQuarter = quarterKey;
        this.sellingCertificatesGenerateDiv();
    };
    //get yearly data for selling certificates
    AdminDashboardComponent.prototype.getSellingCertificatesYearlyData = function (e) {
        debugger;
        if (this.sellingCertificates.length != 0) {
            var yearly = this.sellingCertificates[e.target.value];
            this.sellingCetificatesArr.selectedYear = e.target.value;
            this.sellingCetificatesArr.data = yearly["firstQuarter"].concat(yearly["secondQuarter"], yearly["thirdQuarter"], yearly["forthQuarter"]);
            this.sellingCetificatesArr.selectedQuarter = "all";
        }
        this.sellingCertificatesGenerateDiv();
    };
    //cerate div for selling certificate
    AdminDashboardComponent.prototype.sellingCertificatesGenerateDiv = function () {
        debugger;
        console.log(this.sellingCetificatesArr.data);
        var count;
        if (this.sellingCetificatesArr.data.length != 0) {
            $("#selling_certificate_block").html('<div class="total_title">' +
                this.globals.adminTranslationText.adminDashboard
                    .top5sellingCertificate.totalCount +
                '</div><div class="clearfix"></div>');
            for (var i = 0; i < this.sellingCetificatesArr.data.length; i++) {
                count = i + 1;
                $("#selling_certificate_block").append("<div class='certi_block'><div  class='icon'>" +
                    count +
                    "</div><div  class='name'>" +
                    this.sellingCetificatesArr.data[i].CertificateName +
                    "</div><div class='count'>" +
                    this.sellingCetificatesArr.data[i].count +
                    "</div></div>");
            }
        }
        else {
            $("#selling_certificate_block").html("No record Found");
        }
    };
    AdminDashboardComponent.prototype.onFilter = function (inputValue) {
        this.dashboardEntity.todaysExamination = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: "CountryName",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "StateName",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "City",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "Address1",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "AssignDate",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "StartTime",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "ProctorName",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "PhoneNumber",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "candidates",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "Value",
                        operator: "contains",
                        value: inputValue
                    }
                ]
            }
        }).data;
        this.dataBinding.skip = 0;
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], AdminDashboardComponent.prototype, "dataBinding", void 0);
    AdminDashboardComponent = tslib_1.__decorate([
        Component({
            selector: "app-admin-dashboard",
            templateUrl: "./admin-dashboard.component.html",
            styleUrls: ["./admin-dashboard.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            Globals,
            ActivatedRoute,
            DashboardService,
            ManageRegisterRequestService])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
}());
export { AdminDashboardComponent };
//# sourceMappingURL=admin-dashboard.component.js.map