import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
var DocumentVertificationRequestComponent = /** @class */ (function () {
    function DocumentVertificationRequestComponent(globals, router, route) {
        this.globals = globals;
        this.router = router;
        this.route = route;
    }
    DocumentVertificationRequestComponent.prototype.ngOnInit = function () {
        var todaysdate = this.globals.todaysdate;
        setTimeout(function () {
            var table = $('#dataTables-example').DataTable({
                //  scrollY: '55vh',
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.childRowImmediate,
                        type: ''
                    }
                },
                scrollCollapse: true,
                "oLanguage": {
                    "sLengthMenu": "_MENU_ Documents per page",
                    "sInfo": "Showing _START_ to _END_ of _TOTAL_ Documents",
                    "sInfoFiltered": "(filtered from _MAX_ total Documents)",
                    "sInfoEmpty": "Showing 0 to 0 of 0 Documents"
                },
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'excel',
                        title: 'Assessment – All Documents – ' + todaysdate,
                        filename: 'Assessment–AllDocuments–' + todaysdate,
                        customize: function (xlsx) {
                            var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
                            source.setAttribute('name', 'Assessment-AllDocuments');
                        },
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'print',
                        title: 'Assessment – All Documents – ' + todaysdate,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                ]
            });
            $(".buttons-print").append("<i class='fa fa-print'></i>");
            $('.buttons-print').attr('title', 'Print');
            $('.buttons-print').attr('data-toggle', 'tooltip');
            $('.buttons-print').attr('data-placement', 'top');
            $(".buttons-excel").append("<i class='fa fa-file-excel-o'></i>");
            $('.buttons-excel').attr('title', 'Export to Excel');
            $('.buttons-excel').attr('data-toggle', 'tooltip');
            $('.buttons-excel').attr('data-placement', 'top');
        }, 100);
        setTimeout(function () {
            $('select').selectpicker();
        }, 1000);
    };
    DocumentVertificationRequestComponent = tslib_1.__decorate([
        Component({
            selector: 'app-document-vertification-request',
            templateUrl: './document-vertification-request.component.html',
            styleUrls: ['./document-vertification-request.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute])
    ], DocumentVertificationRequestComponent);
    return DocumentVertificationRequestComponent;
}());
export { DocumentVertificationRequestComponent };
//# sourceMappingURL=document-vertification-request.component.js.map