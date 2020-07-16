import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserPendingVerificationService } from '../services/user-pending-verification.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SortDescriptor, process } from '@progress/kendo-data-query';
declare var $, swal: any;

@Component({
  selector: 'app-user-pending-verification',
  templateUrl: './user-pending-verification.component.html',
  styleUrls: ['./user-pending-verification.component.css']
})
export class UserPendingVerificationComponent implements OnInit {

  userPendingVerificationList;
  exportName;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute,
    private UserPendingVerificationService: UserPendingVerificationService, private CommonService: CommonService) { }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public sort: SortDescriptor[] = [{
    field: 'Name',
    dir: 'asc'
  }];

  ngOnInit() {
    this.globals.isLoading = true;
    // this.userPendingVerificationList=[];
    let todaysdate = this.globals.todaysdate;
    this.exportName = 'Assessment–DocumentVerification–' + todaysdate;
    this.UserPendingVerificationService.getAllPendingVerificationUserList()
      .then((data) => {
        // let todaysdate = this.globals.todaysdate;
        // setTimeout(function () {
        //   var table = $('#dataTables-example').DataTable({

        //     scrollCollapse: true,
        //     "oLanguage": {
        //       "sLengthMenu": "_MENU_ Document Verification request per page",
        //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Document Verification Request",
        //       "sInfoFiltered": "(filtered from _MAX_ total Document Verification Request)",
        //       "sInfoEmpty": "Showing 0 to 0 of 0 Document Verification Request"
        //     },
        //     "aoColumnDefs": [
        //       { 'bSortable': false, 'aTargets': [4] }
        //     ],
        //     dom: 'lBfrtip',
        //     buttons: [
        //       {
        //         extend: 'excel',
        //         title: 'Assessment – Document Verification – ' + todaysdate,
        //         filename: 'Assessment–DocumentVerification–' + todaysdate,

        //         customize: function (xlsx) {
        //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
        //           source.setAttribute('name', 'Assessment–DocumentVerification–');
        //         },
        //         exportOptions: {
        //           columns: [0, 1, 2, 3]
        //         }
        //       },
        //       {
        //         extend: 'print',
        //         title: 'Assessment – Document Verification – ' + todaysdate,
        //         exportOptions: {
        //           columns: [0, 1, 2, 3]
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
        // if (data) {
        //   this.userPendingVerificationList = data;
        // }
        // this.globals.isLoading = false;
        this.gridData = data;
        this.userPendingVerificationList = data;
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

  userCertificateDetail(id) {
    this.router.navigate(['/admin/userCertificateDetail/' + window.btoa(id) + '/' + window.btoa('pendingverification')]);
  }
  public onFilter(inputValue: string): void {
    this.userPendingVerificationList = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'CertificateName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'Name',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'RoleName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
