import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserhistoryService } from '../services/userhistory.service';
var UserHistoryComponent = /** @class */ (function () {
    function UserHistoryComponent(globals, router, route, elem, UserhistoryService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.elem = elem;
        this.UserhistoryService = UserhistoryService;
        this.passwordEntity = {};
        this.oldnewsame = false;
        this.newconfsame = false;
    }
    UserHistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            // Add minus icon for collapse element which is open by default
            $(".collapse.show").each(function () {
                $(this).prev(".card-header").find(".plus_minus_acc").addClass("fa-minus").removeClass("fa-plus");
            });
            // Toggle plus minus icon on show hide of collapse element
            $(".collapse").on('show.bs.collapse', function () {
                $(this).prev(".card-header").find(".plus_minus_acc").removeClass("fa-plus").addClass("fa-minus");
            }).on('hide.bs.collapse', function () {
                $(this).prev(".card-header").find(".plus_minus_acc").removeClass("fa-minus").addClass("fa-plus");
            });
        }, 500);
        debugger;
        this.ReceiptEntity = {};
        this.InvoiceEntity = {};
        this.FilterEntity = {};
        this.orderHistorylist = [];
        this.Candidatelist = [];
        this.Certificatelist = [];
        this.Statuslist = [];
        //var id : any;
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.id = window.atob(this.id);
        }
        else {
            this.id = 0;
        }
        this.FilterEntity.statusid = null;
        this.FilterEntity.CertificateId = null;
        this.FilterEntity.UserId = null;
        this.FilterEntity.OrderId = null;
        this.UserhistoryService.getAllDefault(this.id)
            .then(function (data) {
            debugger;
            _this.globals.isLoading = false;
            _this.orderHistorylist = data['orderHistory'];
            _this.Statuslist = _this.Statuslist.concat(data['Configuration']);
            _this.Candidatelist = _this.Candidatelist.concat(data['Candidatename']);
            _this.Certificatelist = _this.Certificatelist.concat(data['Certificates']);
            _this.assessmentExpirationDate = '';
            for (var i = 0; i < _this.orderHistorylist.length; i++) {
                if (_this.orderHistorylist[i].CertificationEndDate == null) {
                    if (_this.orderHistorylist[i].PaymentDate == null)
                        var someDate = new Date();
                    else
                        var someDate = new Date(_this.orderHistorylist[i].PaymentDate);
                    // var numberOfDaysToAdd = JSON.parse(this.certificateDetail.AssessmentDuration);
                    // someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                    // console.log(this.certificateDetail.AssessmentDuration);
                    var AssessmentDuration = JSON.parse(_this.orderHistorylist[i].AssessmentDuration);
                    someDate.setMonth(someDate.getMonth() + AssessmentDuration);
                    //console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    console.log(someDate);
                    // var d = new Date(2000, 0, 1); // January 1, 2000
                    // d.setMonth(d.getMonth() + 13);
                    // console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    var dd = someDate.getDate();
                    var mm = someDate.getMonth() + 1;
                    var y = someDate.getFullYear();
                    if (mm < 10) {
                        var month = '0' + mm;
                    }
                    else {
                        var month = '' + mm;
                    }
                    if (dd < 10) {
                        var date = '0' + dd;
                    }
                    else {
                        var date = '' + dd;
                    }
                    _this.assessmentExpirationDate = y + '-' + month + '-' + date;
                    _this.orderHistorylist[i].assessmentExpirationDate = _this.assessmentExpirationDate;
                }
                var date3;
                var date4;
                date3 = new Date();
                date4 = new Date(someDate);
                var diffTime = Math.abs(date3 - date4);
                _this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                _this.orderHistorylist[i].diffDays = _this.diffDays;
            }
            console.log(_this.orderHistorylist);
            setTimeout(function () {
                $('select').selectpicker();
            }, 200);
        }, function (error) {
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            _this.globals.isLoading = false;
            _this.btn_disable = false;
            _this.globals.pageNotfound(error.error.code);
        });
        // setTimeout(function () {
        //   $('.file_upload input[type="file"]').change(function (e) {
        //     var fileName = e.target.files[0].name;
        //     $('.file_upload input[type="text"]').val(fileName);
        //   });
        // }, 5000);
        // setTimeout(function () {
        //   $('.circle').circleProgress({
        //     value: 0.75,
        //     size: 70.0,
        //     startAngle: -Math.PI,
        //     emptyFill: '#ccc',
        //     fill: { color: '#1bc943' }
        //   }).on('circle-animation-progress', function (event, progress) {
        //     $(this).find('strong').html('75%');
        //   });
        //   $(document).ready(function () {
        //     $("#editimage").change(function (event) {
        //       $('#editprofile_img').show();
        //       readURLedit(this);
        //     });
        //     $('#editprofile_img').hide();
        //     function readURLedit(input) {
        //       if (input.files && input.files[0]) {
        //         var reader = new FileReader();
        //         var filename = $("#editimage").val();
        //         filename = filename.substring(filename.lastIndexOf('\\') + 1);
        //         reader.onload = function (e) {
        //           $('#user_img').attr('src', event.target["result"]);
        //           $('#user_img').hide();
        //           $('#user_img').fadeIn(500);
        //         }
        //         reader.readAsDataURL(input.files[0]);
        //       }
        //     }
        //     //this.countProgressBar();
        //     $("#editprofile_img").click(function () {
        //       $("#editimage").val('');
        //       $('#user_img').attr('src', 'assets/images/placeholder.png');
        //       $('#editprofile_img').hide();
        //     });
        //   });
        //   // Add minus icon for collapse element which is open by default
        //   $(".collapse.show").each(function () {
        //     $(this).prev(".card-header").find(".plus_minus_acc").addClass("fa-minus").removeClass("fa-plus");
        //   });
        //   // Toggle plus minus icon on show hide of collapse element
        //   $(".collapse").on('show.bs.collapse', function () {
        //     $(this).prev(".card-header").find(".plus_minus_acc").removeClass("fa-plus").addClass("fa-minus");
        //   }).on('hide.bs.collapse', function () {
        //     $(this).prev(".card-header").find(".plus_minus_acc").removeClass("fa-minus").addClass("fa-plus");
        //   });
        // }, 100);
        setTimeout(function () {
            //$('select').selectpicker();
            $('input[name="OrderDateFrom"]').daterangepicker({
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear'
                }
            });
            $('input[name="OrderDateFrom"]').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            });
            $('input[name="OrderDateFrom"]').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
        }, 1000);
    };
    UserHistoryComponent.prototype.ConvertToWord = function (num) {
        var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        var n = [];
        if ((num = num.toString()).length > 9)
            return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n)
            return;
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    };
    UserHistoryComponent.prototype.printInvoice = function (id) {
        var _this = this;
        debugger;
        this.UserhistoryService.getOrderInvoice(id)
            .then(function (data) {
            _this.InvoiceEntity = data;
            setTimeout(function () {
                var innerContents = document.getElementById('printInvoice').innerHTML;
                var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWinindow.document.open();
                popupWinindow.document.write(innerContents);
                popupWinindow.document.close();
                popupWinindow.print();
                popupWinindow.close();
            }, 1000);
        }, function (error) {
            _this.btn_disable = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    UserHistoryComponent.prototype.printReceipt = function (id) {
        var _this = this;
        debugger;
        this.UserhistoryService.getOrderReceipt(id)
            .then(function (data) {
            _this.ReceiptEntity = data;
            var Num = Number(_this.ReceiptEntity.Amount);
            _this.ReceiptEntity.Amountword = _this.ConvertToWord(Num);
            setTimeout(function () {
                var innerContents = document.getElementById('printReceipt').innerHTML;
                var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWinindow.document.open();
                popupWinindow.document.write(innerContents);
                popupWinindow.document.close();
                popupWinindow.print();
                popupWinindow.close();
            }, 1000);
        }, function (error) {
            _this.btn_disable = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    UserHistoryComponent.prototype.SearchFilter = function (SearchFilterForm) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        if (this.FilterEntity.OrderDateFrom != '' && this.FilterEntity.OrderDateFrom != undefined) {
            var d = new Date(this.FilterEntity.OrderDateFrom);
            var OrderFromMonth = d.getMonth() + 1;
            var OrderFromDate = d.getDate();
            var OrderFromYear = d.getFullYear();
            this.FilterEntity.OrderDateFrom = OrderFromYear + '/' + (OrderFromMonth < 10 ? '0' + OrderFromMonth : '' + OrderFromMonth) + '/' + ((OrderFromDate < 10 ? '0' + OrderFromDate : '' + OrderFromDate));
        }
        if (this.FilterEntity.OrderDateTo != '' && this.FilterEntity.OrderDateTo != undefined) {
            var d1 = new Date(this.FilterEntity.OrderDateTo);
            var OrderToMonth = d1.getMonth() + 1;
            var OrderToDate = d1.getDate();
            var OrderToYear = d1.getFullYear();
            this.FilterEntity.OrderDateTo = OrderToYear + '/' + (OrderToMonth < 10 ? '0' + OrderToMonth : '' + OrderToMonth) + '/' + ((OrderToDate < 10 ? '0' + OrderToDate : '' + OrderToDate));
        }
        if (this.FilterEntity.OrderDateFrom != undefined && this.FilterEntity.OrderDateTo == undefined) {
            this.FilterEntity.OrderDateTo = this.FilterEntity.OrderDateFrom;
        }
        if (this.FilterEntity.OrderDateFrom == undefined && this.FilterEntity.OrderDateTo != undefined) {
            this.FilterEntity.OrderDateFrom = this.FilterEntity.OrderDateTo;
        }
        this.UserhistoryService.searchUserHistory(this.FilterEntity)
            //.map(res => res.json())
            .then(function (data) {
            _this.orderHistorylist = data;
            //this.assessmentExpirationDate = '';
            for (var i = 0; i < _this.orderHistorylist.length; i++) {
                if (_this.orderHistorylist[i].CertificationEndDate == null) {
                    if (_this.orderHistorylist[i].PaymentDate == null)
                        var someDate = new Date();
                    else
                        var someDate = new Date(_this.orderHistorylist[i].PaymentDate);
                    // var numberOfDaysToAdd = JSON.parse(this.certificateDetail.AssessmentDuration);
                    // someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                    // console.log(this.certificateDetail.AssessmentDuration);
                    var AssessmentDuration = JSON.parse(_this.orderHistorylist[i].AssessmentDuration);
                    someDate.setMonth(someDate.getMonth() + AssessmentDuration);
                    //console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    console.log(someDate);
                    // var d = new Date(2000, 0, 1); // January 1, 2000
                    // d.setMonth(d.getMonth() + 13);
                    // console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    var dd = someDate.getDate();
                    var mm = someDate.getMonth() + 1;
                    var y = someDate.getFullYear();
                    if (mm < 10) {
                        var month = '0' + mm;
                    }
                    else {
                        var month = '' + mm;
                    }
                    if (dd < 10) {
                        var date = '0' + dd;
                    }
                    else {
                        var date = '' + dd;
                    }
                    _this.assessmentExpirationDate = y + '-' + month + '-' + date;
                    _this.orderHistorylist[i].assessmentExpirationDate = _this.assessmentExpirationDate;
                }
                var date3;
                var date4;
                date3 = new Date();
                date4 = new Date(someDate);
                var diffTime = Math.abs(date3 - date4);
                _this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                _this.orderHistorylist[i].diffDays = _this.diffDays;
            }
            _this.globals.isLoading = false;
            _this.FilterEntity = {};
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    UserHistoryComponent.prototype.clearData = function (SearchFilterForm) {
        var _this = this;
        this.globals.isLoading = true;
        var id = 0;
        this.UserhistoryService.getAllDefault(id)
            //.map(res => res.json())
            .then(function (data) {
            _this.FilterEntity = {};
            _this.orderHistorylist = data['orderHistory'];
            for (var i = 0; i < _this.orderHistorylist.length; i++) {
                if (_this.orderHistorylist[i].CertificationEndDate == null) {
                    if (_this.orderHistorylist[i].PaymentDate == null)
                        var someDate = new Date();
                    else
                        var someDate = new Date(_this.orderHistorylist[i].PaymentDate);
                    // var numberOfDaysToAdd = JSON.parse(this.certificateDetail.AssessmentDuration);
                    // someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                    // console.log(this.certificateDetail.AssessmentDuration);
                    var AssessmentDuration = JSON.parse(_this.orderHistorylist[i].AssessmentDuration);
                    someDate.setMonth(someDate.getMonth() + AssessmentDuration);
                    //console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    console.log(someDate);
                    // var d = new Date(2000, 0, 1); // January 1, 2000
                    // d.setMonth(d.getMonth() + 13);
                    // console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    var dd = someDate.getDate();
                    var mm = someDate.getMonth() + 1;
                    var y = someDate.getFullYear();
                    if (mm < 10) {
                        var month = '0' + mm;
                    }
                    else {
                        var month = '' + mm;
                    }
                    if (dd < 10) {
                        var date = '0' + dd;
                    }
                    else {
                        var date = '' + dd;
                    }
                    _this.assessmentExpirationDate = y + '-' + month + '-' + date;
                    _this.orderHistorylist[i].assessmentExpirationDate = _this.assessmentExpirationDate;
                }
                var date3;
                var date4;
                date3 = new Date();
                date4 = new Date(someDate);
                var diffTime = Math.abs(date3 - date4);
                _this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                _this.orderHistorylist[i].diffDays = _this.diffDays;
            }
            _this.Statuslist = data['Configuration'];
            // this.Statuslist = [...this.Statuslist,...data['Configuration']];
            _this.Candidatelist = data['Candidatename'];
            //this.Candidatelist = [...this.Candidatelist,...data['Candidatename']];
            _this.Certificatelist = data['Certificates'];
            //this.Certificatelist = [...this.Certificatelist,...data['Certificates']];
            //     setTimeout(function () {
            //       $("#OrderDateFrom").val('');
            //       $('select').selectpicker("refresh");
            // }, 100);
            _this.globals.isLoading = false;
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    UserHistoryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-history',
            templateUrl: './user-history.component.html',
            styleUrls: ['./user-history.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, ElementRef,
            UserhistoryService])
    ], UserHistoryComponent);
    return UserHistoryComponent;
}());
export { UserHistoryComponent };
//# sourceMappingURL=user-history.component.js.map