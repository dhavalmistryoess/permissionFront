import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuditLogService } from '../../services/audit-log.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, swal: any, Bloodhound: any;
declare function myInput(): any;

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  activityList;
  exportName;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private AuditLogService: AuditLogService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public sort: SortDescriptor[] = [{
    field: 'CreatedOn',
    dir: 'desc'
  }];
  auto;
  ngOnInit() {
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–AllItems–' + todaysdate;

    setTimeout(function () {

      $(document).ready(function () {
        const body = document.querySelector('body');
        body.style.setProperty('--screen-height', $(window).height() + "px");
      });
      new PerfectScrollbar('.content_height');

    }, 100);

    this.activityList = [];
    this.globals.isLoading = true;

    this.AuditLogService.getActivityLog()
      .then((data) => {
        debugger
        // setTimeout(function () {
        //   var table = $('#dataTables-example').DataTable({

        //     scrollCollapse: true,
        //     "oLanguage": {
        //       "sLengthMenu": "_MENU_ Activity Logs per page",
        //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Activity Logs",
        //       "sInfoFiltered": "(filtered fromLogin Log _MAX_ total Activity Logs)",
        //       "sInfoEmpty": "Showing 0 to 0 of 0 Activity Logs"
        //     },
        //     dom: 'lBfrtip',
        //     buttons: [
        //       {
        //         extend: 'excel',
        //         title: 'MOE – Activity Logs – ' + todaysdate,
        //         filename: 'MOE–ActivityLogs–' + todaysdate,

        //         customize: function (xlsx) {
        //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
        //           source.setAttribute('name', 'MOE – Activity Logs');
        //         },
        //         exportOptions: {
        //           columns: [0, 1, 2, 3, 4]
        //         }
        //       },
        //       {
        //         extend: 'print',
        //         title: 'MOE – Activity Logs – ' + todaysdate,
        //         exportOptions: {
        //           columns: [0, 1, 2, 3, 4]
        //         }
        //       },
        //     ]
        //   });
        //   $(".buttons-print").append("<i class='fa fa-print'></i>");
        //   $('.buttons-print').attr('title', 'Print');
        //   $('.buttons-print').attr('data-toggle', 'tooltip');
        //   $('.buttons-print').attr('data-placement', 'top');
        //   $(".buttons-excel").append("<i class='fa fa-file-excel-o'></i>");
        //   $('.buttons-excel').attr('title', 'Export to Excel');
        //   $('.buttons-excel').attr('data-toggle', 'tooltip');
        //   $('.buttons-excel').attr('data-placement', 'top');
        // }, 100);
        // setTimeout(function () {
        //   $('select').selectpicker();
        // }, 1000);
        // this.activityList = data;
        // console.log(this.activityList);

        // this.globals.isLoading = false;
        this.gridData = data;
        this.activityList = data;
        this.globals.isLoading = false;
      },
        (error) => {
          this.globals.isLoading = false;
          // swal({
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
  public onFilter(inputValue: string): void {
    this.activityList = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'UserName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'Module',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'Activity',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'CreatedOn',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
