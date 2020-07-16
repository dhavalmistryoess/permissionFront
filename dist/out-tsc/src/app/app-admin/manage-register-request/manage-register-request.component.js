import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ManageRegisterRequestService } from '../services/manage-register-request.service';
import { CommonService } from '../services/common.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
var ManageRegisterRequestComponent = /** @class */ (function () {
    function ManageRegisterRequestComponent(globals, router, route, ManageRegisterRequestService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.ManageRegisterRequestService = ManageRegisterRequestService;
        this.CommonService = CommonService;
        this.sort = [{
                field: 'FirstName',
                dir: 'asc'
            }];
    }
    ManageRegisterRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = true;
        // this.registerRequestList = [];
        this.registerRequestEntity = {};
        this.register1 = {};
        this.registerRequestEntity.CertificateData = [];
        var todaysdate = this.globals.todaysdate;
        this.exportName = 'Assessment-Registered_UsersList–' + todaysdate;
        this.ManageRegisterRequestService.getAll()
            .then(function (data) {
            // let todaysdate = this.globals.todaysdate;
            // setTimeout(function () {
            //   var table = $('#dataTables-example').DataTable({
            //     // scrollY: '55vh',
            //     scrollCollapse: true,
            //     "oLanguage": {
            //       "sLengthMenu": "_MENU_ Registered Users per page",
            //       "sInfo": "Showing _START_ to _END_ of _TOTAL_ Registered Users",
            //       "sInfoFiltered": "(filtered from _MAX_ total Registered Users)",
            //       "sInfoEmpty": "Showing 0 to 0 of 0 Registered Users"
            //     },
            //     "aoColumnDefs": [
            //       { 'bSortable': false, 'aTargets': [6] }
            //     ],
            //     dom: 'lBfrtip',
            //     buttons: [
            //       {
            //         extend: 'excel',
            //         title: 'Assessment - Registered Users List – ' + todaysdate,
            //         filename: 'Assessment - Registered_UsersList–' + todaysdate,
            //         customize: function (xlsx) {
            //           var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
            //           source.setAttribute('name', 'Assessment – Registered Users List');
            //         },
            //         exportOptions: {
            //           columns: [0, 1, 2, 3, 4, 5]
            //         }
            //       },
            //       {
            //         extend: 'print',
            //         title: 'Assessment – Registered Users List – ' + todaysdate,
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
            // // this.globals.isLoading = true;
            // if (data) {
            //   debugger
            //   this.registerRequestList = data;
            //   console.log(this.registerRequestList);
            //   this.globals.isLoading = false;
            // }
            _this.gridData = data;
            _this.registerRequestList = data;
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
    ManageRegisterRequestComponent.prototype.dashboard = function (id) {
        debugger;
        this.router.navigate(['/proctorDashboard/' + window.btoa(id)]);
    };
    ManageRegisterRequestComponent.prototype.userCertificateDetail = function (id) {
        debugger;
        this.router.navigate(['/admin/userCertificateDetail/' + window.btoa(id) + '/' + window.btoa('registereduser')]);
    };
    ManageRegisterRequestComponent.prototype.userOrderHistory = function (id) {
        debugger;
        this.router.navigate(['/admin/userHistory/' + window.btoa(id)]);
    };
    ManageRegisterRequestComponent.prototype.viewModal = function (i) {
        this.registerRequestEntity = this.registerRequestList[i];
        console.log(this.registerRequestEntity);
    };
    ManageRegisterRequestComponent.prototype.userBan = function (register) {
        var _this = this;
        debugger;
        swal({
            title: "Ban User",
            text: "Are you sure want to ban user?",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                _this.register1.UpdatedBy = _this.globals.authData.UserId;
                _this.register1.UserId = register.UserId;
                _this.register1.IsBan = '1';
                _this.globals.isLoading = true;
                debugger;
                _this.ManageRegisterRequestService.isBanByadmin(_this.register1)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    register.IsBan = 1;
                    swal({
                        type: "success",
                        title: "User Ban",
                        text: "User Baned Successfully",
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    // swal({
                    //   //position: 'top-end',
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    // })
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    ManageRegisterRequestComponent.prototype.userActive = function (register) {
        var _this = this;
        debugger;
        swal({
            title: "Activate User",
            text: "Are you sure, you want to Activate the Candidate ?",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                _this.register1.UpdatedBy = _this.globals.authData.UserId;
                _this.register1.UserId = register.UserId;
                _this.register1.IsBan = '0';
                _this.globals.isLoading = true;
                debugger;
                _this.ManageRegisterRequestService.isBanByadmin(_this.register1)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    register.IsBan = 0;
                    swal({
                        type: "success",
                        title: "User Active",
                        text: "User Activeted Successfully",
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    // swal({
                    //   //position: 'top-end',
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    // })
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        });
    };
    ManageRegisterRequestComponent.prototype.isActiveChange = function (changeEntity, i) {
        var _this = this;
        debugger;
        //   console.log(e);
        //   console.log(e.target.checked);
        //   console.log(e.target.value);
        //  // $('#active_checkbox'+i).prop('checked', true).change();
        var text;
        if (changeEntity.IsActive == 1) {
            //$('#active_checkbox'+i).prop('checked', false).change();
            text = 'deactivate';
        }
        else {
            // $('#active_checkbox'+i).prop('checked', true).change();
            text = 'activate';
        }
        console.log(i);
        swal({
            title: " Candidate",
            text: "Are you sure, you want to " + text + " the Candidate ?",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                if (changeEntity.IsActive == 1) {
                    changeEntity.IsActive = 0;
                    $('#IsActive' + i).removeClass('k-widget k-switch k-switch-on');
                    $('#IsActive' + i).addClass('k-widget k-switch k-switch-off');
                }
                else {
                    changeEntity.IsActive = 1;
                    $('#IsActive' + i).removeClass('k-widget k-switch k-switch-off');
                    $('#IsActive' + i).addClass('k-widget k-switch k-switch-on');
                }
                _this.globals.isLoading = true;
                changeEntity.UpdatedBy = _this.globals.authData.UserId;
                changeEntity.Id = changeEntity.UserId;
                changeEntity.TableName = 'tblusers';
                changeEntity.FieldName = 'UserId';
                changeEntity.Module = 'User';
                changeEntity.ModuleId = 2;
                if (changeEntity.IsActive == 1) {
                    changeEntity.ActivityText = "Candidate Activated";
                }
                else {
                    changeEntity.ActivityText = "Candidate Deactivated";
                }
                _this.CommonService.isActiveChange(changeEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    if (changeEntity.IsActive == 0) {
                        swal({
                            //position: 'top-end',
                            type: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.deactiveSuccess.type,
                            title: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.deactiveSuccess.title,
                            text: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.deactiveSuccess.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        $('#active_checkbox' + i).prop('checked', false).change();
                    }
                    else {
                        swal({
                            //position: 'top-end',
                            type: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.activeSuccess.type,
                            title: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.activeSuccess.title,
                            text: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.activeSuccess.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        $('#active_checkbox' + i).prop('checked', true).change();
                    }
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
            else {
                if (changeEntity.IsActive == 1) {
                    changeEntity.IsActive = 1;
                    $('#IsActive' + i).removeClass('k-widget k-switch k-switch-off');
                    $('#IsActive' + i).addClass('k-widget k-switch k-switch-on');
                }
                else {
                    changeEntity.IsActive = 0;
                    $('#IsActive' + i).removeClass('k-widget k-switch k-switch-on');
                    $('#IsActive' + i).addClass('k-widget k-switch k-switch-off');
                }
            }
        });
        // swal({
        //   title: text + " Candidate",
        //   text: "Are you sure, you want to " + text + " the Candidate ?",
        //   icon: "warning",
        //   type: "warning",
        //   showCancelButton: true,
        //   confirmButtonColor: '#3085d6',
        //   cancelButtonColor: '#d33',
        //   confirmButtonText: 'Yes',
        //   cancelButtonText: "No"
        // })
        //   .then((result) => {
        //     if (result.value) {
        //       if (e.target.checked == true) {
        //         //this.itemList[i].IsActive = 0;
        //         changeEntity.IsActive = 1;
        //       } else {
        //         //this.itemList[i].IsActive = 1;
        //         changeEntity.IsActive = 0;
        //       }
        //       this.globals.isLoading = true;
        //       changeEntity.UpdatedBy = this.globals.authData.UserId;
        //       changeEntity.Id = changeEntity.UserId;
        //       changeEntity.TableName = 'tblusers';
        //       changeEntity.FieldName = 'UserId';
        //       changeEntity.Module = 'User';
        //       changeEntity.ModuleId = 2;
        //       if (changeEntity.IsActive == 1) {
        //         changeEntity.ActivityText = "Candidate Activated";
        //       }
        //       else {
        //         changeEntity.ActivityText = "Candidate Deactivated";
        //       }
        //       this.CommonService.isActiveChange(changeEntity)
        //         .then((data) => {
        //           this.globals.isLoading = false;
        //           if (changeEntity.IsActive == 0) {
        //             swal({
        //               //position: 'top-end',
        //               type: this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.deactiveSuccess.type,
        //               title: this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.deactiveSuccess.title,
        //               text: this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.deactiveSuccess.text,
        //               showConfirmButton: false,
        //               timer: 4000
        //             })
        //             $('#active_checkbox'+i).prop('checked', false).change();
        //           }
        //           else {
        //             swal({
        //               //position: 'top-end',
        //               type: this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.activeSuccess.type,
        //               title: this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.activeSuccess.title,
        //               text: this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.activeSuccess.text,
        //               showConfirmButton: false,
        //               timer: 4000
        //             })
        //             $('#active_checkbox'+i).prop('checked', true).change();
        //           }
        //         },
        //           (error) => {
        //             this.globals.isLoading = false;
        //           });
        //     }
        //     else {
        //       this.globals.isLoading = false;
        //       if (e.target.checked == true) {
        //         $('#active_checkbox'+i).prop('checked', false).change();
        //       }
        //       else{
        //         $('#active_checkbox'+i).prop('checked', true).change();
        //       }
        //     // for(var j=0;j<this.registerRequestList.length;j++)
        //     // {
        //     //   if(this.registerRequestList[j].UserId == changeEntity.UserId)
        //     //   {
        //     //     if (changeEntity.IsActive == 1) {
        //     //       //this.registerRequestList[j].IsActive = 1;
        //     //       $('#IsActive' + index).find(".k-switch-container").attr("aria-checked", true);
        //     //       $('#IsActive' + index).removeClass("k-switch-off").addClass("k-switch-on");
        //     //     }
        //     //     else {
        //     //       //this.registerRequestList[j].IsActive = 0;
        //     //       $('#IsActive' + index).prop("checked", false);
        //     //       $('#IsActive' + index).find(".k-switch-container").attr("aria-checked", false);
        //     //       $('#IsActive' + index).removeClass("k-switch-on").addClass("k-switch-off");
        //     //     }
        //     //   }
        //     // }
        //     }
        //   })
    };
    ManageRegisterRequestComponent.prototype.onFilter = function (inputValue) {
        this.registerRequestList = process(this.gridData, {
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
                    }
                ],
            }
        }).data;
        this.dataBinding.skip = 0;
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], ManageRegisterRequestComponent.prototype, "dataBinding", void 0);
    ManageRegisterRequestComponent = tslib_1.__decorate([
        Component({
            selector: 'app-manage-register-request',
            templateUrl: './manage-register-request.component.html',
            styleUrls: ['./manage-register-request.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, ManageRegisterRequestService, CommonService])
    ], ManageRegisterRequestComponent);
    return ManageRegisterRequestComponent;
}());
export { ManageRegisterRequestComponent };
//# sourceMappingURL=manage-register-request.component.js.map