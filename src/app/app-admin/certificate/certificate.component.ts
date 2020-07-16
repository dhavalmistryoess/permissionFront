import { Component, OnInit, ViewChild } from "@angular/core";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { CertificateService } from "../services/certificate.service";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { SortDescriptor, process } from "@progress/kendo-data-query";
import { CommonService } from "../services/common.service";
import { truncateWithEllipsis } from "@amcharts/amcharts4/.internal/core/utils/Utils";
declare var $, CKEDITOR: any, swal: any, PerfectScrollbar;

@Component({
  selector: "app-certificate",
  templateUrl: "./certificate.component.html",
  styleUrls: ["./certificate.component.css"]
})
export class CertificateComponent implements OnInit {
  //Anand Tab Code
  // public value: Date = new Date(2000, 2, 10);
  //Anand Tab Code
  certificateEntity;
  certificatePriceEntity;
  submitted;
  submitted1;
  submitted2;
  submitted3;
  submitted4;
  submitted5;
  submitted_passing;
  documentList;
  btn_disable;
  btn_disable1;
  ReleaseValidDate;
  ValidUptoDate;
  smallDate;
  des_valid;
  Description_valid;
  CommentValid;
  features_valid;
  CertificateForCandidatelist;
  CertificateForCandidatelist1;
  CertificateForCandidateMainlist;
  CertificateForProctorlist;
  CertificateDocumentsForCandidate;
  showRenewBlocks;
  submitted_renew;
  showDocsBlocks;
  showPercentageBlock;
  CertificateForProctorlist1;
  CertificateForProctorMainlist;
  eligibilityCriteriaError;
  passingPercentageError;
  CertificateList;
  currentDate;
  minDate: Date;
  minDate1: Date;
  newDate;
  newDate1;
  CertificatePricingHistory;
  CertificateId;
  USDPrice;
  INRPrice;
  EURPrice;
  EffectiveValidDate;
  certificatePrice;
  certificatePopup;
  checkCertificate;
  checkCertificateNameExists;
  checkCertificateName;
  auto;
  sort;
  errorEntity;

  constructor(
    public globals: Globals,
    private router: Router,
    private route: ActivatedRoute,
    private CertificateService: CertificateService,
    private CommonService: CommonService
  ) {}
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData;
  ngOnInit() {
    
    this.globals.isLoading = false;
    this.errorEntity = {};

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

    setTimeout(function() {
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
    let id = this.route.snapshot.paramMap.get("id");
    $("#address-info-tab").addClass("disabled");
    $("#change-pwsd-tab").addClass("disabled");
    $("#document-tab").addClass("disabled");
    $("#document1-tab").addClass("disabled");
    if (id) {
    } else {
      $("#history-tab").addClass("disabled");
    }
    this.CertificateService.getAllDefault().then(
      data => {
        debugger;
        //this.documentList = data;
        var data1: any;
        var data2: any;
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
        this.CertificateForCandidateMainlist = [
          ...this.CertificateForCandidatelist,
          ...data1
        ];
        //this.CertificateForCandidateMainlist1 = [...this.CertificateForCandidatelist1,...data1];
        this.CertificateForCandidatelist = [
          ...this.CertificateForCandidatelist,
          ...data1
        ];
        this.CertificateForCandidatelist1 = [
          ...this.CertificateForCandidatelist1,
          ...data1
        ];

        this.CertificateForCandidatelist1 = this.CertificateForCandidatelist1.filter(
          docs => {
            return docs.flag == 0;
          }
        );
        // var certificateForCandidateSelect =  {
        //   DocumentId:'',
        //   DocumentName: this.globals.adminTranslationText.certificate.form.OptionalDocumentForCandidate.select,
        //   Value: ""
        // }
        // this.CertificateForCandidatelist1.push(certificateForCandidateSelect);

        var certificateSelect = {
          CertificateId: "",
          CertificateName: this.globals.adminTranslationText
            .certificateCategoryMapping.form.certificate.select,
          Value: ""
        };
        this.CertificateList.push(certificateSelect);
        this.CertificateList = [
          ...this.CertificateList,
          ...data["Certificates"]
        ];
        console.log(this.CertificateList);
        this.CertificateForProctorMainlist = [
          ...this.CertificateForCandidatelist,
          ...data2
        ];
        this.CertificateForProctorlist = [
          ...this.CertificateForProctorlist,
          ...data2
        ];
        this.CertificateForProctorlist1 = [
          ...this.CertificateForProctorlist,
          ...data2
        ];
        //console.log(data);
        this.globals.isLoading = false;
      },
      error => {
        this.globals.isLoading = false;
        // if (error.text) {
        //   swal({
        //     //position: 'top-end',
        //     type: 'error',
        //     title: 'Oops...',
        //     text: "Something went wrong!"
        //   })
        // }
        window.location.href = "pagenotfound/" + window.btoa(error.error.code);
        this.globals.isLoading = true;
      }
    );
    setTimeout(function() {
      $("select").selectpicker();
    }, 5000);
    //  let id = window.atob(this.route.snapshot.paramMap.get('id'));
    if (id) {
      debugger;
      id = window.atob(id);
      this.globals.isLoading = true;
      this.CertificateService.getById(id).then(
        data => {
          console.log(data);
          this.certificateEntity = data;
          this.certificateEntity.ReleaseDate = new Date(
            this.certificateEntity.ReleaseDate
          );
          this.newDate = new Date(this.certificateEntity.ReleaseDate);
          this.certificateEntity.ValidUpto = new Date(
            this.certificateEntity.ValidUpto
          );
          this.newDate1 = new Date(this.certificateEntity.ValidUpto);
          console.log(this.certificateEntity);
          if (data["IsActive"] == 0) {
            this.certificateEntity.IsActive = 0;
          } else {
            this.certificateEntity.IsActive = 1;
          }
          if (data["IsRenewable"] == 0) {
            this.certificateEntity.IsRenewable = 0;
          } else {
            this.certificateEntity.IsRenewable = 1;
            this.showRenewBlocks = true;
          }
          if (data["PassingPerCategory"] == 0) {
            this.certificateEntity.PassingPerCategory = 0;
          } else {
            this.certificateEntity.PassingPerCategory = 1;
            this.showPercentageBlock = true;
          }
          if (data["HasOneShotAssessment"] == 0) {
            this.certificateEntity.HasOneShotAssessment = 0;
          } else {
            this.certificateEntity.HasOneShotAssessment = 1;
          }
          if (data["HasSubCertificate"] == 0) {
            this.certificateEntity.HasSubCertificate = 0;
          } else {
            this.certificateEntity.HasSubCertificate = 1;
          }
          if (data["HasProctor"] == 0) {
            this.certificateEntity.HasProctor = 0;
            this.showDocsBlocks = false;
          } else {
            this.certificateEntity.HasProctor = 1;
            this.showDocsBlocks = true;
          }
          if (data["HasDisplayCandidateInfo"] == 0) {
            this.certificateEntity.HasDisplayCandidateInfo = 0;
          } else {
            this.certificateEntity.HasDisplayCandidateInfo = 1;
          }
          if (data["HasDisplayProctorInfo"] == 0) {
            this.certificateEntity.HasDisplayProctorInfo = 0;
          } else {
            this.certificateEntity.HasDisplayProctorInfo = 1;
          }
          this.gridData = this.certificateEntity["CertificateHistory"];
          this.CertificatePricingHistory = this.certificateEntity[
            "CertificateHistory"
          ];
          console.log(this.CertificatePricingHistory);
          CKEDITOR.instances.Description.setData(
            this.certificateEntity.Description
          );
          CKEDITOR.instances.PriceComment.setData(
            this.certificateEntity.PriceComment
          );
          CKEDITOR.instances.Features.setData(this.certificateEntity.Features);
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
          // this.router.navigate(['/pagenotfound']);
          window.location.href =
            "pagenotfound/" + window.btoa(error.error.code);
          this.globals.isLoading = true;
        }
      );
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
    } else {
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
  }

  overlay_close() {
    this.certificatePopup = false;
    $(".overlay").css("display", "none");
  }
  close() {
    this.certificatePopup = false;
  }

  changeActive() {
    this.ValidUptoDate = false;
    this.newDate1 = new Date(this.certificateEntity.ValidUpto);
  }

  oneShotAssessment(HasOneShotAssessment) {
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
    } else {
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
  }
  passingPercentageEligibilityCriteriaCheck(value) {
    debugger;
    if (value == 0)
      var passingPercentageCheck: number = parseInt(
        $("#EligibilityCriteria").val()
      );
    else
      var passingPercentageCheck: number = parseInt(
        $("#CertificatePassingPercentage").val()
      );

    if (passingPercentageCheck > 100) {
      if (value == 0) this.eligibilityCriteriaError = true;
      else this.passingPercentageError = true;
    } else {
      if (value == 0) this.eligibilityCriteriaError = false;
      else this.passingPercentageError = false;
    }
  }
  showRenewPrices() {
    if (this.certificateEntity.IsRenewable == true) {
      this.showRenewBlocks = true;
      this.submitted_renew = false;
      this.certificateEntity.RenewalUSDPrice = "";
    } else {
      this.showRenewBlocks = false;
    }
  }
  showProctorDocs() {
    if (this.certificateEntity.HasProctor == true) {
      this.showDocsBlocks = true;
      //this.certificateEntity.RenewalUSDPrice = '';
    } else {
      this.showDocsBlocks = false;
    }
  }
  showPercentage(certificateForm4) {
    debugger;
    if (this.certificateEntity.PassingPerCategory == true) {
      this.submitted_passing = false;
      this.showPercentageBlock = true;
      //this.certificateEntity.CertificatePassingPercentage = null;
      // this.passingPercentageError = false;
      // certificateForm4.form.markAsPristine();
    } else {
      this.showPercentageBlock = false;
    }
  }
  Optionalcertichange(OptionalCertificateForCandidate) {
    debugger;
    for (var j = 0; j < this.CertificateForCandidateMainlist.length; j++) {
      let count = 0;
      for (var i = 0; i < OptionalCertificateForCandidate.length; i++) {
        if (
          OptionalCertificateForCandidate[i] ==
          this.CertificateForCandidateMainlist[j].DocumentId
        ) {
          count++;
        }
      }
      if (count > 0) {
        this.CertificateForCandidateMainlist[j].flag = 1;
      } else {
        this.CertificateForCandidateMainlist[j].flag = 0;
      }
    }
    var CertificateForCandidatelist1 = [
      ...this.CertificateForCandidateMainlist
    ];
    this.CertificateForCandidatelist1 = [];
    this.CertificateForCandidatelist1 = [...CertificateForCandidatelist1];
    this.CertificateForCandidatelist1 = this.CertificateForCandidatelist1.filter(
      docs => {
        return docs.flag == 0;
      }
    );
  }
  Mandatorycertichange(MandatoryCertificateForCandidate) {
    debugger;
    for (var j = 0; j < this.CertificateForCandidateMainlist.length; j++) {
      let count = 0;
      for (var i = 0; i < MandatoryCertificateForCandidate.length; i++) {
        if (
          MandatoryCertificateForCandidate[i] ==
          this.CertificateForCandidateMainlist[j].DocumentId
        ) {
          count++;
        }
      }
      if (count > 0) {
        this.CertificateForCandidateMainlist[j].flag = 1;
      } else {
        this.CertificateForCandidateMainlist[j].flag = 0;
      }
    }
    var CertificateForCandidatelist = [...this.CertificateForCandidateMainlist];
    this.CertificateForCandidatelist = [];
    this.CertificateForCandidatelist = [...CertificateForCandidatelist];
    this.CertificateForCandidatelist = this.CertificateForCandidatelist.filter(
      docs => {
        return docs.flag == 0;
      }
    );
  }
  Proctorcertichange(OptionalCertificateForProctor) {
    debugger;
    for (var j = 0; j < this.CertificateForProctorMainlist.length; j++) {
      let count = 0;
      for (var i = 0; i < OptionalCertificateForProctor.length; i++) {
        if (
          OptionalCertificateForProctor[i] ==
          this.CertificateForProctorMainlist[j].DocumentId
        ) {
          count++;
        }
      }
      if (count > 0) {
        this.CertificateForProctorMainlist[j].flag = 1;
      } else {
        this.CertificateForProctorMainlist[j].flag = 0;
      }
    }
    var CertificateForProctorlist1 = [...this.CertificateForCandidateMainlist];
    this.CertificateForProctorlist1 = [];
    this.CertificateForProctorlist1 = [...CertificateForProctorlist1];
    this.CertificateForProctorlist1 = this.CertificateForProctorlist1.filter(
      docs => {
        return docs.flag == 0;
      }
    );
  }
  Proctorcertichange1(MandatoryCertificateForProctor) {
    debugger;
    for (var j = 0; j < this.CertificateForProctorMainlist.length; j++) {
      let count = 0;
      for (var i = 0; i < MandatoryCertificateForProctor.length; i++) {
        if (
          MandatoryCertificateForProctor[i] ==
          this.CertificateForProctorMainlist[j].DocumentId
        ) {
          count++;
        }
      }
      if (count > 0) {
        this.CertificateForProctorMainlist[j].flag = 1;
      } else {
        this.CertificateForProctorMainlist[j].flag = 0;
      }
    }
    var CertificateForProctorlist = [...this.CertificateForCandidateMainlist];
    this.CertificateForProctorlist = [];
    this.CertificateForProctorlist = [...CertificateForProctorlist];
    this.CertificateForProctorlist = this.CertificateForProctorlist.filter(
      docs => {
        return docs.flag == 0;
      }
    );
  }
  addCertificateSubmit1(certificateForm1) {
    //this.submitted = true;

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
    } else {
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
    } else {
      this.ValidUptoDate = true;
    }
    // if(this.certificateEntity.ReleaseDate != undefined && this.certificateEntity.ValidUpto != undefined){
    if (
      this.certificateEntity.ReleaseDate >= this.certificateEntity.ValidUpto
    ) {
      this.smallDate = true;
    } else {
      this.smallDate = false;
    }
    debugger;
    if (this.checkCertificateNameExists) {
      this.checkCertificateName = true;
    } else {
      this.checkCertificateName = false;
    }
    //}
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.submitted = false;
    } else {
      this.submitted = true;
    }
    if (
      certificateForm1.valid &&
      !this.ReleaseValidDate &&
      !this.ValidUptoDate &&
      !this.smallDate &&
      !this.checkCertificateName
    ) {
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
  }

  checktheCertificateName(e) {
    let getCertificateName = e.target.value;
    if (getCertificateName != "") {
      this.checkCertificate.CertificateName = getCertificateName;
      this.checkCertificate.CertificateId = 0;
      this.CertificateService.checkCertificateName(this.checkCertificate).then(
        data => {
          this.checkCertificateNameExists = false;
        },
        error => {
          this.checkCertificateNameExists = true;
        }
      );
    }
  }

  addCertificateSubmit2(certificateForm2) {
    //this.submitted1 = true;
    debugger;
    this.certificateEntity.Description = CKEDITOR.instances.Description.getData();
    var Description = CKEDITOR.instances.Description.editable().getText();
    if (
      this.certificateEntity.Description != "" &&
      this.certificateEntity.Description != undefined
    ) {
      this.des_valid = false;
      $("#Description").removeClass("error_ckeditor");
    } else {
      this.des_valid = true;
      $("#Description").addClass("error_ckeditor");
    }
    if (Description.length < 10 && this.certificateEntity.Description != "") {
      this.Description_valid = true;
      $("#Description").addClass("error_ckeditor");
    } else {
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
  }
  addCertificateSubmit3(certificateForm3) {
    this.submitted1 = true;
    debugger;
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      if (this.certificateEntity.HasSubCertificate == true) {
        this.certificateEntity.HasSubCertificate = 1;
      } else {
        this.certificateEntity.HasSubCertificate = 0;
      }
      this.submitted1 = false;
    } else {
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
  }
  addCertificateSubmit4(certificateForm4) {
    this.submitted2 = true;
    this.submitted_passing = true;
    this.submitted_renew = true;
    debugger;
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      if (this.certificateEntity.IsRenewable == true) {
        this.certificateEntity.IsRenewable = 1;
      } else {
        this.certificateEntity.IsRenewable = 0;
      }
      this.submitted2 = false;
    } else {
      this.submitted2 = true;
    }
    if (
      certificateForm4.valid &&
      !this.eligibilityCriteriaError &&
      !this.passingPercentageError
    ) {
      $("#document-tab").removeClass("active");
      $("#document-tab").addClass("complete");
      $("#document-tab").addClass("disabled");
      $("#document1-tab").removeClass("disabled");
      $("#document1-tab").addClass("active");
      $("#document").removeClass("show active");
      $("#document1").addClass("show active");
    }
  }
  addCertificateSubmit5(certificateForm5) {
   // this.submitted3 = true;
    debugger;
    this.certificateEntity.CertificateDocumentsForCandidate = [];
    var Candidatelist;
    if (this.certificateEntity.MandatoryCertificateForCandidate) {
      for (Candidatelist of this.certificateEntity
        .MandatoryCertificateForCandidate) {
        if (Candidatelist) {
          var item1 = { DocumentId: Candidatelist, IsMandatory: "1" };
          this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
        }
      }
    }
    if (this.certificateEntity.OptionalCertificateForCandidate) {
      var Optional;
      for (Optional of this.certificateEntity.OptionalCertificateForCandidate) {
        if (Optional) {
          var item1 = { DocumentId: Optional, IsMandatory: "0" };
          this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
        }
      }
    }
    this.certificateEntity.CertificateDocumentsForProctor = [];
    var MandatoryProctorist;
    if (this.certificateEntity.MandatoryCertificateForProctor) {
      for (MandatoryProctorist of this.certificateEntity
        .MandatoryCertificateForProctor) {
        if (MandatoryProctorist) {
          var item1 = { DocumentId: MandatoryProctorist, IsMandatory: "1" };
          this.certificateEntity.CertificateDocumentsForProctor.push(item1);
        }
      }
    }
    if (this.certificateEntity.OptionalCertificateForProctor) {
      var OptionalProctorist;
      for (OptionalProctorist of this.certificateEntity
        .OptionalCertificateForProctor) {
        if (OptionalProctorist) {
          var item1 = { DocumentId: OptionalProctorist, IsMandatory: "0" };
          this.certificateEntity.CertificateDocumentsForProctor.push(item1);
        }
      }
    }
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      if (this.certificateEntity.IsActive == true) {
        this.certificateEntity.IsActive = 1;
      } else {
        this.certificateEntity.IsActive = 0;
      }
      if (this.certificateEntity.HasProctor == true) {
        this.certificateEntity.HasProctor = 1;
      } else {
        this.certificateEntity.HasProctor = 0;
      }
      if (this.certificateEntity.HasDisplayCandidateInfo == true) {
        this.certificateEntity.HasDisplayCandidateInfo = 1;
      } else {
        this.certificateEntity.HasDisplayCandidateInfo = 0;
      }
      if (this.certificateEntity.HasDisplayProctorInfo == true) {
        this.certificateEntity.HasDisplayProctorInfo = 1;
      } else {
        this.certificateEntity.HasDisplayProctorInfo = 0;
      }
      this.submitted3 = false;
    } else {
      this.submitted3 = true;
    }
    if (certificateForm5.valid) {
      this.certificateEntity.UserId = this.globals.authData.UserId;
      this.CertificateId = this.certificateEntity.CertificateId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.CertificateService.addUpdate(this.certificateEntity).then(
        data => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted3 = false;
          this.certificateEntity.CertificateId = data;
          this.CertificateId = data;
          if (id || this.CertificateId != 0) {
            swal({
              type: this.globals.adminTranslationText.certificate.form.alerts
                .update.type,
              title: this.globals.adminTranslationText.certificate.form.alerts
                .update.title,
              text: this.globals.adminTranslationText.certificate.form.alerts
                .update.text,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            swal({
              type: this.globals.adminTranslationText.certificate.form.alerts
                .add.type,
              title: this.globals.adminTranslationText.certificate.form.alerts
                .add.title,
              text: this.globals.adminTranslationText.certificate.form.alerts
                .add.text,
              showConfirmButton: false,
              timer: 2000
            });
          }
          $("#document1-tab").removeClass("active");
          $("#document1-tab").addClass("complete");
          $("#document1-tab").addClass("disabled");
          $("#history-tab").removeClass("disabled");
          $("#history-tab").addClass("active");
          $("#document1").removeClass("show active");
          $("#history").addClass("show active");
        },
        error => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          if(error.error.code == 422)
          {
            this.errorEntity.CertificateName = (error.error.message.CertificateName != "") ? error.error.message.CertificateName : '';
            this.errorEntity.VersionName = (error.error.message.VersionName != "") ? error.error.message.VersionName : '';
            this.errorEntity.ReleaseDate = (error.error.message.ReleaseDate != "") ? error.error.message.ReleaseDate : '';
            this.errorEntity.ValidUpto = (error.error.message.ValidUpto != "") ? error.error.message.ValidUpto : '';
            this.errorEntity.CertificateURL = (error.error.message.CertificateURL != "") ? error.error.message.CertificateURL : '';
            this.errorEntity.Description = (error.error.message.Description != "") ? error.error.message.Description : '';
            this.errorEntity.AssessmentDuration = (error.error.message.AssessmentDuration != "") ? error.error.message.AssessmentDuration : '';
            this.errorEntity.ScheduleAfterDaysForCandidate = (error.error.message.ScheduleAfterDaysForCandidate != "") ? error.error.message.ScheduleAfterDaysForCandidate : '';
            this.errorEntity.RescheduleAssessment = (error.error.message.RescheduleAssessment != "") ? error.error.message.RescheduleAssessment : '';
            this.errorEntity.CoolingPeriod = (error.error.message.CoolingPeriod != "") ? error.error.message.CoolingPeriod : '';
            this.errorEntity.PracticeExamAttempts = (error.error.message.PracticeExamAttempts != "") ? error.error.message.PracticeExamAttempts : '';
            this.errorEntity.BeforeRenewButtonDisplay = (error.error.message.BeforeRenewButtonDisplay != "") ? error.error.message.BeforeRenewButtonDisplay : '';
            this.errorEntity.AfterRenewButtonDisplay = (error.error.message.AfterRenewButtonDisplay != "") ? error.error.message.AfterRenewButtonDisplay : '';
            this.errorEntity.EligibilityCriteria = (error.error.message.EligibilityCriteria != "") ? error.error.message.EligibilityCriteria : '';
            this.errorEntity.MandatoryCertificateForCandidate = (error.error.message.MandatoryCertificateForCandidate != "") ? error.error.message.MandatoryCertificateForCandidate : '';
            this.errorEntity.RenewalUSDPrice = (error.error.message.RenewalUSDPrice != "") ? error.error.message.RenewalUSDPrice : '';
            this.errorEntity.RenewalINRPrice = (error.error.message.RenewalINRPrice != "") ? error.error.message.RenewalINRPrice : '';
            this.errorEntity.RenewalEURPrice = (error.error.message.RenewalEURPrice != "") ? error.error.message.RenewalEURPrice : '';
            this.errorEntity.CertificatePassingPercentage = (error.error.message.CertificatePassingPercentage != "") ? error.error.message.CertificatePassingPercentage : '';
            this.errorEntity.MandatoryCertificateForProctor = (error.error.message.MandatoryCertificateForProctor != "") ? error.error.message.MandatoryCertificateForProctor : '';
          }
          else
          {
            window.location.href =
            "pagenotfound/" + window.btoa(error.error.code);
          }
          this.globals.isLoading = true;
        }
      );
    }
  }
  pricePopup() {
    this.certificatePriceEntity = {};
    this.certificatePriceEntity.CertificatePricingHistoryId = 0;
    this.certificatePopup = true;
    this.btn_disable1 = false;
    this.submitted4 = false;
    this.CommentValid = false;
    this.EffectiveValidDate = false;
  }
  editPrice(obj) {
    debugger;
    this.certificatePriceEntity = obj;
    this.certificatePriceEntity.EffectiveDate = new Date(
      this.certificatePriceEntity.EffectiveDate
    );
    this.certificatePopup = true;
    this.btn_disable1 = false;
    this.submitted4 = false;
    this.CommentValid = false;
    this.EffectiveValidDate = false;
  }
  addUpdateCertificatePrice(certificatePriceForm) {
    this.submitted4 = true;
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
    } else {
      this.EffectiveValidDate = true;
    }
   
    if (this.certificatePriceEntity.PriceComment != undefined) {
      var PriceComment = this.certificatePriceEntity.PriceComment;
      if (
        PriceComment.length < 10 &&
        this.certificatePriceEntity.PriceComment != ""
      ) {
        this.CommentValid = true;
      } else {
        this.CommentValid = false;
      }
    }
    if (this.certificatePriceEntity.CertificatePricingHistoryId > 0) {
      this.submitted4 = false;
    } else {
      this.submitted4 = true;
    }
    if (
      certificatePriceForm.valid &&
      !this.EffectiveValidDate &&
      !this.CommentValid
    ) {
      this.certificatePriceEntity.UserId = this.globals.authData.UserId;
      if (this.CertificateId == undefined || this.CertificateId == null) {
        this.CertificateId = window.atob(
          this.route.snapshot.paramMap.get("id")
        );
      }
      this.certificatePriceEntity.CertificateId = this.CertificateId;
      this.btn_disable1 = true;
      this.globals.isLoading = true;
      this.CertificateService.addUpdateCertificatePrice(
        this.certificatePriceEntity
      ).then(
        data => {
          this.certificatePopup = false;
          this.globals.isLoading = false;
          this.btn_disable1 = false;
          this.submitted4 = false;
          if (this.certificatePriceEntity.CertificatePricingHistoryId > 0) {
            swal({
              type: this.globals.adminTranslationText.certificate.priceForm
                .alerts.update.type,
              title: this.globals.adminTranslationText.certificate.priceForm
                .alerts.update.title,
              text: this.globals.adminTranslationText.certificate.priceForm
                .alerts.update.text,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            swal({
              type: this.globals.adminTranslationText.certificate.priceForm
                .alerts.add.type,
              title: this.globals.adminTranslationText.certificate.priceForm
                .alerts.add.title,
              text: this.globals.adminTranslationText.certificate.priceForm
                .alerts.add.text,
              showConfirmButton: false,
              timer: 2000
            });
            this.certificatePrice = {
              CertificatePricingHistoryId: data,
              EffectiveDate: this.certificatePriceEntity.EffectiveDate,
              PriceComment: this.certificatePriceEntity.PriceComment,
              USDPrice: this.certificatePriceEntity.USDPrice,
              INRPrice: this.certificatePriceEntity.INRPrice,
              EURPrice: this.certificatePriceEntity.EURPrice
            };
            console.log(this.certificatePrice);
            this.CertificatePricingHistory.push(this.certificatePrice);
            this.CertificatePricingHistory = [
              ...this.CertificatePricingHistory
            ];
            this.gridData = this.CertificatePricingHistory;
          }
          this.certificatePopup = false;
          this.certificatePriceEntity = {};
        },
        error => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          if (error.error.code == 422) {
              this.errorEntity.USDPrice = (error.error.message.USDPrice != "") ? error.error.message.USDPrice : '';
              this.errorEntity.EURPrice = (error.error.message.EURPrice != "") ? error.error.message.EURPrice : '';
              this.errorEntity.INRPrice = (error.error.message.INRPrice != "") ? error.error.message.INRPrice : '';
              this.errorEntity.EffectiveDate = (error.error.message.EffectiveDate != "") ? error.error.message.EffectiveDate : '';
          } else {
              window.location.href =
                "pagenotfound/" + window.btoa(error.error.code);
          }
        }
      );
    }
  }
  previous() {
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
  }
  previous1() {
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
  }
  previous2() {
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
  }
  previous3() {
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
    this.submitted_renew = false;
    this.submitted_passing = false;
  }
  previous4() {
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
  }
  addUpdate(certificateForm) {
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
    } else {
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
    } else {
      this.ValidUptoDate = true;
    }
    this.certificateEntity.CertificateDocumentsForCandidate = [];
    var Candidatelist;
    if (this.certificateEntity.MandatoryCertificateForCandidate) {
      for (Candidatelist of this.certificateEntity
        .MandatoryCertificateForCandidate) {
        if (Candidatelist) {
          var item1 = { DocumentId: Candidatelist, IsMandatory: "1" };
          this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
        }
      }
    }
    if (this.certificateEntity.OptionalCertificateForCandidate) {
      var Optional;
      for (Optional of this.certificateEntity.OptionalCertificateForCandidate) {
        if (Optional) {
          var item1 = { DocumentId: Optional, IsMandatory: "0" };
          this.certificateEntity.CertificateDocumentsForCandidate.push(item1);
        }
      }
    }
    this.certificateEntity.CertificateDocumentsForProctor = [];
    var MandatoryProctorist;
    if (this.certificateEntity.MandatoryCertificateForProctor) {
      for (MandatoryProctorist of this.certificateEntity
        .MandatoryCertificateForProctor) {
        if (MandatoryProctorist) {
          var item1 = { DocumentId: MandatoryProctorist, IsMandatory: "1" };
          this.certificateEntity.CertificateDocumentsForProctor.push(item1);
        }
      }
    }
    if (this.certificateEntity.OptionalCertificateForProctor) {
      var OptionalProctorist;
      for (OptionalProctorist of this.certificateEntity
        .OptionalCertificateForProctor) {
        if (OptionalProctorist) {
          var item1 = { DocumentId: OptionalProctorist, IsMandatory: "0" };
          this.certificateEntity.CertificateDocumentsForProctor.push(item1);
        }
      }
    }
    let id = window.atob(this.route.snapshot.paramMap.get("id"));
    this.certificateEntity.Description = CKEDITOR.instances.Description.getData();
    var Description = CKEDITOR.instances.Description.editable().getText();
    if (
      this.certificateEntity.Description != "" &&
      this.certificateEntity.Description != undefined
    ) {
      this.des_valid = false;
      $("#Description").removeClass("error_ckeditor");
    } else {
      this.des_valid = true;
      $("#Description").addClass("error_ckeditor");
    }
    if (Description.length < 10 && this.certificateEntity.Description != "") {
      this.Description_valid = true;
      $("#Description").addClass("error_ckeditor");
    } else {
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
      } else {
        this.certificateEntity.IsActive = 0;
      }
      if (this.certificateEntity.IsRenewable == true) {
        this.certificateEntity.IsRenewable = 1;
      } else {
        this.certificateEntity.IsRenewable = 0;
      }
      if (this.certificateEntity.HasSubCertificate == true) {
        this.certificateEntity.HasSubCertificate = 1;
      } else {
        this.certificateEntity.HasSubCertificate = 0;
      }
      if (this.certificateEntity.HasOneShotAssessment == true) {
        this.certificateEntity.HasOneShotAssessment = 1;
      } else {
        this.certificateEntity.HasOneShotAssessment = 0;
      }
      if (this.certificateEntity.HasProctor == true) {
        this.certificateEntity.HasProctor = 1;
      } else {
        this.certificateEntity.HasProctor = 0;
      }
      if (this.certificateEntity.HasDisplayCandidateInfo == true) {
        this.certificateEntity.HasDisplayCandidateInfo = 1;
      } else {
        this.certificateEntity.HasDisplayCandidateInfo = 0;
      }
      if (this.certificateEntity.HasDisplayProctorInfo == true) {
        this.certificateEntity.HasDisplayProctorInfo = 1;
      } else {
        this.certificateEntity.HasDisplayProctorInfo = 0;
      }
      this.submitted = false;
    } else {
      this.submitted = true;
    }

    if (
      certificateForm.valid &&
      !this.des_valid &&
      !this.ReleaseValidDate &&
      !this.ValidUptoDate &&
      !this.Description_valid &&
      !this.eligibilityCriteriaError &&
      !this.passingPercentageError
    ) {
      this.certificateEntity.UserId = this.globals.authData.UserId;
      //console.log( this.certificateEntity);
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.CertificateService.addUpdate(this.certificateEntity).then(
        data => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted = false;
          this.certificateEntity = {};
          certificateForm.form.markAsPristine();
          if (id) {
            swal({
              type: this.globals.adminTranslationText.certificate.form.alerts
                .update.type,
              title: this.globals.adminTranslationText.certificate.form.alerts
                .update.title,
              text: this.globals.adminTranslationText.certificate.form.alerts
                .update.text,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            swal({
              type: this.globals.adminTranslationText.certificate.form.alerts
                .add.type,
              title: this.globals.adminTranslationText.certificate.form.alerts
                .add.title,
              text: this.globals.adminTranslationText.certificate.form.alerts
                .add.text,
              showConfirmButton: false,
              timer: 2000
            });
          }
          this.router.navigate(["/admin/certificate/list"]);
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
          window.location.href =
            "pagenotfound/" + window.btoa(error.error.code);
          this.globals.isLoading = true;
        }
      );
    } else {
      this.certificateEntity.OptionalCertificateForCandidate;
      this.certificateEntity.MandatoryCertificateForCandidate;
      this.certificateEntity.OptionalCertificateForProctor;
      this.certificateEntity.MandatoryCertificateForProctor;
    }
  }

  abc(i) {
    //alert(i);
  }
  deletePrice(certificate) {
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
    }).then(result => {
      if (result.value) {
        certificate.UserId = this.globals.authData.UserId;
        certificate.Id = certificate.CertificatePricingHistoryId;
        certificate.TableName = "tblcertificatepricinghistory";
        certificate.FieldName = "CertificatePricingHistoryId";
        certificate.Module = "Certificate Price";
        certificate.ModuleId = 2;
        certificate.ActivityText = "Delete Certificate Price";
        this.globals.isLoading = true;
        debugger;
        this.CommonService.deleteItem(certificate).then(
          data => {
            var CertificatePricingHistory = [...this.CertificatePricingHistory];
            let index = CertificatePricingHistory.indexOf(certificate);
            if (index != -1) {
              CertificatePricingHistory.splice(index, 1);
            }
            this.CertificatePricingHistory = [...CertificatePricingHistory];
            this.gridData = this.CertificatePricingHistory;
            this.globals.isLoading = false;
            swal({
              type: this.globals.adminTranslationText.certificate.priceList
                .alerts.deleteSuccess.type,
              title: this.globals.adminTranslationText.certificate.priceList
                .alerts.deleteSuccess.title,
              text: this.globals.adminTranslationText.certificate.priceList
                .alerts.deleteSuccess.text,
              showConfirmButton: false,
              timer: 4000
            });
          },
          error => {
            this.globals.isLoading = false;
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
            this.globals.isLoading = true;
          }
        );
      }
    });
  }
  public onFilter(inputValue: string): void {
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
  }
}
