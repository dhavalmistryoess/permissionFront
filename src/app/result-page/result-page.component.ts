import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ResultPageService } from '../services/result-page.service';
declare var $, swal: any;

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  resultEntity;
  TimeOfPracticeTest;
  PracticeTestStartDate;
  Certiname;
  summary;
  totaltimetaken;
  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private ResultPageService: ResultPageService) { }

  ngOnInit() {
    debugger
    this.resultEntity = {};
    this.Certiname = {};
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      id = window.atob(id);
      this.ResultPageService.getResultById(id)
        .then((data) => {
          let resultEntity;
          // this.resultEntity = data;
          this.resultEntity = data['result'];
          resultEntity = data['result'];
          this.summary = data['data'];
          this.Certiname = this.resultEntity[0];
          if(this.Certiname.TimeOfPracticeTest < 60)
          {
            this.totaltimetaken = this.Certiname.TimeOfPracticeTest + " mintues";
          }
          else{
            var s = this.Certiname.TimeOfPracticeTest*60;
            var hours = Math.floor(s/3600); //Get whole hours
            s -= hours*3600;
            var minutes = Math.floor(s/60); //Get remaining minutes
            s -= minutes*60;
            console.log(hours + ' '+ minutes);
            this.totaltimetaken = hours + " hours " + minutes + " mintues"
          }
          setTimeout(function () {
            // Create chart instance
            var chart = am4core.create("result_chart", am4charts.XYChart);
            // Add data
            chart.data = resultEntity;
            // chart.data = [{
            //   "category": "php",
            //   "score": 30
            // }, {
            //   "category": "CorePHP",
            //   "score":60

            // }];

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

            categoryAxis.renderer.labels.template.adapter.add("dx", (dx, target) => {
              return -target.maxRight / 2;
            })

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
            series.columns.template.column.fillOpacity = 0.8

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

          this.globals.isLoading = false;
        },
          (error) => {
            this.globals.isLoading = false;
            // if (error.text) {
            //   swal({
            //     //position: 'top-end',
            //     type: 'error',
            //     title: 'Oops...',
            //     text: "Something went wrong!"
            //   })
            // }
            this.globals.pageNotfound(error.error.code);
          });
    }

  }

}
