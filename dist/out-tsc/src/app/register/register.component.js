import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { JwtHelperService } from '@auth0/angular-jwt';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(globals, router, elem, route, RegisterService) {
        this.globals = globals;
        this.router = router;
        this.elem = elem;
        this.route = route;
        this.RegisterService = RegisterService;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.registerEntity = {};
        this.privacypolicyEntity = {};
        this.roleValid = false;
        var id = this.route.snapshot.paramMap.get('id');
        if (id) {
            debugger;
            var id1 = new JwtHelperService().decodeToken(id);
            this.registerEntity.FirstName = id1.FirstName;
            this.registerEntity.LastName = id1.LastName;
            this.registerEntity.RoleId = id1.RoleId;
            var CertificateId = [id1.CertificateId];
            this.registerEntity.CertificateId = CertificateId;
            this.registerEntity.EmailAddress = id1.EmailAddress;
            this.hidepreviou = true;
            this.hidenext = true;
            this.Certificatedisabled = true;
            setTimeout(function () {
                $("#role-tab").removeClass("disabled");
                $("#role-tab").addClass("active");
                $("#role").addClass("show active");
                $("#personalinfo-tab").removeClass("disabled");
                $("#personalinfo-tab").addClass("active");
                $("#certificate").removeClass("show active");
                $("#certificate-tab").addClass("active");
                $("#document").removeClass("show active");
            });
            this.registerEntity.RegistrationType = 2;
        }
        else {
            this.Certificatedisabled = false;
            this.registerEntity.FirstName = '';
            this.registerEntity.LastName = '';
            this.registerEntity.RoleId = '3';
            this.registerEntity.CertificateId = '';
            this.registerEntity.EmailAddress = '';
            this.hidepreviou = false;
            this.hidenext = true;
            this.registerEntity.RegistrationType = 1;
        }
        $(document).ready(function () {
            var body = document.querySelector('body');
            body.style.setProperty('--screen-height', $(window).height() + "px");
        });
        this.RegisterService.getAllDefault()
            .then(function (data) {
            _this.certificateList = data['Certificates'];
            _this.globals.isLoading = false;
            setTimeout(function () {
                $('select').selectpicker();
            }, 200);
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
        $("#newpassword-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#newpassword").attr("type") == "password") {
                $("#newpassword").attr("type", "text");
            }
            else {
                $("#newpassword").attr("type", "password");
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
        $('a[data-toggle="tab"]').addClass('disabled');
        var item = { CertificateDocumentId: '', CertificateDocumentName: '', DocumentUrl: '/assests/Documents/' };
        this.documentDetail = [];
        this.documentDetail.push(item);
    };
    RegisterComponent.prototype.register1 = function (registerForm1) {
        debugger;
        //$("input[name=nameGoesHere]").val();
        if (this.registerEntity.RoleId == '' || this.registerEntity.RoleId == undefined) {
            this.roleValid = true;
        }
        else
            this.roleValid = false;
        this.submitted1 = true;
        if (registerForm1.valid && !this.roleValid) {
            this.submitted1 = false;
            $("#role-tab").removeClass("disabled");
            $("#role-tab").addClass("complete");
            $("#personalinfo-tab").removeClass("disabled");
            $("#personalinfo-tab").addClass("active");
            $("#personalinfo").addClass("show active");
            $("#role").removeClass("show active");
        }
    };
    RegisterComponent.prototype.previous1 = function () {
        setTimeout(function () {
            $("#certificate").removeClass("show active");
            $("#personalinfo").removeClass("show active");
            $("#document").removeClass("show active");
            $("#role").addClass("show active");
        });
    };
    // documents(certificateId) {
    //   // debugger
    //   this.RegisterService.getById(certificateId)
    //     .then((data) => {
    //       this.documentList = data;
    //       this.globals.isLoading = false;
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
    RegisterComponent.prototype.register3 = function (registerForm3) {
        var _this = this;
        this.globals.isLoading = true;
        this.submitted2 = true;
        // if(registerForm3.valid)
        // {
        this.submitted2 = false;
        if (this.registerEntity.RoleId == 2) {
            this.registerEntity.CertificateFor = 1;
        }
        else {
            this.registerEntity.CertificateFor = 0;
        }
        if (this.registerEntity.CertificateId == '') {
            // $("#certificate-tab").addClass("complete");
            // $("#certificate").removeClass("show active");
            // $("#document-tab").removeClass("disabled");
            // $("#document-tab").addClass("active");
            // $("#document").addClass("show active");
            this.globals.isLoading = false;
            swal({
                type: this.globals.commonTranslationText.registerPage.form.alerts.type,
                title: this.globals.commonTranslationText.registerPage.form.alerts.title,
                text: this.globals.commonTranslationText.registerPage.form.alerts.text,
                showConfirmButton: false,
                timer: 4000
            });
            this.router.navigate(['/login']);
        }
        else {
            this.RegisterService.AddCertificate(this.registerEntity)
                .then(function (data) {
                debugger;
                _this.globals.isLoading = false;
                swal({
                    type: _this.globals.commonTranslationText.registerPage.form.alerts.type,
                    title: _this.globals.commonTranslationText.registerPage.form.alerts.title,
                    text: _this.globals.commonTranslationText.registerPage.form.alerts.text,
                    showConfirmButton: false,
                    timer: 4000
                });
                _this.router.navigate(['/login']);
                // $("#certificate-tab").addClass("complete");
                // $("#certificate").removeClass("show active");
                // $("#document-tab").removeClass("disabled");
                // $("#document-tab").addClass("active");
                // $("#document").addClass("show active");
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
        // }
    };
    RegisterComponent.prototype.previous2 = function () {
        setTimeout(function () {
            $("#document").removeClass("show active");
            $("#certificate").removeClass("show active");
            $("#role").removeClass("show active");
            $("#personalinfo").addClass("show active");
        });
    };
    RegisterComponent.prototype.checkpassword = function () {
        if (this.registerEntity.cPassword != this.registerEntity.Password) {
            this.same = true;
        }
        else {
            this.same = false;
        }
    };
    RegisterComponent.prototype.register2 = function (registerForm2) {
        var _this = this;
        debugger;
        this.globals.isLoading = true;
        // setTimeout(function () {
        //   $('select').selectpicker();
        // }, 5000);
        this.submitted3 = true;
        this.privacypolicyEntity.privacypolicy;
        if (registerForm2.valid && !this.same) {
            this.submitted3 = false;
            this.RegisterService.CheckEmail(this.registerEntity)
                .then(function (data) {
                if (data == 'EmailAddress already exists') {
                    _this.btn_disable = false;
                    _this.globals.isLoading = false;
                    swal({
                        type: _this.globals.commonTranslationText.common.alerts.somethingWrong.type,
                        title: _this.globals.commonTranslationText.common.alerts.somethingWrong.title,
                        text: _this.globals.commonTranslationText.registerPage.form.alerts.duplicateEmail,
                        showConfirmButton: false,
                        timer: 4000
                    });
                }
                else {
                    _this.registerEntity.LoginURL = '/login';
                    _this.RegisterService.addUpdate(_this.registerEntity)
                        .then(function (data) {
                        _this.registerEntity.UserId = data;
                        $("#personalinfo").removeClass("show active");
                        $("#personalinfo-tab").addClass("complete");
                        $("#certificate-tab").removeClass("disabled");
                        $("#certificate-tab").addClass("active");
                        $("#certificate").addClass("show active");
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
        }
    };
    RegisterComponent.prototype.documentSelect = function (e, i) {
        // debugger
        var fileName = e.files[0].name;
        $('#abc' + i).val(fileName);
        setTimeout(function () {
            $('select').selectpicker();
        }, 200);
    };
    RegisterComponent.prototype.addDocumentDetail = function (j, CertificateDocumentId) {
        if (CertificateDocumentId > 0) {
            for (var i = 0; i < this.documentList.length; i++) {
                if (CertificateDocumentId == this.documentList[i].CertificateDocumentId) {
                    // this.evaluationEntity.LineManagerName = this.userlist1[i].label;
                    this.documentList[i].flag = 1;
                }
            }
        }
        var item = { CertificateDocumentId: '', CertificateDocumentName: '', DocumentUrl: '/assests/Documents/' };
        this.documentDetail.push(item);
        setTimeout(function () {
            $('select').selectpicker();
        }, 200);
    };
    RegisterComponent.prototype.deleteDocumentDetail = function (mapping, j, CertificateDocumentId) {
        if (CertificateDocumentId > 0) {
            for (var i = 0; i < this.documentList.length; i++) {
                if (CertificateDocumentId == this.documentList[i].CertificateDocumentId) {
                    // this.evaluationEntity.LineManagerName = this.userlist1[i].label;
                    this.documentList[i].flag = 0;
                }
            }
        }
        var index = this.documentDetail.indexOf(mapping);
        this.documentDetail.splice(index, 1);
    };
    RegisterComponent.prototype.previous3 = function () {
        setTimeout(function () {
            $("#document").removeClass("show active");
            $("#role").removeClass("show active");
            $("#certificate").addClass("show active");
            // $("#certificate").removeClass("show active");
        });
    };
    RegisterComponent.prototype.register4 = function (registerForm4) {
        var _this = this;
        // debugger
        this.btn_disable = true;
        this.submitted4 = true;
        this.globals.isLoading = true;
        var count = 0;
        for (var i = 0; i < this.documentDetail.length; i++) {
            if (this.documentDetail[i].CertificateDocumentId > 0) {
                if (this.documentDetail[i].CertificateDocumentName == "" || this.documentDetail[i].CertificateDocumentName == null || this.documentDetail[i].CertificateDocumentName == undefined) {
                    this.documentDetail[i].VideoValid = true;
                    count = 1;
                }
                else {
                    this.documentDetail[i].VideoValid = false;
                }
            }
            else {
                count = 0;
            }
        }
        if (registerForm4.valid && count == 0) {
            this.submitted4 = false;
            this.registerEntity.UserDocuments = [];
            this.registerEntity.LoginURL = '/login';
            for (var j = 0; j < this.documentDetail.length; j++) {
                if (this.documentDetail[j].CertificateDocumentId != '' && this.documentDetail[j].CertificateDocumentName != '') {
                }
            }
            // let file1 = '';
            var fd = new FormData();
            var total = 0;
            if (this.documentDetail.length > 0) {
                this.registerEntity.Document = [];
                for (var i = 0; i < this.documentDetail.length; i++) {
                    total = this.documentDetail.length;
                    this.UploadId = this.documentDetail[i].CertificateDocumentId;
                    if (this.documentDetail[i].CertificateDocumentId > 0) {
                        var file5 = this.elem.nativeElement.querySelector('#CertificateDocumentName' + i).files[0];
                        if (file5) {
                            var Images = Date.now() + '_' + file5['name'];
                            // fd.append('UserImage', file5,Uservideo);
                            // this.RegisterEntity.UserImage = Uservideo;
                            fd.append('Document' + i, file5, Images);
                            this.registerEntity.Document = Images;
                            // this.registerEntity.UserDocuments[i]['CertificateDocumentName']=Images;
                            this.documentDetail[i].CertificateDocumentName = Images;
                            this.registerEntity.UserDocuments.push(this.documentDetail[i]);
                        }
                        else {
                            fd.append('Document', null);
                            this.registerEntity.Document = null;
                        }
                    }
                    // file1 = this.elem.nativeElement.querySelector('#CertificateDocumentName' + i).files;
                    // if (file1 && file1.length != 0)
                    // {
                    //   for (var k = 0; k < file1.length; k++) {
                    //     var Images = Date.now() + '_' + file1[k]['name'];
                    //     fd.append('Document' + k, file1[k], Images);
                    //     this.registerEntity.Document.push(Images);
                    //     this.documentDetail[i].CertificateDocumentName = Images;
                    //   }                  
                    // } 
                    // else 
                    // {
                    //   fd.append('Document', null); 
                    //   this.registerEntity.Document = null;
                    // }
                }
            }
            this.RegisterService.addUpdate(this.registerEntity)
                .then(function (data) {
                // this.btn_disable = false;
                // this.submitted4 = false;
                // this.registerEntity = {};
                // if (file1) {
                // var fd = new FormData();
                // for (var i = 0; i < this.documentDetail.length; i++) {
                //   let  file5 = this.elem.nativeElement.querySelector('#CertificateDocumentName' + i).files[0];
                //   if (file5) {
                //     var Images = Date.now() + '_' + file5['name'];
                //     // fd.append('UserImage', file5,Uservideo);
                //     // this.RegisterEntity.UserImage = Uservideo;
                //     fd.append('Document' + i, file5, Images);
                //     this.documentDetail[i].Images = Images;
                //   }
                //   else {
                //     fd.append('Document', null);
                //     this.documentDetail[i].Video = null;
                //   }
                // }
                if (_this.UploadId > 0) {
                    _this.RegisterService.uploadFileCertificate(fd, _this.documentDetail.length, data)
                        .then(function (data) {
                        $("#CertificateDocumentName").val(null);
                        swal({
                            type: _this.globals.commonTranslationText.registerPage.form.alerts.type,
                            title: _this.globals.commonTranslationText.registerPage.form.alerts.title,
                            text: _this.globals.commonTranslationText.registerPage.form.alerts.text,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        _this.router.navigate(['/login']);
                    }, function (error) {
                        _this.btn_disable = false;
                        _this.globals.isLoading = false;
                        _this.globals.pageNotfound(error.error.code);
                    });
                }
                else {
                    swal({
                        type: _this.globals.commonTranslationText.registerPage.form.alerts.type,
                        title: _this.globals.commonTranslationText.registerPage.form.alerts.title,
                        text: _this.globals.commonTranslationText.registerPage.form.alerts.text,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    _this.router.navigate(['/login']);
                }
                // }
                // else{
                // 	swal({
                //     type: this.globals.commonTranslationText.registerPage.form.alerts.type,
                //     title: this.globals.commonTranslationText.registerPage.form.alerts.title,
                //     text: this.globals.commonTranslationText.registerPage.form.alerts.text,
                //     showConfirmButton: false,
                //     timer: 3000
                //   })
                //   this.router.navigate(['/login']);
                // }
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
        }
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ElementRef, ActivatedRoute, RegisterService])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map