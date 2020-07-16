import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Globals } from "../globals";
import { NotificationService } from "../services/notification.service";
import { AuditLogService } from "../services/audit-log.service";
import { RegisterService } from "../services/register.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(AuthService, router, elem, globals, NotificationService, AuditLogService, RegisterService) {
        this.AuthService = AuthService;
        this.router = router;
        this.elem = elem;
        this.globals = globals;
        this.NotificationService = NotificationService;
        this.AuditLogService = AuditLogService;
        this.RegisterService = RegisterService;
        this.PendingNotification = 0;
        this.recentActivityLogs = [];
        this.recentErrorLogs = [];
        this.recentEmailLogs = [];
        this.currentDate = new Date();
        this.yesterdayDate = new Date();
        this.beforeWeekDate = new Date();
        this.sort = [
            {
                field: "CertificateName",
                dir: "asc"
            }
        ];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registerEntity = {};
        this.certificateList = [];
        this.documentList = [];
        this.recentNotifications = {};
        this.errorshow = false;
        $(document).ready(function () {
            var body = document.querySelector("body");
            body.style.setProperty("--screen-height", $(window).height() + "px");
        });
        setTimeout(function () {
            if ($(window).width() < 768) {
                $(".sidebar_wrap").removeClass("active_menu");
                $(".sidebar_wrap").removeClass("sidebar_scroll");
                $(".sidebar_wrap .sidebar_box .has_click").click(function () {
                    $(".sidebar_wrap").removeClass("active_menu");
                    $(".sidebar_wrap").removeClass("sidebar_scroll");
                    $(".sidebar_wrap").removeClass("close_toggle");
                });
            }
            // $('body').tooltip({
            //   selector: '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])',
            //   trigger: 'hover focus',
            //   container: 'body'
            // }).on('click mousedown mouseup focus', '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])', function () {
            //   $('[data-toggle="tooltip"], [title]:not([data-toggle="popover"])').tooltip('destroy');
            // });
            $(".mobile_toggle").click(function () {
                $(".sidebar_wrap").toggleClass("close_toggle");
                $(".sidebar_wrap").toggleClass("active_menu");
                $(".sidebar_wrap").toggleClass("sidebar_scroll");
                $(".sidebar_wrap.sidebar_scroll .sidebar_box").animate({ scrollTop: 0 }, "slow");
            });
        }, 500);
        this.firstNameChar = this.globals.authData.FirstName.slice(0, 1);
        this.lastNameChar = this.globals.authData.LastName.slice(0, 1);
        this.yesterdayDate.setDate(this.currentDate.getDate() - 1);
        this.beforeWeekDate.setDate(this.currentDate.getDate() - 7);
        this.globals.isLoading = true;
        this.UserId = this.globals.authData.UserId;
        this.NotificationService.getRecentNotifications(this.UserId).then(function (data) {
            debugger;
            _this.recentNotifications = data;
            _this.PendingNotification = _this.recentNotifications.length;
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
        });
        this.AuditLogService.getRecentAuditLogs().then(function (data) {
            console.log(data);
            _this.recentActivityLogs = data["RecentActivityLogs"];
            _this.recentErrorLogs = data["RecentErrorLogs"];
            _this.recentEmailLogs = data["RecentEmailLogs"];
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
        });
        var item = {
            CertificateDocumentId: "",
            CertificateDocumentName: "",
            DocumentUrl: "/assests/Documents/"
        };
        this.documentDetail = [];
        this.documentDetail.push(item);
    };
    HeaderComponent.prototype.notificationshow = function () {
        this.PendingNotification = 0;
    };
    HeaderComponent.prototype.getCertificates = function (CertificateFor) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        this.certificateList = [];
        this.RegisterService.getAllcertificate(this.globals.authData.UserId, CertificateFor).then(function (data) {
            _this.certificateList = data;
            if (_this.certificateList.length == 0) {
                _this.reg_disable = true;
            }
            _this.gridData = [];
            $("#become_popup").modal("show");
            var todaysdate = _this.globals.todaysdate;
            setTimeout(function () {
                var table = $("#list_tables1").DataTable({
                    // scrollY: '55vh',
                    destroy: true,
                    scrollCollapse: true,
                    oLanguage: {
                        sLengthMenu: "_MENU_ Certificates per page",
                        sInfo: "Showing _START_ to _END_ of _TOTAL_ Certificates",
                        sInfoFiltered: "(filtered from _MAX_ total Certificates)",
                        sInfoEmpty: "Showing 0 to 0 of 0 Certificates"
                    },
                    aoColumnDefs: [{ aTargets: [0], bSortable: false }],
                    dom: "lBfrtip",
                    buttons: [
                        {
                            extend: "excel",
                            title: "Assessment – All Certificates – " + todaysdate,
                            filename: "Assessment–AllCertificates–" + todaysdate,
                            customize: function (xlsx) {
                                var source = xlsx.xl["workbook.xml"].getElementsByTagName("sheet")[0];
                                source.setAttribute("name", "Assessment-AllCertificates");
                            },
                            exportOptions: {
                                columns: [1, 2, 3, 4]
                            }
                        },
                        {
                            extend: "print",
                            title: "Assessment – All Certificates – " + todaysdate,
                            exportOptions: {
                                columns: [1, 2, 3, 4]
                            }
                        }
                    ]
                });
                $(".buttons-print").append("<i class='fa fa-print'></i>");
                $(".buttons-print").attr("title", "Print");
                $(".buttons-print").attr("data-toggle", "tooltip");
                $(".buttons-print").attr("data-placement", "top");
                $(".buttons-excel").append("<i class='fa fa-file-excel-o'></i>");
                $(".buttons-excel").attr("title", "Export to Excel");
                $(".buttons-excel").attr("data-toggle", "tooltip");
                $(".buttons-excel").attr("data-placement", "top");
                $("select").selectpicker();
            }, 1000);
            _this.globals.isLoading = false;
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        this.globals.isLoading = true;
        var logoutEntity = { UserId: this.globals.authData.UserId };
        this.AuthService.logout(logoutEntity).then(function (data) {
            _this.globals.isLoading = true;
            window.location.href = "";
        }, function (error) {
            _this.globals.isLoading = false;
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            _this.globals.pageNotfound(error.error.code);
        });
    };
    HeaderComponent.prototype.clearNotification = function (notifications) {
        var _this = this;
        var clear = {
            NotificationId: notifications.NotificationId,
            Type: 2,
            UserId: this.globals.authData.UserId
        };
        this.NotificationService.clearDismissNotification(clear).then(function (data) {
            var index = _this.recentNotifications.indexOf(notifications);
            if (index != -1) {
                _this.recentNotifications.splice(index, 1);
            }
            _this.PendingNotification = _this.PendingNotification - 1;
        }, function (error) {
            _this.globals.isLoading = false;
            swal({
                type: _this.globals.commonTranslationText.common.alerts.somethingWrong
                    .type,
                title: _this.globals.commonTranslationText.common.alerts.somethingWrong
                    .title,
                text: _this.globals.commonTranslationText.common.alerts.somethingWrong
                    .text,
                showConfirmButton: false,
                timer: 4000
            });
        });
    };
    HeaderComponent.prototype.clearAllNotification = function (notifications) {
        var _this = this;
        debugger;
        var clearAll = {
            NotificationId: 0,
            Type: 1,
            UserId: this.globals.authData.UserId
        };
        this.NotificationService.clearDismissNotification(clearAll).then(function (data) {
            _this.recentNotifications = [];
            _this.PendingNotification = 0;
        }, function (error) {
            _this.globals.isLoading = false;
            swal({
                type: _this.globals.commonTranslationText.common.alerts.somethingWrong
                    .type,
                title: _this.globals.commonTranslationText.common.alerts.somethingWrong
                    .title,
                text: _this.globals.commonTranslationText.common.alerts.somethingWrong
                    .text,
                showConfirmButton: false,
                timer: 4000
            });
        });
    };
    HeaderComponent.prototype.logs_block = function () {
        $(".screen_menu").addClass("active");
        $("body").addClass("overflow_body");
    };
    HeaderComponent.prototype.close_log_block = function () {
        $(".screen_menu").removeClass("active");
        $("body").removeClass("overflow_body");
    };
    // documents(certificateId) {
    //   debugger
    //   this.documentList = [];
    //   this.RegisterService.getById(certificateId)
    //     .then((data) => {
    //       this.documentList = data;
    //       this.globals.isLoading = false;
    //       this.errorshow = false;
    //       console.log(this.documentList);
    //     },
    //       (error) => {
    //         this.globals.isLoading = false;
    //         if (error.text) {
    //           swal({
    //             //position: 'top-end',
    //             type: 'error',
    //             title: 'Oops...',
    //             text: "Something went wrong!"
    //           })
    //         }
    //       });
    // }
    HeaderComponent.prototype.register = function (registerForm) {
        var _this = this;
        debugger;
        this.btn_disable = true;
        this.submitted = true;
        this.globals.isLoading = true;
        if (registerForm.valid) {
            this.submitted = false;
            this.registerEntity.UserId = this.globals.authData.UserId;
            this.registerEntity.LoginURL = "/login";
            var pusheditems = [];
            if (this.globals.authData.RoleId == 2) {
                this.registerEntity.RoleId = 4;
                this.registerEntity.CertificateFor = 0;
            }
            else {
                this.registerEntity.RoleId = 4;
                this.registerEntity.CertificateFor = 1;
            }
            for (var j = 0; j < this.certificateList.length; j++) {
                if (this.certificateList[j].Check == true) {
                    this.certificateList[j].Check = true;
                    pusheditems.push(this.certificateList[j].CertificateId);
                }
                else {
                    this.certificateList[j].Check = false;
                }
            }
            if (pusheditems.length != 0) {
                var add = {
                    UserId: this.globals.authData.UserId,
                    EmailAddress: this.globals.authData.EmailAddress,
                    certificateList: pusheditems,
                    CertificateFor: this.registerEntity.CertificateFor,
                    RoleId: this.registerEntity.RoleId,
                    LoginURL: this.registerEntity.LoginURL
                };
                this.RegisterService.Updateproctor(add).then(function (data) {
                    debugger;
                    console.log(data);
                    swal({
                        type: _this.globals.commonTranslationText.registerPage.form.alerts
                            .type,
                        title: _this.globals.commonTranslationText.registerPage.form.alerts
                            .title,
                        text: _this.globals.commonTranslationText.registerPage.form.alerts
                            .text,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    $("#become_popup").modal("hide");
                    _this.globals.authData.RoleId = 4;
                    if (_this.registerEntity.CertificateFor == 1) {
                        _this.router.navigate(["/proctorDashboard"]);
                    }
                    else {
                        _this.router.navigate(["/dashboard"]);
                    }
                    _this.globals.isLoading = false;
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.btn_disable = false;
                    // swal({
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   showConfirmButton: false,
                    //   timer: 4000
                    // })
                    _this.globals.pageNotfound(error.error.code);
                });
            }
            else {
                this.globals.isLoading = false;
                this.btn_disable = false;
                swal({
                    type: this.globals.commonTranslationText.registerPage.form.alerts1
                        .type,
                    title: this.globals.commonTranslationText.registerPage.form.alerts1
                        .title,
                    text: this.globals.commonTranslationText.registerPage.form.alerts1
                        .text,
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        }
        else {
            this.globals.isLoading = false;
            this.btn_disable = false;
        }
    };
    HeaderComponent.prototype.onFilter = function (inputValue) {
        this.certificateList = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: "CertificateName",
                        operator: "contains",
                        value: inputValue
                    }
                ]
            }
        }).data;
        this.dataBinding.skip = 0;
    };
    tslib_1.__decorate([
        ViewChild(DataBindingDirective),
        tslib_1.__metadata("design:type", DataBindingDirective)
    ], HeaderComponent.prototype, "dataBinding", void 0);
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: "app-header",
            templateUrl: "./header.component.html",
            styleUrls: ["./header.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            Router,
            ElementRef,
            Globals,
            NotificationService,
            AuditLogService,
            RegisterService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map