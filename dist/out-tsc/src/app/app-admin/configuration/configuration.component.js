import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../services/configuration.service';
var ConfigurationComponent = /** @class */ (function () {
    function ConfigurationComponent(globals, router, route, ConfigurationService) {
        this.globals = globals;
        this.router = router;
        this.route = route;
        this.ConfigurationService = ConfigurationService;
    }
    ConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globals.isLoading = false;
        $("#password-show").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            if ($("#password").attr("type") == "password") {
                $("#password").attr("type", "text");
            }
            else {
                $("#password").attr("type", "password");
            }
        });
        this.globals.isLoading = true;
        this.configurationEntity = {};
        this.ConfigurationService.getAll()
            .then(function (data) {
            debugger;
            _this.configurationEntity = data;
            console.log(_this.configurationEntity);
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
            _this.globals.pageNotfound(error.error.code);
        });
    };
    ConfigurationComponent.prototype.update = function (configurationForm) {
        var _this = this;
        debugger;
        if (configurationForm.valid) {
            this.btn_disable = true;
            this.submitted = false;
            this.globals.isLoading = true;
            this.ConfigurationService.update(this.configurationEntity)
                .then(function (data) {
                _this.globals.isLoading = false;
                _this.btn_disable = false;
                _this.submitted = false;
                swal({
                    type: _this.globals.adminTranslationText.configuration.form.alerts.success.type,
                    title: _this.globals.adminTranslationText.configuration.form.alerts.success.title,
                    text: _this.globals.adminTranslationText.configuration.form.alerts.success.text,
                    showConfirmButton: false,
                    timer: 2000
                });
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
    };
    ConfigurationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-configuration',
            templateUrl: './configuration.component.html',
            styleUrls: ['./configuration.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute, ConfigurationService])
    ], ConfigurationComponent);
    return ConfigurationComponent;
}());
export { ConfigurationComponent };
//# sourceMappingURL=configuration.component.js.map