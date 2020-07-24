import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Globals } from "../globals";
import { NotificationService } from "../services/notification.service";
import { AuditLogService } from "../services/audit-log.service";
import { disableBindings } from "@angular/core/src/render3";
import { RegisterService } from "../services/register.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { SortDescriptor, process } from "@progress/kendo-data-query";
import { Modal } from "@amcharts/amcharts4/core";
declare var $: any, PerfectScrollbar, swal;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  db_mode;
  recentNotifications;
  PendingNotification = 0;
  registerEntity;
  certificateList;
  documentDetail;
  documentList;
  recentActivityLogs = [];
  recentErrorLogs = [];
  recentEmailLogs = [];
  btn_disable;
  reg_disable;
  currentDate = new Date();
  yesterdayDate = new Date();
  beforeWeekDate = new Date();
  UserId: any;
  UploadId;
  submitted;
  errorshow;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private elem: ElementRef,
    public globals: Globals,
    private NotificationService: NotificationService,
    private AuditLogService: AuditLogService,
    private RegisterService: RegisterService
  ) {}

  firstNameChar: any;
  lastNameChar: any;

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;

  public sort: SortDescriptor[] = [
    {
      field: "CertificateName",
      dir: "asc"
    }
  ];

  ngOnInit() {
    this.registerEntity = {};
    this.certificateList = [];
    this.documentList = [];
    this.recentNotifications = {};
    this.errorshow = false;

    $(document).ready(function() {
      const body = document.querySelector("body");
      body.style.setProperty("--screen-height", $(window).height() + "px");
    });

    setTimeout(function() {
      if ($(window).width() < 768) {
        $(".sidebar_wrap").removeClass("active_menu");
        $(".sidebar_wrap").removeClass("sidebar_scroll");

        $(".sidebar_wrap .sidebar_box .has_click").click(function() {
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

      $(".mobile_toggle").click(function() {
        $(".sidebar_wrap").toggleClass("close_toggle");
        $(".sidebar_wrap").toggleClass("active_menu");
        $(".sidebar_wrap").toggleClass("sidebar_scroll");
        $(".sidebar_wrap.sidebar_scroll .sidebar_box").animate(
          { scrollTop: 0 },
          "slow"
        );
      });
    }, 500);

    this.firstNameChar = this.globals.authData.FirstName.slice(0, 1);
    this.lastNameChar = this.globals.authData.LastName.slice(0, 1);

    this.yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.beforeWeekDate.setDate(this.currentDate.getDate() - 7);

    this.globals.isLoading = true;

    this.UserId = this.globals.authData.UserId;

    // this.NotificationService.getRecentNotifications(this.UserId).then(
    //   data => {
    //     debugger;
    //     this.recentNotifications = data;
    //     this.PendingNotification = this.recentNotifications.length;
    //   },
    //   error => {
    //     this.globals.isLoading = false;
    //     // swal({
    //     //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
    //     //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
    //     //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
    //     //   showConfirmButton: false,
    //     //   timer: 4000
    //     // })
    //   }
    // );

    this.AuditLogService.getRecentAuditLogs().then(
      data => {
        console.log(data);

        this.recentActivityLogs = data["RecentActivityLogs"];
        this.recentErrorLogs = data["RecentErrorLogs"];
        this.recentEmailLogs = data["RecentEmailLogs"];
        this.globals.isLoading = false;
      },
      error => {
        this.globals.isLoading = false;
        // swal({
        //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
        //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
        //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
        //   showConfirmButton: false,
        //   timer: 4000
        // })
      }
    );

    var item = {
      CertificateDocumentId: "",
      CertificateDocumentName: "",
      DocumentUrl: "/assests/Documents/"
    };

    this.documentDetail = [];
    this.documentDetail.push(item);
  }

  notificationshow() {
    this.PendingNotification = 0;
  }

  getCertificates(CertificateFor) {
    debugger;
    this.globals.isLoading = true;
    this.certificateList = [];

    this.RegisterService.getAllcertificate(
      this.globals.authData.UserId,
      CertificateFor
    ).then(
      data => {
        this.certificateList = data;
        if (this.certificateList.length == 0) {
          this.reg_disable = true;
        }
        this.gridData = [];
        $("#become_popup").modal("show");

        let todaysdate = this.globals.todaysdate;
        setTimeout(function() {
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

                customize: function(xlsx) {
                  var source = xlsx.xl["workbook.xml"].getElementsByTagName(
                    "sheet"
                  )[0];
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
        this.globals.isLoading = false;
      },
      error => {
        this.globals.isLoading = false;
        this.globals.pageNotfound(error.error.code);
      }
    );
  }
  logout() {
    this.globals.isLoading = true;
    var logoutEntity = { UserId: this.globals.authData.UserId };
    this.AuthService.logout(logoutEntity).then(
      data => {
        this.globals.isLoading = true;
        window.location.href = "";
      },
      error => {
        this.globals.isLoading = false;
        // swal({
        //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
        //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
        //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
        //   showConfirmButton: false,
        //   timer: 4000
        // })
        this.globals.pageNotfound(error.error.code);
      }
    );
  }

  clearNotification(notifications) {
    var clear = {
      NotificationId: notifications.NotificationId,
      Type: 2,
      UserId: this.globals.authData.UserId
    };
    this.NotificationService.clearDismissNotification(clear).then(
      data => {
        let index = this.recentNotifications.indexOf(notifications);
        if (index != -1) {
          this.recentNotifications.splice(index, 1);
        }
        this.PendingNotification = this.PendingNotification - 1;
      },
      error => {
        this.globals.isLoading = false;
        swal({
          type: this.globals.commonTranslationText.common.alerts.somethingWrong
            .type,
          title: this.globals.commonTranslationText.common.alerts.somethingWrong
            .title,
          text: this.globals.commonTranslationText.common.alerts.somethingWrong
            .text,
          showConfirmButton: false,
          timer: 4000
        });
      }
    );
  }

  clearAllNotification(notifications) {
    debugger;
    var clearAll = {
      NotificationId: 0,
      Type: 1,
      UserId: this.globals.authData.UserId
    };
    this.NotificationService.clearDismissNotification(clearAll).then(
      data => {
        this.recentNotifications = [];
        this.PendingNotification = 0;
      },
      error => {
        this.globals.isLoading = false;
        swal({
          type: this.globals.commonTranslationText.common.alerts.somethingWrong
            .type,
          title: this.globals.commonTranslationText.common.alerts.somethingWrong
            .title,
          text: this.globals.commonTranslationText.common.alerts.somethingWrong
            .text,
          showConfirmButton: false,
          timer: 4000
        });
      }
    );
  }
  logs_block() {
    $(".screen_menu").addClass("active");
    $("body").addClass("overflow_body");
  }
  close_log_block() {
    $(".screen_menu").removeClass("active");
    $("body").removeClass("overflow_body");
  }

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

  register(registerForm) {
    debugger;
    this.btn_disable = true;
    this.submitted = true;
    this.globals.isLoading = true;
    if (registerForm.valid) {
      this.submitted = false;
      this.registerEntity.UserId = this.globals.authData.UserId;
      this.registerEntity.LoginURL = "/login";
      let pusheditems = [];
      if (this.globals.authData.RoleId == 2) {
        this.registerEntity.RoleId = 4;
        this.registerEntity.CertificateFor = 0;
      } else {
        this.registerEntity.RoleId = 4;
        this.registerEntity.CertificateFor = 1;
      }
      for (var j = 0; j < this.certificateList.length; j++) {
        if (this.certificateList[j].Check == true) {
          this.certificateList[j].Check = true;
          pusheditems.push(this.certificateList[j].CertificateId);
        } else {
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
        this.RegisterService.Updateproctor(add).then(
          data => {
            debugger;
            console.log(data);
            swal({
              type: this.globals.commonTranslationText.registerPage.form.alerts
                .type,
              title: this.globals.commonTranslationText.registerPage.form.alerts
                .title,
              text: this.globals.commonTranslationText.registerPage.form.alerts
                .text,
              showConfirmButton: false,
              timer: 3000
            });
            $("#become_popup").modal("hide");
            this.globals.authData.RoleId = 4;
            if (this.registerEntity.CertificateFor == 1) {
              this.router.navigate(["/proctorDashboard"]);
            } else {
              this.router.navigate(["/dashboard"]);
            }

            this.globals.isLoading = false;
          },
          error => {
            this.globals.isLoading = false;
            this.btn_disable = false;
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            this.globals.pageNotfound(error.error.code);
          }
        );
      } else {
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
    } else {
      this.globals.isLoading = false;
      this.btn_disable = false;
    }
  }

  public onFilter(inputValue: string): void {
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
  }
}
