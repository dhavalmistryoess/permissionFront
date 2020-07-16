import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ManageRegisterRequestService } from '../services/manage-register-request.service';
var UserCertificateDetailComponent = /** @class */ (function () {
    function UserCertificateDetailComponent(globals, router, route, ManageRegisterRequestService, elem) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.ManageRegisterRequestService = ManageRegisterRequestService;
        this.elem = elem;
    }
    UserCertificateDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.certificateDetail = {};
        this.verifyEntity = {};
        this.certificatedocumentEntity = {};
        this.commentDisplay = false;
        var UserId = this.route.snapshot.paramMap.get('id');
        this.pagename = window.atob(this.route.snapshot.paramMap.get('pagename'));
        this.globals.isLoading = true;
        if (UserId) {
            UserId = window.atob(UserId);
            console.log(UserId);
            this.ManageRegisterRequestService.getUserCertificates(UserId)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.certificateDetail = data;
                _this.certificateimage = data['UserAllDocuments'];
                console.log(_this.certificateDetail);
                for (var i = 0; i < _this.certificateDetail.CertificateData.length; i++) {
                    for (var j = 0; j < _this.certificateDetail.CertificateData[i].OptionalDocuments.length; j++) {
                        //console.log(this.profileEntity.CertificateData[i].OptionalDocuments[j].DocumentName);
                        if (_this.certificateDetail.CertificateData[i].OptionalDocuments[j].UserDocumentId != null) {
                            _this.certificateDetail.CertificateData[i].OptionalDocuments[j].flag = 1;
                            var ExtStr = _this.certificateDetail.CertificateData[i].OptionalDocuments[j].CertificateDocumentName;
                            var Ext1 = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                            _this.certificateDetail.CertificateData[i].OptionalDocuments[j].Ext = Ext1;
                        }
                        else {
                            _this.certificateDetail.CertificateData[i].OptionalDocuments[j].flag = 0;
                        }
                    }
                    for (var k = 0; k < _this.certificateDetail.CertificateData[i].MandatoryDocuments.length; k++) {
                        //console.log(this.profileEntity.CertificateData[i].OptionalDocuments[j].DocumentName);
                        if (_this.certificateDetail.CertificateData[i].MandatoryDocuments[k].UserDocumentId != null) {
                            _this.certificateDetail.CertificateData[i].MandatoryDocuments[k].flag = 1;
                            var ExtStr = _this.certificateDetail.CertificateData[i].MandatoryDocuments[k].CertificateDocumentName;
                            var Ext2 = "." + ExtStr.split(".")[1]; //ExtStr.substring(ExtStr.length - 4, ExtStr.length);
                            _this.certificateDetail.CertificateData[i].MandatoryDocuments[k].Ext = Ext2;
                        }
                        else {
                            _this.certificateDetail.CertificateData[i].MandatoryDocuments[k].flag = 0;
                        }
                    }
                }
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
        }
        setTimeout(function () {
            $('.file_upload input[type="file"]').change(function (e) {
                var fileName = e.target.files[0].name;
                $('.file_upload input[type="text"]').val(fileName);
            });
        }, 5000);
        setTimeout(function () {
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
        }, 100);
    };
    UserCertificateDetailComponent.prototype.certificatedocuments = function (certificates, certificateDocument) {
        debugger;
        if (certificateDocument.UserDocumentCertificateMappingId != null) {
            this.certificatedocumentEntity.UserDocumentId = certificateDocument.UserDocumentId;
            this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
            //$("#CertificateDocumentId").val(13);
            var aa = certificates.DocumentId;
            setTimeout(function () {
                $("#CertiDocumentId").selectpicker('refresh');
                $("#CertiDocumentId").val(aa);
            }, 200);
        }
        else {
            this.certificatedocumentEntity.UserDocumentId = 0;
            this.Removeimage();
        }
        this.arrayExtensions = certificateDocument.DocumentTypes;
        this.certificatedocumentEntity.UserDocumentCertificateMappingId = certificateDocument.UserDocumentCertificateMappingId;
        this.certificatedocumentEntity.UserCertificateId = certificates.UserCertificateId;
        this.certificatedocumentEntity.CertiDocumentId = certificateDocument.DocumentId;
        this.certificatedocumentEntity.DocumentId = certificateDocument.DocumentId;
        this.certificatedocumentEntity.CertificateDocumentId = certificateDocument.CertificateDocumentId;
        this.certificatedocumentEntity.certificatename = certificates.CertificateName;
        this.certificatedocumentEntity.UserId = certificates.UserId;
        $('#certificateModal').modal('show');
        console.log(this.certificatedocumentEntity);
    };
    UserCertificateDetailComponent.prototype.Removeimage = function () {
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
    UserCertificateDetailComponent.prototype.fileTypeCheck = function (file, CertiDocumentId) {
        this.certificatedocumentEntity.UserDocumentId = 0;
        $('.check_box input[name="document_select"]').prop('checked', false);
        if (CertiDocumentId != '' && CertiDocumentId != undefined) {
            // for (var j = 0; j < this.certificatedocument.length; j++) {
            //   if (this.certificatedocument[j].DocumentId == CertiDocumentId) {
            //     var arrayExtensions = this.certificatedocument[j].DocumentType;
            //   }
            // }
            var ext = file.split(".");
            ext = "." + ext[ext.length - 1].toLowerCase();
            //var arrayExtensions = ["jpg" , "jpeg", "png", "bmp", "gif"];
            if (this.arrayExtensions.lastIndexOf(ext) == -1) {
                swal({
                    type: 'warning',
                    title: 'Wrong Extensions',
                    text: 'You can not upload file that extensions with ' + ext,
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
    UserCertificateDetailComponent.prototype.imageclick = function (image, i) {
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
        this.certificatedocumentEntity.UserDocumentId = image.UserDocumentId;
    };
    UserCertificateDetailComponent.prototype.certidocumentSubmit = function (CertificatedocumentForm) {
        var _this = this;
        debugger;
        //alert(this.certificatedocumentEntity.CertiDocumentId);
        //this.submitted5 = true;
        var count = 0;
        // var certificate;
        // for (certificate of this.certificatedocument) {
        //   if (this.certificatedocumentEntity.CertiDocumentId == certificate.DocumentId) {
        //     this.certificatedocumentEntity.DocumentId = certificate.DocumentId;
        //     this.certificatedocumentEntity.CertificateDocumentId = certificate.CertificateDocumentId;
        //   }
        // }
        if (this.certificatedocumentEntity.CertiDocumentId != '' && this.certificatedocumentEntity.CertiDocumentId != undefined) {
            if ((this.certificatedocumentEntity.CertificateName == "" || this.certificatedocumentEntity.CertificateName == null || this.certificatedocumentEntity.CertificateName == undefined)
                && this.certificatedocumentEntity.UserDocumentId == '') {
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
        if (CertificatedocumentForm.valid && !this.DocumentValid) {
            var file1_1 = '';
            var fd = new FormData();
            var total = 0;
            this.certificatedocumentEntity.Document = [];
            if (this.certificatedocumentEntity.CertificateName != '' && this.certificatedocumentEntity.CertificateName != '') {
                file1_1 = this.elem.nativeElement.querySelector('#new_upload_file').files;
                if (file1_1 && file1_1.length != 0) {
                    total = file1_1.length;
                    for (var k = 0; k < file1_1.length; k++) {
                        var Images = Date.now() + '_' + file1_1[k]['name'];
                        fd.append('Document' + k, file1_1[k], Images);
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
                    UserId: this.certificatedocumentEntity.UserId,
                    documentCount: 1,
                    UserName: this.globals.authData.FirstName + ' ' + this.globals.authData.LastName,
                    CertificateName: this.certificatedocumentEntity.certificateName, LoginURL: '/login'
                }];
            console.log(this.certificatedocumentEntity);
            this.globals.isLoading = true;
            this.ManageRegisterRequestService.UpdateCertificateDocuments(this.certificatedocumentEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                var UserId = window.atob(_this.route.snapshot.paramMap.get('id'));
                //this.btn_disable = false;
                // this.submitted3 = false;
                if (_this.certificatedocumentEntity.UserDocumentId != 0) {
                    $("#new_upload_file").val(null);
                    $("#certificateModal").hide();
                    window.location.href = "/admin/userCertificateDetail/" + _this.route.snapshot.paramMap.get('id') + '/' + _this.route.snapshot.paramMap.get('pagename');
                }
                else {
                    if (file1_1) {
                        _this.ManageRegisterRequestService.uploadFileCertificate(fd, total, _this.certificatedocumentEntity.UserId)
                            .then(function (data) {
                            $("#new_upload_file").val(null);
                            $("#certificateModal").hide();
                            swal({
                                type: _this.globals.commonTranslationText.profilePage.alerts.document.type,
                                title: _this.globals.commonTranslationText.profilePage.alerts.document.title,
                                text: _this.globals.commonTranslationText.profilePage.alerts.document.text,
                                showConfirmButton: false,
                                timer: 3000
                            });
                            window.location.href = "/admin/userCertificateDetail/" + _this.route.snapshot.paramMap.get('id') + '/' + _this.route.snapshot.paramMap.get('pagename');
                            //this.router.navigate(['/profile']);	
                        }, function (error) {
                            //this.btn_disable = false;
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
                            timer: 3000
                        });
                        //this.router.navigate(['/profile']);
                        window.location.href = "/admin/userCertificateDetail/" + _this.route.snapshot.paramMap.get('id') + '/' + _this.route.snapshot.paramMap.get('pagename');
                    }
                }
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
        }
    };
    UserCertificateDetailComponent.prototype.deleteDocument = function (certificateDocument, certificates, value) {
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
                _this.ManageRegisterRequestService.deleteDocument(certificateDocument.UserDocumentId, certificateDocument.UserDocumentCertificateMappingId)
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
                    // var UserId = this.route.snapshot.paramMap.get('id');
                    var UserId = window.atob(_this.route.snapshot.paramMap.get('id'));
                    window.location.href = "/admin/userCertificateDetail/" + _this.route.snapshot.paramMap.get('id') + '/' + _this.route.snapshot.paramMap.get('pagename');
                }, function (error) {
                    _this.globals.isLoading = false;
                    // if (error.text) {
                    //   // swal({
                    //   //   //position: 'top-end',
                    //   //   type: this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                    //   //   title: this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                    //   //   text: this.globals.commonTranslationText.common.alerts.somethingWrong.text,
                    //   // })
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
    UserCertificateDetailComponent.prototype.verifyViewDocument = function (UserCertificateId, CertificateName) {
        this.verifyEntity.UserCertificateId = UserCertificateId;
        this.verifyEntity.CertificateName = CertificateName;
    };
    UserCertificateDetailComponent.prototype.VerifyDocument = function (i) {
        var _this = this;
        debugger;
        if (i == 0) {
            if (this.verifyEntity.DocumentVerificationComment == null || this.verifyEntity.DocumentVerificationComment == '' || this.verifyEntity.DocumentVerificationComment == undefined) {
                this.commentDisplay = true;
            }
            else
                this.commentDisplay = false;
        }
        if (!this.commentDisplay) {
            if (i == 0)
                this.verifyEntity.DocumentVerificationStatus = 'Not Verify';
            else
                this.verifyEntity.DocumentVerificationStatus = 'verify';
            if (this.verifyEntity.DocumentVerificationComment == null || this.verifyEntity.DocumentVerificationComment == '' || this.verifyEntity.DocumentVerificationComment == undefined) {
                this.verifyEntity.DocumentVerificationComment = 'NA';
            }
            else
                this.verifyEntity.DocumentVerificationComment = this.verifyEntity.DocumentVerificationComment;
            var UserId = window.atob(this.route.snapshot.paramMap.get('id'));
            this.verifyEntity.UserId = UserId;
            this.verifyEntity.UpdatedBy = this.globals.authData.UserId;
            this.verifyEntity.UserName = this.certificateDetail.Name;
            this.verifyEntity.LoginURL = '/login';
            this.verifyEntity.RoleId = this.certificateDetail.RoleId;
            console.log(this.verifyEntity);
            this.globals.isLoading = true;
            this.ManageRegisterRequestService.VerifyDocuments(this.verifyEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                $('#verifyModal').modal('hide');
                if (i == 1) {
                    swal({
                        type: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.alerts.type,
                        title: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.alerts.title,
                        text: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.alerts.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                }
                else {
                    swal({
                        type: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.rejectedDocument.type,
                        title: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.rejectedDocument.title,
                        text: _this.globals.adminTranslationText.manageRegisterRequest.userCertificateDetails.rejectedDocument.text,
                        showConfirmButton: false,
                        timer: 5000
                    });
                }
                window.location.href = "/admin/userCertificateDetail/" + _this.route.snapshot.paramMap.get('id') + '/' + _this.route.snapshot.paramMap.get('pagename');
            }, function (error) {
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
    UserCertificateDetailComponent.prototype.mandatoryDocumentsStatusChange = function (mandatoryDocuments, i) {
        var _this = this;
        debugger;
        var IsVerify = 0;
        // if($("#docactive"+i).is(':checked'))
        if (i) {
            IsVerify = 1;
        }
        this.globals.isLoading = true;
        this.ManageRegisterRequestService.VerifyDocument(mandatoryDocuments.UserDocumentCertificateMappingId, IsVerify)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (IsVerify == 1) {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.mandatoryDocumentNotVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
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
    UserCertificateDetailComponent.prototype.optionalDocumentsStatusChange = function (optionalDocuments, i) {
        var _this = this;
        var IsVerify = 0;
        if (i) {
            IsVerify = 1;
        }
        this.globals.isLoading = true;
        this.ManageRegisterRequestService.VerifyDocument(optionalDocuments.UserDocumentCertificateMappingId, IsVerify)
            .then(function (data) {
            _this.globals.isLoading = false;
            if (IsVerify == 1) {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            else {
                swal({
                    type: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.type,
                    title: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.title,
                    text: _this.globals.commonTranslationText.proctorDashboard.attendanceSheet.list.documentsVerification.alerts.optionalDocumentNotVerify.text,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
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
    UserCertificateDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-certificate-detail',
            templateUrl: './user-certificate-detail.component.html',
            styleUrls: ['./user-certificate-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, ManageRegisterRequestService, ElementRef])
    ], UserCertificateDetailComponent);
    return UserCertificateDetailComponent;
}());
export { UserCertificateDetailComponent };
//# sourceMappingURL=user-certificate-detail.component.js.map