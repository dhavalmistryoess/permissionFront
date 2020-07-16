import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, PerfectScrollbar, swal: any, Bloodhound: any;
declare function myInput(): any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notificationList;
  currentDate = new Date();
  yesterdayDate = new Date();
  beforeWeekDate = new Date();
  UserId: any;
  RoleId: any;
  isAdmin: any;
  exportName;
  p;
  auto;
  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private NotificationService: NotificationService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public sort: SortDescriptor[] = [{
    field: 'NotificationText',
    dir: 'asc'
  }];

  ngOnInit() {

    setTimeout(function () {

      $(document).ready(function () {
        const body = document.querySelector('body');
        body.style.setProperty('--screen-height', $(window).height() + "px");
      });
      new PerfectScrollbar('.content_height');

    }, 100);

    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–AllNotifications–' + todaysdate;
    this.yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.beforeWeekDate.setDate(this.currentDate.getDate() - 7);

    this.globals.isLoading = true;
    this.isAdmin = false;
    // if (this.globals.authData.RoleId == 1 || this.globals.authData.RoleId == 2) {
    //   this.isAdmin = true;
    // }
    // var notificationData= { 'UserId': this.globals.authData.UserId, 'RoleId': this.globals.authData.RoleId, 'isAdmin':this.isAdmin };
    this.UserId = this.globals.authData.UserId;

    this.NotificationService.getAllNotifications(this.globals.authData.UserId, this.globals.authData.RoleId)
      .then((data) => {

        // setTimeout(function () {
        //   var table = $('#dataTables-example').DataTable({
        //     // scrollY: '55vh',
        //     responsive: {
        //       details: {
        //         display: $.fn.dataTable.Responsive.display.childRowImmediate,
        //         type: ''
        //       }
        //     },
        //     aoColumnDefs: [{ "aTargets": [-1], "bSortable": false }],
        //     scrollCollapse: true,
        //     "oLanguage": {
        //       "sLengthMenu": "_MENU_ Notifications per page",
        //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Notifications",
        //       "sInfoFiltered": "(filtered from _MAX_ total Notifications)",
        //       "sInfoEmpty": "Showing 0 to 0 of 0 Notifications"
        //     },
        //     dom: 'lBfrtip',
        //     buttons: [
        //       {
        //         extend: 'excel',
        //         title: 'MOE – All Notifications – ' + todaysdate,
        //         filename: 'MOE–AllNotifications–' + todaysdate,

        //         customize: function (xlsx) {
        //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
        //           source.setAttribute('name', 'MOE–AllNotifications');
        //         },
        //         exportOptions: {
        //           columns: [0, 1, 2]
        //         }
        //       },
        //       {
        //         extend: 'print',
        //         title: 'MOE – All Notifications – ' + todaysdate,
        //         exportOptions: {
        //           columns: [0, 1, 2]
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

        // this.notificationList = data;
        // this.globals.isLoading = false;
        this.gridData = data;
        this.notificationList = data;
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
              this.globals.pageNotfound(error.error.code);
        });

  }

  dismissNotification(notifications) {

    var dismis = { 'NotificationId': notifications.NotificationId, 'Type': 3, 'UserId':this.globals.authData.UserId };
    this.globals.isLoading = true;
    this.NotificationService.clearDismissNotification(dismis)
      .then((data) => {
        // let index = this.notificationList.indexOf(notifications);
        // if (index != -1) {
        //   this.notificationList.splice(index, 1);
        // }
        var notificationList = [...this.notificationList];
              let index = notificationList.indexOf(notifications);
              if (index != -1) {
                notificationList.splice(index, 1);
              }
              this.notificationList = [...notificationList];
              this.gridData = this.notificationList;
        this.globals.isLoading = false;
        //$('#dataTables-example').dataTable().fnDeleteRow(index);
        swal({
          type: 'success',
          title: 'Notification Dismissed',
          showConfirmButton: false,
          timer: 2000
        })
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
              this.globals.pageNotfound(error.error.code);
        });
  }
  public onFilter(inputValue: string): void {
    this.notificationList = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'NotificationText',
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
