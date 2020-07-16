import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InquireService } from '../../services/inquire.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var InquireListComponent = /** @class */ (function () {
    function InquireListComponent(globals, router, route, InquireService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.InquireService = InquireService;
        this.sort = [{
                field: 'FirstName',
                dir: 'asc'
            }];
    }
    InquireListComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment–AllItems–' + todaysdate;
        setTimeout(function () {
            $(document).ready(function () {
                var body = document.querySelector('body');
                body.style.setProperty('--screen-height', $(window).height() + "px");
            });
            new PerfectScrollbar('.content_height');
        }, 100);
        this.globals.isLoading = true;
        this.InquireService.getAll()
            .then(function (data) {
            debugger;
            // setTimeout(function () {
            //   var table = $('#dataTables-example').DataTable({
            //     scrollCollapse: true,
            //     "oLanguage": {
            //       "sLengthMenu": "_MENU_ Inquires per page",
            //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Inquires",
            //       "sInfoFiltered": "(filtered from _MAX_ total Inquires)",
            //       "sInfoEmpty": "Showing 0 to 0 of 0 Inquires"
            //     },
            //     aoColumnDefs: [{ "aTargets": [-1], "bSortable": false }],
            //     dom: 'lBfrtip',
            //     buttons: [
            //       {
            //         extend: 'excel',
            //         title: 'Assessment - Inquire List – ' + todaysdate,
            //         filename: 'AssessmentInquireList–' + todaysdate,
            //         customize: function (xlsx) {
            //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
            //           source.setAttribute('name', 'Assessment – Inquire List');
            //         },
            //         exportOptions: {
            //           columns: [0, 1, 2, 3, 4, 5]
            //         }
            //       },
            //       {
            //         extend: 'print',
            //         title: 'Assessment – Inquire List – ' + todaysdate,
            //         exportOptions: {
            //           columns: [0, 1, 2, 3, 4, 5]
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
            //   $('select').selectpicker();
            // }, 100);
            // this.inquireList = data;
            // console.log(data);
            // this.globals.isLoading = false;
            _this.gridData = data;
            _this.inquireList = data;
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
    InquireListComponent.prototype.onFilter = function (inputValue) {
        this.inquireList = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'FirstName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'LastName',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'EmailAddress',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'PhoneNumber',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'Message',
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
    ], InquireListComponent.prototype, "dataBinding", void 0);
    InquireListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-inquire-list',
            templateUrl: './inquire-list.component.html',
            styleUrls: ['./inquire-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute,
            InquireService])
    ], InquireListComponent);
    return InquireListComponent;
}());
export { InquireListComponent };
//# sourceMappingURL=inquire-list.component.js.map