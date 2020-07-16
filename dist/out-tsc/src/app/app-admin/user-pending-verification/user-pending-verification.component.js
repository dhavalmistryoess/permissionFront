import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserPendingVerificationService } from '../services/user-pending-verification.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var UserPendingVerificationComponent = /** @class */ (function () {
    function UserPendingVerificationComponent(globals, router, route, UserPendingVerificationService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.UserPendingVerificationService = UserPendingVerificationService;
        this.CommonService = CommonService;
        this.sort = [{
                field: 'Name',
                dir: 'asc'
            }];
    }
    UserPendingVerificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = true;
        // this.userPendingVerificationList=[];
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–DocumentVerification–' + todaysdate;
        this.UserPendingVerificationService.getAllPendingVerificationUserList()
            .then(function (data) {
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
            _this.gridData = data;
            _this.userPendingVerificationList = data;
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            // if (error.text) {
            //   swal({
            //     //position: 'top-end',
            //     type: 'error',
            //     title: 'Oops...',
            //     text: "Something went wrong!"
            //   })
            // }
            _this.globals.pageNotfound(error.error.code);
        });
    };
    UserPendingVerificationComponent.prototype.userCertificateDetail = function (id) {
        this.router.navigate(['/admin/userCertificateDetail/' + window.btoa(id) + '/' + window.btoa('pendingverification')]);
    };
    UserPendingVerificationComponent.prototype.onFilter = function (inputValue) {
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
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], UserPendingVerificationComponent.prototype, "dataBinding", void 0);
    UserPendingVerificationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-pending-verification',
            templateUrl: './user-pending-verification.component.html',
            styleUrls: ['./user-pending-verification.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            UserPendingVerificationService, CommonService])
    ], UserPendingVerificationComponent);
    return UserPendingVerificationComponent;
}());
export { UserPendingVerificationComponent };
//# sourceMappingURL=user-pending-verification.component.js.map