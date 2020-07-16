import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
var HttpInterceptorClassService = /** @class */ (function () {
    function HttpInterceptorClassService(router) {
        this.router = router;
    }
    HttpInterceptorClassService.prototype.intercept = function (req, next) {
        //debugger
        var _this = this;
        req = req.clone({
            setHeaders: {
                Authorization: "" + localStorage.getItem('token')
            }
        });
        return next.handle(req).pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                if (event.body.error_code == 2008) {
                    return _this.router.navigate(['/pagenotfound']);
                }
                else {
                    return next.handle(req);
                }
            }
        }, function (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 406) {
                    // redirect to the login route
                    // or show a modal
                }
                return next.handle(req);
            }
        }));
    };
    HttpInterceptorClassService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], HttpInterceptorClassService);
    return HttpInterceptorClassService;
}());
export { HttpInterceptorClassService };
//# sourceMappingURL=http-interceptor-class.service.js.map