import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
declare var $: any;

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrls: ['./assessment-report.component.css']
})
export class AssessmentReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    am4core.ready(function () {

      // Create chart instance
      var chart = am4core.create("assessment_report", am4charts.PieChart);

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "certificate";

      // Let's cut a hole in our Pie chart the size of 30% the radius
      chart.innerRadius = am4core.percent(30);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.slices.template
        // change the cursor on hover to make it apparent the object can be interacted with
        .cursorOverStyle = [
          {
            "property": "cursor",
            "value": "pointer"
          }
        ];

      pieSeries.labels.template.disabled = true;
      pieSeries.slices.template.tooltipText = "{certificate}: {value.value} assessments";

      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
      shadow.opacity = 0;

      // Create hover state
      var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.valueLabels.template.text = "{value.value}";

      chart.data = [{
        "certificate": "Certificate-1",
        "count": 9
      }, {
        "certificate": "Certificate-2",
        "count": 7
      }, {
        "certificate": "Certificate-3",
        "count": 12
      }, {
        "certificate": "Certificate-4",
        "count": 5
      }, {
        "certificate": "Certificate-5",
        "count": 3
      }, {
        "certificate": "Certificate-6",
        "count": 4
      }];

    }); // end am4core.ready()
  }

}
