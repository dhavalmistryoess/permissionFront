import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { PasswordService } from '../services/password.service';
import { AuthService } from '../services/auth.service';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(globals, router, route, authService, elem, ProfileService, PasswordService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.elem = elem;
        this.ProfileService = ProfileService;
        this.PasswordService = PasswordService;
        this.passwordEntity = {};
        this.oldnewsame = false;
        this.newconfsame = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.certificatedocumentEntity = {};
        this.profileEntity = {};
        this.documentEntity = {};
        this.ReceiptEntity = {};
        this.InvoiceEntity = {};
        this.FilterEntity = {};
        this.documentDetail = [];
        this.orderHistorylist = [];
        this.Statuslist = [];
        this.PersonalDocuments = [];
        this.UserPersonalDocuments = [];
        this.certificateimage = [];
        this.certificatedocument = [];
        this.countryList = [];
        this.stateList = [];
        this.uploadDocumentPopup = false;
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() + 1);
        this.minDate.setHours(0, 0, 0, 0);
        this.profileImageEntity = {};
        this.globals.isLoading = true;
        var id = this.globals.authData.UserId;
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
        $('#editprofile_img').hide();
        var addressadd = window.atob(this.route.snapshot.paramMap.get('addressadd'));
        if (addressadd == 'addressadd') {
            $("#address-info-tab").addClass("active");
            $("#personal-info-tab").removeClass("active");
            $("#address-info").addClass("show active");
            $("#personal-info").removeClass("show active");
        }
        if (addressadd == 'document') {
            $("#document-tab").addClass("active");
            $("#personal-info-tab").removeClass("active");
            $("#document").addClass("show active");
            $("#personal-info").removeClass("show active");
        }
        this.ProfileService.getAllDefault(id)
            .then(function (data) {
            debugger;
            _this.globals.isLoading = false;
            console.log(data);
            //this.countryList = data['Countries'];
            var countrySelect = {
                CountryId: '',
                CountryName: _this.globals.commonTranslationText.profilePage.addressInformationForm.country.select,
                Value: ""
            };
            _this.countryList.push(countrySelect);
            _this.countryList = _this.countryList.concat(data['Countries']);
            //this.stateList = data['States'];
            _this.orderHistorylist = data['orderHistory'];
            //this.Statuslist = data['Configuration'];
            // var statusSelect = {
            //   ConfigurationId: '',
            //   DisplayText: "Select Status",
            //   Value: ""
            // }
            // this.Statuslist.push(statusSelect);
            _this.Statuslist = _this.Statuslist.concat(data['Configuration']);
            _this.UserPersonalDocuments = data['UserPersonalDocuments'];
            //this.PersonalDocuments = data['PersonalDocuments'];
            var personalSelect = {
                DocumentId: '',
                DocumentName: _this.globals.commonTranslationText.profilePage.documents.select,
                Value: ""
            };
            _this.PersonalDocuments.push(personalSelect);
            _this.PersonalDocuments = _this.PersonalDocuments.concat(data['PersonalDocuments']);
            _this.profileEntity = data['UserData'][0];
            console.log(_this.PersonalDocuments);
            _this.countProgressBar();
            for (var i = 0; i < _this.UserPersonalDocuments.length; i++) {
                if (_this.UserPersonalDocuments[i].UserDocumentId != null) {
                    _this.UserPersonalDocuments[i].flag = 1;
                    var ExtStr = _this.UserPersonalDocuments[i].CertificateDocumentName;
                    var Ext = "." + ExtStr.split(".")[1];
                    _this.UserPersonalDocuments[i].Ext = Ext;
                }
                else {
                    _this.UserPersonalDocuments[i].flag = 0;
                }
            }
            console.log(_this.UserPersonalDocuments);
            console.log(_this.profileEntity.CertificateData);
            for (var i = 0; i < _this.profileEntity.CertificateData.length; i++) {
                for (var j = 0; j < _this.profileEntity.CertificateData[i].OptionalDocuments.length; j++) {
                    //console.log(this.profileEntity.CertificateData[i].OptionalDocuments[j].DocumentName);
                    if (_this.profileEntity.CertificateData[i].OptionalDocuments[j].UserDocumentId != null) {
                        _this.profileEntity.CertificateData[i].OptionalDocuments[j].flag = 1;
                        var ExtStr = _this.profileEntity.CertificateData[i].OptionalDocuments[j].CertificateDocumentName;
                        var Ext1 = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                        _this.profileEntity.CertificateData[i].OptionalDocuments[j].Ext = Ext1;
                    }
                    else {
                        _this.profileEntity.CertificateData[i].OptionalDocuments[j].flag = 0;
                    }
                }
                for (var k = 0; k < _this.profileEntity.CertificateData[i].MandatoryDocuments.length; k++) {
                    //console.log(this.profileEntity.CertificateData[i].OptionalDocuments[j].DocumentName);
                    if (_this.profileEntity.CertificateData[i].MandatoryDocuments[k].UserDocumentId != null) {
                        _this.profileEntity.CertificateData[i].MandatoryDocuments[k].flag = 1;
                        var ExtStr = _this.profileEntity.CertificateData[i].MandatoryDocuments[k].CertificateDocumentName;
                        var Ext2 = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                        _this.profileEntity.CertificateData[i].MandatoryDocuments[k].Ext = Ext2;
                    }
                    else {
                        _this.profileEntity.CertificateData[i].MandatoryDocuments[k].flag = 0;
                    }
                }
            }
            console.log(_this.profileEntity.CertificateData);
            var Certificate;
            // for (Certificate of this.profileEntity.CertificateData) {
            //   var Documents;
            //   var Mandatory;
            //   for (Documents of Certificate.OptionalDocuments) {
            //     if (Certificate.OptionalDocuments) {
            //       var ExtStr = Documents.CertificateDocumentName;
            //       var Ext = ExtStr.substring(ExtStr.length - 4, ExtStr.length);
            //       Documents.Ext = Ext;
            //     }
            //   }
            //   for (Mandatory of Certificate.MandatoryDocuments) {
            //     if (Mandatory) {
            //       var ExtStr = Mandatory.CertificateDocumentName;
            //       var Ext = ExtStr.substring(ExtStr.length - 4, ExtStr.length);
            //       Mandatory.Ext = Ext;
            //     }
            //   }
            // }
            var UserPersonal;
            for (var _i = 0, _a = _this.UserPersonalDocuments; _i < _a.length; _i++) {
                UserPersonal = _a[_i];
                var PersonalDocuments;
                for (var _b = 0, _c = _this.PersonalDocuments; _b < _c.length; _b++) {
                    PersonalDocuments = _c[_b];
                    if (PersonalDocuments.DocumentId == UserPersonal.DocumentId) {
                        PersonalDocuments.flag = 1;
                    }
                }
            }
            // for (var j = 0; j < this.profileEntity.CertificateData.length; j++)
            // {
            //   for (var k = 0; k < this.profileEntity.CertificateData[j].OptionalDocuments.length; k++)
            //   {
            //     var ExtStr = this.profileEntity[0].CertificateData[j].OptionalDocuments[k].CertificateDocumentName;
            //     var Ext = ExtStr.substring(ExtStr.length - 4, ExtStr.length);
            //     this.profileEntity[0].CertificateData[j].OptionalDocuments[k].Ext = Ext;
            //    console.log(this.profileEntity[i].CertificateData[j].OptionalDocuments[k]);
            //     alert(this.profileEntity[0].CertificateData[j].OptionalDocuments[k].Ext);
            //   }
            // for (var l = 0; l < this.profileEntity[0].CertificateData[j].MandatoryDocuments.length; l++)
            // {
            //   var ExtStr = this.profileEntity[0].CertificateData[j].MandatoryDocuments[l].CertificateDocumentName;
            //   var Ext = ExtStr.substring(ExtStr.length - 4, ExtStr.length);
            //   this.profileEntity[0].CertificateData[j].MandatoryDocuments[l].Ext = Ext;
            // //  console.log(this.profileEntity[i].CertificateData[j].MandatoryDocuments[l].Ext);
            //   alert(this.profileEntity[0].CertificateData[j].MandatoryDocuments[l].Ext);
            // }
            // }
            setTimeout(function () {
                $('select').selectpicker();
            }, 5000);
            // this.profileEntity[0].CountryId = '';
            // this.profileEntity[0].StateId = '';
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
            console.log(_this.orderHistorylist);
            if (_this.profileEntity.StateId != '') {
                _this.ProfileService.getStateByCountryId(_this.profileEntity.CountryId)
                    .then(function (data) {
                    //this.stateList = data;
                    var data1;
                    data1 = data;
                    var stateSelect = {
                        StateId: '',
                        StateName: _this.globals.commonTranslationText.profilePage.addressInformationForm.state.select,
                        Value: ""
                    };
                    _this.stateList.push(stateSelect);
                    _this.stateList = _this.stateList.concat(data1);
                    setTimeout(function () {
                        $('#StateId').selectpicker('refresh');
                    }, 1000);
                }, function (error) {
                    _this.btn_disable = false;
                    _this.submitted2 = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        }, function (error) {
            // swal({
            //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
            //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
            //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
            //   showConfirmButton: false,
            //   timer: 4000
            // })
            _this.globals.pageNotfound(error.error.code);
            _this.globals.isLoading = false;
            _this.btn_disable = false;
            _this.passwordSubmit = false;
        });
        setTimeout(function () {
            $('.file_upload input[type="file"]').change(function (e) {
                var fileName = e.target.files[0].name;
                $('.file_upload input[type="text"]').val(fileName);
            });
        }, 5000);
        // setTimeout(function () {
        //   $('select').selectpicker();
        // }, 1000);
        setTimeout(function () {
            if (_this.profileEntity.ProfileImageName != null && _this.profileEntity.ProfileImageName != '') {
                $('#editprofile_img').show();
            }
            else {
                $('#editprofile_img').hide();
            }
        }, 500);
        setTimeout(function () {
            $(document).ready(function () {
                $("#editimage").change(function (event) {
                    $('#editprofile_img').show();
                    readURLedit(this);
                });
                function readURLedit(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        var filename = $("#editimage").val();
                        filename = filename.substring(filename.lastIndexOf('\\') + 1);
                        reader.onload = function (e) {
                            $('#user_img').attr('src', event.target["result"]);
                            $('#user_img').hide();
                            $('#user_img').fadeIn(500);
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                }
                //this.countProgressBar();
                $("#editprofile_img").click(function () {
                    $("#editimage").val('');
                    $('#user_img').attr('src', 'assets/images/placeholder.png');
                    $('#editprofile_img').hide();
                });
            });
            $("#new_upload_file").change(function (event) {
                $('.uploaded_doc_block').show();
                $('.new_block').hide();
                readURLedit(this);
            });
            $('.uploaded_doc_block').hide();
            function readURLedit(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    var filename = $("#new_upload_file").val();
                    filename = filename.substring(filename.lastIndexOf('\\') + 1);
                    reader.onload = function (e) {
                        $('#uploaded_doc').attr('src', event.target["result"]);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
            $("#deletedoc_img").click(function () {
                $("#new_upload_file").val('');
                $('#uploaded_doc').attr('src', '');
                $('.uploaded_doc_block').hide();
                $('.new_block').show();
            });
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
        $("#oldpassword-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#oldpassword").attr("type") == "password") {
                $("#oldpassword").attr("type", "text");
            }
            else {
                $("#oldpassword").attr("type", "password");
            }
        });
        $("#password-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#password").attr("type") == "password") {
                $("#password").attr("type", "text");
            }
            else {
                $("#password").attr("type", "password");
            }
        });
        $("#confpassword-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#confpassword").attr("type") == "password") {
                $("#confpassword").attr("type", "text");
            }
            else {
                $("#confpassword").attr("type", "password");
            }
        });
        setTimeout(function () {
            // $('select').selectpicker();
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
    ProfileComponent.prototype.overlay_close = function () {
        this.uploadDocumentPopup = false;
        $(".overlay").css("display", "none");
    };
    ProfileComponent.prototype.profilePictureUpload = function () {
        var _this = this;
        if (this.profileImageEntity.ProfileImageName != '' && this.profileImageEntity.ProfileImageName != null) {
            var ext = this.profileImageEntity.ProfileImageName.split(".");
            ext = ext[ext.length - 1].toLowerCase();
            //ext = ext[ext.length - 1].toLowerCase();
            var arrayExtensions = ["jpg", "jpeg", "png", "JPEG", "JPG", "PNG"];
            if (arrayExtensions.lastIndexOf(ext) == -1) {
                swal({
                    type: 'warning',
                    title: 'Wrong Extensions',
                    text: 'you can able to upload a file Extension with ' + arrayExtensions,
                    showConfirmButton: false,
                    timer: 3000
                });
                this.profileImageEntity.ProfileImageName = '';
                setTimeout(function () {
                    $("#editimage").val('');
                    $('#user_img').attr('src', 'assets/images/placeholder.png');
                    $('#editprofile_img').hide();
                }, 200);
            }
            else {
                debugger;
                var count = 0;
                var file1_1 = '';
                var fd = new FormData();
                var total = 0;
                this.profileImageEntity.Document = [];
                if (this.profileImageEntity.ProfileImageName != '' && this.profileImageEntity.ProfileImageName != null) {
                    file1_1 = this.elem.nativeElement.querySelector('#editimage').files;
                    if (file1_1 && file1_1.length != 0) {
                        total = file1_1.length;
                        for (var k = 0; k < file1_1.length; k++) {
                            var Images = Date.now() + '_' + file1_1[k]['name'];
                            fd.append('Document' + k, file1_1[k], Images);
                            this.profileImageEntity.Document.push(Images);
                            this.profileImageEntity.ProfileImageName = Images;
                        }
                    }
                    else {
                        fd.append('Document', null);
                        this.profileImageEntity.Document = null;
                    }
                }
                this.profileImageEntity.UserId = this.globals.authData.UserId;
                this.profileImageEntity.ProfileImageUrl = '/assests/Documents/';
                this.globals.isLoading = true;
                this.ProfileService.addProfileImage(this.profileImageEntity)
                    .then(function (data) {
                    _this.globals.isLoading = false;
                    if (file1_1) {
                        _this.ProfileService.uploadFileCertificate(fd, total, _this.globals.authData.UserId)
                            .then(function (data) {
                            $("#editimage").val(null);
                            swal({
                                type: _this.globals.commonTranslationText.profilePage.alerts.profileImage.type,
                                title: _this.globals.commonTranslationText.profilePage.alerts.profileImage.title,
                                text: _this.globals.commonTranslationText.profilePage.alerts.profileImage.text,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }, function (error) {
                            _this.globals.isLoading = false;
                            _this.globals.pageNotfound(error.error.code);
                        });
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.profilePage.alerts.profileImage.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.profileImage.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.profileImage.text,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                }, function (error) {
                    _this.globals.isLoading = false;
                    _this.globals.pageNotfound(error.error.code);
                });
            }
        }
        else {
            this.profileImageEntity.UserId = this.globals.authData.UserId;
            this.profileImageEntity.ProfileImageName = '';
            this.profileImageEntity.ProfileImageUrl = '';
            this.globals.isLoading = true;
            this.ProfileService.addProfileImage(this.profileImageEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                swal({
                    type: _this.globals.commonTranslationText.profilePage.alerts.deleteProfileImage.type,
                    title: _this.globals.commonTranslationText.profilePage.alerts.deleteProfileImage.title,
                    text: _this.globals.commonTranslationText.profilePage.alerts.deleteProfileImage.text,
                    showConfirmButton: false,
                    timer: 3000
                });
            }, function (error) {
                _this.globals.isLoading = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
    };
    ProfileComponent.prototype.ConvertToWord = function (num) {
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
    ProfileComponent.prototype.printInvoice = function (id) {
        var _this = this;
        this.ProfileService.getOrderInvoice(id)
            .then(function (data) {
            _this.InvoiceEntity = data;
            console.log(data);
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
            _this.submitted2 = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    ProfileComponent.prototype.changepwsd = function () {
        this.passwordSubmit = false;
        this.submitted2 = false;
    };
    ProfileComponent.prototype.printReceipt = function (id) {
        var _this = this;
        debugger;
        this.ProfileService.getOrderReceipt(id)
            .then(function (data) {
            _this.ReceiptEntity = data;
            var Num = Number(_this.ReceiptEntity.Amount);
            _this.ReceiptEntity.Amountword = _this.ConvertToWord(Num);
            setTimeout(function () {
                var innerContents = document.getElementById('printeReceipt').innerHTML;
                var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWinindow.document.open();
                popupWinindow.document.write(innerContents);
                popupWinindow.document.close();
                popupWinindow.print();
                popupWinindow.close();
            }, 1000);
        }, function (error) {
            _this.btn_disable = false;
            _this.submitted2 = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    ProfileComponent.prototype.documents = function (UserDocument) {
        debugger;
        if (UserDocument) {
            this.documentEntity.CertificateDocumentName = '';
            this.submitted3 = false;
            this.DocumentDis = true;
            $("#CertificateDocumentName").val('');
            var aa = UserDocument.docmentID;
            this.documentEntity.UserDocumentId = UserDocument.UserDocumentId;
            this.documentEntity.CertificateDocumentId = UserDocument.docmentID;
            this.documentEntity.docType = UserDocument.DocumentTypes;
            setTimeout(function () {
                $("#CertificateDocumentId").selectpicker('refresh');
                $("#CertificateDocumentId").val(aa);
            }, 200);
            //  this.documentEntity.CertificateDocumentId=UserDocument.DocumentId;
        }
        else {
            this.submitted3 = false;
            this.DocumentDis = false;
            this.documentEntity.UserDocumentId = 0;
            setTimeout(function () {
                $("#CertificateDocumentId").selectpicker('refresh');
            }, 200);
        }
        setTimeout(function () {
            $('#documentModal').modal('show');
            $('select').selectpicker();
        }, 200);
    };
    ProfileComponent.prototype.fileTypeCheckPersonalDoc = function (file) {
        //this.documentEntity.CertificateDocumentId = 0;
        //if (CertiDocumentId != '' && CertiDocumentId != undefined) {
        // for (var j = 0; j < this.certificatedocument.length; j++) {
        //   if (this.certificatedocument[j].DocumentId == CertiDocumentId) {
        //     var arrayExtensions = this.certificatedocument[j].DocumentType;
        //   }
        // }
        var ext = file.split(".");
        ext = "." + ext[ext.length - 1].toLowerCase();
        //ext = ext[ext.length - 1].toLowerCase();
        var arrayExtensions = this.documentEntity.docType; //["jpg" , "jpeg", "png", "bmp", "gif"];
        if (arrayExtensions.lastIndexOf(ext) == -1) {
            swal({
                type: 'warning',
                title: 'Wrong Extensions',
                text: 'you can able to upload a file Extension with ' + this.documentEntity.docType,
                showConfirmButton: false,
                timer: 3000
            });
            this.documentEntity.CertificateDocumentName = '';
            // setTimeout(function () {
            //   $("#new_upload_file").val('');
            //   $('#uploaded_doc').attr('src', '');
            //   $('.uploaded_doc_block').hide();
            //   $('.new_block').show();
            // }, 200);
        }
        //}
        // else {
        //   swal({
        //     type: 'warning',
        //     title: 'Select Document',
        //     text: 'Please select a document',
        //     showConfirmButton: false,
        //     timer: 3000,
        //   })
        //   setTimeout(function () {
        //     $("#new_upload_file").val('');
        //     $('#uploaded_doc').attr('src', '');
        //     $('.uploaded_doc_block').hide();
        //     $('.new_block').show();
        //   }, 200);
        // }
    };
    ProfileComponent.prototype.certificatedocuments = function (certificates, certificateDocument, edittimevalue) {
        var _this = this;
        debugger;
        this.Removeimage();
        if (certificateDocument.UserDocumentCertificateMappingId != null) {
            this.editDocumentValue = edittimevalue;
            this.certificatedocumentEntity.UserDocumentId = certificateDocument.UserDocumentId;
            this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
            if (certificateDocument.ExpiryDate != null) {
                this.certificatedocumentEntity.ExpiryDate = new Date(certificateDocument.ExpiryDate);
            }
            else {
                this.certificatedocumentEntity.ExpiryDate = '';
            }
            this.certiDocumentDis = true;
            this.DocumentDis = true;
            //$("#CertificateDocumentId").val(13);
            var aa = certificates.DocumentId;
            setTimeout(function () {
                $("#CertiDocumentId").selectpicker('refresh');
                $("#CertiDocumentId").val(aa);
            }, 200);
        }
        else {
            this.certificatedocumentEntity.UserDocumentId = 0;
            this.certiDocumentDis = false;
            setTimeout(function () {
                $("#CertiDocumentId").selectpicker('refresh');
                //$("#CertiDocumentId").val('');
                _this.submitted5 = false;
                //this.certificatedocumentEntity.CertiDocumentId = '';
            }, 200);
        }
        this.certificatedocumentEntity.CertiName = certificates.CertificateName;
        this.certificatedocumentEntity.UserDocumentCertificateMappingId = certificateDocument.UserDocumentCertificateMappingId;
        this.certificatedocumentEntity.UserCertificateId = certificates.UserCertificateId;
        this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
        this.certificatedocumentEntity.DocumentId = certificateDocument.DocumentId;
        this.certificatedocumentEntity.CertificateDocumentId = certificateDocument.CertificateDocumentId;
        //$('#certificateModal').modal('show');
        this.uploadDocumentPopup = true;
        console.log(this.certificatedocumentEntity);
        certificates.UserId = this.globals.authData.UserId;
        this.ProfileService.getData(certificates)
            .then(function (data) {
            _this.globals.isLoading = false;
            _this.certificateimage = data['UserAllDocuments'];
            _this.certificatedocument = data['CertificateDocuments'];
            var documentSelect = {
                DocumentId: '',
                DocumentName: _this.globals.commonTranslationText.profilePage.documents.select,
                Value: ""
            };
            _this.certificatedocument.push(documentSelect);
            _this.certificatedocument = _this.certificatedocument.concat(data['CertificateDocuments']);
            // console.log(this.certificatedocument);
            // var Certificate
            // for (Certificate of this.profileEntity.CertificateData) {
            //   var Documents;
            //   var Mandatory;
            //   for (Documents of Certificate.OptionalDocuments) {
            //     var certificatedocument;
            //     for (certificatedocument of this.certificatedocument) {
            //       if (Documents.DocumentId == certificatedocument.DocumentId) {
            //         certificatedocument.flag = 1;
            //       }
            //     }
            //   }
            //   for (Mandatory of Certificate.MandatoryDocuments) {
            //     var certificatedocument;
            //     for (certificatedocument of this.certificatedocument) {
            //       if (Mandatory.DocumentId == certificatedocument.DocumentId) {
            //         certificatedocument.flag = 1;
            //       }
            //     }
            //   }
            // }
            setTimeout(function () {
                $("#CertiDocumentId").selectpicker('refresh');
                $('select').selectpicker();
            }, 500);
        }, function (error) {
            _this.btn_disable = false;
            _this.submitted1 = false;
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
    ProfileComponent.prototype.close = function () {
        this.uploadDocumentPopup = false;
    };
    ProfileComponent.prototype.imageclick = function (image, i) {
        debugger;
        setTimeout(function () {
            $('input[type="checkbox"]').on('change', function () {
                $('input[type="checkbox"]').not(this).prop('checked', false);
            });
            $("#new_upload_file").val('');
            $('#uploaded_doc').attr('src', '');
            $('.uploaded_doc_block').hide();
            $('.new_block').show();
        });
        this.editDocumentValue = 0;
        this.certificatedocumentEntity.UserDocumentId = image.UserDocumentId;
    };
    ProfileComponent.prototype.Removeimage = function () {
        // this.certificatedocumentEntity.UserDocumentId = 0;
        // $('.radio_box input[type="radio"]').val(null);
        // // setTimeout(function () {
        // //   $('.radio_box input[type="radio"]').val(false);
        // //  },);
        $("#new_upload_file").val('');
        $('#uploaded_doc').attr('src', '');
        $('.uploaded_doc_block').hide();
        $('.new_block').show();
        this.certificatedocumentEntity.CertificateName = '';
    };
    ProfileComponent.prototype.fileTypeCheck = function (file, CertiDocumentId) {
        debugger;
        this.certificatedocumentEntity.UserDocumentId = 0;
        $('.check_box input[name="document_select"]').prop('checked', false);
        if (CertiDocumentId != '' && CertiDocumentId != undefined) {
            for (var j = 0; j < this.certificatedocument.length; j++) {
                if (this.certificatedocument[j].DocumentId == CertiDocumentId) {
                    var arrayExtensions = this.certificatedocument[j].DocumentType;
                }
            }
            var ext = file.split(".");
            ext = "." + ext[ext.length - 1].toLowerCase();
            //var arrayExtensions = [".jpg" , ".jpeg", ".png", ".bmp", ".gif"];
            if (arrayExtensions.lastIndexOf(ext) == -1) {
                swal({
                    type: 'warning',
                    title: 'Wrong Extensions',
                    //text: 'You can not upload file that extensions with ' + ext,
                    text: 'you can able to upload a file Extension with ' + arrayExtensions,
                    showConfirmButton: false,
                    timer: 3000
                });
                this.certificatedocumentEntity.CertificateName = '';
                setTimeout(function () {
                    $("#new_upload_file").val('');
                    $('#uploaded_doc').attr('src', '');
                    $('.uploaded_doc_block').hide();
                    $('.new_block').show();
                }, 200);
            }
        }
        else {
            swal({
                type: 'warning',
                title: 'Select Document',
                text: 'Please select a document',
                showConfirmButton: false,
                timer: 3000,
            });
            setTimeout(function () {
                $("#new_upload_file").val('');
                $('#uploaded_doc').attr('src', '');
                $('.uploaded_doc_block').hide();
                $('.new_block').show();
            }, 200);
        }
    };
    ProfileComponent.prototype.countProgressBar = function () {
        debugger;
        var current_progress = 0;
        if (this.profileEntity.FirstName != '' && this.profileEntity.FirstName != null) {
            current_progress += 16.67;
        }
        if (this.profileEntity.LastName != '' && this.profileEntity.LastName != null) {
            current_progress += 16.66;
        }
        if (this.profileEntity.PhoneNumber != '' && this.profileEntity.PhoneNumber != null) {
            current_progress += 16.67;
        }
        if (this.profileEntity.Address1 != '' && this.profileEntity.Address1 != null) {
            current_progress += 10;
        }
        if (this.profileEntity.ZipCode != '' && this.profileEntity.ZipCode != null) {
            current_progress += 10;
        }
        if (this.profileEntity.City != '' && this.profileEntity.City != null) {
            current_progress += 10;
        }
        if (this.profileEntity.CountryId != '' && this.profileEntity.CountryId != null) {
            current_progress += 10;
        }
        if (this.profileEntity.StateId != '' && this.profileEntity.StateId != null) {
            current_progress += 10;
        }
        //this.globals.current_progress = current_progress;
        //console.log(current_progress/100);
        $('.circle').circleProgress({
            value: current_progress / 100,
            size: 70.0,
            startAngle: -Math.PI,
            emptyFill: '#ccc',
            fill: { color: '#1bc943' }
        }).on('circle-animation-progress', function (event, progress) {
            $(this).find('strong').html(current_progress + '%');
        });
    };
    ProfileComponent.prototype.profile1 = function (profileForm1) {
        var _this = this;
        this.submitted1 = true;
        if (profileForm1.valid) {
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.profileEntity.UserId = this.globals.authData.UserId;
            this.ProfileService.editprofile(this.profileEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted1 = false;
                swal({
                    type: _this.globals.commonTranslationText.profilePage.alerts.profile.type,
                    title: _this.globals.commonTranslationText.profilePage.alerts.profile.title,
                    text: _this.globals.commonTranslationText.profilePage.alerts.profile.text,
                    showConfirmButton: false,
                    timer: 4000
                });
                _this.countProgressBar();
                /*if (profileImage) {
                    this.EditProfileService.uploadProfilePicture(profilefd, this.globals.authData.UserId)
                        .then((data) => {
                            $("#UsereditImageId").val(null);
                        },
                            (error) => {
                                this.btn_disable = false;
                                this.submitted = false;
                                this.globals.isLoading = false;
                                this.router.navigate(['/pagenotfound']);
                            });
      }*/
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted1 = false;
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
        }
    };
    ProfileComponent.prototype.getStateListadd = function (addressForm) {
        var _this = this;
        debugger;
        addressForm.form.controls.StateId.markAsDirty();
        this.profileEntity.StateId = '';
        this.stateList = [];
        if (this.profileEntity.CountryId > 0) {
            this.ProfileService.getStateByCountryId(this.profileEntity.CountryId)
                .then(function (data) {
                //this.stateList = data;
                var data1;
                data1 = data;
                var stateSelect = {
                    StateId: '',
                    StateName: _this.globals.commonTranslationText.profilePage.addressInformationForm.state.select,
                    Value: ""
                };
                _this.stateList.push(stateSelect);
                _this.stateList = _this.stateList.concat(data1);
                setTimeout(function () {
                    $('#StateId').selectpicker('refresh');
                }, 500);
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted2 = false;
                _this.globals.pageNotfound(error.error.code);
            });
        }
        else {
            this.stateList = [];
        }
    };
    ProfileComponent.prototype.address = function (addressForm) {
        var _this = this;
        this.submitted2 = true;
        if (addressForm.valid) {
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.profileEntity.UserId = this.globals.authData.UserId;
            if (this.profileEntity.AddressId == null) {
                this.profileEntity.AddressId = 0;
            }
            this.ProfileService.editaddress(this.profileEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted2 = false;
                swal({
                    type: _this.globals.commonTranslationText.profilePage.alerts.address.type,
                    title: _this.globals.commonTranslationText.profilePage.alerts.address.title,
                    text: _this.globals.commonTranslationText.profilePage.alerts.address.text,
                    showConfirmButton: false,
                    timer: 4000
                });
                var addressadd = window.atob(_this.route.snapshot.paramMap.get('addressadd'));
                if (addressadd == 'addressadd') {
                    _this.router.navigate(['/certificateDetails/' + _this.route.snapshot.paramMap.get('certificateid') + '/' + window.btoa('schedule')]);
                }
                _this.countProgressBar();
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted1 = false;
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
        }
    };
    ProfileComponent.prototype.changePassword = function (changePasswordForm) {
        var _this = this;
        this.passwordSubmit = true;
        if (changePasswordForm.valid && !this.newconfsame && !this.oldnewsame) {
            this.passwordEntity.UserId = this.globals.authData.UserId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.PasswordService.changePassword(this.passwordEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.passwordSubmit = false;
                _this.passwordEntity = {};
                changePasswordForm.form.markAsPristine();
                swal({
                    type: _this.globals.commonTranslationText.profilePage.alerts.changePasswordSuccess.type,
                    title: _this.globals.commonTranslationText.profilePage.alerts.changePasswordSuccess.title,
                    text: _this.globals.commonTranslationText.profilePage.alerts.changePasswordSuccess.text,
                    showConfirmButton: false,
                    timer: 2000
                });
            }, function (error) {
                if (error.status == 400) {
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.wrongOldPassword.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.wrongOldPassword.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.wrongOldPassword.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else {
                    // swal({
                    //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   showConfirmButton: false,
                    //   timer: 4000
                    // })
                    _this.globals.pageNotfound(error.error.code);
                }
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.passwordSubmit = false;
            });
        }
    };
    ProfileComponent.prototype.confirmPassword = function () {
        if (this.passwordEntity.OldPassword == this.passwordEntity.Password) {
            this.oldnewsame = true;
            this.newconfsame = false;
        }
        else {
            this.oldnewsame = false;
            if (this.passwordEntity.ConfirmPassword != this.passwordEntity.Password) {
                if (this.passwordEntity.ConfirmPassword != null) {
                    this.newconfsame = true;
                }
                else {
                    this.newconfsame = false;
                }
            }
            else {
                this.newconfsame = false;
            }
        }
        if (this.passwordEntity.OldPassword == '') {
            this.oldnewsame = false;
            this.newconfsame = false;
        }
        if (this.passwordEntity.Password == '' || this.passwordEntity.ConfirmPassword == '') {
            this.newconfsame = false;
        }
    };
    // countProgressBar() {
    //   var current_progress = 0;
    //   if (this.profileEntity.FirstName != '' && this.profileEntity.FirstName != null) {
    //     current_progress += 5;
    //   }
    //   this.globals.current_progress = current_progress;
    //   setTimeout(function () {
    //     $(".progress-bar")
    //       .css("width", current_progress + "%")
    //       .attr("aria-valuenow", current_progress)
    //   }, 1000);
    // }
    ProfileComponent.prototype.documentSubmit = function (documentForm) {
        var _this = this;
        debugger;
        this.submitted3 = true;
        var count = 0;
        if (this.documentEntity.CertificateDocumentName == "" || this.documentEntity.CertificateDocumentName == null || this.documentEntity.CertificateDocumentName == undefined) {
            this.DocumentValid = true;
            count = 1;
        }
        else {
            this.DocumentValid = false;
        }
        if (documentForm.valid) {
            var file1_2 = '';
            var fd = new FormData();
            var total = 0;
            this.documentEntity.Document = [];
            if (this.documentEntity.CertificateDocumentId != '' && this.documentEntity.CertificateDocumentName != '') {
                file1_2 = this.elem.nativeElement.querySelector('#CertificateDocumentName').files;
                if (file1_2 && file1_2.length != 0) {
                    total = file1_2.length;
                    for (var k = 0; k < file1_2.length; k++) {
                        var Images = Date.now() + '_' + file1_2[k]['name'];
                        fd.append('Document' + k, file1_2[k], Images);
                        this.documentEntity.Document.push(Images);
                        this.documentEntity.CertificateDocumentName = Images;
                    }
                }
                else {
                    fd.append('Document', null);
                    this.documentEntity.Document = null;
                }
            }
            //CertificateName,UserName
            this.documentEntity.UserDocuments = [{
                    UserDocumentId: this.documentEntity.UserDocumentId,
                    DocumentId: this.documentEntity.CertificateDocumentId,
                    CertificateDocumentName: this.documentEntity.CertificateDocumentName,
                    DocumentUrl: '/assests/Documents/',
                    UserId: this.globals.authData.UserId,
                    documentCount: 1,
                    UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName,
                    CertificateName: this.certificateName, LoginURL: '/login'
                }];
            //console.log(this.documentEntity.UserDocuments);
            this.globals.isLoading = true;
            this.ProfileService.addDocument(this.documentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted3 = false;
                if (file1_2) {
                    _this.ProfileService.uploadFileCertificate(fd, total, _this.globals.authData.UserId)
                        .then(function (data) {
                        $("#CertificateDocumentName").val(null);
                        $("#documentModal").hide();
                        swal({
                            type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        window.location.href = "/profile/" + window.btoa('document');
                    }, function (error) {
                        _this.btn_disable = false;
                        _this.globals.isLoading = false;
                        // this.globals.pageNotfound(error.error.code);
                    });
                }
                else {
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    //this.router.navigate(['/profile']);
                    window.location.href = "/profile/" + window.btoa('document');
                    //this.router.navigate(['/profile/' + window.btoa('document')]);
                }
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted1 = false;
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
                // this.globals.pageNotfound(error.error.code);
            });
        }
    };
    ProfileComponent.prototype.deletePersonalDocument = function (UserPersonal) {
        var _this = this;
        // alert(UserPersonal.UserDocumentId);
        debugger;
        /*let index = this.profileEntity.CertificateData[i].documents.indexOf(j);
                  if (index != -1) {
                    this.profileEntity.CertificateData[i].documents.splice(index, 1);
                  }*/
        swal({
            title: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.title,
            text: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                _this.globals.isLoading = true;
                debugger;
                _this.ProfileService.deletePersonalDocument(UserPersonal.UserDocumentId)
                    .then(function (data) {
                    var index = _this.UserPersonalDocuments.indexOf(UserPersonal);
                    if (index != -1) {
                        _this.UserPersonalDocuments.splice(index, 1);
                    }
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }, function (error) {
                    _this.globals.isLoading = false;
                    // if (error.text) {
                    //   swal({
                    //     //position: 'top-end',
                    //     type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //     title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //     text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   })
                    // }
                    if (error.error.message == "Already in use") {
                        swal({
                            //position: 'top-end',
                            type: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else {
                        _this.globals.pageNotfound(error.error.code);
                    }
                });
                //window.location.href = "/profile";
                //this.router.navigate(['/profile']);
            }
        });
    };
    ProfileComponent.prototype.deleteDocument = function (certificateDocument, certificates, value) {
        var _this = this;
        // alert(UserPersonal.UserDocumentId);
        debugger;
        /*let index = this.profileEntity.CertificateData[i].documents.indexOf(j);
                  if (index != -1) {
                    this.profileEntity.CertificateData[i].documents.splice(index, 1);
                  }*/
        swal({
            title: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.title,
            text: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.text,
            icon: "warning",
            type: this.globals.commonTranslationText.profilePage.alerts.deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        })
            .then(function (result) {
            if (result.value) {
                console.log(certificates);
                _this.globals.isLoading = true;
                debugger;
                _this.ProfileService.deleteDocument(certificateDocument.UserDocumentId, certificateDocument.UserDocumentCertificateMappingId)
                    .then(function (data) {
                    // if(value == 0)
                    // {
                    //   let index = certificates.OptionalDocuments.indexOf(certificateDocument);
                    //   if (index != -1) {
                    //     certificates.OptionalDocuments.splice(index, 1);
                    //   }
                    // }
                    // else{
                    //   let index = certificates.MandatoryDocuments.indexOf(certificateDocument);
                    //   if (index != -1) {
                    //     certificates.MandatoryDocuments.splice(index, 1);
                    //   }
                    // }
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.text,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    //this.router.navigate(['/profile/' + window.btoa('document')]);
                    window.location.href = "/profile/" + window.btoa('document');
                }, function (error) {
                    _this.globals.isLoading = false;
                    // if (error.text) {
                    //   swal({
                    //     //position: 'top-end',
                    //     type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //     title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //     text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   })
                    // }
                    if (error.error.message == "Already in use") {
                        swal({
                            //position: 'top-end',
                            type: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.text,
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                    else {
                        _this.globals.pageNotfound(error.error.code);
                    }
                });
                //this.router.navigate(['/profile']);
            }
        });
    };
    ProfileComponent.prototype.SearchFilter = function (SearchFilterForm) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        if (this.FilterEntity.OrderDateFrom != undefined) {
            var d = new Date(this.FilterEntity.OrderDateFrom);
            var OrderFromMonth = d.getMonth() + 1;
            var OrderFromDate = d.getDate();
            var OrderFromYear = d.getFullYear();
            this.FilterEntity.OrderDateFrom = OrderFromYear + '/' + (OrderFromMonth < 10 ? '0' + OrderFromMonth : '' + OrderFromMonth) + '/' + ((OrderFromDate < 10 ? '0' + OrderFromDate : '' + OrderFromDate));
        }
        if (this.FilterEntity.OrderDateTo != undefined) {
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
        this.FilterEntity.UserId = this.globals.authData.UserId;
        this.ProfileService.searchOrderHistory(this.FilterEntity)
            //.map(res => res.json())
            .then(function (data) {
            _this.orderHistorylist = data;
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
    ProfileComponent.prototype.clearData = function (SearchFilterForm) {
        var _this = this;
        this.globals.isLoading = true;
        this.ProfileService.getAllDefault(this.globals.authData.UserId)
            //.map(res => res.json())
            .then(function (data) {
            _this.FilterEntity = {};
            _this.countProgressBar();
            setTimeout(function () {
                $("#OrderDateFrom").val('');
                //  $('#OrderDateFrom').removeAttr('value');
            }, 100);
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
            _this.globals.isLoading = false;
            SearchFilterForm.form.markAsPristine();
        }, function (error) {
            _this.globals.isLoading = false;
            _this.globals.pageNotfound(error.error.code);
        });
    };
    ProfileComponent.prototype.certidocumentSubmit = function (CertificatedocumentForm) {
        var _this = this;
        debugger;
        //alert(this.certificatedocumentEntity.CertiDocumentId);
        this.submitted5 = true;
        var count = 0;
        // var certificate;
        // for (certificate of this.certificatedocument) {
        //   if (this.certificatedocumentEntity.CertiDocumentId == certificate.DocumentId) {
        //     this.certificatedocumentEntity.DocumentId = certificate.DocumentId;
        //     this.certificatedocumentEntity.CertificateDocumentId = certificate.CertificateDocumentId;
        //   }
        // }
        if (this.certificatedocumentEntity.CertiDocumentId != '' && this.certificatedocumentEntity.CertiDocumentId != undefined) {
            if (this.editDocumentValue == 1) {
                if (this.certificatedocumentEntity.CertificateName == "" || this.certificatedocumentEntity.CertificateName == null || this.certificatedocumentEntity.CertificateName == undefined) {
                    this.DocumentValid = true;
                    // count = 1;
                    swal({
                        type: 'warning',
                        title: 'Upload File',
                        text: 'Please upload a file or Select any one image',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
                else {
                    this.DocumentValid = false;
                }
            }
            else {
                if ((this.certificatedocumentEntity.CertificateName == "" || this.certificatedocumentEntity.CertificateName == null || this.certificatedocumentEntity.CertificateName == undefined)
                    && (this.certificatedocumentEntity.UserDocumentId == '')) {
                    this.DocumentValid = true;
                    // count = 1;
                    swal({
                        type: 'warning',
                        title: 'Upload File',
                        text: 'Please upload a file or Select any one image',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
                else {
                    this.DocumentValid = false;
                }
            }
        }
        if (CertificatedocumentForm.valid && !this.DocumentValid) {
            var getCurrentObj = CertificatedocumentForm.form.value;
            this.certificatedocumentEntity.ExpiryDate = getCurrentObj.ExpiryDate;
            var file1_3 = '';
            var fd = new FormData();
            var total = 0;
            this.certificatedocumentEntity.Document = [];
            if (this.certificatedocumentEntity.CertificateName != '' && this.certificatedocumentEntity.CertificateName != '') {
                file1_3 = this.elem.nativeElement.querySelector('#new_upload_file').files;
                if (file1_3 && file1_3.length != 0) {
                    total = file1_3.length;
                    for (var k = 0; k < file1_3.length; k++) {
                        var Images = Date.now() + '_' + file1_3[k]['name'];
                        fd.append('Document' + k, file1_3[k], Images);
                        this.certificatedocumentEntity.Document.push(Images);
                        this.certificatedocumentEntity.CertificateName = Images;
                    }
                }
                else {
                    fd.append('Document', null);
                    this.certificatedocumentEntity.Document = null;
                }
            }
            //CertificateName,UserName
            this.certificatedocumentEntity.UserDocuments = [{
                    UserDocumentId: this.certificatedocumentEntity.UserDocumentId,
                    DocumentId: this.certificatedocumentEntity.DocumentId,
                    UserCertificateId: this.certificatedocumentEntity.UserCertificateId,
                    CertificateDocumentId: this.certificatedocumentEntity.CertificateDocumentId,
                    UserDocumentCertificateMappingId: this.certificatedocumentEntity.UserDocumentCertificateMappingId,
                    CertificateDocumentName: this.certificatedocumentEntity.CertificateName,
                    DocumentUrl: 'assests/Documents/',
                    UserId: this.globals.authData.UserId,
                    documentCount: 1,
                    UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName,
                    CertificateName: this.certificateName, LoginURL: '/login',
                    ExpiryDate: this.certificatedocumentEntity.ExpiryDate
                }];
            console.log(this.certificatedocumentEntity);
            this.globals.isLoading = true;
            this.ProfileService.UpdateCertificateDocuments(this.certificatedocumentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted3 = false;
                if (_this.certificatedocumentEntity.UserDocumentId != 0) {
                    $("#new_upload_file").val(null);
                    //$("#certificateModal").hide();
                    _this.uploadDocumentPopup = false;
                    swal({
                        type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                        title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                        text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                    window.location.href = "/profile/" + window.btoa('document');
                }
                else {
                    if (file1_3) {
                        _this.ProfileService.uploadFileCertificate(fd, total, _this.globals.authData.UserId)
                            .then(function (data) {
                            $("#new_upload_file").val(null);
                            //$("#certificateModal").hide();
                            _this.uploadDocumentPopup = false;
                            swal({
                                type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                                title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                                text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                                showConfirmButton: false,
                                timer: 5000
                            });
                            //this.router.navigate(['/profile/' + window.btoa('document')]);
                            window.location.href = "/profile/" + window.btoa('document');
                            //this.router.navigate(['/profile']);	
                        }, function (error) {
                            _this.btn_disable = false;
                            _this.globals.isLoading = false;
                            _this.globals.pageNotfound(error.error.code);
                        });
                    }
                    else {
                        swal({
                            type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                            title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                            text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        //this.router.navigate(['/profile']);
                        window.location.href = "/profile/" + window.btoa('document');
                        //this.router.navigate(['/profile/' + window.btoa('document')]);
                    }
                }
            }, function (error) {
                _this.btn_disable = false;
                _this.submitted1 = false;
                _this.globals.isLoading = false;
                // swal({
                //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                //   showConfirmButton: false,
                //   timer: 4000
                // })
            });
        }
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, AuthService, ElementRef,
            ProfileService, PasswordService])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map