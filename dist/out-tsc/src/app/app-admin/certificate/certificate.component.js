import * as tslib_1 from "tslib";
import { Component, ViewChild } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { CertificateService } from "../services/certificate.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { CommonService } from "../services/common.service";
var CertificateComponent = /** @class */ (function () {
    function CertificateComponent(globals, router, route, CertificateService, CommonService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.CertificateService = CertificateService;
        this.CommonService = CommonService;
    }
    CertificateComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.globals.isLoading = false;
        this.certificateEntity = {};
        this.certificatePriceEntity = {};
        this.ReleaseValidDate = false;
        this.EffectiveValidDate = false;
        this.ValidUptoDate = false;
        this.smallDate = false;
        this.des_valid = false;
        this.submitted_passing = false;
        this.showRenewBlocks = false;
        this.submitted_renew = false;
        this.showDocsBlocks = true;
        this.showPercentageBlock = false;
        this.CertificateForCandidatelist = [];
        this.CertificateForCandidatelist1 = [];
        this.CertificateForCandidateMainlist = [];
        this.CertificateForProctorlist = [];
        this.CertificateForProctorlist1 = [];
        this.CertificateForProctorMainlist = [];
        this.CertificateList = [];
        this.currentDate = new Date();
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() + 1);
        this.minDate.setHours(0, 0, 0, 0);
        this.minDate1 = new Date();
        this.minDate1.setDate(this.minDate1.getDate());
        this.minDate1.setHours(0, 0, 0, 0);
        this.certificatePopup = false;
        this.checkCertificateNameExists = false;
        this.checkCertificateName = false;
        this.checkCertificate = {};
        setTimeout(function () {
            $(".form_date").datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
                startDate: "+1d",
                pickTime: false,
                format: "yyyy-mm-dd"
            });
            CKEDITOR.replace("Description", {
                height: "200",
                resize_enabled: "false",
                resize_maxHeight: "300",
                resize_maxWidth: "948",
                resize_minHeight: "300",
                resize_minWidth: "948",
                extraPlugins: "sourcedialog",
                //extraAllowedContent: 'style;*[id,rel](*){*}'
                removePlugins: "save,newpage,flash,about,iframe,language",
                extraAllowedContent: "span;ul;li;table;td;style;*[id];*(*);*{*}"
            });
            CKEDITOR.replace("Features", {
                height: "200",
                resize_enabled: "false",
                resize_maxHeight: "300",
                resize_maxWidth: "948",
                resize_minHeight: "300",
                resize_minWidth: "948",
                extraPlugins: "sourcedialog",
                //extraAllowedContent: 'style;*[id,rel](*){*}'
                removePlugins: "save,newpage,flash,about,iframe,language",
                extraAllowedContent: "span;ul;li;table;td;style;*[id];*(*);*{*}"
            });
            // CKEDITOR.replace('PriceComment', {
            //   height: '200',
            //   resize_enabled: 'false',
            //   resize_maxHeight: '300',
            //   resize_maxWidth: '948',
            //   resize_minHeight: '300',
            //   resize_minWidth: '948',
            //   extraPlugins: 'sourcedialog',
            //   //extraAllowedContent: 'style;*[id,rel](*){*}'
            //   removePlugins: 'save,newpage,flash,about,iframe,language',
            //   extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
            // });
        }, 1000);
        var id = this.route.snapshot.paramMap.get("id");
        $("#address-info-tab").addClass("disabled");
        $("#change-pwsd-tab").addClass("disabled");
        $("#document-tab").addClass("disabled");
        $("#document1-tab").addClass("disabled");
        if (id) {
        }
        else {
            $("#history-tab").addClass("disabled");
        }
        this.CertificateService.getAllDefault().then(function (data) {
            debugger;
            //this.documentList = data;
            var data1;
            var data2;
            data1 = data["default"];
            data2 = data["default"];
            // this.CertificateForCandidatelist = data;
            // this.CertificateForProctorlist = data;
            // var certificateForCandidateSelect =  {
            //   DocumentId:'',
            //   DocumentName: this.globals.adminTranslationText.certificate.form.OptionalDocumentForCandidate.select,
            //   Value: ""
            // }
            // this.CertificateForCandidatelist.push(certificateForCandidateSelect);
            _this.CertificateForCandidateMainlist = _this.CertificateForCandidatelist.concat(data1);
            //this.CertificateForCandidateMainlist1 = [...this.CertificateForCandidatelist1,...data1];
            _this.CertificateForCandidatelist = _this.CertificateForCandidatelist.concat(data1);
            _this.CertificateForCandidatelist1 = _this.CertificateForCandidatelist1.concat(data1);
            _this.CertificateForCandidatelist1 = _this.CertificateForCandidatelist1.filter(function (docs) {
                return docs.flag == 0;
            });
            // var certificateForCandidateSelect =  {
            //   DocumentId:'',
            //   DocumentName: this.globals.adminTranslationText.certificate.form.OptionalDocumentForCandidate.select,
            //   Value: ""
            // }
            // this.CertificateForCandidatelist1.push(certificateForCandidateSelect);
            var certificateSelect = {
                CertificateId: "",
                CertificateName: _this.globals.adminTranslationText
                    .certificateCategoryMapping.form.certificate.select,
                Value: ""
            };
            _this.CertificateList.push(certificateSelect);
            _this.CertificateList = _this.CertificateList.concat(data["Certificates"]);
            console.log(_this.CertificateList);
            _this.CertificateForProctorMainlist = _this.CertificateForCandidatelist.concat(data2);
            _this.CertificateForProctorlist = _this.CertificateForProctorlist.concat(data2);
            _this.CertificateForProctorlist1 = _this.CertificateForProctorlist.concat(data2);
            //console.log(data);
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
            window.location.href = "pagenotfound/" + window.btoa(error.error.code);
            _this.globals.isLoading = true;
        });
        setTimeout(function () {
            $("select").selectpicker();
        }, 5000);
        //  let id = window.atob(this.route.snapshot.paramMap.get('id'));
        if (id) {
            debugger;
            id = window.atob(id);
            this.globals.isLoading = true;
            this.CertificateService.getById(id).then(function (data) {
                console.log(data);
                _this.certificateEntity = data;
                _this.certificateEntity.ReleaseDate = new Date(_this.certificateEntity.ReleaseDate);
                _this.newDate = new Date(_this.certificateEntity.ReleaseDate);
                _this.certificateEntity.ValidUpto = new Date(_this.certificateEntity.ValidUpto);
                _this.newDate1 = new Date(_this.certificateEntity.ValidUpto);
                console.log(_this.certificateEntity);
                if (data["IsActive"] == 0) {
                    _this.certificateEntity.IsActive = 0;
                }
                else {
                    _this.certificateEntity.IsActive = 1;
                }
                if (data["IsRenewable"] == 0) {
                    _this.certificateEntity.IsRenewable = 0;
                }
                else {
                    _this.certificateEntity.IsRenewable = 1;
                    _this.showRenewBlocks = true;
                }
                if (data["PassingPerCategory"] == 0) {
                    _this.certificateEntity.PassingPerCategory = 0;
                }
                else {
                    _this.certificateEntity.PassingPerCategory = 1;
                    _this.showPercentageBlock = true;
                }
                if (data["HasOneShotAssessment"] == 0) {
                    _this.certificateEntity.HasOneShotAssessment = 0;
                }
                else {
                    _this.certificateEntity.HasOneShotAssessment = 1;
                }
                if (data["HasSubCertificate"] == 0) {
                    _this.certificateEntity.HasSubCertificate = 0;
                }
                else {
                    _this.certificateEntity.HasSubCertificate = 1;
                }
                if (data["HasProctor"] == 0) {
                    _this.certificateEntity.HasProctor = 0;
                    _this.showDocsBlocks = false;
                }
                else {
                    _this.certificateEntity.HasProctor = 1;
                    _this.showDocsBlocks = true;
                }
                if (data["HasDisplayCandidateInfo"] == 0) {
                    _this.certificateEntity.HasDisplayCandidateInfo = 0;
                }
                else {
                    _this.certificateEntity.HasDisplayCandidateInfo = 1;
                }
                if (data["HasDisplayProctorInfo"] == 0) {
                    _this.certificateEntity.HasDisplayProctorInfo = 0;
                }
                else {
                    _this.certificateEntity.HasDisplayProctorInfo = 1;
                }
                _this.gridData = _this.certificateEntity["CertificateHistory"];
                _this.CertificatePricingHistory = _this.certificateEntity["CertificateHistory"];
                console.log(_this.CertificatePricingHistory);
                CKEDITOR.instances.Description.setData(_this.certificateEntity.Description);
                CKEDITOR.instances.PriceComment.setData(_this.certificateEntity.PriceComment);
                CKEDITOR.instances.Features.setData(_this.certificateEntity.Features);
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
                window.location.href =
                    "pagenotfound/" + window.btoa(error.error.code);
                _this.globals.isLoading = true;
            });
            // $('#CertificateDocuments').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            //   alert($('#CertificateDocuments').val(clickedIndex));
            //   //alert(isSelected);
            //   //if(!isSelected)
            //     //alert($('#CertificateDocuments').val())
            // });
            // $("#MandatoryCertificateForCandidate").on("changed.bs.select", this.Optionalcertichange(1),function(e, clickedIndex,newValue, oldValue) {
            //   var selectedD = $(this).find('option').eq(clickedIndex).val();
            //   var documentId = selectedD.split(':')[1].replace(/'/g, '');
            // alert(documentId);
            //   alert('selectedD: ' + selectedD + '  newValue: ' + newValue );
            //this.abc1(documentId);
            // this.CertificateService.updateDocument(documentId,id)
            //   .then((data) => {
            //   },
            //     (error) => {
            //     });
            // });
        }
        else {
            this.certificateEntity = {};
            this.certificateEntity.CertificateId = 0;
            this.certificateEntity.CertificateDocuments = "";
            this.certificateEntity.USDPrice = null;
            this.certificateEntity.INRPrice = null;
            this.certificateEntity.EURPrice = null;
            this.certificateEntity.IsRenewable = 0;
            this.certificateEntity.PassingPerCategory = 0;
            this.certificateEntity.IsActive = 1;
            this.certificateEntity.HasSubCertificate = 1;
            this.certificateEntity.HasProctor = 1;
            this.certificateEntity.HasDisplayCandidateInfo = 1;
            this.certificateEntity.HasDisplayProctorInfo = 1;
            this.certificateEntity.HasOneShotAssessment = 0;
        }
    };
    CertificateComponent.prototype.overlay_close = function () {
        this.certificatePopup = false;
        $(".overlay").css("display", "none");
    };
    CertificateComponent.prototype.close = function () {
        this.certificatePopup = false;
    };
    CertificateComponent.prototype.changeActive = function () {
        this.ValidUptoDate = false;
        this.newDate1 = new Date(this.certificateEntity.ValidUpto);
    };
    CertificateComponent.prototype.oneShotAssessment = function (HasOneShotAssessment) {
        //alert(HasOneShotAssessment);
        if (HasOneShotAssessment == true) {
            this.certificateEntity.HasSubCertificate = 0;
            $("#HasSubCertificate").removeClass("k-widget k-switch k-switch-on");
            $("#HasSubCertificate").addClass("k-widget k-switch k-switch-off");
            $("#HasSubCertificate").attr("disabled", true);
            this.certificateEntity.PassingPerCategory = 1;
            $("#PassingPerCategory").removeClass("k-widget k-switch k-switch-off");
            $("#PassingPerCategory").addClass("k-widget k-switch k-switch-on");
            $("#PassingPerCategory").attr("disabled", true);
            this.submitted2 = false;
            this.submitted_passing = false;
            this.showPercentageBlock = true;
            this.certificateEntity.CertificatePassingPercentage = "";
        }
        else {
            this.certificateEntity.HasSubCertificate = 1;
            $("#HasSubCertificate").removeClass("k-widget k-switch k-switch-off");
            $("#HasSubCertificate").addClass("k-widget k-switch k-switch-on");
            $("#HasSubCertificate").attr("disabled", false);
            this.certificateEntity.PassingPerCategory = 0;
            $("#PassingPerCategory").removeClass("k-widget k-switch k-switch-on");
            $("#PassingPerCategory").addClass("k-widget k-switch k-switch-off");
            $("#PassingPerCategory").attr("disabled", false);
            this.submitted2 = false;
            this.showPercentageBlock = false;
            this.certificateEntity.CertificatePassingPercentage = "";
        }
        //alert(this.certificateEntity.HasSubCertificate);
    };
    CertificateComponent.prototype.passingPercentageEligibilityCriteriaCheck = function (value) {
        debugger;
        if (value == 0)
            var passingPercentageCheck = parseInt($("#EligibilityCriteria").val());
        else
            var passingPercentageCheck = parseInt($("#CertificatePassingPercentage").val());
        if (passingPercentageCheck > 100) {
            if (value == 0)
                this.eligibilityCriteriaError = true;
            else
                this.passingPercentageError = true;
        }
        else {
            if (value == 0)
                this.eligibilityCriteriaError = false;
            else
                this.passingPercentageError = false;
        }
    };
    CertificateComponent.prototype.showRenewPrices = function () {
        if (this.certificateEntity.IsRenewable == true) {
            this.showRenewBlocks = true;
            this.submitted_renew = false;
            this.certificateEntity.RenewalUSDPrice = "";
        }
        else {
            this.showRenewBlocks = false;
        }
    };
    CertificateComponent.prototype.showProctorDocs = function () {
        if (this.certificateEntity.HasProctor == true) {
            this.showDocsBlocks = true;
            //this.certificateEntity.RenewalUSDPrice = '';
        }
        else {
            this.showDocsBlocks = false;
        }
    };
    CertificateComponent.prototype.showPercentage = function (certificateForm4) {
        debugger;
        if (this.certificateEntity.PassingPerCategory == true) {
            this.submitted_passing = false;
            this.showPercentageBlock = true;
            //this.certificateEntity.CertificatePassingPercentage = null;
            // this.passingPercentageError = false;
            // certificateForm4.form.markAsPristine();
        }
        else {
            this.showPercentageBlock = false;
        }
    };
    CertificateComponent.prototype.Optionalcertichange = function (OptionalCertificateForCandidate) {
        debugger;
        for (var j = 0; j < this.CertificateForCandidateMainlist.length; j++) {
            var count = 0;
            for (var i = 0; i < OptionalCertificateForCandidate.length; i++) {
                if (OptionalCertificateForCandidate[i] ==
                    this.CertificateForCandidateMainlist[j].DocumentId) {
                    count++;
                }
            }
            if (count > 0) {
                this.CertificateForCandidateMainlist[j].flag = 1;
            }
            else {
                this.CertificateForCandidateMainlist[j].flag = 0;
            }
        }
        var CertificateForCandidatelist1 = this.CertificateForCandidateMainlist.slice();
        this.CertificateForCandidatelist1 = [];
        this.CertificateForCandidatelist1 = CertificateForCandidatelist1.slice();
        this.CertificateForCandidatelist1 = this.CertificateForCandidatelist1.filter(function (docs) {
            return docs.flag == 0;
        });
    };
    CertificateComponent.prototype.Mandatorycertichange = function (MandatoryCertificateForCandidate) {
        debugger;
        for (var j = 0; j < this.CertificateForCandidateMainlist.length; j++) {
            var count = 0;
            for (var i = 0; i < MandatoryCertificateForCandidate.length; i++) {
                if (MandatoryCertificateForCandidate[i] ==
                    this.CertificateForCandidateMainlist[j].DocumentId) {
                    count++;
                }
            }
            if (count > 0) {
                this.CertificateForCandidateMainlist[j].flag = 1;
            }
            else {
                this.CertificateForCandidateMainlist[j].flag = 0;
            }
        }
        var CertificateForCandidatelist = this.CertificateForCandidateMainlist.slice();
        this.CertificateForCandidatelist = [];
        this.CertificateForCandidatelist = CertificateForCandidatelist.slice();
        this.CertificateForCandidatelist = this.CertificateForCandidatelist.filter(function (docs) {
            return docs.flag == 0;
        });
    };
    CertificateComponent.prototype.Proctorcertichange = function (OptionalCertificateForProctor) {
        debugger;
        for (var j = 0; j < this.CertificateForProctorMainlist.length; j++) {
            var count = 0;
            for (var i = 0; i < OptionalCertificateForProctor.length; i++) {
                if (OptionalCertificateForProctor[i] ==
                    this.CertificateForProctorMainlist[j].DocumentId) {
                    count++;
                }
            }
            if (count > 0) {
                this.CertificateForProctorMainlist[j].flag = 1;
            }
            else {
                this.CertificateForProctorMainlist[j].flag = 0;
            }
        }
        var CertificateForProctorlist1 = this.CertificateForCandidateMainlist.slice();
        this.CertificateForProctorlist1 = [];
        this.CertificateForProctorlist1 = CertificateForProctorlist1.slice();
        this.CertificateForProctorlist1 = this.CertificateForProctorlist1.filter(function (docs) {
            return docs.flag == 0;
        });
    };
    CertificateComponent.prototype.Proctorcertichange1 = function (MandatoryCertificateForProctor) {
        debugger;
        for (var j = 0; j < this.CertificateForProctorMainlist.length; j++) {
            var count = 0;
            for (var i = 0; i < MandatoryCertificateForProctor.length; i++) {
                if (MandatoryCertificateForProctor[i] ==
                    this.CertificateForProctorMainlist[j].DocumentId) {
                    count++;
                }
            }
            if (count > 0) {
                this.CertificateForProctorMainlist[j].flag = 1;
            }
            else {
                this.CertificateForProctorMainlist[j].flag = 0;
            }
        }
        var CertificateForProctorlist = this.CertificateForCandidateMainlist.slice();
        this.CertificateForProctorlist = [];
        this.CertificateForProctorlist = CertificateForProctorlist.slice();
        this.CertificateForProctorlist = this.CertificateForProctorlist.filter(function (docs) {
            return docs.flag == 0;
        });
    };
    CertificateComponent.prototype.addCertificateSubmit1 = function (certificateForm1) {
        this.submitted = true;
        if (this.certificateEntity.ReleaseDate != undefined) {
            var d = new Date(this.certificateEntity.ReleaseDate);
            var ReleaseDateMonth = d.getMonth() + 1;
            var ReleaseDateDate = d.getDate();
            var ReleaseDateYear = d.getFullYear();
            this.certificateEntity.ReleaseDate =
                ReleaseDateYear +
                    "/" +
                    (ReleaseDateMonth < 10
                        ? "0" + ReleaseDateMonth
                        : "" + ReleaseDateMonth) +
                    "/" +
                    (ReleaseDateDate < 10 ? "0" + ReleaseDateDate : "" + ReleaseDateDate);
            this.ReleaseValidDate = false;
        }
        else {
            this.ReleaseValidDate = true;
        }
        if (this.certificateEntity.ValidUpto != undefined) {
            var d1 = new Date(this.certificateEntity.ValidUpto);
            var ValidUptoMonth = d1.getMonth() + 1;
            var ValidUptoDate = d1.getDate();
            var ValidUptoYear = d1.getFullYear();
            this.certificateEntity.ValidUpto =
                ValidUptoYear +
                    "/" +
                    (ValidUptoMonth < 10 ? "0" + ValidUptoMonth : "" + ValidUptoMonth) +
                    "/" +
                    (ValidUptoDate < 10 ? "0" + ValidUptoDate : "" + ValidUptoDate);
            this.ValidUptoDate = false;
        }
        else {
            this.ValidUptoDate = true;
        }
        // if(this.certificateEntity.ReleaseDate != undefined && this.certificateEntity.ValidUpto != undefined){
        if (this.certificateEntity.ReleaseDate >= this.certificateEntity.ValidUpto) {
            this.smallDate = true;
        }
        else {
            this.smallDate = false;
        }
        debugger;
        if (this.checkCertificateNameExists) {
            this.checkCertificateName = true;
        }
        else {
            this.checkCertificateName = false;
        }
        //}
        var id = this.route.snapshot.paramMap.get("id");
        if (id) {
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (certificateForm1.valid &&
            !this.ReleaseValidDate &&
            !this.ValidUptoDate &&
            !this.smallDate &&
            !this.checkCertificateName) {
            $("#personal-info-tab").removeClass("active");
            $("#personal-info-tab").addClass("complete");
            $("#personal-info-tab").addClass("disabled");
            $("#address-info-tab").removeClass("disabled");
            $("#address-info-tab").addClass("active");
            $("#personal-info").removeClass("show active");
            $("#address-info").addClass("show active");
            // $("#suggestedproctorAddress").hide();
            // $("#newProctorAddress").show();
        }
    };
    CertificateComponent.prototype.checktheCertificateName = function (e) {
        var _this = this;
        var getCertificateName = e.target.value;
        if (getCertificateName != "") {
            this.checkCertificate.CertificateName = getCertificateName;
            this.checkCertificate.CertificateId = 0;
            this.CertificateService.checkCertificateName(this.checkCertificate).then(function (data) {
                _this.checkCertificateNameExists = false;
            }, function (error) {
                _this.checkCertificateNameExists = true;
            });
        }
    };
    CertificateComponent.prototype.addCertificateSubmit2 = function (certificateForm2) {
        //this.submitted1 = true;
        debugger;
        this.certificateEntity.Description = CKEDITOR.instances.Description.getData();
        var Description = CKEDITOR.instances.Description.editable().getText();
        if (this.certificateEntity.Description != "" &&
            this.certificateEntity.Description != undefined) {
            this.des_valid = false;
            $("#Description").removeClass("error_ckeditor");
        }
        else {
            this.des_valid = true;
            $("#Description").addClass("error_ckeditor");
        }
        if (Description.length < 10 && this.certificateEntity.Description != "") {
            this.Description_valid = true;
            $("#Description").addClass("error_ckeditor");
        }
        else {
            this.Description_valid = false;
        }
        if (certificateForm2.valid && !this.des_valid && !this.Description_valid) {
            $("#address-info-tab").removeClass("active");
            $("#address-info-tab").addClass("complete");
            $("#address-info-tab").addClass("disabled");
            $("#change-pwsd-tab").removeClass("disabled");
            $("#change-pwsd-tab").addClass("active");
            $("#address-info").removeClass("show active");
            $("#change-pwsd").addClass("show active");
        }
    };
    CertificateComponent.prototype.addCertificateSubmit3 = function (certificateForm3) {
        this.submitted1 = true;
        debugger;
        var id = this.route.snapshot.paramMap.get("id");
        if (id) {
            if (this.certificateEntity.HasSubCertificate == true) {
                this.certificateEntity.HasSubCertificate = 1;
            }
            else {
                this.certificateEntity.HasSubCertificate = 0;
            }
            this.submitted1 = false;
        }
        else {
            this.submitted1 = true;
        }
        if (certificateForm3.valid) {
            $("#change-pwsd-tab").removeClass("active");
            $("#change-pwsd-tab").addClass("complete");
            $("#change-pwsd-tab").addClass("disabled");
            $("#document-tab").removeClass("disabled");
            $("#document-tab").addClass("active");
            $("#change-pwsd").removeClass("show active");
            $("#document").addClass("show active");
        }
    };
    CertificateComponent.prototype.addCertificateSubmit4 = function (certificateForm4) {
        this.submitted2 = true;
        this.submitted_passing = true;
        this.submitted_renew = true;
        debugger;
        var id = this.route.snapshot.paramMap.get("id");
        if (id) {
            if (this.certificateEntity.IsRenewable == true) {
                this.certificateEntity.IsRenewable = 1;
            }
            else {
                this.certificateEntity.IsRenewable = 0;
            }
            this.submitted2 = false;
        }
        else {
            this.submitted2 = true;
        }
        if (certificateForm4.valid &&
            !this.eligibilityCriteriaError &&
            !this.passingPercentageError) {
            $("#document-tab").removeClass("active");
            $("#document-tab").addClass("complete");
            $("#document-tab").addClass("disabled");
            $("#document1-tab").removeClass("disabled");
            $("#document1-tab").addClass("active");
            $("#document").removeClass("show active");
            $("#document1").addClass("show active");
        }
    };
    CertificateComponent.prototype.addCertificateSubmit5 = function (certificateForm5) {
        var _this = this;
        this.submitted3 = true;
        debugger;
        this.certificateEntity.CertificateDocumentsForCandidate = [];
        var Candidatelist;
        if (this.certificateEntity.MandatoryCertificateForCandidate) {
            for (var _i = 0, _a = this.certificateEntity
                .MandatoryCertificateForCandidate; _i < _a.length; _i++) {
                Candidatelist = _a[_i];
                if (Candidatelist) {
                    var item1 = { DocumentId: Candidatelist, IsMandatory: "1" };
                    this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
                }
            }
        }
        if (this.certificateEntity.OptionalCertificateForCandidate) {
            var Optional;
            for (var _b = 0, _c = this.certificateEntity.OptionalCertificateForCandidate; _b < _c.length; _b++) {
                Optional = _c[_b];
                if (Optional) {
                    var item1 = { DocumentId: Optional, IsMandatory: "0" };
                    this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
                }
            }
        }
        this.certificateEntity.CertificateDocumentsForProctor = [];
        var MandatoryProctorist;
        if (this.certificateEntity.MandatoryCertificateForProctor) {
            for (var _d = 0, _e = this.certificateEntity
                .MandatoryCertificateForProctor; _d < _e.length; _d++) {
                MandatoryProctorist = _e[_d];
                if (MandatoryProctorist) {
                    var item1 = { DocumentId: MandatoryProctorist, IsMandatory: "1" };
                    this.certificateEntity.CertificateDocumentsForProctor.push(item1);
                }
            }
        }
        if (this.certificateEntity.OptionalCertificateForProctor) {
            var OptionalProctorist;
            for (var _f = 0, _g = this.certificateEntity
                .OptionalCertificateForProctor; _f < _g.length; _f++) {
                OptionalProctorist = _g[_f];
                if (OptionalProctorist) {
                    var item1 = { DocumentId: OptionalProctorist, IsMandatory: "0" };
                    this.certificateEntity.CertificateDocumentsForProctor.push(item1);
                }
            }
        }
        var id = this.route.snapshot.paramMap.get("id");
        if (id) {
            if (this.certificateEntity.IsActive == true) {
                this.certificateEntity.IsActive = 1;
            }
            else {
                this.certificateEntity.IsActive = 0;
            }
            if (this.certificateEntity.HasProctor == true) {
                this.certificateEntity.HasProctor = 1;
            }
            else {
                this.certificateEntity.HasProctor = 0;
            }
            if (this.certificateEntity.HasDisplayCandidateInfo == true) {
                this.certificateEntity.HasDisplayCandidateInfo = 1;
            }
            else {
                this.certificateEntity.HasDisplayCandidateInfo = 0;
            }
            if (this.certificateEntity.HasDisplayProctorInfo == true) {
                this.certificateEntity.HasDisplayProctorInfo = 1;
            }
            else {
                this.certificateEntity.HasDisplayProctorInfo = 0;
            }
            this.submitted3 = false;
        }
        else {
            this.submitted3 = true;
        }
        if (certificateForm5.valid) {
            this.certificateEntity.UserId = this.globals.authData.UserId;
            this.CertificateId = this.certificateEntity.CertificateId;
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.CertificateService.addUpdate(this.certificateEntity).then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted3 = false;
                // this.certificateEntity = {};
                //certificateForm.form.markAsPristine();
                _this.certificateEntity.CertificateId = data;
                _this.CertificateId = data;
                //console.log(this.certificateEntity.CertificateId);
                //let id = this.route.snapshot.paramMap.get('id');
                if (id || _this.CertificateId != 0) {
                    swal({
                        type: _this.globals.adminTranslationText.certificate.form.alerts
                            .update.type,
                        title: _this.globals.adminTranslationText.certificate.form.alerts
                            .update.title,
                        text: _this.globals.adminTranslationText.certificate.form.alerts
                            .update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.certificate.form.alerts
                            .add.type,
                        title: _this.globals.adminTranslationText.certificate.form.alerts
                            .add.title,
                        text: _this.globals.adminTranslationText.certificate.form.alerts
                            .add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                //this.router.navigate(['/admin/certificate/list']);
                $("#document1-tab").removeClass("active");
                $("#document1-tab").addClass("complete");
                $("#document1-tab").addClass("disabled");
                $("#history-tab").removeClass("disabled");
                $("#history-tab").addClass("active");
                $("#document1").removeClass("show active");
                $("#history").addClass("show active");
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
                window.location.href =
                    "pagenotfound/" + window.btoa(error.error.code);
                _this.globals.isLoading = true;
            });
        }
    };
    CertificateComponent.prototype.pricePopup = function () {
        this.certificatePriceEntity = {};
        this.certificatePriceEntity.CertificatePricingHistoryId = 0;
        this.certificatePopup = true;
        // $("#price_popup").modal("show");
        this.btn_disable1 = false;
        this.submitted4 = false;
        this.CommentValid = false;
        this.EffectiveValidDate = false;
    };
    CertificateComponent.prototype.editPrice = function (obj) {
        debugger;
        this.certificatePriceEntity = obj;
        this.certificatePriceEntity.EffectiveDate = new Date(this.certificatePriceEntity.EffectiveDate);
        this.certificatePopup = true;
        // $("#price_popup").modal("show");
        this.btn_disable1 = false;
        this.submitted4 = false;
        this.CommentValid = false;
        this.EffectiveValidDate = false;
    };
    CertificateComponent.prototype.addUpdateCertificatePrice = function (certificatePriceForm) {
        var _this = this;
        debugger;
        //this.submitted4 = true;
        if (this.certificatePriceEntity.EffectiveDate != undefined) {
            var d = new Date(this.certificatePriceEntity.EffectiveDate);
            var EffectiveDateMonth = d.getMonth() + 1;
            var EffectiveDate = d.getDate();
            var EffectiveDateYear = d.getFullYear();
            this.certificatePriceEntity.EffectiveDate =
                EffectiveDateYear +
                    "-" +
                    (EffectiveDateMonth < 10
                        ? "0" + EffectiveDateMonth
                        : "" + EffectiveDateMonth) +
                    "-" +
                    (EffectiveDate < 10 ? "0" + EffectiveDate : "" + EffectiveDate);
            this.EffectiveValidDate = false;
        }
        else {
            this.EffectiveValidDate = true;
        }
        //this.certificatePriceEntity.CertificatePricingHistoryId = 0;
        // let getCurrentObj = certificatePriceForm.form.value;
        // this.certificatePriceEntity.EffectiveDate = getCurrentObj.EffectiveDate;//$("#EffectiveDate").val();
        // if (this.certificatePriceEntity.EffectiveDate == "" || this.certificatePriceEntity.EffectiveDate == null || this.certificatePriceEntity.EffectiveDate == undefined || this.certificatePriceEntity.EffectiveDate=="NaN/NaN/NaN") {
        //   this.EffectiveValidDate = true;
        // } else {
        //   this.EffectiveValidDate = false;
        // }
        // this.certificatePriceEntity.PriceComment = CKEDITOR.instances.Description.getData();
        // var PriceComment = CKEDITOR.instances.Description.editable().getText();
        if (this.certificatePriceEntity.PriceComment != undefined) {
            var PriceComment = this.certificatePriceEntity.PriceComment;
            if (PriceComment.length < 10 &&
                this.certificatePriceEntity.PriceComment != "") {
                this.CommentValid = true;
            }
            else {
                this.CommentValid = false;
            }
        }
        if (this.certificatePriceEntity.CertificatePricingHistoryId > 0) {
            this.submitted4 = false;
        }
        else {
            this.submitted4 = true;
        }
        if (certificatePriceForm.valid &&
            !this.EffectiveValidDate &&
            !this.CommentValid) {
            this.certificatePriceEntity.UserId = this.globals.authData.UserId;
            if (this.CertificateId == undefined || this.CertificateId == null) {
                this.CertificateId = window.atob(this.route.snapshot.paramMap.get("id"));
            }
            this.certificatePriceEntity.CertificateId = this.CertificateId;
            console.log(this.certificatePriceEntity);
            this.btn_disable1 = true;
            this.globals.isLoading = true;
            this.CertificateService.addUpdateCertificatePrice(this.certificatePriceEntity).then(function (data) {
                _this.certificatePopup = false;
                _this.globals.isLoading = false;
                _this.btn_disable1 = false;
                _this.submitted4 = false;
                //this.certificateEntity.CertificatePricingHistoryId = data;
                //this.CertificatePricingHistory = [...this.CertificatePricingHistory, ...data['Categories']];
                //certificateForm.form.markAsPristine();
                //let id = this.route.snapshot.paramMap.get('id');
                if (_this.certificatePriceEntity.CertificatePricingHistoryId > 0) {
                    swal({
                        type: _this.globals.adminTranslationText.certificate.priceForm
                            .alerts.update.type,
                        title: _this.globals.adminTranslationText.certificate.priceForm
                            .alerts.update.title,
                        text: _this.globals.adminTranslationText.certificate.priceForm
                            .alerts.update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.certificate.priceForm
                            .alerts.add.type,
                        title: _this.globals.adminTranslationText.certificate.priceForm
                            .alerts.add.title,
                        text: _this.globals.adminTranslationText.certificate.priceForm
                            .alerts.add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    _this.certificatePrice = {
                        CertificatePricingHistoryId: data,
                        EffectiveDate: _this.certificatePriceEntity.EffectiveDate,
                        PriceComment: _this.certificatePriceEntity.PriceComment,
                        USDPrice: _this.certificatePriceEntity.USDPrice,
                        INRPrice: _this.certificatePriceEntity.INRPrice,
                        EURPrice: _this.certificatePriceEntity.EURPrice
                    };
                    console.log(_this.certificatePrice);
                    _this.CertificatePricingHistory.push(_this.certificatePrice);
                    _this.CertificatePricingHistory = _this.CertificatePricingHistory.slice();
                    _this.gridData = _this.CertificatePricingHistory;
                }
                //$('#price_popup').modal('toggle');
                _this.certificatePopup = false;
                _this.certificatePriceEntity = {};
                //this.router.navigate(['/admin/certificate/list']);
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
                window.location.href =
                    "pagenotfound/" + window.btoa(error.error.code);
                _this.globals.isLoading = true;
            });
        }
    };
    CertificateComponent.prototype.previous = function () {
        $("#address-info-tab").removeClass("complete");
        $("#address-info-tab").removeClass("active");
        $("#address-info-tab").addClass("disabled");
        $("#personal-info-tab").removeClass("disabled");
        $("#personal-info-tab").removeClass("complete");
        $("#personal-info-tab").addClass("active");
        $("#address-info").removeClass("show active");
        $("#personal-info").addClass("show active");
        // $("#change-pwsd-tab").addClass('disabled');
        // $("#document-tab").addClass('disabled');
        // $("#document1-tab").addClass('disabled');
        // $("#history-tab").addClass('disabled');
    };
    CertificateComponent.prototype.previous1 = function () {
        $("#change-pwsd-tab").removeClass("complete");
        $("#change-pwsd-tab").removeClass("active");
        $("#change-pwsd-tab").addClass("disabled");
        $("#address-info-tab").removeClass("disabled");
        $("#address-info-tab").removeClass("complete");
        $("#address-info-tab").addClass("active");
        $("#change-pwsd").removeClass("show active");
        $("#address-info").addClass("show active");
        // $("#personal-info-tab").addClass('disabled');
        // $("#document-tab").addClass('disabled');
        // $("#document1-tab").addClass('disabled');
        // $("#history-tab").addClass('disabled');
    };
    CertificateComponent.prototype.previous2 = function () {
        $("#document-tab").removeClass("complete");
        $("#document-tab").removeClass("active");
        $("#document-tab").addClass("disabled");
        $("#change-pwsd-tab").removeClass("disabled");
        $("#change-pwsd-tab").removeClass("complete");
        $("#change-pwsd-tab").addClass("active");
        $("#document").removeClass("show active");
        $("#change-pwsd").addClass("show active");
        // $("#personal-info-tab").addClass('disabled');
        // $("#address-info-tab").addClass('disabled');
        // $("#document1-tab").addClass('disabled');
        // $("#history-tab").addClass('disabled');
    };
    CertificateComponent.prototype.previous3 = function () {
        $("#document1-tab").removeClass("complete");
        $("#document1-tab").removeClass("active");
        $("#document1-tab").addClass("disabled");
        $("#document-tab").removeClass("disabled");
        $("#document-tab").removeClass("complete");
        $("#document-tab").addClass("active");
        $("#document1").removeClass("show active");
        $("#document").addClass("show active");
        // $("#personal-info-tab").addClass('disabled');
        // $("#address-info-tab").addClass('disabled');
        // $("#change-pwsd-tab").addClass('disabled');
        // $("#history-tab").addClass('disabled');
    };
    CertificateComponent.prototype.previous4 = function () {
        $("#history-tab").removeClass("active");
        $("#history-tab").removeClass("active");
        $("#history-tab").addClass("disabled");
        $("#document1-tab").removeClass("disabled");
        $("#document1-tab").removeClass("complete");
        $("#document1-tab").addClass("active");
        $("#history").removeClass("show active");
        $("#document1").addClass("show active");
        // $("#personal-info-tab").addClass('disabled');
        // $("#address-info-tab").addClass('disabled');
        // $("#change-pwsd-tab").addClass('disabled');
        // $("#document-tab").addClass('disabled');
    };
    CertificateComponent.prototype.addUpdate = function (certificateForm) {
        var _this = this;
        debugger;
        if (this.certificateEntity.ReleaseDate != undefined) {
            var d = new Date(this.certificateEntity.ReleaseDate);
            var ReleaseDateMonth = d.getMonth() + 1;
            var ReleaseDateDate = d.getDate();
            var ReleaseDateYear = d.getFullYear();
            this.certificateEntity.ReleaseDate =
                ReleaseDateYear +
                    "/" +
                    (ReleaseDateMonth < 10
                        ? "0" + ReleaseDateMonth
                        : "" + ReleaseDateMonth) +
                    "/" +
                    (ReleaseDateDate < 10 ? "0" + ReleaseDateDate : "" + ReleaseDateDate);
            this.ReleaseValidDate = false;
        }
        else {
            this.ReleaseValidDate = true;
        }
        if (this.certificateEntity.ValidUpto != undefined) {
            var d1 = new Date(this.certificateEntity.ValidUpto);
            var ValidUptoMonth = d1.getMonth() + 1;
            var ValidUptoDate = d1.getDate();
            var ValidUptoYear = d1.getFullYear();
            this.certificateEntity.ValidUpto =
                ValidUptoYear +
                    "/" +
                    (ValidUptoMonth < 10 ? "0" + ValidUptoMonth : "" + ValidUptoMonth) +
                    "/" +
                    (ValidUptoDate < 10 ? "0" + ValidUptoDate : "" + ValidUptoDate);
            this.ValidUptoDate = false;
        }
        else {
            this.ValidUptoDate = true;
        }
        this.certificateEntity.CertificateDocumentsForCandidate = [];
        var Candidatelist;
        if (this.certificateEntity.MandatoryCertificateForCandidate) {
            for (var _i = 0, _a = this.certificateEntity
                .MandatoryCertificateForCandidate; _i < _a.length; _i++) {
                Candidatelist = _a[_i];
                if (Candidatelist) {
                    var item1 = { DocumentId: Candidatelist, IsMandatory: "1" };
                    this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
                }
            }
        }
        if (this.certificateEntity.OptionalCertificateForCandidate) {
            var Optional;
            for (var _b = 0, _c = this.certificateEntity.OptionalCertificateForCandidate; _b < _c.length; _b++) {
                Optional = _c[_b];
                if (Optional) {
                    var item1 = { DocumentId: Optional, IsMandatory: "0" };
                    this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
                }
            }
        }
        this.certificateEntity.CertificateDocumentsForProctor = [];
        var MandatoryProctorist;
        if (this.certificateEntity.MandatoryCertificateForProctor) {
            for (var _d = 0, _e = this.certificateEntity
                .MandatoryCertificateForProctor; _d < _e.length; _d++) {
                MandatoryProctorist = _e[_d];
                if (MandatoryProctorist) {
                    var item1 = { DocumentId: MandatoryProctorist, IsMandatory: "1" };
                    this.certificateEntity.CertificateDocumentsForProctor.push(item1);
                }
            }
        }
        if (this.certificateEntity.OptionalCertificateForProctor) {
            var OptionalProctorist;
            for (var _f = 0, _g = this.certificateEntity
                .OptionalCertificateForProctor; _f < _g.length; _f++) {
                OptionalProctorist = _g[_f];
                if (OptionalProctorist) {
                    var item1 = { DocumentId: OptionalProctorist, IsMandatory: "0" };
                    this.certificateEntity.CertificateDocumentsForProctor.push(item1);
                }
            }
        }
        var id = window.atob(this.route.snapshot.paramMap.get("id"));
        this.certificateEntity.Description = CKEDITOR.instances.Description.getData();
        var Description = CKEDITOR.instances.Description.editable().getText();
        if (this.certificateEntity.Description != "" &&
            this.certificateEntity.Description != undefined) {
            this.des_valid = false;
            $("#Description").removeClass("error_ckeditor");
        }
        else {
            this.des_valid = true;
            $("#Description").addClass("error_ckeditor");
        }
        if (Description.length < 10 && this.certificateEntity.Description != "") {
            this.Description_valid = true;
            $("#Description").addClass("error_ckeditor");
        }
        else {
            this.Description_valid = false;
        }
        // this.certificateEntity.Features = CKEDITOR.instances.Features.getData();
        // var Features = CKEDITOR.instances.Features.editable().getText();
        // if (this.certificateEntity.Features != "" && this.certificateEntity.Features != undefined) {
        //   this.features_valid = false;
        //   $(".cke_textarea_inline").removeClass("error_ckeditor");
        // } else {
        //   this.features_valid = true;
        //   $(".cke_textarea_inline").addClass("error_ckeditor");
        // }
        // this.certificateEntity.Features = CKEDITOR.instances.Features.getData();
        // if (this.certificateEntity.Features != "" && this.certificateEntity.Features != undefined) {
        //   this.features_valid = false;
        // } else {
        //   this.features_valid = true;
        // }
        if (id) {
            if (this.certificateEntity.IsActive == true) {
                this.certificateEntity.IsActive = 1;
            }
            else {
                this.certificateEntity.IsActive = 0;
            }
            if (this.certificateEntity.IsRenewable == true) {
                this.certificateEntity.IsRenewable = 1;
            }
            else {
                this.certificateEntity.IsRenewable = 0;
            }
            if (this.certificateEntity.HasSubCertificate == true) {
                this.certificateEntity.HasSubCertificate = 1;
            }
            else {
                this.certificateEntity.HasSubCertificate = 0;
            }
            if (this.certificateEntity.HasOneShotAssessment == true) {
                this.certificateEntity.HasOneShotAssessment = 1;
            }
            else {
                this.certificateEntity.HasOneShotAssessment = 0;
            }
            if (this.certificateEntity.HasProctor == true) {
                this.certificateEntity.HasProctor = 1;
            }
            else {
                this.certificateEntity.HasProctor = 0;
            }
            if (this.certificateEntity.HasDisplayCandidateInfo == true) {
                this.certificateEntity.HasDisplayCandidateInfo = 1;
            }
            else {
                this.certificateEntity.HasDisplayCandidateInfo = 0;
            }
            if (this.certificateEntity.HasDisplayProctorInfo == true) {
                this.certificateEntity.HasDisplayProctorInfo = 1;
            }
            else {
                this.certificateEntity.HasDisplayProctorInfo = 0;
            }
            this.submitted = false;
        }
        else {
            this.submitted = true;
        }
        if (certificateForm.valid &&
            !this.des_valid &&
            !this.ReleaseValidDate &&
            !this.ValidUptoDate &&
            !this.Description_valid &&
            !this.eligibilityCriteriaError &&
            !this.passingPercentageError) {
            this.certificateEntity.UserId = this.globals.authData.UserId;
            //console.log( this.certificateEntity);
            this.btn_disable = true;
            this.globals.isLoading = true;
            this.CertificateService.addUpdate(this.certificateEntity).then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                _this.certificateEntity = {};
                certificateForm.form.markAsPristine();
                if (id) {
                    swal({
                        type: _this.globals.adminTranslationText.certificate.form.alerts
                            .update.type,
                        title: _this.globals.adminTranslationText.certificate.form.alerts
                            .update.title,
                        text: _this.globals.adminTranslationText.certificate.form.alerts
                            .update.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.certificate.form.alerts
                            .add.type,
                        title: _this.globals.adminTranslationText.certificate.form.alerts
                            .add.title,
                        text: _this.globals.adminTranslationText.certificate.form.alerts
                            .add.text,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                _this.router.navigate(["/admin/certificate/list"]);
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
                window.location.href =
                    "pagenotfound/" + window.btoa(error.error.code);
                _this.globals.isLoading = true;
            });
        }
        else {
            this.certificateEntity.OptionalCertificateForCandidate;
            this.certificateEntity.MandatoryCertificateForCandidate;
            this.certificateEntity.OptionalCertificateForProctor;
            this.certificateEntity.MandatoryCertificateForProctor;
        }
    };
    CertificateComponent.prototype.abc = function (i) {
        //alert(i);
    };
    CertificateComponent.prototype.deletePrice = function (certificate) {
        var _this = this;
        swal({
            title: this.globals.adminTranslationText.certificate.priceList.alerts
                .deleteConfirm.title,
            text: this.globals.adminTranslationText.certificate.priceList.alerts
                .deleteConfirm.text,
            icon: "warning",
            type: this.globals.adminTranslationText.certificate.priceList.alerts
                .deleteConfirm.type,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                certificate.UserId = _this.globals.authData.UserId;
                certificate.Id = certificate.CertificatePricingHistoryId;
                certificate.TableName = "tblcertificatepricinghistory";
                certificate.FieldName = "CertificatePricingHistoryId";
                certificate.Module = "Certificate Price";
                certificate.ModuleId = 2;
                certificate.ActivityText = "Delete Certificate Price";
                _this.globals.isLoading = true;
                debugger;
                _this.CommonService.deleteItem(certificate).then(function (data) {
                    // let index = this.categoryList.indexOf(category);
                    // if (index != -1) {
                    //   this.categoryList.splice(index, 1);
                    // }
                    var CertificatePricingHistory = _this.CertificatePricingHistory.slice();
                    var index = CertificatePricingHistory.indexOf(certificate);
                    if (index != -1) {
                        CertificatePricingHistory.splice(index, 1);
                    }
                    _this.CertificatePricingHistory = CertificatePricingHistory.slice();
                    _this.gridData = _this.CertificatePricingHistory;
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.adminTranslationText.certificate.priceList
                            .alerts.deleteSuccess.type,
                        title: _this.globals.adminTranslationText.certificate.priceList
                            .alerts.deleteSuccess.title,
                        text: _this.globals.adminTranslationText.certificate.priceList
                            .alerts.deleteSuccess.text,
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
                    window.location.href =
                        "pagenotfound/" + window.btoa(error.error.code);
                    _this.globals.isLoading = true;
                });
            }
        });
    };
    CertificateComponent.prototype.onFilter = function (inputValue) {
        this.CertificatePricingHistory = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: "PriceComment",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "EffectiveDate",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "USDPrice",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "INRPrice",
                        operator: "contains",
                        value: inputValue
                    },
                    {
                        field: "EURPrice",
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
    ], CertificateComponent.prototype, "dataBinding", void 0);
    CertificateComponent = tslib_1.__decorate([
        Component({
            selector: "app-certificate",
            templateUrl: "./certificate.component.html",
            styleUrls: ["./certificate.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [Globals,
            Router,
            ActivatedRoute,
            CertificateService,
            CommonService])
    ], CertificateComponent);
    return CertificateComponent;
}());
export { CertificateComponent };
//# sourceMappingURL=certificate.component.js.map