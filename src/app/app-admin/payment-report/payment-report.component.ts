import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
declare var $: any;

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    am4core.ready(function () {

      var chart = am4core.create("payment_report", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0;

      chart.legend = new am4charts.Legend();

      chart.data = [{
        "certificate": "Certificate-1",
        "count": 299
      }, {
        "certificate": "Certificate-2",
        "count": 350
      }, {
        "certificate": "Certificate-3",
        "count": 200
      }, {
        "certificate": "Certificate-4",
        "count": 311
      }, {
        "certificate": "Certificate-5",
        "count": 170
      }];

      var series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "count";
      series.dataFields.category = "certificate";
      series.labels.template.disabled = true;
      series.slices.template.tooltipText = "{certificate}: ${value.value}";

      chart.legend = new am4charts.Legend();
      chart.legend.valueLabels.template.text = "${value.value}";
    });

  }

}
