import { Component, OnInit, ElementRef } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { PasswordService } from '../services/password.service';
import { AuthService } from '../services/auth.service';
import { debug } from 'util';
declare var $, unescape: any, swal: any, PerfectScrollbar: any;
declare function myInput(): any;
declare var $, Bloodhound: any;
declare var CKEDITOR, PerfectScrollbar, jquery, $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passwordEntity: any = {};
  passwordSubmit: boolean;
  btn_disable: boolean;
  oldnewsame: boolean = false;
  newconfsame: boolean = false;

  constructor(public globals: Globals, private router: Router, private route: ActivatedRoute, private authService: AuthService, private elem: ElementRef,
    private ProfileService: ProfileService, private PasswordService: PasswordService) { }

  profileEntity;
  ReceiptEntity;
  InvoiceEntity;
  orderHistorylist;
  submitted1;
  submitted2;
  submitted3;
  submitted4;
  submitted5;
  countryList;
  stateList;
  documentList;
  certificateName;
  documentEntity;
  documentDetail;
  FilterEntity;
  Statuslist;
  PersonalDocuments;
  UserPersonalDocuments;
  DocumentValid;
  DocumentDis;
  certificatedocument;
  certificateimage;
  certificatedocumentEntity;
  certiDocumentDis;
  assessmentExpirationDate;
  diffDays;
  editDocumentValue;
  minDate: Date;
  uploadDocumentPopup;
  profileImageEntity;
  errorEntity;
  p;
  
  ngOnInit() {
    debugger
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
    this.errorEntity = {};
    var id = this.globals.authData.UserId;


    $('#editprofile_img').hide();
    var addressadd = window.atob(this.route.snapshot.paramMap.get('addressadd'));

    if (addressadd == 'addressadd') {
      $("#address-info-tab").addClass("active");
      $("#personal-info-tab").removeClass("active");

      $("#address-info").addClass("show active")
      $("#personal-info").removeClass("show active")

    }
    if (addressadd == 'document') {
      $("#document-tab").addClass("active");
      $("#personal-info-tab").removeClass("active");

      $("#document").addClass("show active")
      $("#personal-info").removeClass("show active")
    }
    this.ProfileService.getAllDefault(id)
      .then((data) => {
        debugger
        this.globals.isLoading = false;
        console.log(data);
        this.profileEntity = data['UserData'][0];
        this.profileEntity.CountryId = (this.profileEntity.CountryId != null ? this.profileEntity.CountryId : '');
        //this.countryList = data['Countries'];
        var country:any;
        country = data['Countries'];
        var countrySelect = {
          CountryId: '',
          CountryName: this.globals.commonTranslationText.profilePage.addressInformationForm.country.select,
          Value: ""
        }
        this.countryList.push(countrySelect);
        this.countryList = [...this.countryList, ...country];
        this.profileEntity.StateId = (this.profileEntity.StateId != null ? this.profileEntity.StateId : '');
        var stateSelect = {
          StateId: '',
          StateName: this.globals.commonTranslationText.profilePage.addressInformationForm.state.select,
          Value: ""
        }
        this.stateList.push(stateSelect);
        this.orderHistorylist = data['orderHistory'];
        this.Statuslist = [...this.Statuslist, ...data['Configuration']];

        this.UserPersonalDocuments = data['UserPersonalDocuments'];
        var personalSelect = {
          DocumentId: '',
          DocumentName: this.globals.commonTranslationText.profilePage.documents.select,
          Value: ""
        }
        this.PersonalDocuments.push(personalSelect);
        this.PersonalDocuments = [...this.PersonalDocuments, ...data['PersonalDocuments']];

        
        console.log(this.PersonalDocuments);
        this.countProgressBar();
        for (var i = 0; i < this.UserPersonalDocuments.length; i++) {
          if (this.UserPersonalDocuments[i].UserDocumentId != null) {
            this.UserPersonalDocuments[i].flag = 1;
            var ExtStr = this.UserPersonalDocuments[i].CertificateDocumentName;
            var Ext = "." + ExtStr.split(".")[1];
            this.UserPersonalDocuments[i].Ext = Ext;
          }
          else {
            this.UserPersonalDocuments[i].flag = 0;
          }
        }
        console.log(this.UserPersonalDocuments);
        console.log(this.profileEntity.CertificateData);
        for (var i = 0; i < this.profileEntity.CertificateData.length; i++) {
          for (var j = 0; j < this.profileEntity.CertificateData[i].OptionalDocuments.length; j++) {
            if (this.profileEntity.CertificateData[i].OptionalDocuments[j].UserDocumentId != null) {
              this.profileEntity.CertificateData[i].OptionalDocuments[j].flag = 1;
              var ExtStr = this.profileEntity.CertificateData[i].OptionalDocuments[j].CertificateDocumentName;
              var Ext1 = "." + ExtStr.split(".")[1];
              this.profileEntity.CertificateData[i].OptionalDocuments[j].Ext = Ext1;
            }
            else {
              this.profileEntity.CertificateData[i].OptionalDocuments[j].flag = 0;
            }
          }

          for (var k = 0; k < this.profileEntity.CertificateData[i].MandatoryDocuments.length; k++) {
            if (this.profileEntity.CertificateData[i].MandatoryDocuments[k].UserDocumentId != null) {
              this.profileEntity.CertificateData[i].MandatoryDocuments[k].flag = 1;
              var ExtStr = this.profileEntity.CertificateData[i].MandatoryDocuments[k].CertificateDocumentName;
              var Ext2 = "." + ExtStr.split(".")[1];
              this.profileEntity.CertificateData[i].MandatoryDocuments[k].Ext = Ext2;
            }
            else {
              this.profileEntity.CertificateData[i].MandatoryDocuments[k].flag = 0;
            }
          }
        }
        console.log(this.profileEntity.CertificateData);
        var Certificate;
        var UserPersonal
        for (UserPersonal of this.UserPersonalDocuments) {
          var PersonalDocuments
          for (PersonalDocuments of this.PersonalDocuments) {
            if (PersonalDocuments.DocumentId == UserPersonal.DocumentId) {
              PersonalDocuments.flag = 1;
            }
          }
        }
        for (var i = 0; i < this.orderHistorylist.length; i++) {
          if (this.orderHistorylist[i].CertificationEndDate == null) {
            if (this.orderHistorylist[i].PaymentDate == null)
              var someDate = new Date();
            else
              var someDate = new Date(this.orderHistorylist[i].PaymentDate);
            var AssessmentDuration = JSON.parse(this.orderHistorylist[i].AssessmentDuration);
            someDate.setMonth(someDate.getMonth() + AssessmentDuration);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();
            if (mm < 10) {
              var month = '0' + mm;
            } else {
              var month = '' + mm;
            }
            if (dd < 10) {
              var date = '0' + dd;
            }
            else {
              var date = '' + dd;
            }
            this.assessmentExpirationDate = y + '-' + month + '-' + date;
            this.orderHistorylist[i].assessmentExpirationDate = this.assessmentExpirationDate
          }
          var date3: any;
          var date4: any;
          date3 = new Date();
          date4 = new Date(someDate);
          const diffTime = Math.abs(date3 - date4);
          this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          this.orderHistorylist[i].diffDays = this.diffDays;
        }

        console.log(this.orderHistorylist);

        if (this.profileEntity.StateId != '' && this.profileEntity.StateId != null) {
          this.ProfileService.getStateByCountryId(this.profileEntity.CountryId)
            .then((data) => {
              var data1: any;
              data1 = data;
              
              this.stateList = [...this.stateList, ...data1];
            },
              (error) => {
                this.btn_disable = false;
                this.submitted2 = false;
                this.globals.pageNotfound(error.error.code);
              });
        }

      },
        (error) => {
          this.globals.pageNotfound(error.error.code);
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.passwordSubmit = false;
        });
    setTimeout(function () {

      $('.file_upload input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        $('.file_upload input[type="text"]').val(fileName);
      });
    }, 5000);
    setTimeout(() => {
      if (this.profileEntity.ProfileImageName != null && this.profileEntity.ProfileImageName != '') {
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
            }
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
          }
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
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#oldpassword").attr("type") == "password") {
        $("#oldpassword").attr("type", "text");

      }
      else {
        $("#oldpassword").attr("type", "password");
      }
    });

    $("#password-show").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#password").attr("type") == "password") {
        $("#password").attr("type", "text");

      }
      else {
        $("#password").attr("type", "password");
      }
    });

    $("#confpassword-show").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash")
      if ($("#confpassword").attr("type") == "password") {
        $("#confpassword").attr("type", "text");

      }
      else {
        $("#confpassword").attr("type", "password");
      }
    });
    setTimeout(function () {
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
  }

  overlay_close() {
    this.uploadDocumentPopup = false;
    $(".overlay").css("display", "none");
  }

  profilePictureUpload() {
    if (this.profileImageEntity.ProfileImageName != '' && this.profileImageEntity.ProfileImageName != null) {
      var ext = this.profileImageEntity.ProfileImageName.split(".");
      ext = ext[ext.length - 1].toLowerCase();
      var arrayExtensions = ["jpg" , "jpeg", "png", "JPEG", "JPG", "PNG"];

      if (arrayExtensions.lastIndexOf(ext) == -1) {
        swal({
          type: 'warning',
          title: 'Wrong Extensions',
          text: 'you can able to upload a file Extension with ' + arrayExtensions,
          showConfirmButton: false,
          timer: 3000
        })
        this.profileImageEntity.ProfileImageName = '';
        setTimeout(function () {
          $("#editimage").val('');
          $('#user_img').attr('src', 'assets/images/placeholder.png');
          $('#editprofile_img').hide();
        }, 200);
      }
      else {
        debugger
        var count = 0;
        let file1 = '';
        var fd = new FormData();
        var total = 0;
        this.profileImageEntity.Document = [];
        if (this.profileImageEntity.ProfileImageName != '' && this.profileImageEntity.ProfileImageName != null) {
          file1 = this.elem.nativeElement.querySelector('#editimage').files;
          if (file1 && file1.length != 0) {
            total = file1.length;
            for (var k = 0; k < file1.length; k++) {
              var Images = Date.now() + '_' + file1[k]['name'].replace(/ /g, "_");
              fd.append('Document' + k, file1[k], Images);
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
          .then((data) => {
            this.globals.isLoading = false;
            if (file1) {
              this.ProfileService.uploadFileCertificate(fd, total, this.globals.authData.UserId)
                .then((data) => {
                  $("#editimage").val(null);
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.profileImage.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.profileImage.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.profileImage.text,
                    showConfirmButton: false,
                    timer: 3000
                  })
                },
                  (error) => {
                    this.globals.isLoading = false;
                    this.globals.pageNotfound(error.error.code);
                  });
            }
            else {
              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.profileImage.type,
                title: this.globals.commonTranslationText.profilePage.alerts.profileImage.title,
                text: this.globals.commonTranslationText.profilePage.alerts.profileImage.text,
                showConfirmButton: false,
                timer: 3000
              })
            }
          },
            (error) => {
              this.globals.isLoading = false;
              this.globals.pageNotfound(error.error.code);
            });
      }
    }
    else {
      this.profileImageEntity.UserId = this.globals.authData.UserId;
      this.profileImageEntity.ProfileImageName = '';
      this.profileImageEntity.ProfileImageUrl = '';
      this.globals.isLoading = true;
      this.ProfileService.addProfileImage(this.profileImageEntity)
        .then((data) => {
          this.globals.isLoading = false;
          swal({
            type: this.globals.commonTranslationText.profilePage.alerts.deleteProfileImage.type,
            title: this.globals.commonTranslationText.profilePage.alerts.deleteProfileImage.title,
            text: this.globals.commonTranslationText.profilePage.alerts.deleteProfileImage.text,
            showConfirmButton: false,
            timer: 3000
          })
        },
          (error) => {
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
  }
  ConvertToWord(num) {
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var n = [];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;

  }

  printInvoice(id) {
    this.ProfileService.getOrderInvoice(id)
      .then((data) => {
        this.InvoiceEntity = data;

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

      },
        (error) => {
          this.btn_disable = false;
          this.submitted2 = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  changepwsd() {
    this.passwordSubmit = false;
    this.submitted2 = false;
  }
  printReceipt(id) {
    debugger
    this.ProfileService.getOrderReceipt(id)
      .then((data) => {
        this.ReceiptEntity = data;
        var Num = Number(this.ReceiptEntity.Amount);
        this.ReceiptEntity.Amountword = this.ConvertToWord(Num);
        setTimeout(function () {
          var innerContents = document.getElementById('printeReceipt').innerHTML;
          var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write(innerContents);
          popupWinindow.document.close();
          popupWinindow.print();
          popupWinindow.close();
        }, 1000);

      },
        (error) => {
          this.btn_disable = false;
          this.submitted2 = false;
          this.globals.pageNotfound(error.error.code);
        });

  }
  documents(UserDocument) {
    debugger
    if (UserDocument) {
      this.documentEntity.CertificateDocumentName = '';
      this.submitted3 = false;
      this.DocumentDis = true;
      $("#CertificateDocumentName").val('');
      var aa = UserDocument.docmentID;
      this.documentEntity.UserDocumentId = UserDocument.UserDocumentId;
      this.documentEntity.CertificateDocumentId = UserDocument.docmentID;
      this.documentEntity.docType = UserDocument.DocumentTypes;
      setTimeout(() => {

        $("#CertificateDocumentId").selectpicker('refresh');
        $("#CertificateDocumentId").val(aa);

      }, 200);
    } else {
      this.submitted3 = false;
      this.DocumentDis = false;
      this.documentEntity.UserDocumentId = 0;
      setTimeout(() => {
        $("#CertificateDocumentId").selectpicker('refresh');
      }, 200);
    }
    setTimeout(function () {
      $('#documentModal').modal('show');
      $('select').selectpicker();
    }, 200);
  }
  fileTypeCheckPersonalDoc(file) {

    var ext = file.split(".");
    ext = "." + ext[ext.length - 1].toLowerCase();
    var arrayExtensions = this.documentEntity.docType;//["jpg" , "jpeg", "png", "bmp", "gif"];

    if (arrayExtensions.lastIndexOf(ext) == -1) {
      swal({
        type: 'warning',
        title: 'Wrong Extensions',
        text: 'you can able to upload a file Extension with ' + this.documentEntity.docType,
        showConfirmButton: false,
        timer: 3000
      })
      this.documentEntity.CertificateDocumentName = '';
    }
  }
  certificatedocuments(certificates, certificateDocument, edittimevalue) {
    debugger
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
      var aa = certificates.DocumentId;
      setTimeout(() => {
        $("#CertiDocumentId").selectpicker('refresh');
        $("#CertiDocumentId").val(aa);

      }, 200);
    } else {
      this.certificatedocumentEntity.UserDocumentId = 0;
      this.certiDocumentDis = false;
      setTimeout(() => {
        this.submitted5 = false;
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
      .then((data) => {
        this.globals.isLoading = false;

        this.certificateimage = data['UserAllDocuments'];
        this.certificatedocument = data['CertificateDocuments'];
        var documentSelect = {
          DocumentId: '',
          DocumentName: this.globals.commonTranslationText.profilePage.documents.select,
          Value: ""
        }
        this.certificatedocument.push(documentSelect);
        this.certificatedocument = [...this.certificatedocument, ...data['CertificateDocuments']];

      },
        (error) => {
          this.btn_disable = false;
          this.submitted1 = false;
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }

  close() {
    this.uploadDocumentPopup = false;
  }
  imageclick(image, i) {
    debugger
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
  }
  Removeimage() {
    $("#new_upload_file").val('');
    $('#uploaded_doc').attr('src', '');
    $('.uploaded_doc_block').hide();
    $('.new_block').show();
    this.certificatedocumentEntity.CertificateName = '';

  }

  fileTypeCheck(file, CertiDocumentId) {
    debugger
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
        })
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
      })
      setTimeout(function () {
        $("#new_upload_file").val('');
        $('#uploaded_doc').attr('src', '');
        $('.uploaded_doc_block').hide();
        $('.new_block').show();
      }, 200);
    }

  }
  countProgressBar() {
    debugger
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
    $('.circle').circleProgress({
      value: current_progress / 100,
      size: 70.0,
      startAngle: -Math.PI,
      emptyFill: '#ccc',
      fill: { color: '#1bc943' }
    }).on('circle-animation-progress', function (event, progress) {
      $(this).find('strong').html(current_progress + '%');
    });
  }

  profile1(profileForm1) {
   this.submitted1 = true;
    if (profileForm1.valid) {
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.profileEntity.UserId = this.globals.authData.UserId;
      this.ProfileService.editprofile(this.profileEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted1 = false;
          swal({
            type: this.globals.commonTranslationText.profilePage.alerts.profile.type,
            title: this.globals.commonTranslationText.profilePage.alerts.profile.title,
            text: this.globals.commonTranslationText.profilePage.alerts.profile.text,
            showConfirmButton: false,
            timer: 4000
          })
          this.countProgressBar();
        },
          (error) => {
            this.btn_disable = false;
            this.submitted1 = false;
            this.globals.isLoading = false;
            if(error.error.code == 422)
            {
              this.errorEntity.FirstName = (error.error.message.FirstName != "") ? error.error.message.FirstName : '';
              this.errorEntity.LastName = (error.error.message.LastName != "") ? error.error.message.LastName : '';
              this.errorEntity.PhoneNumber = (error.error.message.PhoneNumber != "") ? error.error.message.PhoneNumber : '';
            }
            else
            {
              this.globals.pageNotfound(error.error.code);
            }
            
          });
    }
  }
  getStateListadd(addressForm) {
    debugger
    addressForm.form.controls.StateId.markAsDirty();
    this.profileEntity.StateId = '';

    this.stateList = [];
    if (this.profileEntity.CountryId > 0) {
      this.ProfileService.getStateByCountryId(this.profileEntity.CountryId)
        .then((data) => {
          var data1: any;
          data1 = data;
          var stateSelect = {
            StateId: '',
            StateName: this.globals.commonTranslationText.profilePage.addressInformationForm.state.select,
            Value: ""
          }
          this.stateList.push(stateSelect);
          this.stateList = [...this.stateList, ...data1];
          setTimeout(function () {
            $('#StateId').selectpicker('refresh');
          }, 500);
        },
          (error) => {
            this.btn_disable = false;
            this.submitted2 = false;
            this.globals.pageNotfound(error.error.code);
          });
    } else {
      this.stateList = [];
    }
  }

  address(addressForm) {
   this.submitted2 = true;
    if (addressForm.valid) {
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.profileEntity.UserId = this.globals.authData.UserId;
      if (this.profileEntity.AddressId == null) {
        this.profileEntity.AddressId = 0;
      }
      this.ProfileService.editaddress(this.profileEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted2 = false;
          swal({
            type: this.globals.commonTranslationText.profilePage.alerts.address.type,
            title: this.globals.commonTranslationText.profilePage.alerts.address.title,
            text: this.globals.commonTranslationText.profilePage.alerts.address.text,
            showConfirmButton: false,
            timer: 4000
          })
          var addressadd = window.atob(this.route.snapshot.paramMap.get('addressadd'));
          if (addressadd == 'addressadd') {
            this.router.navigate(['/certificateDetails/' + this.route.snapshot.paramMap.get('certificateid') + '/' + window.btoa('schedule')]);
          }
          this.countProgressBar();
        },
          (error) => {
            this.btn_disable = false;
            this.submitted1 = false;
            this.globals.isLoading = false;
            if(error.error.code == 422)
            {
              this.errorEntity.Address1 = (error.error.message.Address1 != "") ? error.error.message.Address1 : '';
              this.errorEntity.City = (error.error.message.City != "") ? error.error.message.City : '';
              this.errorEntity.StateId = (error.error.message.StateId != "") ? error.error.message.StateId : '';
              this.errorEntity.CountryId = (error.error.message.CountryId != "") ? error.error.message.CountryId : '';
              this.errorEntity.ZipCode = (error.error.message.ZipCode != "") ? error.error.message.ZipCode : '';
              
            }
            else
            {
              this.globals.pageNotfound(error.error.code);
            }
          });
    }
  }

  changePassword(changePasswordForm) {
    this.passwordSubmit = true;
    if (changePasswordForm.valid && !this.newconfsame && !this.oldnewsame) {
      this.passwordEntity.UserId = this.globals.authData.UserId;
      this.btn_disable = true;
      this.globals.isLoading = true;
      this.PasswordService.changePassword(this.passwordEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.passwordSubmit = false;
          this.passwordEntity = {};
          changePasswordForm.form.markAsPristine();
          swal({
            type: this.globals.commonTranslationText.profilePage.alerts.changePasswordSuccess.type,
            title: this.globals.commonTranslationText.profilePage.alerts.changePasswordSuccess.title,
            text: this.globals.commonTranslationText.profilePage.alerts.changePasswordSuccess.text,
            showConfirmButton: false,
            timer: 2000
          })
        },
          (error) => {
            if (error.status == 400) {
              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.wrongOldPassword.type,
                title: this.globals.commonTranslationText.profilePage.alerts.wrongOldPassword.title,
                text: this.globals.commonTranslationText.profilePage.alerts.wrongOldPassword.text,
                showConfirmButton: false,
                timer: 4000
              })
            } else {
              this.globals.pageNotfound(error.error.code);
            }
            this.globals.isLoading = false;
            this.btn_disable = false;
            this.passwordSubmit = false;
          });
    }
  }

  confirmPassword() {
    if (this.passwordEntity.OldPassword == this.passwordEntity.Password) {
      this.oldnewsame = true;
      this.newconfsame = false;
    } else {
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
  }
  documentSubmit(documentForm) {
    debugger

    this.submitted3 = true;
    var count = 0;
    if (this.documentEntity.CertificateDocumentName == "" || this.documentEntity.CertificateDocumentName == null || this.documentEntity.CertificateDocumentName == undefined) {
      this.DocumentValid = true;
      count = 1;
    } else {
      this.DocumentValid = false;
    }
    if (documentForm.valid) {
      let file1 = '';
      var fd = new FormData();
      var total = 0;
      this.documentEntity.Document = [];

      if (this.documentEntity.CertificateDocumentId != '' && this.documentEntity.CertificateDocumentName != '') {

        file1 = this.elem.nativeElement.querySelector('#CertificateDocumentName').files;

        if (file1 && file1.length != 0) {
          total = file1.length;
          for (var k = 0; k < file1.length; k++) {
            var Images = Date.now() + '_' + file1[k]['name'].replace(/ /g, "_");
            fd.append('Document' + k, file1[k], Images);
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

      this.globals.isLoading = true;
      this.ProfileService.addDocument(this.documentEntity)
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted3 = false;
          if (file1) {
            this.ProfileService.uploadFileCertificate(fd, total, this.globals.authData.UserId)
              .then((data) => {
                $("#CertificateDocumentName").val(null);
                $("#documentModal").hide();
                swal({
                  type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                  title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                  text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                  showConfirmButton: false,
                  timer: 3000
                })
                window.location.href = "/profile/" + window.btoa('document');
              },
                (error) => {
                  this.btn_disable = false;
                  this.globals.isLoading = false;
                  this.globals.pageNotfound(error.error.code);
                });
          }
          else {
            swal({
              type: this.globals.commonTranslationText.profilePage.alerts.document.type,
              title: this.globals.commonTranslationText.profilePage.alerts.document.title,
              text: this.globals.commonTranslationText.profilePage.alerts.document.text,
              showConfirmButton: false,
              timer: 3000
            })
            window.location.href = "/profile/" + window.btoa('document');
          }
        },
          (error) => {
            this.btn_disable = false;
            this.submitted1 = false;
            this.globals.isLoading = false;
            this.globals.pageNotfound(error.error.code);
          });
    }
  }

  deletePersonalDocument(UserPersonal) {
    debugger
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
      .then((result) => {
        if (result.value) {
          this.globals.isLoading = true; debugger
          this.ProfileService.deletePersonalDocument(UserPersonal.UserDocumentId)
            .then((data) => {
              let index = this.UserPersonalDocuments.indexOf(UserPersonal);
              if (index != -1) {
                this.UserPersonalDocuments.splice(index, 1);
              }
              this.globals.isLoading = false;

              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.type,
                title: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.title,
                text: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
            },
              (error) => {
                this.globals.isLoading = false;
                if (error.error.message == "Already in use") {
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.text,
                    showConfirmButton: false,
                    timer: 4000
                  })
                }
                else {
                  this.globals.pageNotfound(error.error.code);
                }
              });
        }
      })
  }

  deleteDocument(certificateDocument, certificates, value) {
    debugger
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
      .then((result) => {
        if (result.value) {
          console.log(certificates);
          this.globals.isLoading = true; debugger
          this.ProfileService.deleteDocument(certificateDocument.UserDocumentId, certificateDocument.UserDocumentCertificateMappingId)
            .then((data) => {
              this.globals.isLoading = false;
              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.type,
                title: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.title,
                text: this.globals.commonTranslationText.profilePage.alerts.deleteSuccess.text,
                showConfirmButton: false,
                timer: 4000
              })
              window.location.href = "/profile/" + window.btoa('document');
            },
              (error) => {
                this.globals.isLoading = false;
                if (error.error.message == "Already in use") {
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.alreadyUseDocument.text,
                    showConfirmButton: false,
                    timer: 4000
                  })
                }
                else {
                  this.globals.pageNotfound(error.error.code);
                }
              });
        }
      })
  }
  SearchFilter(SearchFilterForm) {
    debugger
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
      .then((data) => {

        this.orderHistorylist = data;
        for (var i = 0; i < this.orderHistorylist.length; i++) {
          if (this.orderHistorylist[i].CertificationEndDate == null) {
            if (this.orderHistorylist[i].PaymentDate == null)
              var someDate = new Date();
            else
              var someDate = new Date(this.orderHistorylist[i].PaymentDate);
            
            var AssessmentDuration = JSON.parse(this.orderHistorylist[i].AssessmentDuration);
            someDate.setMonth(someDate.getMonth() + AssessmentDuration);
            console.log(someDate);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();
            if (mm < 10) {
              var month = '0' + mm;
            } else {
              var month = '' + mm;
            }
            if (dd < 10) {
              var date = '0' + dd;
            }
            else {
              var date = '' + dd;
            }
            this.assessmentExpirationDate = y + '-' + month + '-' + date;
            this.orderHistorylist[i].assessmentExpirationDate = this.assessmentExpirationDate
          }
          var date3: any;
          var date4: any;
          date3 = new Date();
          date4 = new Date(someDate);
          const diffTime = Math.abs(date3 - date4);
          this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          this.orderHistorylist[i].diffDays = this.diffDays;
        }
        this.globals.isLoading = false;
        this.FilterEntity = {};
        SearchFilterForm.form.markAsPristine();

      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  clearData(SearchFilterForm) {
    this.globals.isLoading = true;
    this.ProfileService.getAllDefault(this.globals.authData.UserId)
      .then((data) => {
        this.FilterEntity = {};
        this.countProgressBar();

        setTimeout(function () {
          $("#OrderDateFrom").val('');
        }, 100);
        this.orderHistorylist = data['orderHistory'];
        for (var i = 0; i < this.orderHistorylist.length; i++) {
          if (this.orderHistorylist[i].CertificationEndDate == null) {
            if (this.orderHistorylist[i].PaymentDate == null)
              var someDate = new Date();
            else
              var someDate = new Date(this.orderHistorylist[i].PaymentDate);
            
            var AssessmentDuration = JSON.parse(this.orderHistorylist[i].AssessmentDuration);
            someDate.setMonth(someDate.getMonth() + AssessmentDuration);
            console.log(someDate);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();
            if (mm < 10) {
              var month = '0' + mm;
            } else {
              var month = '' + mm;
            }
            if (dd < 10) {
              var date = '0' + dd;
            }
            else {
              var date = '' + dd;
            }
            this.assessmentExpirationDate = y + '-' + month + '-' + date;
            this.orderHistorylist[i].assessmentExpirationDate = this.assessmentExpirationDate
          }
          var date3: any;
          var date4: any;
          date3 = new Date();
          date4 = new Date(someDate);
          const diffTime = Math.abs(date3 - date4);
          this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          this.orderHistorylist[i].diffDays = this.diffDays;
        }
        this.globals.isLoading = false;
        SearchFilterForm.form.markAsPristine();
      },
        (error) => {
          this.globals.isLoading = false;
          this.globals.pageNotfound(error.error.code);
        });
  }
  certidocumentSubmit(CertificatedocumentForm) {
    debugger
    this.submitted5 = true;
    var count = 0;

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
          })
        } else {
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
          })
        } else {
          this.DocumentValid = false;
        }
      }
    }
    if (CertificatedocumentForm.valid && !this.DocumentValid) {
      let getCurrentObj = CertificatedocumentForm.form.value;
      this.certificatedocumentEntity.ExpiryDate = getCurrentObj.ExpiryDate;
      let file1 = '';
      var fd = new FormData();
      var total = 0;
      this.certificatedocumentEntity.Document = [];

      if (this.certificatedocumentEntity.CertificateName != '' && this.certificatedocumentEntity.CertificateName != '') {

        file1 = this.elem.nativeElement.querySelector('#new_upload_file').files;

        if (file1 && file1.length != 0) {
          total = file1.length;
          for (var k = 0; k < file1.length; k++) {
            var Images = Date.now() + '_' + file1[k]['name'].replace(/ /g, "_");
            fd.append('Document' + k, file1[k], Images);
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
        .then((data) => {
          this.globals.isLoading = false;
          this.btn_disable = false;
          this.submitted3 = false;
          if (this.certificatedocumentEntity.UserDocumentId != 0) {
            $("#new_upload_file").val(null);
            //$("#certificateModal").hide();
            this.uploadDocumentPopup = false;
            swal({
              type: this.globals.commonTranslationText.profilePage.alerts.document.type,
              title: this.globals.commonTranslationText.profilePage.alerts.document.title,
              text: this.globals.commonTranslationText.profilePage.alerts.document.text,
              showConfirmButton: false,
              timer: 5000
            })
            window.location.href = "/profile/" + window.btoa('document');
          } else {
            if (file1) {
              this.ProfileService.uploadFileCertificate(fd, total, this.globals.authData.UserId)
                .then((data) => {
                  $("#new_upload_file").val(null);
                  //$("#certificateModal").hide();
                  this.uploadDocumentPopup = false;
                  swal({
                    type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                    title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                    text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                    showConfirmButton: false,
                    timer: 5000
                  })
                  window.location.href = "/profile/" + window.btoa('document');
                },
                  (error) => {
                    this.btn_disable = false;
                    this.globals.isLoading = false;
                    this.globals.pageNotfound(error.error.code);
                  });
            }
            else {
              swal({
                type: this.globals.commonTranslationText.profilePage.alerts.document.type,
                title: this.globals.commonTranslationText.profilePage.alerts.document.title,
                text: this.globals.commonTranslationText.profilePage.alerts.document.text,
                showConfirmButton: false,
                timer: 5000
              })
              window.location.href = "/profile/" + window.btoa('document');
            }
          }
        },
          (error) => {
            this.btn_disable = false;
            this.submitted1 = false;
            this.globals.isLoading = false;
          });
    }
  }
}
