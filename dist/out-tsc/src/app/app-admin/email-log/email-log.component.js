import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuditLogService } from '../../services/audit-log.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var EmailLogComponent = /** @class */ (function () {
    function EmailLogComponent(globals, router, route, AuditLogService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.AuditLogService = AuditLogService;
        this.sort = [{
                field: 'CreatedOn',
                dir: 'desc'
            }];
    }
    EmailLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–EmailLogs–' + todaysdate;
        setTimeout(function () {
            $(document).ready(function () {
                var body = document.querySelector('body');
                body.style.setProperty('--screen-height', $(window).height() + "px");
            });
            new PerfectScrollbar('.content_height');
        }, 100);
        this.emailList = [];
        this.globals.isLoading = true;
        this.AuditLogService.getEmailLog()
            .then(function (data) {
            // setTimeout(function () {
            //   var table = $('#dataTables-example').DataTable({
            //     scrollCollapse: true,
            //     "oLanguage": {
            //       "sLengthMenu": "_MENU_ Email Logs per page",
            //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Email Logs",
            //       "sInfoFiltered": "(filtered fromLogin Log _MAX_ total Email Logs)",
            //       "sInfoEmpty": "Showing 0 to 0 of 0 Email Logs"
            //     },
            //     dom: 'lBfrtip',
            //     buttons: [
            //       {
            //         extend: 'excel',
            //         title: 'MOE – Email Logs – ' + todaysdate,
            //         filename: 'MOE–EmailLogs–' + todaysdate,
            //         customize: function (xlsx) {
            //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
            //           source.setAttribute('name', 'MOE – Email Logs');
            //         },
            //         exportOptions: {
            //           columns: [0, 1, 2, 3, 4]
            //         }
            //       },
            //       {
            //         extend: 'print',
            //         title: 'MOE – Email Logs – ' + todaysdate,
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
            // this.emailList = data;
            // this.globals.isLoading = false;
            _this.gridData = data;
            _this.emailList = data;
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            // this.router.navigate(['/pagenotfound']);
            _this.globals.pageNotfound(error.error.code);
        });
    };
    EmailLogComponent.prototype.onFilter = function (inputValue) {
        this.emailList = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'From',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'To',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'Subject',
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
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], EmailLogComponent.prototype, "dataBinding", void 0);
    EmailLogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-email-log',
            templateUrl: './email-log.component.html',
            styleUrls: ['./email-log.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, AuditLogService])
    ], EmailLogComponent);
    return EmailLogComponent;
}());
export { EmailLogComponent };
//# sourceMappingURL=email-log.component.js.map