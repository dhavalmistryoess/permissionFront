import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { AssessmentdetailService } from '../services/assessmentdetail.service';
var AssessmentDetailComponent = /** @class */ (function () {
    function AssessmentDetailComponent(globals, router, route, AssessmentdetailService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.AssessmentdetailService = AssessmentdetailService;
    }
    AssessmentDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.AssessmentPreviewList = [];
        this.ResultList = [];
        this.AssessmentEntity = {};
        this.globals.isLoading = true;
        var userAssessmentId = this.route.snapshot.paramMap.get('userAssessmentId');
        var hasProctor = this.route.snapshot.paramMap.get('hasproctor');
        this.hasproctor = this.route.snapshot.paramMap.get('hasproctor');
        this.UserAssessmentId = this.route.snapshot.paramMap.get('userAssessmentId');
        // var userAssessmentId = window.atob(this.route.snapshot.paramMap.get('userAssessmentId'));
        // this.UserAssessmentId = window.atob(this.route.snapshot.paramMap.get('userAssessmentId'));
        if (userAssessmentId) {
            userAssessmentId = window.atob(userAssessmentId);
            hasProctor = window.atob(hasProctor);
            this.AssessmentdetailService.getAssessmentDetails(userAssessmentId, hasProctor)
                .then(function (data) {
                debugger;
                _this.globals.isLoading = false;
                _this.AssessmentEntity = data['AssessmentDetails']['AssessmentDetails'][0];
                if (_this.AssessmentEntity.TimeOfAssessment < 60) {
                    _this.totaltimetaken = _this.AssessmentEntity.TimeOfAssessment + " mintues";
                }
                else {
                    var s = _this.AssessmentEntity.TimeOfAssessment * 60;
                    var hours = Math.floor(s / 3600); //Get whole hours
                    s -= hours * 3600;
                    var minutes = Math.floor(s / 60); //Get remaining minutes
                    s -= minutes * 60;
                    console.log(hours + ' ' + minutes);
                    _this.totaltimetaken = hours + " hours " + minutes + " mintues";
                }
                console.log(_this.AssessmentEntity);
                _this.summaryquestions = data['AssessmentDetails']['data'];
                _this.ResultList = data['AssessmentDetails']['result'];
                var ResultList = _this.ResultList;
                _this.AssessmentPreviewList = data['ResultPreview'];
                setTimeout(function () {
                    $('#pills-cat1-tab0').addClass('active');
                    $('#pills-cat10').addClass('active');
                    $('#pills-cat10').addClass('show');
                    // Create chart instance
                    var chart = am4core.create("result_chart", am4charts.XYChart);
                    // Add data
                    chart.data = ResultList;
                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.tooltip.disabled = true;
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.dataFields.category = "category";
                    categoryAxis.renderer.minGridDistance = 15;
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.renderer.grid.template.strokeDasharray = "0";
                    categoryAxis.renderer.labels.template.rotation = -90;
                    categoryAxis.renderer.labels.template.horizontalCenter = "left";
                    categoryAxis.renderer.labels.template.location = 0.5;
                    categoryAxis.renderer.inside = false;
                    categoryAxis.renderer.fontSize = 13;
                    categoryAxis.renderer.fontFamily = 'Signika';
                    categoryAxis.renderer.labels.template.wrap = true;
                    categoryAxis.renderer.labels.template.maxWidth = 120;
                    var label = chart.createChild(am4core.Label);
                    label.text = "Category";
                    label.fontSize = 13;
                    label.fontWeight = "bold";
                    label.align = "center";
                    categoryAxis.renderer.labels.template.adapter.add("dx", function (dx, target) {
                        return -target.maxRight / 2;
                    });
                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.tooltip.disabled = true;
                    valueAxis.renderer.ticks.template.disabled = true;
                    valueAxis.renderer.axisFills.template.disabled = true;
                    valueAxis.min = 0;
                    valueAxis.max = 100;
                    valueAxis.maxPrecision = 0;
                    valueAxis.fontSize = 13;
                    valueAxis.fontFamily = 'Signika';
                    valueAxis.title.text = "Average Score";
                    valueAxis.title.fontSize = 13;
                    valueAxis.title.fontWeight = "bold";
                    valueAxis.numberFormatter = new am4core.NumberFormatter();
                    valueAxis.numberFormatter.numberFormat = "#";
                    valueAxis.calculateTotals = true;
                    var series = chart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.categoryX = "category";
                    series.dataFields.valueY = "score";
                    series.numberFormatter = new am4core.NumberFormatter();
                    series.numberFormatter.numberFormat = "#.0";
                    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
                    series.tooltipHTML = "Category Average Score: <strong>{valueY.value}%</strong>";
                    series.columns.template.column.cornerRadiusTopLeft = 10;
                    series.columns.template.column.cornerRadiusTopRight = 10;
                    series.columns.template.column.fillOpacity = 0.8;
                    series.columns.template.strokeWidth = 0;
                    series.tooltip.pointerOrientation = "vertical";
                    series.tooltip.getFillFromObject = false;
                    series.tooltip.background.fill = am4core.color("rgba(255,255,255,0.4)");
                    series.tooltip.fontFamily = 'Signika';
                    series.tooltip.fontSize = 13;
                    series.tooltip.label.fill = am4core.color("#000");
                    series.sequencedInterpolation = true;
                    series.fillOpacity = 1;
                    series.strokeOpacity = 1;
                    series.columns.template.adapter.add("fill", function (fill, target) {
                        return chart.colors.getIndex(target.dataItem.index);
                    });
                    chart.cursor = new am4charts.XYCursor();
                    chart.cursor.lineY.strokeWidth = 0;
                    chart.cursor.lineY.strokeOpacity = 0;
                    chart.cursor.lineX.strokeWidth = 0;
                    chart.cursor.lineX.strokeOpacity = 0;
                    chart.cursor.lineX.disabled = true;
                    chart.cursor.lineY.disabled = true;
                }, 200);
            }, function (error) {
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                // this.globals.isLoading = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
        setTimeout(function () {
            new PerfectScrollbar('.category1');
            new PerfectScrollbar('.category2');
            new PerfectScrollbar('.category3');
        }, 500);
    };
    AssessmentDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-assessment-detail',
            templateUrl: './assessment-detail.component.html',
            styleUrls: ['./assessment-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, AssessmentdetailService])
    ], AssessmentDetailComponent);
    return AssessmentDetailComponent;
}());
export { AssessmentDetailComponent };
//# sourceMappingURL=assessment-detail.component.js.map