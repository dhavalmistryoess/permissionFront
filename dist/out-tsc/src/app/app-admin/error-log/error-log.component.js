import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuditLogService } from '../../services/audit-log.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var ErrorLogComponent = /** @class */ (function () {
    function ErrorLogComponent(globals, router, route, AuditLogService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.AuditLogService = AuditLogService;
        this.sort = [{
                field: 'time',
                dir: 'desc'
            }];
    }
    ErrorLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–ErrorLogs–' + todaysdate;
        setTimeout(function () {
            $(document).ready(function () {
                var body = document.querySelector('body');
                body.style.setProperty('--screen-height', $(window).height() + "px");
            });
            new PerfectScrollbar('.content_height');
        }, 100);
        this.errorList = [];
        this.globals.isLoading = true;
        this.AuditLogService.getErrorLog()
            .then(function (data) {
            // setTimeout(function () {
            //   var table = $('#dataTables-example').DataTable({
            //     // scrollY: '55vh',
            //     scrollCollapse: true,
            //     "oLanguage": {
            //       "sLengthMenu": "_MENU_ Error Logs per page",
            //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Error logs",
            //       "sInfoFiltered": "(filtered fromLogin Log _MAX_ total Error logs)",
            //       "sInfoEmpty": "Showing 0 to 0 of 0 Error logs"
            //     },
            //     dom: 'lBfrtip',
            //     buttons: [
            //       {
            //         extend: 'excel',
            //         title: 'MOE – Error Logs – ' + todaysdate,
            //         filename: 'MOE–ErrorLogs–' + todaysdate,
            //         customize: function (xlsx) {
            //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
            //           source.setAttribute('name', 'MOE – Error Logs');
            //         },
            //         exportOptions: {
            //           columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            //         }
            //       },
            //       {
            //         extend: 'print',
            //         title: 'MOE – Error Logs – ' + todaysdate,
            //         exportOptions: {
            //           columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
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
            // this.errorList = data;
            // this.globals.isLoading = false;
            _this.gridData = data;
            _this.errorList = data;
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
    ErrorLogComponent.prototype.onFilter = function (inputValue) {
        this.errorList = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'errno',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'errtype',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'errstr',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'errfile',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'errline',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'user_agent',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'ip_address',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'time',
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
    ], ErrorLogComponent.prototype, "dataBinding", void 0);
    ErrorLogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-error-log',
            templateUrl: './error-log.component.html',
            styleUrls: ['./error-log.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, AuditLogService])
    ], ErrorLogComponent);
    return ErrorLogComponent;
}());
export { ErrorLogComponent };
//# sourceMappingURL=error-log.component.js.map